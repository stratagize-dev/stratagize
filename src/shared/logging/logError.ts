const isError = (error: unknown): error is Error => {
  return (error as Error).message !== undefined;
};

const isResponse = (error: unknown): error is Response => {
  const response = error as Response;
  return response?.status !== undefined && response?.ok !== undefined;
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
        ` RateLimit:${error.headers.get('X-Ratelimit-Limit')}`
      );
    }

    if (error.headers.has('X-Ratelimit-Usage')) {
      errorMessage = errorMessage.concat(
        ` RateLimit:${error.headers.get('X-Ratelimit-Usage')}`
      );
    }

    console.log(JSON.stringify({ message, error: errorMessage, namespace }));
  }

  console.log(JSON.stringify({ message, namespace }));
}
