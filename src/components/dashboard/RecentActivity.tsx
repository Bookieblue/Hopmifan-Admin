import { CircleIcon } from "lucide-react";

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
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center justify-between py-4 border-b last:border-0">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CircleIcon className="h-4 w-4 text-gray-500" />
                <h4 className="font-medium">{activity.type}</h4>
              </div>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">₦{activity.amount.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">{activity.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}