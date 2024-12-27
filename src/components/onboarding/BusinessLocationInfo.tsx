import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface BusinessLocationInfoProps {
  form: UseFormReturn<any>;
  selectedCountries: string[];
  handleCountrySelect: (country: string) => void;
  removeCountry: (country: string) => void;
  countries: readonly string[];
  operationType: string;
}

export const BusinessLocationInfo = ({
  form,
  selectedCountries,
  handleCountrySelect,
  removeCountry,
  countries,
  operationType,
}: BusinessLocationInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="operationType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Operation Type</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="physical" id="physical" />
                  <Label htmlFor="physical">Physical Location</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="remote" id="remote" />
                  <Label htmlFor="remote">Remote Business</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {operationType === "physical" && (
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your business address"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <div className="space-y-2 col-span-full">
        <Label>Target Countries</Label>
        <Select onValueChange={handleCountrySelect}>
          <SelectTrigger>
            <SelectValue placeholder="Select target countries" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedCountries.map((country) => (
            <div
              key={country}
              className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md"
            >
              <span>{country}</span>
              <button
                type="button"
                onClick={() => removeCountry(country)}
                className="text-primary hover:text-primary/80"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="col-span-full">
            <FormLabel>Business Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter a brief description of your business"
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};