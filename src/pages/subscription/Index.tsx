import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample billing history data
const billingHistory = [
  {
    id: 1,
    date: "Mar 1, 2024",
    amount: "$29.00",
    status: "Paid",
    invoice: "INV-2024-001"
  },
  {
    id: 2,
    date: "Feb 1, 2024",
    amount: "$29.00",
    status: "Paid",
    invoice: "INV-2024-002"
  },
  {
    id: 3,
    date: "Jan 1, 2024",
    amount: "$29.00",
    status: "Paid",
    invoice: "INV-2024-003"
  }
];

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
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">Current Plan</h2>
                    <p className="text-muted-foreground mt-1">You are currently on the Free plan</p>
                  </div>
                  <Badge variant="secondary" className="px-4 py-1">Free</Badge>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <h3 className="font-medium mb-4 text-blue-900">Plan Features</h3>
                  <ul className="space-y-3">
                    {[
                      "Up to 3 documents per month",
                      "Basic templates",
                      "Email support",
                      "1 team member"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-blue-800">
                        <Check className="h-5 w-5 text-blue-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-end">
                  <Button>Upgrade Plan</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold">Billing History</h2>
                  <p className="text-muted-foreground">View your billing history and download invoices</p>
                </div>
                
                <div className="border rounded-lg divide-y">
                  {billingHistory.map((bill) => (
                    <div key={bill.id} className="flex items-center justify-between p-4">
                      <div className="space-y-1">
                        <p className="font-medium">{bill.date}</p>
                        <p className="text-sm text-muted-foreground">{bill.invoice}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-medium">{bill.amount}</p>
                        <Badge variant="secondary">{bill.status}</Badge>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}