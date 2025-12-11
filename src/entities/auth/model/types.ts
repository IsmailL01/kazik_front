import { ApiResponse } from '@/shared/api/baseApi';

// User authentication data
export interface User {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	authMethod: 'email' | 'google' | 'steam' | 'twitter';
	googlePicture?: string;
	isEmailVerified: boolean;
	createdAt: string;
	updatedAt: string;
}

// Login request
export interface LoginRequest {
	email: string;
	password: string;
}

// Register request
export interface RegisterRequest {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	currency: string;
	promoCode?: string;
	ageCheckbox: boolean;
	promoCheckbox?: boolean;
}

// Forgot password request
export interface ForgotPasswordRequest {
	email: string;
}

// Reset password request
export interface ResetPasswordRequest {
	token: string;
	password: string;
}

// Google OAuth token exchange request
export interface GoogleTokenRequest {
	code: string;
}

// Authentication response
export interface AuthResponse {
	access_token: string;
	refresh_token?: string;
	user: User;
}

// Forgot password response
export interface ForgotPasswordResponse {
	message: string;
}

// Reset password response
export interface ResetPasswordResponse {
	message: string;
}

// Email verification request
export interface VerifyEmailRequest {
	token: string;
}

// Email verification response
export interface VerifyEmailResponse {
	message: string;
}

// Resend verification email request
export interface ResendVerificationRequest {
	email: string;
}

// Resend verification email response
export interface ResendVerificationResponse {
	message: string;
}

// Refresh token request
export interface RefreshTokenRequest {
	refresh_token: string;
}

// Refresh token response
export interface RefreshTokenResponse {
	access_token: string;
	refresh_token?: string;
}

// Logout response
export interface LogoutResponse {
	message: string;
}

// API response types
export type LoginApiResponse = ApiResponse<AuthResponse>;
export type RegisterApiResponse = ApiResponse<AuthResponse>;
export type GoogleTokenApiResponse = ApiResponse<AuthResponse>;
export type ForgotPasswordApiResponse = ApiResponse<ForgotPasswordResponse>;
export type ResetPasswordApiResponse = ApiResponse<ResetPasswordResponse>;
export type VerifyEmailApiResponse = ApiResponse<VerifyEmailResponse>;
export type ResendVerificationApiResponse =
	ApiResponse<ResendVerificationResponse>;
export type RefreshTokenApiResponse = ApiResponse<RefreshTokenResponse>;
export type LogoutApiResponse = ApiResponse<LogoutResponse>;
export type GetProfileApiResponse = ApiResponse<User>;
export type UpdateProfileApiResponse = ApiResponse<User>;
