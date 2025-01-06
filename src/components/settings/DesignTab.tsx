import { Input } from "@/components/ui/input";
import { DocumentTypeSelector } from "./DocumentTypeSelector";
import { TemplatePreview } from "./TemplatePreview";

interface DesignTabProps {
  selectedDocument: string;
  onDocumentChange: (value: string) => void;
  colors: {
    brand: string;
    accent: string;
  };
  onColorChange: (type: 'brand' | 'accent', value: string) => void;
  selectedTemplate?: string;
  onTemplateChange?: (template: string) => void;
}

export const DesignTab = ({ 
  selectedDocument, 
  onDocumentChange, 
  colors, 
  onColorChange,
  selectedTemplate = 'classic',
  onTemplateChange = () => {}
}: DesignTabProps) => {
  const templates = [
    {
      id: 'modern',
      title: 'Modern',
      description: 'Clean and contemporary design with a focus on typography and whitespace'
    },
    {
      id: 'classic',
      title: 'Classic',
      description: 'Traditional business layout with a professional appearance'
    },
    {
      id: 'minimal',
      title: 'Minimal',
      description: 'Simplified design that emphasizes content and readability'
    },
    {
      id: 'professional',
      title: 'Professional Quote',
      description: 'Detailed quote template with comprehensive project breakdown'
    }
  ];

  return (
    <div className="space-y-6">
      <DocumentTypeSelector 
        selectedDocument={selectedDocument}
        onDocumentChange={onDocumentChange}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Brand Color</label>
          <div className="flex items-center gap-4">
            <div 
              className="h-24 w-24 rounded-lg border"
              style={{ backgroundColor: colors.brand }}
            ></div>
            <Input
              type="color"
              value={colors.brand}
              onChange={(e) => onColorChange('brand', e.target.value)}
              className="h-12 w-24 p-1 cursor-pointer"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Accent Color</label>
          <div className="flex items-center gap-4">
            <div 
              className="h-24 w-24 rounded-lg border"
              style={{ backgroundColor: colors.accent }}
            ></div>
            <Input
              type="color"
              value={colors.accent}
              onChange={(e) => onColorChange('accent', e.target.value)}
              className="h-12 w-24 p-1 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};