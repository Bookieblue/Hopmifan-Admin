import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleIcon } from "lucide-react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";

export type Activity = {
  type: "Publication" | "Event" | "Contact" | "Donation" | "Members Request" | "Sermon";
  description: string;
  amount?: number;
  date: string;
  status: "completed" | "pending" | "upcoming";
  reference: string;
}

interface RecentActivityProps {
  activities?: Activity[];
  title?: string;
}

async function fetchRecentActivities(): Promise<Activity[]> {
  // This should be replaced with actual API calls to different endpoints
  const activities: Activity[] = [
    // Donations
    {
      type: "Donation",
      description: "New donation received",
      amount: 50000,
      date: new Date().toISOString(),
      status: "completed",
      reference: "DON001"
    },
    // Prayer Requests
    {
      type: "Contact",
      description: "New prayer request submitted",
      date: new Date().toISOString(),
      status: "pending",
      reference: "PR001"
    },
    // Member Requests
    {
      type: "Members Request",
      description: "New membership application",
      date: new Date().toISOString(),
      status: "pending",
      reference: "MEM001"
    },
    // Events
    {
      type: "Event",
      description: "Youth Conference registration",
      date: new Date().toISOString(),
      status: "upcoming",
      reference: "EVT001"
    },
    // Sermons
    {
      type: "Sermon",
      description: "New sermon uploaded",
      date: new Date().toISOString(),
      status: "completed",
      reference: "SER001"
    }
  ];

  return activities;
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

export function RecentActivity({ title = "Recent Activity" }: RecentActivityProps) {
  const { data: activities = [], isLoading } = useQuery({
    queryKey: ['recent-activities'],
    queryFn: fetchRecentActivities,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
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
                    </div>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className="font-medium">{activity.type}</div>
                  {activity.amount && (
                    <div className="text-sm text-muted-foreground">
                      ₦{activity.amount.toLocaleString()}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </span>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {format(new Date(activity.date), 'dd/MM/yyyy')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}