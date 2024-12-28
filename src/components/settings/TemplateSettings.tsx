import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { useDocuments } from "@/contexts/DocumentContext";
import { toast } from "sonner";

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
    brand: "#9b87f5",
    accent: "#7E69AB"
  });

  // Autosave functionality
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      console.log("Autosaving...");
      toast.success("Changes saved automatically");
    }, 1000);

    return () => clearTimeout(saveTimeout);
  }, [templateContent, colors]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">Template Settings</h2>
        <Select 
          value={selectedDocument} 
          onValueChange={setSelectedDocument}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select document type" />
          </SelectTrigger>
          <SelectContent>
            {enabledDocuments.invoices && (
              <SelectItem value="invoices">Invoices</SelectItem>
            )}
            {enabledDocuments.estimates && (
              <SelectItem value="estimates">Estimates</SelectItem>
            )}
            {enabledDocuments.receipts && (
              <SelectItem value="receipts">Receipts</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="document-types" className="space-y-4">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="document-types">Document Types</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        <TabsContent value="document-types" className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
              <div>
                <h3 className="font-medium">Invoices</h3>
                <p className="text-sm text-gray-500">Create and manage invoices for your clients</p>
              </div>
              <Switch 
                checked={enabledDocuments.invoices}
                onCheckedChange={() => toggleDocument('invoices')}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
              <div>
                <h3 className="font-medium">Estimates</h3>
                <p className="text-sm text-gray-500">Send professional estimates to potential clients</p>
              </div>
              <Switch 
                checked={enabledDocuments.estimates}
                onCheckedChange={() => toggleDocument('estimates')}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
              <div>
                <h3 className="font-medium">Receipts</h3>
                <p className="text-sm text-gray-500">Generate receipts for completed payments</p>
              </div>
              <Switch 
                checked={enabledDocuments.receipts}
                onCheckedChange={() => toggleDocument('receipts')}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="design" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-4 border-2 border-blue-500 rounded-lg">
              <h3 className="font-medium mb-2">Modern</h3>
              <p className="text-sm text-gray-500 mb-4">Clean and contemporary design with a focus on typography and whitespace</p>
              <div className="aspect-[8.5/11] bg-gray-100 rounded-lg"></div>
            </Card>

            <Card className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Classic</h3>
              <p className="text-sm text-gray-500 mb-4">Traditional business layout with a professional appearance</p>
              <div className="aspect-[8.5/11] bg-gray-100 rounded-lg"></div>
            </Card>

            <Card className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Minimal</h3>
              <p className="text-sm text-gray-500 mb-4">Simplified design that emphasizes content and readability</p>
              <div className="aspect-[8.5/11] bg-gray-100 rounded-lg"></div>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Brand Color</label>
              <div className="flex items-center gap-4">
                <div 
                  className="h-24 w-24 rounded-lg border"
                  style={{ backgroundColor: colors.brand }}
                ></div>
                <Input
                  type="color"
                  value={colors.brand}
                  onChange={(e) => setColors(prev => ({ ...prev, brand: e.target.value }))}
                  className="h-12 w-24 p-1 cursor-pointer"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Accent Color</label>
              <div className="flex items-center gap-4">
                <div 
                  className="h-24 w-24 rounded-lg border"
                  style={{ backgroundColor: colors.accent }}
                ></div>
                <Input
                  type="color"
                  value={colors.accent}
                  onChange={(e) => setColors(prev => ({ ...prev, accent: e.target.value }))}
                  className="h-12 w-24 p-1 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Header Text</label>
              <Input
                value={templateContent.headerText}
                onChange={(e) => setTemplateContent({ ...templateContent, headerText: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Footer Text</label>
              <Input
                value={templateContent.footerText}
                onChange={(e) => setTemplateContent({ ...templateContent, footerText: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Terms & Conditions</label>
              <Textarea
                value={templateContent.termsAndConditions}
                onChange={(e) => setTemplateContent({ ...templateContent, termsAndConditions: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Notes Template</label>
              <Textarea
                value={templateContent.notesTemplate}
                onChange={(e) => setTemplateContent({ ...templateContent, notesTemplate: e.target.value })}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}