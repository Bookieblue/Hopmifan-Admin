import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import PaymentHistory from "@/pages/payments/Index";
import Home from "@/pages/Home";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/payments",
        element: <PaymentHistory />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;