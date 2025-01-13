import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Building2, Mail, Phone, MapPin, Calendar, Wallet,
  ArrowLeft, Edit, Trash2
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/shared/DataTable";
import type { TableColumn } from "@/components/shared/DataTable";
import { InvoiceCard } from "@/components/invoices/InvoiceCard";
import { EstimateCard } from "@/components/invoices/EstimateCard";
import { ReceiptCard } from "@/components/invoices/ReceiptCard";
import { CustomerForm } from "@/components/customers/CustomerForm";

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
  const customer = customerData[id as keyof typeof customerData];
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (!customer) {
    return (
      <div className="p-2.5 md:p-6">
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

  const handleDelete = () => {
    toast({
      title: "Customer deleted",
      description: "The customer has been successfully deleted",
    });
    navigate("/customers");
  };

  const handleEdit = () => {
    setShowEditDialog(true);
  };

  const handleEditSubmit = (data: any) => {
    toast({
      title: "Customer updated",
      description: "The customer has been successfully updated",
    });
    setShowEditDialog(false);
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    setSelectedItems(prev => 
      checked ? [...prev, id] : prev.filter(item => item !== id)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedItems(checked ? customer.invoices.map(inv => inv.id) : []);
  };

  const handleItemDelete = (id: string) => {
    toast({
      description: `Item ${id} has been deleted.`
    });
  };

  const handleItemShare = (id: string) => {
    toast({
      description: `Sharing ${id}...`
    });
  };

  const handleItemDuplicate = (id: string) => {
    toast({
      description: `${id} has been duplicated.`
    });
  };

  const handleItemView = (type: string, id: string) => {
    window.open(`/${type}/${id}/preview`, '_blank');
  };

  const handleItemEdit = (type: string, id: string) => {
    navigate(`/${type}/${id}/edit`);
  };

  const invoicesWithCustomer = customer.invoices.map(invoice => ({
    ...invoice,
    customer: customer.name,
    type: 'one-time' // Adding required field from Invoice type
  }));

  const estimatesWithCustomer = customer.estimates.map(estimate => ({
    ...estimate,
    customer: customer.name
  }));

  const receiptsWithCustomer = customer.receipts.map(receipt => ({
    ...receipt,
    customer: customer.name
  }));

  const columns: TableColumn<any>[] = [
    { 
      header: 'ID', 
      accessor: 'id'
    },
    {
      header: 'Details',
      accessor: (item) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium">{formatDate(item.date)}</span>
          <span className="text-sm text-muted-foreground">
            {item.type === 'one-time' ? 'One-time' : 'Recurring'}
          </span>
        </div>
      )
    },
    { 
      header: 'Amount', 
      accessor: 'amount'
    },
    {
      header: 'Status',
      accessor: (item) => (
        <Badge 
          variant="secondary"
          className={`
            ${item.status === 'paid' || item.status === 'completed' || item.status === 'accepted' ? 'bg-green-50 text-green-700' : ''}
            ${item.status === 'pending' ? 'bg-orange-50 text-orange-700' : ''}
            ${item.status === 'overdue' || item.status === 'rejected' || item.status === 'cancelled' ? 'bg-red-50 text-red-700' : ''}
          `}
        >
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Badge>
      )
    }
  ];

  return (
    <div className="p-2.5 md:p-6 max-w-[1400px] mx-auto space-y-8">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/customers")}
          className="hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold text-gray-900">{customer.name}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        {/* Profile Card */}
        <Card className="bg-white border shadow-sm h-fit">
          <CardContent className="p-6">
            <div className="flex flex-col items-start text-left">
              <Avatar className="w-24 h-24 border-2 border-gray-100 mb-4">
                <AvatarImage src={customer.profilePicture} alt={customer.name} />
                <AvatarFallback className="bg-gray-50 text-gray-600 text-xl">
                  {customer.name[0]}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">{customer.name}</h2>
              <p className="text-sm text-gray-500 mb-4">{customer.email}</p>
              <div className="flex gap-2 w-full">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleEdit}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowDeleteDialog(true)}
                  className="flex-1 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Company</p>
                  <p className="text-gray-900">{customer.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-gray-900 break-all">{customer.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-gray-900">{customer.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p className="text-gray-900">{customer.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Wallet className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Spent</p>
                  <p className="text-gray-900 font-semibold">{customer.totalSpent}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Customer Since</p>
                  <p className="text-gray-900">{customer.date}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Card */}
        <Card className="border shadow-sm overflow-hidden">
          <Tabs defaultValue="invoices" className="w-full">
            <TabsList className="w-full justify-start rounded-none px-6 bg-muted p-1">
              <TabsTrigger value="invoices" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                Invoices
              </TabsTrigger>
              <TabsTrigger value="estimates" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                Estimates
              </TabsTrigger>
              <TabsTrigger value="receipts" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                Receipts
              </TabsTrigger>
            </TabsList>

            <TabsContent value="invoices" className="p-2.5 md:p-6 bg-white">
              <DataTable
                data={invoicesWithCustomer}
                columns={columns}
                selectedItems={selectedItems}
                onSelectItem={handleSelectItem}
                onSelectAll={handleSelectAll}
                getItemId={(item) => item.id}
                actions={{
                  onDelete: handleItemDelete,
                  onDuplicate: handleItemDuplicate,
                  onShare: handleItemShare,
                  additionalActions: [
                    {
                      label: "Edit",
                      onClick: (id) => handleItemEdit('invoices', id)
                    },
                    {
                      label: "View",
                      onClick: (id) => handleItemView('invoices', id)
                    }
                  ]
                }}
                CardComponent={InvoiceCard}
              />
            </TabsContent>

            <TabsContent value="estimates" className="p-2.5 md:p-6 bg-white">
              <DataTable
                data={estimatesWithCustomer}
                columns={columns}
                selectedItems={selectedItems}
                onSelectItem={handleSelectItem}
                onSelectAll={handleSelectAll}
                getItemId={(item) => item.id}
                actions={{
                  onDelete: handleItemDelete,
                  onDuplicate: handleItemDuplicate,
                  onShare: handleItemShare,
                  additionalActions: [
                    {
                      label: "Edit",
                      onClick: (id) => handleItemEdit('estimates', id)
                    },
                    {
                      label: "View",
                      onClick: (id) => handleItemView('estimates', id)
                    }
                  ]
                }}
                CardComponent={EstimateCard}
              />
            </TabsContent>

            <TabsContent value="receipts" className="p-2.5 md:p-6 bg-white">
              <DataTable
                data={receiptsWithCustomer}
                columns={columns}
                selectedItems={selectedItems}
                onSelectItem={handleSelectItem}
                onSelectAll={handleSelectAll}
                getItemId={(item) => item.id}
                actions={{
                  onDelete: handleItemDelete,
                  onDuplicate: handleItemDuplicate,
                  onShare: handleItemShare,
                  additionalActions: [
                    {
                      label: "Edit",
                      onClick: (id) => handleItemEdit('receipts', id)
                    },
                    {
                      label: "View",
                      onClick: (id) => handleItemView('receipts', id)
                    }
                  ]
                }}
                CardComponent={ReceiptCard}
              />
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
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
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
          </DialogHeader>
          <CustomerForm 
            initialData={customer}
            onSubmit={handleEditSubmit}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
