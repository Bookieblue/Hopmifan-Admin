import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { ShareModal } from "@/components/modals/ShareModal";

export default function PreviewReceipt() {
  const { id } = useParams<{ id: string }>();
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [receipt, setReceipt] = useState({
    id: id,
    number: `RCP-${id}`,
    date: new Date().toISOString().split('T')[0],
    customer: {
      name: "Acme Corporation",
      email: "billing@acme.com",
      street: "123 Business Ave",
      state: "California",
      postalCode: "94105"
    },
    items: [
      {
        description: "Website Development",
        quantity: 1,
        price: 2500,
        amount: 2500
      }
    ],
    notes: "Thank you for your business",
    terms: "This is a receipt for services rendered"
  });

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-4xl">
        <Card className="bg-white p-6 md:p-8 shadow-lg">
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-blue-600">Receipt</h2>
              <div className="text-right">
                <div className="text-xl font-semibold">#{receipt.number}</div>
                <div className="text-gray-500">
                  Date: {new Date(receipt.date).toLocaleDateString()}
                </div>
              </div>
            </div>

            {receipt.customer && (
              <div className="space-y-2">
                <h3 className="font-semibold">Bill To:</h3>
                <div>{receipt.customer.name}</div>
                <div>{receipt.customer.email}</div>
                <div className="text-gray-600">
                  {receipt.customer.street}
                  {receipt.customer.state && `, ${receipt.customer.state}`}
                  {receipt.customer.postalCode && ` ${receipt.customer.postalCode}`}
                </div>
              </div>
            )}

            <div className="mt-8">
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
                      <td className="text-right py-2">₦{item.price.toLocaleString()}</td>
                      <td className="text-right py-2">₦{item.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="text-right pt-4 font-semibold">Total:</td>
                    <td className="text-right pt-4 font-semibold">
                      ₦{receipt.items.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {receipt.notes && (
              <div className="mt-8 space-y-2">
                <h3 className="font-semibold">Notes:</h3>
                <p className="text-gray-600">{receipt.notes}</p>
              </div>
            )}

            {receipt.terms && (
              <div className="mt-4 space-y-2">
                <h3 className="font-semibold">Terms & Conditions:</h3>
                <p className="text-gray-600">{receipt.terms}</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      <ShareModal 
        open={shareModalOpen} 
        onOpenChange={setShareModalOpen}
        receiptId={receipt.id}
      />
    </div>
  );
}