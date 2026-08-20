export class ApiError extends Error {
  status: number;
  data: unknown;
  constructor(message: string, status: number, data: unknown);
}

export const API_BASE_URL: string;
export const AUTH_API_BASE_URL: string;

export function apiFetch<T = unknown>(
  path: string,
  options?: Record<string, unknown> & {
    method?: string;
    body?: unknown;
    headers?: Record<string, string>;
    includeAuth?: boolean;
    credentials?: RequestCredentials;
    baseUrl?: string;
  },
): Promise<T | null>;
