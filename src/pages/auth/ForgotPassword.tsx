import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { HelpCircle } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!email) {
        throw new Error("Please enter your email address");
      }

      if (!email.includes('@')) {
        throw new Error("Please enter a valid email address");
      }

      // TODO: Implement actual password reset
      toast({
        title: "Success",
        description: "Check your email for the verification code",
      });
      navigate("/auth/otp-verification");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="w-full p-6 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/99fde2de-26a2-4eeb-8e7b-5fbcf5d61301.png" 
            alt="Church Logo" 
            className="h-8 w-auto"
          />
        </Link>
        <Link 
          to="#" 
          className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          onClick={() => window.open('mailto:support@cordlo.com')}
        >
          <HelpCircle className="w-4 h-4 mr-2" />
          Support
        </Link>
      </header>

      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 h-[calc(100vh-73px)]">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Reset Password</h2>
            <p className="text-sm text-muted-foreground">
              Enter your email to receive reset instructions
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="h-10"
              />
            </div>

            <Button type="submit" className="w-full h-10" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>

            <p className="text-center text-sm">
              Remember your password?{" "}
              <Link to="/auth/signin" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}