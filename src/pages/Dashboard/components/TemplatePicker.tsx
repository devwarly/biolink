import React, { useState } from 'react';
import { Check, Lock, Palette, Layout, Sparkles } from 'lucide-react';
import styles from './TemplatePicker.module.css';

// Lista de templates baseada na Seção 2 da documentação
const TEMPLATES_LIST = [
  { id: 'clean', name: 'Clean & Basic', type: 'Free', description: 'Design minimalista e direto.' },
  { id: 'dark_elegance', name: 'Dark Elegance', type: 'Premium', description: 'Fundo escuro com detalhes sofisticados.' },
  { id: 'modern_real', name: 'Modern Real Estate', type: 'Premium', description: 'Tipografia grande e efeito parallax.' },
  { id: 'minimalist', name: 'Minimalist Boutique', type: 'Premium', description: 'Foco total em fotos de arquitetura.' }
];

export function TemplatePicker() {
  const [selectedId, setSelectedId] = useState('clean');
  const userPlan = 'free'; // Este dado deve vir do seu contexto global de usuário

  const handleSelectTemplate = (template) => {
    // Validação de Plano Ativo
    if (template.type === 'Premium' && userPlan !== 'premium') {
      alert("Este template faz parte do Plano Premium. Faça o upgrade para liberar!");
      return;
    }
    
    setSelectedId(template.id);
    // Aqui você chama a função que faz o UPDATE no Supabase (coluna template_id)
    console.log(`Salvando template ${template.id} no banco de dados...`);
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.pickerHeader}>
        <div>
          <h2>Seu Layout</h2>
          <p>Escolha como sua vitrine será apresentada aos clientes</p>
        </div>
        <button className={styles.saveBtn}>Salvar Alterações</button>
      </header>

      <div className={styles.templateGrid}>
        {TEMPLATES_LIST.map((tpl) => {
          const isPremium = tpl.type === 'Premium';
          const isLocked = isPremium && userPlan !== 'premium';
          const isActive = selectedId === tpl.id;

          return (
            <div 
              key={tpl.id} 
              className={`${styles.templateCard} ${isActive ? styles.active : ''} ${isLocked ? styles.locked : ''}`}
              onClick={() => handleSelectTemplate(tpl)}
            >
              <div className={`${styles.previewBox} ${styles[tpl.id]}`}>
                {isLocked && (
                  <div className={styles.lockBadge}>
                    <Lock size={20} />
                    <span>Bloqueado</span>
                  </div>
                )}
                {isActive && <div className={styles.checkBadge}><Check size={16} /> Ativo</div>}
                
                {/* Mockup visual do template */}
                <div className={styles.mockupContent}>
                   <div className={styles.mockAvatar} />
                   <div className={styles.mockLine} style={{width: '60%'}} />
                   <div className={styles.mockLine} style={{width: '40%'}} />
                   <div className={styles.mockGrid}>
                      <div className={styles.mockItem} />
                      <div className={styles.mockItem} />
                   </div>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.info}>
                  <strong>{tpl.name}</strong>
                  <p>{tpl.description}</p>
                </div>
                <span className={isPremium ? styles.premiumTag : styles.freeTag}>
                  {isPremium ? <Sparkles size={12} /> : null} {tpl.type}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}