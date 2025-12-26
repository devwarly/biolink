import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  // Simulação: verifica se o token existe no localStorage
  const isAuthenticated = localStorage.getItem('sb-token') !== null;

  if (!isAuthenticated) {
    // Redireciona para login e limpa o histórico para evitar voltar ao dashboard deslogado
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};