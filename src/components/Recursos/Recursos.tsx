import { 
  BarChart3, 
  MessageSquare, 
  Share2, 
  MousePointer2, 
  Globe, 
  Layers 
} from 'lucide-react';
import styles from './Recursos.module.css';

export const Recursos = () => {
  const recursos = [
    {
      icon: <BarChart3 size={28} />,
      title: "Analytics Avançado",
      desc: "Acompanhe de onde vêm seus leads e quais imóveis geram mais interesse em tempo real."
    },
    {
      icon: <MessageSquare size={28} />,
      title: "Botão WhatsApp Pro",
      desc: "Múltiplos números e mensagens personalizadas para cada tipo de imóvel automaticamente."
    },
    {
      icon: <Share2 size={28} />,
      title: "Compartilhamento Smart",
      desc: "Gere links otimizados para redes sociais com previews que encantam o cliente."
    },
    {
      icon: <MousePointer2 size={28} />,
      title: "Editor Drag & Drop",
      desc: "Personalize seu site sem tocar em uma única linha de código. Simples e intuitivo."
    },
    {
      icon: <Globe size={28} />,
      title: "Domínio Próprio",
      desc: "Use seu próprio domínio (ex: seunome.com.br) para passar mais autoridade."
    },
    {
      icon: <Layers size={28} />,
      title: "Gestão de Leads",
      desc: "Um CRM simplificado para você nunca mais esquecer de retornar um contato."
    }
  ];

  return (
    <section id="recursos" className={styles.container}>
      <div className={styles.header}>
        <span className={styles.badge}>Tecnologia de Ponta</span>
        <h2 className={styles.title}>Recursos feitos para <span>Vender</span></h2>
        <p className={styles.subtitle}>
          Não é apenas um site, é uma máquina de prospecção completa para o seu negócio imobiliário.
        </p>
      </div>

      <div className={styles.grid}>
        {recursos.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.iconBox}>
              {item.icon}
            </div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <div className={styles.lightEffect}></div>
          </div>
        ))}
      </div>
    </section>
  );
};