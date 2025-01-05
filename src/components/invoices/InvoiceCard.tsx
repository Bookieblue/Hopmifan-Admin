import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Invoice } from "@/types/invoice";

interface InvoiceCardProps {
  invoice: Invoice;
  onDelete: (id: string) => void;
  onDuplicate: (invoice: Invoice) => void;
  onShare: (invoice: Invoice) => void;
}

export const InvoiceCard = ({ invoice, onDelete, onDuplicate, onShare }: InvoiceCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = (
    e: React.MouseEvent<HTMLDivElement>,
    invoice: { id: string }
  ) => {
    if (
      (e.target as HTMLElement).closest('button') ||
      (e.target as HTMLElement).closest('a')
    ) {
      return;
    }
    navigate(`/invoices/${invoice.id}/edit`);
  };

  return (
    <Card onClick={(e) => handleCardClick(e, invoice)} className="cursor-pointer">
      <div className="p-4">
        <h2 className="text-lg font-semibold">{invoice.number}</h2>
        <p className="text-sm text-gray-500">{invoice.customer}</p>
        <p className="text-lg font-bold">{invoice.amount}</p>
        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={() => onShare(invoice)}>Share</Button>
          <Button variant="outline" onClick={() => onDuplicate(invoice)}>Duplicate</Button>
          <Button variant="outline" onClick={() => onDelete(invoice.id)}>Delete</Button>
        </div>
      </div>
    </Card>
  );
};
