import React, { createContext, useContext, useState } from 'react';
import { toast } from "sonner";

interface EnabledDocuments {
  invoices: boolean;
  estimates: boolean;
  receipts: boolean;
}

interface DocumentContextType {
  enabledDocuments: EnabledDocuments;
  toggleDocument: (documentType: keyof EnabledDocuments) => void;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export function DocumentProvider({ children }: { children: React.ReactNode }) {
  const [enabledDocuments, setEnabledDocuments] = useState<EnabledDocuments>({
    invoices: true,
    estimates: true,
    receipts: true
  });

  const toggleDocument = (documentType: keyof EnabledDocuments) => {
    // Count how many documents are currently enabled
    const enabledCount = Object.values(enabledDocuments).filter(Boolean).length;
    
    // If trying to disable the last enabled document, prevent it and show toast
    if (enabledCount === 1 && enabledDocuments[documentType]) {
      toast("At least one document type must remain enabled", {
        description: "You cannot disable all document types.",
        duration: 3000,
        style: { backgroundColor: '#fee2e2', color: '#dc2626' }
      });
      return;
    }

    setEnabledDocuments(prev => ({
      ...prev,
      [documentType]: !prev[documentType]
    }));
  };

  return (
    <DocumentContext.Provider value={{ enabledDocuments, toggleDocument }}>
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocuments() {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentProvider');
  }
  return context;
}