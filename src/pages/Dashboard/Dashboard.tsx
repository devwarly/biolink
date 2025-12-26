import React, { useState } from 'react';
import { 
  LayoutDashboard, Home, Users, Settings, Plus, 
  ExternalLink, Edit3, LogOut, BarChart3, Palette, 
  Menu, X, Smartphone, QrCode, TrendingUp, Eye, Target 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import { LogoIcon } from '../../components/LogoIcon/LogoIcon';

// Componente para Cards de Métricas com feedback visual de tendência
const StatCard = ({ label, value, trend, icon, color }: any) => (
  <div className={styles.statCard}>
    <div className={`${styles.statIcon} ${styles[color]}`}>{icon}</div>
    <div className={styles.statInfo}>
      <p>{label}</p>
      <strong>{value}</strong>
      <span className={styles.trendLabel}>
        <TrendingUp size={12} /> {trend} esta semana
      </span>
    </div>
  </div>
);

export function Dashboard() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Dados simulados baseados nos requisitos de Analytics de Funil
  const stats = [
    { label: "Visualizações", value: "1.284", trend: "+12%", icon: <Eye />, color: "blue" },
    { label: "Cliques WhatsApp", value: "142", trend: "+8%", icon: <Smartphone />, color: "green" },
    { label: "Novos Leads", value: "28", trend: "+5%", icon: <Target />, color: "purple" },
    { label: "Taxa de Conv.", value: "11%", trend: "+2%", icon: <BarChart3 />, color: "orange" },
  ];

  const handleLogout = () => {
    localStorage.removeItem('sb-token');
    navigate('/login');
  };

  return (
    <div className={styles.dashboardContainer}>
      
      <button 
        className={styles.mobileMenuToggle} 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Alternar Menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar com Perfil do Corretor e Gestão de Planos */}
      <aside className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}><LogoIcon size={150}/></div>
          
          <div className={styles.userProfile}>
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
              alt="Avatar do Corretor" 
              className={styles.profileImg} 
            />
            <div className={styles.userInfo}>
              <h4>João Silva</h4>
              <span>CRECI 123.456-F</span>
            </div>
          </div>
          <div className={styles.planBadge}>Plano Premium</div>
        </div>

        <nav className={styles.navMenu}>
          <button 
            className={`${styles.navLink} ${activeTab === 'dashboard' ? styles.active : ''}`}
            onClick={() => { setActiveTab('dashboard'); setIsMenuOpen(false); }}
          >
            <LayoutDashboard size={20} /> Painel Geral
          </button>
          
          <button 
            className={`${styles.navLink} ${activeTab === 'properties' ? styles.active : ''}`}
            onClick={() => { setActiveTab('properties'); setIsMenuOpen(false); }}
          >
            <Home size={20} /> Meus Imóveis
          </button>

          <button className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
            <Palette size={20} /> Personalizar Vitrine
          </button>

          <button className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
            <Users size={20} /> Gestão de Leads
          </button>

          <div className={styles.divider} />

          <button className={styles.navLink}>
            <QrCode size={20} /> QR Code Dinâmico
          </button>
          
          <button className={styles.navLink}>
            <Settings size={20} /> SEO Otimizado
          </button>
        </nav>

        <button className={styles.logoutBtn} onClick={handleLogout}>
          <LogOut size={20} /> Encerrar Sessão
        </button>
      </aside>

      {/* Área Principal de Conteúdo */}
      <main className={styles.mainWrapper}>
        <header className={styles.topBar}>
          <div className={styles.breadcrumb}>
            <span>Dashboard</span> / <strong>Visão Geral</strong>
          </div>
          <div className={styles.userActions}>
            <button className={styles.previewBtn} title="Ver página pública">
              <ExternalLink size={18} /> Ver Minha Vitrine
            </button>
            <button className={styles.primaryBtn}>
              <Plus size={18} /> Adicionar Imóvel
            </button>
          </div>
        </header>

        <section className={styles.content}>
          <div className={styles.welcomeHeader}>
            <h1>Área do Consultor</h1>
            <p>Sua vitrine digital está pronta para converter novos leads hoje.</p>
          </div>

          {/* Grid de Analytics de Funil */}
          <div className={styles.statsGrid}>
            {stats.map((stat, i) => <StatCard key={i} {...stat} />)}
          </div>

          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <h2>Imóveis Cadastrados</h2>
              <button className={styles.textBtn}>Ver Catálogo Completo</button>
            </div>

            <div className={styles.propertiesGrid}>
              {/* Exemplo de Card de Imóvel com Metadados */}
              <div className={styles.propertyCard}>
                <div 
                  className={styles.propertyImage} 
                  style={{backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400)'}}
                >
                  <span className={styles.statusBadge}>Destaque</span>
                </div>
                <div className={styles.propertyInfo}>
                  <h3>Cobertura de Luxo - Alphaville</h3>
                  <p className={styles.price}>R$ 4.500.000,00</p>
                  <div className={styles.propertyMeta}>
                    <span>4 Quartos</span> • <span>320m²</span>
                  </div>
                  <div className={styles.cardActions}>
                    <button className={styles.actionIcon} title="Editar"><Edit3 size={16} /></button>
                    <button className={styles.actionIcon} title="Estatísticas"><BarChart3 size={16} /></button>
                    <button className={styles.actionIcon} title="Link Público"><ExternalLink size={16} /></button>
                  </div>
                </div>
              </div>
              
              {/* Card Placeholder para Novo Imóvel */}
              <button className={styles.addPropertyCard} onClick={() => navigate('/cadastrar-imovel')}>
                <Plus size={32} />
                <span>Cadastrar novo imóvel</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}