import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface MemberDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    cityState: string;
    preferredContact: string;
    prayerRequest: string;
    dateSubmitted: string;
  } | null;
}

export function MemberDetailsModal({
  open,
  onOpenChange,
  member,
}: MemberDetailsModalProps) {
  if (!member) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Member Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-1">Name</h3>
              <p>{member.firstName} {member.lastName}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Email</h3>
              <p>{member.email}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Phone</h3>
              <p>{member.phone}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Location</h3>
              <p>{member.country}, {member.cityState}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Preferred Contact</h3>
              <p className="capitalize">{member.preferredContact}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Date Submitted</h3>
              <p>{member.dateSubmitted}</p>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Prayer Request</h3>
            <p className="text-gray-600 whitespace-pre-wrap">{member.prayerRequest}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}