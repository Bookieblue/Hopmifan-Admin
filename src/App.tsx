import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import Index from "@/pages/Index";
import InvoiceList from "@/pages/invoices/InvoiceList";
import CreateInvoice from "@/pages/invoices/CreateInvoice";
import ViewInvoice from "@/pages/invoices/ViewInvoice";
import EditInvoice from "@/pages/invoices/EditInvoice";
import PreviewInvoice from "@/pages/invoices/PreviewInvoice";
import EstimateList from "@/pages/estimates/EstimateList";
import CreateEstimate from "@/pages/estimates/CreateEstimate";
import ViewEstimate from "@/pages/estimates/ViewEstimate";
import EditEstimate from "@/pages/estimates/EditEstimate";
import PreviewEstimate from "@/pages/estimates/PreviewEstimate";
import CustomerList from "@/pages/customers/CustomerList";
import CreateCustomer from "@/pages/customers/CreateCustomer";
import Payments from "@/pages/payments/Index";
import Settings from "@/pages/settings/Index";
import Pricing from "@/pages/pricing/Index";
import Subscription from "@/pages/subscription/Index";
import Business from "@/pages/onboarding/Business";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Index />} />
        <Route path="/invoices" element={<InvoiceList />} />
        <Route path="/invoices/create" element={<CreateInvoice />} />
        <Route path="/invoices/:id" element={<ViewInvoice />} />
        <Route path="/invoices/:id/edit" element={<EditInvoice />} />
        <Route path="/invoices/:id/preview" element={<PreviewInvoice />} />
        <Route path="/estimates" element={<EstimateList />} />
        <Route path="/estimates/create" element={<CreateEstimate />} />
        <Route path="/estimates/:id" element={<ViewEstimate />} />
        <Route path="/estimates/:id/edit" element={<EditEstimate />} />
        <Route path="/estimates/:id/preview" element={<PreviewEstimate />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/create" element={<CreateCustomer />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/subscription" element={<Subscription />} />
      </Route>
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/onboarding/business" element={<Business />} />
    </Routes>
  );
}

export default App;