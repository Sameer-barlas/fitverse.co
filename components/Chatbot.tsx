import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Loader2, Dumbbell } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Greetings! I am Robo-Coach. Ready to optimize your fitness algorithm?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
        let botResponseText = "System error. Rebooting motivation module...";

        // Check if API key is available (simulated check)
        if (process.env.API_KEY) {
             const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
             const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: inputValue,
                config: {
                    systemInstruction: "You are Robo-Coach, a futuristic, high-energy robotic fitness assistant for FitVerse. Use robot metaphors occasionally (e.g., 'recharging batteries', 'optimizing output'). Keep answers short, helpful, and motivational.",
                }
             });
             botResponseText = response.text || "I didn't get that, can you rephrase?";
        } else {
            // Fallback response logic if no API Key (Mock Mode)
            const lowerInput = userMessage.text.toLowerCase();
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
            
            if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
                botResponseText = "Beep boop! Systems operational. Let's workout!";
            } else if (lowerInput.includes('weight') || lowerInput.includes('fat')) {
                botResponseText = "To reduce mass: Caloric Deficit + High Energy Output. Try our Fat Burn protocol.";
            } else if (lowerInput.includes('muscle') || lowerInput.includes('build')) {
                botResponseText = "Hypertrophy detected. Initiate: Heavy lifting and Protein intake.";
            } else if (lowerInput.includes('diet') || lowerInput.includes('food')) {
                botResponseText = "Fuel your chassis with premium grade inputs: Lean protein and vegetables.";
            } else {
                botResponseText = "Input received. Keep pushing your limits, human!";
            }
        }

        const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: botResponseText,
            sender: 'bot',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);

    } catch (error) {
        console.error("Chat error:", error);
        const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: "Connection severed. Please retry transmission.",
            sender: 'bot',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-80 sm:w-96 mb-4 overflow-hidden border border-emerald-200 animate-fade-in flex flex-col h-[500px] transform origin-bottom-right transition-all">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 via-emerald-900 to-teal-900 p-4 text-white flex justify-between items-center shadow-md relative overflow-hidden">
            {/* Decorative tech lines */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-400"></div>
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="bg-white/10 p-2 rounded-lg border border-white/20">
                  <Bot size={24} className="text-emerald-300" />
              </div>
              <div>
                <h3 className="font-bold text-base tracking-wide flex items-center gap-1">
                    ROBO-COACH <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                </h3>
                <p className="text-xs text-emerald-200 font-mono">v2.5.0 ONLINE</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition hover:rotate-90 duration-300">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-md relative ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-tr-none'
                      : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
                <div className="flex justify-start">
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-200 shadow-sm flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin text-emerald-600" />
                        <span className="text-xs text-gray-500 font-mono">PROCESSING...</span>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Robo-Coach..."
                className="flex-1 p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-gray-900 bg-gray-50 focus:bg-white transition-colors"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-emerald-200"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center"
      >
         {/* Robotic Outer Ring */}
         <div className="absolute inset-0 bg-emerald-400 rounded-full opacity-20 animate-ping group-hover:opacity-40 duration-1000"></div>
         
         {/* Main Button Body */}
         <div className="bg-gradient-to-br from-gray-800 to-black text-white p-4 rounded-full shadow-2xl border-2 border-emerald-400 hover:scale-110 transition-transform duration-300 flex items-center justify-center gap-1 z-10 overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-transparent to-white/10 pointer-events-none"></div>
             
             {isOpen ? (
                 <X size={28} />
             ) : (
                 <>
                    <Bot size={28} className="group-hover:rotate-12 transition-transform" />
                    <Dumbbell size={20} className="text-emerald-400 absolute -bottom-1 -right-1 bg-gray-900 rounded-full p-0.5 border border-emerald-500" />
                 </>
             )}
         </div>

         {/* Label Tooltip */}
         {!isOpen && (
             <span className="absolute right-full mr-3 bg-white text-gray-800 text-xs font-bold px-2 py-1 rounded shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                 AI Trainer
             </span>
         )}
      </button>
    </div>
  );
};

export default Chatbot;