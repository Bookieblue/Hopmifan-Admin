import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function ViewSermon() {
  const { id } = useParams();
  const { toast } = useToast();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">View Sermon</h1>
      {/* TODO: Implement sermon view page */}
      <p>Sermon view page coming soon...</p>
    </div>
  );
}