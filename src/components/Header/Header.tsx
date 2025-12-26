import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../Button/Button';
import { PremiumButton } from '../Button/PremiumButton';
import './Header.css';

export function Header() {
    const { theme, setTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('inicio');

    // Referência para saber se o scroll foi disparado por um clique
    const isScrollingRef = useRef(false);

    const sectionIds = ['inicio', 'solucoes', 'templates', 'recursos', 'precos'];

    useEffect(() => {
        const observerOptions = {
            root: null,
            // Ajuste fino: só ativa se a seção estiver bem no topo
            rootMargin: '-10% 0px -85% 0px',
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            // Se estivermos no meio de um scroll de clique, não mudamos via observer
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
    }, []);

    const handleThemeChange = (newTheme: 'light' | 'dark') => {
        setTheme(newTheme);
        setMenuOpen(false);
        setIsMobileMenuOpen(false);
    };

    // Função para lidar com o clique no menu
    const handleNavLinkClick = (id: string) => {
        setIsMobileMenuOpen(false);
        setActiveSection(id); // Muda o estado ativo IMEDIATAMENTE
        isScrollingRef.current = true;

        // Reativa o observer após a animação do scroll acabar
        setTimeout(() => {
            isScrollingRef.current = false;
        }, 1000);
    };

    return (
        <header className="header-container">
            <div className="header-content">
                <Link to="/" className="logo" onClick={() => window.scrollTo(0, 0)}>
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

                {isMobileMenuOpen && <div className="menu-backdrop-mobile" onClick={() => setIsMobileMenuOpen(false)} />}

                <nav className={`nav-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                    <div className="nav-links">
                        {sectionIds.map((id) => (
                            <a
                                key={id}
                                href={`#${id}`} // O navegador buscará o elemento com id="${id}"
                                className={activeSection === id ? 'active' : ''}
                                onClick={(e) => {
                                    // Opcional: Garante que o Router não tente processar isso como uma nova rota
                                    handleNavLinkClick(id);
                                }}
                            >
                                {id === 'precos' ? 'Preços' : id.charAt(0).toUpperCase() + id.slice(1)}
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
                    <Button variant="ghost" size="sm">Entrar</Button>
                    <Button variant="primary" size="sm">Começar</Button>
                </div>
            </div>
        </header>
    );
}