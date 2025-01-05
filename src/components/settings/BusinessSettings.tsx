import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { BusinessBasicInfo } from "./business/BusinessBasicInfo";
import { formSchema, BusinessFormData } from "@/types/business";
import { useToast } from "@/hooks/use-toast";

export default function BusinessSettings() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [defaultCurrency, setDefaultCurrency] = useState("USD");
  const { toast } = useToast();

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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <BusinessBasicInfo 
            form={form} 
            logoPreview={logoPreview} 
            handleLogoChange={handleLogoChange}
            defaultCurrency={defaultCurrency}
            setDefaultCurrency={setDefaultCurrency}
          />

          <div className="flex justify-end">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}