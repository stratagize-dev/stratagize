'use client';
import { signOut } from 'next-auth/react';

const SignOutButton = () => (
  <button
    className="g-transparent hover:bg-orange-500 text-orange-500 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded"
    onClick={() => signOut()}
  >
    Sign Out
  </button>
);

export default SignOutButton;
