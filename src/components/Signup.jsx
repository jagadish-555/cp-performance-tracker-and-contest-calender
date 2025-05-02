import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { login } from '../store/authSlice';
import authService from '../appwrite/auth';

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const account = await authService.createAccount(data);
      if (account) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          dispatch(login(currentUser));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-xl w-full max-w-4xl p-8">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">Create your account</h2>
        <p className="text-center text-sm text-gray-600 mb-4">
          Already registered?{" "}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline">Sign in</Link>
        </p>
        {error && <p className="text-center text-sm text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Name, Email, Password */}
          <div className="space-y-4">
            {[
              { name: "name", label: "Full Name", placeholder: "John Doe" },
              { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
              { name: "password", label: "Password", type: "password", placeholder: "••••••••" },
            ].map(({ name, label, type = "text", placeholder }) => (
              <div key={name}>
                <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                  {label}
                </label>
                <input
                  id={name}
                  type={type}
                  placeholder={placeholder}
                  {...register(name, { required: `${label} is required` })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors[name] && (
                  <p className="text-xs text-red-600 mt-1">{errors[name].message}</p>
                )}
              </div>
            ))}
          </div>

          {/* Right Column: Competitive Handles */}
          <div className="space-y-4">
            {[
              { name: "codeforcesId", label: "Codeforces ID", placeholder: "tourist" },
              { name: "codechefId", label: "Codechef ID", placeholder: "rajat1603" },
              { name: "leetcodeId", label: "Leetcode ID", placeholder: "ninja123" },
            ].map(({ name, label, placeholder }) => (
              <div key={name}>
                <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                  {label}
                </label>
                <input
                  id={name}
                  type="text"
                  placeholder={placeholder}
                  {...register(name, { required: `${label} is required` })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors[name] && (
                  <p className="text-xs text-red-600 mt-1">{errors[name].message}</p>
                )}
              </div>
            ))}
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
