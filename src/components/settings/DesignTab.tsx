import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { DocumentTypeSelector } from "./DocumentTypeSelector";
import { ModernInvoiceTemplate } from "@/components/invoices/ModernInvoiceTemplate";
import { ClassicInvoiceTemplate } from "@/components/invoices/ClassicInvoiceTemplate";

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

// Sample invoice data for preview
const sampleInvoice = {
  invoiceNumber: "210201",
  projectDesc: "Product Development",
  date: "2024-03-19",
  dueDate: "2024-04-19",
  companyName: "Sample Company",
  companyAddress: "123 Company St",
  companyPhone: "+1 234 567 8900",
  companyEmail: "contact@company.com",
  companyWebsite: "www.company.com",
  clientName: "Sample Client",
  clientAddress: "456 Client Avenue",
  gstId: "GST123456789",
  pan: "PANABCD1234E",
  payableTo: {
    name: "Sample Company",
    accountNumber: "1234567890",
    ifscCode: "IFSC00001",
    bank: "Sample Bank",
    gstId: "GST123456789",
    pan: "PANABCD1234E",
    address: "123 Company St"
  },
  items: [
    {
      no: "1",
      description: "Sample Service",
      sac: "998314",
      amount: 1000
    }
  ],
  status: "pending" as const,
  paymentType: "one-time" as const,
  customerNotes: "Sample notes for the invoice",
  terms: "Standard terms and conditions apply",
  paymentLink: "https://payment.link"
};

export const DesignTab = ({ 
  selectedDocument, 
  onDocumentChange, 
  colors, 
  onColorChange,
  selectedTemplate = 'classic',
  onTemplateChange = () => {}
}: DesignTabProps) => (
  <div className="space-y-6">
    <DocumentTypeSelector 
      selectedDocument={selectedDocument}
      onDocumentChange={onDocumentChange}
    />
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card 
        className={`p-4 rounded-lg cursor-pointer ${selectedTemplate === 'modern' ? 'border-2 border-blue-500' : 'border'}`}
        onClick={() => onTemplateChange('modern')}
      >
        <h3 className="font-medium mb-2">Modern</h3>
        <p className="text-sm text-gray-500 mb-4">Clean and contemporary design with a focus on typography and whitespace</p>
        <div className="aspect-[8.5/11] bg-gray-100 rounded-lg overflow-hidden">
          <div className="transform scale-[0.2] origin-top-left w-[500%] h-[500%]">
            <ModernInvoiceTemplate {...sampleInvoice} />
          </div>
        </div>
      </Card>

      <Card 
        className={`p-4 rounded-lg cursor-pointer ${selectedTemplate === 'classic' ? 'border-2 border-blue-500' : 'border'}`}
        onClick={() => onTemplateChange('classic')}
      >
        <h3 className="font-medium mb-2">Classic</h3>
        <p className="text-sm text-gray-500 mb-4">Traditional business layout with a professional appearance</p>
        <div className="aspect-[8.5/11] bg-gray-100 rounded-lg overflow-hidden">
          <div className="transform scale-[0.2] origin-top-left w-[500%] h-[500%]">
            <ClassicInvoiceTemplate {...sampleInvoice} />
          </div>
        </div>
      </Card>

      <Card 
        className={`p-4 rounded-lg cursor-pointer ${selectedTemplate === 'minimal' ? 'border-2 border-blue-500' : 'border'}`}
        onClick={() => onTemplateChange('minimal')}
      >
        <h3 className="font-medium mb-2">Minimal</h3>
        <p className="text-sm text-gray-500 mb-4">Simplified design that emphasizes content and readability</p>
        <div className="aspect-[8.5/11] bg-gray-100 rounded-lg"></div>
      </Card>
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