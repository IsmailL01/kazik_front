'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.scss';
import BalanceDropdown from '../BalanceDropdown/BalanceDropdown';
import BuregMenu from '../BuregMenu/BuregMenu';
import NotificationsDropdown from '../NotificationsDropdown/NotificationsDropdown';

const USER_ACTIONS = [
	{
		id: 'like',
		tag: 'link',
		href: '',
		src: '/like.svg',
		alt: 'Like',
		width: 32,
		height: 32,
		wrapperClass: 'header__wrapper-like',
	},
	// Колокольчик удален из конфига, он вставляется вручную в JSX
	{
		id: 'profile',
		tag: 'link',
		href: '',
		src: '/lc.svg',
		alt: 'Profile',
		width: 33,
		height: 33,
		wrapperClass: 'header__wrapper-personalaccountList',
		imgClass: 'header__wrapper-personalaccountItem',
	},
];

const Header = () => {
	// Состояние: открыто меню или нет
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [user, setUser] = useState<any>(null); // состояние для текущего юзера
	const [loading, setLoading] = useState(true);
	console.log(user, 'user');
	useEffect(() => {
		const token = localStorage.getItem('access_token'); // берём токен из localStorage
		if (!token) {
			setLoading(false);
			return;
		}

		const fetchUser = async () => {
			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
					cache: 'no-store',
				});

				if (!res.ok) {
					// Токен не валиден
					localStorage.removeItem('access_token');
					setUser(null);
				} else {
					const data = await res.json();
					setUser(data);
				}
			} catch (err) {
				console.error('Ошибка запроса /auth/me:', err);
				setUser(null);
			} finally {
				setLoading(false);
			}
		};

		fetchUser();
	}, []);

	if (loading) {
		return (
			<div className={styles.header}>
				<p>Loading...</p>
			</div>
		);
	}

	return (
		<>
			<header className={styles.header}>
				<div className={styles.header__wrapper}>
					{/* --- Блок для НЕ авторизованного пользователя (закомментирован) --- */}
					{/* 
                    <Link href="" className={styles['header__wrapper-login']}>
                        Log In
                    </Link>
                    <Link href="" className={styles['header__wrapper-singin']}>
                        Sign up
                    </Link> 
                    */}

					{/* --- Блок для авторизованного пользователя --- */}

					{/* Кнопка баланса (оставили как есть, так как структура уникальна) */}
					{/* ЛЕВЫЙ БЛОК: Бургер + Логотип */}
					<div className={styles['header__wrapper-logoImg']}>
						{/* Бургер - добавили onClick */}
						<div
							className={styles['header__wrapper-burgerMenu']}
							onClick={() => setIsMenuOpen(true)} // Открываем меню
							role='button'
							tabIndex={0}
						>
							<Image
								src='/burgerMenu.svg'
								alt='menu'
								width={44}
								height={44}
								priority
							/>
						</div>

						<Link
							href='/'
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '10px',
								textDecoration: 'none',
							}}
						>
							<Image
								src='/logoMain.svg'
								alt='winvube_logo'
								width={67}
								height={58}
								priority
								className={styles['header__wrapper-logoIcon']}
							/>
							<span className={styles['header__wrapper-logoName']}>
								WinVibe
							</span>
						</Link>
					</div>

					{/* ПРАВЫЙ БЛОК: Кнопки */}
					<div className={styles['header__wrapper-buttonList']}>
						<BalanceDropdown />

						<Link href='' className={styles['header__wrapper-balanceup']}>
							Deposit
						</Link>

						<div className={styles['header__wrapper-headerMenu']}>
							{/* 1. Рендерим Лайк (фильтруем из массива) */}
							{USER_ACTIONS.filter((item) => item.id === 'like').map((item) => (
								<Link
									key={item.id}
									href={item.href || ''}
									className={styles[item.wrapperClass]}
								>
									<Image
										src={item.src}
										alt={item.alt}
										width={item.width}
										height={item.height}
										priority
									/>
								</Link>
							))}

							{/* 2. Вставляем компонент Колокольчика */}
							<NotificationsDropdown />

							{/* 3. Рендерим Профиль (фильтруем из массива) */}
							<Link href={'/'} className={styles['header__wrapper-like']}>
								<Image
									src={!user?.avatar ? '/lc.svg' : user.avatar}
									alt={''}
									width={32}
									height={32}
									priority
								/>
							</Link>
							{/* {USER_ACTIONS.filter((item) => item.id === 'profile').map(
								(item) => (
									<Link
										key={item.id}
										href={item.href || ''}
										className={styles[item.wrapperClass]}
									>
										<Image
											src={item.src}
											alt={item.alt}
											width={item.width}
											height={item.height}
											className={
												item.imgClass ? styles[item.imgClass] : undefined
											}
											priority
										/>
									</Link>
								)
							)} */}
						</div>
					</div>
				</div>
			</header>

			{/* Вставляем компонент меню, передаем состояние */}
			<BuregMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
		</>
	);
};

export default Header;
