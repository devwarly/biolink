import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useNotification } from '../../contexts/NotificationContext';
import { Lock, ShieldCheck, Loader2 } from 'lucide-react';
import { AuthFooter } from '../../components/AuthFooter/AuthFooter';
import styles from './Auth.module.css';

export const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { notify } = useNotification();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Validações Locais antes de chamar a API
        if (!passwordRegex.test(password)) {
            return notify('error', 'A nova senha não atende aos requisitos de segurança.');
        }

        if (password !== confirmPassword) {
            return notify('error', 'As senhas não coincidem.');
        }

        setLoading(true);

        try {
            const { error } = await supabase.auth.updateUser({ password });

            if (error) {
                console.error("Erro Supabase:", error);

                // 2. Tratamento de Erros Específicos do Supabase
                switch (error.status) {
                    case 422:
                        if (error.message.includes('already used') || error.message.includes('same as the old password')) {
                            notify('error', 'Você não pode usar uma senha igual à anterior.');
                        } else {
                            notify('error', 'Formato de senha inválido para o servidor.');
                        }
                        break;

                    case 401:
                    case 403:
                        notify('error', 'Sessão expirada. Solicite um novo link de recuperação.');
                        navigate('/login');
                        break;

                    case 429:
                        notify('error', 'Muitas tentativas. Aguarde um momento e tente novamente.');
                        break;

                    default:
                        // Caso o erro de "session missing" ainda apareça por algum lag
                        if (error.message.includes('session missing')) {
                            notify('error', 'Sessão perdida. Por favor, clique no link do e-mail novamente.');
                            navigate('/login');
                        } else {
                            notify('error', error.message || 'Ocorreu um erro ao atualizar a senha.');
                        }
                }
            } else {
                // 3. Sucesso Total
                notify('success', 'Senha alterada com sucesso! Faça login.');

                // Importante: Desloga para limpar a sessão de recuperação
                await supabase.auth.signOut();

                // Pequeno delay para o usuário ler o alerta de sucesso
                setTimeout(() => navigate('/login'), 1500);
            }
        } catch (err) {
            notify('error', 'Erro inesperado de conexão.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.authContent}>
                <div className={styles.authCard}>
                    <div className={styles.header}>
                        <ShieldCheck size={48} color="var(--accent-color)" />
                        <h2>Nova Senha</h2>
                        <p>Crie uma senha forte e segura.</p>
                    </div>

                    <form className={styles.form} onSubmit={handleUpdatePassword}>
                        <div className={styles.inputGroup}>
                            <label>Nova Senha</label>
                            <div className={styles.inputWrapper}>
                                <i className="bi bi-lock"></i>
                                <input
                                    type="password"
                                    placeholder="Mínimo 8 caracteres"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Confirmar Nova Senha</label>
                            <div className={styles.inputWrapper}>
                                <i className="bi bi-lock"></i>
                                <input
                                    type="password"
                                    placeholder="Repita a nova senha"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className={styles.passwordHint}>
                                <span className={password.length >= 8 ? styles.valid : styles.invalid}>
                                    {password.length >= 8 ? '✓' : '●'} Mínimo 8 caracteres
                                </span>
                                <span className={passwordRegex.test(password) ? styles.valid : styles.invalid}>
                                    {passwordRegex.test(password) ? '✓' : '●'} Letra A/a, número e símbolo
                                </span>
                                <span className={(password === confirmPassword && confirmPassword !== '') ? styles.valid : styles.invalid}>
                                    {(password === confirmPassword && confirmPassword !== '') ? '✓' : '●'} As senhas coincidem
                                </span>
                            </div>
                        </div>

                        <button type="submit" className={styles.submitBtn} disabled={loading}>
                            {loading ? <Loader2 className={styles.spin} size={20} /> : 'Atualizar Senha'}
                        </button>
                    </form>
                </div>
            </div>

            <AuthFooter />
        </div>
    );
};