'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css'; 
import PlayCard from '../PlayCard/PlayCard'; 
import styles from './SlotsCarousel.module.scss';
// Импортируем наши данные
import { slotsData } from '@/data/slots'; 

interface EmblaInstance {
  scrollPrev: () => void;
  scrollNext: () => void;
}

export default function SlotsCarousel() {
  const [embla, setEmbla] = useState<EmblaInstance | null>(null);

  const handleScrollPrev = useCallback(() => { if (embla) embla.scrollPrev(); }, [embla]);
  const handleScrollNext = useCallback(() => { if (embla) embla.scrollNext(); }, [embla]);
  const handleInfoClick = (id: number) => { console.log('Клик по info ID:', id); };

  return (
    <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.headerWrapper}>
            <h2 className={styles.sectionTitle}>Popular Slots</h2>
            <div className={styles.controlsGroup}>
              <button onClick={handleScrollPrev} className={styles.navButton} aria-label="Prev">
                <Image src="/arrow-left.svg" alt="Prev" width={15} height={15} />
              </button>
              <button onClick={handleScrollNext} className={styles.navButton} aria-label="Next">
                <Image src="/arrow-right.svg" alt="Next" width={15} height={15} />
              </button>
            </div>
          </div>
          
          <Carousel
            getEmblaApi={(instance) => setEmbla(instance as unknown as EmblaInstance)}
            withIndicators={false}
            withControls={false}
            slideGap={{ base: '5px', sm: '10px', lg: '24px' }}
            slideSize={{ base: '33.333333%', sm: '33.333333%', lg: '25%', xl: '20%' }} 
            classNames={{
              root: styles.carouselRoot,
              slide: styles.carouselSlide,
            }}
          >
            {/* Генерируем карточки из массива данных */}
            {slotsData.map((slot) => (
              <Carousel.Slide key={slot.id}>
                <PlayCard 
                    item={{
                        id: slot.id,
                        title: slot.title,
                        imageSrc: slot.imageSrc,
                        // Ссылка генерируется динамически
                        linkHref: `/game/${slot.slug}` 
                    }} 
                    onInfoClick={handleInfoClick} 
                />
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>  
    </section>
  );
}