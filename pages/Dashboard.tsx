import React from 'react';
import { User } from '../types';
import { calculateBMI, generateWorkoutPlan } from '../services/fitnessLogic';
import { TrendingUp, Activity, User as UserIcon, Calendar } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface DashboardProps {
  user: User;
  onNavigate: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate }) => {
  const bmiData = calculateBMI(user.weight, user.height);
  const plan = generateWorkoutPlan(user);

  const pieData = [
    { name: 'BMI Score', value: bmiData.value },
    { name: 'Remaining', value: 40 - bmiData.value } // scale to 40 max roughly
  ];

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-end pb-6 border-b border-emerald-200">
        <div>
            <h1 className="text-4xl font-bold text-emerald-950">Hello, {user.name}!</h1>
            <p className="text-emerald-700 mt-2 flex items-center gap-2">
                <Calendar size={18} /> {today}
            </p>
        </div>
        <div className="mt-4 md:mt-0 bg-white/60 px-4 py-2 rounded-full border border-white backdrop-blur-sm text-sm font-medium text-emerald-800">
            Member since 2024
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* BMI Card */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-emerald-50 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Activity size={100} className="text-emerald-600" />
            </div>
            <h3 className="text-gray-500 font-medium mb-2">Your BMI Analysis</h3>
            <div className="flex items-center space-x-4">
                <div className="h-24 w-24">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                innerRadius={30}
                                outerRadius={40}
                                startAngle={180}
                                endAngle={0}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                <Cell key="cell-0" fill={bmiData.color} />
                                <Cell key="cell-1" fill="#e5e7eb" />
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div>
                    <span className="text-4xl font-bold" style={{ color: bmiData.color }}>{bmiData.value}</span>
                    <p className="text-sm font-semibold uppercase tracking-wide text-gray-600 mt-1">{bmiData.category}</p>
                </div>
            </div>
            <p className="text-xs text-gray-400 mt-4">Target: 18.5 - 24.9 (Normal)</p>
        </div>

        {/* Plan Summary */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden">
             <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white opacity-10 rounded-full"></div>
             <h3 className="text-emerald-100 font-medium mb-2">Recommended Plan</h3>
             <div className="mt-4">
                <h2 className="text-2xl font-bold leading-tight">{plan.description}</h2>
                <p className="text-emerald-100 text-sm mt-2 line-clamp-2">
                    Based on your age ({user.age}) and {user.medical.injury ? 'injury status' : 'fitness profile'}.
                </p>
                <button 
                    onClick={() => onNavigate('workout')}
                    className="mt-6 bg-white text-emerald-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-50 transition flex items-center gap-2"
                >
                    View Exercises <TrendingUp size={16} />
                </button>
             </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-emerald-50 flex flex-col justify-between">
            <div>
                <h3 className="text-gray-500 font-medium mb-4">Profile Specs</h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span className="text-gray-600 text-sm">Weight</span>
                        <span className="font-bold text-emerald-800">{user.weight} kg</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span className="text-gray-600 text-sm">Height</span>
                        <span className="font-bold text-emerald-800">{user.height} m</span>
                    </div>
                    <div className="flex justify-between items-center pb-2">
                        <span className="text-gray-600 text-sm">Medical Tags</span>
                        <div className="flex gap-1">
                            {Object.values(user.medical).some(v => v) ? (
                                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                            ) : (
                                <span className="w-3 h-3 rounded-full bg-green-400"></span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={() => onNavigate('profile')} className="text-emerald-600 text-sm font-semibold hover:underline mt-2 flex items-center gap-1">
                Edit Profile <UserIcon size={14} />
            </button>
        </div>
      </div>

      {/* Health Tips / Advice Area */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-emerald-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">AI Health Insights</h3>
          <div className="grid md:grid-cols-2 gap-4">
              {plan.advice.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-emerald-50/50 rounded-lg">
                      <div className="min-w-[24px] h-6 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-800 text-xs font-bold">
                          {idx + 1}
                      </div>
                      <p className="text-gray-700 text-sm">{tip}</p>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
};

export default Dashboard;