import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ShareModal } from "@/components/modals/ShareModal";

export default function ViewEstimate() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [estimate, setEstimate] = useState<any>(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  useEffect(() => {
    // Fetch estimate data based on the ID
    const fetchEstimate = async () => {
      // Replace with your API call
      const mockEstimate = {
        id,
        title: `Estimate ${id}`,
        description: "Project estimate",
        amount: "$2,500.00",
        status: "pending"
      };
      setEstimate(mockEstimate);
    };

    fetchEstimate();
  }, [id]);

  const handleShare = () => {
    setShareDialogOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">View Estimate</h1>
      {estimate ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{estimate.title}</h2>
          <p className="text-gray-600">{estimate.description}</p>
          <p className="text-lg font-medium">Amount: {estimate.amount}</p>
          <p className="text-gray-600">Status: {estimate.status}</p>
          <div className="flex gap-4">
            <Button onClick={handleShare}>Share</Button>
            <Button onClick={() => window.print()}>Print</Button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <ShareModal 
        open={shareDialogOpen} 
        onOpenChange={setShareDialogOpen} 
        estimateId={id} 
      />
    </div>
  );
}