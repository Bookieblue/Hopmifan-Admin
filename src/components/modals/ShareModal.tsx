import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoiceId?: string;
  estimateId?: string;
  receiptId?: string;
  blogId?: string;
}

export function ShareModal({ 
  open, 
  onOpenChange,
  invoiceId,
  estimateId,
  receiptId,
  blogId
}: ShareModalProps) {
  const [email, setEmail] = useState("");

  const handleShare = () => {
    // Get the appropriate ID based on what's being shared
    const id = invoiceId || estimateId || receiptId || blogId;
    const type = invoiceId ? 'invoice' : 
                estimateId ? 'estimate' : 
                receiptId ? 'receipt' : 
                'blog';

    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    // Here you would typically make an API call to share the document
    console.log(`Sharing ${type} ${id} with ${email}`);
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} shared successfully`);
    onOpenChange(false);
    setEmail("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
          <DialogDescription>
            Share this document via email
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            type="email"
            placeholder="Enter recipient's email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleShare}>Share</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}