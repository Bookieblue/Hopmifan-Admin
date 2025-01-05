import { Card } from "@/components/ui/card";

interface InvoicePreviewProps {
  invoice: {
    number?: string;
    date: string;
    customer?: {
      name: string;
      email: string;
    };
    items: Array<{
      description: string;
      quantity: number;
      price: number;
      amount: number;
    }>;
  };
  selectedCurrency: string;
}

export function InvoicePreview({ invoice, selectedCurrency }: InvoicePreviewProps) {
  const currencySymbol = selectedCurrency === 'NGN' ? '₦' : selectedCurrency;
  
  return (
    <div className="bg-[#F9FAFB] p-6 h-[calc(100vh-8rem)] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Preview</h2>
        <div className="flex gap-4">
          <button className="text-gray-600 hover:text-gray-900">PDF</button>
          <button className="text-gray-600 hover:text-gray-900">Email</button>
          <button className="text-gray-600 hover:text-gray-900">Payment page</button>
        </div>
      </div>

      <Card className="bg-white p-8">
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-blue-600">Cordlo Invoice</h2>
            <div className="text-right">
              <div className="text-xl font-semibold">#{invoice.number}</div>
              <div className="text-gray-500">
                Date: {new Date(invoice.date).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Bill To:</h3>
            <div>{invoice.customer?.name}</div>
            <div>{invoice.customer?.email}</div>
          </div>

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
                {invoice.items.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{item.description}</td>
                    <td className="text-center py-2">{item.quantity}</td>
                    <td className="text-right py-2">{currencySymbol}{item.price.toLocaleString()}</td>
                    <td className="text-right py-2">{currencySymbol}{item.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="text-right pt-4 font-semibold">Subtotal:</td>
                  <td className="text-right pt-4 font-semibold">
                    {currencySymbol}
                    {invoice.items.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}