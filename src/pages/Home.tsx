import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-4">
      <h1 className="text-4xl font-bold text-gray-900">Welcome to Church Admin</h1>
      <p className="text-gray-600 text-center max-w-md">
        Manage your church's books, donations, and payments all in one place.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link to="/payments">View Payments</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/about">Learn More</Link>
        </Button>
      </div>
    </div>
  );
}