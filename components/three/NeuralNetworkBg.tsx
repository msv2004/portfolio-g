'use client';

import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
}

interface Connection {
  a: number;
  b: number;
  opacity: number;
}

export default function NeuralNetworkBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const NODE_COUNT = 80;
    const CONNECT_DIST = 150;
    let animId: number;
    let mouseX = 0;
    let mouseY = 0;

    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
    }));

    const getConnections = (): Connection[] => {
      const conns: Connection[] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            conns.push({ a: i, b: j, opacity: 1 - dist / CONNECT_DIST });
          }
        }
      }
      return conns;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += node.pulseSpeed;

        // Mouse repulsion
        const dx = node.x - mouseX;
        const dy = node.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          node.vx += (dx / dist) * 0.3;
          node.vy += (dy / dist) * 0.3;
        }

        // Dampen velocity
        node.vx *= 0.99;
        node.vy *= 0.99;

        // Clamp velocity
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (speed > 1.5) {
          node.vx = (node.vx / speed) * 1.5;
          node.vy = (node.vy / speed) * 1.5;
        }

        if (node.x < 0) node.x = canvas.width;
        if (node.x > canvas.width) node.x = 0;
        if (node.y < 0) node.y = canvas.height;
        if (node.y > canvas.height) node.y = 0;
      });

      // Draw connections
      const connections = getConnections();
      connections.forEach(({ a, b, opacity }) => {
        const na = nodes[a];
        const nb = nodes[b];
        const gradient = ctx.createLinearGradient(na.x, na.y, nb.x, nb.y);
        gradient.addColorStop(0, `rgba(99, 102, 241, ${opacity * 0.3})`);
        gradient.addColorStop(0.5, `rgba(139, 92, 246, ${opacity * 0.4})`);
        gradient.addColorStop(1, `rgba(34, 211, 238, ${opacity * 0.3})`);
        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = opacity * 1.5;
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach((node) => {
        const pulseOpacity = node.opacity + Math.sin(node.pulse) * 0.2;
        const pulseRadius = node.radius + Math.sin(node.pulse) * 0.5;

        // Outer glow
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, pulseRadius * 6);
        glow.addColorStop(0, `rgba(99, 102, 241, ${pulseOpacity * 0.3})`);
        glow.addColorStop(1, 'rgba(99, 102, 241, 0)');
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseRadius * 6, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core node
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${pulseOpacity})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}
