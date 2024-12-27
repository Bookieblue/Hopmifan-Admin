import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "./components/layout/Layout";
import Index from "./pages/Index";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import InvoiceList from "./pages/invoices/InvoiceList";
import CreateInvoice from "./pages/invoices/CreateInvoice";
import EstimateList from "./pages/estimates/EstimateList";
import CreateEstimate from "./pages/estimates/CreateEstimate";
import ReceiptList from "./pages/receipts/ReceiptList";
import CreateReceipt from "./pages/receipts/CreateReceipt";
import ViewReceipt from "./pages/receipts/ViewReceipt";
import PaymentHistory from "./pages/payments/Index";
import Settings from "./pages/settings/Index";
import BusinessOnboarding from "./pages/onboarding/Business";
import CustomerList from "./pages/customers/CustomerList";
import CreateCustomer from "./pages/customers/CreateCustomer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/onboarding/business" element={<BusinessOnboarding />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/invoices" element={<InvoiceList />} />
            <Route path="/invoices/create" element={<CreateInvoice />} />
            <Route path="/estimates" element={<EstimateList />} />
            <Route path="/estimates/create" element={<CreateEstimate />} />
            <Route path="/receipts" element={<ReceiptList />} />
            <Route path="/receipts/create" element={<CreateReceipt />} />
            <Route path="/receipts/:id" element={<ViewReceipt />} />
            <Route path="/payments" element={<PaymentHistory />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/customers/create" element={<CreateCustomer />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;