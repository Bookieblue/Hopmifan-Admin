import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Trash2, Search } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { InvoiceStatusSelect, type InvoiceStatus } from "@/components/invoices/InvoiceStatusSelect";

const currencies = [
  { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
];

const mockCustomers = [
  { id: "1", name: "Acme Corp", email: "contact@acme.com" },
  { id: "2", name: "TechStart", email: "info@techstart.com" },
];

export default function EditInvoice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCurrency, setSelectedCurrency] = useState("NGN");
  const [customerSearch, setCustomerSearch] = useState("");
  const [showNewCustomerModal, setShowNewCustomerModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState<InvoiceStatus>("pending");

  // Mock data for demonstration - in a real app, fetch this from your backend
  const [invoice, setInvoice] = useState({
    number: id,
    date: "2024-01-01",
    currency: "NGN",
    customer: mockCustomers[0],
    items: [
      {
        description: "Service",
        quantity: 1,
        price: 1000,
        amount: 1000
      }
    ],
    notes: "Thank you for your business",
    terms: "Net 30"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to update the invoice
    toast({
      title: "Success",
      description: "Invoice updated successfully",
    });
    navigate("/invoices");
  };

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
    customer.email.toLowerCase().includes(customerSearch.toLowerCase())
  );

  const handleAddCustomer = () => {
    toast({
      title: "Customer added",
      description: "New customer has been added successfully.",
    });
    setShowNewCustomerModal(false);
    setNewCustomer({ name: "", email: "", phone: "" });
  };

  return (
    <div className="p-6 max-w-[1000px] mx-auto">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link to="/invoices">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold">Edit Invoice #{id}</h1>
        </div>
        <InvoiceStatusSelect 
          status={status} 
          onStatusChange={(newStatus) => {
            setStatus(newStatus);
            toast.success(`Invoice status updated to ${newStatus}`);
          }}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="number">Number</Label>
                <Input 
                  id="number" 
                  value={invoice.number} 
                  onChange={(e) => setInvoice({...invoice, number: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input 
                  id="date" 
                  type="date" 
                  value={invoice.date}
                  onChange={(e) => setInvoice({...invoice, date: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Currency</Label>
                <Select 
                  value={selectedCurrency} 
                  onValueChange={(value) => {
                    setSelectedCurrency(value);
                    setInvoice({...invoice, currency: value});
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.symbol} - {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Customer</Label>
                <div className="space-y-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input
                      placeholder="Search customers..."
                      value={customerSearch}
                      onChange={(e) => setCustomerSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {customerSearch && (
                    <Card>
                      <CardContent className="p-2">
                        {filteredCustomers.map((customer) => (
                          <Button
                            key={customer.id}
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => {
                              setInvoice({...invoice, customer});
                              setCustomerSearch("");
                            }}
                          >
                            <div className="text-left">
                              <div>{customer.name}</div>
                              <div className="text-sm text-gray-500">{customer.email}</div>
                            </div>
                          </Button>
                        ))}
                        <Button
                          variant="outline"
                          className="w-full mt-2"
                          onClick={() => setShowNewCustomerModal(true)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add New Customer
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Items</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-5">
                    <Label>Description</Label>
                  </div>
                  <div className="col-span-2">
                    <Label>Quantity</Label>
                  </div>
                  <div className="col-span-2">
                    <Label>Price</Label>
                  </div>
                  <div className="col-span-2">
                    <Label>Amount</Label>
                  </div>
                </div>

                {invoice.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-5">
                      <Input 
                        value={item.description}
                        onChange={(e) => {
                          const newItems = [...invoice.items];
                          newItems[index].description = e.target.value;
                          setInvoice({...invoice, items: newItems});
                        }}
                      />
                    </div>
                    <div className="col-span-2">
                      <Input 
                        type="number" 
                        value={item.quantity}
                        onChange={(e) => {
                          const newItems = [...invoice.items];
                          newItems[index].quantity = Number(e.target.value);
                          newItems[index].amount = Number(e.target.value) * item.price;
                          setInvoice({...invoice, items: newItems});
                        }}
                      />
                    </div>
                    <div className="col-span-2">
                      <Input 
                        type="number" 
                        value={item.price}
                        onChange={(e) => {
                          const newItems = [...invoice.items];
                          newItems[index].price = Number(e.target.value);
                          newItems[index].amount = item.quantity * Number(e.target.value);
                          setInvoice({...invoice, items: newItems});
                        }}
                      />
                    </div>
                    <div className="col-span-2">
                      <Input type="number" value={item.amount} disabled />
                    </div>
                    <div className="col-span-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => {
                          const newItems = invoice.items.filter((_, i) => i !== index);
                          setInvoice({...invoice, items: newItems});
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                type="button"
                variant="outline" 
                className="mt-4 gap-2"
                onClick={() => {
                  setInvoice({
                    ...invoice,
                    items: [...invoice.items, { description: "", quantity: 1, price: 0, amount: 0 }]
                  });
                }}
              >
                <Plus className="w-4 h-4" />
                Add Item
              </Button>
            </div>

            <div className="mt-8 space-y-6">
              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea 
                  value={invoice.notes}
                  onChange={(e) => setInvoice({...invoice, notes: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label>Terms & Conditions</Label>
                <Textarea 
                  value={invoice.terms}
                  onChange={(e) => setInvoice({...invoice, terms: e.target.value})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => navigate("/invoices")}
          >
            Cancel
          </Button>
          <Button type="submit">Update Invoice</Button>
        </div>
      </form>

      <Dialog open={showNewCustomerModal} onOpenChange={setShowNewCustomerModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Business Name</Label>
              <Input
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                placeholder="Enter business name"
              />
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input
                type="email"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                placeholder="Enter email address"
              />
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                placeholder="Enter phone number"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowNewCustomerModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCustomer}>Add Customer</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
