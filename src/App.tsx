import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PaymentHistory from "@/pages/payments/Index";
import Home from "@/pages/Home"; // Example import for home page
import About from "@/pages/About"; // Example import for about page
import NotFound from "@/pages/NotFound"; // Example import for not found page

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/payments" element={<PaymentHistory />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
