import { ExternalLink, Eye } from 'lucide-react';
import styles from './Templates.module.css';

export const Templates = () => {
  const templates = [
    {
      id: 1,
      title: "Luxury Minimalist",
      category: "Alto Padrão",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Modern Urban",
      category: "Apartamentos",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Beach House",
      category: "Litoral",
      image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80",
    }
  ];

  return (
    <section id="templates" className={styles.container}>
      <div className={styles.header}>
        <span className={styles.badge}>Design Exclusivo</span>
        <h2 className={styles.title}>Escolha sua <span>Identidade</span></h2>
        <p className={styles.subtitle}>
          Templates validados por especialistas para converter visitantes em clientes reais.
        </p>
      </div>

      <div className={styles.grid}>
        {templates.map((t) => (
          <div key={t.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={t.image} alt={t.title} className={styles.image} />
              <div className={styles.overlay}>
                <button className={styles.btnPreview}><Eye size={18} /> Preview</button>
                <button className={styles.btnUse}>Usar este <ExternalLink size={14} /></button>
              </div>
            </div>
            <div className={styles.info}>
              <span className={styles.category}>{t.category}</span>
              <h3>{t.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};