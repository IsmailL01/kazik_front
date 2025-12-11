import axios from 'axios';

const API_URL = 'http://localhost:8000';
export const $api = axios.create({
	baseURL: API_URL,
	withCredentials: true,
});

$api.interceptors.request.use((config) => {
	const token = localStorage.getItem('accessToken');
	if (config.headers && token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});
