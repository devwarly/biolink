import { useEffect, useState } from 'react';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { AuthFooter } from '../../components/AuthFooter/AuthFooter';
import styles from './EmailConfirmed.module.css';

export const EmailConfirmed = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState('Verificando sua conta...');

    useEffect(() => {
        const confirmAccount = async () => {
            // O Supabase processa o token automaticamente ao carregar a página
            const { error } = await supabase.auth.getSession();

            if (error) {
                setStatus('Erro ao validar link. Tente novamente.');
                return;
            }

            // Aguarda o tempo visual definido
            await new Promise(resolve => setTimeout(resolve, 3000));
            setStatus('Conta ativada! Redirecionando...');

            setTimeout(() => {
                navigate('/login');
            }, 1500);
        };

        confirmAccount();
    }, [navigate]);

    return (
        <div className={styles.container}>
            {/* O mainContent garante a centralização vertical e horizontal */}
            <main className={styles.mainContent}>
                <div className={styles.card}>
                    <div className={styles.iconWrapper}>
                        <ShieldCheck size={48} color="#10b981" />
                    </div>

                    <h1 className={styles.title}>E-mail Confirmado!</h1>

                    <p className={styles.description}>
                        Sua conta foi verificada com sucesso. Por questões de segurança,
                        solicitamos que realize seu primeiro acesso.
                    </p>

                    <div className={styles.statusWrapper}>
                        <div className={styles.loaderGroup}>
                            <Loader2 className={styles.spin} size={18} />
                            <span className={styles.statusText}>{status}</span>
                        </div>
                    </div>
                </div>
            </main>

            <AuthFooter />
        </div>
    );
};