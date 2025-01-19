import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Index from "@/pages/index";
import BlogList from "@/pages/blog/BlogList";
import CreateBlog from "@/pages/blog/CreateBlog";
import EditBlog from "@/pages/blog/EditBlog";
import ViewBlog from "@/pages/blog/ViewBlog";
import NotFound from "@/pages/NotFound";
import BookstoreList from "@/pages/bookstore/BookstoreList";
import PaymentHistory from "@/pages/payments/Index";

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
        path: "/payments",
        element: <PaymentHistory />,
      }
    ],
  },
]);

export default router;