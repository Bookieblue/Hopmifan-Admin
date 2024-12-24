import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const CustomerList = () => {
  // Placeholder data - in a real app, this would come from your backend
  const customers = [
    { 
      id: 1, 
      name: "Acme Corp", 
      email: "contact@acme.com",
      totalSpent: 15000,
      lastPurchase: "2024-03-20",
      status: "Active"
    },
    { 
      id: 2, 
      name: "Tech Inc", 
      email: "billing@techinc.com",
      totalSpent: 23000,
      lastPurchase: "2024-03-21",
      status: "Active"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Customers</h1>
        <Link to="/customers/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search customers..." className="pl-8" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {customers.map((customer) => (
          <Link key={customer.id} to={`/customers/${customer.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{customer.name}</span>
                  <span className="text-sm px-2 py-1 rounded bg-green-100 text-green-800">
                    {customer.status}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{customer.email}</p>
                  <p className="text-lg font-semibold">
                    Total Spent: ${customer.totalSpent.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Last Purchase: {customer.lastPurchase}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CustomerList;