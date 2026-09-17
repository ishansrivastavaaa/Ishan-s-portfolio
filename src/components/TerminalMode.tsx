import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { TerminalSquare, X } from 'lucide-react';
import { audio } from '../utils/audio';

const rawData = {
  "identity": {
    "name": "Ishan Srivastava",
    "role": "AI/ML Engineer & Product-Driven Builder",
    "status": "System Active",
    "location": "Chandigarh, India",
    "contact": {
      "email": "ishansrivastavaaa@gmail.com",
      "linkedin": "/in/ishansrivastavaaa",
      "github": "/ishansrivastavaaa",
      "instagram": "/ishansrivastavaaa"
    }
  },
  "education": {
    "university": "Chandigarh University",
    "degree": "B.E. Computer Science & Engineering",
    "specialization": "AI & ML with IBM",
    "timeline": "Aug 2023 - Jun 2027"
  },
  "experience": [
    {
      "role": "Product Engineering Lead & Founder",
      "company": "Friday Labs",
      "timeline": "Aug 2023 - Present",
      "focus": [
        "Architecting AI matching workflows",
        "Engineering P2P rental architectures",
        "Designing high-performance micro-interfaces"
      ]
    },
    {
      "role": "Software Engineering Intern",
      "company": "Skill Craft Technology",
      "timeline": "Jun 2025 - Aug 2025",
      "focus": [
        "Python database manipulation scripts",
        "Structured SQL relational tables"
      ]
    }
  ],
  "projects": [
    {
      "id": "UNIstay",
      "type": "Peer-to-Peer Student Rental Architecture",
      "stack": ["Systems Design", "Relational Databases", "UI/UX"]
    },
    {
      "id": "Helpers",
      "type": "AI-Driven Automated Matching Engine",
      "stack": ["Python", "SQL", "Generative AI APIs", "Workflow Automation"]
    }
  ],
  "technical_skills": {
    "core": ["Python", "SQL", "C++", "JavaScript", "HTML5/CSS3", "System Design", "Git"],
    "ai_automation": ["Human-Centered AI Design", "Deep Learning", "Neural Networks", "NLP Pipelines", "Prompt Tuning"],
    "product_strategy": ["Rapid Prototyping", "Systems Integration", "API Workflows", "UI/UX Best Practices"]
  }
};

const fileSystem: Record<string, string> = {
  "resume.json": JSON.stringify(rawData, null, 2),
  "philosophy.txt": "A meaning-seeker living inside a result-driven world.\nBlending Krishna's action, Osho's awareness, and modern wealth creation.",
  "secret.log": "ACCESS DENIED. ENCRYPTION LEVEL OMEGA."
};

interface CommandHistory {
  cmd: string;
  output: string;
}

export function TerminalMode({ onClose }: { onClose: () => void }) {
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [input, setInput] = useState('');
  const [showMatrix, setShowMatrix] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [history]);

  useEffect(() => {
    if (!showMatrix || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'#&_(),.;:?!\\|{}<>[]^~';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) drops[x] = 1;

    const draw = () => {
      ctx.fillStyle = 'rgba(17, 17, 17, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#3a5043';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [showMatrix]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    audio.click();
    const cmd = input.trim();
    const args = cmd.split(' ');
    const base = args[0].toLowerCase();
    
    let output = '';

    switch (base) {
      case 'help':
        output = 'AVAILABLE COMMANDS:\n  help    - Show this message\n  whoami  - Current user\n  ls      - List files\n  cat     - Read file contents (e.g. cat resume.json)\n  clear   - Clear terminal\n  matrix  - Initialize digital rain\n  exit    - Close terminal';
        break;
      case 'whoami':
        output = 'guest_user_9921';
        break;
      case 'ls':
        output = Object.keys(fileSystem).join('  ');
        break;
      case 'cat':
        if (args[1] && fileSystem[args[1]]) {
          output = fileSystem[args[1]];
        } else {
          output = `cat: ${args[1] || ''}: No such file or directory`;
        }
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'sudo':
        output = 'ishan is not in the sudoers file. This incident will be reported.';
        break;
      case 'exit':
        onClose();
        return;
      case 'matrix':
        output = 'Matrix protocol initiated... (look at the background)';
        setShowMatrix(true);
        break;
      default:
        output = `bash: ${base}: command not found`;
    }

    setHistory(prev => [...prev, { cmd, output }]);
    setInput('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-base-dark z-[100] p-6 md:p-12 overflow-y-auto font-mono text-brand-orange"
      onClick={() => inputRef.current?.focus()}
    >
      {showMatrix && (
        <canvas 
          ref={canvasRef} 
          className="fixed inset-0 z-0 opacity-30 pointer-events-none"
        />
      )}
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex justify-between items-center border-b border-brand-green pb-4 mb-8 sticky top-0 bg-base-dark pt-4">
          <div className="flex items-center gap-3">
            <TerminalSquare size={24} />
            <span className="tracking-widest uppercase font-bold text-sm">Interactive Shell</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-brand-green hover:text-base-light transition-colors cursor-none"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="mb-4 opacity-70">
          Welcome to ISHAN_OS v1.0.0. Type 'help' to see available commands.
        </div>

        <div className="space-y-4">
          {history.map((item, idx) => (
            <div key={idx}>
              <div className="flex gap-2 text-base-light">
                <span className="text-brand-green">guest@ishan-sys:~$</span>
                <span>{item.cmd}</span>
              </div>
              <pre className="whitespace-pre-wrap text-sm md:text-base leading-relaxed opacity-90 mt-2">
                {item.output}
              </pre>
            </div>
          ))}
          
          <form onSubmit={handleCommand} className="flex gap-2 text-base-light">
            <span className="text-brand-green">guest@ishan-sys:~$</span>
            <input 
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={() => audio.typeKey()}
              className="flex-1 bg-transparent border-none outline-none text-brand-orange cursor-none"
              spellCheck={false}
              autoComplete="off"
            />
          </form>
          <div ref={bottomRef} />
        </div>
      </div>
    </motion.div>
  );
}
