import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";

export default function EditCustomer() {
  const { id } = useParams();

  return (
    <div className="container mx-auto p-6">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">Edit Customer</h1>
        <p>Editing customer ID: {id}</p>
        {/* TODO: Add full edit form implementation */}
      </Card>
    </div>
  );
}