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
import SermonList from "@/pages/sermons/SermonList";
import CreateSermon from "@/pages/sermons/CreateSermon";
import Payments from "@/pages/payments/Index";
import ContactList from "@/pages/contacts/ContactList";
import DonationList from "@/pages/donations/DonationList";
import PrayerRequestList from "@/pages/prayers/PrayerRequestList";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Index />} />
        <Route path="/publications/blog" element={<BlogList />} />
        <Route path="/publications/blog/create" element={<CreateBlog />} />
        <Route path="/publications/blog/:id" element={<ViewBlog />} />
        <Route path="/publications/blog/:id/edit" element={<EditBlog />} />
        <Route path="/publications/blog/:id/preview" element={<PreviewBlog />} />
        <Route path="/publications/bookstore" element={<BookstoreList />} />
        <Route path="/publications/bookstore/create" element={<CreateBook />} />
        <Route path="/publications/bookstore/:id" element={<ViewBook />} />
        <Route path="/publications/bookstore/:id/edit" element={<EditBook />} />
        <Route path="/members" element={<CustomerList />} />
        <Route path="/members/create" element={<CreateCustomer />} />
        <Route path="/members/:id" element={<CustomerDetail />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/events/create" element={<CreateEvent />} />
        <Route path="/sermons" element={<SermonList />} />
        <Route path="/sermons/create" element={<CreateSermon />} />
        <Route path="/contact" element={<ContactList />} />
        <Route path="/donations" element={<DonationList />} />
        <Route path="/prayer-requests" element={<PrayerRequestList />} />
        <Route path="/payments" element={<Payments />} />
      </Route>
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;