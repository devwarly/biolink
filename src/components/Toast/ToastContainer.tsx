import React from 'react';
import { 
  CheckCircle, AlertCircle, Info, X, AlertTriangle 
} from 'lucide-react';
import styles from './Toast.module.css';

const icons = {
  success: <CheckCircle size={20} />,
  error: <AlertCircle size={20} />,
  info: <Info size={20} />,
  warning: <AlertTriangle size={20} />
};

export function ToastContainer({ messages, onRemove }: any) {
  return (
    <div className={styles.wrapper}>
      {messages.map((msg: any) => (
        <div key={msg.id} className={`${styles.toast} ${styles[msg.type]}`}>
          <span className={styles.icon}>{icons[msg.type]}</span>
          <p className={styles.text}>{msg.text}</p>
          <button onClick={() => onRemove(msg.id)} className={styles.closeBtn}>
            <X size={16} />
          </button>
          <div className={styles.progressBar} />
        </div>
      ))}
    </div>
  );
}