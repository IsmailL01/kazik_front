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
import RecentWinnings from '@/components/RecentWinnings/RecentWinnings';
import { useAppSelector } from '@/shared/lib/redux/hooks';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
	const user = useAppSelector((state) => state.auth.user);
	const params = useSearchParams();
	const token = params.get('token');

	useEffect(() => {
		console.log(token, 'token');
		if (token) {
			localStorage.setItem('token', token);
			window.location.href = '/';
		}
	}, [token]);

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
					<RecentWinnings />
				</main>
			</div>

			<Chat />
			<Footer />
		</>
	);
}
