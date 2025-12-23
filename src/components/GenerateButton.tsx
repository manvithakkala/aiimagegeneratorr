import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";

interface GenerateButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export const GenerateButton = ({ onClick, isLoading, disabled }: GenerateButtonProps) => {
  return (
    <Button
      variant="glow"
      size="xl"
      onClick={onClick}
      disabled={disabled || isLoading}
      className="w-full sm:w-auto min-w-[200px]"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Generating...</span>
        </>
      ) : (
        <>
          <Sparkles className="w-5 h-5" />
          <span>Generate Image</span>
        </>
      )}
    </Button>
  );
};
