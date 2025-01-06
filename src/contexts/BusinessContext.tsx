import React, { createContext, useContext, useEffect, useState } from 'react';

interface BusinessContextType {
  businessData: any;
  updateBusinessData: (data: any) => void;
  isFreelancer: boolean;
  defaultCurrency: string;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export function BusinessProvider({ children }: { children: React.ReactNode }) {
  const [businessData, setBusinessData] = useState<any>(null);
  const [isFreelancer, setIsFreelancer] = useState(false);
  const [defaultCurrency, setDefaultCurrency] = useState('USD');

  useEffect(() => {
    const data = localStorage.getItem('businessData');
    if (data) {
      const parsed = JSON.parse(data);
      setBusinessData(parsed);
      setIsFreelancer(parsed.businessType === 'freelancing');
      setDefaultCurrency(parsed.defaultCurrency || 'USD');
    }
  }, []);

  const updateBusinessData = (data: any) => {
    setBusinessData(data);
    setIsFreelancer(data.businessType === 'freelancing');
    setDefaultCurrency(data.defaultCurrency || 'USD');
    localStorage.setItem('businessData', JSON.stringify(data));
  };

  return (
    <BusinessContext.Provider value={{ 
      businessData, 
      updateBusinessData, 
      isFreelancer,
      defaultCurrency 
    }}>
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  const context = useContext(BusinessContext);
  if (context === undefined) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
}