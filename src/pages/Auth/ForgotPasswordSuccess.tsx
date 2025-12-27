import { useNavigate } from 'react-router-dom';
import { MailCheck, ArrowLeft } from 'lucide-react';
import styles from './Auth.module.css';
import { AuthFooter } from '../../components/AuthFooter/AuthFooter';
import { LogoIcon } from '../../components/LogoIcon/LogoIcon';

export const ForgotPasswordSuccess = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <div className={styles.authContent}>
                <div className={styles.authCard}>
                    <MailCheck size={64} />
                    <h2>Verifique seu E-mail</h2>
                    <p>Enviamos um link de recuperação. Clique nele para redefinir sua senha.</p>
                    <button onClick={() => navigate('/login')}>Voltar ao Login</button>
                </div>
            </div>

            <AuthFooter />
        </div>
    );
};