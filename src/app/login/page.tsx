'use client';
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks';
import {
	Button,
	TextInput,
	PasswordInput,
	Paper,
	Title,
	Container,
	Divider,
	Stack,
	Text,
	Alert,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
	IconBrandGoogle,
	IconBrandSteam,
	IconBrandX,
	IconAlertCircle,
} from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
// import { loginUser } from './authSlice';

export default function LoginPage() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { isLoading, error } = useAppSelector((state) => state.auth);

	const form = useForm({
		initialValues: { email: '', password: '' },
		validate: {
			email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
			password: (val) =>
				val.length <= 5
					? 'Password should include at least 6 characters'
					: null,
		},
	});

	const handleEmailLogin = async (values: typeof form.values) => {
		// const result = await dispatch(loginUser(values));
		// if (loginUser.fulfilled.match(result)) {
		// 	router.push('/dashboard');
		// }
	};

	const socialLogin = (provider: string) => {
		window.location.href = `http://localhost:8000/auth/${provider}`;
	};

	return (
		<Container size={420} my={40}>
			<Title ta='center' fw={900}>
				Welcome back!
			</Title>

			<Paper withBorder shadow='md' p={30} mt={30} radius='md'>
				{error && (
					<Alert
						icon={<IconAlertCircle size={16} />}
						title='Error'
						color='red'
						mb='md'
					>
						{error}
					</Alert>
				)}

				<Stack>
					<Button
						leftSection={<IconBrandGoogle size={18} />}
						variant='default'
						onClick={() => socialLogin('google')}
					>
						Continue with Google
					</Button>
					<Button
						leftSection={<IconBrandSteam size={18} />}
						color='dark'
						onClick={() => socialLogin('steam')}
					>
						Continue with Steam
					</Button>
					<Button
						leftSection={<IconBrandX size={18} />}
						color='black'
						onClick={() => socialLogin('twitter')}
					>
						Continue with X
					</Button>
				</Stack>

				<Divider
					label='Or continue with email'
					labelPosition='center'
					my='lg'
				/>

				<form onSubmit={form.onSubmit(handleEmailLogin)}>
					<Stack>
						<TextInput
							label='Email'
							placeholder='you@mantine.dev'
							required
							{...form.getInputProps('email')}
						/>
						<PasswordInput
							label='Password'
							placeholder='Your password'
							required
							{...form.getInputProps('password')}
						/>
						<Button fullWidth mt='xl' type='submit' loading={isLoading}>
							Sign in
						</Button>
					</Stack>
				</form>
			</Paper>
		</Container>
	);
}
