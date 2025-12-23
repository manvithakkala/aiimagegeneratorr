import { Button } from "@/components/ui/button";
import { Dice5 } from "lucide-react";

const surprisePrompts = [
  "A majestic phoenix rising from cosmic flames, surrounded by nebulas and distant galaxies",
  "An ancient tree with glowing crystalline leaves in an enchanted forest at twilight",
  "A futuristic cyberpunk city with flying vehicles and neon holographic advertisements",
  "A serene Japanese garden with cherry blossoms falling over a koi pond at sunset",
  "A mystical underwater kingdom with bioluminescent coral and merfolk architecture",
  "A steampunk airship sailing through clouds above Victorian rooftops",
  "A cozy witch's cottage with magical plants and potions glowing in the windows",
  "A massive dragon sleeping on a hoard of treasure in a crystal cavern",
  "An astronaut floating in space with Earth reflecting in the helmet visor",
  "A magical library with floating books and staircases that shift and move",
  "A wolf howling at an aurora borealis under a starlit Arctic sky",
  "A grand castle on floating islands connected by rainbow bridges",
];

interface SurpriseButtonProps {
  onSurprise: (prompt: string) => void;
  disabled?: boolean;
}

export const SurpriseButton = ({ onSurprise, disabled }: SurpriseButtonProps) => {
  const handleClick = () => {
    const randomPrompt = surprisePrompts[Math.floor(Math.random() * surprisePrompts.length)];
    onSurprise(randomPrompt);
  };

  return (
    <Button
      variant="glass"
      size="lg"
      onClick={handleClick}
      disabled={disabled}
      className="gap-2"
    >
      <Dice5 className="w-5 h-5" />
      <span>Surprise Me</span>
    </Button>
  );
};
