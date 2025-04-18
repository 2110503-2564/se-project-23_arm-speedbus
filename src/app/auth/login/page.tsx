"use client";

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      redirect: true,
      email,
      password,
      callbackUrl: '/',
    });

  };

  return (
    <div className="bg-yellow-300 py-20 px-4">
  <div className="max-w-md mx-auto flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4 text-black-900">Login</h1>
      <form onSubmit={handleLogin} className="w-full">
        <table className="w-full border-collapse border-none text-black">
          <tbody>
           
            <tr>
              <td className="p-2 text-black">Email:</td>
              <td className="p-2">
              <input type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
           required className="w-full p-2 border rounded-md bg-gray-100" />
              </td>
            </tr>
            <tr>
              <td className="p-2 text-black">Password:</td>
              <td className="p-2">
              <input type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
           required className="w-full p-2 border rounded-md bg-gray-100" />
              </td>
            </tr>
          </tbody>
        </table>
        <button
        type="submit"
        className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-green-600">
            Sign In
            </button>
            <Link href="/register" className='items-center justify-center underline'>create account?</Link>
      </form>
    </div>
    </div>
  );
};
