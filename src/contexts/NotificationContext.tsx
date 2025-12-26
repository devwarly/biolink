import React, { createContext, useContext, useState, useCallback } from 'react';
import { ToastContainer } from '../components/Toast/ToastContainer';

type MessageType = 'success' | 'error' | 'info' | 'warning';

interface Message {
  id: string;
  type: MessageType;
  text: string;
}

interface NotificationContextData {
  notify: (type: MessageType, text: string) => void;
}

const NotificationContext = createContext<NotificationContextData>({} as NotificationContextData);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const notify = useCallback((type: MessageType, text: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setMessages((prev) => [...prev, { id, type, text }]);

    // Remove automaticamente após 4 segundos
    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    }, 4000);
  }, []);

  const removeMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <ToastContainer messages={messages} onRemove={removeMessage} />
    </NotificationContext.Provider>
  );
};

export const useNotify = () => useContext(NotificationContext);