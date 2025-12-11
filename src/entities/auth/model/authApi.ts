import { baseApi } from '@/shared/api/baseApi';
import type {
	LoginRequest,
	RegisterRequest,
	ForgotPasswordRequest,
	ResetPasswordRequest,
	GoogleTokenRequest,
	AuthResponse,
	ForgotPasswordResponse,
	ResetPasswordResponse,
	VerifyEmailRequest,
	VerifyEmailResponse,
	ResendVerificationRequest,
	ResendVerificationResponse,
	RefreshTokenRequest,
	RefreshTokenResponse,
	LogoutResponse,
	User,
	LoginApiResponse,
	RegisterApiResponse,
	GoogleTokenApiResponse,
	ForgotPasswordApiResponse,
	ResetPasswordApiResponse,
	VerifyEmailApiResponse,
	ResendVerificationApiResponse,
	RefreshTokenApiResponse,
	LogoutApiResponse,
	GetProfileApiResponse,
	UpdateProfileApiResponse,
} from '../model/types';

class AuthApiService {
	private readonly basePath = '/auth';

	// Login user
	async login(data: LoginRequest): Promise<LoginApiResponse> {
		return baseApi.post<AuthResponse>(`${this.basePath}/login`, data);
	}

	// Register user
	async register(data: RegisterRequest): Promise<RegisterApiResponse> {
		return baseApi.post<AuthResponse>(`${this.basePath}/register`, data);
	}

	// Google OAuth token exchange
	async googleToken(data: GoogleTokenRequest): Promise<GoogleTokenApiResponse> {
		return baseApi.post<AuthResponse>(`${this.basePath}/google/token`, data);
	}

	// Forgot password
	async forgotPassword(
		data: ForgotPasswordRequest
	): Promise<ForgotPasswordApiResponse> {
		return baseApi.post<ForgotPasswordResponse>(
			`${this.basePath}/forgot-password`,
			data
		);
	}

	// Reset password
	async resetPassword(
		data: ResetPasswordRequest
	): Promise<ResetPasswordApiResponse> {
		return baseApi.post<ResetPasswordResponse>(
			`${this.basePath}/reset-password`,
			data
		);
	}

	// Get current user profile
	async getProfile(): Promise<GetProfileApiResponse> {
		return baseApi.get<User>(`${this.basePath}/profile`);
	}

	// Update user profile
	async updateProfile(data: Partial<User>): Promise<UpdateProfileApiResponse> {
		return baseApi.put<User>(`${this.basePath}/profile`, data);
	}

	// Logout user
	async logout(): Promise<LogoutApiResponse> {
		return baseApi.post<LogoutResponse>(`${this.basePath}/logout`);
	}

	// Refresh token
	async refreshToken(
		data: RefreshTokenRequest
	): Promise<RefreshTokenApiResponse> {
		return baseApi.post<RefreshTokenResponse>(`${this.basePath}/refresh`, data);
	}

	// Verify email
	async verifyEmail(data: VerifyEmailRequest): Promise<VerifyEmailApiResponse> {
		return baseApi.post<VerifyEmailResponse>(
			`${this.basePath}/verify-email`,
			data
		);
	}

	// Resend verification email
	async resendVerificationEmail(
		data: ResendVerificationRequest
	): Promise<ResendVerificationApiResponse> {
		return baseApi.post<ResendVerificationResponse>(
			`${this.basePath}/resend-verification`,
			data
		);
	}
}

// Create and export singleton instance
export const authApi = new AuthApiService();

// Export types for use in components
export type {
	LoginRequest,
	RegisterRequest,
	ForgotPasswordRequest,
	ResetPasswordRequest,
	GoogleTokenRequest,
	AuthResponse,
	ForgotPasswordResponse,
	ResetPasswordResponse,
	VerifyEmailRequest,
	VerifyEmailResponse,
	ResendVerificationRequest,
	ResendVerificationResponse,
	RefreshTokenRequest,
	RefreshTokenResponse,
	LogoutResponse,
	User,
} from '../model/types';
