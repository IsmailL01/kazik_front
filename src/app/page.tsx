'use client';

import HeaderUpGetbonus from '@/components/HeaderUp/HeaderUpGetbonus';
import styles from './page.module.scss';
import Chat from '@/widgets/chat/ui';
import Header from '@/components/Header/Header';
import SlideBar from '@/components/SlideBar/SlideBar';
import Footer from '@/components/Footer/Footer';
import ImageCarousel from '@/components/ImageCarousel/ImageCarousel';
import GameNavigation from '@/components/GameNavigation/GameNavigation';
import Stages from '@/components/Stages/Stages';
import NewsPage from '@/components/CarouselNews/CarouselNews';
import SlotsCarousel from '@/components/SlotsCarousel/SlotsCarousel';

export default function Home() {
	return (
		<>
            
            <HeaderUpGetbonus />
            <Header />

          
            <div className={styles.wrapper}>
                
             
                <SlideBar />

              
                <main className={styles.mainContent}>
                    <ImageCarousel />
                    <GameNavigation />
                    <SlotsCarousel />
                    <Stages />
                    <NewsPage />
                </main>

            </div>
            <Chat />
            <Footer />
		</>
	);
}