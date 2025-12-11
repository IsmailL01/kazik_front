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
import { Box } from '@mantine/core';
import styles from './chat.module.scss';
import { useSocket } from '@/shared/hooks/useSocket';
import SupportChat from './support-chat/ui';
import PublicChat from './public-chat/ui';

const Chat = () => {
	const selectIsSupportChatOpen = makeSelectIsOpenChatType();

	const isSelectIsOpenChatTypeNull = useAppSelector(selectIsOpenChatTypeNull);

	return (
		<Box className={styles.chat}>
			{isSelectIsOpenChatTypeNull && <ChatActions />}
			<ChatActions />
			{/* <SupportChat /> */}
			<PublicChat />
		</Box>
	);
};

export default Chat;
