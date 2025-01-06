import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

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
  const handleDownloadReceipt = (invoiceId: string) => {
    // In a real app, this would trigger an API call to get the receipt
    toast({
      title: "Downloading Receipt",
      description: `Receipt ${invoiceId} is being downloaded.`
    });
    
    // Simulate download - replace with actual API call in production
    const element = document.createElement('a');
    element.href = '#';
    element.download = `receipt-${invoiceId}.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">Subscription</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Current Plan Section */}
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

        {/* Billing History Section */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Billing History</h2>
                <p className="text-muted-foreground">View your billing history and download receipts</p>
              </div>
              
              <div className="space-y-4">
                {billingHistory.map((bill) => (
                  <div 
                    key={bill.id} 
                    className="flex flex-col p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <Download className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">{bill.invoice}</p>
                          <p className="text-sm text-gray-500">{bill.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{bill.amount}</p>
                        <Badge variant="secondary" className="mt-1">{bill.status}</Badge>
                      </div>
                    </div>
                    <div className="flex justify-end mt-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDownloadReceipt(bill.invoice)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Receipt
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}