import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const ReceiptListHeader = () => {
  return (
    <div className="flex items-center justify-between gap-2 mb-6 w-full">
      <h1 className="text-2xl font-bold">Receipts</h1>
      <Link to="/receipts/create">
        <Button size="default" className="bg-blue-600 hover:bg-blue-700 px-3 md:px-4">
          <Plus className="h-4 w-4 mr-2" />
          New Receipt
        </Button>
      </Link>
    </div>
  );
};