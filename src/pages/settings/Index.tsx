import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default function Settings() {
  const [businessInfo, setBusinessInfo] = useState({
    name: "Acme Corp",
    email: "contact@acmecorp.com",
    phone: "+1 234 567 890",
    type: "Business",
    country: "United States",
    currency: "US Dollar",
    description: "Leading provider of innovative solutions",
    address: "123 Business Street, Suite 100"
  });

  const [documentTypes, setDocumentTypes] = useState({
    invoices: true,
    estimates: true,
    receipts: true
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">Settings</h1>
      </div>

      <Tabs defaultValue="business" className="space-y-4">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="reminders">Reminders</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>

        <TabsContent value="business">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Manage your business details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="business-name">Business Name</Label>
                  <Input
                    id="business-name"
                    value={businessInfo.name}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-email">Business Email</Label>
                  <Input
                    id="business-email"
                    type="email"
                    value={businessInfo.email}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-phone">Business Phone</Label>
                  <Input
                    id="business-phone"
                    value={businessInfo.phone}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-type">Business Type</Label>
                  <Select
                    value={businessInfo.type}
                    onValueChange={(value) => setBusinessInfo({ ...businessInfo, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Individual">Individual</SelectItem>
                      <SelectItem value="Non-profit">Non-profit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select
                    value={businessInfo.country}
                    onValueChange={(value) => setBusinessInfo({ ...businessInfo, country: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={businessInfo.currency}
                    onValueChange={(value) => setBusinessInfo({ ...businessInfo, currency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US Dollar">US Dollar</SelectItem>
                      <SelectItem value="Euro">Euro</SelectItem>
                      <SelectItem value="British Pound">British Pound</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="business-description">Business Description</Label>
                  <Textarea
                    id="business-description"
                    value={businessInfo.description}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="business-address">Business Address</Label>
                  <Textarea
                    id="business-address"
                    value={businessInfo.address}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })}
                  />
                </div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Templates</CardTitle>
              <CardDescription>
                Customize your document templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="document-types">
                <TabsList className="bg-muted/50 p-1">
                  <TabsTrigger value="document-types">Document Types</TabsTrigger>
                  <TabsTrigger value="design">Design</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                </TabsList>

                <TabsContent value="document-types" className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Invoices</h4>
                        <p className="text-sm text-muted-foreground">Create and manage invoices for your clients</p>
                      </div>
                      <Switch
                        checked={documentTypes.invoices}
                        onCheckedChange={(checked) => setDocumentTypes({ ...documentTypes, invoices: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Estimates</h4>
                        <p className="text-sm text-muted-foreground">Send professional estimates to potential clients</p>
                      </div>
                      <Switch
                        checked={documentTypes.estimates}
                        onCheckedChange={(checked) => setDocumentTypes({ ...documentTypes, estimates: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Receipts</h4>
                        <p className="text-sm text-muted-foreground">Generate receipts for completed payments</p>
                      </div>
                      <Switch
                        checked={documentTypes.receipts}
                        onCheckedChange={(checked) => setDocumentTypes({ ...documentTypes, receipts: checked })}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="design">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Modern</h3>
                      <p className="text-sm text-muted-foreground mb-4">Clean and contemporary design with a focus on typography and whitespace</p>
                      <div className="aspect-[4/5] bg-accent/10 rounded-lg"></div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Classic</h3>
                      <p className="text-sm text-muted-foreground mb-4">Traditional business layout with a professional appearance</p>
                      <div className="aspect-[4/5] bg-accent/10 rounded-lg"></div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Minimal</h3>
                      <p className="text-sm text-muted-foreground mb-4">Simplified design that emphasizes content and readability</p>
                      <div className="aspect-[4/5] bg-accent/10 rounded-lg"></div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="content">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Header Text</Label>
                      <Input defaultValue="INVOICE" />
                    </div>
                    <div className="space-y-2">
                      <Label>Footer Text</Label>
                      <Input defaultValue="Thank you for your business" />
                    </div>
                    <div className="space-y-2">
                      <Label>Terms & Conditions</Label>
                      <Textarea defaultValue="Payment is due within 30 days" />
                    </div>
                    <div className="space-y-2">
                      <Label>Notes Template</Label>
                      <Textarea defaultValue="Please include any notes or special instructions here" />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>Configure your payment preferences and methods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] rounded-md border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
                <p className="text-muted-foreground">Payment settings coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reminders">
          <Card>
            <CardHeader>
              <CardTitle>Reminder Settings</CardTitle>
              <CardDescription>Configure automated reminders and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] rounded-md border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
                <p className="text-muted-foreground">Reminder settings coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage your team members and their permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] rounded-md border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
                <p className="text-muted-foreground">Team member settings coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}