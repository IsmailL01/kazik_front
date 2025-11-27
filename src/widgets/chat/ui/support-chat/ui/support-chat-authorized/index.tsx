import { Box, Button, Title } from '@mantine/core';
import Image from 'next/image';
import styles from './style.module.scss';

const SupportChatNotAuthorized = () => {
	return (
		<Box className={styles.supportChat}>
			<Box className={styles.supportChatHeader}>
				<Image
					src={'/assets/icons/user-support-chat.svg'}
					alt='users in support chat'
					width={63}
					height={28}
				/>
				<Title className={styles.supportChatTitle}>Support</Title>
				<Image
					src={'/assets/icons/close.svg'}
					alt='users in support chat'
					width={28}
					height={28}
				/>
			</Box>
		</Box>
	);
};

export default SupportChatNotAuthorized;
