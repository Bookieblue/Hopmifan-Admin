import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ShareModal } from "@/components/modals/ShareModal";

const ViewEstimate = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [estimate, setEstimate] = useState<any>(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  useEffect(() => {
    // Fetch estimate data based on the ID
    const fetchEstimate = async () => {
      // Replace with your API call
      const response = await fetch(`/api/estimates/${id}`);
      const data = await response.json();
      setEstimate(data);
    };

    fetchEstimate();
  }, [id]);

  const handleShare = () => {
    setShareDialogOpen(true);
  };

  const printOptions = {
    documentTitle: `Estimate-${estimate?.id}`,
    onBeforePrint: () => console.log('Before printing...'),
    onAfterPrint: () => console.log('After printing...'),
    removeAfterPrint: true
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">View Estimate</h1>
      {estimate ? (
        <div>
          <h2 className="text-xl">{estimate.title}</h2>
          <p>{estimate.description}</p>
          <p>Amount: {estimate.amount}</p>
          <Button onClick={handleShare}>Share</Button>
          <Button onClick={() => window.print()}>Print</Button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <ShareModal open={shareDialogOpen} onOpenChange={setShareDialogOpen} estimateId={id} />
    </div>
  );
};

export default ViewEstimate;
