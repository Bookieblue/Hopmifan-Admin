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
import ViewInvoice from "./pages/invoices/ViewInvoice";
import EstimateList from "./pages/estimates/EstimateList";
import CreateEstimate from "./pages/estimates/CreateEstimate";
import ViewEstimate from "./pages/estimates/ViewEstimate";
import ReceiptList from "./pages/receipts/ReceiptList";
import CreateReceipt from "./pages/receipts/CreateReceipt";
import ViewReceipt from "./pages/receipts/ViewReceipt";
import EditReceipt from "./pages/receipts/EditReceipt";
import PaymentHistory from "./pages/payments/Index";
import Settings from "./pages/settings/Index";
import Subscription from "./pages/subscription/Index";
import BusinessOnboarding from "./pages/onboarding/Business";
import CustomerList from "./pages/customers/CustomerList";
import CreateCustomer from "./pages/customers/CreateCustomer";
import PricingPage from "./pages/pricing/Index";

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
          <Route path="/pricing" element={<PricingPage />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/invoices" element={<InvoiceList />} />
            <Route path="/invoices/create" element={<CreateInvoice />} />
            <Route path="/invoices/:id" element={<ViewInvoice />} />
            <Route path="/estimates" element={<EstimateList />} />
            <Route path="/estimates/create" element={<CreateEstimate />} />
            <Route path="/estimates/:id" element={<ViewEstimate />} />
            <Route path="/receipts" element={<ReceiptList />} />
            <Route path="/receipts/create" element={<CreateReceipt />} />
            <Route path="/receipts/:id" element={<ViewReceipt />} />
            <Route path="/receipts/:id/edit" element={<EditReceipt />} />
            <Route path="/payments" element={<PaymentHistory />} />
            <Route path="/subscription" element={<Subscription />} />
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