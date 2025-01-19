import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Index from "@/pages/index";
import BlogList from "@/pages/blog/BlogList";
import CreateBlog from "@/pages/blog/CreateBlog";
import EditBlog from "@/pages/blog/EditBlog";
import ViewBlog from "@/pages/blog/ViewBlog";
import NotFound from "@/pages/NotFound";
import { Toaster } from "@/components/ui/toaster";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Index />,
      },
      {
        path: "articles",
        element: <BlogList />,
      },
      {
        path: "articles/create",
        element: <CreateBlog />,
      },
      {
        path: "articles/:id/edit",
        element: <EditBlog />,
      },
      {
        path: "articles/:id",
        element: <ViewBlog />,
      }
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}