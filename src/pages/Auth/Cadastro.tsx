import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useNotification } from '../../contexts/NotificationContext';
import styles from './Auth.module.css';
import { LogoIcon } from '../../components/LogoIcon/LogoIcon';

export const Cadastro = () => {
    const navigate = useNavigate();
    const { notify } = useNotification();
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });

    // Regra de Ouro: Mínimo 8 caracteres, 1 Maiúscula, 1 Minúscula, 1 Número e 1 Símbolo
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleEmailSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validação de Segurança do Nome
        if (formData.fullName.trim().split(' ').length < 2) {
            return notify('error', 'Por favor, insira seu nome completo.');
        }

        // Validação de Segurança da Senha (Trava de segurança no Frontend)
        if (!passwordRegex.test(formData.password)) {
            return notify(
                'error', 
                'Senha inválida! Use 8+ caracteres com letras (A/a), números e símbolos.'
            );
        }

        setLoading(true);

        try {
            const { error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: { full_name: formData.fullName },
                    emailRedirectTo: `${window.location.origin}/biolink/#/email-confirmed`
                }
            });

            if (error) throw error;

            notify('success', 'Cadastro realizado com sucesso!');
            setTimeout(() => {
                navigate('/verify-email');
            }, 1500);

        } catch (error: any) {
            notify('error', error.message || 'Ocorreu um erro ao criar sua conta.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.authCard}>
                <div className={styles.header}>
                    <Link to="/"><LogoIcon size={150} /></Link>
                    <h2>Crie sua conta</h2>
                    <p>Junte-se à elite do mercado imobiliário.</p>
                </div>

                <form className={styles.form} onSubmit={handleEmailSignUp}>
                    <div className={styles.inputGroup}>
                        <label>Nome Completo</label>
                        <div className={styles.inputWrapper}>
                            <i className="bi bi-person"></i>
                            <input
                                type="text"
                                placeholder="Ex: João Silva"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>E-mail</label>
                        <div className={styles.inputWrapper}>
                            <i className="bi bi-envelope"></i>
                            <input
                                type="email"
                                placeholder="seu@email.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                                placeholder="Crie uma senha forte"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>
                        
                        {/* Indicadores de Requisitos de Senha */}
                        <div className={styles.passwordHint}>
                            <span className={formData.password.length >= 8 ? styles.valid : styles.invalid}>
                                {formData.password.length >= 8 ? '✓' : '●'} Mínimo 8 caracteres
                            </span>
                            <span className={passwordRegex.test(formData.password) ? styles.valid : styles.invalid}>
                                {passwordRegex.test(formData.password) ? '✓' : '●'} Letra A/a, número e símbolo
                            </span>
                        </div>
                    </div>

                    <label className={styles.termsWrapper}>
                        <input
                            type="checkbox"
                            checked={acceptedTerms}
                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                        />
                        <span className={styles.termsText}>
                            Eu aceito os <a href="#">Termos de Uso</a>.
                        </span>
                    </label>

                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={!acceptedTerms || loading}
                    >
                        {loading ? 'Criando...' : 'Criar Conta'}
                    </button>
                </form>

                <p className={styles.footer}>
                    Já tem conta? <Link to="/login">Fazer Login</Link>
                </p>
            </div>
        </div>
    );
};