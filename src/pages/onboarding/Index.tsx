import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, CreditCard, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-mint-600">Welcome to InvoiceFlow</h1>
          <p className="mt-2 text-lg text-muted-foreground">Let's get your account set up in just a few steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:border-mint-200 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-mint-500" />
                Business Details
              </CardTitle>
              <CardDescription>Set up your business profile</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => navigate("/onboarding/business")}
              >
                Start
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:border-mint-200 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-mint-500" />
                Team Members
              </CardTitle>
              <CardDescription>Invite your team members</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => navigate("/onboarding/team")}
              >
                Continue
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:border-mint-200 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-mint-500" />
                Payment Setup
              </CardTitle>
              <CardDescription>Configure payment methods</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => navigate("/onboarding/payment")}
              >
                Configure
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            onClick={() => navigate("/")}
          >
            Complete Setup
          </Button>
        </div>
      </div>
    </div>
  );
}