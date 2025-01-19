import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface DonationDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  donation: {
    donorName: string;
    firstName: string;
    lastName: string;
    amount: string;
    date: string;
    givingType: string;
    phone: string;
    email: string;
    country: string;
    state: string;
    paymentMethod: string;
  } | null;
}

export function DonationDetailsModal({
  open,
  onOpenChange,
  donation,
}: DonationDetailsModalProps) {
  if (!donation) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Donation Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-1">Name</h3>
              <p>{donation.firstName} {donation.lastName}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Email</h3>
              <p>{donation.email}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Phone</h3>
              <p>{donation.phone}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Location</h3>
              <p>{donation.country}, {donation.state}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Amount</h3>
              <p>{donation.amount}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Date</h3>
              <p>{donation.date}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Giving Type</h3>
              <p>{donation.givingType}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Payment Method</h3>
              <p>{donation.paymentMethod}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}