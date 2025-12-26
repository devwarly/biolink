import { Layout, Smartphone, Zap, ShieldCheck } from 'lucide-react';
import styles from './Solucoes.module.css';

export const Solucoes = () => {
  const solucoes = [
    {
      icon: <Layout size={32} />,
      title: "Templates de Luxo",
      desc: "Designs exclusivos criados para converter visitantes em clientes de alto padrão."
    },
    {
      icon: <Smartphone size={32} />,
      title: "Foco em Mobile",
      desc: "Sua vitrine otimizada para a melhor experiência em qualquer smartphone."
    },
    {
      icon: <Zap size={32} />,
      title: "Carregamento Instantâneo",
      desc: "Páginas leves que carregam em menos de 1 segundo para não perder vendas."
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Segurança Total",
      desc: "Seus dados e leads protegidos com criptografia de ponta a ponta."
    }
  ];

  return (
    <section className={styles.container} id="solucoes">
      <div className={styles.header}>
        <span className={styles.badge}>Recursos Elite</span>
        <h2 className={styles.title}>Tudo o que você precisa para <br/> <span>dominar o mercado</span></h2>
        <p className={styles.subtitle}>
          Ferramentas poderosas desenhadas especificamente para o fluxo de trabalho do corretor moderno.
        </p>
      </div>

      <div className={styles.grid}>
        {solucoes.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.iconWrapper}>
              {item.icon}
            </div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <div className={styles.cardGlow}></div>
          </div>
        ))}
      </div>
    </section>
  );
};