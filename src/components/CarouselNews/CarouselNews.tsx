'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css'; 
import News, { NewsItem } from "../News/News";
import styles from './CarouselNews.module.scss';

interface EmblaInstance {
  scrollPrev: () => void;
  scrollNext: () => void;
}

const myNewsList: NewsItem[] = [
  {
    id: 1,
    stepTime: '11.03.2025',
    stepTitle: "Provider's battle results",
    description: 'What an epic battle it was! But now that we’ve caught our breath, it’s time to announce the winners.',
    imageSrc: '/img1.jpg', // Замените на реальные пути
    linkHref: '/news/1', 
  },
  {
    id: 2,
    stepTime: '12.03.2025',
    stepTitle: 'Free Spins',
    description: 'Join Alice on her fantastic journey through a world of surreal art and endless possibilities...',
    imageSrc: '/img2.jpg',
    linkHref: '/news/2',
  },
  {
    id: 3, 
    stepTime: '13.03.2025',
    stepTitle: 'Tournament Started',
    description: 'The biggest tournament of the year has officially started. Check the leaderboard!',
    imageSrc: '/img3.jpg',
    linkHref: '/news/3', 
  },
  {
    id: 4,
    stepTime: '14.03.2025',
    stepTitle: 'New Game Release',
    description: 'Try our latest slot game with amazing graphics and high RTP.',
    imageSrc: '/img1.jpg',
    linkHref: '/news/4', 
  },
];

export default function NewsPage() {

  const [embla, setEmbla] = useState<EmblaInstance | null>(null);

  const handleScrollPrev = useCallback(() => {
    if (embla) embla.scrollPrev();
  }, [embla]);

  const handleScrollNext = useCallback(() => {
    if (embla) embla.scrollNext();
  }, [embla]);

  return (
    <section className={styles.section}>
        <div className={styles.container}>
          
          <div className={styles.headerWrapper}>
            <h2 className={styles.sectionTitle}>
              News
            </h2>

            <div className={styles.controlsGroup}>
              <button 
                onClick={handleScrollPrev} 
                className={styles.navButton} 
                aria-label="Previous slide"
              >
                <Image src="/arrow-left.svg" alt="Prev" width={15} height={15} />
              </button>
              
              <button 
                onClick={handleScrollNext} 
                className={styles.navButton} 
                aria-label="Next slide"
              >
                <Image src="/arrow-right.svg" alt="Next" width={15} height={15} />
              </button>
            </div>
          </div>
          
          <Carousel
            getEmblaApi={(instance) => setEmbla(instance as unknown as EmblaInstance)}
            withIndicators={false}
            withControls={false}
            /* Адаптивные отступы */
            slideGap={{ base: '10px', sm: '16px', lg: '24px' }}
            /* Адаптивные размеры: 1 на телефоне, 2 на планшете, 3 на десктопе */
            slideSize={{ 
              base: '100%',        // Телефон: 1 карточка на всю ширину
              sm: '50%',           // Планшет: 2 карточки
              md: '33.333333%',    // Десктоп: 3 карточки
            }} 
            classNames={{
              root: styles.carouselRoot,
            }}
          >
            {myNewsList.map((newsItem) => (
              <Carousel.Slide key={newsItem.id}>
                <News item={newsItem} />
              </Carousel.Slide>
            ))}
          </Carousel>

        </div>  
    </section>
  );
}