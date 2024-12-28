import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Toaster } from "sonner";
import { DocumentProvider } from "./contexts/DocumentContext";

function App() {
  return (
    <DocumentProvider>
      <Router>
        <Layout />
        <Toaster position="top-right" richColors />
      </Router>
    </DocumentProvider>
  );
}

export default App;