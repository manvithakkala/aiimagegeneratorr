import { useState } from "react";
import { Header } from "@/components/Header";
import { PromptInput } from "@/components/PromptInput";
import { StyleSelector } from "@/components/StyleSelector";
import { GenerateButton } from "@/components/GenerateButton";
import { SurpriseButton } from "@/components/SurpriseButton";
import { ImageGrid } from "@/components/ImageGrid";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { useImageGeneration } from "@/hooks/useImageGeneration";
import { ImageIcon } from "lucide-react";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("None");
  const { images, isLoading, regeneratingId, generateImage, regenerateImage } = useImageGeneration();

  const handleGenerate = () => {
    generateImage(prompt, style);
  };

  const handleSurprise = (surprisePrompt: string) => {
    setPrompt(surprisePrompt);
  };

  const handleRegenerate = (originalPrompt: string) => {
    regenerateImage(originalPrompt, style);
  };

  return (
    <div className="min-h-screen relative">
      <BackgroundEffects />
      
      <main className="relative z-10 container mx-auto px-4 py-12 lg:py-20">
        <Header />

        {/* Input Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="glass-card p-6 sm:p-8 space-y-6">
            <PromptInput
              value={prompt}
              onChange={setPrompt}
              disabled={isLoading}
            />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <StyleSelector
                value={style}
                onChange={setStyle}
                disabled={isLoading}
              />
              
              <SurpriseButton
                onSurprise={handleSurprise}
                disabled={isLoading}
              />
            </div>

            <div className="flex justify-center pt-2">
              <GenerateButton
                onClick={handleGenerate}
                isLoading={isLoading}
                disabled={!prompt.trim()}
              />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <section>
          {images.length > 0 ? (
            <>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                <h2 className="text-xl font-semibold text-muted-foreground">
                  Generated Images
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              </div>
              <ImageGrid
                images={images}
                onRegenerate={handleRegenerate}
                regeneratingId={regeneratingId}
              />
            </>
          ) : (
            <div className="text-center py-20 animate-fade-in">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-muted/50 mb-6">
                <ImageIcon className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg">
                Your generated images will appear here
              </p>
              <p className="text-muted-foreground/60 text-sm mt-2">
                Enter a prompt and click Generate to create your first image
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Index;
