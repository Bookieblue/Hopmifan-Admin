import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DocumentTypeSelector } from "./DocumentTypeSelector";

interface ContentTabProps {
  selectedDocument: string;
  onDocumentChange: (value: string) => void;
  templateContent: {
    headerText: string;
    footerText: string;
    termsAndConditions: string;
    notesTemplate: string;
  };
  onContentChange: (field: string, value: string) => void;
}

export const ContentTab = ({ selectedDocument, onDocumentChange, templateContent, onContentChange }: ContentTabProps) => (
  <div className="space-y-4">
    <DocumentTypeSelector 
      selectedDocument={selectedDocument}
      onDocumentChange={onDocumentChange}
    />

    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Header Text</label>
        <Input
          value={templateContent.headerText}
          onChange={(e) => onContentChange('headerText', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Footer Text</label>
        <Input
          value={templateContent.footerText}
          onChange={(e) => onContentChange('footerText', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Terms & Conditions</label>
        <Textarea
          value={templateContent.termsAndConditions}
          onChange={(e) => onContentChange('termsAndConditions', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Notes Template</label>
        <Textarea
          value={templateContent.notesTemplate}
          onChange={(e) => onContentChange('notesTemplate', e.target.value)}
        />
      </div>
    </div>
  </div>
);