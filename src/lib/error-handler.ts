import { AxiosError } from 'axios';

export function handleError(error: unknown): string {
  if (error instanceof AxiosError) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return error.response.data?.message || error.response.data?.error || error.message;
    } else if (error.request) {
      // The request was made but no response was received
      return 'No response received from server. Please check your connection.';
    }
    // Something happened in setting up the request that triggered an Error
    return error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'An unexpected error occurred';
}

export function isNetworkError(error: unknown): boolean {
  return error instanceof AxiosError && !error.response;
}

export function isAuthError(error: unknown): boolean {
  return error instanceof AxiosError && error.response?.status === 401;
}

export function isForbiddenError(error: unknown): boolean {
  return error instanceof AxiosError && error.response?.status === 403;
}

export function isValidationError(error: unknown): boolean {
  return error instanceof AxiosError && error.response?.status === 422;
}