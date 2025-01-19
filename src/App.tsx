import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Index from "@/pages/index";
import NotFound from "@/pages/404";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import Settings from "@/pages/settings/Index";
import CreateBlog from "@/pages/blog/CreateBlog";
import EditBlog from "@/pages/blog/EditBlog";
import ViewBlog from "@/pages/blog/ViewBlog";
import PreviewBlog from "@/pages/blog/PreviewBlog";
import BookstoreList from "@/pages/bookstore/BookstoreList";
import CreateBook from "@/pages/bookstore/CreateBook";
import EditBook from "@/pages/bookstore/EditBook";
import ViewBook from "@/pages/bookstore/ViewBook";
import CustomerList from "@/pages/customers/CustomerList";
import CreateCustomer from "@/pages/customers/CreateCustomer";
import InvoiceList from "@/pages/invoices/InvoiceList";
import CreateInvoice from "@/pages/invoices/CreateInvoice";
import EditInvoice from "@/pages/invoices/EditInvoice";
import ViewInvoice from "@/pages/invoices/ViewInvoice";
import PreviewInvoice from "@/pages/invoices/PreviewInvoice";
import EstimateList from "@/pages/estimates/EstimateList";
import CreateEstimate from "@/pages/estimates/CreateEstimate";
import EditEstimate from "@/pages/estimates/EditEstimate";
import ViewEstimate from "@/pages/estimates/ViewEstimate";
import PreviewEstimate from "@/pages/estimates/PreviewEstimate";
import ReceiptList from "@/pages/receipts/ReceiptList";
import CreateReceipt from "@/pages/receipts/CreateReceipt";
import EditReceipt from "@/pages/receipts/EditReceipt";
import ViewReceipt from "@/pages/receipts/ViewReceipt";
import PreviewReceipt from "@/pages/receipts/PreviewReceipt";
import BusinessOnboarding from "@/pages/onboarding/Business";
import PricingPage from "@/pages/pricing/Index";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="settings" element={<Settings />} />
          <Route path="articles">
            <Route index element={<CreateBlog />} />
            <Route path=":id/edit" element={<EditBlog />} />
            <Route path=":id" element={<ViewBlog />} />
            <Route path=":id/preview" element={<PreviewBlog />} />
          </Route>
          <Route path="bookstore">
            <Route index element={<BookstoreList />} />
            <Route path="create" element={<CreateBook />} />
            <Route path=":id/edit" element={<EditBook />} />
            <Route path=":id" element={<ViewBook />} />
          </Route>
          <Route path="customers">
            <Route index element={<CustomerList />} />
            <Route path="create" element={<CreateCustomer />} />
          </Route>
          <Route path="invoices">
            <Route index element={<InvoiceList />} />
            <Route path="create" element={<CreateInvoice />} />
            <Route path=":id/edit" element={<EditInvoice />} />
            <Route path=":id" element={<ViewInvoice />} />
            <Route path=":id/preview" element={<PreviewInvoice />} />
          </Route>
          <Route path="estimates">
            <Route index element={<EstimateList />} />
            <Route path="create" element={<CreateEstimate />} />
            <Route path=":id/edit" element={<EditEstimate />} />
            <Route path=":id" element={<ViewEstimate />} />
            <Route path=":id/preview" element={<PreviewEstimate />} />
          </Route>
          <Route path="receipts">
            <Route index element={<ReceiptList />} />
            <Route path="create" element={<CreateReceipt />} />
            <Route path=":id/edit" element={<EditReceipt />} />
            <Route path=":id" element={<ViewReceipt />} />
            <Route path=":id/preview" element={<PreviewReceipt />} />
          </Route>
        </Route>
        <Route path="/auth">
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
        <Route path="/onboarding">
          <Route path="business" element={<BusinessOnboarding />} />
        </Route>
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;