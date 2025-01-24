interface ViewDetailsButtonProps {
  onClick: () => void;
}

export function ViewDetailsButton({ onClick }: ViewDetailsButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="text-[#9b87f5] hover:text-[#8b75f3] text-sm font-medium"
    >
      See details
    </button>
  );
}