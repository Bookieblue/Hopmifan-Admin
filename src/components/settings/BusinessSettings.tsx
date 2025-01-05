import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CurrencySelect } from "@/components/invoices/payment/CurrencySelect";
import { Upload } from "lucide-react";
import { useState } from "react";
import { businessTypes, countries } from "@/lib/constants";

const formSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  businessType: z.enum(["freelancing", "local", "corporate"]),
  businessLocation: z.string().min(1, "Please select a business location"),
  operationType: z.enum(["physical", "remote"]),
  email: z.string().email("Invalid email address").optional(),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  logo: z.any().optional(),
  address: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  postalCode: z.string().optional(),
  description: z.string().min(20, "Description must be at least 20 characters"),
  defaultCurrency: z.string().optional(),
});

interface BusinessBasicInfoProps {
  form: UseFormReturn<any>;
  logoPreview: string | null;
  handleLogoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BusinessBasicInfo = ({
  form,
  logoPreview,
  handleLogoChange,
}: BusinessBasicInfoProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <Label className="text-sm text-gray-600">Business Logo</Label>
        <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary relative overflow-hidden">
          <input
            type="file"
            id="logo"
            accept="image/*"
            onChange={handleLogoChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          {logoPreview ? (
            <img
              src={logoPreview}
              alt="Logo preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="w-8 h-8 text-gray-400" />
              <span className="text-sm text-gray-500 mt-2">Upload Logo</span>
            </div>
          )}
        </div>
        <Label htmlFor="logo" className="text-sm text-gray-600">
          Click to {logoPreview ? 'change' : 'upload'} logo
        </Label>
      </div>

      <FormField
        control={form.control}
        name="businessName"
        render={({ field }) => (
          <FormItem className="col-span-full">
            <FormLabel>Business Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter your business name" {...field} className="h-14" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="businessType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-14">
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {businessTypes.filter(type => type.id !== 'other').map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="businessLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Location</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-14">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-2">
        <CurrencySelect 
          value={defaultCurrency} 
          onValueChange={setDefaultCurrency} 
        />
      </div>
    </div>
  );
};

export default function BusinessSettings() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [defaultCurrency, setDefaultCurrency] = useState("USD");

  const form = useForm<z.infer<typeof formSchema>>({
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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
          />

          <div className="flex justify-end">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
