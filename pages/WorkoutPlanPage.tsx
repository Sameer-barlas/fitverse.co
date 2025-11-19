import React, { useState, useEffect } from 'react';
import { User, Exercise } from '../types';
import { generateWorkoutPlan } from '../services/fitnessLogic';
import { Clock, Zap, Info, CheckCircle2, RefreshCw, Trophy } from 'lucide-react';

interface WorkoutProps {
  user: User;
}

const WorkoutPlanPage: React.FC<WorkoutProps> = ({ user }) => {
  const [plan, setPlan] = useState(generateWorkoutPlan(user));
  const [isCompleted, setIsCompleted] = useState(false);
  const [shuffled, setShuffled] = useState(false);

  const getIntensityColor = (intensity: string) => {
    switch(intensity) {
        case 'low': return 'bg-blue-100 text-blue-700';
        case 'medium': return 'bg-yellow-100 text-yellow-700';
        case 'high': return 'bg-red-100 text-red-700';
        default: return 'bg-gray-100';
    }
  };

  const handleCompleteWorkout = () => {
    setIsCompleted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenerateNext = () => {
      // Simulate a new day by shuffling the existing suitable exercises
      const newPlan = generateWorkoutPlan(user);
      const shuffledExercises = [...newPlan.exercises].sort(() => Math.random() - 0.5);
      setPlan({ ...newPlan, exercises: shuffledExercises });
      setIsCompleted(false);
      setShuffled(true);
      setTimeout(() => setShuffled(false), 3000);
  };

  return (
    <div className="space-y-8 relative">
      {/* Celebration Overlay */}
      {isCompleted && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm rounded-3xl text-center p-8 animate-fade-in h-full">
              <div className="bg-yellow-100 p-6 rounded-full mb-6 animate-bounce">
                  <Trophy size={64} className="text-yellow-600" />
              </div>
              <h2 className="text-4xl font-extrabold text-emerald-900 mb-2">Workout Crushed!</h2>
              <p className="text-xl text-emerald-700 mb-8">Great job, {user.name.split(' ')[0]}! You're one step closer to your goal.</p>
              <button 
                onClick={handleGenerateNext}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition-transform flex items-center gap-2"
              >
                  <RefreshCw size={20} /> Load Tomorrow's Workout
              </button>
          </div>
      )}

      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-emerald-950">Today's Workout</h2>
        <div className="flex items-center justify-center gap-2">
            <p className="text-lg text-emerald-700 font-medium bg-emerald-100 inline-block px-4 py-1 rounded-full">
                {plan.description}
            </p>
            {shuffled && <span className="text-sm text-emerald-600 animate-fade-in font-bold">Updated!</span>}
        </div>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${isCompleted ? 'blur-sm' : ''}`}>
        {plan.exercises.map((exercise) => (
          <div key={exercise.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="h-48 overflow-hidden relative">
                <img 
                    src={exercise.imageUrl} 
                    alt={exercise.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide ${getIntensityColor(exercise.intensity)}`}>
                        {exercise.intensity}
                    </span>
                </div>
            </div>
            
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{exercise.title}</h3>
                <p className="text-gray-500 text-sm mb-4 h-10 overflow-hidden">{exercise.description}</p>
                
                <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 uppercase">Reps/Duration</span>
                        <span className="font-bold text-emerald-700 text-lg flex items-center gap-1">
                           <Clock size={16} /> {exercise.reps}
                        </span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-xs text-gray-400 uppercase">Sets</span>
                        <span className="font-bold text-emerald-700 text-lg flex items-center gap-1">
                            <Zap size={16} /> {exercise.sets}
                        </span>
                    </div>
                </div>
            </div>
          </div>
        ))}
      </div>

      {!isCompleted && (
        <button 
            onClick={handleCompleteWorkout}
            className="w-full md:w-1/2 mx-auto block bg-gradient-to-r from-emerald-600 to-green-500 text-white py-4 rounded-xl font-bold text-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 mt-12"
        >
            <CheckCircle2 size={28} /> Complete Workout
        </button>
      )}

      {/* Instructions / Disclaimer */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex items-start gap-4">
          <Info className="text-blue-600 shrink-0 mt-1" />
          <div>
              <h4 className="font-bold text-blue-800">Safety First</h4>
              <p className="text-blue-700 text-sm mt-1">
                  Remember to hydrate and warm up before starting. If you feel sharp pain (distinct from muscle fatigue), stop immediately. 
                  {user.medical.heartIssue && " Please monitor your heart rate carefully due to your history."}
              </p>
          </div>
      </div>
    </div>
  );
};

export default WorkoutPlanPage;