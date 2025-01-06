import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Mock data for the customer details
const customerData = {
  "1": {
    id: "1",
    name: "Acme Corp",
    email: "billing@acme.com",
    phone: "+1 234 567 890",
    address: "123 Business Ave, Lagos, Nigeria",
    totalSpent: "₦12,500.00",
    invoices: [
      { id: "INV-001", date: "15 Mar 2024", amount: "₦5,000.00", status: "paid" },
      { id: "INV-002", date: "10 Mar 2024", amount: "₦7,500.00", status: "pending" }
    ],
    estimates: [
      { id: "EST-001", date: "05 Mar 2024", amount: "₦3,000.00", status: "accepted" }
    ],
    receipts: [
      { id: "RCP-001", date: "15 Mar 2024", amount: "₦5,000.00", status: "completed" }
    ]
  },
  "2": {
    id: "2",
    name: "TechStart Solutions",
    email: "finance@techstart.com",
    phone: "+1 987 654 321",
    address: "456 Innovation Way, Abuja, Nigeria",
    totalSpent: "₦8,750.00",
    invoices: [
      { id: "INV-003", date: "14 Mar 2024", amount: "₦8,750.00", status: "paid" }
    ],
    estimates: [],
    receipts: [
      { id: "RCP-002", date: "14 Mar 2024", amount: "₦8,750.00", status: "completed" }
    ]
  }
};

export default function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const customer = customerData[id as keyof typeof customerData];

  if (!customer) {
    return (
      <div className="p-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/customers")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <p>Customer not found</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/customers")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold">{customer.name}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p>{customer.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Phone</p>
            <p>{customer.phone}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Address</p>
            <p>{customer.address}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
            <p className="font-semibold">{customer.totalSpent}</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="invoices" className="w-full">
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="estimates">Estimates</TabsTrigger>
          <TabsTrigger value="receipts">Receipts</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customer.invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{invoice.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {customer.invoices.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">No invoices found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="estimates">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Estimate #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customer.estimates.map((estimate) => (
                  <TableRow key={estimate.id}>
                    <TableCell className="font-medium">{estimate.id}</TableCell>
                    <TableCell>{estimate.date}</TableCell>
                    <TableCell>{estimate.amount}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{estimate.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {customer.estimates.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">No estimates found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="receipts">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Receipt #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customer.receipts.map((receipt) => (
                  <TableRow key={receipt.id}>
                    <TableCell className="font-medium">{receipt.id}</TableCell>
                    <TableCell>{receipt.date}</TableCell>
                    <TableCell>{receipt.amount}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{receipt.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {customer.receipts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">No receipts found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}