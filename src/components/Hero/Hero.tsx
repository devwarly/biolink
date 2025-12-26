import { CheckCircle2 } from 'lucide-react';
import styles from './Hero.module.css';
import { Mobile } from '../Mobile3D/mobile';

export const Hero = () => {
    return (
        <section className={styles.heroContainer} id='inicio'>
            <div className={styles.wrapper}>

                {/* LADO ESQUERDO: TEXTO E CONTEÚDO */}
                <div className={styles.textSide}>
                    <span className={styles.badge}>Disponível para Corretores Pro</span>

                    <h1 className={styles.mainTitle}>
                        Transforme seu Instagram em sua <br />
                        <span className={styles.highlight}>Vitrine Digital</span> de Alto Padrão.
                    </h1>

                    <p className={styles.subText}>
                        Conecte-se com compradores, apresente seus imóveis e feche negócios,
                        tudo em um só lugar.
                    </p>


                    <div className={styles.featureGrid}>
                        <div className={styles.featureItem}>
                            <CheckCircle2 size={20} className={styles.icon} />
                            <span>Catálogo de Imóveis Ilimitado</span>
                        </div>
                        <div className={styles.featureItem}>
                            <CheckCircle2 size={20} className={styles.icon} />
                            <span>Design Personalizável (Templates)</span>
                        </div>
                        <div className={styles.featureItem}>
                            <CheckCircle2 size={20} className={styles.icon} />
                            <span>Integração Direta com WhatsApp</span>
                        </div>
                        <div className={styles.featureItem}>
                            <CheckCircle2 size={20} className={styles.icon} />
                            <span>Dashboard de Analytics</span>
                        </div>
                    </div>

                    <div className={styles.buttonGroup}>
                        <button className={styles.btnPrimary}>Começar agora</button>
                        <button className={styles.btnSecondary}>Ver modelos de luxo</button>
                    </div>

                    <div className={styles.trustSection}>
                        <div className={styles.avatarGroup}>
                            {/* Substitua pelos links das fotos reais dos corretores */}
                            <img src="https://i.pravatar.cc/150?u=1" alt="User" />
                            <img src="https://i.pravatar.cc/150?u=2" alt="User" />
                            <img src="https://i.pravatar.cc/150?u=3" alt="User" />
                            <img src="https://i.pravatar.cc/150?u=4" alt="User" />
                        </div>
                        <p>Junte-se a +500 corretores que estão transformando o Brasil</p>
                    </div>
                </div>

                <div className={styles.mobileImage}>
                    <Mobile />
                </div>

            </div>
        </section>
    );
};