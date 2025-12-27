import { ShieldCheck, Lock, Info } from 'lucide-react';
import styles from './AuthFooter.module.css';

export const AuthFooter = () => {
    return (
        <footer className={styles.authFooter}>
            <div className={styles.footerContent}>
                <div className={styles.item}>
                    <ShieldCheck size={14} className={styles.icon} />
                    <span>Criptografia de ponta a ponta</span>
                </div>
                
                <div className={styles.divider} />

                <div className={styles.item}>
                    <Lock size={14} className={styles.icon} />
                    <span>Dados protegidos</span>
                </div>

                <div className={styles.divider} />

                <div className={styles.item}>
                    <Info size={14} className={styles.icon} />
                    <span>Conexão segura</span>
                </div>
            </div>
            <p className={styles.copyright}>
                © {new Date().getFullYear()} Imobipage. Todos os direitos reservados.
            </p>
        </footer>
    );
};