import { ImageCard } from "./ImageCard";

interface GeneratedImage {
  id: string;
  imageUrl: string;
  prompt: string;
}

interface ImageGridProps {
  images: GeneratedImage[];
  onRegenerate: (prompt: string) => void;
  regeneratingId?: string | null;
}

export const ImageGrid = ({ images, onRegenerate, regeneratingId }: ImageGridProps) => {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image, index) => (
        <div
          key={image.id}
          style={{ animationDelay: `${index * 100}ms` }}
          className="animate-slide-up"
        >
          <ImageCard
            imageUrl={image.imageUrl}
            prompt={image.prompt}
            onRegenerate={() => onRegenerate(image.prompt)}
            isRegenerating={regeneratingId === image.id}
          />
        </div>
      ))}
    </div>
  );
};
