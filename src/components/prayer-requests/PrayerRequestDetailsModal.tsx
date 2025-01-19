import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PrayerRequestDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: any;
  onStatusChange: (status: string) => void;
}

export function PrayerRequestDetailsModal({
  open,
  onOpenChange,
  request,
  onStatusChange,
}: PrayerRequestDetailsModalProps) {
  if (!request) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Prayer Request Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-500">Name</h3>
              <p>{`${request.firstName} ${request.lastName}`}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-500">Status</h3>
              <Badge variant={request.status === 'prayed' ? 'default' : 'secondary'}>
                {request.status === 'prayed' ? 'Prayed' : 'Pending'}
              </Badge>
            </div>
            <div>
              <h3 className="font-medium text-gray-500">Email</h3>
              <p>{request.email}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-500">Phone</h3>
              <p>{request.phone}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-500">Location</h3>
              <p>{`${request.cityState}, ${request.country}`}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-500">Preferred Contact</h3>
              <p className="capitalize">{request.preferredContact}</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-500 mb-2">Prayer Request</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{request.prayerRequest}</p>
          </div>

          <div>
            <h3 className="font-medium text-gray-500 mb-2">Date Submitted</h3>
            <p>{request.dateSubmitted}</p>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
            <Button
              onClick={() => onStatusChange(request.status === 'prayed' ? 'pending' : 'prayed')}
            >
              Mark as {request.status === 'prayed' ? 'Pending' : 'Prayed'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}