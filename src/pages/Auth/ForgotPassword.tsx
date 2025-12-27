import { useState, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { useNotification } from '../../contexts/NotificationContext';
import { Mail, ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Auth.module.css';
import { AuthFooter } from '../../components/AuthFooter/AuthFooter';
import { LogoIcon } from '../../components/LogoIcon/LogoIcon';
import { Turnstile } from '@marsidev/react-turnstile';
// Use "import type" para importar apenas a definição de tipo do TypeScript
import type { TurnstileInstance } from '@marsidev/react-turnstile';
import { useTheme } from '../../contexts/ThemeContext';

export const ForgotPassword = () => {
    const { theme } = useTheme();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const turnstileRef = useRef<TurnstileInstance>(null); // Ref atualizada para Turnstile
    const { notify } = useNotification();

    const handleResetRequest = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!captchaToken) {
            return notify('error', 'Por favor, aguarde a verificação de segurança.');
        }

        setLoading(true);

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/biolink/#/reset-password`,
            captchaToken, 
        });

        if (error) {
            notify('error', error.message);
            turnstileRef.current?.reset(); // Reset do Turnstile em caso de erro
            setCaptchaToken(null);
        } else {
            notify('success', 'Link enviado! Verifique sua caixa de entrada.');
        }
        setLoading(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.authContent}>
                <div className={styles.authCard}>
                    <div className={styles.header}>
                        <LogoIcon size={120} />
                        <h2>Recuperar Senha</h2>
                        <p>Digite seu e-mail para receber o link de redefinição.</p>
                    </div>

                    <form className={styles.form} onSubmit={handleResetRequest}>
                        <div className={styles.inputGroup}>
                            <label>E-mail cadastrado</label>
                            <div className={styles.inputWrapper}>
                                <i className="bi bi-envelope"></i>
                                <input
                                    type="email"
                                    placeholder="seu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
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

                        <button 
                            type="submit" 
                            className={styles.submitBtn} 
                            disabled={loading || !captchaToken}
                        >
                            {loading ? <Loader2 className={styles.spin} size={20} /> : 'Enviar Link de Recuperação'}
                        </button>

                        <Link to="/login" className={styles.backLink}>
                            <ArrowLeft size={16} /> Voltar para o Login
                        </Link>
                    </form>
                </div>
            </div>
            <AuthFooter />
        </div>
    );
};