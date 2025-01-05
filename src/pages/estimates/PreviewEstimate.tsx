import { useParams } from "react-router-dom";
import { InvoicePreview } from "@/components/invoices/InvoicePreview";

export default function PreviewEstimate() {
  const { id } = useParams<{ id: string }>();

  // Mock data - replace with actual data fetching
  const estimate = {
    number: id,
    date: new Date().toISOString().split('T')[0],
    customer: {
      name: "Acme Corp",
      email: "billing@acme.com",
      street: "123 Business Ave",
      state: "Lagos",
      postalCode: "100001"
    },
    items: [
      {
        description: "Consulting Services",
        quantity: 1,
        price: 1500,
        amount: 1500
      }
    ],
    notes: "Thank you for considering our estimate",
    terms: "This estimate is valid for 30 days"
  };

  return (
    <InvoicePreview
      invoice={estimate}
      selectedCurrency="NGN"
      selectedGateway={null}
    />
  );
}