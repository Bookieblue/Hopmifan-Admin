import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/dashboard/Index";
import Invoices from "./pages/invoices/Index";
import Estimates from "./pages/estimates/Index";
import Receipts from "./pages/receipts/Index";
import Customers from "./pages/customers/Index";
import Settings from "./pages/settings/Index";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/estimates" element={<Estimates />} />
        <Route path="/receipts" element={<Receipts />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;