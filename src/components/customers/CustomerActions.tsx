import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
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
import { CustomerForm } from "@/components/customers/CustomerForm";
import { Customer } from "@/types/customer";

interface CustomerActionsProps {
  customer: Customer;
  onCustomerUpdate: (updatedCustomer: Customer) => void;
}

export function CustomerActions({ customer, onCustomerUpdate }: CustomerActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDelete = () => {
    toast({
      title: "Customer deleted",
      description: "The customer has been successfully deleted",
    });
    navigate("/customers");
  };

  const handleEditSubmit = (data: Partial<Customer>) => {
    const updatedCustomer = {
      ...customer,
      ...data,
    };
    onCustomerUpdate(updatedCustomer as Customer);
    setShowEditDialog(false);
    toast({
      title: "Customer updated",
      description: "The customer has been successfully updated",
    });
  };

  return (
    <>
      <div className="flex gap-2 w-full">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowEditDialog(true)}
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
    </>
  );
}