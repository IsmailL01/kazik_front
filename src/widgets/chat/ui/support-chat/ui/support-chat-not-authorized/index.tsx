'use client';
import { Box, Button, Title, Text, Image } from '@mantine/core';

import styles from './style.module.scss';
import CloseButton from '@/shared/ui/close-button';
import { useAppDispatch } from '@/shared/lib/redux/hooks';
import { setOpenChatType } from '@/widgets/chat/model/slice';

const SupportChatNotAuthorized = () => {
	const appDispatch = useAppDispatch();

	return (
		<Box className={styles.supportChat}>
			<Box className={styles.supportChatHeader}>
				<Box className={styles.supportChatHeaderLeft}>
					<Image
						src={'/assets/icons/user-support-chat.svg'}
						alt='users in support chat'
						width={63}
						height={28}
					/>
					<Title className={styles.supportChatTitle}>Support</Title>
				</Box>
				<Box className={styles.supportChatHeaderLeft}>
					<CloseButton onClick={() => appDispatch(setOpenChatType(null))} />
				</Box>
			</Box>

			<Box className={styles.supportChatInner}>
				<Title className={styles.supportChatInnerTitle}>Support Center</Title>
				<Text className={styles.supportChatInnerText}>
					Get help with your questions — start a chat!
				</Text>
				<Button className={styles.supportChatInnerBtn}>Log in/Sign up</Button>
			</Box>
		</Box>
	);
};

export default SupportChatNotAuthorized;
