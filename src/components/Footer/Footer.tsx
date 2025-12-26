import { Facebook, Instagram, Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import styles from './Footer.module.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Coluna 1: Branding */}
          <div className={styles.brandCol}>
            <div className={styles.logo}>
              Software<span>House</span>
            </div>
            <p className={styles.description}>
              Transformando a presença digital de corretores de elite com tecnologia de ponta e design de alto padrão.
            </p>
            <div className={styles.socials}>
              <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
              <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Coluna 2: Navegação */}
          <div className={styles.linksCol}>
            <h3>Plataforma</h3>
            <ul>
              <li><a href="#inicio">Início</a></li>
              <li><a href="#solucoes">Soluções</a></li>
              <li><a href="#templates">Templates</a></li>
              <li><a href="#precos">Preços</a></li>
            </ul>
          </div>

          {/* Coluna 3: Suporte/Legal */}
          <div className={styles.linksCol}>
            <h3>Suporte</h3>
            <ul>
              <li><a href="#">Central de Ajuda</a></li>
              <li><a href="#">Termos de Uso</a></li>
              <li><a href="#">Privacidade</a></li>
              <li><a href="#">Cookies</a></li>
            </ul>
          </div>

          {/* Coluna 4: Contato/Newsletter */}
          <div className={styles.contactCol}>
            <h3>Fique por dentro</h3>
            <p>Receba dicas de marketing imobiliário e atualizações.</p>
            <form className={styles.newsletter} onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Seu melhor e-mail" />
              <button type="submit">Assinar</button>
            </form>
            <div className={styles.contactInfo}>
              <span><Mail size={16} /> contato@softwarehouse.com</span>
              <span><Phone size={16} /> (11) 99999-9999</span>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p>&copy; {currentYear} SoftwareHouse Pro. Todos os direitos reservados.</p>
          <p>Desenvolvido com foco em conversão.</p>
        </div>
      </div>
    </footer>
  );
};