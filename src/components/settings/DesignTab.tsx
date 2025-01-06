import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { DocumentTypeSelector } from "./DocumentTypeSelector";
import { ModernInvoiceTemplate } from "@/components/invoices/ModernInvoiceTemplate";

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

const sampleInvoice = {
  invoiceNumber: "003",
  projectDesc: "Logo and Brand Guideline",
  date: "22/11/2023",
  dueDate: "24/11/2023",
  companyName: "10AM Creative Studio",
  companyAddress: "Surabaya, East Java, Indonesia",
  companyPhone: "+62 820 4389 2489",
  companyEmail: "inquiryfor@10am.com",
  clientName: "Calvin Grock",
  clientAddress: "Str. GRADINARILOR 14, Sc.2 Et.6 Ap.55",
  clientPhone: "+1 34 234 2499",
  clientEmail: "calvingrock@gmail.com",
  status: "pending" as const,
  paymentType: "one-time" as const,
  items: [
    { description: "Logo", cost: 1000, quantity: "1", unit: "item", price: 1000 },
    { description: "Brand Guideline", cost: 112, quantity: "24", unit: "page", price: 2688 },
    { description: "Social Media Template", cost: 50, quantity: "40", unit: "screen", price: 2000 }
  ],
  customerNotes: "Please review the brand guidelines carefully and provide feedback within 5 business days.",
  terms: "Payment is due within 30 days. All designs and assets remain the property of 10AM Creative Studio until full payment is received.",
  bankDetails: {
    bankName: "Chase Bank",
    accountName: "10AM Creative Studio LLC",
    accountNumber: "1234567890",
    swiftCode: "CHASUS33XXX",
    routingNumber: "021000021"
  },
  paymentLink: "https://pay.stripe.com/invoice/acct_xxxxx"
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
        <div className="aspect-[8.5/11] bg-gray-100 rounded-lg"></div>
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