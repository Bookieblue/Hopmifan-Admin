import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function EditSermon() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Sermon</h1>
      {/* TODO: Implement sermon editing form */}
      <p>Sermon editing form coming soon...</p>
    </div>
  );
}