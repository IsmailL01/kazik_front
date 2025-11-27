'use client';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks';
import { RootState } from '@/shared/lib/redux/store';
import { OpenChatTypeEnum, setOpenChatType } from '@/widgets/chat/model/slice';
import {
	makeSelectIsOpenChatType,
	selectIsOpenChatTypeNull,
} from '@/widgets/chat/model/support-chat-selectors';
import { Box, Button } from '@mantine/core';
import styles from './style.module.scss';

interface ChatActionsProps {}

const ChatActions = (props: ChatActionsProps) => {
	const appDispatch = useAppDispatch();

	return (
		<>
			<Box className={styles.chatActions}>
				<Button>
					<Image
						src={'/assets/icons/public-chat.png'}
						width={38}
						height={38}
						alt='chat'
						onClick={() =>
							appDispatch(setOpenChatType(OpenChatTypeEnum.PUBLIC))
						}
					/>
				</Button>
				<Button>
					<Image
						src={'/assets/icons/customer-support.png'}
						width={38}
						height={38}
						alt='chat support'
						onClick={() =>
							appDispatch(setOpenChatType(OpenChatTypeEnum.SUPPORT))
						}
					/>
				</Button>
			</Box>
		</>
	);
};

export default ChatActions;
