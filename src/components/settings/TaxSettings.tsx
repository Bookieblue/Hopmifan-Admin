import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const taxItemSchema = z.object({
  name: z.string().min(1, "Tax name is required"),
  rate: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 100, {
    message: "Tax rate must be between 0 and 100",
  }),
});

const formSchema = z.object({
  taxNumber: z.string().optional(),
  taxOffice: z.string().optional(),
  taxes: z.array(taxItemSchema),
});

type TaxItem = {
  name: string;
  rate: string;
};

export default function TaxSettings() {
  const [taxes, setTaxes] = useState<TaxItem[]>([
    { name: "VAT", rate: "0" }
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taxNumber: "",
      taxOffice: "",
      taxes: taxes,
    },
  });

  const addTax = () => {
    setTaxes([...taxes, { name: "", rate: "0" }]);
  };

  const removeTax = (index: number) => {
    const newTaxes = taxes.filter((_, i) => i !== index);
    setTaxes(newTaxes);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      toast({
        title: "Success",
        description: "Tax settings updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update tax settings",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Tax Information</h3>
        <p className="text-sm text-muted-foreground">
          Update your business tax details and information.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="taxNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tax Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your tax number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="taxOffice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tax Office</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your tax office" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Tax Rates</h4>
              <Button type="button" variant="outline" size="sm" onClick={addTax} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Tax
              </Button>
            </div>

            {taxes.map((tax, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 items-start">
                <div className="col-span-5">
                  <FormField
                    control={form.control}
                    name={`taxes.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Tax name (e.g., VAT)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-5">
                  <FormField
                    control={form.control}
                    name={`taxes.${index}.rate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Tax rate (%)" 
                            min="0"
                            max="100"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTax(index)}
                    className="h-10 w-10"
                    disabled={taxes.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}