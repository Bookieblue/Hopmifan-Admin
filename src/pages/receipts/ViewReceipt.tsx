import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Pencil, Printer } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";

export default function ViewReceipt() {
  const printRef = useRef<HTMLDivElement>(null);

  const receipt = {
    id: "RCP-001",
    date: "2024-03-15",
    paymentMethod: "Bank Transfer",
    paymentReference: "REF123456",
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
    notes: "Payment received with thanks"
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Receipt-${receipt.id}`,
    onAfterPrint: () => console.log('Printed successfully'),
    removeAfterPrint: true
  });

  return (
    <div className="p-4 md:p-6 max-w-[1000px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link to="/receipts">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl md:text-2xl font-semibold">Receipt #{receipt.id}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button 
            variant="outline" 
            className="gap-2" 
            onClick={() => handlePrint()}
          >
            <Printer className="w-4 h-4" />
            Print
          </Button>
          <Link to={`/receipts/${receipt.id}/edit`}>
            <Button className="gap-2">
              <Pencil className="w-4 h-4" />
              Edit
            </Button>
          </Link>
        </div>
      </div>

      <div ref={printRef}>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-blue-600">Payment Receipt</h2>
              </div>
              <div className="text-left md:text-right">
                <h3 className="text-lg md:text-xl font-semibold">RECEIPT #{receipt.id}</h3>
                <p className="text-gray-600">Date: {receipt.date}</p>
                <p className="text-gray-600">Payment Method: {receipt.paymentMethod}</p>
                <p className="text-gray-600">Reference: {receipt.paymentReference}</p>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="font-medium text-gray-600 mb-2">Received From:</h4>
              <div className="space-y-1">
                <p className="font-medium">{receipt.client.name}</p>
                <p>{receipt.client.email}</p>
                <p>{receipt.client.phone}</p>
                <p>{receipt.client.address}</p>
              </div>
            </div>

            <div className="mb-8 overflow-x-auto">
              <table className="w-full min-w-[600px]">
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
              <div className="w-full md:w-72">
                <div className="flex justify-between py-2">
                  <span>Subtotal:</span>
                  <span>{receipt.subtotal}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Tax (10%):</span>
                  <span>{receipt.tax}</span>
                </div>
                <div className="flex justify-between py-2 font-semibold">
                  <span>Total Paid:</span>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}