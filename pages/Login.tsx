import React, { useState } from 'react';
import { findUserByEmail } from '../services/storage';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  onNavigate: (page: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = findUserByEmail(email);
    
    // Simple mock auth - in real app check password hash
    if (user && user.password === password) {
      onLogin(user);
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 pb-12">
      {/* Funny Character Image */}
      <div className="flex justify-center -mb-6 relative z-10">
        <img 
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20activities/Person%20Lifting%20Weights%20Medium-Light%20Skin%20Tone.png" 
            alt="Fitness Character" 
            className="w-32 h-32 drop-shadow-xl hover:scale-110 transition-transform duration-300 animate-bounce"
            style={{ animationDuration: '2s' }}
        />
      </div>

      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-emerald-100 relative z-0">
        <div className="p-8 space-y-6 pt-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-emerald-900">Welcome Back</h2>
            <p className="text-gray-500 mt-2">Login to your FitVerse account</p>
          </div>
          
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-100 font-medium">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                    type="email" 
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition bg-white text-gray-900 placeholder-gray-400 font-medium"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input 
                    type="password" 
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition bg-white text-gray-900 placeholder-gray-400 font-medium"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            
            <button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition hover:-translate-y-0.5">
                Login
            </button>
          </form>

          <div className="text-center pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">
                Don't have an account? {' '}
                <button onClick={() => onNavigate('signup')} className="text-emerald-600 font-bold hover:underline">
                    Sign up
                </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;