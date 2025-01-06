import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PaymentAccountTab from "./PaymentAccountTab";
import ReminderSettings from "./ReminderSettings";

export default function PaymentSettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Payment Settings</h2>
      
      <Tabs defaultValue="payment" className="space-y-4">
        <TabsList>
          <TabsTrigger value="payment">Payment Account</TabsTrigger>
          <TabsTrigger value="reminder">Reminder</TabsTrigger>
        </TabsList>

        <TabsContent value="payment" className="space-y-6">
          <PaymentAccountTab />
        </TabsContent>

        <TabsContent value="reminder" className="space-y-6">
          <ReminderSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}