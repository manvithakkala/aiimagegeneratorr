import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface GeneratedImage {
  id: string;
  imageUrl: string;
  prompt: string;
}

export const useImageGeneration = () => {
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null);

  const generateImage = async (prompt: string, style: string) => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { prompt, style }
      });

      if (error) {
        throw error;
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to generate image');
      }

      const newImage: GeneratedImage = {
        id: crypto.randomUUID(),
        imageUrl: data.imageUrl,
        prompt: data.prompt,
      };

      setImages((prev) => [newImage, ...prev]);
      toast.success("Image generated successfully!");
    } catch (error: any) {
      console.error('Error generating image:', error);
      toast.error(error.message || "Failed to generate image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const regenerateImage = async (prompt: string, style: string = "None") => {
    const tempId = crypto.randomUUID();
    setRegeneratingId(tempId);

    try {
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { prompt, style }
      });

      if (error) {
        throw error;
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to regenerate image');
      }

      const newImage: GeneratedImage = {
        id: crypto.randomUUID(),
        imageUrl: data.imageUrl,
        prompt: data.prompt,
      };

      setImages((prev) => [newImage, ...prev]);
      toast.success("Image regenerated!");
    } catch (error: any) {
      console.error('Error regenerating image:', error);
      toast.error(error.message || "Failed to regenerate image.");
    } finally {
      setRegeneratingId(null);
    }
  };

  return {
    images,
    isLoading,
    regeneratingId,
    generateImage,
    regenerateImage,
  };
};
