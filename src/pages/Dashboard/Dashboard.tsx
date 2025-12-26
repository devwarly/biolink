import { useState } from 'react';
import { 
  LayoutDashboard, Globe, Users, Settings, Plus, 
  ExternalLink, Edit3, LogOut, BarChart3, Palette, Menu, X 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

export const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const stats = [
        { label: "Cliques", value: "2.450", icon: <BarChart3 size={20} />, trend: '+12%' },
        { label: "Leads", value: "84", icon: <Users size={20} />, trend: '+5%' },
        { label: "Templates", value: "3", icon: <Palette size={20} />, trend: '0%' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('sb-token');
        navigate('/login');
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className={styles.dashboardContainer}>
            {/* Botão flutuante para abrir o menu no celular */}
            <button className={styles.mobileMenuToggle} onClick={toggleMenu} aria-label="Abrir Menu">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar (Menu Lateral) */}
            <aside className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarOpen : ''}`}>
                <Link to="/" className={styles.logo}>
                    Software<span>House</span>
                </Link>

                <nav className={styles.nav}>
                    <button 
                        className={`${styles.navItem} ${activeTab === 'dashboard' ? styles.active : ''}`}
                        onClick={() => { setActiveTab('dashboard'); setIsMenuOpen(false); }}
                    >
                        <LayoutDashboard size={20} /> <span>Painel Geral</span>
                    </button>
                    
                    <button 
                        className={`${styles.navItem} ${activeTab === 'sites' ? styles.active : ''}`}
                        onClick={() => { setActiveTab('sites'); setIsMenuOpen(false); }}
                    >
                        <Globe size={20} /> <span>Meus Biolinks</span>
                    </button>

                    <button 
                        className={`${styles.navItem} ${activeTab === 'leads' ? styles.active : ''}`}
                        onClick={() => { setActiveTab('leads'); setIsMenuOpen(false); }}
                    >
                        <Users size={20} /> <span>Gestão de Leads</span>
                    </button>

                    <div className={styles.navDivider}></div>

                    <button className={styles.navItem} onClick={() => { setActiveTab('settings'); setIsMenuOpen(false); }}>
                        <Settings size={20} /> <span>Preferências</span>
                    </button>

                    <button className={`${styles.navItem} ${styles.logout}`} onClick={handleLogout}>
                        <LogOut size={20} /> <span>Sair</span>
                    </button>
                </nav>
            </aside>

            {/* Fundo escurecido ao abrir o menu mobile */}
            {isMenuOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}

            <main className={styles.mainContent}>
                <header className={styles.topHeader}>
                    <div className={styles.welcome}>
                        <h1>Área do Consultor</h1>
                        <p>Gestão de performance e links.</p>
                    </div>
                    <button className={styles.createBtn}>
                        <Plus size={20} /> <span>Novo Projeto</span>
                    </button>
                </header>

                {/* Métricas Adaptáveis */}
                <div className={styles.statsGrid}>
                    {stats.map((stat, index) => (
                        <div key={index} className={styles.statCard}>
                            <div className={styles.statHeader}>
                                <div className={styles.statIcon}>{stat.icon}</div>
                                <span className={styles.trend}>{stat.trend}</span>
                            </div>
                            <div className={styles.statBody}>
                                <h3>{stat.label}</h3>
                                <strong>{stat.value}</strong>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Gerenciamento de Projetos */}
                <div className={styles.contentSection}>
                    <div className={styles.sectionHeader}>
                        <h2>Projetos Ativos</h2>
                    </div>

                    <div className={styles.projectsGrid}>
                        <div className={styles.projectCard}>
                            <div className={styles.projectThumb}>
                                <div className={styles.statusBadge}>Ativo</div>
                            </div>
                            <div className={styles.projectBody}>
                                <h3>Biolink - Alto Padrão</h3>
                                <span className={styles.url}>biolink.io/consultor-vendas</span>
                                <div className={styles.cardActions}>
                                    <button className={styles.editBtn}><Edit3 size={16} /> Editar</button>
                                    <button className={styles.viewBtn}><ExternalLink size={16} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};