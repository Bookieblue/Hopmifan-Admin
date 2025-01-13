import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash2, Mail, Phone, MapPin, Building2, Calendar, Wallet } from "lucide-react";
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
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Pagination } from "@/components/ui/pagination";

// Mock data remains the same
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

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

  const handleDelete = () => {
    toast({
      title: "Customer deleted",
      description: "The customer has been successfully deleted",
    });
    navigate("/customers");
  };

  const handleEdit = () => {
    navigate(`/customers/${id}/edit`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPaginatedData = (data: any[], page: number) => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  };

  return (
    <div className="p-4 md:p-6 max-w-[1400px] mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/customers")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold">{customer.name}</h1>
      </div>

      <Card className="bg-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center md:items-start space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={customer.profilePicture} alt={customer.name} />
                <AvatarFallback>{customer.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowDeleteDialog(true)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
              <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center text-muted-foreground">
                  <Building2 className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Company</span>
                </div>
                <p className="text-lg">{customer.name}</p>
              </div>
              
              <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center text-muted-foreground">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Email</span>
                </div>
                <p className="text-lg break-all">{customer.email}</p>
              </div>
              
              <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center text-muted-foreground">
                  <Phone className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Phone</span>
                </div>
                <p className="text-lg">{customer.phone}</p>
              </div>
              
              <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Address</span>
                </div>
                <p className="text-lg">{customer.address}</p>
              </div>
              
              <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center text-muted-foreground">
                  <Wallet className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Total Spent</span>
                </div>
                <p className="text-lg font-semibold">{customer.totalSpent}</p>
              </div>
              
              <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Customer Since</span>
                </div>
                <p className="text-lg">{customer.date}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <Tabs defaultValue="invoices" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none px-6">
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="estimates">Estimates</TabsTrigger>
            <TabsTrigger value="receipts">Receipts</TabsTrigger>
          </TabsList>

          {["invoices", "estimates", "receipts"].map((tab) => (
            <TabsContent key={tab} value={tab} className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{tab.charAt(0).toUpperCase() + tab.slice(1, -1)} #</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getPaginatedData(customer[tab], currentPage).map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.amount}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{item.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  {customer[tab].length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        No {tab} found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {customer[tab].length > itemsPerPage && (
                <div className="mt-4 flex justify-center">
                  <Pagination
                    total={Math.ceil(customer[tab].length / itemsPerPage)}
                    value={currentPage}
                    onChange={handlePageChange}
                  />
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </Card>

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
    </div>
  );
}