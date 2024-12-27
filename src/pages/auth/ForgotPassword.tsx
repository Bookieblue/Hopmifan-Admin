import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual password reset
    toast({
      title: "Reset link sent",
      description: "Check your email for password reset instructions",
    });
    navigate("/auth/signin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center space-y-4">
          <img 
            src="/lovable-uploads/43d04b44-fc73-46eb-8543-89f240871e1d.png" 
            alt="Cordlo Logo" 
            className="mx-auto h-12 w-auto"
          />
          <h2 className="text-3xl font-bold tracking-tight">Reset Password</h2>
          <p className="text-muted-foreground">
            Enter your email to receive reset instructions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Send Reset Link
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
  );
}