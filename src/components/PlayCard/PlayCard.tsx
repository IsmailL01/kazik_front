'use client'; 

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './PlayCard.module.scss';

export interface PlayCardItem {
    id: number;
    imageSrc: string; 
    linkHref: string; 
    title?: string;   
}

interface PlayCardProps {
    item: PlayCardItem;
    onInfoClick: (id: number) => void; 
}

const PlayCard: React.FC<PlayCardProps> = ({ item, onInfoClick }) => {
    
    const handleInfoClick = (e: React.MouseEvent) => {
        e.preventDefault(); 
        e.stopPropagation(); 
        onInfoClick(item.id);
    };

    return (
        <div className={styles.card}>
            <Link href={item.linkHref} className={styles.linkWrapper}>
                <div className={styles.imageContainer}>
                    {/* Основная картинка слота */}
                    <Image 
                        src={item.imageSrc} 
                        alt={item.title || 'Slot Game'} 
                        width={240} 
                        height={300}
                        className={styles.image}
                    />

                    {/* Оверлей: Затемнение + Кнопка Play + Сердечко */}
                    <div className={styles.overlay}>
                        
                        {/* Иконка сердечка (слева сверху) */}
                        <div className={styles.heartIcon}>
                            <Image 
                                src="/icons/heart.svg" // ВСТАВЬТЕ ВАШ ПУТЬ К ИКОНКЕ СЕРДЦА
                                alt="Like" 
                                width={24} 
                                height={24} 
                            />
                        </div>

                        {/* Центральная зеленая кнопка Play */}
                        <div className={styles.playButton}>
                            <Image 
                                src="/icons/play-triangle.svg" // ВСТАВЬТЕ ВАШ ПУТЬ К ИКОНКЕ ТРЕУГОЛЬНИКА
                                alt="Play" 
                                width={16} 
                                height={16} 
                            />
                            <span className={styles.playText}>Play</span>
                        </div>

                    </div>
                </div>
            </Link>

            {/* Кнопка с вопросом (справа сверху) */}
            <button 
                className={styles.infoButton} 
                onClick={handleInfoClick}
                type="button"
                aria-label="Game Info"
            >
                <Image 
                    src="/question.svg" 
                    alt="Info" 
                    width={30} 
                    height={30} 
                    className={styles.iconImage}
                />
            </button>
        </div>
    );
};

export default PlayCard;