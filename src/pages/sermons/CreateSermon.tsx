import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function CreateSermon() {
  const navigate = useNavigate();
  const { toast } = useToast();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Sermon</h1>
      {/* TODO: Implement sermon creation form */}
      <p>Sermon creation form coming soon...</p>
    </div>
  );
}