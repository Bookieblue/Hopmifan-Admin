import { ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ViewDetailsButtonProps {
  onClick: () => void;
}

export function ViewDetailsButton({ onClick }: ViewDetailsButtonProps) {
  const isMobile = useIsMobile();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`${isMobile ? 'p-1' : 'text-[#9b87f5] hover:text-[#8b75f3] text-sm font-medium'}`}
    >
      {isMobile ? (
        <ChevronRight className="h-5 w-5 text-gray-400" />
      ) : (
        'See details'
      )}
    </button>
  );
}