import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Subscription() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">Subscription</h1>
      </div>

      <Tabs defaultValue="plan" className="space-y-4">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="plan">Current Plan</TabsTrigger>
          <TabsTrigger value="billing">Billing History</TabsTrigger>
        </TabsList>

        <TabsContent value="plan">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Current Plan</h2>
                  <p className="text-muted-foreground">You are currently on the Free plan</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Plan Features</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Up to 3 documents per month</li>
                    <li>• Basic templates</li>
                    <li>• Email support</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Billing History</h2>
                  <p className="text-muted-foreground">View your billing history and download invoices</p>
                </div>
                <div className="text-muted-foreground">
                  No billing history available
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}