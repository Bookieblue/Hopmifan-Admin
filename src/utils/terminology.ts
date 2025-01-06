import { useBusiness } from "@/contexts/BusinessContext";

export function useTerminology() {
  const { isFreelancer } = useBusiness();
  
  return {
    customer: isFreelancer ? 'Client' : 'Customer',
    customers: isFreelancer ? 'Clients' : 'Customers',
  };
}