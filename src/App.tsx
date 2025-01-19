import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Index from "@/pages/index";
import BlogList from "@/pages/blog/BlogList";
import CreateBlog from "@/pages/blog/CreateBlog";
import EditBlog from "@/pages/blog/EditBlog";
import ViewBlog from "@/pages/blog/ViewBlog";
import NotFound from "@/pages/NotFound";
import BookstoreList from "@/pages/bookstore/BookstoreList";
import CreateBook from "@/pages/bookstore/CreateBook";
import EditBook from "@/pages/bookstore/EditBook";
import ViewBook from "@/pages/bookstore/ViewBook";
import EventList from "@/pages/events/EventList";
import CreateEvent from "@/pages/events/CreateEvent";
import EditEvent from "@/pages/events/EditEvent";
import PaymentHistory from "@/pages/payments/Index";
import DonationHistory from "@/pages/donations/DonationHistory";
import ContactMessages from "@/pages/contacts/ContactMessages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/articles",
        element: <BlogList />,
      },
      {
        path: "/articles/create",
        element: <CreateBlog />,
      },
      {
        path: "/articles/:id/edit",
        element: <EditBlog />,
      },
      {
        path: "/articles/:id",
        element: <ViewBlog />,
      },
      {
        path: "/bookstore",
        element: <BookstoreList />,
      },
      {
        path: "/bookstore/create",
        element: <CreateBook />,
      },
      {
        path: "/bookstore/:id/edit",
        element: <EditBook />,
      },
      {
        path: "/bookstore/:id",
        element: <ViewBook />,
      },
      {
        path: "/events",
        element: <EventList />,
      },
      {
        path: "/events/create",
        element: <CreateEvent />,
      },
      {
        path: "/events/:id/edit",
        element: <EditEvent />,
      },
      {
        path: "/contacts",
        element: <ContactMessages />,
      },
      {
        path: "/payments",
        element: <PaymentHistory />,
      },
      {
        path: "/donations",
        element: <DonationHistory />,
      }
    ],
  },
]);

export default router;