import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Palette } from "lucide-react";

const styles = [
  { value: "None", label: "No Style" },
  { value: "Realistic", label: "Realistic" },
  { value: "3D Render", label: "3D Render" },
  { value: "Anime", label: "Anime" },
  { value: "Digital Art", label: "Digital Art" },
  { value: "Oil Painting", label: "Oil Painting" },
  { value: "Watercolor", label: "Watercolor" },
  { value: "Cyberpunk", label: "Cyberpunk" },
  { value: "Fantasy", label: "Fantasy" },
  { value: "Minimalist", label: "Minimalist" },
  { value: "Pixel Art", label: "Pixel Art" },
];

interface StyleSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const StyleSelector = ({ value, onChange, disabled }: StyleSelectorProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Palette className="w-4 h-4" />
        <span className="text-sm font-medium">Style</span>
      </div>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className="w-[180px] glass-input bg-muted/30 border-border/50 focus:border-primary/50">
          <SelectValue placeholder="Select style" />
        </SelectTrigger>
        <SelectContent className="glass-card border-border/50">
          {styles.map((style) => (
            <SelectItem
              key={style.value}
              value={style.value}
              className="focus:bg-primary/20 focus:text-foreground cursor-pointer"
            >
              {style.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
