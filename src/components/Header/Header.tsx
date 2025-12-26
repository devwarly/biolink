import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../Button/Button';
import { PremiumButton } from '../Button/PremiumButton';
import { LogIn } from 'lucide-react';
import './Header.css';

// Mapeamento de IDs para nomes legíveis
const sectionNames: Record<string, string> = {
    inicio: 'Início',
    solucoes: 'Soluções',
    templates: 'Templates',
    recursos: 'Recursos',
    precos: 'Preços'
};

export function Header() {
    const { theme, setTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('inicio');
    const navigate = useNavigate();

    // Referência para impedir que o Observer mude a seção ativa durante um scroll disparado por clique
    const isScrollingRef = useRef(false);

    const sectionIds = Object.keys(sectionNames);

    useEffect(() => {
        const observerOptions = {
            root: null,
            // Ajuste: ativa a seção quando ela ocupa a parte superior da tela
            rootMargin: '-10% 0px -85% 0px',
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            // Se o usuário clicou em um link, ignoramos a atualização automática temporariamente
            if (isScrollingRef.current) return;

            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sectionIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [sectionIds]);

    const handleThemeChange = (newTheme: 'light' | 'dark') => {
        setTheme(newTheme);
        setMenuOpen(false);
        setIsMobileMenuOpen(false);
    };

    const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault(); // Impede o comportamento padrão da âncora
        
        setIsMobileMenuOpen(false);
        setActiveSection(id);
        
        // Bloqueia o observer para não "saltar" entre estados durante a animação
        isScrollingRef.current = true;

        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }

        // Libera o observer após o término da animação de scroll
        setTimeout(() => {
            isScrollingRef.current = false;
        }, 1000);
    };

    return (
        <header className="header-container">
            <div className="header-content">
                <Link to="/" className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    Software<span>House</span>
                </Link>

                <div className='premiunButton-mobile'>
                    <PremiumButton />
                </div>

                <button
                    className="mobile-menu-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Abrir menu"
                >
                    <i className={`bi ${isMobileMenuOpen ? 'bi-x' : 'bi-list'}`}></i>
                </button>

                {isMobileMenuOpen && (
                    <div className="menu-backdrop-mobile" onClick={() => setIsMobileMenuOpen(false)} />
                )}

                <nav className={`nav-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                    <div className="header-actions mobyle-only">
                        <Button
                            variant="ghost"
                            size="sm"
                            icon={<LogIn size={18} />}
                            onClick={() => navigate('/login')}
                        >
                            Entrar
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            icon={<LogIn size={18} />}
                            onClick={() => navigate('/cadastro')}
                        >
                            Cadastre-se
                        </Button>
                    </div>

                    <div className="nav-links">
                        {sectionIds.map((id) => (
                            <a
                                key={id}
                                href={`#${id}`}
                                className={activeSection === id ? 'active' : ''}
                                onClick={(e) => handleNavLinkClick(e, id)}
                            >
                                {sectionNames[id]}
                            </a>
                        ))}
                    </div>

                    <div className="theme-menu-wrapper">
                        <Button
                            variant="outline"
                            className="theme-toggle-btn"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <i className={`bi ${theme === 'light' ? 'bi-sun' : 'bi-moon-stars'} me-2`}></i>
                            Tema
                            <i className={`bi bi-chevron-down ms-2 arrow ${menuOpen ? 'open' : ''}`}></i>
                        </Button>

                        {menuOpen && (
                            <ul className="theme-dropdown-menu">
                                <li className={`dropdown-item ${theme === 'light' ? 'active' : ''}`} onClick={() => handleThemeChange('light')}>
                                    <i className="bi bi-sun-fill"></i>
                                    <span>Claro</span>
                                </li>
                                <li className={`dropdown-item ${theme === 'dark' ? 'active' : ''}`} onClick={() => handleThemeChange('dark')}>
                                    <i className="bi bi-moon-stars-fill"></i>
                                    <span>Escuro</span>
                                </li>
                            </ul>
                        )}
                    </div>
                </nav>

                <div className="header-actions desktop-only">
                    <div className='premiunButton-desktop'>
                        <PremiumButton />
                    </div>
                    <Link to="/login">
                        <Button variant="ghost" size="sm" icon={<LogIn size={18} />}>
                            Entrar
                        </Button>
                    </Link>
                    <Link to="/cadastro">
                        <Button variant="primary" size="sm" icon={<LogIn size={18} />}>
                            Cadastrar-se
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}