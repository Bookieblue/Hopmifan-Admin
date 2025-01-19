import { Routes, Route } from "react-router-dom";
import SignIn from "@/pages/auth/SignIn";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import { Layout } from "@/components/layout/Layout";
import Dashboard from "@/pages/dashboard/Index";
import BookstoreList from "@/pages/bookstore/BookstoreList";
import CreateBook from "@/pages/bookstore/CreateBook";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bookstore" element={<BookstoreList />} />
          <Route path="/bookstore/create" element={<CreateBook />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;