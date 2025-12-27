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
import { EmailConfirmedReset } from './pages/Auth/EmailConfirmedReset';
import { ForgotPassword } from './pages/Auth/ForgotPassword';
import { ForgotPasswordSuccess } from './pages/Auth/ForgotPasswordSuccess';
import { ResetPassword } from './pages/Auth/ResetPassword';
import './styles/Global.css';

const LayoutContent = () => {
    const location = useLocation();
    const hideHeaderRoutes = ['/login', '/cadastro', '/dashboard', '/cadastrar-imovel', '/verify-email', '/email-confirmed', '/forgot-password', '/reset-password'];
    const shouldHideHeader = hideHeaderRoutes.some(route => location.pathname.startsWith(route));

    return (
        <>
            {!shouldHideHeader && <Header />}
            <main>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/forgot-password-success" element={<ForgotPasswordSuccess />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/verify-email" element={<VerifyEmail />} />
                    <Route path="/email-confirmed" element={<EmailConfirmed />} />
                    <Route path="/email-confirmed-reset" element={<EmailConfirmedReset />} />
                    <Route path="/:slug" element={<PublicProfile />} />

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
        const handleAuthLinks = () => {
            const hash = window.location.hash;

            // 1. Caso seja RECUPERAÇÃO DE SENHA
            if (hash.includes('type=recovery')) {
                if (!hash.includes('/email-confirmed-reset')) {
                    console.log("Link de recuperação detectado.");
                    const tokenData = hash.replace('#', '');
                    window.location.hash = `#/email-confirmed-reset?${tokenData}`;
                }
            }

            // 2. Caso seja CONFIRMAÇÃO DE CADASTRO (Novo)
            else if (hash.includes('type=signup')) {
                if (!hash.includes('/email-confirmed')) {
                    console.log("Link de confirmação de cadastro detectado.");
                    const tokenData = hash.replace('#', '');
                    // Redireciona para a tela que você já tem de Email Confirmado
                    window.location.hash = `#/email-confirmed?${tokenData}`;
                }
            }
        };

        handleAuthLinks();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
            // Se o Supabase identificar o evento de recuperação explicitamente
            if (event === 'PASSWORD_RECOVERY') {
                if (!window.location.hash.includes('/email-confirmed-reset')) {
                    window.location.hash = '#/email-confirmed-reset';
                }
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