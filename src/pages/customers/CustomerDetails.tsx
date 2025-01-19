import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";

export default function CustomerDetails() {
  const { id } = useParams();

  return (
    <div className="container mx-auto p-6">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">Customer Details</h1>
        <p>Customer ID: {id}</p>
        {/* TODO: Add full customer details implementation */}
      </Card>
    </div>
  );
}