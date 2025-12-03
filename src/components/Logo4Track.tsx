const Logo4Track = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative flex items-center gap-3 ${className}`}>
      <span className="font-orbitron text-2xl font-bold tracking-wider text-foreground">
        <span className="text-primary text-glow">4</span>Track
      </span>
    </div>
  );
};

export default Logo4Track;
