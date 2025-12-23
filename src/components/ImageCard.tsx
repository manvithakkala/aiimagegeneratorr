import { Button } from "@/components/ui/button";
import { Download, RefreshCw, Maximize2 } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ImageCardProps {
  imageUrl: string;
  prompt: string;
  onRegenerate: () => void;
  isRegenerating?: boolean;
}

export const ImageCard = ({ imageUrl, prompt, onRegenerate, isRegenerating }: ImageCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleDownload = async () => {
    try {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `ai-generated-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="glass-card p-4 animate-scale-in">
      <div className="relative group overflow-hidden rounded-lg">
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="aspect-square bg-muted/50 animate-pulse rounded-lg" />
        )}
        
        {/* Image */}
        <img
          src={imageUrl}
          alt={prompt}
          className={`w-full aspect-square object-cover rounded-lg transition-all duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 rounded-lg">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="glass" size="icon" className="h-10 w-10">
                <Maximize2 className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl glass-card border-border/50 p-2">
              <img
                src={imageUrl}
                alt={prompt}
                className="w-full h-auto rounded-lg"
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Prompt preview */}
      <p className="mt-3 text-sm text-muted-foreground line-clamp-2 px-1">
        {prompt}
      </p>

      {/* Action buttons */}
      <div className="mt-4 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          className="flex-1 gap-2"
        >
          <Download className="w-4 h-4" />
          Download
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRegenerate}
          disabled={isRegenerating}
          className="gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
          Regenerate
        </Button>
      </div>
    </div>
  );
};
