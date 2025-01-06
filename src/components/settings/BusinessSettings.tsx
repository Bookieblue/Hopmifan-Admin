import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { BusinessBasicInfo } from "./business/BusinessBasicInfo";
import { BusinessContactInfo } from "@/components/onboarding/BusinessContactInfo";
import { BusinessLocationInfo } from "@/components/onboarding/BusinessLocationInfo";
import { formSchema, BusinessFormData } from "@/types/business";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import { countries } from "@/lib/constants";

export default function BusinessSettings() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [defaultCurrency, setDefaultCurrency] = useState("USD");
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const { toast } = useToast();

  // Mock signup date - In a real app, this would come from your auth system
  const signupDate = new Date("2024-01-01");

  const form = useForm<BusinessFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      email: "",
      phone: "",
      businessType: "freelancing",
      businessLocation: "",
      operationType: "remote",
      description: "",
      defaultCurrency: "USD",
    },
  });

  const operationType = form.watch("operationType");

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCountrySelect = (country: string) => {
    if (!selectedCountries.includes(country)) {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  const removeCountry = (country: string) => {
    setSelectedCountries(selectedCountries.filter((c) => c !== country));
  };

  const handleDeleteAccount = async () => {
    try {
      // Here you would implement the actual account deletion logic
      toast({
        title: "Account Deleted",
        description: "Your account has been successfully deleted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete account",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (values: BusinessFormData) => {
    try {
      console.log({ ...values, defaultCurrency });
      toast({
        title: "Success",
        description: "Business settings updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update business settings",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Business Information</h3>
        <p className="text-sm text-muted-foreground">
          Update your business details and information.
        </p>
      </div>

      <div className="p-4 border rounded-lg bg-muted/50">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium">Account Details</h4>
            <p className="text-sm text-muted-foreground">Member since {format(signupDate, 'MMMM d, yyyy')}</p>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <BusinessBasicInfo 
            form={form} 
            logoPreview={logoPreview} 
            handleLogoChange={handleLogoChange}
            defaultCurrency={defaultCurrency}
            setDefaultCurrency={setDefaultCurrency}
          />

          <BusinessContactInfo form={form} />

          <BusinessLocationInfo
            form={form}
            selectedCountries={selectedCountries}
            handleCountrySelect={handleCountrySelect}
            removeCountry={removeCountry}
            countries={countries}
            operationType={operationType}
          />

          <div className="flex justify-end">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Form>

      <div className="mt-8 p-6 border rounded-lg bg-red-50">
        <h4 className="text-lg font-medium text-red-700">Delete Account</h4>
        <p className="mt-2 text-sm text-red-600">
          Deleting your account will permanently remove all your data, including invoices, customers, and payment history. 
          This action cannot be undone. Please make sure to backup any important information before proceeding.
        </p>
        <div className="mt-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteAccount}>
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}