import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "./components/layout/Layout";
import Index from "./pages/Index";
import InvoiceList from "./pages/invoices/InvoiceList";
import CreateInvoice from "./pages/invoices/CreateInvoice";
import EstimateList from "./pages/estimates/EstimateList";
import CreateEstimate from "./pages/estimates/CreateEstimate";
import ReceiptList from "./pages/receipts/ReceiptList";
import CreateReceipt from "./pages/receipts/CreateReceipt";
import Payments from "./pages/payments/Index";
import Settings from "./pages/settings/Index";
import Onboarding from "./pages/onboarding/Index";
import BusinessOnboarding from "./pages/onboarding/Business";
import CustomerList from "./pages/customers/CustomerList";
import CustomerDetail from "./pages/customers/CustomerDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/invoices" element={<InvoiceList />} />
            <Route path="/invoices/create" element={<CreateInvoice />} />
            <Route path="/estimates" element={<EstimateList />} />
            <Route path="/estimates/create" element={<CreateEstimate />} />
            <Route path="/receipts" element={<ReceiptList />} />
            <Route path="/receipts/create" element={<CreateReceipt />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/onboarding/business" element={<BusinessOnboarding />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/customers/:id" element={<CustomerDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;