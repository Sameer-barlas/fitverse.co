import React, { useState } from 'react';
import { User, MedicalHistory } from '../types';
import { saveUser } from '../services/storage';

interface ProfileProps {
  user: User;
  onUpdate: (user: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    age: user.age,
    height: user.height,
    weight: user.weight
  });
  const [medical, setMedical] = useState<MedicalHistory>(user.medical);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMedicalChange = (key: keyof MedicalHistory) => {
    setMedical({ ...medical, [key]: !medical[key] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser: User = {
      ...user,
      ...formData,
      age: Number(formData.age),
      height: Number(formData.height),
      weight: Number(formData.weight),
      medical
    };
    
    saveUser(updatedUser);
    onUpdate(updatedUser);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-emerald-100 p-8">
      <div className="border-b border-gray-100 pb-6 mb-6">
        <h2 className="text-2xl font-bold text-emerald-900">Profile Settings</h2>
        <p className="text-gray-500">Update your biometrics to refresh your workout plan.</p>
      </div>

      {saved && (
        <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-6 text-center font-medium animate-fade-in">
            Profile updated successfully! Your plan has been recalculated.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                <input 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    className="w-full p-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" 
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email (Read Only)</label>
                <input 
                    value={user.email} 
                    disabled 
                    className="w-full p-3 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed" 
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height (m)</label>
                <input 
                    type="number" step="0.01" name="height" 
                    value={formData.height} onChange={handleChange} 
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" 
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                <input 
                    type="number" step="0.1" name="weight" 
                    value={formData.weight} onChange={handleChange} 
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" 
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input 
                    type="number" name="age" 
                    value={formData.age} onChange={handleChange} 
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" 
                />
            </div>
        </div>

        <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Medical Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(medical).map(([key, value]) => (
                    <label key={key} className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${value ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'}`}>
                        <span className="capitalize text-gray-700 font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <div className="relative inline-block w-12 h-6 align-middle select-none transition duration-200 ease-in">
                            <input 
                                type="checkbox" 
                                checked={value} 
                                onChange={() => handleMedicalChange(key as keyof MedicalHistory)}
                                className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer right-0"
                                style={{ right: value ? '0' : '50%' }}
                            />
                            <span className={`block overflow-hidden h-6 rounded-full cursor-pointer ${value ? 'bg-red-500' : 'bg-gray-300'}`}></span>
                        </div>
                    </label>
                ))}
            </div>
        </div>

        <div className="pt-4">
            <button type="submit" className="w-full md:w-auto px-8 bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition shadow-lg hover:-translate-y-1">
                Save Changes
            </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;