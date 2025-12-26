import React from 'react';
import { useTheme } from '../../contexts/ThemeContext'; // Importe seu contexto de tema
import './Logo.css';

// Importação das imagens PNG
import iconDark from '../../assets/icons/icon-full-to-darck.png';
import iconLight from '../../assets/icons/icon-full-to-ligth.png';

interface LogoIconProps {
  className?: string;
  size?: number;
}

export function LogoIcon({ className, size = 40 }: LogoIconProps) {
  const { theme } = useTheme(); // Acessa o tema atual ('light' ou 'dark')

  // Define qual imagem usar com base no tema
  const currentIcon = theme === 'dark' ? iconDark : iconLight;

  return (
    <div 
      className={className} 
      style={{ 
        width: size, 
        height: 'auto', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}
    >
      <img 
        src={currentIcon} 
        alt="ImobiPage Logo Icon" 
        style={{ 
          maxWidth: '100%', 
          height: 'auto',
          transition: '0.3s ease'
        }} 
      />
    </div>
  );
}