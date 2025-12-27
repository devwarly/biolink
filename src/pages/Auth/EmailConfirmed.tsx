import { useEffect, useState } from 'react';
import { CheckCircle, ShieldCheck, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './VerifyEmail.module.css';

export const EmailConfirmed = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState('Finalizando ativação da conta...');

    useEffect(() => {
        const handleRedirect = async () => {
            // Aguarda 3 segundos para o usuário ler a confirmação e garantir a segurança
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            setStatus('Conta ativada! Redirecionando para o login...');
            
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        };

        handleRedirect();
    }, [navigate]);

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.iconWrapper} style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
                    <ShieldCheck size={48} color="#10b981" />
                </div>
                
                <h1 className={styles.title}>E-mail Confirmado!</h1>
                
                <p className={styles.description}>
                    Sua conta foi verificada com sucesso. Por questões de segurança, 
                    solicitamos que realize seu primeiro acesso.
                </p>

                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '12px', 
                    color: 'var(--text-secondary, #6b7280)' 
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Loader2 className={styles.spin} size={18} />
                        <span style={{ fontSize: '14px' }}>{status}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};