import React, { useState } from 'react';
import { getUsers } from '../services/storage';
import { User } from '../types';
import { Trash2, Edit, Plus } from 'lucide-react';

const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>(getUsers());
  const [activeTab, setActiveTab] = useState<'users' | 'exercises'>('users');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-emerald-950">Admin Panel</h2>
        <div className="flex space-x-2 bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <button 
                onClick={() => setActiveTab('users')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'users' ? 'bg-emerald-100 text-emerald-800' : 'text-gray-500'}`}
            >
                Manage Users
            </button>
            <button 
                onClick={() => setActiveTab('exercises')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'exercises' ? 'bg-emerald-100 text-emerald-800' : 'text-gray-500'}`}
            >
                Manage Exercises
            </button>
        </div>
      </div>

      {activeTab === 'users' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Age</th>
                            <th className="p-4">BMI Specs</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map(u => (
                            <tr key={u.id} className="hover:bg-gray-50 transition">
                                <td className="p-4 font-medium">{u.name}</td>
                                <td className="p-4 text-gray-500">{u.email}</td>
                                <td className="p-4">{u.age}</td>
                                <td className="p-4 text-sm">
                                    {u.height}m / {u.weight}kg
                                </td>
                                <td className="p-4">
                                    <button className="text-red-500 hover:bg-red-50 p-2 rounded-lg" title="Delete User (Mock)">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>
      )}

      {activeTab === 'exercises' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="bg-emerald-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                  <Plus size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Add New Exercise</h3>
              <p className="text-gray-500 max-w-md mx-auto mt-2">
                  This feature is a placeholder for the CRUD operations requested. In a full backend integration, this would POST to <code>/admin/exercise/add</code>.
              </p>
              <button className="mt-6 bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-emerald-700">
                  Open Exercise Editor
              </button>
          </div>
      )}
    </div>
  );
};

export default Admin;