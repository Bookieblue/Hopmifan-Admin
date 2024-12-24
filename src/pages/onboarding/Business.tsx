import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BusinessOnboarding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <Button 
            variant="ghost" 
            className="w-fit mb-4"
            onClick={() => navigate("/onboarding")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <CardTitle>Business Details</CardTitle>
          <CardDescription>Tell us about your business</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="business-name">Business Name</Label>
            <Input id="business-name" placeholder="Enter your business name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="business-email">Business Email</Label>
            <Input id="business-email" type="email" placeholder="Enter your business email" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="business-phone">Business Phone</Label>
            <Input id="business-phone" type="tel" placeholder="Enter your business phone" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="business-address">Business Address</Label>
            <Input id="business-address" placeholder="Enter your business address" />
          </div>

          <div className="pt-4">
            <Button className="w-full" onClick={() => navigate("/onboarding")}>
              Save & Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}