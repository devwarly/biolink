import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard, Home, Users, Settings, Plus,
    ExternalLink, Edit3, LogOut, BarChart3, Palette,
    Menu, X, Smartphone, QrCode, TrendingUp, Eye, Target,
    Download, Trash2, ShieldCheck, ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../../components/Button/Button';
import { LogoIcon } from '../../components/LogoIcon/LogoIcon';
import { TemplatePicker } from './components/TemplatePicker';
import styles from './Dashboard.module.css';

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
    const { theme, setTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [themeMenuOpen, setThemeMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');

    // Estado para armazenar os dados reais do perfil
    const [profile, setProfile] = useState<any>(null);

    // 1. Busca os dados do perfil ao carregar o componente
    useEffect(() => {
        async function getProfile() {
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (!error) {
                    setProfile(data);
                }
            }
        }
        getProfile();
    }, []);

    // Gera a URL dinâmica baseada no slug real do banco
    const publicUrl = profile
        ? `${window.location.origin}${window.location.pathname}#/${profile.slug}`
        : '#';

    const stats = [
        { label: "Visualizações", value: "1.284", trend: "+12%", icon: <Eye />, color: "blue" },
        { label: "Cliques Whats", value: "142", trend: "+8%", icon: <Smartphone />, color: "green" },
        { label: "Novos Leads", value: "28", trend: "+5%", icon: <Target />, color: "purple" },
        { label: "Taxa Conv.", value: "11%", trend: "+2%", icon: <BarChart3 />, color: "orange" },
    ];

    const handleThemeChange = (newTheme: 'light' | 'dark') => {
        setTheme(newTheme);
        setThemeMenuOpen(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();

        navigate('/');
    };

    return (
        <div className={styles.dashboardContainer}>
            <button className={styles.mobileMenuToggle} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <aside className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarOpen : ''}`}>
                <div className={styles.sidebarHeader}>
                    <div className={styles.logo}><LogoIcon size={120} /></div>

                    <div className={styles.userProfile}>
                        {/* Imagem dinâmica: usa a do banco ou um avatar padrão baseado no nome */}
                        <img
                            src={profile?.profile_image_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.display_name || 'User'}`}
                            alt="Avatar"
                            className={styles.profileImg}
                        />
                        <div className={styles.userInfo}>
                            {/* Nome dinâmico do banco de dados */}
                            <h4>{profile?.display_name || 'Carregando...'}</h4>
                            <span>{profile?.creci_number ? `CRECI ${profile.creci_number}` : 'Consultor Imobiliário'}</span>
                        </div>
                    </div>
                    <div className={styles.planBadge}>
                        <ShieldCheck size={12} />
                        {profile?.plan_type === 'premium' ? ' Plano Premium' : ' Plano Gratuito'}
                    </div>
                </div>

                <nav className={styles.navMenu}>
                    <button className={`${styles.navLink} ${activeTab === 'dashboard' ? styles.active : ''}`} onClick={() => { setActiveTab('dashboard'); setIsMenuOpen(false); }}>
                        <LayoutDashboard size={20} /> Painel Geral
                    </button>
                    <button className={`${styles.navLink} ${activeTab === 'properties' ? styles.active : ''}`} onClick={() => { setActiveTab('properties'); setIsMenuOpen(false); }}>
                        <Home size={20} /> Meus Imóveis
                    </button>
                    <button className={`${styles.navLink} ${activeTab === 'leads' ? styles.active : ''}`} onClick={() => { setActiveTab('leads'); setIsMenuOpen(false); }}>
                        <Users size={20} /> Gestão de Leads
                    </button>
                    <button
                        className={`${styles.navLink} ${activeTab === 'appearance' ? styles.active : ''}`}
                        onClick={() => { setActiveTab('appearance'); setIsMenuOpen(false); }}
                    >
                        <Palette size={20} /> Personalizar Vitrine
                    </button>
                    <button className={`${styles.navLink} ${activeTab === 'qrcode' ? styles.active : ''}`} onClick={() => { setActiveTab('qrcode'); setIsMenuOpen(false); }}>
                        <QrCode size={20} /> QR Code Dinâmico
                    </button>
                    <div className={styles.divider} />
                    <button className={`${styles.navLink} ${activeTab === 'settings' ? styles.active : ''}`} onClick={() => { setActiveTab('settings'); setIsMenuOpen(false); }}>
                        <Settings size={20} /> Configurações SEO
                    </button>
                    <div className={styles.themeMenuWrapper}>
                        <Button
                            variant="ghost"
                            size="sm"
                            className={styles.themeToggleBtn}
                            onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                        >
                            <i className={`bi ${theme === 'light' ? 'bi-sun' : 'bi-moon-stars'} me-2`}></i>
                            <span>Tema</span>
                            <i className={`bi bi-chevron-down ms-2 ${themeMenuOpen ? styles.arrowOpen : ''}`}></i>
                        </Button>

                        {themeMenuOpen && (
                            <ul className={styles.themeDropdownMenu}>
                                <li className={`${styles.dropdownItem} ${theme === 'light' ? styles.activeTheme : ''}`} onClick={() => handleThemeChange('light')}>
                                    <i className="bi bi-sun-fill"></i>
                                    <span>Claro</span>
                                </li>
                                <li className={`${styles.dropdownItem} ${theme === 'dark' ? styles.activeTheme : ''}`} onClick={() => handleThemeChange('dark')}>
                                    <i className="bi bi-moon-stars-fill"></i>
                                    <span>Escuro</span>
                                </li>
                            </ul>
                        )}
                    </div>
                </nav>

                <button className={styles.logoutBtn} onClick={handleLogout}><LogOut size={20} /> Sair do Painel</button>
            </aside>

            <main className={styles.mainWrapper}>
                <header className={styles.topBar}>
                    <div className={styles.breadcrumb}>Dashboard / <strong>{activeTab.toUpperCase()}</strong></div>

                    <div className={styles.userActions}>
                        {/* O link agora aponta corretamente para #/joao-silva */}
                        <a href={publicUrl} target="_blank" rel="noreferrer" className={styles.previewBtn}>
                            <ExternalLink size={18} /> Ver Vitrine
                        </a>
                        <button className={styles.primaryBtn} onClick={() => navigate('/cadastrar-imovel')}>
                            <Plus size={18} /> Novo Imóvel
                        </button>
                    </div>
                </header>

                <section className={styles.content}>
                    {activeTab === 'dashboard' && (
                        <div className={styles.animateFade}>
                            <div className={styles.welcomeHeader}>
                                <h1>Área do Consultor</h1>
                                <p>Sua vitrine digital está pronta para converter novos leads hoje.</p>
                            </div>
                            <div className={styles.statsGrid}>
                                {stats.map((stat, i) => <StatCard key={i} {...stat} />)}
                            </div>
                        </div>
                    )}

                    {activeTab === 'leads' && (
                        <div className={styles.animateFade}>
                            <div className={styles.sectionHeader}>
                                <h2>Leads Recebidos</h2>
                                <button className={styles.previewBtn}><Download size={16} /> Exportar Lista</button>
                            </div>
                            <div className={styles.tableCard}>
                                <table className={styles.leadsTable}>
                                    <thead>
                                        <tr>
                                            <th>Nome</th>
                                            <th>WhatsApp</th>
                                            <th>Interesse</th>
                                            <th>Data</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[1, 2, 3].map(i => (
                                            <tr key={i}>
                                                <td><strong>Cliente Exemplo {i}</strong></td>
                                                <td>(11) 99999-9999</td>
                                                <td><span className={styles.statusBadge}>Cobertura Luxo</span></td>
                                                <td>26/12/2025</td>
                                                <td><span className={styles.onlineStatus}>Novo</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'appearance' && (
                        <div className={styles.animateFade}>
                            {/* Aqui chamamos o componente que criamos anteriormente */}
                            <TemplatePicker />
                        </div>
                    )}

                    {/* Renderização das outras abas segue o mesmo padrão anterior */}
                    {activeTab === 'properties' && (
                        <div className={styles.animateFade}>
                            <div className={styles.sectionHeader}>
                                <h2>Imóveis Cadastrados</h2>
                            </div>
                            <div className={styles.propertiesGrid}>
                                <div className={styles.propertyCard}>
                                    <div className={styles.propertyImage} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400)' }}>
                                        <span className={styles.statusBadge}>Destaque</span>
                                    </div>
                                    <div className={styles.propertyInfo}>
                                        <h3>Cobertura de Luxo - Alphaville</h3>
                                        <p className={styles.price}>R$ 4.500.000,00</p>
                                        <div className={styles.cardActions}>
                                            <button className={styles.actionIcon}><Edit3 size={16} /></button>
                                            <button className={styles.actionIcon}><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.propertyCard}>
                                    <div className={styles.propertyImage} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80)' }}>
                                        <span className={styles.statusBadge}>Destaque</span>
                                    </div>
                                    <div className={styles.propertyInfo}>
                                        <h3>Cobertura de Luxo - Alphaville</h3>
                                        <p className={styles.price}>R$ 4.500.000,00</p>
                                        <div className={styles.cardActions}>
                                            <button className={styles.actionIcon}><Edit3 size={16} /></button>
                                            <button className={styles.actionIcon}><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.propertyCard}>
                                    <div className={styles.propertyImage} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80)' }}>
                                        <span className={styles.statusBadge}>Destaque</span>
                                    </div>
                                    <div className={styles.propertyInfo}>
                                        <h3>Cobertura de Luxo - Alphaville</h3>
                                        <p className={styles.price}>R$ 4.500.000,00</p>
                                        <div className={styles.cardActions}>
                                            <button className={styles.actionIcon}><Edit3 size={16} /></button>
                                            <button className={styles.actionIcon}><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                </div>
                                <button className={styles.addPropertyCard} onClick={() => navigate('/cadastrar-imovel')}>
                                    <Plus size={32} />
                                    <span>Cadastrar novo imóvel</span>
                                </button>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}