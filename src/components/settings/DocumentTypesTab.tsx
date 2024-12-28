import { Switch } from "@/components/ui/switch";

interface DocumentTypesTabProps {
  enabledDocuments: {
    invoices: boolean;
    estimates: boolean;
    receipts: boolean;
  };
  toggleDocument: (type: string) => void;
}

export const DocumentTypesTab = ({ enabledDocuments, toggleDocument }: DocumentTypesTabProps) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
      <div>
        <h3 className="font-medium">Invoices</h3>
        <p className="text-sm text-gray-500">Create and manage invoices for your clients</p>
      </div>
      <Switch 
        checked={enabledDocuments.invoices}
        onCheckedChange={() => toggleDocument('invoices')}
      />
    </div>

    <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
      <div>
        <h3 className="font-medium">Estimates</h3>
        <p className="text-sm text-gray-500">Send professional estimates to potential clients</p>
      </div>
      <Switch 
        checked={enabledDocuments.estimates}
        onCheckedChange={() => toggleDocument('estimates')}
      />
    </div>

    <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
      <div>
        <h3 className="font-medium">Receipts</h3>
        <p className="text-sm text-gray-500">Generate receipts for completed payments</p>
      </div>
      <Switch 
        checked={enabledDocuments.receipts}
        onCheckedChange={() => toggleDocument('receipts')}
      />
    </div>
  </div>
);