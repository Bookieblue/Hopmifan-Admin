import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { 
  Copy, 
  Mail, 
  Link2, 
  Download,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Instagram,
  Telegram
} from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoiceId?: string;
  estimateId?: string;
  receiptId?: string;
}

export function ShareModal({ open, onOpenChange, invoiceId, estimateId, receiptId }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const id = invoiceId || estimateId || receiptId;
  const type = invoiceId ? 'invoices' : estimateId ? 'estimates' : 'receipts';
  const shareUrl = `${window.location.origin}/${type}/${id}/preview`;

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
    const subject = `${type.charAt(0).toUpperCase() + type.slice(1, -1)} ${id}`;
    const body = `View ${type.slice(0, -1)} here: ${shareUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleDownload = (format: 'pdf' | 'jpg') => {
    toast({
      title: `Downloading as ${format.toUpperCase()}`,
      description: "Your download will begin shortly",
    });
    // Simulating download - in real app, replace with actual download logic
    const element = document.createElement('a');
    element.href = '#';
    element.download = `${type.slice(0, -1)}-${id}.${format}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSocialShare = (platform: string) => {
    let shareLink = '';
    const text = encodeURIComponent(`Check out this ${type.slice(0, -1)}`);
    const url = encodeURIComponent(shareUrl);

    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${text}%20${url}`;
        break;
      case 'instagram':
        toast({
          title: "Instagram Sharing",
          description: "Copy the link and share it on Instagram",
        });
        return;
      case 'telegram':
        shareLink = `https://t.me/share/url?url=${url}&text=${text}`;
        break;
    }

    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share {type.slice(0, -1)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex flex-col space-y-2">
            <Input
              value={shareUrl}
              readOnly
              className="flex-1"
            />
            <Button
              variant="outline"
              className="w-full"
              onClick={handleEmailShare}
            >
              <Mail className="mr-2 h-4 w-4" />
              Share via Email
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleDownload('pdf')}
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleDownload('jpg')}
            >
              <Download className="mr-2 h-4 w-4" />
              Download JPG
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSocialShare('facebook')}
            >
              <Facebook className="h-4 w-4 mr-2" />
              Facebook
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSocialShare('twitter')}
            >
              <Twitter className="h-4 w-4 mr-2" />
              Twitter
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSocialShare('linkedin')}
            >
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSocialShare('whatsapp')}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSocialShare('instagram')}
            >
              <Instagram className="h-4 w-4 mr-2" />
              Instagram
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSocialShare('telegram')}
            >
              <Telegram className="h-4 w-4 mr-2" />
              Telegram
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}