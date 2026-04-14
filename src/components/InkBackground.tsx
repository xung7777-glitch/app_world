import React, { useEffect, useRef } from 'react';

export const InkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let leaves: any[] = [];
    let kois: any[] = [];

    const drawKoi = (x: number, y: number, angle: number, size: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.globalAlpha = opacity;

      // Body
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.ellipse(0, 0, size, size * 0.4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Tail
      ctx.beginPath();
      ctx.moveTo(-size * 0.8, 0);
      ctx.lineTo(-size * 1.8, -size * 0.3);
      ctx.lineTo(-size * 1.5, 0);
      ctx.lineTo(-size * 1.8, size * 0.3);
      ctx.closePath();
      ctx.fill();

      // Fins
      ctx.beginPath();
      ctx.moveTo(-size * 0.2, -size * 0.3);
      ctx.lineTo(-size * 0.6, -size * 0.5);
      ctx.lineTo(-size * 0.5, -size * 0.2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.moveTo(-size * 0.2, size * 0.3);
      ctx.lineTo(-size * 0.6, size * 0.5);
      ctx.lineTo(-size * 0.5, size * 0.2);
      ctx.fill();

      // Head detail
      ctx.fillStyle = 'rgba(153, 27, 27, 0.5)';
      ctx.beginPath();
      ctx.arc(size * 0.6, 0, size * 0.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawLotusLeaf = (x: number, y: number, size: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = opacity;
      
      ctx.fillStyle = '#2d3a2d';
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 1.8);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fill();
      
      ctx.restore();
    };

    const drawFrog = (x: number, y: number, jumpPhase: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y - Math.abs(Math.sin(jumpPhase)) * 20);
      ctx.globalAlpha = opacity;
      
      ctx.fillStyle = '#1a2a1a';
      ctx.beginPath();
      ctx.ellipse(0, 0, 8, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(6, -2, 4, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    const drawLotus = (x: number, y: number, size: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = opacity;
      
      // Petals - soft pink ink style
      const petalCount = 8;
      ctx.fillStyle = 'rgba(219, 39, 119, 0.4)'; // Soft pink
      for (let i = 0; i < petalCount; i++) {
        ctx.save();
        ctx.rotate((i / petalCount) * Math.PI * 2);
        ctx.beginPath();
        ctx.ellipse(size * 0.5, 0, size * 0.6, size * 0.25, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      
      // Center - golden ink
      ctx.fillStyle = 'rgba(234, 179, 8, 0.6)';
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    const generateLeaves = (count: number, width: number, height: number) => {
      const newLeaves: any[] = [];
      let attempts = 0;
      const maxAttempts = 100;

      while (newLeaves.length < count && attempts < maxAttempts) {
        attempts++;
        const y = height * (0.1 + Math.random() * 0.5);
        const x = width * (0.1 + Math.random() * 0.8);
        const size = 30 + Math.random() * 30;

        const isOverlapping = newLeaves.some(leaf => {
          const dx = leaf.x - x;
          const dy = leaf.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          return distance < (leaf.size + size + 10);
        });

        if (!isOverlapping) {
          newLeaves.push({
            x,
            y,
            size,
            opacity: 0.1 + Math.random() * 0.1,
            hasFrog: Math.random() > 0.7,
            hasLotus: Math.random() > 0.6, // 40% chance to have a lotus
            frogOffset: Math.random() * Math.PI * 2
          });
        }
      }
      return newLeaves;
    };

    const generateKois = (count: number, width: number, height: number) => {
      const newKois = [];
      for (let i = 0; i < count; i++) {
        const centerY = height * (0.15 + Math.random() * 0.45);
        const centerX = width * (0.1 + Math.random() * 0.8);
        newKois.push({
          centerX,
          centerY,
          speed: 0.006 + Math.random() * 0.006,
          size: 15 + Math.random() * 10,
          offset: Math.random() * Math.PI * 2,
          radius: 40 + Math.random() * 60
        });
      }
      return newKois;
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      
      const width = rect.width;
      const height = rect.height;
      leaves = generateLeaves(8, width, height);
      kois = generateKois(6, width, height);
    };

    window.addEventListener('resize', resize);
    resize();

    const render = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);
      
      ctx.fillStyle = '#f5f5f0';
      ctx.fillRect(0, 0, width, height);

      time += 0.6;

      leaves.forEach(leaf => {
        drawLotusLeaf(leaf.x, leaf.y, leaf.size, leaf.opacity);
        if (leaf.hasLotus) {
          drawLotus(leaf.x + 5, leaf.y - 5, leaf.size * 0.6, 0.4);
        }
        if (leaf.hasFrog) {
          const frogX = leaf.hasLotus ? leaf.x - 10 : leaf.x;
          drawFrog(frogX, leaf.y, time * 0.03 + leaf.frogOffset, 0.35);
        }
      });

      kois.forEach((koi) => {
        const x = koi.centerX + Math.cos(time * koi.speed + koi.offset) * koi.radius;
        const y = koi.centerY + Math.sin(time * koi.speed + koi.offset) * koi.radius;
        const angle = time * koi.speed + koi.offset + Math.PI / 2;

        drawKoi(x, y, angle, koi.size, 0.2);
        
        if (time % 180 < 40) {
          ctx.beginPath();
          ctx.arc(x, y, koi.size * 1.2 + (time % 40) * 0.6, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 0, 0, ${0.02 * (1 - (time % 40) / 40)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ filter: 'contrast(1.1) brightness(1.05)' }}
    />
  );
};
