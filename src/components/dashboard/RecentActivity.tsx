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

interface ActivityItem {
  type: string;
  description: string;
  amount: number;
  date: string;
  status?: "pending" | "completed" | "failed";
  reference?: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
  title: string;
}

export function RecentActivity({ activities, title }: RecentActivityProps) {
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

  return (
    <Card className="space-y-6 p-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reference ID</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {activity.reference || `REF${Math.random().toString(36).substr(2, 9)}`}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <CircleIcon className="h-2 w-2 text-gray-500" />
                    <div>
                      <div className="font-medium">{activity.type}</div>
                      <div className="text-sm text-muted-foreground">{activity.description}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                    {activity.status || 'completed'}
                  </span>
                </TableCell>
                <TableCell>{activity.date}</TableCell>
                <TableCell className="text-right">
                  <div className="font-semibold">₦{activity.amount.toLocaleString()}</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}