// src/app/register/page.tsx
"use client";

import React, { useState } from "react";
import userRegister from "@/libs/userRegister";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    tel: "",
    name: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await userRegister(
        formData.email,
        formData.password,
        formData.tel,
        formData.name
      );
      setSuccess("Registration successful!");
    } catch (err) {
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4  text-blue-900">Register</h1>
      <form onSubmit={handleSubmit} className="w-full">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="p-2 border border-gray-300 text-black">Name:</td>
              <td className="p-2 border border-gray-300">
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded-md" />
              </td>
            </tr>
            <tr>
              <td className="p-2 border border-gray-300 text-black">Password:</td>
              <td className="p-2 border border-gray-300">
                <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full p-2 border rounded-md" />
              </td>
            </tr>
            <tr>
              <td className="p-2 border border-gray-300 text-black">Email:</td>
              <td className="p-2 border border-gray-300">
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded-md" />
              </td>
            </tr>
            <tr>
              <td className="p-2 border border-gray-300 text-black">Telephone:</td>
              <td className="p-2 border border-gray-300">
                <input type="tel" name="tel" value={formData.tel} onChange={handleChange} required className="w-full p-2 border rounded-md" />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Register</button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </div>
  );
};

export default RegisterPage;