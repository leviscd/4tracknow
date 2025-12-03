import { useEffect, useRef } from 'react';

const TrackingAnimation = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = svg.querySelectorAll('.data-path');
    const dots = svg.querySelectorAll('.tracking-dot');

    paths.forEach((path, i) => {
      const pathLength = (path as SVGPathElement).getTotalLength();
      (path as SVGPathElement).style.strokeDasharray = `${pathLength}`;
      (path as SVGPathElement).style.strokeDashoffset = `${pathLength}`;
      (path as SVGPathElement).style.animation = `drawPath 3s ease-in-out ${i * 0.5}s infinite`;
    });

    dots.forEach((dot, i) => {
      (dot as SVGCircleElement).style.animation = `pulseDot 2s ease-in-out ${i * 0.3}s infinite`;
    });
  }, []);

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4">
            Tecnologia de <span className="text-primary text-glow">Rastreamento</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Conectar, rastrear, cruzar e entregar informação.
          </p>
        </div>

        <div className="relative w-full aspect-[2/1] max-w-4xl mx-auto">
          <svg
            ref={svgRef}
            viewBox="0 0 800 400"
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.3))' }}
          >
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(139, 92, 246, 0.1)" />
                <stop offset="50%" stopColor="rgba(167, 139, 250, 0.8)" />
                <stop offset="100%" stopColor="rgba(139, 92, 246, 0.1)" />
              </linearGradient>
              <filter id="glowFilter">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Connection paths */}
            <path
              className="data-path"
              d="M 100 200 Q 250 100 400 200 Q 550 300 700 200"
              fill="none"
              stroke="url(#pathGradient)"
              strokeWidth="2"
              filter="url(#glowFilter)"
            />
            <path
              className="data-path"
              d="M 150 100 Q 300 200 400 150 Q 500 100 650 150"
              fill="none"
              stroke="url(#pathGradient)"
              strokeWidth="1.5"
              filter="url(#glowFilter)"
            />
            <path
              className="data-path"
              d="M 150 300 Q 300 250 400 280 Q 500 310 650 280"
              fill="none"
              stroke="url(#pathGradient)"
              strokeWidth="1.5"
              filter="url(#glowFilter)"
            />
            <path
              className="data-path"
              d="M 200 180 L 400 200 L 600 180"
              fill="none"
              stroke="url(#pathGradient)"
              strokeWidth="1"
              filter="url(#glowFilter)"
            />

            {/* Node points */}
            {[
              { cx: 100, cy: 200 },
              { cx: 150, cy: 100 },
              { cx: 150, cy: 300 },
              { cx: 400, cy: 200 },
              { cx: 400, cy: 150 },
              { cx: 400, cy: 280 },
              { cx: 650, cy: 150 },
              { cx: 650, cy: 280 },
              { cx: 700, cy: 200 },
            ].map((point, i) => (
              <g key={i}>
                <circle
                  cx={point.cx}
                  cy={point.cy}
                  r="15"
                  fill="rgba(139, 92, 246, 0.1)"
                  className="tracking-dot"
                />
                <circle
                  cx={point.cx}
                  cy={point.cy}
                  r="6"
                  fill="rgba(167, 139, 250, 0.8)"
                  filter="url(#glowFilter)"
                />
                <circle
                  cx={point.cx}
                  cy={point.cy}
                  r="3"
                  fill="white"
                />
              </g>
            ))}

            {/* Center 4Track text */}
            <text
              x="400"
              y="200"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-orbitron"
              fill="rgba(167, 139, 250, 0.3)"
              fontSize="60"
              fontWeight="bold"
            >
              4TRACK
            </text>
          </svg>
        </div>

        <style>{`
          @keyframes drawPath {
            0%, 100% {
              stroke-dashoffset: 1000;
              opacity: 0.3;
            }
            50% {
              stroke-dashoffset: 0;
              opacity: 1;
            }
          }
          @keyframes pulseDot {
            0%, 100% {
              r: 15;
              opacity: 0.2;
            }
            50% {
              r: 25;
              opacity: 0.5;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default TrackingAnimation;
