import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { HelpCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export default function OtpVerification() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement actual OTP verification
      toast({
        title: "OTP verified successfully",
        description: "Please set your new password",
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
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Enter OTP</h2>
            <p className="text-muted-foreground">
              Please enter the verification code sent to your email
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="otp">Verification Code</Label>
                <InputOTP
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  maxLength={6}
                  render={({ slots }) => (
                    <InputOTPGroup className="gap-2">
                      {slots.map((slot, index) => (
                        <InputOTPSlot key={index} {...slot} />
                      ))}
                    </InputOTPGroup>
                  )}
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-14" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify OTP"}
            </Button>

            <p className="text-center text-sm">
              Didn't receive the code?{" "}
              <Link to="/auth/forgot-password" className="text-primary hover:underline">
                Resend
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}