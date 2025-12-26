import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useNotify } from '../../contexts/NotificationContext';
import styles from './Auth.module.css';
import { LogoIcon } from '../../components/LogoIcon/LogoIcon';

export const Cadastro = () => {
    const navigate = useNavigate();
    const { notify } = useNotify();
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ 
        fullName: '', 
        email: '', 
        password: '' 
    });

    // Cadastro via Google ajustado para o ambiente /biolink/
    const handleGoogleSignUp = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { 
                redirectTo: `${window.location.origin}/biolink/`
            }
        });
        if (error) notify('error', 'Erro ao conectar com Google');
    };

    const handleEmailSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                // Esses dados são capturados pelo seu Trigger SQL para criar o perfil
                data: { full_name: formData.fullName } 
            }
        });

        if (error) {
            notify('error', error.message);
            setLoading(false);
        } else {
            notify('success', 'Conta criada! Verifique seu e-mail para confirmar o cadastro.');
            navigate('/dashboard');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.authCard}>
                <div className={styles.header}>
                    <Link to="/"><LogoIcon size={150} /></Link>
                    <h2>Crie sua conta</h2>
                    <p>Junte-se à elite do mercado imobiliário.</p>
                </div>

                <div className={styles.socialGridFull}>
                    <button className={styles.socialBtn} onClick={handleGoogleSignUp}>
                        <i className="bi bi-google"></i> Cadastrar com Google
                    </button>
                </div>

                <div className={styles.divider}><span>OU E-MAIL</span></div>

                <form className={styles.form} onSubmit={handleEmailSignUp}>
                    <div className={styles.inputGroup}>
                        <label>Nome Completo</label>
                        <div className={styles.inputWrapper}>
                            <i className="bi bi-person"></i>
                            <input 
                                type="text" 
                                placeholder="Ex: João Silva" 
                                value={formData.fullName}
                                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                required 
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>E-mail</label>
                        <div className={styles.inputWrapper}>
                            <i className="bi bi-envelope"></i>
                            <input 
                                type="email" 
                                placeholder="seu@email.com" 
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                                placeholder="••••••••" 
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                required 
                            />
                        </div>
                    </div>
                    
                    <label className={styles.termsWrapper}>
                        <input 
                            type="checkbox" 
                            checked={acceptedTerms} 
                            onChange={(e) => setAcceptedTerms(e.target.checked)} 
                        />
                        <span className={styles.termsText}>
                            Eu aceito os <a href="#">Termos de Uso</a> e a <a href="#">Política de Privacidade</a>.
                        </span>
                    </label>

                    <button 
                        type="submit" 
                        className={styles.submitBtn} 
                        disabled={!acceptedTerms || loading}
                    >
                        {loading ? 'Processando...' : 'Criar Conta Grátis'}
                    </button>
                </form>

                <p className={styles.footer}>
                    Já tem conta? <Link to="/login">Fazer Login</Link>
                </p>
            </div>
        </div>
    );
};