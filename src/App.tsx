import { Routes, Route } from "react-router-dom";
import { BusinessProvider } from "./contexts/BusinessContext";
import { Layout } from "./components/layout/Layout";
import CustomerList from "./pages/customers/CustomerList";
import CreateEstimate from "./pages/estimates/CreateEstimate";
import EditEstimate from "./pages/estimates/EditEstimate";
import InvoiceList from "./pages/invoices/InvoiceList";
import Overview from "./pages/overview/Overview";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

function App() {
  return (
    <BusinessProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/estimates/create" element={<CreateEstimate />} />
            <Route path="/estimates/edit/:id" element={<EditEstimate />} />
            <Route path="/invoices" element={<InvoiceList />} />
            <Route path="/auth/signin" element={<SignIn />} />
            <Route path="/auth/signup" element={<SignUp />} />
          </Routes>
        </Layout>
    </BusinessProvider>
  );
}

export default App;