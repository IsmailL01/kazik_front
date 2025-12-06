'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './LanguageSelector.module.scss';


interface ILanguage {
    code: string;
    flag: string;
    label: string;
}


const languages: ILanguage[] = [
    { code: 'En', flag: '/flag_usa.svg', label: 'English' },
    { code: 'Ru', flag: '/flag_usa.svg', label: 'Russian' },
    { code: 'De', flag: '/flag_usa.svg', label: 'German' },
];

const LanguageSelector: React.FC = () => {
  
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
  
    const [selectedLang, setSelectedLang] = useState<ILanguage>(languages[0]);

    // Тоггл меню
    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    // Выбор языка
    const handleSelect = (lang: ILanguage) => {
        setSelectedLang(lang);
        setIsOpen(false);
        console.log(`Language changed to: ${lang.label}`);
    };

    return (
        <div className={styles.container}>
            {/* Кнопка переключения */}
            <button 
                className={`${styles.button} ${isOpen ? styles.active : ''}`} 
                onClick={toggleDropdown}
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <Image 
                    src={selectedLang.flag}
                    alt={selectedLang.label}
                    width={40}
                    height={28}
                    className={styles.flag}
                    priority
                />
                <span className={styles.langCode}>
                    {selectedLang.code}
                </span>
                <Image 
                    src='/openButton.svg'
                    alt='Toggle language menu'
                    width={28}
                    height={28}
                    className={`${styles.arrow} ${isOpen ? styles.rotated : ''}`}
                    priority
                />
            </button>

            {/* Выпадающий список */}
            {isOpen && (
                <ul className={styles.dropdown} role="listbox">
                    {languages.map((lang) => (
                        <li 
                            key={lang.code} 
                            className={styles.dropdownItem}
                            onClick={() => handleSelect(lang)}
                            role="option"
                            aria-selected={selectedLang.code === lang.code}
                        >
                            <Image 
                                src={lang.flag} 
                                alt={lang.label} 
                                width={30} 
                                height={20}
                                className={styles.dropdownFlag} 
                            />
                            <span>{lang.label}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LanguageSelector;