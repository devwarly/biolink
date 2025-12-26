import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Auth.module.css';
import { LogoIcon } from '../../components/LogoIcon/LogoIcon';

export const Cadastro = () => {
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.authCard}>

                <div className={styles.header}>
                    <Link to="/" className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <LogoIcon size={150} className="me-2" />
                    </Link>
                    <h2>Crie sua conta</h2>
                    <p>Junte-se à elite do mercado imobiliário.</p>
                </div>

                <div className={styles.socialGrid}>
                    <button className={styles.socialBtn}>
                        <i className="bi bi-google"></i> Google
                    </button>
                    <button className={styles.socialBtn}>
                        <i className="bi bi-apple"></i> Apple
                    </button>
                </div>

                <div className={styles.divider}><span>OU CADASTRE-SE COM E-MAIL</span></div>

                <form className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label>Nome Completo</label>
                        <div className={styles.inputWrapper}>
                            <i className="bi bi-person"></i>
                            <input type="text" placeholder="Ex: João Silva" required />
                        </div>
                    </div>

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

                    {/* Checkbox de Termos */}
                    <label className={styles.termsWrapper}>
                        <input
                            type="checkbox"
                            checked={acceptedTerms}
                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                        />
                        <span className={styles.termsText}>
                            Eu aceito os <a href="#">Termos de Uso</a> e a <a href="#">Política de Privacidade</a> da SoftwareHouse.
                        </span>
                    </label>

                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={!acceptedTerms}
                    >
                        Criar Conta Grátis
                    </button>
                </form>

                <p className={styles.footer}>
                    Já tem conta? <Link to="/login">Fazer Login</Link>
                </p>
            </div>
        </div>
    );
};