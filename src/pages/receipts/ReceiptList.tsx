import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ReceiptList = () => {
  // Placeholder data
  const receipts = [
    { id: 1, number: "RCP-001", client: "Acme Corp", amount: 1500, date: "2024-03-20" },
    { id: 2, number: "RCP-002", client: "Tech Inc", amount: 2300, date: "2024-03-21" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Receipts</h1>
        <Link to="/receipts/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Receipt
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {receipts.map((receipt) => (
          <Card key={receipt.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{receipt.number}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Client: {receipt.client}</p>
                <p className="text-lg font-semibold">${receipt.amount}</p>
                <p className="text-sm text-muted-foreground">Date: {receipt.date}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReceiptList;