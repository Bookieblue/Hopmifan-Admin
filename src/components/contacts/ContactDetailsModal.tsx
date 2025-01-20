import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    cityState: string;
    preferredContact: string;
    message: string;
    dateSubmitted: string;
    status: string;
  } | null;
  onStatusChange: (status: string) => void;
}

export function ContactDetailsModal({
  open,
  onOpenChange,
  contact,
  onStatusChange,
}: ContactDetailsModalProps) {
  const { toast } = useToast();

  const handleStatusChange = () => {
    onStatusChange('replied');
    toast({
      description: "Contact marked as replied"
    });
  };

  if (!contact) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px] h-[80vh] flex flex-col">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>Contact Details</DialogTitle>
          <DialogDescription>View contact message details and information</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Full Name</h3>
                <p className="text-base text-gray-900">{contact.firstName} {contact.lastName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                <p className="text-base text-gray-900 break-words">{contact.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Phone</h3>
                <p className="text-base text-gray-900">{contact.phone}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Location</h3>
                <p className="text-base text-gray-900">{contact.country}, {contact.cityState}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Preferred Contact</h3>
                <p className="text-base text-gray-900 capitalize">{contact.preferredContact}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Date Submitted</h3>
                <p className="text-base text-gray-900">{contact.dateSubmitted}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Message</h3>
              <p className="text-base text-gray-900 whitespace-pre-wrap break-words">{contact.message}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center px-6 py-4 border-t bg-white">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              contact.status === 'replied' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {contact.status === 'replied' ? 'Replied' : 'Pending'}
            </span>
          </div>
          {contact.status === 'pending' && (
            <Button onClick={handleStatusChange} className="bg-green-600 hover:bg-green-700">
              <Check className="h-4 w-4 mr-2" />
              Mark as Replied
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}