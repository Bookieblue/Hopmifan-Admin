import { Card } from "@/components/ui/card";
import { ModernInvoiceTemplate } from "@/components/invoices/ModernInvoiceTemplate";
import { ClassicInvoiceTemplate } from "@/components/invoices/ClassicInvoiceTemplate";
import MinimalInvoiceTemplate from "@/components/invoices/MinimalInvoiceTemplate";
import ProfessionalQuoteTemplate from "@/components/invoices/ProfessionalQuoteTemplate";

export interface TemplatePreviewProps {
  template: string;
  onClick: () => void;
  isSelected: boolean;
  title: string;
  description: string;
}

export const TemplatePreview = ({ 
  template, 
  onClick, 
  isSelected,
  title,
  description 
}: TemplatePreviewProps) => {
  const getTemplateComponent = () => {
    switch (template) {
      case 'modern':
        return <ModernInvoiceTemplate {...modernInvoiceData} />;
      case 'classic':
        return <ClassicInvoiceTemplate {...classicInvoiceData} />;
      case 'minimal':
        return <MinimalInvoiceTemplate {...minimalInvoiceData} />;
      case 'professional':
        return <ProfessionalQuoteTemplate />;
      default:
        return null;
    }
  };

  return (
    <Card 
      className={`p-4 rounded-lg cursor-pointer ${isSelected ? 'border-2 border-blue-500' : 'border'}`}
      onClick={onClick}
    >
      <h3 className="font-medium mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      <div className="aspect-[8.5/11] bg-gray-100 rounded-lg overflow-hidden">
        <div className="transform scale-[0.2] origin-top-left w-[500%] h-[500%]">
          {getTemplateComponent()}
        </div>
      </div>
    </Card>
  );
};

// Sample data for templates
const modernInvoiceData = {
  invoiceNumber: "210201",
  projectDesc: "Product Development",
  date: "2024-03-19",
  dueDate: "2024-04-19",
  companyName: "Sample Company",
  companyAddress: "123 Company St",
  companyPhone: "+1 234 567 8900",
  companyEmail: "contact@company.com",
  clientName: "Sample Client",
  clientAddress: "456 Client Avenue",
  clientPhone: "+1 234 567 8901",
  clientEmail: "client@example.com",
  status: "pending" as const,
  paymentType: "one-time" as const,
  items: [
    {
      description: "Sample Service",
      cost: 1000,
      quantity: "1",
      price: 1000,
      unit: "item"
    }
  ],
  customerNotes: "Sample notes for the invoice",
  terms: "Standard terms and conditions apply",
  bankDetails: {
    bankName: "Sample Bank",
    accountName: "Sample Account",
    accountNumber: "1234567890",
    swiftCode: "SWIFT1234",
    routingNumber: "123456"
  },
  paymentLink: "https://payment.link"
};

const classicInvoiceData = {
  invoice: {
    number: "210201",
    date: "2024-03-19",
    customer: {
      name: "Sample Client",
      email: "client@example.com",
      street: "456 Client Avenue",
      state: "Sample State",
      postalCode: "12345"
    },
    items: [
      {
        description: "Sample Service",
        quantity: 1,
        price: 1000,
        amount: 1000
      }
    ],
    notes: "Sample notes for the invoice",
    terms: "Standard terms and conditions apply",
    footer: "Thank you for your business"
  },
  currencySymbol: "$"
};

const minimalInvoiceData = {
  amount: "£1,500.00",
  dueDate: "2024-04-19",
  invoiceNumber: "210201",
  issueDate: "2024-03-19",
  companyDetails: {
    name: "Sample Company",
    website: "www.company.com",
    email: "contact@company.com",
    phone: "+1 234 567 8900",
    address: {
      street: "123 Company St",
      city: "Sample City",
      postcode: "12345"
    }
  },
  clientDetails: {
    name: "Sample Client",
    address: {
      street: "456 Client Avenue",
      city: "Client City",
      postcode: "67890"
    }
  },
  items: [
    {
      description: "Sample Service",
      quantity: 1,
      cost: 1500,
      amount: 1500
    }
  ],
  bankDetails: {
    bank: "Sample Bank",
    accountName: "Sample Account",
    accountNumber: "1234567890",
    sortCode: "12-34-56"
  },
  paymentLink: "https://payment.link"
};
