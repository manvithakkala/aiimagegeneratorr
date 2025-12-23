export const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Primary orb */}
      <div 
        className="floating-orb w-[500px] h-[500px] bg-primary/20"
        style={{ 
          top: '10%', 
          left: '-10%',
          animationDelay: '0s'
        }} 
      />
      
      {/* Secondary orb */}
      <div 
        className="floating-orb w-[400px] h-[400px] bg-secondary/20"
        style={{ 
          top: '50%', 
          right: '-5%',
          animationDelay: '-3s'
        }} 
      />
      
      {/* Accent orb */}
      <div 
        className="floating-orb w-[300px] h-[300px] bg-primary/15"
        style={{ 
          bottom: '10%', 
          left: '30%',
          animationDelay: '-5s'
        }} 
      />

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
    </div>
  );
};
