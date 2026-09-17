import { motion } from 'motion/react';
import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };
    
    try {
      const newDocRef = doc(collection(db, 'contacts'));
      await setDoc(newDocRef, {
        ...data,
        createdAt: serverTimestamp()
      });
      
      setStatus('success');
      setMessage("Message received. I'll get back to you soon!");
      e.currentTarget.reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMessage("Failed to transmit. Try again.");
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-32 px-6 bg-brand-orange text-base-dark relative overflow-hidden">
      
      {/* Decorative text */}
      <h2 className="font-['Playfair_Display'] text-[15vw] font-black leading-none text-outline-2 text-base-light opacity-30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none whitespace-nowrap">
        GET IN TOUCH
      </h2>

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row gap-16 items-center">
        
        <div className="flex-1 md:pr-12">
           <h2 className="font-['Playfair_Display'] text-6xl md:text-8xl font-black leading-none mb-8 text-base-dark">
             Let's<br/>Connect.
           </h2>
           <p className="text-2xl font-medium max-w-sm">
             Let's build something meaningful together. I'm always open to discussing new ideas, architectures, or just having a good conversation.
           </p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 w-full bg-base-light p-10 md:p-14 shadow-2xl rounded-tl-[60px]"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-base-dark">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required
                maxLength={100}
                disabled={status === 'submitting'}
                className="w-full bg-transparent border-b-2 border-base-dark px-0 py-3 text-base-dark text-lg focus:outline-none focus:border-brand-orange transition-colors disabled:opacity-50 font-medium placeholder-base-dark/30 cursor-text"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-base-dark">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required
                maxLength={150}
                disabled={status === 'submitting'}
                className="w-full bg-transparent border-b-2 border-base-dark px-0 py-3 text-base-dark text-lg focus:outline-none focus:border-brand-orange transition-colors disabled:opacity-50 font-medium placeholder-base-dark/30 cursor-text"
                placeholder="john@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-base-dark">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows={4}
                required
                maxLength={2000}
                disabled={status === 'submitting'}
                className="w-full bg-transparent border-b-2 border-base-dark px-0 py-3 text-base-dark text-lg focus:outline-none focus:border-brand-orange transition-colors resize-none disabled:opacity-50 font-medium placeholder-base-dark/30 cursor-text"
                placeholder="Tell me about your project or just say hi..."
              />
            </div>

            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="w-full bg-base-dark text-base-light py-5 font-bold text-lg uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-brand-green transition-colors disabled:opacity-50 cursor-pointer"
            >
              {status === 'submitting' ? (
                <span className="w-6 h-6 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Transmit</span>
                  <Send size={20} />
                </>
              )}
            </button>

            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="flex items-center gap-2 text-brand-green font-bold text-lg"
              >
                <CheckCircle size={24} />
                <span>{message}</span>
              </motion.div>
            )}
            
            {status === 'error' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="flex items-center gap-2 text-red-600 font-bold text-lg"
              >
                <AlertCircle size={24} />
                <span>{message}</span>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
