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
        "bg-[#695CAE] hover:bg-[#695CAE]/90",
        variant === "outline" && "bg-transparent border-[#695CAE] text-[#695CAE] hover:bg-[#695CAE]/10 hover:text-[#695CAE]",
        variant === "ghost" && "bg-transparent hover:bg-[#695CAE]/10 hover:text-[#695CAE]",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};