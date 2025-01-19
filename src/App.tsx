import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import Index from "@/pages/Index";
import BlogList from "@/pages/blog/BlogList";
import CreateBlog from "@/pages/blog/CreateBlog";
import ViewBlog from "@/pages/blog/ViewBlog";
import EditBlog from "@/pages/blog/EditBlog";
import PreviewBlog from "@/pages/blog/PreviewBlog";
import BookstoreList from "@/pages/bookstore/BookstoreList";
import CreateBook from "@/pages/bookstore/CreateBook";
import ViewBook from "@/pages/bookstore/ViewBook";
import EditBook from "@/pages/bookstore/EditBook";
import CustomerList from "@/pages/customers/CustomerList";
import CreateCustomer from "@/pages/customers/CreateCustomer";
import CustomerDetail from "@/pages/customers/CustomerDetail";
import EventList from "@/pages/events/EventList";
import CreateEvent from "@/pages/events/CreateEvent";
import Payments from "@/pages/payments/Index";
import Settings from "@/pages/settings/Index";
import ContactList from "@/pages/contacts/ContactList";
import DonationList from "@/pages/donations/DonationList";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Index />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/create" element={<CreateBlog />} />
        <Route path="/blog/:id" element={<ViewBlog />} />
        <Route path="/blog/:id/edit" element={<EditBlog />} />
        <Route path="/blog/:id/preview" element={<PreviewBlog />} />
        <Route path="/bookstore" element={<BookstoreList />} />
        <Route path="/bookstore/create" element={<CreateBook />} />
        <Route path="/bookstore/:id" element={<ViewBook />} />
        <Route path="/bookstore/:id/edit" element={<EditBook />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/create" element={<CreateCustomer />} />
        <Route path="/customers/:id" element={<CustomerDetail />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/events/create" element={<CreateEvent />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/contacts" element={<ContactList />} />
        <Route path="/donations" element={<DonationList />} />
      </Route>
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;