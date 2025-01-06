import { DocumentTypeSelector } from "./DocumentTypeSelector";
import { TemplatePreview } from "./TemplatePreview";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface DesignTabProps {
  selectedDocument: string;
  onDocumentChange: (value: string) => void;
  selectedTemplate: string;
  onTemplateChange: (value: string) => void;
  colors: {
    brand: string;
    text: string;
    background: string;
  };
  onColorChange: (type: 'brand' | 'text' | 'background', value: string) => void;
  selectedFont: string;
  onFontChange: (value: string) => void;
}

export const DesignTab = ({
  selectedDocument,
  onDocumentChange,
  selectedTemplate,
  onTemplateChange,
  colors,
  onColorChange,
  selectedFont,
  onFontChange,
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
        template={selectedTemplate}
        onClick={() => onTemplateChange(selectedTemplate)}
        isSelected={true}
        title={selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)}
        description={`${selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)} template style`}
      />
      <div className="flex justify-end mt-6">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};