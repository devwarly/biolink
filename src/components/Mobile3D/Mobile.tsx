import styles from './mobile.module.css';
import telaCelular from '../../assets/mockup-celular.png';

export const Mobile = () => {
    return (
        <div className={styles.imageSide}>
            <div className={styles.phoneWrapper}>

                <img
                    src={telaCelular}
                    alt="Visualização no Celular"
                    className={styles.phoneImage}
                />
            </div>

            <div className={styles.phoneGlow}></div>
            <div className={styles.phoneShadow}></div>
        </div>
    );
};