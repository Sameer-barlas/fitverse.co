import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { ArrowRight, Activity, Heart, ShieldCheck, Quote, Star, Trophy } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
  user: User | null;
}

const QUOTES = [
  "The only bad workout is the one that didn't happen.",
  "Your body can stand almost anything. It’s your mind that you have to convince.",
  "Success starts with self-discipline.",
  "Don't stop when you're tired. Stop when you're done.",
  "Your health is your wealth.",
  "Sweat is just fat crying.",
  "No pain, no gain. Shut up and train.",
  "Motivation is what gets you started. Habit is what keeps you going.",
  "Fitness is not about being better than someone else. It’s about being better than you were yesterday.",
  "A one-hour workout is 4% of your day. No excuses.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "Don't wish for it, work for it.",
  "Discipline is doing what needs to be done, even if you don't want to do it.",
  "Excuses don't burn calories.",
  "Make yourself proud.",
  "You don't find willpower, you create it.",
  "Push harder than yesterday if you want a different tomorrow.",
  "Sore today, strong tomorrow.",
  "Fall in love with taking care of your body.",
  "Action is the foundational key to all success."
];

const Home: React.FC<HomeProps> = ({ onNavigate, user }) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % QUOTES.length);
    }, 60000); // Switch every 60 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-24 pb-12 animate-fade-in">
      {/* Hero Section */}
      <section className="relative flex flex-col lg:flex-row items-center justify-between gap-12 mt-8">
        <div className="flex-1 space-y-8 z-10">
          <div className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold tracking-wide shadow-sm border border-emerald-200">
            ✨ #1 AI FITNESS COMPANION
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight text-emerald-950 drop-shadow-sm">
            Your Personal <br />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Health Universe
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
            FitVerse uses advanced algorithms to analyze your BMI, age, and medical history to generate the perfect safe and effective workout plan for you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => onNavigate(user ? 'dashboard' : 'signup')}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              {user ? 'Go to Dashboard' : 'Start Your Journey'}
              <ArrowRight size={20} />
            </button>
            {!user && (
               <button 
               onClick={() => onNavigate('login')}
               className="bg-white text-emerald-800 px-8 py-4 rounded-full font-bold text-lg shadow-md hover:bg-gray-50 transition-all border border-emerald-100"
             >
               Login
             </button>
            )}
          </div>
        </div>

        {/* Hero Image Collage */}
        <div className="flex-1 relative">
            <div className="relative z-10 grid grid-cols-2 gap-4 p-4 bg-white/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 transform rotate-2 hover:rotate-0 transition-transform duration-700">
                <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80" alt="Fitness" className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500" />
                <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80" alt="Workout" className="rounded-2xl shadow-lg mt-8 hover:scale-105 transition-transform duration-500" />
            </div>
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>
      </section>

      {/* Motivational Quote Section */}
      <section className="bg-gradient-to-r from-emerald-900 to-teal-900 rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl transform hover:-translate-y-1 transition-all">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <Activity size={400} className="text-white absolute -top-20 -left-20" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <Quote size={48} className="text-emerald-400 mx-auto opacity-80" />
              <h2 className="text-3xl md:text-4xl font-bold text-white italic leading-relaxed animate-fade-in" key={currentQuoteIndex}>
                  "{QUOTES[currentQuoteIndex]}"
              </h2>
              <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full"></div>
          </div>
      </section>

      {/* Features Grid */}
      <section>
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-emerald-950">Why Choose FitVerse?</h2>
            <p className="text-emerald-600 mt-2">Smart technology meets personal fitness.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white to-emerald-50 p-8 rounded-2xl shadow-lg border border-emerald-100 hover:-translate-y-2 transition-transform">
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 shadow-inner">
                    <Activity size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-emerald-900">Smart BMI Analysis</h3>
                <p className="text-gray-600 leading-relaxed">
                    We calculate your Body Mass Index and classify your metabolic needs instantly to tailor your nutrition and fitness path.
                </p>
            </div>
            <div className="bg-gradient-to-br from-white to-teal-50 p-8 rounded-2xl shadow-lg border border-teal-100 hover:-translate-y-2 transition-transform">
                <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600 mb-6 shadow-inner">
                    <ShieldCheck size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-emerald-900">Medically Safe</h3>
                <p className="text-gray-600 leading-relaxed">
                    Have asthma or a heart condition? FitVerse automatically adjusts intensity and excludes risky exercises.
                </p>
            </div>
            <div className="bg-gradient-to-br from-white to-green-50 p-8 rounded-2xl shadow-lg border border-green-100 hover:-translate-y-2 transition-transform">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6 shadow-inner">
                    <Heart size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-emerald-900">Age Adapted</h3>
                <p className="text-gray-600 leading-relaxed">
                    From juniors to seniors, our plans adjust repetition counts and impact levels to suit your life stage.
                </p>
            </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-emerald-100">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-emerald-950 flex items-center justify-center gap-2">
                <Trophy className="text-yellow-500" /> Success Stories
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
              {[
                  { name: "Sarah M.", age: 28, loss: "-5kg", quote: "FitVerse helped me tone up without injuring my knees!", color: "from-pink-50 to-rose-100" },
                  { name: "James D.", age: 45, loss: "-12kg", quote: "The heart-safe plan was exactly what I needed.", color: "from-blue-50 to-indigo-100" },
                  { name: "Emily R.", age: 34, loss: "Muscle Gain", quote: "I finally understand how to eat for my body type.", color: "from-purple-50 to-violet-100" }
              ].map((story, i) => (
                  <div key={i} className={`bg-gradient-to-br ${story.color} p-6 rounded-xl shadow-sm border border-white/50`}>
                      <div className="flex items-center gap-1 text-yellow-500 mb-4">
                          <Star size={16} fill="currentColor" />
                          <Star size={16} fill="currentColor" />
                          <Star size={16} fill="currentColor" />
                          <Star size={16} fill="currentColor" />
                          <Star size={16} fill="currentColor" />
                      </div>
                      <p className="text-gray-700 italic mb-4">"{story.quote}"</p>
                      <div className="flex items-center justify-between border-t border-black/5 pt-4">
                          <span className="font-bold text-gray-800">{story.name}</span>
                          <span className="text-xs font-semibold bg-white/80 px-2 py-1 rounded text-gray-600">{story.loss}</span>
                      </div>
                  </div>
              ))}
          </div>
      </section>
    </div>
  );
};

export default Home;