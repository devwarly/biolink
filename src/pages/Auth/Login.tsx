import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useNotify } from '../../contexts/NotificationContext';
import styles from './Auth.module.css';
import { LogoIcon } from '../../components/LogoIcon/LogoIcon';

export const Login = () => {
    const navigate = useNavigate();
    const { notify } = useNotify();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                // Use apenas a base. O HashRouter se perde se você mandar para /dashboard direto
                redirectTo: `${window.location.origin}/biolink/`
            }
        });
    };

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // MUDANÇA AQUI: de signInWithEmailAndPassword para signInWithPassword
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            notify('error', 'Credenciais inválidas ou erro de conexão.');
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

                <div className={styles.socialGridFull}>
                    <button className={styles.socialBtn} onClick={handleGoogleLogin}>
                        <i className="bi bi-google"></i> Entrar com Google
                    </button>
                </div>

                <div className={styles.divider}><span>OU E-MAIL</span></div>

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
                        {loading ? 'Carregando...' : 'Entrar no Painel'}
                    </button>
                </form>
            </div>
        </div>
    );
};