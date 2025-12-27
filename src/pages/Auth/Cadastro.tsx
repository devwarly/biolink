import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useNotification } from '../../contexts/NotificationContext';
import { Turnstile } from '@marsidev/react-turnstile';
// Use "import type" para importar apenas a definição de tipo do TypeScript
import type { TurnstileInstance } from '@marsidev/react-turnstile';
import { Mail, Lock, User, Loader2 } from 'lucide-react';
import styles from './Auth.module.css';
import { AuthFooter } from '../../components/AuthFooter/AuthFooter';
import { LogoIcon } from '../../components/LogoIcon/LogoIcon';
import { useTheme } from '../../contexts/ThemeContext';

export const Cadastro = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const { notify } = useNotification();
    const turnstileRef = useRef<TurnstileInstance>(null); // Ref atualizada para Turnstile

    const [loading, setLoading] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleEmailSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!captchaToken) {
            return notify('error', 'Por favor, aguarde a verificação de segurança.');
        }

        if (formData.fullName.trim().split(' ').length < 2) {
            return notify('error', 'Por favor, insira seu nome completo.');
        }

        if (!passwordRegex.test(formData.password)) {
            return notify('error', 'Senha fraca! Siga os requisitos abaixo.');
        }

        setLoading(true);

        try {
            const { error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    captchaToken, 
                    data: {
                        full_name: formData.fullName,
                        accepted_terms: true,
                        terms_accepted_at: new Date().toISOString(),
                        terms_version: '1.0'
                    },
                    emailRedirectTo: `${window.location.origin}/biolink/#/email-confirmed`
                }
            });

            if (error) throw error;

            notify('success', 'Verifique seu e-mail para ativar a conta.');
            setTimeout(() => navigate('/verify-email'), 2000);

        } catch (error: any) {
            notify('error', error.message || 'Erro ao criar conta.');
            turnstileRef.current?.reset(); // Reset do Turnstile em caso de erro
            setCaptchaToken(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.authContent}>
                <div className={styles.authCard}>
                    <div className={styles.header}>
                        <Link to="/"><LogoIcon size={120} /></Link>
                        <h2>Crie sua conta</h2>
                        <p>Junte-se à maior rede de corretores.</p>
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
                            <div className={styles.passwordHint}>
                                <span className={formData.password.length >= 8 ? styles.valid : styles.invalid}>
                                    {formData.password.length >= 8 ? '✓' : '●'} Mínimo 8 caracteres
                                </span>
                                <span className={passwordRegex.test(formData.password) ? styles.valid : styles.invalid}>
                                    {passwordRegex.test(formData.password) ? '✓' : '●'} Letra A/a, número e símbolo
                                </span>
                            </div>
                        </div>

                        <div className={styles.captchaContainer}>
                            <Turnstile
                                ref={turnstileRef}
                                siteKey="0x4AAAAAACJTmvLdrVOopV0g" // Use sua Site Key do Turnstile aqui
                                onSuccess={(token) => setCaptchaToken(token)}
                                onExpire={() => setCaptchaToken(null)}
                                options={{
                                    theme: theme === 'dark' ? 'dark' : 'light',
                                    size: 'normal',
                                }}
                            />
                        </div>

                        <label className={styles.termsWrapper}>
                            <input
                                type="checkbox"
                                checked={acceptedTerms}
                                onChange={(e) => setAcceptedTerms(e.target.checked)}
                            />
                            <span className={styles.termsText}>
                                Eu aceito os <Link to="/termos">Termos de Uso</Link>
                            </span>
                        </label>

                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={!acceptedTerms || !captchaToken || loading}
                        >
                            {loading ? <Loader2 className={styles.spin} size={20} /> : 'Criar minha conta'}
                        </button>
                    </form>

                    <p className={styles.footer}>
                        Já tem conta? <Link to="/login">Fazer Login</Link>
                    </p>
                </div>
            </div>
            <AuthFooter />
        </div>
    );
};