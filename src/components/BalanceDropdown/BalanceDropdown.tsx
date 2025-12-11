'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'; 
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
    { id: 'usd', code: 'USD', symbol: '$', balance: '0.00', icon: '/usd.svg', type: 'fiat' },
    { id: 'eur', code: 'EUR', symbol: '€', balance: '0.00', icon: '/eur.svg', type: 'fiat' },
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
                <span className={styles.balanceValue}>
                    <span className={styles.balanceText}>
                        {selected.balance} {selected.symbol}
                    </span>
                    <Image
                        src={selected.icon}
                        alt={selected.code}
                        width={20}
                        height={20}
                        priority
                        className={styles.currencyIcon} 
                    />
                </span>
                
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

            {isOpen && (
                <div className={styles.dropdownList}>
                    
                    {/* --- МОБИЛЬНАЯ КНОПКА DEPOSIT --- */}
                    {/* Появляется только на экранах < 600px */}
                    <div className={styles.mobileDepositWrapper}>
                        <Link href="" className={styles.mobileDepositBtn}>
                            Deposit
                        </Link>
                    </div>

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