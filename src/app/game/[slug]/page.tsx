import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { slotsData } from '@/data/slots'; 

import styles from './SlotPage.module.scss';

// Импорт основных блоков
import HeaderUpGetbonus from '@/components/HeaderUp/HeaderUpGetbonus';
import Header from '@/components/Header/Header';
import SlideBar from '@/components/SlideBar/SlideBar';
import Footer from '@/components/Footer/Footer';
import Chat from '@/widgets/chat/ui';

// Импорт контента
import SlotsCarousel from '@/components/SlotsCarousel/SlotsCarousel';
import RecentWinnings from '@/components/RecentWinnings/RecentWinnings';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return slotsData.map((slot) => ({
    slug: slot.slug,
  }));
}

export default async function SlotPage({ params }: PageProps) {
  const { slug } = await params;
  const slot = slotsData.find((item) => item.slug === slug);

  if (!slot) {
    return notFound();
  }

  return (
    <>
        <HeaderUpGetbonus />
        <Header />

        <div className={styles.wrapper}>
            
            <SlideBar />

            <main className={styles.mainContent}>
                
                {/* 1. Блок с игрой (Используем твой .container) */}
                <div className={styles.container}>
                    
                    {/* Само окно (экран) */}
                    <div className={styles.gameWindow}>
                        <Image 
                            src={slot.imageSrc} 
                            alt={slot.title} 
                            fill 
                            className={styles.bgImage}
                        />
                        <div className={styles.gameContent}>
                             <button className={styles.playBtn}>
                                 Play
                             </button>
                        </div>
                    </div>

                    {/* Панель управления под экраном */}
                    <div className={styles.controlsBar}>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <Image src="/expand.svg" alt="Full" width={20} height={20} style={{ opacity: 0.6 }} />
                            <Image src="/stats.svg" alt="Stats" width={20} height={20} style={{ opacity: 0.6 }} />
                        </div>

                        <div>
                            <span className={styles.gameTitle}>{slot.title}</span>
                            <span className={styles.provider}>Evolution</span>
                        </div>

                        <div style={{ display: 'flex', gap: '15px' }}>
                            <Image src="/heart.svg" alt="Like" width={20} height={20} style={{ opacity: 0.6 }} />
                        </div>
                    </div>

                </div>

                {/* 2. Остальные компоненты (вставляем как есть) */}
                <SlotsCarousel />
                <RecentWinnings />

            </main>

        </div>

        <Chat />
        <Footer />
    </>
  );
}