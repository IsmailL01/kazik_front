// Updated: public-chat/ui/index.tsx
'use client';

import {
	Box,
	Flex,
	Group,
	Select,
	SelectProps,
	Title,
	Text,
	Button,
	TextInput,
} from '@mantine/core';
import Image from 'next/image';
import styles from './style.module.scss';
import { useState, useEffect, useRef } from 'react';
import { useSocket } from '@/shared/hooks/useSocket';
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks';
import { RootState } from '@/shared/lib/redux/store';
import { setOpenChatType } from '@/widgets/chat/model/slice';
import { OpenChatTypeEnum } from '@/widgets/chat/model/slice';

const selectUser = (state: RootState) => state.auth?.user; // Example: { id: number, name: string }

// Данные селекта
const languages = [
	{ value: 'pt', label: 'Portuguese', icon: '/Flag_of_Portugal.png' },
	{ value: 'es', label: 'Spanish', icon: '/Flag_of_Spain.png' },
	{ value: 'us', label: 'English', icon: '/Flag_of_the_United_States.png' },
];

// Опции (кастомный рендер с иконкой)
const renderSelectOption: SelectProps['renderOption'] = ({ option }) => {
	const lang = languages.find((l) => l.value === option.value);

	return (
		<Group gap='xs'>
			<Image
				src={lang?.icon || ''}
				alt={lang?.label || 'flag'}
				width={28}
				height={20}
			/>
		</Group>
	);
};

interface Message {
	id: number;
	content: string;
	senderId: number;
	sender?: { name: string };
	createdAt: string;
}

const PublicChat = () => {
	const [currentLang, setCurrentLang] = useState('us');
	const [messages, setMessages] = useState<Message[]>([]);
	const [inputValue, setInputValue] = useState('');
	const [isJoined, setIsJoined] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const socket = useSocket();
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser); // Assume user from auth
	const isAuthenticated = !!user?.id;

	const selected = languages.find((l) => l.value === currentLang);

	useEffect(() => {
		if (!socket || !isAuthenticated) return;

		const handleNewMessage = (message: Message) => {
			setMessages((prev) => [...prev, message]);
		};

		const handleHistory = (history: Message[]) => {
			setMessages(history);
			setIsJoined(true);
		};

		socket.on('newMessage', handleNewMessage);
		socket.on('history', handleHistory);

		// Join public room on mount if auth
		socket.emit('joinPublic', user.id);

		return () => {
			socket.off('newMessage', handleNewMessage);
			socket.off('history', handleHistory);
			socket.emit('leavePublic'); // Optional: implement leave in backend
		};
	}, [socket, user?.id, isAuthenticated]);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	const handleSendMessage = () => {
		if (!inputValue.trim() || !socket || !isAuthenticated) return;
		socket.emit('sendPublicMessage', { userId: user.id, content: inputValue });
		setInputValue('');
	};

	if (!isAuthenticated) {
		return (
			<Box className={styles.publicChat}>
				<Flex justify='center' align='center' direction='column' h='100%'>
					<Text className={styles.publicChatAuthPrompt}>
						Please log in to join the public chat.
					</Text>
					<Button onClick={() => dispatch(setOpenChatType(null))}>Close</Button>
				</Flex>
			</Box>
		);
	}

	return (
		<Box className={styles.publicChat}>
			<Flex className={styles.publicChatHeader} justify={'space-between'}>
				<Flex gap={10} className={styles.publicChatHeaderLeft}>
					<Image
						src={'/test-img-public-chat.jpg'}
						alt='test img'
						width={80}
						height={80}
						className={styles['test-img']}
						style={{ height: 80, width: 80 }}
					/>
					<Title fz={18} fw={500} className={styles.publicChatUserName}>
						Public Chat
					</Title>
				</Flex>

				{/* --- LANGUAGE SELECT --- */}
				<Flex className={styles.publicChatHeaderRight}>
					<Select
						classNames={{ input: styles.publicChatLanguage }}
						data={languages.map((l) => ({ value: l.value, label: l.label }))}
						renderOption={renderSelectOption}
						value={currentLang}
						leftSectionPointerEvents='none'
						onChange={setCurrentLang}
						leftSection={
							selected && (
								<Image
									src={selected.icon}
									alt={selected.label}
									width={40}
									height={28}
								/>
							)
						}
					/>
				</Flex>
			</Flex>

			<Box className={styles.publicChatMessages}>
				{!isJoined ? (
					<Text color='white' ta='center'>
						Connecting...
					</Text>
				) : messages.length === 0 ? (
					<Text color='white' ta='center'>
						No messages yet. Start the conversation!
					</Text>
				) : (
					messages.map((msg) => (
						<Flex
							key={msg.id}
							className={`${styles.publicChatMessage} ${
								msg.senderId === user.id ? styles.publicChatMessageUser : ''
							}`}
						>
							{msg.senderId !== user.id && (
								<Image
									src='/default-avatar.png'
									alt='sender'
									width={30}
									height={30}
									style={{ borderRadius: '50%' }}
								/>
							)}
							<Box>
								<Text className={styles.publicChatMessageSender}>
									{msg.sender?.name || 'Anonymous'}
								</Text>
								<Text className={styles.publicChatMessageContent}>
									{msg.content}
								</Text>
							</Box>
							{msg.senderId === user.id && (
								<Image
									src='/default-avatar.png'
									alt='you'
									width={30}
									height={30}
									style={{ borderRadius: '50%' }}
								/>
							)}
						</Flex>
					))
				)}
				<div ref={messagesEndRef} />
			</Box>

			<Flex className={styles.publicChatInputWrapper}>
				<TextInput
					className={styles.publicChatInput}
					placeholder='Type a message...'
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
				/>
				<Button
					className={styles.publicChatSendButton}
					onClick={handleSendMessage}
				>
					Send
				</Button>
			</Flex>
		</Box>
	);
};

export default PublicChat;
