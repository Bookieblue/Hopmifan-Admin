import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ContactDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: {
    id: string;
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
  onStatusChange: (id: string, status: string) => void;
}

export const ContactDetailsModal = ({
  isOpen,
  onClose,
  contact,
  onStatusChange,
}: ContactDetailsModalProps) => {
  const { toast } = useToast();

  if (!contact) return null;

  const handleStatusChange = (value: string) => {
    onStatusChange(contact.id, value);
    toast({
      description: "Contact status updated successfully",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Contact Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-1">Name</h4>
              <p>{`${contact.firstName} ${contact.lastName}`}</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Email</h4>
              <p>{contact.email}</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Phone</h4>
              <p>{contact.phone}</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Location</h4>
              <p>{`${contact.cityState}, ${contact.country}`}</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Preferred Contact</h4>
              <p className="capitalize">{contact.preferredContact}</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Date Submitted</h4>
              <p>{contact.dateSubmitted}</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Message</h4>
            <p className="text-gray-600 whitespace-pre-wrap">{contact.message}</p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Status</h4>
            <RadioGroup
              defaultValue={contact.status}
              onValueChange={handleStatusChange}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pending" id="pending" />
                <Label htmlFor="pending">Pending</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="replied" id="replied" />
                <Label htmlFor="replied">Replied</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};