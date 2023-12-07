export const getApiBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return `https://${process.env.NEXT_PUBLIC_SITE_URL}/api`;
  }

  return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`;
};
