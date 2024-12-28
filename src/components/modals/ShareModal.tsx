import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Copy, Mail, Link2 } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoiceId: string;
}

export function ShareModal({ open, onOpenChange, invoiceId }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/invoices/${invoiceId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Link copied to clipboard",
        description: "You can now share it with others",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy link",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleEmailShare = () => {
    const subject = `Invoice ${invoiceId}`;
    const body = `View invoice here: ${shareUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Invoice</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center space-x-2">
            <Input
              value={shareUrl}
              readOnly
              className="flex-1"
            />
            <Button
              size="icon"
              variant="outline"
              onClick={handleCopyLink}
              className="shrink-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleEmailShare}
            >
              <Mail className="mr-2 h-4 w-4" />
              Share via Email
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleCopyLink}
            >
              <Link2 className="mr-2 h-4 w-4" />
              Copy Link
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}