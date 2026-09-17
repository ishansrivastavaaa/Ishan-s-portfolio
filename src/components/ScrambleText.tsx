import React, { useEffect, useState } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export const ScrambleText = ({ text, className }: { text: string, className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    let iteration = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayText((prev) => {
        return text
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');
      });

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setIsScrambling(false);
      }
      iteration += 1 / 3;
    }, 30);
  };

  useEffect(() => {
    scramble();
  }, []);

  return (
    <span 
      className={className} 
      onMouseEnter={scramble}
    >
      {displayText}
    </span>
  );
};
