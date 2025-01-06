import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CurrencySelect } from "@/components/invoices/payment/CurrencySelect";
import { businessTypes, countries } from "@/lib/constants";
import { BusinessFormData } from "@/types/business";
import { useEffect } from "react";

interface BusinessBasicInfoProps {
  form: UseFormReturn<BusinessFormData>;
  logoPreview: string | null;
  handleLogoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultCurrency: string;
  setDefaultCurrency: (value: string) => void;
}

export const BusinessBasicInfo = ({
  form,
  logoPreview,
  handleLogoChange,
  defaultCurrency,
  setDefaultCurrency,
}: BusinessBasicInfoProps) => {
  // Watch for business name changes and update localStorage
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.businessName) {
        const existingData = localStorage.getItem('businessData');
        const parsedData = existingData ? JSON.parse(existingData) : {};
        localStorage.setItem('businessData', JSON.stringify({
          ...parsedData,
          businessName: value.businessName,
          logo: logoPreview
        }));
      }
    });
    return () => subscription.unsubscribe();
  }, [form, logoPreview]);

  return (
    <div className="space-y-6">
      <div className="flex flex-start space-y-4">
        <div className="w-32">
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
      </div>

      <FormField
        control={form.control}
        name="businessName"
        render={({ field }) => (
          <FormItem className="col-span-full">
            <FormLabel>Business Name</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter your business name" 
                {...field} 
                className="h-14"
                onChange={(e) => {
                  field.onChange(e);
                  // Update localStorage immediately on change
                  const existingData = localStorage.getItem('businessData');
                  const parsedData = existingData ? JSON.parse(existingData) : {};
                  localStorage.setItem('businessData', JSON.stringify({
                    ...parsedData,
                    businessName: e.target.value
                  }));
                }}
              />
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