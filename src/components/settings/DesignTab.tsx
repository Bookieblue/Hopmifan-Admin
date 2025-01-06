import { DocumentTypeSelector } from "./DocumentTypeSelector";
import { TemplatePreview } from "./TemplatePreview";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface DesignTabProps {
  selectedDocument: string;
  onDocumentChange: (value: string) => void;
  selectedTemplate: string;
  onTemplateChange: (value: string) => void;
}

export const DesignTab = ({
  selectedDocument,
  onDocumentChange,
  selectedTemplate,
  onTemplateChange,
}: DesignTabProps) => {
  const { toast } = useToast();

  const handleSave = () => {
    // Save logic here
    toast({
      title: "Success",
      description: "Design settings saved successfully",
    });
  };

  return (
    <div className="space-y-6">
      <DocumentTypeSelector
        selectedDocument={selectedDocument}
        onDocumentChange={onDocumentChange}
      />
      <TemplatePreview
        selectedTemplate={selectedTemplate}
        onTemplateChange={onTemplateChange}
      />
      <div className="flex justify-end mt-6">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};