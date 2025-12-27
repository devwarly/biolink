import { useState } from 'react';
import { Mail, CheckCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useNotification } from '../../contexts/NotificationContext'; 
import styles from './VerifyEmail.module.css';

export const VerifyEmail = () => {
    const navigate = useNavigate();
    const { notify } = useNotification(); 
    const [loading, setLoading] = useState(false);

    const handleCheckVerification = async () => {
        setLoading(true);
        try {
            // Recarrega os dados do usuário para checar o status de confirmação
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error || !user) {
                notify('error', 'Sessão expirada. Faça login novamente.');
                navigate('/login');
                return;
            }

            // Verifica se o email foi confirmado no banco de dados
            if (user.email_confirmed_at) {
                notify('success', 'E-mail confirmado! Redirecionando...');
                setTimeout(() => navigate('/dashboard'), 1500);
            } else {
                notify('warning', 'E-mail ainda não verificado. Verifique sua caixa de entrada.');
            }
        } catch (err) {
            notify('error', 'Erro ao verificar e-mail.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.iconWrapper}>
                    <Mail size={40} color="var(--accent-color, #4f46e5)" />
                </div>
                
                <h1 className={styles.title}>Verifique seu e-mail</h1>
                <p className={styles.description}>
                    Enviamos um link de ativação para você. 
                    Confirme no seu e-mail e clique no botão abaixo para liberar seu acesso.
                </p>

                <div className={styles.buttonGroup}>

                    <button 
                        onClick={() => navigate('/login')}
                        className={styles.secondaryBtn}
                    >
                        <ArrowLeft size={16} /> Voltar para o login
                    </button>
                </div>
            </div>
        </div>
    );
};