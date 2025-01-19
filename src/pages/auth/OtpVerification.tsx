import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { HelpCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import * as React from "react";

export default function OtpVerification() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!otp || otp.length !== 6) {
        throw new Error("Please enter a valid verification code");
      }

      // TODO: Implement actual OTP verification
      toast({
        title: "Success",
        description: "OTP verified successfully",
      });
      navigate("/auth/set-new-password");
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

  const handleResend = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement actual resend logic
      toast({
        title: "Success",
        description: "New verification code sent to your email",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to resend verification code",
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
          onClick={() => window.open('mailto:support@church.com')}
        >
          <HelpCircle className="w-4 h-4 mr-2" />
          Support
        </Link>
      </header>

      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 h-[calc(100vh-73px)]">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Enter OTP</h2>
            <p className="text-sm text-muted-foreground">
              Please enter the verification code sent to your email
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Verification Code</Label>
              <Input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                placeholder="Enter 6-digit code"
                className="h-10"
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full h-10" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify OTP"}
            </Button>

            <p className="text-center text-sm">
              Didn't receive the code?{" "}
              <button
                onClick={handleResend}
                className="text-primary hover:underline"
                disabled={isLoading}
              >
                Resend
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}