'use client';

import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks';
import { RootState } from '@/shared/lib/redux/store';
import { useSelector } from 'react-redux';
import { OpenChatTypeEnum, setOpenChatType } from '../model/slice';
import {
	makeSelectIsOpenChatType,
	selectIsOpenChatTypeNull,
} from '../model/support-chat-selectors';
import ChatActions from './chat-actions/ui';
import { ActionIcon, Box, Button, Input, Text, Title } from '@mantine/core';
import styles from './chat.module.scss';
import CloseButton from '@/shared/ui/close-button';
import Image from 'next/image';

const Chat = () => {
	const appDispatch = useAppDispatch();

	const selectIsSupportChatOpen = makeSelectIsOpenChatType();
	const isSupportChatOpen = useSelector((state: RootState) =>
		selectIsSupportChatOpen(state, OpenChatTypeEnum.SUPPORT)
	);
	const isSelectIsOpenChatTypeNull = useAppSelector(selectIsOpenChatTypeNull);

	return (
		<Box className={styles.chat}>
			{isSelectIsOpenChatTypeNull && <ChatActions />}
			<ChatActions />
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
					<Box className={styles.supportChatHeaderLeft}>
						<CloseButton onClick={() => appDispatch(setOpenChatType(null))} />
					</Box>
				</Box>

				<Box className={styles['supportChatContent']}>
					<Text>27.02.25</Text>
					<Box className={styles['supportChatMessageWrapper']}>
						<Image
							src={'/assets/icons/support-chat-person.svg'}
							alt='users in support chat'
							width={40}
							height={40}
						/>
						<Text className={styles['supportChatMessage']}>
							Hello! My name is Alexa, I'm your virtual assistant. How can I
							help you?
						</Text>
					</Box>
				</Box>

				<Input
					classNames={{ input: styles.supportChatSendMessageWrapper }}
					rightSectionPointerEvents='all'
					className={styles['supportChatSendMessageInput']}
					rightSection={
						<ActionIcon
							className={styles['supportChatSendMessageButton']}
							variant='transparent'
							onClick={() => console.log('hit')}
						>
							<Image
								src={'/assets/icons/send-message-button.svg'}
								alt='send message button'
								width={16}
								height={17}
							/>
						</ActionIcon>
					}
					placeholder='Message'
				/>
			</Box>
		</Box>
	);
};

export default Chat;
