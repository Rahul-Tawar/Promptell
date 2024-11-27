'use client'

import React, { useState, useEffect } from 'react';
import { signIn, getProviders} from 'next-auth/react';
import { Chrome } from 'lucide-react';

const LoginForm = () => {
    const [providers, setProviders] = useState(null)

    useEffect(() => {
      const setUpProviders = async () => {
        const response = await getProviders()
        setProviders(response)
      }
      setUpProviders()
    },[])
  

  return (
    <div className="w-full max-w-md p-8 rounded-2xl bg-black/40 backdrop-blur-lg border border-white/10">
      <div className="flex flex-col items-center space-y-6">
        <h1 className='text-6xl'>🤗</h1>
        <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
        <p className="text-gray-400 text-center">
          Sign in to access your account and continue your journey
        </p>
        
        <button
          onClick={() => signIn(providers.id)}
          className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <Chrome className="w-5 h-5" />
          <span className="font-medium">Continue with Google</span>
        </button>

        <div className="w-full flex items-center gap-4">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-gray-400">or</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        <div className="w-full space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity duration-200">
            Sign In
          </button>
        </div>

        <p className="text-gray-400">
          Don't have an account?{' '}
          <a href="#" className="text-blue-400 hover:text-blue-300">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;