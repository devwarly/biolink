import { Check, Zap, Crown, Rocket } from 'lucide-react';
import styles from './Precos.module.css';

export const Precos = () => {
  const planos = [
    {
      id: "inicio",
      nome: "Essencial",
      preco: "29",
      icon: <Rocket size={24} />,
      features: [
        "Acesso a 5 Templates Base",
        "Remoção de Marca d'água",
        "Domínio Personalizado",
        "Suporte via Email",
      ],
      premium: false,
    },
    {
      id: "recursos",
      nome: "Corretor Pro",
      preco: "69",
      icon: <Zap size={24} />,
      features: [
        "Templates de Nível Médio",
        "Analytics Detalhado",
        "Botão WhatsApp Inteligente",
        "Integração com Facebook Pixel",
        "Suporte Prioritário",
      ],
      premium: true, // Destaque visual
      tag: "Mais Escolhido"
    },
    {
      id: "suporte",
      nome: "Elite Imobiliária",
      preco: "129",
      icon: <Crown size={24} />,
      features: [
        "Todos os Templates (Luxo)",
        "Consultoria de Design",
        "Gestão de Leads (CRM)",
        "Páginas ilimitadas",
        "Gerente de Conta Dedicado",
      ],
      premium: false,
    }
  ];

  return (
    <section id="precos" className={styles.container}>
      <div className={styles.header}>
        <span className={styles.badge}>Planos & Investimento</span>
        <h2 className={styles.title}>O próximo nível da sua <span>Carreira</span></h2>
        <p className={styles.subtitle}>
          Escolha o plano que melhor se adapta ao seu momento e comece a vender mais hoje mesmo.
        </p>
      </div>

      <div className={styles.grid}>
        {planos.map((plano) => (
          <div key={plano.id} className={`${styles.card} ${plano.premium ? styles.cardPremium : ''}`}>
            {plano.tag && <span className={styles.cardTag}>{plano.tag}</span>}
            
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>{plano.icon}</div>
              <h3>{plano.nome}</h3>
              <div className={styles.price}>
                <span>R$</span>
                <strong>{plano.preco}</strong>
                <small>/mês</small>
              </div>
            </div>

            <ul className={styles.featureList}>
              {plano.features.map((feature, index) => (
                <li key={index}>
                  <Check size={18} className={styles.checkIcon} />
                  {feature}
                </li>
              ))}
            </ul>

            <button className={`${styles.btnPlan} ${plano.premium ? styles.btnPlanActive : ''}`}>
              Assinar Plano
            </button>
            
            {plano.premium && <div className={styles.glowEffect}></div>}
          </div>
        ))}
      </div>
    </section>
  );
};