import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDocuments } from "@/contexts/DocumentContext";
import { toast } from "sonner";
import { DocumentTypesTab } from "./DocumentTypesTab";
import { DesignTab } from "./DesignTab";
import { ContentTab } from "./ContentTab";

export default function TemplateSettings() {
  const { enabledDocuments, toggleDocument } = useDocuments();
  const [selectedDocument, setSelectedDocument] = useState("invoices");
  const [templateContent, setTemplateContent] = useState({
    headerText: "INVOICE",
    footerText: "Thank you for your business",
    termsAndConditions: "Payment is due within 30 days",
    notesTemplate: "Please include invoice number in payment reference"
  });
  const [colors, setColors] = useState({
    brand: "#4F46E5",
    accent: "#818CF8"
  });

  // Autosave functionality
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      console.log("Saving template settings...");
      toast.success("Template settings saved");
    }, 1000);

    return () => clearTimeout(saveTimeout);
  }, [templateContent, colors]);

  const handleContentChange = (field: string, value: string) => {
    setTemplateContent(prev => ({ ...prev, [field]: value }));
    console.log(`Updating ${field} to:`, value);
  };

  const handleColorChange = (type: 'brand' | 'accent', value: string) => {
    setColors(prev => ({ ...prev, [type]: value }));
    console.log(`Updating ${type} color to:`, value);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">Template Settings</h2>
      </div>

      <Tabs defaultValue="document-types" className="space-y-4">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="document-types">Document Types</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        <TabsContent value="document-types">
          <DocumentTypesTab 
            enabledDocuments={enabledDocuments}
            toggleDocument={toggleDocument}
          />
        </TabsContent>

        <TabsContent value="design">
          <DesignTab 
            selectedDocument={selectedDocument}
            onDocumentChange={setSelectedDocument}
            colors={colors}
            onColorChange={handleColorChange}
          />
        </TabsContent>

        <TabsContent value="content">
          <ContentTab 
            selectedDocument={selectedDocument}
            onDocumentChange={setSelectedDocument}
            templateContent={templateContent}
            onContentChange={handleContentChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}