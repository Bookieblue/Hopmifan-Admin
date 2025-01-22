import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-brand">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700">Page Not Found</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button 
          onClick={() => navigate("/home")}
          className="mt-4"
        >
          Return Home
        </Button>
      </div>
    </div>
  );
}