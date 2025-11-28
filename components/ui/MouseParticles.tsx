import React, { useEffect, useRef } from 'react';

const MouseParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Configuration
    const particleCount = 70;
    const connectionDistance = 140;
    const mouseDistance = 180;
    const particleSpeed = 0.15; // Reduced speed (was 0.4)
    
    // State
    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    const mouse = { x: -1000, y: -1000 };

    // Initialization
    const init = () => {
      canvas.width = width;
      canvas.height = height;
      particles.length = 0;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * particleSpeed,
          vy: (Math.random() - 0.5) * particleSpeed,
          size: Math.random() * 2 + 1.5,
        });
      }
    };

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      init(); // Re-distribute particles
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Determine theme color
      const isDark = document.documentElement.classList.contains('dark');
      const r = isDark ? 255 : 0;
      const g = isDark ? 255 : 0;
      const b = isDark ? 255 : 0;

      particles.forEach((p, i) => {
        // Update Position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse Interaction (Magnet/Antigravity Effect)
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseDistance) {
            // Gentle attraction to create a "swarm" feel around cursor
            const forceDirectionX = dx / dist;
            const forceDirectionY = dy / dist;
            const force = (mouseDistance - dist) / mouseDistance;
            
            // Adjust this value to switch between attraction (+) and repulsion (-)
            const strength = 0.03; 
            
            p.vx += forceDirectionX * force * strength;
            p.vy += forceDirectionY * force * strength;
        }

        // Draw Particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // Reduced opacity from 0.5 to 0.2
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.2)`; 
        ctx.fill();

        // Connect Lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist2 < connectionDistance) {
            ctx.beginPath();
            const opacity = 1 - dist2 / connectionDistance;
            // Reduced max line opacity from 0.2 to 0.1
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.1})`; 
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default MouseParticles;