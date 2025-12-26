import { useNavigate, Link } from 'react-router-dom';
import { Chrome, Apple, Mail, Lock } from 'lucide-react';
import styles from './Auth.module.css';

export const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulação: Criamos um token fictício
    localStorage.setItem('sb-token', 'sessao_ativa_temporaria');
    
    // Navega para o dashboard
    navigate('/dashboard');
  };

  return (
    <div className={styles.container}>
      <div className={styles.authCard}>
        <div className={styles.header}>
          <Link to="/" className={styles.logo}>Software<span>House</span></Link>
          <h2>Acesse sua conta</h2>
        </div>

        <div className={styles.socialGrid}>
          <button className={styles.socialBtn} onClick={handleSubmit}>
            <i className="bi bi-google"></i> Google
          </button>
          <button className={styles.socialBtn} onClick={handleSubmit}>
            <i className="bi bi-apple"></i> Apple
          </button>
        </div>

        <div className={styles.divider}><span>OU E-MAIL</span></div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>E-mail</label>
            <div className={styles.inputWrapper}>
              <i className="bi bi-envelope"></i>
              <input type="email" placeholder="seu@email.com" required />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label>Senha</label>
            <div className={styles.inputWrapper}>
              <i className="bi bi-lock"></i>
              <input type="password" placeholder="••••••••" required />
            </div>
          </div>
          <button type="submit" className={styles.submitBtn}>Entrar no Painel</button>
        </form>
      </div>
    </div>
  );
};