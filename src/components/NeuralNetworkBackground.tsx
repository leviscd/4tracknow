import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
}

interface Connection {
  from: number;
  to: number;
  opacity: number;
  dataPacket: number;
  speed: number;
}

const NeuralNetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeNodes();
    };

    const initializeNodes = () => {
      const nodeCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 20000));
      nodesRef.current = [];
      connectionsRef.current = [];

      for (let i = 0; i < nodeCount; i++) {
        nodesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 2 + 1,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }

      // Create connections
      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const dx = nodesRef.current[i].x - nodesRef.current[j].x;
          const dy = nodesRef.current[i].y - nodesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200 && Math.random() > 0.7) {
            connectionsRef.current.push({
              from: i,
              to: j,
              opacity: 0.3,
              dataPacket: Math.random(),
              speed: 0.002 + Math.random() * 0.003,
            });
          }
        }
      }
    };

    const animate = (time: number) => {
      ctx.fillStyle = 'rgba(10, 8, 15, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw connections
      connectionsRef.current.forEach((conn) => {
        const fromNode = nodesRef.current[conn.from];
        const toNode = nodesRef.current[conn.to];
        
        const dx = toNode.x - fromNode.x;
        const dy = toNode.y - fromNode.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 250) {
          conn.opacity = Math.max(0.1, 0.4 - distance / 600);
          
          // Draw connection line
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          ctx.strokeStyle = `rgba(167, 139, 250, ${conn.opacity * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();

          // Animate data packet
          conn.dataPacket += conn.speed;
          if (conn.dataPacket > 1) conn.dataPacket = 0;

          const packetX = fromNode.x + dx * conn.dataPacket;
          const packetY = fromNode.y + dy * conn.dataPacket;

          // Draw data packet
          const gradient = ctx.createRadialGradient(packetX, packetY, 0, packetX, packetY, 4);
          gradient.addColorStop(0, `rgba(167, 139, 250, ${conn.opacity})`);
          gradient.addColorStop(1, 'rgba(167, 139, 250, 0)');
          
          ctx.beginPath();
          ctx.arc(packetX, packetY, 4, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      // Update and draw nodes
      nodesRef.current.forEach((node, i) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Keep in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));

        // Pulse effect
        node.pulsePhase += 0.02;
        const pulse = Math.sin(node.pulsePhase) * 0.3 + 0.7;

        // Draw node glow
        const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 8);
        glowGradient.addColorStop(0, `rgba(167, 139, 250, ${0.3 * pulse})`);
        glowGradient.addColorStop(0.5, `rgba(139, 92, 246, ${0.1 * pulse})`);
        glowGradient.addColorStop(1, 'rgba(139, 92, 246, 0)');

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 8, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Draw node core
        const coreGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius);
        coreGradient.addColorStop(0, `rgba(255, 255, 255, ${0.9 * pulse})`);
        coreGradient.addColorStop(0.5, `rgba(167, 139, 250, ${0.8 * pulse})`);
        coreGradient.addColorStop(1, `rgba(139, 92, 246, ${0.5 * pulse})`);

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = coreGradient;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default NeuralNetworkBackground;
