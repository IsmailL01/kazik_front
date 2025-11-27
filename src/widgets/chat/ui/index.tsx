'use client';

import { useAppSelector } from '@/shared/lib/redux/hooks';
import { RootState } from '@/shared/lib/redux/store';
import { useSelector } from 'react-redux';
import { OpenChatTypeEnum } from '../model/slice';
import {
	makeSelectIsOpenChatType,
	selectIsOpenChatTypeNull,
} from '../model/support-chat-selectors';
import SupportChatNotAuthorized from './support-chat/ui/support-chat-not-authorized';
import ChatActions from './chat-actions/ui';

const Chat = () => {
	const selectIsSupportChatOpen = makeSelectIsOpenChatType();
	const isSupportChatOpen = useSelector((state: RootState) =>
		selectIsSupportChatOpen(state, OpenChatTypeEnum.SUPPORT)
	);
	const isSelectIsOpenChatTypeNull = useAppSelector(selectIsOpenChatTypeNull);

	return (
		<div>
			{isSelectIsOpenChatTypeNull && <ChatActions />}
			{isSupportChatOpen && <SupportChatNotAuthorized />}
		</div>
	);
};

export default Chat;
