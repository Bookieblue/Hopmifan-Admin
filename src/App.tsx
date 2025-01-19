import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Index from "@/pages/index";
import BlogList from "@/pages/blog/BlogList";
import CreateBlog from "@/pages/blog/CreateBlog";
import EditBlog from "@/pages/blog/EditBlog";
import ViewBlog from "@/pages/blog/ViewBlog";
import BookstoreList from "@/pages/bookstore/BookstoreList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Index /> },
      { path: "/articles", element: <BlogList /> },
      { path: "/articles/create", element: <CreateBlog /> },
      { path: "/articles/:id/edit", element: <EditBlog /> },
      { path: "/articles/:id", element: <ViewBlog /> },
      { path: "/bookstore", element: <BookstoreList /> },
    ],
  },
]);

export default router;
