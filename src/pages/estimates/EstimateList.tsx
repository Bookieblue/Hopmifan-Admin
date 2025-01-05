import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EstimateList = () => {
  // Placeholder data
  const estimates = [
    { id: 1, number: "EST-001", client: "Acme Corp", amount: 3500, status: "Pending", date: "2024-03-20" },
    { id: 2, number: "EST-002", client: "Tech Inc", amount: 4200, status: "Approved", date: "2024-03-21" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Estimates</h1>
        <Link to="/estimates/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Estimate
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {estimates.map((estimate) => (
          <Card key={estimate.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>{estimate.number}</span>
                <span className={`text-sm px-2 py-1 rounded ${
                  estimate.status === "Approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}>
                  {estimate.status}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Client: {estimate.client}</p>
                <p className="text-lg font-semibold">${estimate.amount}</p>
                <p className="text-sm text-muted-foreground">Date: {estimate.date}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EstimateList;