import React, { useState } from 'react';
import { User, Gender, MedicalHistory } from '../types';
import { saveUser } from '../services/storage';

interface SignupProps {
  onLogin: (user: User) => void;
  onNavigate: (page: string) => void;
}

const Signup: React.FC<SignupProps> = ({ onLogin, onNavigate }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', age: 25, height: 1.75, weight: 70, gender: Gender.MALE
  });
  const [medical, setMedical] = useState<MedicalHistory>({
    heartIssue: false, diabetes: false, asthma: false, injury: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMedicalChange = (key: keyof MedicalHistory) => {
    setMedical({ ...medical, [key]: !medical[key] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: Date.now().toString(),
      ...formData,
      age: Number(formData.age),
      height: Number(formData.height),
      weight: Number(formData.weight),
      medical
    };
    saveUser(newUser);
    onLogin(newUser);
  };

  return (
    <div className="max-w-2xl mx-auto mt-4 pb-12">
      {/* Funny Character Image */}
      <div className="flex justify-center -mb-6 relative z-10">
        <img 
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20activities/Person%20Lifting%20Weights%20Medium-Light%20Skin%20Tone.png" 
            alt="Fitness Character" 
            className="w-28 h-28 drop-shadow-xl animate-bounce"
            style={{ animationDuration: '3s' }}
        />
      </div>

      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-gray-100 relative z-0">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white text-center pt-10">
          <h2 className="text-3xl font-bold">Join FitVerse</h2>
          <p className="opacity-90">Let's build your profile</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input required name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white text-gray-900 placeholder-gray-400" placeholder="John Doe" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white text-gray-900 placeholder-gray-400" placeholder="john@example.com" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input required type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white text-gray-900 placeholder-gray-400" placeholder="••••••••" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white text-gray-900">
                        <option value={Gender.MALE}>Male</option>
                        <option value={Gender.FEMALE}>Female</option>
                        <option value={Gender.OTHER}>Other</option>
                    </select>
                </div>
              </div>
              <button type="button" onClick={() => setStep(2)} className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition mt-4 shadow-md">
                Next: Body Stats
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Body Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age (years)</label>
                    <input required type="number" name="age" value={formData.age} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white text-gray-900" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Height (m)</label>
                    <input required type="number" step="0.01" name="height" value={formData.height} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white text-gray-900" placeholder="1.75" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                    <input required type="number" step="0.1" name="weight" value={formData.weight} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white text-gray-900" placeholder="70" />
                </div>
              </div>
              <div className="flex space-x-3">
                <button type="button" onClick={() => setStep(1)} className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-300 transition">Back</button>
                <button type="button" onClick={() => setStep(3)} className="flex-1 bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition shadow-md">Next: Medical</button>
              </div>
            </div>
          )}

          {step === 3 && (
             <div className="space-y-4 animate-fade-in">
             <h3 className="text-xl font-semibold text-gray-700 mb-4">Medical History</h3>
             <p className="text-sm text-gray-500">We use this to ensure your safety.</p>
             
             <div className="space-y-3">
                {[
                    { key: 'heartIssue', label: 'Heart Condition' },
                    { key: 'diabetes', label: 'Diabetes' },
                    { key: 'asthma', label: 'Asthma' },
                    { key: 'injury', label: 'Current Injury' }
                ].map(item => (
                    <label key={item.key} className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all shadow-sm ${medical[item.key as keyof MedicalHistory] ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500' : 'border-gray-200 hover:bg-gray-50 bg-white'}`}>
                        <span className="font-medium text-gray-800">{item.label}</span>
                        <input 
                            type="checkbox" 
                            checked={medical[item.key as keyof MedicalHistory]} 
                            onChange={() => handleMedicalChange(item.key as keyof MedicalHistory)}
                            className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 border-gray-300" 
                        />
                    </label>
                ))}
             </div>

             <div className="flex space-x-3 mt-6">
               <button type="button" onClick={() => setStep(2)} className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-300 transition">Back</button>
               <button type="submit" className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition hover:-translate-y-0.5">Create Account</button>
             </div>
           </div>
          )}
        </form>
        
        <div className="p-4 text-center bg-gray-50 border-t border-gray-200">
            <button onClick={() => onNavigate('login')} className="text-emerald-600 hover:underline text-sm font-semibold">
                Already have an account? Login here
            </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;