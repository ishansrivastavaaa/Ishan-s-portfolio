import { motion } from 'motion/react';
import { Sparkles, Briefcase, GraduationCap } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-32 px-6 bg-base-light text-base-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
        
        {/* Left Column */}
        <div className="md:col-span-5 space-y-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-['Playfair_Display'] text-7xl md:text-8xl font-black leading-none mb-8 text-base-dark">
              Hello,<br/>I'm Ishan!
            </h2>
            <p className="text-xl leading-relaxed font-medium">
              I am a Machine Learning Engineer based in India, currently in my seventh semester of Computer Science at Chandigarh University. Highly proficient at translating complex, theoretical machine learning structures into efficient, revenue-focused automated platforms and marketplace applications.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-brand-orange p-10 rounded-tr-[50px] rounded-bl-[50px] text-base-dark"
          >
            <h3 className="font-['Playfair_Display'] text-4xl font-black mb-8">Experience</h3>
            <ul className="space-y-8">
              <li className="flex gap-4 items-start">
                <Briefcase className="shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-bold text-xl mb-1">Product Eng Lead & Founder</h4>
                  <p className="text-sm font-bold uppercase tracking-widest text-base-dark/70 mb-2">Friday Labs • Aug '23 - Present</p>
                  <p className="text-base-dark/80 font-medium">Architecting AI matching workflows and engineering peer-to-peer rental architectures. Designing high-performance micro-interfaces optimizing user churn.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <Briefcase className="shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-bold text-xl mb-1">Software Eng Intern</h4>
                  <p className="text-sm font-bold uppercase tracking-widest text-base-dark/70 mb-2">Skill Craft Tech • Jun '25 - Aug '25</p>
                  <p className="text-base-dark/80 font-medium">Deployed Python database manipulation scripts, accelerating filtering by 20%. Structured SQL relational tables to significantly reduce search times.</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-7 flex flex-col justify-between pt-10">
          <div className="relative">
            {/* Chaotic abstract shape */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-green rounded-full mix-blend-multiply opacity-20 blur-3xl pointer-events-none" />
            
            <div className="bg-base-dark p-12 text-base-light relative z-10 rounded-tl-[80px] rounded-br-[80px]">
              <h3 className="font-['Playfair_Display'] text-5xl mb-8">Contact</h3>
              <ul className="space-y-4 font-mono text-base tracking-widest break-all">
                <li>📍 Chandigarh, India</li>
                <li>✉️ <a href="mailto:ishansrivastavaaa@gmail.com" className="hover:text-brand-orange transition-colors cursor-none block md:inline">ishansrivastavaaa@gmail.com</a></li>
                <li>🔗 <a href="https://www.linkedin.com/in/ishansrivastavaaa/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors cursor-none block md:inline">linkedin.com/in/ishansrivastavaaa</a></li>
                <li>📷 <a href="https://www.instagram.com/ishansrivastavaaa/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors cursor-none block md:inline">instagram.com/ishansrivastavaaa</a></li>
              </ul>
            </div>
            
            <div className="mt-16 relative h-48 overflow-hidden pointer-events-none select-none">
               <h2 className="font-['Playfair_Display'] text-[8rem] text-outline text-brand-green font-black absolute top-0 left-0 leading-none opacity-40">
                 MINDSET
               </h2>
               <h2 className="font-['Playfair_Display'] text-[8rem] text-brand-orange font-black absolute top-10 left-10 leading-none mix-blend-multiply">
                 MINDSET
               </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 md:pl-8">
            <div className="w-full">
              <h4 className="font-['Playfair_Display'] text-3xl font-black mb-6 text-brand-green">Core Matrix</h4>
              <div className="flex flex-col gap-4">
                {[
                  { name: 'Python', val: 95 },
                  { name: 'SQL', val: 85 },
                  { name: 'C++', val: 80 },
                  { name: 'System Design', val: 88 },
                  { name: 'JavaScript', val: 75 }
                ].map((skill, i) => (
                  <div key={skill.name} className="flex flex-col gap-1">
                    <div className="flex justify-between font-mono text-xs font-bold tracking-widest uppercase">
                      <span>{skill.name}</span>
                      <span>{skill.val}%</span>
                    </div>
                    <div className="w-full h-4 border border-brand-green p-[2px]">
                       <motion.div 
                         initial={{ width: 0 }}
                         whileInView={{ width: `${skill.val}%` }}
                         viewport={{ once: true }}
                         transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                         className="h-full bg-brand-orange"
                       />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
               <h4 className="font-['Playfair_Display'] text-3xl font-black mb-6 text-brand-green">Product Strategy</h4>
               <ul className="space-y-4 text-base font-bold text-base-dark/80 font-mono uppercase tracking-wider">
                 <li className="flex items-center gap-4">
                   <div className="w-10 h-[2px] bg-brand-orange" /> Rapid Prototyping
                 </li>
                 <li className="flex items-center gap-4">
                   <div className="w-16 h-[2px] bg-brand-orange" /> API Workflows
                 </li>
                 <li className="flex items-center gap-4">
                   <div className="w-12 h-[2px] bg-brand-orange" /> Deep Learning & NLP
                 </li>
                 <li className="flex items-center gap-4">
                   <div className="w-8 h-[2px] bg-brand-orange" /> Prompt Tuning
                 </li>
               </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
