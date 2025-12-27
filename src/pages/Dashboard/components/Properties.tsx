import React, { useState } from 'react';
import { Check, Lock, Palette, Layout, Sparkles } from 'lucide-react';
import styles from './Properties.module.css';

import { useNavigate } from 'react-router-dom';
import { Edit3, Trash2, Plus } from 'lucide-react';
export const Properties = () => {
    const navigate = useNavigate();



    return (
        <div className={styles.wrapper}>
            <div className={styles.sectionHeader}>
                <h2>Imóveis Cadastrados</h2>
            </div>
            <div className={styles.propertiesGrid}>
                <div className={styles.propertyCard}>
                    <div className={styles.propertyImage} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400)' }}>
                        <span className={styles.statusBadge}>Destaque</span>
                    </div>
                    <div className={styles.propertyInfo}>
                        <h3>Cobertura de Luxo - Alphaville</h3>
                        <p className={styles.price}>R$ 4.500.000,00</p>
                        <div className={styles.cardActions}>
                            <button className={styles.actionIcon}><Edit3 size={16} /></button>
                            <button className={styles.actionIcon}><Trash2 size={16} /></button>
                        </div>
                    </div>
                </div>
                <div className={styles.propertyCard}>
                    <div className={styles.propertyImage} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80)' }}>
                        <span className={styles.statusBadge}>Destaque</span>
                    </div>
                    <div className={styles.propertyInfo}>
                        <h3>Cobertura de Luxo - Alphaville</h3>
                        <p className={styles.price}>R$ 4.500.000,00</p>
                        <div className={styles.cardActions}>
                            <button className={styles.actionIcon}><Edit3 size={16} /></button>
                            <button className={styles.actionIcon}><Trash2 size={16} /></button>
                        </div>
                    </div>
                </div>
                <div className={styles.propertyCard}>
                    <div className={styles.propertyImage} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80)' }}>
                        <span className={styles.statusBadge}>Destaque</span>
                    </div>
                    <div className={styles.propertyInfo}>
                        <h3>Cobertura de Luxo - Alphaville</h3>
                        <p className={styles.price}>R$ 4.500.000,00</p>
                        <div className={styles.cardActions}>
                            <button className={styles.actionIcon}><Edit3 size={16} /></button>
                            <button className={styles.actionIcon}><Trash2 size={16} /></button>
                        </div>
                    </div>
                </div>
                <button className={styles.addPropertyCard} onClick={() => navigate('/cadastrar-imovel')}>
                    <Plus size={32} />
                    <span>Cadastrar novo imóvel</span>
                </button>
            </div>
        </div>
    );
}