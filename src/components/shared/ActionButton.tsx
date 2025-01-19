import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
}

export const ActionButton = ({ 
  children, 
  className,
  variant = "default",
  ...props 
}: ActionButtonProps) => {
  return (
    <Button
      variant={variant}
      className={cn(
        "bg-purple-600 hover:bg-purple-700",
        variant === "outline" && "bg-transparent hover:bg-transparent",
        variant === "ghost" && "bg-transparent hover:bg-transparent",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};