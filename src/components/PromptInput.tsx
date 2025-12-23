import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const PromptInput = ({ value, onChange, disabled }: PromptInputProps) => {
  return (
    <div className="relative">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Describe the image you want..."
        disabled={disabled}
        className={cn(
          "min-h-[120px] resize-none glass-input",
          "bg-muted/30 border-border/50 text-foreground placeholder:text-muted-foreground",
          "focus:border-primary/50 focus:ring-2 focus:ring-primary/20",
          "transition-all duration-300",
          "text-base leading-relaxed"
        )}
      />
      <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
        {value.length} / 1000
      </div>
    </div>
  );
};
