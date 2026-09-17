import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 200); // Small pause at 100%
          return 100;
        }
        return p + Math.floor(Math.random() * 15) + 5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-base-dark z-[999] flex flex-col items-center justify-center text-brand-orange font-mono p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-2xl space-y-4"
      >
        <div className="flex justify-between items-end border-b-2 border-brand-green pb-2">
          <span className="text-sm tracking-widest uppercase">System Init</span>
          <span className="text-4xl font-black">{Math.min(progress, 100)}%</span>
        </div>
        
        <div className="space-y-1 text-xs opacity-60">
          <p>{'>'} LOADING QUANTUM MODULES...</p>
          <p>{'>'} MOUNTING NEURAL TOPOLOGIES...</p>
          <p>{'>'} BYPASSING LATENT SPACE...</p>
          {progress > 40 && <p>{'>'} ESTABLISHING FIRESTORE UPLINK...</p>}
          {progress > 70 && <p>{'>'} ALIGNING CHAOS PROTOCOLS...</p>}
          {progress >= 100 && <p className="text-base-light font-bold">{'>'} SYSTEM ACTIVE</p>}
        </div>

        <div className="w-full h-1 bg-brand-green mt-8">
          <motion.div 
            className="h-full bg-brand-orange"
            initial={{ width: '0%' }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>
      </motion.div>
    </div>
  );
}
