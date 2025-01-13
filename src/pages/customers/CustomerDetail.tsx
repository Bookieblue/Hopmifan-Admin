import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CustomerForm } from "@/components/customers/CustomerForm";
import { useToast } from "@/hooks/use-toast";

// Mock data for the customer details
const customerData = {
  "1": {
    id: "1",
    name: "Acme Corp",
    email: "billing@acme.com",
    phone: "+1 234 567 890",
    address: "123 Business Ave, Lagos, Nigeria",
    totalSpent: "₦12,500.00",
    date: "15 Mar 2024",
    profilePicture: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
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
    date: "14 Mar 2024",
    profilePicture: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
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
  const { toast } = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
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

  const handleEdit = (data: any) => {
    // In a real app, this would update the customer data
    console.log("Updating customer:", data);
    setIsEditModalOpen(false);
    toast({
      title: "Success",
      description: "Customer updated successfully",
    });
  };

  const handleDelete = () => {
    // In a real app, this would delete the customer
    console.log("Deleting customer:", id);
    setIsDeleteDialogOpen(false);
    toast({
      title: "Success",
      description: "Customer deleted successfully",
    });
    navigate("/customers");
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-6">
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
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsEditModalOpen(true)}
            className="gap-2"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={() => setIsDeleteDialogOpen(true)}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={customer.profilePicture} />
                <AvatarFallback>{customer.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{customer.name}</h2>
                <p className="text-sm text-muted-foreground">Customer since {customer.date}</p>
              </div>
            </div>
            <div className="grid gap-4">
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
            </div>
          </CardContent>
        </Card>

        <Card>
          <Tabs defaultValue="invoices" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="invoices" className="flex-1">Invoices</TabsTrigger>
              <TabsTrigger value="estimates" className="flex-1">Estimates</TabsTrigger>
              <TabsTrigger value="receipts" className="flex-1">Receipts</TabsTrigger>
            </TabsList>

            <TabsContent value="invoices">
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
            </TabsContent>

            <TabsContent value="estimates">
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
            </TabsContent>

            <TabsContent value="receipts">
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
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
          </DialogHeader>
          <CustomerForm 
            initialData={customer}
            onSubmit={handleEdit}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the customer
              and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
