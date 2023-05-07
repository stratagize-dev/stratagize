'use client';
import { signIn } from 'next-auth/react';

export default function Login() {
  const handleLoginWithStrava = async () => {
    await signIn('strava', { callbackUrl: '/' });
  };

  return <button onClick={handleLoginWithStrava}>Login with Strava</button>;
}
