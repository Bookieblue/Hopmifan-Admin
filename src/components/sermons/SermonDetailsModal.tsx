import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SermonDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sermon: {
    title: string;
    speaker: string;
    date: string;
    youtubeLink: string;
    description: string;
    status: string;
  } | null;
  onStatusChange: (status: string) => void;
}

export function SermonDetailsModal({
  open,
  onOpenChange,
  sermon,
  onStatusChange,
}: SermonDetailsModalProps) {
  if (!sermon) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Sermon Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-1">Title</h3>
              <p>{sermon.title}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Speaker</h3>
              <p>{sermon.speaker}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Date</h3>
              <p>{sermon.date}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">YouTube Link</h3>
              <a 
                href={sermon.youtubeLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Sermon
              </a>
            </div>
            <div className="col-span-2">
              <h3 className="font-medium mb-1">Description</h3>
              <p>{sermon.description}</p>
            </div>
          </div>

          <div className="border-t pt-4 mt-4">
            <h3 className="font-medium mb-2">Update Status</h3>
            <div className="flex gap-4">
              <Select
                value={sermon.status}
                onValueChange={onStatusChange}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}