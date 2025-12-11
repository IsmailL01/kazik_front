// Updated: support-chat/ui/index.tsx (add chatId state, receive from socket)
import { OpenChatTypeEnum, setOpenChatType } from '@/widgets/chat/model/slice';
import {
	Box,
	Title,
	CloseButton,
	Input,
	ActionIcon,
	Text,
	Button,
} from '@mantine/core';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

import styles from './style.module.scss';
import { useSocket } from '@/shared/hooks/useSocket';
import { useAppDispatch } from '@/shared/lib/redux/hooks';
// For guestId, use localStorage or generate UUID
import { v4 as uuidv4 } from 'uuid';

const SupportChat = () => {
	const dispatch = useAppDispatch();
	const { socket } = useSocket();
	const [guestId] = useState(() => {
		let id = localStorage.getItem('supportGuestId');
		if (!id) {
			id = uuidv4();
			localStorage.setItem('supportGuestId', id);
		}
		return id;
	});
	const [chatId, setChatId] = useState<string | null>(null);
	const [messages, setMessages] = useState<any[]>([]);
	const [inputValue, setInputValue] = useState('');
	const [isJoined, setIsJoined] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	// Predefined FAQ questions with auto-responses
	const faqQuestions = [
		{
			question: 'How to reset password?',
			autoResponse:
				'To reset your password, go to the login page and click "Forgot Password".',
		},
		{
			question: 'What is your refund policy?',
			autoResponse: 'We offer full refunds within 30 days of purchase.',
		},
		{
			question: 'How to contact billing?',
			autoResponse: 'For billing issues, email billing@yourapp.com.',
		},
	];

	useEffect(() => {
		if (!socket) return;

		const handleNewSupportMessage = (message: any) => {
			setMessages((prev) => [...prev, message]);
		};

		const handleSupportHistory = (history: any[]) => {
			setMessages(history);
			setIsJoined(true);
		};

		const handleChatInfo = (info: { chatId: string }) => {
			setChatId(info.chatId);
		};

		socket.on('newSupportMessage', handleNewSupportMessage);
		socket.on('supportHistory', handleSupportHistory);
		socket.on('chatInfo', handleChatInfo);

		// Join support as guest
		socket.emit('joinSupportGuest', guestId);

		return () => {
			socket.off('newSupportMessage', handleNewSupportMessage);
			socket.off('supportHistory', handleSupportHistory);
			socket.off('chatInfo', handleChatInfo);
		};
	}, [socket, guestId]);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	const handleSendFaq = (question: string, autoResponse: string) => {
		if (!chatId) return;
		// Send question as message
		const questionMsg = {
			content: question,
			sender: 'guest',
			createdAt: new Date().toISOString(),
		};
		setMessages((prev) => [...prev, questionMsg]);
		socket?.emit('sendSupportMessage', { chatId, content: question, guestId });

		// Simulate auto-response (in real, backend can handle or use bot)
		setTimeout(() => {
			const responseMsg = {
				content: autoResponse,
				sender: 'operator',
				createdAt: new Date().toISOString(),
			};
			setMessages((prev) => [...prev, responseMsg]);
			socket?.emit('sendSupportMessage', {
				chatId,
				content: autoResponse,
				senderId: null,
				guestId,
			}); // Echo back
		}, 1000);
	};

	const handleSendMessage = () => {
		if (!inputValue.trim() || !socket || !chatId) return;
		const msg = {
			content: inputValue,
			sender: 'guest',
			createdAt: new Date().toISOString(),
		};
		setMessages((prev) => [...prev, msg]);
		socket.emit('sendSupportMessage', { chatId, content: inputValue, guestId });
		setInputValue('');
		// Notify admins (handled in backend)
	};

	return (
		<Box className={styles.supportChat}>
			<Box className={styles.supportChatHeader}>
				<Box className={styles.supportChatHeaderLeft}>
					<Image
						src={'/assets/icons/support-chat-person.svg'}
						alt='users in support chat'
						width={28}
						height={28}
					/>
					<Box className={styles['supportChatTitleWrapper']}>
						<Title className={styles.supportChatTitle}>Support</Title>
						<Title className={styles.supportChatTitleOnline}>Online</Title>
					</Box>
				</Box>
				<CloseButton onClick={() => dispatch(setOpenChatType(null))} />
			</Box>

			<Box className={styles['supportChatContent']}>
				{/* FAQ Section */}
				<Box className={styles.supportChatFaq}>
					<Title className={styles.supportChatFaqTitle}>Quick Questions:</Title>
					{faqQuestions.map((faq, idx) => (
						<Button
							key={idx}
							className={styles.supportChatFaqButton}
							variant='subtle'
							onClick={() => handleSendFaq(faq.question, faq.autoResponse)}
							size='sm'
							disabled={!chatId}
						>
							{faq.question}
						</Button>
					))}
				</Box>

				{!isJoined ? (
					<Text color='white' ta='center'>
						Connecting...
					</Text>
				) : messages.length === 0 ? (
					<Text color='white' ta='center'>
						Ask a question or select from FAQ.
					</Text>
				) : (
					messages.map((msg, idx) => (
						<Box
							key={idx}
							className={`${styles['supportChatMessageWrapper']} ${
								msg.sender === 'operator'
									? styles.supportChatMessageOperator
									: ''
							}`}
						>
							{msg.sender === 'guest' && (
								<Image
									src={'/assets/icons/support-chat-person.svg'}
									alt='user'
									width={40}
									height={40}
								/>
							)}
							<Box>
								{msg.sender && (
									<Text className={styles.supportChatMessageSender}>
										{msg.sender}
									</Text>
								)}
								<Text className={styles['supportChatMessage']}>
									{msg.content}
								</Text>
							</Box>
							{msg.sender === 'operator' && (
								<Image
									src={'/assets/icons/support-chat-person.svg'}
									alt='operator'
									width={40}
									height={40}
								/>
							)}
						</Box>
					))
				)}
				<div ref={messagesEndRef} />
			</Box>

			<Box className={styles.supportChatInputWrapper}>
				<Input
					classNames={{ input: styles.supportChatSendMessageWrapper }}
					rightSectionPointerEvents='all'
					className={styles['supportChatSendMessageInput']}
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
					disabled={!chatId}
					rightSection={
						<ActionIcon
							className={styles['supportChatSendMessageButton']}
							variant='transparent'
							onClick={handleSendMessage}
							disabled={!chatId}
						>
							<Image
								src={'/assets/icons/send-message-button.svg'}
								alt='send message button'
								width={16}
								height={17}
							/>
						</ActionIcon>
					}
					placeholder='Type your message...'
				/>
			</Box>
		</Box>
	);
};

export default SupportChat;
