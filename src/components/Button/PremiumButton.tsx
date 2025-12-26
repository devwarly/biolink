import { Crown } from 'lucide-react';
import styles from './PremiumButton.module.css';

export const PremiumButton = () => {
  return (
    /* Alteramos para 'a' e adicionamos o href apontando para o id #precos */
    <a href="#precos" className={styles.premiumBtn}>
      <Crown size={20} strokeWidth={2.5} className={styles.icon} />
      <div className={styles.textWrapper}>
         <span className={styles.text}>Assine o Premium</span>
      </div>
    </a>
  );
};