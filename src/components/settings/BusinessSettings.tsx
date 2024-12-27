import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function BusinessSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Business Information</h3>
        <p className="text-sm text-muted-foreground">
          Update your business details and information.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Business Name</Label>
          <Input id="name" placeholder="Enter your business name" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Business Email</Label>
          <Input id="email" type="email" placeholder="Enter your business email" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" placeholder="Enter your phone number" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input id="website" type="url" placeholder="Enter your website URL" />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Business Address</Label>
          <Textarea
            id="address"
            placeholder="Enter your business address"
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Business Description</Label>
          <Textarea
            id="description"
            placeholder="Enter a brief description of your business"
            className="min-h-[100px]"
          />
        </div>
      </div>
    </div>
  );
}