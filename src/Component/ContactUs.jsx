import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Send, ChevronLeft, CheckCircle2, Feather } from 'lucide-react';

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    type: 'Request a change',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data sent:', formData);
    setSubmitted(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-[#F1EAD7] flex flex-col items-center justify-center p-4 font-sans text-[#5C544B] relative overflow-hidden">

      {/* Logo Section */} 
      <div className="flex items-center gap-2 mb-8 relative z-20">
        <BookOpen className="w-8 h-8 text-[#8D7B68]" strokeWidth={1.5} />
        <h1 className="text-3xl font-serif font-medium tracking-tight text-[#4A3F35]">Alinéa</h1>
      </div>

      <div className="bg-white/60 backdrop-blur-md p-10 rounded-[2.5rem] shadow-2xl shadow-stone-400/20 w-full max-w-lg border border-white/50 relative z-10">

        {!submitted ? (
          <>
            <div className="text-center mb-10">
              <div className="flex items-center gap-2 mb-4 text-stone-300">
                <hr className="grow border-stone-300" />
                <Feather size={16} />
                <hr className="grow border-stone-300" />
              </div>
              <h2 className="text-4xl font-serif font-semibold">Contact Us</h2>
              <p className="text-stone-500 text-sm italic mt-4">
                — A suggestion? A bug? Let us know —
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1">Email Address</label>
                <input 
                  required
                  name="email"
                  type="email" 
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3.5 rounded-2xl bg-[#FFFBF2]/80 border border-[#EFE7D6] focus:outline-none focus:ring-2 focus:ring-[#8D7B68]/20 transition-all placeholder:text-stone-300 text-sm"
                />
              </div>

              {/* Type of Request Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1">Request Type</label>
                <div className="relative">
                    <select 
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3.5 rounded-2xl bg-[#FFFBF2]/80 border border-[#EFE7D6] focus:outline-none focus:ring-2 focus:ring-[#8D7B68]/20 transition-all text-sm appearance-none cursor-pointer"
                    >
                    <option>Request a change</option>
                    <option>Report a bug</option>
                    <option>General inquiry</option>
                    </select>
                    {/* Flèche pour le select car appearance-none la cache */}
                    <ChevronLeft size={16} className="absolute right-4 top-1/2 -rotate-90 -translate-y-1/2 text-stone-400 pointer-events-none" />
                </div>
              </div>

              {/* Message Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1">Your Message</label>
                <textarea 
                  required
                  name="message"
                  rows="4"
                  placeholder="Tell us more about your ideas..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3.5 rounded-2xl bg-[#FFFBF2]/80 border border-[#EFE7D6] focus:outline-none focus:ring-2 focus:ring-[#8D7B68]/20 transition-all text-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="w-full py-4 bg-[#8D7B68] text-white rounded-3xl font-semibold hover:bg-[#7A6A59] transition-all shadow-lg shadow-[#8D7B68]/25 mt-4 flex items-center justify-center gap-2">
                <Send size={18} strokeWidth={2}/>
                Send Message
              </button>
            </form>
          </>
        ) : (
          /* Confirmation Message */
          <div className="text-center py-10 flex flex-col items-center">
            <div className="bg-green-50 p-4 rounded-full mb-6">
              <CheckCircle2 size={48} className="text-green-600" />
            </div>
            <h2 className="text-3xl font-serif font-semibold mb-4 text-[#4A3F35]">Message Received!</h2>
            <p className="text-stone-500 italic mb-10">
              "Thank you for helping us write the next chapter of Alinéa. Our team will review your message shortly."
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              className="text-[#8D7B68] font-semibold hover:underline flex items-center gap-2"
            >
              <ChevronLeft size={16} /> Send another message
            </button>
          </div>
        )}
      </div>

      <Link to="/" className="mt-8 text-sm text-stone-400 hover:text-stone-600 flex items-center gap-2 transition-colors relative z-10">
        <ChevronLeft size={16} /> Back to Home
      </Link>
    </div>
  );
};

export default ContactPage;