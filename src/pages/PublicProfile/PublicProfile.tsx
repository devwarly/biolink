import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Smartphone, MapPin, Ruler, BedDouble, 
  ShieldCheck, Target, MessageCircle, Info, Star 
} from 'lucide-react';
import styles from './PublicProfile.module.css';

export function PublicProfile() {
    const { slug } = useParams();
    const [profile, setProfile] = useState<any>(null);
    const [showContactMenu, setShowContactMenu] = useState(false);

    useEffect(() => {
        const loadData = () => {
            const mockProfile = {
                name: "João Silva",
                creci: "123.456-F",
                template_id: "dark_elegance", 
                whatsapp: "5511999999999",
                bio: "Especialista em encontrar o lar dos seus sonhos em Alphaville e região.",
                about: "Com mais de 10 anos de mercado, foco em proporcionar uma experiência de compra exclusiva para imóveis de alto padrão."
            };
            setProfile(mockProfile);
        };
        loadData();
    }, [slug]);

    if (!profile) return <div className={styles.loading}>Carregando vitrine...</div>;

    const templateClass = styles[profile.template_id] || styles.clean;

    return (
        <div className={`${styles.viewport} ${templateClass}`}>
            {/* 1. HEADER HERO */}
            <header className={styles.hero}>
                <div className={styles.container}>
                    <div className={styles.profileBox}>
                        <div className={styles.avatarWrapper}>
                          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt={profile.name} className={styles.avatar} />
                          <div className={styles.onlineBadge} />
                        </div>
                        <div className={styles.profileText}>
                            <h1>{profile.name}</h1>
                            <span className={styles.creciBadge}><ShieldCheck size={14}/> CRECI {profile.creci}</span>
                            <p className={styles.tagline}>Corretor de Imóveis de Luxo</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className={styles.container}>
                {/* 2. SLIDER DE DESTAQUES (Mockup visual) */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2>Destaques da Semana</h2>
                    </div>
                    <div className={styles.sliderMock}>
                        <div className={styles.sliderSlide}>
                            <div className={styles.slideOverlay}>
                                <h3>Apartamento Garden Decorado</h3>
                                <p>R$ 2.450.000</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. GRID DE IMÓVEIS */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2>Catálogo Completo</h2>
                        <div className={styles.divider} />
                    </div>
                    <div className={styles.propertiesGrid}>
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className={styles.card}>
                                <div className={styles.cardThumb} style={{backgroundImage: `url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500)`}}>
                                    <span className={styles.tag}>Oportunidade</span>
                                </div>
                                <div className={styles.cardBody}>
                                    <p className={styles.location}><MapPin size={14}/> Alphaville, Barueri</p>
                                    <h3>Residencial Garden Luxury</h3>
                                    <div className={styles.specs}>
                                        <span><Ruler size={14}/> 280m²</span>
                                        <span><BedDouble size={14}/> 3 Suítes</span>
                                    </div>
                                    <div className={styles.priceRow}>
                                        <span className={styles.price}>R$ 3.800.000</span>
                                        <button className={styles.btnDetails}>Explorar</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. SOBRE MIM & PROVA SOCIAL */}
                <section className={styles.aboutSection}>
                    <div className={styles.aboutContent}>
                        <h2><Info size={20}/> Sobre o Especialista</h2>
                        <p>{profile.about}</p>
                    </div>
                    <div className={styles.socialProof}>
                        <div className={styles.ratingBox}>
                            <div className={styles.stars}><Star size={16} fill="gold"/><Star size={16} fill="gold"/><Star size={16} fill="gold"/><Star size={16} fill="gold"/><Star size={16} fill="gold"/></div>
                            <p>"Atendimento impecável e total transparência."</p>
                            <span>- Roberto M.</span>
                        </div>
                    </div>
                </section>
            </main>

            {/* 5. BOTÃO FLUTUANTE INTELIGENTE */}
            <div className={styles.floatingWrapper}>
                {showContactMenu && (
                    <div className={styles.contactMenu}>
                        <a href={`https://wa.me/${profile.whatsapp}?text=Olá, quero comprar um imóvel.`} className={styles.menuItem}>🏠 Quero Comprar</a>
                        <a href={`https://wa.me/${profile.whatsapp}?text=Olá, quero vender meu imóvel.`} className={styles.menuItem}>🤝 Quero Vender</a>
                        <a href={`https://wa.me/${profile.whatsapp}?text=Olá, quero agendar uma reunião.`} className={styles.menuItem}>📅 Agendar Reunião</a>
                    </div>
                )}
                <button 
                    className={styles.mainFloatingBtn}
                    onClick={() => setShowContactMenu(!showContactMenu)}
                >
                    <MessageCircle size={24} />
                    <span>Falar no WhatsApp</span>
                </button>
            </div>
        </div>
    );
}