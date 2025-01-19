import { Customer } from "@/types/customer";

interface SearchResultsProps {
  customers: Customer[];
  onSelect: (customer: Customer) => void;
}

export const SearchResults = ({ customers, onSelect }: SearchResultsProps) => {
  if (customers.length === 0) return null;

  return (
    <div className="mt-2 border rounded-md divide-y">
      {customers.map((customer) => (
        <div 
          key={customer.id} 
          className="p-4 hover:bg-accent cursor-pointer transition-colors"
          onClick={() => onSelect(customer)}
        >
          <div className="font-medium">{customer.name}</div>
          <div className="text-sm text-muted-foreground">{customer.email}</div>
          {customer.billingAddress && (
            <div className="text-sm text-muted-foreground">
              {customer.billingAddress}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};