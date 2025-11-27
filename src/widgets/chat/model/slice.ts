import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum OpenChatTypeEnum {
	PUBLIC = 'public',
	SUPPORT = 'support',
}

type initialStateType = {
	openChatType: OpenChatTypeEnum | null;
};

const initialState: initialStateType = {
	openChatType: null,
};

export const supportChatSlice = createSlice({
	name: 'supportChatSlice',
	initialState,
	reducers: {
		setOpenChatType: (
			state,
			action: PayloadAction<OpenChatTypeEnum | null>
		) => {
			state.openChatType = action.payload;
		},
	},
});

export const { reducer: supportChatReducer } = supportChatSlice;
export const { actions: supportChatAction } = supportChatSlice;
export const { setOpenChatType } = supportChatAction;
