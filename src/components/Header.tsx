import { Wand2 } from "lucide-react";

export const Header = () => {
  return (
    <header className="text-center mb-12 animate-fade-in">
      <div className="inline-flex items-center justify-center gap-3 mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full" />
          <div className="relative p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30">
            <Wand2 className="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>
      
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
        <span className="gradient-text">AI Image</span>
        <span className="text-foreground"> Generator</span>
      </h1>
      
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Transform your imagination into stunning visuals. Just describe what you envision,
        and watch AI bring it to life.
      </p>
    </header>
  );
};
