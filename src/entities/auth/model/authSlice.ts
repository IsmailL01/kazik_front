import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, LoginRequest, RegisterRequest } from './types';
import { ApiHttpError } from '@/shared/api/baseApi';
import { authApi } from './authApi';

interface AuthState {
	user: User | null;
	token: string | null;
	isLoginPopupOpen: boolean;
	isLoading: boolean;
	error: string | null;
}

// Попытка восстановить сессию из localStorage при старте
const tokenFromStorage =
	typeof window !== 'undefined' ? localStorage.getItem('token') : null;

const initialState: AuthState = {
	user: null, // В идеале user нужно загрузить через getProfile при старте
	token: tokenFromStorage,
	isLoginPopupOpen: false, // Состояние модалки
	isLoading: false,
	error: null,
};

// --- Thunks ---
export const loginUser = createAsyncThunk(
	'auth/login',
	async (data: LoginRequest, { rejectWithValue }) => {
		try {
			const response = await authApi.login(data);
			// Предполагаем, что API возвращает { data: { access_token, user } }
			// baseApi возвращает { data: T, status: number }
			return response.data;
		} catch (err) {
			if (err instanceof ApiHttpError) {
				return rejectWithValue(err.payload?.message || err.message);
			}
			return rejectWithValue('Login failed');
		}
	}
);

export const registerUser = createAsyncThunk(
	'auth/register',
	async (data: RegisterRequest, { rejectWithValue }) => {
		try {
			const response = await authApi.register(data);
			return response.data;
		} catch (err) {
			if (err instanceof ApiHttpError) {
				return rejectWithValue(err.payload?.message || err.message);
			}
			return rejectWithValue('Registration failed');
		}
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		openLoginPopup: (state) => {
			state.isLoginPopupOpen = true;
			state.error = null;
		},
		closeLoginPopup: (state) => {
			state.isLoginPopupOpen = false;
			state.error = null;
		},
		logout: (state) => {
			state.user = null;
			state.token = null;
			localStorage.removeItem('token');
		},
		setCredentials: (
			state,
			action: PayloadAction<{ user: User; token: string }>
		) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
			localStorage.setItem('token', action.payload.token);
		},
	},

	extraReducers: (builder) => {
		builder
			// Login
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload.user;
				state.token = action.payload.access_token;
				state.isLoginPopupOpen = false; // Закрываем попап при успехе
				localStorage.setItem('token', action.payload.access_token);
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})
			// Register
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload.user;
				state.token = action.payload.access_token;
				state.isLoginPopupOpen = false;
				localStorage.setItem('token', action.payload.access_token);
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
	},
});

export const { openLoginPopup, closeLoginPopup, logout, setCredentials } =
	authSlice.actions;
export const { reducer: authSliceReducer } = authSlice;
