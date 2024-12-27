import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

export default function BusinessOnboarding() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [logo, setLogo] = useState<File | null>(null);
  const [businessName, setBusinessName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [targetCountry, setTargetCountry] = useState("");

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual form submission
    toast({
      title: "Business details saved",
      description: "Your business profile has been set up successfully!",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-3xl space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <img 
              src="/lovable-uploads/43d04b44-fc73-46eb-8543-89f240871e1d.png" 
              alt="Cordlo Logo" 
              className="h-12"
            />
          </div>
          <h1 className="text-3xl font-bold">Welcome to Cordlo</h1>
          <p className="text-muted-foreground">Let's set up your business profile to get started</p>
        </div>

        <Card>
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
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="logo">Business Logo</Label>
                <Input 
                  id="logo" 
                  type="file" 
                  accept="image/*"
                  onChange={handleLogoChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="business-name">Business Name</Label>
                <Input 
                  id="business-name" 
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Enter your business name" 
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select onValueChange={setCountry} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="business-email">Business Email</Label>
                <Input 
                  id="business-email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your business email" 
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="business-phone">Business Phone</Label>
                <Input 
                  id="business-phone" 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your business phone" 
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="business-type">Business Type</Label>
                <Select onValueChange={setBusinessType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="freelance">Freelance Business</SelectItem>
                    <SelectItem value="local">Local Business</SelectItem>
                    <SelectItem value="company">Company Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="work-location">Work Location</Label>
                <Select onValueChange={setWorkLocation} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your work location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="physical">Physical Address</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="target-country">Target Audience Country</Label>
                <Select onValueChange={setTargetCountry} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target audience country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="global">Global</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full">
                Complete Setup
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}