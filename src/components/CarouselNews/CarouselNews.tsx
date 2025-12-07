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
    stepTime: '12:00',
    stepTitle: 'Заголовок 1',
    description: 'Join Alice on her fantastic journey through a world of surreal art and endless possibilities...',
    imageSrc: '/img1.jpg',
    linkHref: '/news/my-first-news', 
  },
  {
    id: 2,
    stepTime: '14:30',
    stepTitle: 'Заголовок 2',
    description: 'Join Alice on her fantastic journey through a world of surreal art and endless possibilities...',
    imageSrc: '/img2.jpg',
    linkHref: '/news/second-news',
  },
  {
    id: 3, 
    stepTime: '12:00',
    stepTitle: 'Заголовок 3',
    description: 'Join Alice on her fantastic journey through a world of surreal art and endless possibilities...',
    imageSrc: '/img3.jpg',
    linkHref: '/news/my-first-news', 
  },
  {
    id: 4,
    stepTime: '12:00',
    stepTitle: 'Заголовок 4',
    description: 'Join Alice on her fantastic journey...',
    imageSrc: '/img1.jpg',
    linkHref: '/news/my-first-news', 
  },
  {
    id: 5,
    stepTime: '14:30',
    stepTitle: 'Заголовок 5',
    description: 'Join Alice on her fantastic journey...',
    imageSrc: '/img2.jpg',
    linkHref: '/news/second-news',
  },
  {
    id: 6,
    stepTime: '14:30',
    stepTitle: 'Заголовок 6',
    description: 'Join Alice on her fantastic journey...',
    imageSrc: '/img3.jpg',
    linkHref: '/news/second-news',
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
    <section>
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
                <Image 
                  src="/arrow-left.svg" 
                  alt="Prev" 
                  width={15} 
                  height={15} 
                />
              </button>
              
              <button 
                onClick={handleScrollNext} 
                className={styles.navButton} 
                aria-label="Next slide"
              >
                <Image 
                  src="/arrow-right.svg" 
                  alt="Next" 
                  width={15} 
                  height={15} 
                />
              </button>
            </div>

          </div>
          
          <Carousel
            getEmblaApi={(instance) => setEmbla(instance as unknown as EmblaInstance)}
            withIndicators={false}
            withControls={false}
            slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }} 
            slideGap="md"
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