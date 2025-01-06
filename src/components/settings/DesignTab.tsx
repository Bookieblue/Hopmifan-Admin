import { DocumentTypeSelector } from "./DocumentTypeSelector";
import { TemplatePreview } from "./TemplatePreview";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Grid } from "@/components/ui/grid";
import { ColorPicker } from "./ColorPicker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    toast({
      title: "Success",
      description: "Design settings saved successfully",
    });
  };

  const templates = [
    {
      id: 'modern',
      title: 'Modern',
      description: 'Clean and contemporary design with a focus on typography and whitespace',
    },
    {
      id: 'classic',
      title: 'Classic',
      description: 'Traditional business layout with a professional appearance',
    },
    {
      id: 'minimal',
      title: 'Minimal',
      description: 'Simplified design that emphasizes content and readability',
    },
    {
      id: 'professional',
      title: 'Professional Quote',
      description: 'Detailed quote template with comprehensive project breakdown',
    },
  ];

  return (
    <div className="space-y-6">
      <DocumentTypeSelector
        selectedDocument={selectedDocument}
        onDocumentChange={onDocumentChange}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {templates.map((template) => (
          <TemplatePreview
            key={template.id}
            template={template.id}
            onClick={() => onTemplateChange(template.id)}
            isSelected={selectedTemplate === template.id}
            title={template.title}
            description={template.description}
          />
        ))}
      </div>

      <div className="space-y-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Brand Color</h3>
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-lg border"
                style={{ backgroundColor: colors.brand }}
              />
              <input
                type="color"
                value={colors.brand}
                onChange={(e) => onColorChange('brand', e.target.value)}
                className="h-10"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Text Color</h3>
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-lg border"
                style={{ backgroundColor: colors.text }}
              />
              <input
                type="color"
                value={colors.text}
                onChange={(e) => onColorChange('text', e.target.value)}
                className="h-10"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Background Color</h3>
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-lg border"
                style={{ backgroundColor: colors.background }}
              />
              <input
                type="color"
                value={colors.background}
                onChange={(e) => onColorChange('background', e.target.value)}
                className="h-10"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Template Font</h3>
          <Select value={selectedFont} onValueChange={onFontChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inter">Inter</SelectItem>
              <SelectItem value="roboto">Roboto</SelectItem>
              <SelectItem value="poppins">Poppins</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};