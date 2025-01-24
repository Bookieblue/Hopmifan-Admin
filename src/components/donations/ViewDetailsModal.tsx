import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Donation {
  id: string;
  donor: string;
  amount: number;
  date: string;
  status: "completed" | "pending";
  paymentMethod: string;
  reference: string;
}

interface ViewDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  donation: Donation;
}

export function ViewDetailsModal({ open, onOpenChange, donation }: ViewDetailsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Donation Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Donor</p>
              <p className="text-sm">{donation.donor}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Amount</p>
              <p className="text-sm">${donation.amount.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Date</p>
              <p className="text-sm">{donation.date}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <p className="text-sm">{donation.status}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Payment Method</p>
              <p className="text-sm">{donation.paymentMethod}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Reference</p>
              <p className="text-sm">{donation.reference}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}