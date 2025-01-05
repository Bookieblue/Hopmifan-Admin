import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";

interface CustomerSelectProps {
  onCustomerSelect: (customer: any) => void;
  initialCustomer?: any;  // Added this line to fix the TypeScript error
}

export function CustomerSelect({ onCustomerSelect, initialCustomer }: CustomerSelectProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: initialCustomer?.name || "",
    email: initialCustomer?.email || "",
    phone: initialCustomer?.phone || "",
    address: initialCustomer?.address || "",
    city: initialCustomer?.city || "",
    state: initialCustomer?.state || "",
    zipCode: initialCustomer?.zipCode || "",
    country: initialCustomer?.country || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCustomerSelect(formData);
    toast.success("Customer added successfully");
    setShowForm(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!showForm) {
    return (
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => setShowForm(true)}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Customer
      </Button>
    );
  }

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Customer Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Billing Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
            Cancel
          </Button>
          <Button type="submit">Add Customer</Button>
        </div>
      </form>
    </Card>
  );
}