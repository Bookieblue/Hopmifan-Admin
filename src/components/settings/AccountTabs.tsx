import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BusinessSettings from "@/components/settings/BusinessSettings";
import TaxSettings from "@/components/settings/TaxSettings";

export default function AccountTabs() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="business" className="space-y-4">
        <TabsList>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="tax">Tax</TabsTrigger>
        </TabsList>

        <TabsContent value="business">
          <BusinessSettings />
        </TabsContent>

        <TabsContent value="tax">
          <TaxSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}