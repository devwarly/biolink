import { HashRouter, Routes, Route } from 'react-router-dom'; // Importação corrigida aqui
import { Header } from './components/Header/Header';
import { ThemeProvider } from './contexts/ThemeContext';
import { Hero } from './components/Hero/Hero';
import { Solucoes } from './components/Solucoes/Solucoes';
import { Templates } from "./components/Templates/Templates";
import { Recursos } from './components/Recursos/Recursos';
import { Precos } from './components/Precos/Precos';
import { Footer } from './components/Footer/Footer';
import './styles/Global.css';

// Componente que agrupa todas as seções da Home
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
            <HashRouter>
                <Header />
                <main>
                    <Routes>
                        {/* Rota principal */}
                        <Route path="/" element={<LandingPage />} />

                        {/* Rota de login */}
                        <Route path="/login" element={<div>Página de Login</div>} />

                        {/* SOLUÇÃO: Captura /biolink/ e qualquer outra variação e manda para a Home */}
                        <Route path="*" element={<LandingPage />} />
                    </Routes>
                </main>
            </HashRouter>
        </ThemeProvider>
    );
}