/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CursorTrail } from './components/CursorTrail';
import { BootSequence } from './components/BootSequence';
import { TerminalMode } from './components/TerminalMode';
import { AnimatePresence } from 'motion/react';
import { audio } from './utils/audio';

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [isTerminalMode, setIsTerminalMode] = useState(false);
  const [isDayTime, setIsDayTime] = useState(false);

  useEffect(() => {
    // Lenis Smooth Scroll Setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Audio Init on first click
    const initAudio = () => {
      audio.enable();
      window.removeEventListener('click', initAudio);
    };
    window.addEventListener('click', initAudio);

    return () => {
      lenis.destroy();
      window.removeEventListener('click', initAudio);
    };
  }, []);

  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours();
      const newDayTime = hour >= 6 && hour < 18;
      setIsDayTime((prev) => {
        if (prev !== newDayTime && !isBooting) {
          audio.shiftTime();
        }
        return newDayTime;
      });
    };
    checkTime();
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, [isBooting]);

  const handleTerminalToggle = () => {
    audio.terminalToggle();
    setIsTerminalMode(true);
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-brand-orange selection:text-base-dark transition-colors duration-1000 ${isDayTime ? 'theme-day' : ''}`}>
      <CursorTrail isDayTime={isDayTime} />
      
      <AnimatePresence>
        {isBooting && (
          <BootSequence onComplete={() => setIsBooting(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isTerminalMode && (
          <TerminalMode onClose={() => setIsTerminalMode(false)} />
        )}
      </AnimatePresence>

      {!isBooting && (
        <main className={`relative transition-opacity duration-1000 ${isTerminalMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <Hero />
          <About />
          <Projects />
          <Contact />
          <Footer onTerminalToggle={handleTerminalToggle} />
        </main>
      )}
    </div>
  );
}
