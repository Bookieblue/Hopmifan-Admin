import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
}

export const ActionButton = ({
  variant = "default",
  size = "default",
  className,
  children,
  ...props
}: ActionButtonProps) => {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn("bg-[#0F2937] hover:bg-[#1a3c4e] text-white", className)}
      {...props}
    >
      {children}
    </Button>
  );
};