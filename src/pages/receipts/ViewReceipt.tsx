import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Download, Pencil, Printer } from "lucide-react";
import { Link } from "react-router-dom";

export default function ViewReceipt() {
  const receipt = {
    id: "RCP-001",
    date: "2024-03-15",
    client: {
      name: "Global Inc",
      email: "accounts@global.com",
      phone: "+1 234 567 890",
      address: "789 Global Plaza, Global City, 12345"
    },
    items: [
      {
        description: "Monthly Service",
        quantity: 1,
        price: "₦999.00",
        amount: "₦999.00"
      }
    ],
    subtotal: "₦999.00",
    tax: "₦99.90",
    total: "₦1,098.90",
    notes: "Payment received with thanks",
    terms: "All sales are final"
  };

  return (
    <div className="p-6 max-w-[1000px] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link to="/receipts">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold">Receipt #{receipt.id}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Printer className="w-4 h-4" />
            Print
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Download
          </Button>
          <Button className="gap-2">
            <Pencil className="w-4 h-4" />
            Edit
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-blue-600">Cordlo Invoice</h2>
            </div>
            <div className="text-right">
              <h3 className="text-xl font-semibold">RECEIPT #{receipt.id}</h3>
              <p className="text-gray-600">Date: {receipt.date}</p>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="font-medium text-gray-600 mb-2">Bill To:</h4>
            <div className="space-y-1">
              <p className="font-medium">{receipt.client.name}</p>
              <p>{receipt.client.email}</p>
              <p>{receipt.client.phone}</p>
              <p>{receipt.client.address}</p>
            </div>
          </div>

          <div className="mb-8">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Description</th>
                  <th className="text-center py-2">Quantity</th>
                  <th className="text-right py-2">Price</th>
                  <th className="text-right py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {receipt.items.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{item.description}</td>
                    <td className="text-center py-2">{item.quantity}</td>
                    <td className="text-right py-2">{item.price}</td>
                    <td className="text-right py-2">{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mb-8">
            <div className="w-72">
              <div className="flex justify-between py-2">
                <span>Subtotal:</span>
                <span>{receipt.subtotal}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Tax (10%):</span>
                <span>{receipt.tax}</span>
              </div>
              <div className="flex justify-between py-2 font-semibold">
                <span>Total:</span>
                <span>{receipt.total}</span>
              </div>
            </div>
          </div>

          {receipt.notes && (
            <div className="mb-4">
              <h4 className="font-medium mb-2">Notes</h4>
              <p className="text-gray-600">{receipt.notes}</p>
            </div>
          )}

          {receipt.terms && (
            <div>
              <h4 className="font-medium mb-2">Terms & Conditions</h4>
              <p className="text-gray-600">{receipt.terms}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}