
import { Download} from 'lucide-react';
import styles from '../Dashboard.module.css';

export const Leads = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.sectionHeader}>
                <h2>Leads Recebidos</h2>
                <button className={styles.previewBtn}><Download size={16} /> Exportar Lista</button>
            </div>
            <div className={styles.tableCard}>
                <table className={styles.leadsTable}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>WhatsApp</th>
                            <th>Interesse</th>
                            <th>Data</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2, 3].map(i => (
                            <tr key={i}>
                                <td><strong>Cliente Exemplo {i}</strong></td>
                                <td>(11) 99999-9999</td>
                                <td><span className={styles.statusBadge}>Cobertura Luxo</span></td>
                                <td>26/12/2025</td>
                                <td><span className={styles.onlineStatus}>Novo</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}