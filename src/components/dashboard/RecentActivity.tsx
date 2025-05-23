import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleIcon, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";

export type Activity = {
  type: "Prayer Request" | "Event Registration" | "Contact" | "Donation" | "Book Sale" | "Membership" | "Publication" | "Event" | "Sermon";
  description: string;
  amount?: number;
  date: string;
  status: "completed" | "pending" | "upcoming" | "confirmed";
  reference: string;
}

interface RecentActivityProps {
  activities?: Activity[];
  title?: string;
  className?: string;
  titleClassName?: string;
}

const getStatusColor = (status: "completed" | "pending" | "upcoming" | "confirmed") => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "upcoming":
      return "bg-blue-100 text-blue-800";
    case "confirmed":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getActivityPath = (activity: Activity) => {
  switch (activity.type) {
    case "Publication":
      return "/articles";
    case "Event":
      return "/events";
    case "Contact":
      return "/contacts";
    case "Donation":
      return "/donations";
    case "Membership":
      return "/new-members";
    case "Sermon":
      return "/sermons";
    case "Prayer Request":
      return "/prayer-requests";
    case "Event Registration":
      return "/events/registered";
    case "Book Sale":
      return "/bookstore";
    default:
      return "/404";
  }
};

const formatActivityType = (activity: Activity) => {
  if (activity.amount) {
    return `${activity.type}: ₦${activity.amount.toLocaleString()}`;
  }
  return activity.type;
};

export function RecentActivity({ 
  activities = [], 
  title = "Recent Activity",
  className,
  titleClassName
}: RecentActivityProps) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleActivityClick = (activity: Activity) => {
    const path = getActivityPath(activity);
    navigate(path);
  };

  if (isMobile) {
    return (
      <div className="space-y-2 mx-2">
        <h2 className={cn("text-[18px] font-semibold", titleClassName)}>{title}</h2>
        {activities.map((activity, index) => (
          <div 
            key={index} 
            className="py-4 border-b last:border-b-0 cursor-pointer"
            onClick={() => handleActivityClick(activity)}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <CircleIcon className="h-2 w-2 text-gray-500 flex-shrink-0" />
                    <h3 className="font-semibold text-left mb-2 line-clamp-2">{activity.description}</h3>
                  </div>
                  <div className="text-sm text-muted-foreground text-left space-y-1">
                    <p className="truncate">{formatActivityType(activity)}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span>{format(new Date(activity.date), 'dd/MM/yyyy')}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-1 pt-4 px-4">
        <CardTitle className={cn("text-[18px]", titleClassName)}>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
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
              <TableRow 
                key={index}
                className="cursor-pointer"
                onClick={() => handleActivityClick(activity)}
              >
                <TableCell className="pl-0 md:pl-4">
                  <div className="flex items-center gap-2">
                    <CircleIcon className="h-2 w-2 text-gray-500 flex-shrink-0" />
                    <div>
                      <div className="font-medium">{activity.description}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className="font-medium">{formatActivityType(activity)}</div>
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
