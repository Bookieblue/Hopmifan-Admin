import { Card } from "@/components/ui/card";

interface ClassicInvoiceTemplateProps {
  invoice: {
    number?: string;
    date: string;
    customer?: {
      name: string;
      email: string;
      street?: string;
      state?: string;
      postalCode?: string;
    };
    items: Array<{
      description: string;
      quantity: number;
      price: number;
      amount: number;
    }>;
    notes?: string;
    terms?: string;
    footer?: string;
  };
  currencySymbol: string;
}

export function ClassicInvoiceTemplate({ invoice, currencySymbol }: ClassicInvoiceTemplateProps) {
  return (
    <Card className="bg-white p-8 mt-4">
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

        {invoice.customer && (
          <div className="space-y-2">
            <h3 className="font-semibold">Bill To:</h3>
            <div>{invoice.customer.name}</div>
            <div>{invoice.customer.email}</div>
            {invoice.customer.street && (
              <div className="text-gray-600">
                {invoice.customer.street}
                {invoice.customer.state && `, ${invoice.customer.state}`}
                {invoice.customer.postalCode && ` ${invoice.customer.postalCode}`}
              </div>
            )}
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
                <td colSpan={3} className="text-right pt-4 font-semibold">Total:</td>
                <td className="text-right pt-4 font-semibold">
                  {currencySymbol}
                  {invoice.items.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {invoice.notes && (
          <div className="mt-8 space-y-2">
            <h3 className="font-semibold">Notes:</h3>
            <p className="text-gray-600">{invoice.notes}</p>
          </div>
        )}

        {invoice.terms && (
          <div className="mt-4 space-y-2">
            <h3 className="font-semibold">Terms & Conditions:</h3>
            <p className="text-gray-600">{invoice.terms}</p>
          </div>
        )}

        {invoice.footer && (
          <div className="mt-8 pt-4 border-t text-center text-gray-500">
            {invoice.footer}
          </div>
        )}
      </div>
    </Card>
  );
}