import { useEffect, useRef } from 'react';

export function CursorTrail({ isDayTime }: { isDayTime: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number, y: number, vx: number, vy: number, life: number, size: number }[] = [];
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Add multiple particles for a denser quantum effect
      for (let i = 0; i < 3; i++) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 3, // Chaotic velocity X
          vy: (Math.random() - 0.5) * 3, // Chaotic velocity Y
          life: 1, // Starts at full opacity
          size: Math.random() * 2 + 1 // Variable size
        });
      }
    };
    window.addEventListener('mousemove', onMouseMove);

    let animationFrame: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Render particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        // Quantum chaotic movement
        p.vx += (Math.random() - 0.5) * 0.5;
        p.vy += (Math.random() - 0.5) * 0.5;
        
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.015; // Fade out speed
        
        if (p.life <= 0) {
          particles.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          const rgbOrange = isDayTime ? '199, 91, 18' : '235, 140, 52';
          ctx.fillStyle = `rgba(${rgbOrange}, ${p.life})`;
          ctx.fill();
        }
      }

      // Render Crosshair cursor
      ctx.beginPath();
      ctx.strokeStyle = isDayTime ? '#111111' : '#f4ebd9'; // adaptive crosshair
      ctx.lineWidth = 1.5;
      
      // horizontal line
      ctx.moveTo(mouseX - 8, mouseY);
      ctx.lineTo(mouseX + 8, mouseY);
      
      // vertical line
      ctx.moveTo(mouseX, mouseY - 8);
      ctx.lineTo(mouseX, mouseY + 8);
      
      ctx.stroke();
      
      animationFrame = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, [isDayTime]);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
}
