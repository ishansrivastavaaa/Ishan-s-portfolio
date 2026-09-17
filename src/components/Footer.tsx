import { MagneticWrapper } from './MagneticWrapper';

export function Footer({ onTerminalToggle }: { onTerminalToggle: () => void }) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 px-6 bg-base-dark text-base-light relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="font-mono text-sm tracking-widest uppercase">
          © {currentYear} Ishan Srivastava // System Active
        </p>
        <div className="flex items-center gap-8 font-mono text-sm tracking-widest uppercase text-brand-orange">
          <MagneticWrapper>
            <button onClick={onTerminalToggle} className="hover:text-base-light transition-colors cursor-none">INIT_TERM</button>
          </MagneticWrapper>
          <MagneticWrapper>
            <a href="https://github.com/ishansrivastavaaa" className="hover:text-base-light transition-colors cursor-none">GH</a>
          </MagneticWrapper>
          <MagneticWrapper>
            <a href="https://www.linkedin.com/in/ishansrivastavaaa/" className="hover:text-base-light transition-colors cursor-none">LI</a>
          </MagneticWrapper>
          <MagneticWrapper>
            <a href="https://www.instagram.com/ishansrivastavaaa/" className="hover:text-base-light transition-colors cursor-none">IG</a>
          </MagneticWrapper>
        </div>
      </div>
    </footer>
  );
}
