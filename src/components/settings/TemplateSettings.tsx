import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TemplateSettings() {
  const [selectedDocument, setSelectedDocument] = useState("invoices");
  const [templateContent, setTemplateContent] = useState({
    headerText: "INVOICE",
    footerText: "Thank you for your business",
    termsAndConditions: "Payment is due within 30 days",
    notesTemplate: "Please include invoice number in payment reference"
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Template Content</h2>
        <Select value={selectedDocument} onValueChange={setSelectedDocument}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select document type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="invoices">Invoices</SelectItem>
            <SelectItem value="estimates">Estimates</SelectItem>
            <SelectItem value="receipts">Receipts</SelectItem>
          </SelectContent>
        </Select>
      </div>

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

        <Button>Save Changes</Button>
      </div>
    </div>
  );
}