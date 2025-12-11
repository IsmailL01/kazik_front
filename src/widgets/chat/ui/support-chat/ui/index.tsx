import { OpenChatTypeEnum, setOpenChatType } from '@/widgets/chat/model/slice';
import {
	Box,
	Title,
	CloseButton,
	Input,
	ActionIcon,
	Text,
} from '@mantine/core';
import Image from 'next/image';

import styles from './style.module.scss';
import { useSocket } from '@/shared/hooks/useSocket';
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks';
import { RootState } from '@/shared/lib/redux/store';
import {
	makeSelectIsOpenChatType,
	selectIsOpenChatTypeNull,
} from '@/widgets/chat/model/support-chat-selectors';
import { useSelector } from 'react-redux';

const SupportChat = () => {
	const appDispatch = useAppDispatch();
	const socket = useSocket();
	console.log(socket, 'socket');

	const selectIsSupportChatOpen = makeSelectIsOpenChatType();
	const isSupportChatOpen = useSelector((state: RootState) =>
		selectIsSupportChatOpen(state, OpenChatTypeEnum.SUPPORT)
	);
	const isSelectIsOpenChatTypeNull = useAppSelector(selectIsOpenChatTypeNull);
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
						Hello! My name is Alexa, I'm your virtual assistant. How can I help
						you?
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
	);
};

export default SupportChat;
