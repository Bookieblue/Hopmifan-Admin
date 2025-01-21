import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EventDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  registration: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    cityState: string;
    eventName: string;
    message: string;
    dateSubmitted: string;
    status: string;
  } | null;
  onStatusChange: (status: string) => void;
}

export function EventDetailsModal({
  open,
  onOpenChange,
  registration,
  onStatusChange,
}: EventDetailsModalProps) {
  const { toast } = useToast();

  const handleStatusChange = () => {
    onStatusChange('confirmed');
    toast({
      description: "Registration marked as confirmed"
    });
  };

  if (!registration) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px] max-h-[90vh] flex flex-col overflow-hidden sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Registration Details</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-4">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-1">Name</h3>
                <p className="text-gray-700">{registration.firstName} {registration.lastName}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Email</h3>
                <p className="text-gray-700 break-words">{registration.email}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Phone</h3>
                <p className="text-gray-700">{registration.phone}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Location</h3>
                <p className="text-gray-700">{registration.country}, {registration.cityState}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Event</h3>
                <p className="text-gray-700">{registration.eventName}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Date Submitted</h3>
                <p className="text-gray-700">{registration.dateSubmitted}</p>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Message</h3>
              <p className="text-gray-700 whitespace-pre-wrap break-words">{registration.message}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4 pt-4 border-t sticky bottom-0 bg-white">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs ${
              registration.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {registration.status === 'confirmed' ? 'Confirmed' : 'Pending'}
            </span>
          </div>
          {registration.status === 'pending' && (
            <Button onClick={handleStatusChange} className="bg-green-600 hover:bg-green-700">
              <Check className="h-4 w-4 mr-2" />
              Confirm Registration
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}