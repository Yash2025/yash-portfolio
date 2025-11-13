import React, { useEffect, useRef } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Enhanced Particle class with more animations
    class Particle {
      x: number = 0;
      y: number = 0;
      size: number = 1;
      speedX: number = 0;
      speedY: number = 0;
      opacity: number = 0.5;
      opacityDirection: number = 0.01;
      color: string = '#06b6d4';
      pulseSpeed: number = 0.01;
      rotationSpeed: number = 0.01;
      rotation: number = 0;

      constructor() {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.opacityDirection = (Math.random() - 0.5) * 0.02;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.rotation = 0;
        
        // Random colors from the theme palette
        const colors = ['#06b6d4', '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        if (!canvas) return;
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        // Wrap around edges with smooth transition
        if (this.x > canvas.width + 10) this.x = -10;
        if (this.x < -10) this.x = canvas.width + 10;
        if (this.y > canvas.height + 10) this.y = -10;
        if (this.y < -10) this.y = canvas.height + 10;

        // Update opacity with pulsing effect
        this.opacity += this.opacityDirection;
        if (this.opacity <= 0.1 || this.opacity >= 0.8) {
          this.opacityDirection *= -1;
        }

        // Add subtle size pulsing
        this.size += Math.sin(Date.now() * this.pulseSpeed) * 0.1;
      }

      draw() {
        if (!ctx) return;
        try {
          ctx.save();
          ctx.globalAlpha = this.opacity;
          ctx.fillStyle = this.color;
          
          // Add rotation and glow effect
          ctx.translate(this.x, this.y);
          ctx.rotate(this.rotation);
          
          // Create glow effect
          ctx.shadowColor = this.color;
          ctx.shadowBlur = this.size * 2;
          
          // Draw particle as a diamond shape
          ctx.beginPath();
          ctx.moveTo(0, -this.size);
          ctx.lineTo(this.size, 0);
          ctx.lineTo(0, this.size);
          ctx.lineTo(-this.size, 0);
          ctx.closePath();
          ctx.fill();
          
          ctx.restore();
        } catch (error) {
          console.warn('Error drawing particle:', error);
        }
      }
    }

    // Create particles with dynamic count based on screen size
    const particles: Particle[] = [];
    const particleCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 15000));

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Mouse interaction
    let mouse = { x: 0, y: 0 };
    let animationId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop with enhanced effects
    const animate = () => {
      try {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw connections between nearby particles
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
              ctx.save();
              const opacity = (120 - distance) / 120 * 0.15;
              ctx.globalAlpha = opacity;
              
              // Create gradient line
              const gradient = ctx.createLinearGradient(
                particles[i].x, particles[i].y,
                particles[j].x, particles[j].y
              );
              gradient.addColorStop(0, particles[i].color);
              gradient.addColorStop(1, particles[j].color);
              
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
              ctx.restore();
            }
          }

          // Mouse interaction - attract particles to mouse
          const mouseDistance = Math.sqrt(
            Math.pow(particles[i].x - mouse.x, 2) + 
            Math.pow(particles[i].y - mouse.y, 2)
          );
          
          if (mouseDistance < 150) {
            const force = (150 - mouseDistance) / 150;
            const angle = Math.atan2(mouse.y - particles[i].y, mouse.x - particles[i].x);
            particles[i].speedX += Math.cos(angle) * force * 0.02;
            particles[i].speedY += Math.sin(angle) * force * 0.02;
            
            // Increase opacity near mouse
            particles[i].opacity = Math.min(particles[i].opacity + force * 0.1, 1);
          }
        }

        // Update and draw particles
        particles.forEach(particle => {
          particle.update();
          particle.draw();
        });

        animationId = requestAnimationFrame(animate);
      } catch (error) {
        console.warn('Error in animation loop:', error);
        animationId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default ParticleBackground;