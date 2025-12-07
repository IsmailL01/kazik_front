'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
	Modal,
	Button,
	TextInput,
	PasswordInput,
	Stack,
	Group,
	SegmentedControl,
	Select,
	Checkbox,
	Title,
	Text,
	ActionIcon,
	Box,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconX } from '@tabler/icons-react';
import classes from './AuthModal.module.scss';

interface AuthModalProps {
	opened: boolean;
	onClose: () => void;
}

type ViewState = 'login' | 'registration' | 'forgot_password';

export default function AuthModal({ opened, onClose }: AuthModalProps) {
	const [view, setView] = useState<ViewState>('registration');
	const isMobile = useMediaQuery('(max-width: 768px)');

	const handleTabChange = (value: string) => {
		setView(value as ViewState);
	};

	const showDesktopSideImage = view === 'registration' && !isMobile;
	const showMobileBanner = view === 'registration' && isMobile;

	return (
		<Modal
			opened={opened}
			onClose={onClose}
			centered
			size={showDesktopSideImage ? 900 : 'sm'}
			padding={0}
			withCloseButton={false}
			classNames={{
				content: classes.modalContent,
				body: classes.modalBody,
			}}
		>
			<div
				className={`${classes.container} ${
					!showDesktopSideImage ? classes.singleMode : ''
				}`}
			>
				{/* === ЛЕВАЯ ЧАСТЬ (ФОРМА) === */}
				<div className={classes.formSide}>
					{view === 'forgot_password' ? (
						<Box mb='md'>
							<Title order={3} className={classes.title}>
								Password recovery
							</Title>
							<Text className={classes.textDimmed}>
								Enter your email address and we'll send you a link to reset your
								password.
							</Text>
						</Box>
					) : (
						<SegmentedControl
							fullWidth
							value={view}
							onChange={handleTabChange}
							data={[
								{ label: 'Registration', value: 'registration' },
								{ label: 'Log in', value: 'login' },
							]}
							classNames={{
								root: classes.segmentRoot,
								label: classes.segmentLabel,
								indicator: classes.segmentActive,
							}}
						/>
					)}

					{/* Мобильный баннер */}
					{showMobileBanner && (
						<div className={classes.mobileBannerWrapper}>
							<Image
								src='/mobile_banner.jpg'
								alt='Welcome Bonus'
								width={300}
								height={100}
								className={classes.mobileImage}
							/>
						</div>
					)}

					<form onSubmit={(e) => e.preventDefault()} style={{ width: '100%' }}>
						<Stack gap='md'>
							<TextInput
								placeholder='E-mail'
								classNames={{
									input: classes.input,
									section: classes.inputSection,
								}}
							/>

							{view !== 'forgot_password' && (
								<>
									<PasswordInput
										placeholder='Password'
										classNames={{
											input: classes.input,
											section: classes.inputSection,
										}}
									/>

									{view === 'login' && (
										<div
											className={classes.forgotLink}
											onClick={() => setView('forgot_password')}
										>
											Forget password?
										</div>
									)}

									{view === 'registration' && (
										<Select
											placeholder='Currency'
											defaultValue='USD'
											data={['USD', 'EUR', 'RUB', 'KZT']}
											classNames={{
												input: classes.input,
												dropdown: classes.dropdown,
												section: classes.inputSection,
											}}
											comboboxProps={{ withinPortal: false }}
											rightSectionWidth={40}
											allowDeselect={false}
										/>
									)}

									<Group
										justify='center'
										className={classes.socialGroup}
										gap='md'
									>
										<div className={classes.socialIconWrapper}>
											<Image
												src='/gogl.svg'
												alt='Google'
												width={50}
												height={50}
											/>
										</div>
										<div className={classes.socialIconWrapper}>
											<Image
												src='/steam.svg'
												alt='Steam'
												width={50}
												height={50}
											/>
										</div>
										<div className={classes.socialIconWrapper}>
											<Image
												src='/x-twitter.svg'
												alt='X'
												width={50}
												height={50}
											/>
										</div>
									</Group>

									{view === 'registration' && (
										<>
											<Stack gap='xs'>
												<Checkbox
													classNames={{ label: classes.checkboxLabel }}
													color='#3E30E9'
													iconColor='white'
													label={
														<>
															I am at least 18 years old and accept{' '}
															<a href='#'>Privacy Policy</a>,{' '}
															<a href='#'>T&C</a>.
														</>
													}
												/>
												<Checkbox
													classNames={{ label: classes.checkboxLabel }}
													color='#3E30E9'
													iconColor='white'
													label='I want to receive promotions by e-mail'
												/>
											</Stack>

											<TextInput
												placeholder='Promo code'
												classNames={{
													input: classes.input,
													section: classes.inputSection,
												}}
												mt='xs'
											/>
										</>
									)}
								</>
							)}

							<Button fullWidth className={classes.submitButton} mt='xs'>
								{view === 'login' && 'Log in'}
								{view === 'registration' && 'Sign up'}
								{view === 'forgot_password' && 'Send Link'}
							</Button>

							{view === 'forgot_password' && (
								<Text
									className={classes.backLink}
									onClick={() => setView('login')}
								>
									← Back to Log in
								</Text>
							)}
						</Stack>
					</form>
				</div>

				{/* === ПРАВАЯ ЧАСТЬ (КАРТИНКА) === */}
				{showDesktopSideImage && (
					<div className={classes.imageSide}>
						<div className={classes.imageWrapper}>
							<Image
								src='/desktop_bg.jpg'
								alt='Welcome Bonus'
								fill
								sizes='50vw'
								priority
							/>
						</div>
					</div>
				)}

				{/* Кнопка закрытия */}
				<ActionIcon
					className={classes.closeButton}
					onClick={onClose}
					variant='transparent'
					aria-label='Close modal'
				>
					<IconX />
				</ActionIcon>
			</div>
		</Modal>
	);
}
