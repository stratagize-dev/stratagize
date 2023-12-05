import { isResponse } from '@/shared/error';

const isError = (error: unknown): error is Error => {
  return (error as Error).message !== undefined;
};

export default function logError(
  message: string,
  error?: unknown,
  namespace?: string
) {
  if (isError(error)) {
    console.log(JSON.stringify({ message, error: error?.message, namespace }));
  }

  if (isResponse(error)) {
    let errorMessage = `${error.status} ${error.statusText}`;

    if (error.headers.has('X-Ratelimit-Limit')) {
      errorMessage = errorMessage.concat(
        ` RateLimit-Limit:${error.headers.get('X-Ratelimit-Limit')}`
      );
    }

    if (error.headers.has('X-Ratelimit-Usage')) {
      errorMessage = errorMessage.concat(
        ` RateLimit-Usage:${error.headers.get('X-Ratelimit-Usage')}`
      );
    }

    console.log(JSON.stringify({ message, error: errorMessage, namespace }));
  }

  console.log(JSON.stringify({ message, namespace }));
}
