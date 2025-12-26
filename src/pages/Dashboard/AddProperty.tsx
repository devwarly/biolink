import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Camera, Save, MapPin, DollarSign, 
  Maximize2, BedDouble, Car, Bath, Info, CheckCircle2,
  X, Image as ImageIcon, AlertCircle
} from 'lucide-react';
import styles from './AddProperty.module.css';

export function AddProperty() {
  const navigate = useNavigate();
  const [price, setPrice] = useState('');

  // Função para formatar moeda em tempo real
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    value = (Number(value) / 100).toLocaleString('pt-BR', {
      minimumFractionDigits: 2
    });
    setPrice(value);
  };

  return (
    <div className={styles.wrapper}>
      {/* Barra Lateral de Navegação do Form */}
      <aside className={styles.sideNav}>
        <div className={styles.navHeader}>
          <button onClick={() => navigate('/dashboard')} className={styles.backButton}>
            <ArrowLeft size={20} />
          </button>
          <div className={styles.navTitle}>
            <h1>Novo Imóvel</h1>
            <p>Passo único de publicação</p>
          </div>
        </div>

        <div className={styles.stepperContainer}>
          <div className={styles.activeStepItem}>
            <div className={styles.stepDot} />
            <span>Informações Gerais</span>
          </div>
          <div className={styles.stepItem}>
            <div className={styles.stepDot} />
            <span>Configurações de SEO</span>
          </div>
        </div>

        <div className={styles.tipsCard}>
          <AlertCircle size={20} />
          <p>Imóveis com mais de 5 fotos e descrições detalhadas convertem 40% mais leads.</p>
        </div>
      </aside>

      {/* Área Principal de Scroll */}
      <main className={styles.mainContent}>
        <form className={styles.formContent} onSubmit={(e) => e.preventDefault()}>
          
          {/* CARD: GALERIA */}
          <section className={styles.glassCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}><ImageIcon size={22} /></div>
              <div>
                <h2>Galeria de Fotos</h2>
                <p>Arraste as melhores fotos para a capa.</p>
              </div>
            </div>

            <div className={styles.dropzone}>
              <input type="file" multiple className={styles.fileInput} />
              <Camera size={40} />
              <h3>Selecione as fotos do imóvel</h3>
              <p>Formatos suportados: JPG, PNG. Recomendado 16:9.</p>
            </div>
          </section>

          {/* CARD: DETALHES PRINCIPAIS */}
          <section className={styles.glassCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}><Info size={22} /></div>
              <div>
                <h2>Detalhes Técnicos</h2>
                <p>Informações que aparecem nos filtros de busca.</p>
              </div>
            </div>

            <div className={styles.inputGrid}>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label>Título do Anúncio</label>
                <input type="text" placeholder="Ex: Cobertura Duplex Decorada em Alphaville" />
              </div>

              <div className={styles.inputGroup}>
                <label><Maximize2 size={16}/> Área Privativa (m²)</label>
                <input type="number" placeholder="000" />
              </div>
              <div className={styles.inputGroup}>
                <label><BedDouble size={16}/> Dormitórios</label>
                <input type="number" placeholder="0" />
              </div>
              <div className={styles.inputGroup}>
                <label><Bath size={16}/> Banheiros/Suítes</label>
                <input type="number" placeholder="0" />
              </div>
              <div className={styles.inputGroup}>
                <label><Car size={16}/> Vagas de Garagem</label>
                <input type="number" placeholder="0" />
              </div>

              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label><DollarSign size={16}/> Valor de Venda</label>
                <div className={styles.currencyInput}>
                  <span>R$</span>
                  <input 
                    type="text" 
                    value={price} 
                    onChange={handlePriceChange} 
                    placeholder="0,00" 
                  />
                </div>
              </div>
            </div>
          </section>

          {/* CARD: LOCALIZAÇÃO & DESCRIÇÃO */}
          <section className={styles.glassCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}><MapPin size={22} /></div>
              <div>
                <h2>Localização e Narrativa</h2>
                <p>Onde o imóvel está e o que o torna único.</p>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Endereço ou Bairro</label>
              <input type="text" placeholder="Ex: Jardim Europa, São Paulo - SP" />
            </div>

            <div className={styles.inputGroup}>
              <label>Descrição Criativa</label>
              <textarea rows={6} placeholder="Conte a história deste imóvel..."></textarea>
            </div>
          </section>

          {/* BARRA DE AÇÕES FIXA NO RODAPÉ */}
          <footer className={styles.stickyFooter}>
            <div className={styles.footerContent}>
              <button type="button" onClick={() => navigate('/dashboard')} className={styles.btnSecondary}>
                Descartar rascunho
              </button>
              <button type="submit" className={styles.btnPrimary}>
                <CheckCircle2 size={20} />
                Publicar na Vitrine
              </button>
            </div>
          </footer>
        </form>
      </main>
    </div>
  );
}