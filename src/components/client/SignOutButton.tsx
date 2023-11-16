'use client';
import { signOut } from 'next-auth/react';

const SignOutButton = () => (
  <button
    className="g-transparent hover:bg-purple-500 text-purple-500 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded"
    onClick={() => signOut()}
  >
    Sign Out
  </button>
);

export default SignOutButton;
