import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InvoiceList = () => {
  // Placeholder data - in a real app, this would come from your backend
  const invoices = [
    { id: 1, number: "INV-001", client: "Acme Corp", amount: 1500, status: "Paid", date: "2024-03-20" },
    { id: 2, number: "INV-002", client: "Tech Inc", amount: 2300, status: "Pending", date: "2024-03-21" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Invoices</h1>
        <Link to="/invoices/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Invoice
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {invoices.map((invoice) => (
          <Card key={invoice.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>{invoice.number}</span>
                <span className={`text-sm px-2 py-1 rounded ${
                  invoice.status === "Paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}>
                  {invoice.status}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Client: {invoice.client}</p>
                <p className="text-lg font-semibold">${invoice.amount}</p>
                <p className="text-sm text-muted-foreground">Date: {invoice.date}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InvoiceList;