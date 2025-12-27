import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { AuthFooter } from '../../components/AuthFooter/AuthFooter';
import { ShieldCheck, Loader2, ArrowRight } from 'lucide-react';
import styles from './Auth.module.css';

export const EmailConfirmedReset = () => {
    const navigate = useNavigate();
    const [isValidating, setIsValidating] = useState(true);

    useEffect(() => {
        const validateTokenManually = async () => {
            const hash = window.location.hash;
            const params = new URLSearchParams(hash.split('#').pop() || '');
            const accessToken = params.get('access_token');
            const refreshToken = params.get('refresh_token');

            if (accessToken && refreshToken) {
                const { error } = await supabase.auth.setSession({
                    access_token: accessToken,
                    refresh_token: refreshToken,
                });

                if (!error) {
                    setIsValidating(false);
                    return;
                }
            }

            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setIsValidating(false);
            } else {
                setIsValidating(false);
            }
        };

        validateTokenManually();
    }, []);

    return (
        <div className={styles.container}>
            {/* Wrapper que garante a centralização vertical do card */}
            <main className={styles.mainContent}>
                <div className={styles.authCard} style={{ textAlign: 'center', maxWidth: '450px' }}>
                    <div className={styles.header}>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                            <ShieldCheck size={64} color={isValidating ? "#94a3b8" : "#22c55e"} />
                        </div>
                        <h2>Validação de Acesso</h2>
                        <p>{isValidating ? "Processando chaves de segurança..." : "Acesso liberado!"}</p>
                    </div>

                    {isValidating ? (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                            <Loader2 className={styles.spin} size={32} />
                        </div>
                    ) : (
                        <button onClick={() => navigate('/reset-password')} className={styles.submitBtn}>
                            Redefinir Senha agora <ArrowRight size={18} />
                        </button>
                    )}
                </div>
            </main>

            <AuthFooter />
        </div>
    );
};