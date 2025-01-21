import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    cityState: string;
    preferredContact?: string;
    message?: string;
    prayerRequest?: string;
    eventName?: string;
    dateSubmitted: string;
    status: string;
  } | null;
  onStatusChange: (status: string) => void;
  statusLabels?: {
    pending: string;
    completed: string;
    buttonText: string;
  };
}

export function DetailsModal({
  open,
  onOpenChange,
  title,
  data,
  onStatusChange,
  statusLabels = {
    pending: 'Pending',
    completed: 'Replied',
    buttonText: 'Mark as Replied'
  }
}: DetailsModalProps) {
  const { toast } = useToast();

  const handleStatusChange = () => {
    onStatusChange('replied');
    toast({
      description: `${title} marked as ${statusLabels.completed.toLowerCase()}`
    });
  };

  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px] max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-4">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-1">Name</h3>
                <p className="text-gray-700">{data.firstName} {data.lastName}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Email</h3>
                <p className="text-gray-700 break-words">{data.email}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Phone</h3>
                <p className="text-gray-700">{data.phone}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Location</h3>
                <p className="text-gray-700">{data.country}, {data.cityState}</p>
              </div>
              {data.preferredContact && (
                <div>
                  <h3 className="font-medium mb-1">Preferred Contact</h3>
                  <p className="text-gray-700 capitalize">{data.preferredContact}</p>
                </div>
              )}
              {data.eventName && (
                <div>
                  <h3 className="font-medium mb-1">Event</h3>
                  <p className="text-gray-700">{data.eventName}</p>
                </div>
              )}
              <div>
                <h3 className="font-medium mb-1">Date Submitted</h3>
                <p className="text-gray-700">{data.dateSubmitted}</p>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">
                {data.prayerRequest ? 'Prayer Request' : data.message ? 'Message' : 'Details'}
              </h3>
              <p className="text-gray-700 whitespace-pre-wrap break-words">
                {data.prayerRequest || data.message}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4 pt-4 border-t bg-white">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs ${
              data.status === 'replied' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {data.status === 'replied' ? statusLabels.completed : statusLabels.pending}
            </span>
          </div>
          {data.status === 'pending' && (
            <Button onClick={handleStatusChange} className="bg-green-600 hover:bg-green-700">
              <Check className="h-4 w-4 mr-2" />
              {statusLabels.buttonText}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}