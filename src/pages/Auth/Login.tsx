import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useNotification } from '../../contexts/NotificationContext';
import { Turnstile } from '@marsidev/react-turnstile';
// Use "import type" para importar apenas a definição de tipo do TypeScript
import type { TurnstileInstance } from '@marsidev/react-turnstile';
import styles from './Auth.module.css';
import { AuthFooter } from '../../components/AuthFooter/AuthFooter';
import { LogoIcon } from '../../components/LogoIcon/LogoIcon';
import { useTheme } from '../../contexts/ThemeContext';

export const Login = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const { notify } = useNotification();
    
    // Referência para resetar o widget se o login falhar
    const turnstileRef = useRef<TurnstileInstance>(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!captchaToken) {
            return notify('error', 'Por favor, aguarde a validação de segurança.');
        }

        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
            options: {
                captchaToken, // Token obrigatório para o Supabase
            }
        });

        if (error) {
            notify('error', 'E-mail ou senha incorretos.');
            setLoading(false);
            
            // Reseta o Turnstile para permitir nova tentativa
            turnstileRef.current?.reset(); 
            setCaptchaToken(null);
        } else {
            notify('success', 'Bem-vindo de volta!');
            navigate('/dashboard');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.authContent}>
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

                        <div className={styles.forgotPasswordWrapper}>
                            <Link to="/forgot-password" className={styles.forgotPasswordLink}>
                                Esqueceu sua senha?
                            </Link>
                        </div>

                        {/* Contentor do Captcha centralizado e com tema dinâmico */}
                        <div className={styles.captchaContainer}>
                            <Turnstile
                                ref={turnstileRef}
                                siteKey="0x4AAAAAACJTmvLdrVOopV0g" 
                                onSuccess={(token) => setCaptchaToken(token)}
                                onExpire={() => setCaptchaToken(null)}
                                options={{
                                    theme: theme === 'dark' ? 'dark' : 'light',
                                    size: 'normal',
                                }}
                            />
                        </div>

                        <button 
                            type="submit" 
                            className={styles.submitBtn} 
                            disabled={loading || !captchaToken}
                        >
                            {loading ? 'Entrando...' : 'Fazer Login'}
                        </button>
                    </form>

                    <p className={styles.footer}>
                        Não tem uma conta? <Link to="/cadastro">Cadastrar agora</Link>
                    </p>
                </div>
            </div>

            <AuthFooter />
        </div>
    );
};