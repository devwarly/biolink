import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextData {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void; // Adicionado para seleção direta
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('@MeuApp:theme');
    return (saved as Theme) || 'light';
  });

  useEffect(() => {
    // Aplica o atributo data-theme no <html> para o CSS global
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('@MeuApp:theme', theme);
  }, [theme]);

  // Função para alternar (útil para botões simples de clique único)
  const toggleTheme = () => {
    setThemeState(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Função para definir um tema específico (necessária para o seu novo Dropdown)
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);