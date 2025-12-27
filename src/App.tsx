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
import { VerifyEmail } from './pages/Auth/VerifyEmail';
import { EmailConfirmed } from './pages/Auth/EmailConfirmed';
import './styles/Global.css';

const LayoutContent = () => {
    const location = useLocation();

    const hideHeaderRoutes = ['/login', '/cadastro', '/dashboard', '/cadastrar-imovel', '/verify-email', '/email-confirmed'];
    const shouldHideHeader = hideHeaderRoutes.some(route => location.pathname.startsWith(route));

    return (
        <>
            {!shouldHideHeader && <Header />}
            <main>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/verify-email" element={<VerifyEmail />} />
                    <Route path="/:slug" element={<PublicProfile />} />
                    <Route path="/email-confirmed" element={<EmailConfirmed />} />

                    <Route path="/dashboard" element={
                        <PrivateRoute><Dashboard /></PrivateRoute>
                    } />
                    <Route path="/cadastrar-imovel" element={
                        <PrivateRoute><AddProperty /></PrivateRoute>
                    } />

                    <Route path="*" element={<LandingPage />} />
                </Routes>
            </main>
        </>
    );
};

export default function App() {
    const [initializing, setInitializing] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            await supabase.auth.getSession();
            setInitializing(false);
        };
        checkSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && window.location.hash.includes('access_token')) {
                
                console.log("Token detectado, aguardando persistência...");
            }
            setInitializing(false);
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