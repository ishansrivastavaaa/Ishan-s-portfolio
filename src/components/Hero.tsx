import { motion } from 'motion/react';
import { Github, Instagram, Linkedin, Mail, Sparkles } from 'lucide-react';
import { MagneticWrapper } from './MagneticWrapper';
import { ScrambleText } from './ScrambleText';

export function Hero() {
  return (
    <section className="relative min-h-screen bg-brand-green overflow-hidden flex items-center justify-center pt-20 pb-10">
      {/* Floating abstract stars */}
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-10 text-brand-orange"
      >
        <Sparkles size={48} />
      </motion.div>
      <motion.div 
        animate={{ rotate: -360 }} 
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-40 right-20 text-base-light"
      >
        <Sparkles size={64} />
      </motion.div>
      
      {/* Chaotic Background Text */}
      <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none opacity-40 mix-blend-overlay">
        <h1 className="font-['Playfair_Display'] text-[15vw] leading-[0.8] text-base-light font-black -ml-20">
          <ScrambleText text="PORTFOLIO" />
        </h1>
        <h1 className="font-['Playfair_Display'] text-[15vw] leading-[0.8] text-outline-2 text-brand-orange font-black ml-40">
          <ScrambleText text="PORTFOLIO" />
        </h1>
        <h1 className="font-['Playfair_Display'] text-[15vw] leading-[0.8] text-base-light font-black -ml-10">
          <ScrambleText text="PORTFOLIO" />
        </h1>
        <h1 className="font-['Playfair_Display'] text-[15vw] leading-[0.8] text-outline-2 text-base-light font-black ml-20">
          <ScrambleText text="PORTFOLIO" />
        </h1>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Abstract Image / Box placeholder */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative w-full max-w-sm lg:max-w-md mx-auto"
        >
          <div className="w-full aspect-[4/5] bg-brand-orange mix-blend-multiply absolute -top-8 -left-8 -z-10" />
          <div className="w-full aspect-[4/5] bg-base-dark p-8 flex flex-col justify-end text-base-light">
            <p className="text-sm font-light uppercase tracking-widest mb-4 text-brand-orange"><ScrambleText text="AI/ML Engineer & Builder" /></p>
            <h2 className="font-['Playfair_Display'] text-5xl mb-4 leading-none"><ScrambleText text="Ishan" /><br/><ScrambleText text="Srivastava" /></h2>
            <p className="text-sm opacity-90 leading-relaxed font-medium">
              A meaning-seeker living inside a result-driven world. Pragmatic, results-oriented Computer Science engineer specializing in Artificial Intelligence and Machine Learning.
            </p>
          </div>
        </motion.div>

        {/* Links & Info */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col gap-12 text-base-light md:pl-12"
        >
          <div className="space-y-4 flex flex-col items-start">
             <a href="https://github.com/ishansrivastavaaa" target="_blank" rel="noopener noreferrer" className="font-mono text-lg tracking-widest text-brand-orange hover:text-base-light transition-colors cursor-none truncate block">GH: /ishansrivastavaaa</a>
             <a href="https://www.linkedin.com/in/ishansrivastavaaa/" target="_blank" rel="noopener noreferrer" className="font-mono text-lg tracking-widest text-brand-orange hover:text-base-light transition-colors cursor-none truncate block">LI: /in/ishansrivastavaaa</a>
             <a href="https://www.instagram.com/ishansrivastavaaa/" target="_blank" rel="noopener noreferrer" className="font-mono text-lg tracking-widest text-brand-orange hover:text-base-light transition-colors cursor-none truncate block">IG: /ishansrivastavaaa</a>
             <a href="mailto:ishansrivastavaaa@gmail.com" className="font-mono text-lg tracking-widest text-brand-orange hover:text-base-light transition-colors cursor-none truncate block">EM: ishansrivastavaaa@gmail.com</a>
          </div>
          
          <div className="flex gap-4 flex-wrap">
             <MagneticWrapper>
               <a href="https://github.com/ishansrivastavaaa" target="_blank" rel="noopener noreferrer" className="p-5 bg-base-dark text-brand-orange hover:bg-brand-orange hover:text-base-dark transition-colors rounded-none block cursor-none">
                 <Github size={28} />
               </a>
             </MagneticWrapper>
             <MagneticWrapper>
               <a href="https://www.linkedin.com/in/ishansrivastavaaa/" target="_blank" rel="noopener noreferrer" className="p-5 bg-base-dark text-brand-orange hover:bg-brand-orange hover:text-base-dark transition-colors rounded-none block cursor-none">
                 <Linkedin size={28} />
               </a>
             </MagneticWrapper>
             <MagneticWrapper>
               <a href="https://www.instagram.com/ishansrivastavaaa/" target="_blank" rel="noopener noreferrer" className="p-5 bg-base-dark text-brand-orange hover:bg-brand-orange hover:text-base-dark transition-colors rounded-none block cursor-none">
                 <Instagram size={28} />
               </a>
             </MagneticWrapper>
             <MagneticWrapper>
               <a href="mailto:ishansrivastavaaa@gmail.com" className="p-5 bg-base-dark text-brand-orange hover:bg-brand-orange hover:text-base-dark transition-colors rounded-none block cursor-none">
                 <Mail size={28} />
               </a>
             </MagneticWrapper>
          </div>
        </motion.div>
      </div>

      <MagneticWrapper className="absolute bottom-0 md:right-32 right-10 translate-y-1/2 z-20">
        <div
          className="w-32 h-32 bg-brand-orange rounded-full flex items-center justify-center text-base-dark font-bold tracking-widest uppercase text-sm text-center p-4 cursor-none"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Scroll<br/>down
        </div>
      </MagneticWrapper>
    </section>
  );
}
