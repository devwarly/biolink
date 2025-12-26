import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { ThemeProvider } from './contexts/ThemeContext';
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Auth/Login';
import { Cadastro } from './pages/Auth/Cadastro';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import './styles/Global.css';

const LayoutContent = () => {
  const location = useLocation();
  const hideHeaderRoutes = ['/login', '/cadastro', '/dashboard'];
  
  // Verifica se a rota atual começa com algum dos caminhos proibidos para o Header
  const shouldHideHeader = hideHeaderRoutes.some(route => location.pathname.startsWith(route));

  return (
    <>
      {!shouldHideHeader && <Header />}
      <main>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          
          {/* Rota Protegida: O Dashboard só renderiza se PrivateRoute permitir */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />

          <Route path="*" element={<LandingPage />} />
        </Routes>
      </main>
    </>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <LayoutContent />
      </HashRouter>
    </ThemeProvider>
  );
}