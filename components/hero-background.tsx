"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  hue: number;
}

interface Orb {
  x: number;
  y: number;
  radius: number;
  hue: number;
  speed: number;
  angle: number;
  orbitRadius: number;
}

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Particles
    const particleCount = 60;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        hue: Math.random() * 60 + 250,
      });
    }

    // Glowing orbs
    const orbs: Orb[] = [
      { x: width * 0.3, y: height * 0.4, radius: 300, hue: 270, speed: 0.003, angle: 0, orbitRadius: 150 },
      { x: width * 0.7, y: height * 0.3, radius: 250, hue: 290, speed: 0.002, angle: Math.PI, orbitRadius: 120 },
      { x: width * 0.5, y: height * 0.6, radius: 200, hue: 260, speed: 0.004, angle: Math.PI / 2, orbitRadius: 100 },
      { x: width * 0.2, y: height * 0.7, radius: 180, hue: 220, speed: 0.0025, angle: Math.PI * 1.5, orbitRadius: 80 },
    ];

    // Aurora wave points
    const drawAurora = (time: number) => {
      const layers = [
        { y: height * 0.15, amplitude: 80, frequency: 0.002, speed: 0.0005, opacity: 0.06, hue: 270 },
        { y: height * 0.25, amplitude: 60, frequency: 0.003, speed: 0.0008, opacity: 0.04, hue: 290 },
        { y: height * 0.35, amplitude: 50, frequency: 0.0025, speed: 0.0006, opacity: 0.03, hue: 250 },
      ];

      for (const layer of layers) {
        ctx.beginPath();
        ctx.moveTo(0, layer.y);

        for (let x = 0; x <= width; x += 4) {
          const y =
            layer.y +
            Math.sin(x * layer.frequency + time * layer.speed) * layer.amplitude +
            Math.sin(x * layer.frequency * 2 + time * layer.speed * 1.5) * (layer.amplitude * 0.5);
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, layer.y - layer.amplitude, 0, layer.y + layer.amplitude * 2);
        gradient.addColorStop(0, `hsla(${layer.hue}, 80%, 60%, 0)`);
        gradient.addColorStop(0.3, `hsla(${layer.hue}, 80%, 60%, ${layer.opacity})`);
        gradient.addColorStop(0.7, `hsla(${layer.hue + 20}, 70%, 50%, ${layer.opacity * 0.5})`);
        gradient.addColorStop(1, `hsla(${layer.hue}, 80%, 60%, 0)`);

        ctx.fillStyle = gradient;
        ctx.fill();
      }
    };

    const drawGrid = (time: number) => {
      const gridSize = 60;
      const lineOpacity = 0.04;

      ctx.strokeStyle = `rgba(139, 92, 246, ${lineOpacity})`;
      ctx.lineWidth = 0.5;

      // Vertical lines
      for (let x = 0; x < width; x += gridSize) {
        const offset = Math.sin(time * 0.001 + x * 0.01) * 2;
        ctx.beginPath();
        ctx.moveTo(x + offset, 0);
        ctx.lineTo(x - offset, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < height; y += gridSize) {
        const offset = Math.cos(time * 0.001 + y * 0.01) * 2;
        ctx.beginPath();
        ctx.moveTo(0, y + offset);
        ctx.lineTo(width, y - offset);
        ctx.stroke();
      }
    };

    const drawOrbs = () => {
      for (const orb of orbs) {
        orb.angle += orb.speed;
        const ox = orb.x + Math.cos(orb.angle) * orb.orbitRadius;
        const oy = orb.y + Math.sin(orb.angle * 0.7) * (orb.orbitRadius * 0.6);

        const gradient = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.radius);
        gradient.addColorStop(0, `hsla(${orb.hue}, 80%, 60%, 0.15)`);
        gradient.addColorStop(0.5, `hsla(${orb.hue}, 70%, 50%, 0.06)`);
        gradient.addColorStop(1, `hsla(${orb.hue}, 60%, 40%, 0)`);

        ctx.beginPath();
        ctx.arc(ox, oy, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    };

    const drawParticles = (time: number) => {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const pulse = Math.sin(time * 0.002 + p.x * 0.01) * 0.5 + 0.5;
        const currentOpacity = p.opacity * (0.5 + pulse * 0.5);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${currentOpacity})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${currentOpacity * 0.1})`;
        ctx.fill();
      }
    };

    const drawConnections = () => {
      const maxDist = 150;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.08;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Base dark gradient
      const bg = ctx.createRadialGradient(width / 2, height * 0.3, 0, width / 2, height / 2, height);
      bg.addColorStop(0, "rgba(15, 10, 30, 1)");
      bg.addColorStop(0.5, "rgba(9, 9, 11, 1)");
      bg.addColorStop(1, "rgba(9, 9, 11, 1)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      drawGrid(time);
      drawAurora(time);
      drawOrbs();
      drawConnections();
      drawParticles(time);

      // Top fade for navbar
      const topFade = ctx.createLinearGradient(0, 0, 0, 80);
      topFade.addColorStop(0, "rgba(9, 9, 11, 0.8)");
      topFade.addColorStop(1, "rgba(9, 9, 11, 0)");
      ctx.fillStyle = topFade;
      ctx.fillRect(0, 0, width, 80);

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
