import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface ViewDetailsButtonProps {
  onClick: () => void;
}

export function ViewDetailsButton({ onClick }: ViewDetailsButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="ml-2"
    >
      <Eye className="h-4 w-4" />
    </Button>
  );
}