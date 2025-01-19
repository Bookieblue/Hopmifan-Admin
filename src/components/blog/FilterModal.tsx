import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface FilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  authorFilter: string;
  setAuthorFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  dateFilter: string;
  setDateFilter: (value: string) => void;
  uniqueAuthors: string[];
}

export function FilterModal({
  open,
  onOpenChange,
  authorFilter,
  setAuthorFilter,
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
  uniqueAuthors,
}: FilterModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Blog Posts</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Select value={authorFilter} onValueChange={setAuthorFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Author" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Authors</SelectItem>
                {uniqueAuthors.map((author) => (
                  <SelectItem key={author} value={author}>{author}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="h-10"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}