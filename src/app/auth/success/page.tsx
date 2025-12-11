'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader, Center, Text } from '@mantine/core';
import { useAppDispatch } from '@/shared/lib/redux/hooks';
// import { setUser } from '@/shared/lib/redux/userSlice'; //

export default function AuthSuccessPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const dispatch = useAppDispatch();

	useEffect(() => {
		const token = searchParams.get('token');

		if (!token) {
			console.error('Нет токена в URL');
			router.replace('/login?error=no_token');
			return;
		}

		// 1. сохранить токен локально
		localStorage.setItem('access_token', token);

		// 2. проверить пользователя
		const verifyUser = async () => {
			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
					cache: 'no-store',
				});

				const user = await res.json();

				if (!res.ok || !user?.id) {
					console.error('Ошибка проверки токена', user);
					router.replace('/login?error=invalid_token');
					return;
				}

				// 3. сохранить юзера в redux
				// dispatch(setUser(user));

				// 4. редирект на домашнюю
				router.replace('/');
			} catch (error) {
				console.error('Ошибка при запросе /auth/me:', error);
				router.replace('/login?error=server_error');
			}
		};

		verifyUser();
	}, [searchParams, router, dispatch]);

	return (
		<Center h='100vh' style={{ flexDirection: 'column' }}>
			<Loader size='lg' />
			<Text mt='md'>Verifying session...</Text>
		</Center>
	);
}
