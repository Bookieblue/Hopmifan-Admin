<lov-code>
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search, CalendarDays, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DatePicker } from "@/components/ui/date-picker";
import { useToast } from "@/hooks/use-toast";
import { InvoiceTable } from "@/components/invoices/InvoiceTable";
import { ShareModal } from "@/components/modals/ShareModal";

const InvoiceList = () => {
  const { toast } = useToast();
  const [invoices, setInvoices] = useState([
    { 
      id: "INV-2345",
      customer: "Acme Corporation",
      amount: "₦2,850.00",
      status: "pending",
      date: "2024-03-15",
      type: "one-time"
    },
    { 
      id: "INV-2346",
      customer: "TechStart Solutions",
      amount: "₦1,590.00",
      status: "paid",
      date: "2024-03-14",
      type: "recurring"
    }
  ]);

  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [shareDialogOpen, setShareDialog