import { useEffect, useState, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        // 1. Verifica se já existe uma sessão ativa ao montar o componente
        const getInitialSession = async () => {
            const { data: { session: currentSession } } = await supabase.auth.getSession();
            setSession(currentSession);
            setLoading(false);
        };

        getInitialSession();

        // 2. Escuta mudanças em tempo real (essencial para capturar o redirecionamento do Google)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    // 3. Enquanto o Supabase não confirma se o usuário está logado, retornamos nulo
    // Isso evita que o usuário veja a tela de login por um milissegundo antes de entrar no dashboard
    if (loading) return null;

    // 4. Se após o carregamento não houver sessão, redireciona para o login
    // Salvamos a rota que o usuário tentou acessar em 'state' para devolvê-lo lá depois
    return session ? (
        <>{children}</>
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};