import { ValidationError } from 'yup';

export function parseError(error: any): string | string[] {
  if (error == null) return 'Network error';
  if (error instanceof ValidationError) return error.errors;
  console.error(error, typeof error);
  if (error.status === 400) {
    return error.response && error.response.isError ? error.response.message : 'Bad request';
  }
  if (error.status === 500) {
    return 'Server error';
  }
  return 'Unknown error';
}
