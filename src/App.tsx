import { createBrowserRouter, RouterProvider, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import BlogList from "@/pages/blog/BlogList";
import CreateBlog from "@/pages/blog/CreateBlog";
import EditBlog from "@/pages/blog/EditBlog";
import BookstoreList from "@/pages/bookstore/BookstoreList";
import CreateBook from "@/pages/bookstore/CreateBook";
import EditBook from "@/pages/bookstore/EditBook";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Blog Routes */}
          <Route path="/articles" element={<BlogList />} />
          <Route path="/articles/create" element={<CreateBlog />} />
          <Route path="/articles/:id/edit" element={<EditBlog />} />
          
          {/* Bookstore Routes */}
          <Route path="/bookstore" element={<BookstoreList />} />
          <Route path="/bookstore/create" element={<CreateBook />} />
          <Route path="/bookstore/:id/edit" element={<EditBook />} />
          
          <Route path="*" element={<div>404 Not Found</div>} />
        </Route>
      </Routes>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;