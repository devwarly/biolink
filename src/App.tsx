import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { ThemeProvider } from './contexts/ThemeContext';
import { Hero } from './components/Hero/Hero';
import { Solucoes } from './components/Solucoes/Solucoes';
import { Templates } from "./components/Templates/Templates";
import { Recursos } from './components/Recursos/Recursos';
import { Precos } from './components/Precos/Precos';
import { Footer } from './components/Footer/Footer';
import './styles/Global.css';

const LandingPage = () => (
    <>
        <Hero />
        <Solucoes />
        <Templates />
        <Recursos />
        <Precos />
        <Footer />
        
    </>
);

export default function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Header />
                <main>
                    <Routes>
                        {/* A rota raiz agora carrega todas as seções juntas */}
                        <Route path="/" element={<LandingPage />} />
                        
                        {/* Rotas para páginas que NÃO fazem parte da home */}
                        <Route path="/login" element={<div>Página de Login</div>} />
                    </Routes>
                </main>
            </BrowserRouter>
        </ThemeProvider>
    );
}