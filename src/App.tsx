import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "@/pages/auth/SignIn";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import { Layout } from "@/components/layout/Layout";
import Dashboard from "@/pages/dashboard/Index";
import Customers from "@/pages/customers/Index";
import CustomerDetails from "@/pages/customers/CustomerDetails";
import CreateCustomer from "@/pages/customers/CreateCustomer";
import EditCustomer from "@/pages/customers/EditCustomer";
import Invoices from "@/pages/invoices/Index";
import CreateInvoice from "@/pages/invoices/CreateInvoice";
import EditInvoice from "@/pages/invoices/EditInvoice";
import PreviewInvoice from "@/pages/invoices/PreviewInvoice";
import ViewInvoice from "@/pages/invoices/ViewInvoice";
import Estimates from "@/pages/estimates/Index";
import CreateEstimate from "@/pages/estimates/CreateEstimate";
import EditEstimate from "@/pages/estimates/EditEstimate";
import PreviewEstimate from "@/pages/estimates/PreviewEstimate";
import ViewEstimate from "@/pages/estimates/ViewEstimate";
import Receipts from "@/pages/receipts/Index";
import CreateReceipt from "@/pages/receipts/CreateReceipt";
import EditReceipt from "@/pages/receipts/EditReceipt";
import PreviewReceipt from "@/pages/receipts/PreviewReceipt";
import ViewReceipt from "@/pages/receipts/ViewReceipt";
import Settings from "@/pages/settings/Index";
import Subscription from "@/pages/subscription/Index";
import Pricing from "@/pages/pricing/Index";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/customers/create" element={<CreateCustomer />} />
                <Route path="/customers/:id" element={<CustomerDetails />} />
                <Route path="/customers/:id/edit" element={<EditCustomer />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/invoices/create" element={<CreateInvoice />} />
                <Route path="/invoices/:id/edit" element={<EditInvoice />} />
                <Route path="/invoices/:id/preview" element={<PreviewInvoice />} />
                <Route path="/invoices/:id" element={<ViewInvoice />} />
                <Route path="/estimates" element={<Estimates />} />
                <Route path="/estimates/create" element={<CreateEstimate />} />
                <Route path="/estimates/:id/edit" element={<EditEstimate />} />
                <Route path="/estimates/:id/preview" element={<PreviewEstimate />} />
                <Route path="/estimates/:id" element={<ViewEstimate />} />
                <Route path="/receipts" element={<Receipts />} />
                <Route path="/receipts/create" element={<CreateReceipt />} />
                <Route path="/receipts/:id/edit" element={<EditReceipt />} />
                <Route path="/receipts/:id/preview" element={<PreviewReceipt />} />
                <Route path="/receipts/:id" element={<ViewReceipt />} />
                <Route path="/settings/*" element={<Settings />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/pricing" element={<Pricing />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;