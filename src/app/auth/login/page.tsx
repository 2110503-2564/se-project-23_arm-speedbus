"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: true,
      email,
      password,
      callbackUrl: "/",
    });
  };

  return (
    <div className="bg-[#FFFF00] py-20 px-4 mt-32">
      <div className="max-w-md mx-auto flex flex-col items-center justify-center p-6">
        <h1 className="text-[32px] font-bold mb-4 text-black font-robotoMono">
          LOGIN
        </h1>
        <form onSubmit={handleLogin} className="w-full">
          <table className="w-full  border-collapse border-none text-black">
            <tbody>
              <tr>
                <td className="p-2">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full  p-2 border border-black  bg-gray-100"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-2">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-2 border border-black bg-gray-100"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button
            type="submit"
            className="mt-4 w-[195px] font-robotoMono bg-black mx-auto text-white py-2 rounded-[48px] hover:bg-green-600 flex justify-center items-center"
          >
            Sign In
          </button>
          <div className="mt-4 font-robotoMono mx-auto text-white py-2 rounded-[48px] text-[#808080] flex justify-center items-center">
            <Link
              href="/register"
              className="items-center justify-center underline"
            >
              Create account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
