import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PrayerRequestDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    cityState: string;
    preferredContact: string;
    prayerRequest: string;
    dateSubmitted: string;
    status: string;
  } | null;
  onStatusChange: (status: string) => void;
}

export function PrayerRequestDetailsModal({
  open,
  onOpenChange,
  request,
  onStatusChange,
}: PrayerRequestDetailsModalProps) {
  const { toast } = useToast();

  const handleStatusChange = () => {
    onStatusChange('replied');
    toast({
      description: "Prayer request marked as replied"
    });
  };

  if (!request) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Prayer Request Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-1">Name</h3>
              <p>{request.firstName} {request.lastName}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Email</h3>
              <p>{request.email}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Phone</h3>
              <p>{request.phone}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Location</h3>
              <p>{request.country}, {request.cityState}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Preferred Contact</h3>
              <p className="capitalize">{request.preferredContact}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Date Submitted</h3>
              <p>{request.dateSubmitted}</p>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Prayer Request</h3>
            <p className="text-gray-600 whitespace-pre-wrap">{request.prayerRequest}</p>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs ${
                request.status === 'replied' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {request.status === 'replied' ? 'Replied' : 'Pending'}
              </span>
            </div>
            {request.status === 'pending' && (
              <Button onClick={handleStatusChange} className="bg-green-600 hover:bg-green-700">
                <Check className="h-4 w-4 mr-2" />
                Mark as Replied
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}