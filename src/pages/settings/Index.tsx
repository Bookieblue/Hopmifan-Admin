import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import BusinessSettings from "@/components/settings/BusinessSettings";
import TemplateSettings from "@/components/settings/TemplateSettings";
import PaymentSettings from "@/components/settings/PaymentSettings";
import ReminderSettings from "@/components/settings/ReminderSettings";
import TeamSettings from "@/components/settings/TeamSettings";
import AccountTabs from "@/components/settings/AccountTabs";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">Settings</h1>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="reminders">Reminders</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardContent className="pt-6">
              <AccountTabs />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardContent className="pt-6">
              <TemplateSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardContent className="pt-6">
              <PaymentSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reminders">
          <Card>
            <CardContent className="pt-6">
              <ReminderSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members">
          <Card>
            <CardContent className="pt-6">
              <TeamSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}