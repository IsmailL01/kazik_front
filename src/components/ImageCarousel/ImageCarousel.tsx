'use client';

import { useRef } from 'react';
import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import '@mantine/carousel/styles.css';
import classes from './ImageCarousel.module.scss';


const slidesData = [
  {
    id: 1,
    src: '/banner-1.jpg',
    alt: 'Welcome Bonus 500%',
  },
  {
    id: 2,
    src: '/banners/banner-2.png',
    alt: 'New Slots Available',
  },
  {
    id: 3,
    src: '/banners/banner-3.png',
    alt: 'Live Casino Tournament',
  },
  {
    id: 4,
    src: '/banners/banner-4.png',
    alt: 'VIP Program',
  },
];

export default function ImageCarousel() {
  const autoplay = useRef(Autoplay({ delay: 3000 }));

  const slides = slidesData.map((slide) => (
    <Carousel.Slide key={slide.id}>
      <Image 
        src={slide.src} 
        alt={slide.alt}
        h="100%" 
        w="100%" 
        fit="cover"
        // Дополнительная гарантия, чтобы картинка заняла всё пространство
        style={{ width: '100%', height: '100%' }}
        fallbackSrc="https://placehold.co/1586x580?text=Banner+Not+Found"
      />
    </Carousel.Slide>
  ));

  return (
    <div className={classes.container}>
      <Carousel
        withIndicators
        withControls={false}
        height={580}
        classNames={{
          root: classes.carousel,
          viewport: classes.viewport, // <--- ДОБАВЛЕНО: подключаем ваши стили .viewport
          indicator: classes.indicator,
          indicators: classes.indicators,
        }}
        emblaOptions={{
          loop: true,
          align: 'start',
        }}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={() => autoplay.current.play()}
      >
        {slides}
      </Carousel>
    </div>
  );
}