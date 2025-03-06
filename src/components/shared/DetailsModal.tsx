import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "../utils/formatDate";


interface DetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  data: {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    country?: string;
    cityAndState?: string;
    methodOfContact?: string;
    areaOfInterest?: string;
    createdAt?: string;
    status?: string;
    [key: string]: any;
  } | null;
  onStatusChange: (id: string, status: string) => void;
  statusLabels: {
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
  statusLabels,
}: DetailsModalProps) {
  const { toast } = useToast();

  const handleStatusChange = () => {
    if (data?.id) {
      onStatusChange(data.id, 'completed');
      toast({
        description: `${title} marked as ${statusLabels.completed.toLowerCase()}`
      });
    }
  };

  if (!data) return null;


   console.log('dta', data)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px] max-h-[90vh] flex flex-col overflow-hidden sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>View and manage details</DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-4">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.firstName && data.lastName && (
                <div>
                  <h3 className="font-medium mb-1">Name</h3>
                  <p className="text-gray-700">{data.firstName} {data.lastName}</p>
                </div>
              )}
              {data.email && (
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <p className="text-gray-700 break-words">{data.email}</p>
                </div>
              )}
              {data.phoneNumber && (
                <div>
                  <h3 className="font-medium mb-1">Phone</h3>
                  <p className="text-gray-700">{data.phoneNumber}</p>
                </div>
              )}
              {data.country && data.cityAndState && (
                <div>
                  <h3 className="font-medium mb-1">Location</h3>
                  <p className="text-gray-700">{data.country}, {data.cityAndState}</p>
                </div>
              )}
              {data.methodOfContact && (
                <div>
                  <h3 className="font-medium mb-1">Preferred Contact</h3>
                  <p className="text-gray-700 capitalize">{data.methodOfContact}</p>
                </div>
              )}
              {data.createdAt && (
                <div>
                  <h3 className="font-medium mb-1">Date Submitted</h3>
                  <p className="text-gray-700">
  {data.createdAt ? formatDate(data.createdAt) : "N/A"}
</p>

                </div>
              )}
            </div>
            {data.areaOfInterest && (
              <div>
                <h3 className="font-medium mb-2">Area of Interest</h3>
                <p className="text-gray-700 whitespace-pre-wrap break-words">{data.areaOfInterest}</p>
              </div>
            )}

           {data.prayerRequest && (
              <div>
                <h3 className="font-medium mb-2">Prayer Request</h3>
                <p className="text-gray-700 whitespace-pre-wrap break-words">{data.prayerRequest}</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center mt-4 pt-4 border-t sticky bottom-0 bg-white">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs ${
              data.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {data.status === 'completed' ? statusLabels.completed : statusLabels.pending}
            </span>
          </div>
          {data.status !== 'completed' && (
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