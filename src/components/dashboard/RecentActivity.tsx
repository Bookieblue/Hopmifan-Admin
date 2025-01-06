import { CircleIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";

interface ActivityItem {
  type: string;
  description: string;
  amount: number;
  date: string;
  status?: "pending" | "completed" | "failed";
  reference?: string;
  customer: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
  title: string;
}

export function RecentActivity({ activities, title }: RecentActivityProps) {
  const isMobile = useIsMobile();

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50";
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      case "failed":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  };

  return (
    <Card className="p-2.5 md:p-6 space-y-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-0 md:pl-4">Details</TableHead>
                <TableHead className="pr-0 md:pr-4">Amount</TableHead>
                <TableHead className="hidden md:table-cell">Reference ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity, index) => (
                <TableRow key={index}>
                  <TableCell className="pl-0 md:pl-4 max-w-[200px]">
                    <div className="flex items-center gap-2">
                      <CircleIcon className="h-2 w-2 text-gray-500 flex-shrink-0" />
                      <div className="truncate">
                        <div className="font-medium truncate">{activity.type}</div>
                        <div className="text-sm text-muted-foreground truncate">
                          {activity.customer} on {formatDate(activity.date)}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="pr-0 md:pr-4 whitespace-nowrap">
                    <div className="font-semibold">₦{activity.amount.toLocaleString()}</div>
                    <span className={`mt-1 inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                      {activity.status || 'completed'}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell font-medium">
                    {activity.reference || `REF${Math.random().toString(36).substr(2, 9)}`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
}