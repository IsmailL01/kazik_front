'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import '@mantine/carousel/styles.css';
import classes from './ImageCarousel.module.scss';


const slidesData = [
  {
    id: 1,
    srcDesktop: '/banner-1-desktop.jpg',
    srcTablet: '/banner-1-tablet.jpg',
    srcMobile: '/banner-1-mobile.jpg',
    alt: 'Weekly Cashback',
    title: 'Weekly\nCashback',
    description: 'Lose less, win more — enjoy 20% cashback on all your bets.',
    buttonText: 'Get Cashback',
    buttonLink: '/cashback',
  },
  {
    id: 2,
    srcDesktop: '/banner-2-desktop.jpg',
    srcTablet: '/banner-2-tablet.jpg',
    srcMobile: '/banner-2-mobile.jpg',
    alt: 'New Slots Available',
    title: 'New Slots\nAvailable',
    description: 'Try your luck in our brand new mythical slots.',
    buttonText: 'Play Now',
    buttonLink: '/slots',
  },
  {
    id: 3,
    srcDesktop: '/banner-3-desktop.jpg',
    srcTablet: '/banner-3-tablet.jpg',
    srcMobile: '/banner-3-mobile.jpg',
    alt: 'Live Casino Tournament',
    title: 'Live Casino\nTournament',
    description: 'Join the table and win the grand prize.',
    buttonText: 'Join',
    buttonLink: '/live-casino',
  },
];

export default function ImageCarousel() {
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  const slides = slidesData.map((slide, index) => (
    <Carousel.Slide key={slide.id} className={classes.slide}>
      
      {/* 1. БЛОК С КАРТИНКАМИ (Фон) */}
      <div className={classes.imageWrapper}>
        {/* Desktop (Виден только на ПК) */}
        <div className={`${classes.imgContainer} ${classes.desktopOnly}`}>
          <Image 
            src={slide.srcDesktop} 
            alt={slide.alt}
            fill // Растягивает картинку на весь родительский блок
            priority={index === 0} // Ускоряет загрузку первого слайда
            className={classes.nextImage}
            sizes="100vw"
          />
        </div>

        {/* Tablet (Виден только на планшете) */}
        <div className={`${classes.imgContainer} ${classes.tabletOnly}`}>
          <Image 
            src={slide.srcTablet} 
            alt={slide.alt}
            fill
            className={classes.nextImage}
            sizes="100vw"
          />
        </div>

        {/* Mobile (Виден только на телефоне) */}
        <div className={`${classes.imgContainer} ${classes.mobileOnly}`}>
          <Image 
            src={slide.srcMobile} 
            alt={slide.alt}
            fill
            className={classes.nextImage}
            sizes="100vw"
          />
        </div>
      </div>

      {/* 2. БЛОК С ТЕКСТОМ И КНОПКОЙ (Поверх картинки) */}
      <div className={classes.contentOverlay}>
        <div className={classes.contentInner}>
          <h2 className={classes.title}>{slide.title}</h2>
          <p className={classes.description}>{slide.description}</p>
          
          <Link href={slide.buttonLink} className={classes.ctaButton}>
            {slide.buttonText}
          </Link>
        </div>
      </div>

    </Carousel.Slide>
  ));

  return (
    <div className={classes.container}>
      <Carousel
        withIndicators
        withControls={false}
        slideSize="100%" 
        classNames={{
          root: classes.carousel,
          viewport: classes.viewport,
          container: classes.carouselContainer,
          slide: classes.slide,
          indicator: classes.indicator,
          indicators: classes.indicators,
        }}
        emblaOptions={{ loop: true }}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={() => autoplay.current.play()}
      >
        {slides}
      </Carousel>
    </div>
  );
}