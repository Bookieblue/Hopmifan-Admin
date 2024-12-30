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
}

interface RecentActivityProps {
  activities: ActivityItem[];
  title: string;
}

export function RecentActivity({ activities, title }: RecentActivityProps) {
  return (
    <Card className="space-y-6 p-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60%]">Details</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <CircleIcon className="h-2 w-2 text-gray-500" />
                    <div>
                      <div className="font-medium">{activity.type}</div>
                      <div className="text-sm text-muted-foreground">{activity.description}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="font-semibold">₦{activity.amount.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">{activity.date}</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}