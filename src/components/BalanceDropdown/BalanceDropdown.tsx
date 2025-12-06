'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './BalanceDropdown.module.scss';

interface Currency {
    id: string;
    code: string;
    symbol: string | null;
    balance: string;
    icon: string;
    type: 'fiat' | 'crypto';
}

const currencies: Currency[] = [
    { id: 'usd', code: 'USD', symbol: null , balance: '0.00', icon: '/usd.svg', type: 'fiat' },
    { id: 'eur', code: 'EUR', symbol: null, balance: '0.00', icon: '/eur.svg', type: 'fiat' },
    { id: 'doge', code: 'DOGE', symbol: null, balance: '0.00000000', icon: '/doge.svg', type: 'crypto' },
    { id: 'btc', code: 'BTC', symbol: null, balance: '0.00000000', icon: '/btc.svg', type: 'crypto' },
    { id: 'eth', code: 'ETH', symbol: null, balance: '0.00000000', icon: '/eth.svg', type: 'crypto' },
    { id: 'usdt', code: 'USDT', symbol: null, balance: '0.00000000', icon: '/usdt.svg', type: 'crypto' },
];

const BalanceDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<Currency>(currencies[3]); 

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleSelect = (currency: Currency) => {
        setSelected(currency);
        setIsOpen(false);
    };

    return (
        <div className={styles.wrapper}>
            <button 
                className={`${styles.balanceButton} ${isOpen ? styles.active : ''}`} 
                onClick={toggleDropdown}
                type="button"
            >
                {/* Левая часть: Цифры + Иконка валюты */}
                <span className={styles.balanceValue}>
                    {selected.balance}
                    {selected.symbol && <span style={{ marginLeft: 2 }}>{selected.symbol}</span>}
                    
                    <Image
                        src={selected.icon}
                        alt={selected.code}
                        width={16}
                        height={17}
                        priority
                        // Убираем лишние стили с картинки, выравнивание через flex родителя
                    />
                </span>
                
                {/* Правая часть: Стрелка открытия */}
                <div className={styles.arrowIcon}>
                     <Image
                        src="/openButton.svg"
                        alt="open"
                        width={28}
                        height={28}
                        priority 
                    />
                </div>
            </button>

            {/* Выпадающий список */}
            {isOpen && (
                <div className={styles.dropdownList}>
                    {currencies.map((currency) => (
                        <div 
                            key={currency.id} 
                            className={`${styles.dropdownItem} ${selected.id === currency.id ? styles.selected : ''}`}
                            onClick={() => handleSelect(currency)}
                        >
                            <span className={styles.itemBalance}>
                                {currency.balance} {currency.symbol}
                            </span>
                            <div className={styles.itemCurrency}>
                                <Image
                                    src={currency.icon} 
                                    alt={currency.code}
                                    width={20}
                                    height={20}
                                />
                                <span className={styles.itemCode}>{currency.code}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BalanceDropdown;