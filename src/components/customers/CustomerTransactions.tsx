import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/shared/DataTable";
import type { TableColumn } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/badge";
import { InvoiceCard } from "@/components/invoices/InvoiceCard";
import { EstimateCard } from "@/components/invoices/EstimateCard";
import { ReceiptCard } from "@/components/invoices/ReceiptCard";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Customer } from "@/types/customer";
import { ShareModal } from "@/components/modals/ShareModal";

interface CustomerTransactionsProps {
  customer: Customer;
}

export function CustomerTransactions({ customer }: CustomerTransactionsProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string>("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    setSelectedItems(prev => 
      checked ? [...prev, id] : prev.filter(item => item !== id)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedItems(checked ? customer.invoices.map(inv => inv.id) : []);
  };

  const handleItemDelete = (id: string) => {
    toast({
      description: `Item ${id} has been deleted.`
    });
  };

  const handleItemShare = (id: string) => {
    setSelectedItemId(id);
    setShowShareModal(true);
  };

  const handleItemDuplicate = (id: string) => {
    toast({
      description: `${id} has been duplicated.`
    });
  };

  const handleItemView = (type: string, id: string) => {
    window.open(`/${type}/${id}/preview`, '_blank');
  };

  const handleItemEdit = (type: string, id: string) => {
    navigate(`/${type}/${id}/edit`);
  };

  const columns: TableColumn<any>[] = [
    { 
      header: 'ID', 
      accessor: 'id'
    },
    {
      header: 'Details',
      accessor: (item) => (
        <div>
          <p className="text-sm font-medium">{formatDate(item.date)}</p>
          <p className="text-sm text-muted-foreground">
            {item.type === 'one-time' ? 'One-time' : 'Recurring'}
          </p>
        </div>
      )
    },
    { 
      header: 'Amount', 
      accessor: 'amount'
    },
    {
      header: 'Status',
      accessor: (item) => (
        <Badge 
          variant="secondary"
          className={`
            ${item.status === 'paid' || item.status === 'completed' || item.status === 'accepted' ? 'bg-green-50 text-green-700' : ''}
            ${item.status === 'pending' ? 'bg-orange-50 text-orange-700' : ''}
            ${item.status === 'overdue' || item.status === 'rejected' || item.status === 'cancelled' ? 'bg-red-50 text-red-700' : ''}
          `}
        >
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Badge>
      )
    }
  ];

  const invoicesWithCustomer = customer.invoices.map(invoice => ({
    ...invoice,
    customer: customer.name,
    type: 'one-time'
  }));

  const estimatesWithCustomer = customer.estimates.map(estimate => ({
    ...estimate,
    customer: customer.name
  }));

  const receiptsWithCustomer = customer.receipts.map(receipt => ({
    ...receipt,
    customer: customer.name
  }));

  return (
    <>
      <Card className="border shadow-sm overflow-hidden">
        <Tabs defaultValue="invoices" className="w-full">
          <TabsList className="w-full justify-start rounded-none px-6 bg-muted p-1">
            <TabsTrigger value="invoices" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Invoices
            </TabsTrigger>
            <TabsTrigger value="estimates" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Estimates
            </TabsTrigger>
            <TabsTrigger value="receipts" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Receipts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="invoices" className="p-2.5 md:p-6 bg-white">
            <DataTable
              data={invoicesWithCustomer}
              columns={columns}
              selectedItems={selectedItems}
              onSelectItem={handleSelectItem}
              onSelectAll={handleSelectAll}
              getItemId={(item) => item.id}
              actions={{
                onDelete: handleItemDelete,
                onDuplicate: handleItemDuplicate,
                onShare: handleItemShare,
                additionalActions: [
                  {
                    label: "Edit",
                    onClick: (id) => handleItemEdit('invoices', id)
                  },
                  {
                    label: "View",
                    onClick: (id) => handleItemView('invoices', id)
                  }
                ]
              }}
              CardComponent={InvoiceCard}
            />
          </TabsContent>

          <TabsContent value="estimates" className="p-2.5 md:p-6 bg-white">
            <DataTable
              data={estimatesWithCustomer}
              columns={columns}
              selectedItems={selectedItems}
              onSelectItem={handleSelectItem}
              onSelectAll={handleSelectAll}
              getItemId={(item) => item.id}
              actions={{
                onDelete: handleItemDelete,
                onDuplicate: handleItemDuplicate,
                onShare: handleItemShare,
                additionalActions: [
                  {
                    label: "Edit",
                    onClick: (id) => handleItemEdit('estimates', id)
                  },
                  {
                    label: "View",
                    onClick: (id) => handleItemView('estimates', id)
                  }
                ]
              }}
              CardComponent={EstimateCard}
            />
          </TabsContent>

          <TabsContent value="receipts" className="p-2.5 md:p-6 bg-white">
            <DataTable
              data={receiptsWithCustomer}
              columns={columns}
              selectedItems={selectedItems}
              onSelectItem={handleSelectItem}
              onSelectAll={handleSelectAll}
              getItemId={(item) => item.id}
              actions={{
                onDelete: handleItemDelete,
                onDuplicate: handleItemDuplicate,
                onShare: handleItemShare,
                additionalActions: [
                  {
                    label: "Edit",
                    onClick: (id) => handleItemEdit('receipts', id)
                  },
                  {
                    label: "View",
                    onClick: (id) => handleItemView('receipts', id)
                  }
                ]
              }}
              CardComponent={ReceiptCard}
            />
          </TabsContent>
        </Tabs>
      </Card>

      <ShareModal
        open={showShareModal}
        onOpenChange={setShowShareModal}
        invoiceId={selectedItemId}
      />
    </>
  );
}