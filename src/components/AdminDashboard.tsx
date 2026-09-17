import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection as fCollection, query as fQuery, orderBy as fOrderBy, getDocs, limit as fLimit } from 'firebase/firestore';
import { motion } from 'motion/react';
import { ShieldAlert, Database, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: Date;
}

export function AdminDashboard() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!isAuthenticated) return;
    
    async function fetchMessages() {
      try {
        const q = fQuery(fCollection(db, 'contacts'), fOrderBy('timestamp', 'desc'), fLimit(50));
        const querySnapshot = await getDocs(q);
        const fetched: ContactMessage[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetched.push({
            id: doc.id,
            name: data.name || 'Unknown',
            email: data.email || 'No email',
            message: data.message || 'No message',
            timestamp: data.timestamp?.toDate() || new Date()
          });
        });
        setMessages(fetched);
      } catch (err: any) {
        console.error("Firebase read error:", err);
        setError(err.message || "Permission Denied. (firestore.rules only allows creating, not reading)");
      } finally {
        setLoading(false);
      }
    }
    
    fetchMessages();
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'ishan2027') {
      setIsAuthenticated(true);
    } else {
      setError("INVALID CREDENTIALS");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-base-dark text-base-light flex items-center justify-center font-mono">
        <form onSubmit={handleLogin} className="p-8 border border-brand-green bg-[#111] max-w-md w-full">
          <h2 className="text-2xl text-brand-orange mb-6 font-bold uppercase tracking-widest text-center">Admin Access</h2>
          {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
          <input 
            type="password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter Passcode..."
            className="w-full p-3 bg-transparent border-b border-brand-green text-base-light focus:outline-none focus:border-brand-orange mb-6"
          />
          <button type="submit" className="w-full py-3 bg-brand-green text-base-dark font-bold hover:bg-brand-orange transition-colors">
            AUTHENTICATE
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-dark text-base-light font-sans p-6 md:p-12 selection:bg-brand-orange selection:text-base-dark">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-end border-b-2 border-brand-green pb-6 mb-12">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-brand-green hover:text-brand-orange transition-colors mb-4 uppercase tracking-widest text-xs font-bold">
              <ChevronLeft size={16} /> Return to Grid
            </Link>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-brand-orange">System Admin</h1>
            <p className="text-xl opacity-70 mt-2 font-mono">Incoming transmissions</p>
          </div>
          <div className="hidden md:flex flex-col items-end opacity-50 font-mono text-sm">
            <span className="flex items-center gap-2"><Database size={16} /> Firestore Connected</span>
            <span>STATUS: ACTIVE</span>
          </div>
        </header>

        {loading ? (
          <div className="flex items-center gap-4 text-brand-orange font-mono animate-pulse">
            <div className="w-4 h-4 bg-brand-orange" />
            Decrypting database...
          </div>
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 border-l-4 border-red-500 bg-red-500/10 text-red-400 font-mono"
          >
            <div className="flex items-center gap-3 mb-2">
              <ShieldAlert size={24} />
              <h3 className="text-lg font-bold">ACCESS DENIED</h3>
            </div>
            <p className="opacity-80">Security Rules prohibit unauthorized reads.</p>
            <p className="text-xs mt-4 opacity-50">{error}</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {messages.length === 0 ? (
              <div className="p-12 border border-brand-green border-dashed text-center opacity-50 font-mono">
                No transmissions found in the database.
              </div>
            ) : (
              messages.map((msg, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={msg.id}
                  className="p-6 bg-[#111] border border-[#333] hover:border-brand-green transition-colors"
                >
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4 border-b border-[#222] pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-brand-orange">{msg.name}</h3>
                      <a href={`mailto:${msg.email}`} className="text-brand-green hover:underline font-mono text-sm">{msg.email}</a>
                    </div>
                    <div className="text-xs opacity-50 font-mono bg-base-dark px-3 py-1 self-start md:self-auto">
                      {msg.timestamp.toLocaleString()}
                    </div>
                  </div>
                  <p className="text-lg leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
