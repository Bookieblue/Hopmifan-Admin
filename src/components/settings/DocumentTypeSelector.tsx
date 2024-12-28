import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DocumentTypeSelectorProps {
  selectedDocument: string;
  onDocumentChange: (value: string) => void;
}

export const DocumentTypeSelector = ({ selectedDocument, onDocumentChange }: DocumentTypeSelectorProps) => (
  <div className="mb-6">
    <label className="text-sm font-medium mb-2 block">Select Document Type</label>
    <Select 
      value={selectedDocument} 
      onValueChange={onDocumentChange}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select document type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="invoices">Invoices</SelectItem>
        <SelectItem value="estimates">Estimates</SelectItem>
        <SelectItem value="receipts">Receipts</SelectItem>
      </SelectContent>
    </Select>
  </div>
);