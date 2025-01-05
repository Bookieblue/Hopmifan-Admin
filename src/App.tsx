import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Index from "@/pages/Index";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import CreateInvoice from "@/pages/invoices/CreateInvoice";
import EditInvoice from "@/pages/invoices/EditInvoice";
import ViewInvoice from "@/pages/invoices/ViewInvoice";
import InvoiceList from "@/pages/invoices/InvoiceList";
import PreviewInvoice from "@/pages/invoices/PreviewInvoice";
import CreateEstimate from "@/pages/estimates/CreateEstimate";
import EditEstimate from "@/pages/estimates/EditEstimate";
import ViewEstimate from "@/pages/estimates/ViewEstimate";
import EstimateList from "@/pages/estimates/EstimateList";
import CreateReceipt from "@/pages/receipts/CreateReceipt";
import EditReceipt from "@/pages/receipts/EditReceipt";
import ViewReceipt from "@/pages/receipts/ViewReceipt";
import ReceiptList from "@/pages/receipts/ReceiptList";
import CustomerList from "@/pages/customers/CustomerList";
import CreateCustomer from "@/pages/customers/CreateCustomer";
import Business from "@/pages/onboarding/Business";
import Settings from "@/pages/settings/Index";
import Subscription from "@/pages/subscription/Index";
import Payments from "@/pages/payments/Index";
import Pricing from "@/pages/pricing/Index";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/onboarding/business" element={<Business />} />
        
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          
          {/* Invoice Routes */}
          <Route path="invoices" element={<InvoiceList />} />
          <Route path="invoices/create" element={<CreateInvoice />} />
          <Route path="invoices/:id/edit" element={<EditInvoice />} />
          <Route path="invoices/:id" element={<ViewInvoice />} />
          <Route path="invoices/:id/preview" element={<PreviewInvoice />} />
          
          {/* Estimate Routes */}
          <Route path="estimates" element={<EstimateList />} />
          <Route path="estimates/create" element={<CreateEstimate />} />
          <Route path="estimates/:id/edit" element={<EditEstimate />} />
          <Route path="estimates/:id" element={<ViewEstimate />} />
          
          {/* Receipt Routes */}
          <Route path="receipts" element={<ReceiptList />} />
          <Route path="receipts/create" element={<CreateReceipt />} />
          <Route path="receipts/:id/edit" element={<EditReceipt />} />
          <Route path="receipts/:id" element={<ViewReceipt />} />
          
          {/* Customer Routes */}
          <Route path="customers" element={<CustomerList />} />
          <Route path="customers/create" element={<CreateCustomer />} />
          
          {/* Other Routes */}
          <Route path="settings" element={<Settings />} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="payments" element={<Payments />} />
          <Route path="pricing" element={<Pricing />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
