'use client'; 

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './New.module.scss';


export interface NewsItem {
    id: number;
    stepTime: string | number; 
    stepTitle: string;
    description: string;
    imageSrc: string; 
    linkHref: string; 
}

interface NewsProps {
    item: NewsItem;
}

const News: React.FC<NewsProps> = ({ item }) => {
    return (
        <Link href={item.linkHref} className={styles.newsLink}>
            <div className={styles.news}>
                <div className={styles.newsHeader}>
                    <span className={styles.stepTitle}>{item.stepTitle}</span>
                    <span className={styles.stepTime}>{item.stepTime}</span>
                </div>
                
                <div className={styles.imageWrapper}>
                    <Image 
                        src={item.imageSrc} 
                        alt={item.stepTitle}
                        width={511} 
                        height={143}
                        className={styles.image}
                    />
                </div>
                
                <p className={styles.description}>{item.description}</p>
            </div>
        </Link>
    )
}

export default News;
