export const isResponse = (error: unknown): error is Response => {
  const response = error as Response;
  return response?.status !== undefined && response?.ok !== undefined;
};

export default function isRateLimitingError(error?: unknown) {
  const result = {
    isRateLimited: true,
    fifteenMinute: {
      limit: 0,
      usage: 0,
      isExceeded: false
    },
    daily: {
      limit: 0,
      usage: 0,
      isExceeded: false
    }
  };

  if (isResponse(error)) {
    if (error.headers.has('X-Ratelimit-Limit')) {
      result.isRateLimited = true;
      const limits = error.headers.get('X-Ratelimit-Limit')?.split(',');
      result.fifteenMinute.limit = parseInt(limits?.[0] ?? '0');
      result.daily.limit = parseInt(limits?.[1] ?? '0');
    }

    if (error.headers.has('X-Ratelimit-Usage')) {
      result.isRateLimited = true;
      const limits = error.headers.get('X-Ratelimit-Usage')?.split(',');
      result.fifteenMinute.usage = parseInt(limits?.[0] ?? '0');
      result.daily.usage = parseInt(limits?.[1] ?? '0');
    }

    result.daily.isExceeded = result.daily.usage > result.daily.limit;
    result.fifteenMinute.isExceeded =
      result.fifteenMinute.usage > result.fifteenMinute.limit;
  }
  return result;
}
