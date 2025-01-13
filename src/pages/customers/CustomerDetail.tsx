import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Building2, Mail, Phone, MapPin, Calendar, Wallet,
  ArrowLeft, Edit, Trash2, ExternalLink 
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
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

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

  return (
    <div className="p-4 md:p-6 max-w-[1400px] mx-auto space-y-8">
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

            {["invoices", "estimates", "receipts"].map((tab) => (
              <TabsContent key={tab} value={tab} className="p-6 bg-white">
                <div className="rounded-lg border border-gray-100 overflow-hidden">
                  <div className="hidden md:block">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50/50">
                          <TableHead className="text-gray-600 font-medium">{tab.charAt(0).toUpperCase() + tab.slice(1, -1)} #</TableHead>
                          <TableHead className="text-gray-600 font-medium">Date</TableHead>
                          <TableHead className="text-gray-600 font-medium">Amount</TableHead>
                          <TableHead className="text-gray-600 font-medium">Status</TableHead>
                          <TableHead className="text-gray-600 font-medium w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {customer[tab].slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item: any) => (
                          <TableRow key={item.id} className="hover:bg-gray-50/50 group">
                            <TableCell className="font-medium text-gray-900">{item.id}</TableCell>
                            <TableCell className="text-gray-600">{item.date}</TableCell>
                            <TableCell className="text-gray-900 font-medium">{item.amount}</TableCell>
                            <TableCell>
                              <Badge 
                                variant="secondary"
                                className={`
                                  ${item.status === 'paid' ? 'bg-green-50 text-green-700' : ''}
                                  ${item.status === 'pending' ? 'bg-orange-50 text-orange-700' : ''}
                                  ${item.status === 'overdue' ? 'bg-red-50 text-red-700' : ''}
                                `}
                              >
                                {item.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => window.open(`/${tab}/${item.id}`, '_blank')}
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                        {customer[tab].length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                              No {tab} found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Mobile View */}
                  <div className="md:hidden space-y-4">
                    {customer[tab].slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item: any) => (
                      <Card key={item.id} className="mb-4 p-4 hover:border-mint-200 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">{item.id}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{item.date}</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => window.open(`/${tab}/${item.id}`, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-lg font-semibold">{item.amount}</span>
                          <Badge 
                            variant="secondary"
                            className={`
                              ${item.status === 'paid' ? 'bg-green-50 text-green-700' : ''}
                              ${item.status === 'pending' ? 'bg-orange-50 text-orange-700' : ''}
                              ${item.status === 'overdue' ? 'bg-red-50 text-red-700' : ''}
                            `}
                          >
                            {item.status}
                          </Badge>
                        </div>
                      </Card>
                    ))}
                    {customer[tab].length === 0 && (
                      <div className="text-center text-gray-500 py-8">
                        No {tab} found
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            ))}
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
    </div>
  );
}