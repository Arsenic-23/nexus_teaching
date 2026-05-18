import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/v1';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Token getter - set by auth provider after Clerk loads
let tokenGetter: (() => Promise<string | null>) | null = null;

export function setTokenGetter(getter: () => Promise<string | null>) {
  tokenGetter = getter;
}

// Request interceptor - attach auth token
apiClient.interceptors.request.use(
  async (config) => {
    if (tokenGetter) {
      try {
        const token = await tokenGetter();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch {
        // Session not available, skip
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor - handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: { response?: { status: number } }) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        window.location.href = '/sign-in';
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
