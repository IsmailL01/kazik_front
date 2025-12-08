'use client'; 

import React, { useState } from 'react'; 
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
    // 2. Создаем состояние для лайка
    const [isLiked, setIsLiked] = useState(false);

    const handleInfoClick = (e: React.MouseEvent) => {
        e.preventDefault(); 
        e.stopPropagation(); 
        onInfoClick(item.id);
    };

    // 3. Обработчик клика по сердечку
    const handleLikeClick = (e: React.MouseEvent) => {
        e.preventDefault(); 
        e.stopPropagation(); 
        setIsLiked(!isLiked);
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

                    {/* Оверлей */}
                    <div className={styles.overlay}>
                        
                        {/* 4. Иконка сердечка (теперь интерактивная) */}
                        <div 
                            className={styles.heartIcon} 
                            onClick={handleLikeClick} 
                            style={{ cursor: 'pointer' }} 
                        >
                            <Image 
                                src={isLiked ? "/heart-filled.svg" : "/heart.svg"} 
                                alt={isLiked ? "Unlike" : "Like"} 
                                width={24} 
                                height={24} 
                                className={isLiked ? styles.likedHeart : ''}
                            />
                        </div>

                        {/* Центральная зеленая кнопка Play */}
                        <div className={styles.playButton}>
                            <Image 
                                src="/play-triangle.svg" 
                                alt="Play" 
                                width={16} 
                                height={16} 
                            />
                            <span className={styles.playText}>Play</span>
                        </div>

                    </div>
                </div>
            </Link>

            {/* Кнопка с вопросом */}
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