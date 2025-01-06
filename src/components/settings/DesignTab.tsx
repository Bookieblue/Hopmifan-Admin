import { Input } from "@/components/ui/input";
import { DocumentTypeSelector } from "./DocumentTypeSelector";
import { TemplatePreview } from "./TemplatePreview";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DesignTabProps {
  selectedDocument: string;
  onDocumentChange: (value: string) => void;
  colors: {
    brand: string;
    text: string;
    background: string;
  };
  onColorChange: (type: 'brand' | 'text' | 'background', value: string) => void;
  selectedTemplate?: string;
  onTemplateChange?: (template: string) => void;
  selectedFont?: string;
  onFontChange?: (font: string) => void;
}

export const DesignTab = ({ 
  selectedDocument, 
  onDocumentChange, 
  colors, 
  onColorChange,
  selectedTemplate = 'classic',
  onTemplateChange = () => {},
  selectedFont = 'inter',
  onFontChange = () => {}
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

  const fonts = [
    { id: 'inter', name: 'Inter' },
    { id: 'roboto', name: 'Roboto' },
    { id: 'poppins', name: 'Poppins' },
    { id: 'opensans', name: 'Open Sans' }
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Brand Color</Label>
          <div className="flex items-center gap-4">
            <div 
              className="h-24 w-24 rounded-lg border"
              style={{ backgroundColor: colors.brand }}
            />
            <Input
              type="color"
              value={colors.brand}
              onChange={(e) => onColorChange('brand', e.target.value)}
              className="h-12 w-24 p-1 cursor-pointer"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Text Color</Label>
          <div className="flex items-center gap-4">
            <div 
              className="h-24 w-24 rounded-lg border"
              style={{ backgroundColor: colors.text }}
            />
            <Input
              type="color"
              value={colors.text}
              onChange={(e) => onColorChange('text', e.target.value)}
              className="h-12 w-24 p-1 cursor-pointer"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Background Color</Label>
          <div className="flex items-center gap-4">
            <div 
              className="h-24 w-24 rounded-lg border"
              style={{ backgroundColor: colors.background }}
            />
            <Input
              type="color"
              value={colors.background}
              onChange={(e) => onColorChange('background', e.target.value)}
              className="h-12 w-24 p-1 cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Template Font</Label>
        <Select value={selectedFont} onValueChange={onFontChange}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            {fonts.map((font) => (
              <SelectItem key={font.id} value={font.id}>
                {font.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};