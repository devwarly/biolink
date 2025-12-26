import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  // Alterado para aceitar qualquer ícone (Lucide ou Bootstrap Icons)
  icon?: React.ReactNode; 
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  icon,
  ...props 
}: ButtonProps) {
  return (
    <button 
      className={`btn btn-${variant} btn-${size} ${className}`} 
      {...props}
    >
      {/* Se houver um ícone, ele aparece antes do texto */}
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
}