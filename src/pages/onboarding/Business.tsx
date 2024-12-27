import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { BusinessBasicInfo } from "@/components/onboarding/BusinessBasicInfo";
import { BusinessContactInfo } from "@/components/onboarding/BusinessContactInfo";
import { BusinessLocationInfo } from "@/components/onboarding/BusinessLocationInfo";
import { businessTypes, countries } from "@/lib/constants";

const formSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  businessType: z.enum(["freelancing", "local", "corporate", "other"]),
  operationType: z.enum(["physical", "remote"]),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  logo: z.any().optional(),
  address: z.string().optional(),
  description: z.string().min(20, "Description must be at least 20 characters"),
});

const BusinessOnboarding = () => {
  const navigate = useNavigate();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      email: "",
      phone: "",
      businessType: "freelancing",
      operationType: "remote",
      description: "",
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // TODO: Implement actual API call
      console.log({ ...values, targetCountries: selectedCountries });
      toast({
        title: "Success",
        description: "Business information saved successfully",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save business information",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Business Information
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Let's get your business set up
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <BusinessBasicInfo
              form={form}
              logoPreview={logoPreview}
              handleLogoChange={handleLogoChange}
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
              <Button type="submit">Save and Continue</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BusinessOnboarding;