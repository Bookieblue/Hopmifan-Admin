import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function PaymentPage() {
  const { invoiceId } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link to={`/invoices`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold">Invoice Payment #{invoiceId}</h1>
        </div>

        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Payment Details</h2>
            <p className="text-gray-600">
              Please complete your payment for invoice #{invoiceId}
            </p>
            
            <div className="border-t pt-4">
              <Button className="w-full">
                Proceed to Payment
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}