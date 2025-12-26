import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { Header } from './components/Header/Header';
import { ThemeProvider } from './contexts/ThemeContext';
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Auth/Login';
import { Cadastro } from './pages/Auth/Cadastro';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { AddProperty } from './pages/Dashboard/AddProperty';
import { PublicProfile } from './pages/PublicProfile/PublicProfile';
import { NotificationProvider } from './contexts/NotificationContext';
import './styles/Global.css';

const LayoutContent = () => {
    const location = useLocation();
    const hideHeaderRoutes = ['/login', '/cadastro', '/dashboard', '/cadastrar-imovel'];
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
                    <Route path="/:slug" element={<PublicProfile />} />

                    {/* Rotas Protegidas com PrivateRoute */}
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/cadastrar-imovel"
                        element={
                            <PrivateRoute>
                                <AddProperty />
                            </PrivateRoute>
                        }
                    />

                    {/* Fallback para Landing Page */}
                    <Route path="*" element={<LandingPage />} />
                </Routes>
            </main>
        </>
    );
};

export default function App() {
    const [initializing, setInitializing] = useState(true);

    useEffect(() => {
        const handleAuth = async () => {
            console.log("Evento Auth:", event);
            const { data: { session } } = await supabase.auth.getSession();
            
            // 2. Se houver sessão, o Supabase já limpou o hash da URL internamente
            setInitializing(false);
        };

        handleAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setInitializing(false);
            
            // Se o login for detectado, podemos forçar a ida ao dashboard se estivermos na raiz
            if (session && window.location.hash.includes('access_token')) {
                window.location.hash = '#/dashboard';
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    if (initializing) return null; 

    return (
        <ThemeProvider>
            <NotificationProvider>
                <HashRouter>
                    <LayoutContent />
                </HashRouter>
            </NotificationProvider>
        </ThemeProvider>
    );
}