import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { businessTypes } from "@/lib/constants";
import { UseFormReturn } from "react-hook-form";

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="logo">Business Logo</Label>
        <Input
          id="logo"
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
          className="cursor-pointer"
        />
        {logoPreview && (
          <div className="mt-2">
            <img
              src={logoPreview}
              alt="Logo preview"
              className="w-24 h-24 object-contain"
            />
          </div>
        )}
      </div>

      <FormField
        control={form.control}
        name="businessName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter your business name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="businessType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {businessTypes.map((type) => (
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
    </div>
  );
};