import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useNotification } from '../../contexts/NotificationContext';
import styles from './Auth.module.css';
import { LogoIcon } from '../../components/LogoIcon/LogoIcon';

export const Login = () => {
    const navigate = useNavigate();
    const { notify } = useNotification();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            notify('error', 'E-mail ou senha incorretos.');
            setLoading(false);
        } else {
            notify('success', 'Bem-vindo de volta!');
            navigate('/dashboard');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.authCard}>
                <div className={styles.header}>
                    <Link to="/"><LogoIcon size={150} /></Link>
                    <h2>Acesse sua conta</h2>
                </div>

                <form className={styles.form} onSubmit={handleEmailLogin}>
                    <div className={styles.inputGroup}>
                        <label>E-mail</label>
                        <div className={styles.inputWrapper}>
                            <i className="bi bi-envelope"></i>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seu@email.com"
                                required
                            />
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Senha</label>
                        <div className={styles.inputWrapper}>
                            <i className="bi bi-lock"></i>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? 'Entrando...' : 'Fazer Login'}
                    </button>
                </form>

                <p className={styles.footer}>
                    Não tem uma conta? <Link to="/cadastro">Cadastrar agora</Link>
                </p>
            </div>
        </div>
    );
};