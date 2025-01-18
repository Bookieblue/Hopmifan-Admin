import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleIcon } from "lucide-react";

export type Activity = {
  type: "Publication" | "Event" | "Contact" | "Donation" | "Membership" | "Sermon";
  description: string;
  amount?: number;
  date: string;
  status: "completed" | "pending" | "upcoming";
  reference: string;
  member?: string;
}

interface RecentActivityProps {
  activities: Activity[];
  title?: string;
}

const getStatusColor = (status: "completed" | "pending" | "upcoming") => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "upcoming":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function RecentActivity({ activities, title = "Recent Activity" }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-0 md:pl-4">Details</TableHead>
              <TableHead className="pr-0 md:pr-4">Type</TableHead>
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
                      <div className="font-medium">{activity.description}</div>
                      <div className="text-sm text-muted-foreground">{activity.date}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="pr-0 md:pr-4 whitespace-nowrap">
                  <div className="font-medium">{activity.type}</div>
                  {activity.amount && (
                    <div className="text-sm text-muted-foreground">
                      ₦{activity.amount.toLocaleString()}
                    </div>
                  )}
                  <span className={`mt-1 inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </span>
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">
                  {activity.reference}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}