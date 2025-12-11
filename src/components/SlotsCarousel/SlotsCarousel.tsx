'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css'; 
import PlayCard, { PlayCardItem } from '../PlayCard/PlayCard'; 
import styles from './SlotsCarousel.module.scss';

interface EmblaInstance {
  scrollPrev: () => void;
  scrollNext: () => void;
}

const slotsList: PlayCardItem[] = [
  { id: 1, imageSrc: '/slot1.svg', linkHref: '/game/slot-1', title: 'Slot Game 1' },
  { id: 2, imageSrc: '/slot1.svg', linkHref: '/game/slot-2', title: 'Slot Game 2' },
  { id: 3, imageSrc: '/slot1.svg', linkHref: '/game/slot-3', title: 'Slot Game 3' },
  { id: 4, imageSrc: '/slot1.svg', linkHref: '/game/slot-4', title: 'Slot Game 4' },
  { id: 5, imageSrc: '/slot1.svg', linkHref: '/game/slot-5', title: 'Slot Game 5' },
  { id: 6, imageSrc: '/slot1.svg', linkHref: '/game/slot-6', title: 'Slot Game 6' },
  { id: 7, imageSrc: '/slot1.svg', linkHref: '/game/slot-7', title: 'Slot Game 7' },
  { id: 8, imageSrc: '/slot1.svg', linkHref: '/game/slot-8', title: 'Slot Game 8' },
];

export default function SlotsCarousel() {
  const [embla, setEmbla] = useState<EmblaInstance | null>(null);

  const handleScrollPrev = useCallback(() => {
    if (embla) embla.scrollPrev();
  }, [embla]);

  const handleScrollNext = useCallback(() => {
    if (embla) embla.scrollNext();
  }, [embla]);

  const handleInfoClick = (id: number) => {
    console.log('Клик по info ID:', id);
  };

  return (
    <section className={styles.section}>
        <div className={styles.container}>
          
          <div className={styles.headerWrapper}>
            <h2 className={styles.sectionTitle}>Popular Slots</h2>

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
            align="start"
            /* Адаптивные отступы */
            slideGap={{ base: '5px', sm: '10px', lg: '24px' }}
            /* Адаптивные размеры слайда */
            slideSize={{ 
              base: '33.333333%', // Телефон (0 - 768px): 3 карточки
              sm: '33.333333%',   // Планшет (768px - 992px): 3 карточки
              md: '33.333333%',   // Планшет/Ноутбук (992px - 1200px): все еще 3 карточки
              
              /* ИЗМЕНЕНИЕ ЗДЕСЬ: */
              lg: '25%',          // 1200px - 1400px: 4 карточки (было 20%)
              xl: '20%'           // 1400px+: 5 карточек (возвращаем плотность)
              // xxl: '16.666666%' // Можно добавить для очень больших экранов (>1600px) 6 карточек
            }} 
            classNames={{
              root: styles.carouselRoot,
              slide: styles.carouselSlide,
            }}
          >
            {slotsList.map((item) => (
              <Carousel.Slide key={item.id}>
                <PlayCard 
                    item={item} 
                    onInfoClick={handleInfoClick} 
                />
              </Carousel.Slide>
            ))}
          </Carousel>

        </div>  
    </section>
  );
}