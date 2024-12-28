import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

export default function ReminderSettings() {
  const { toast } = useToast();
  const [enableReminders, setEnableReminders] = useState(false);
  const [reminderDays, setReminderDays] = useState({
    first: "7",
    second: "3",
    final: "1",
    overdue: "1"
  });
  const [emailTemplate, setEmailTemplate] = useState(
    "Dear {client_name},\n\nThis is a reminder that invoice {invoice_number} is due on {due_date}..."
  );

  const handleSave = () => {
    // Validate days are positive numbers
    const daysArray = Object.values(reminderDays);
    if (daysArray.some(day => isNaN(Number(day)) || Number(day) < 0)) {
      toast({
        variant: "destructive",
        title: "Invalid days",
        description: "Please enter valid positive numbers for reminder days."
      });
      return;
    }

    // Save reminder settings
    toast({
      title: "Settings saved",
      description: "Your reminder settings have been updated successfully."
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Email Reminder Settings</h2>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="enable-reminders"
          checked={enableReminders}
          onCheckedChange={(checked) => setEnableReminders(checked as boolean)}
        />
        <label
          htmlFor="enable-reminders"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Enable automatic payment reminders
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">First Reminder</label>
          <Input
            type="number"
            min="0"
            value={reminderDays.first}
            onChange={(e) => setReminderDays({ ...reminderDays, first: e.target.value })}
            disabled={!enableReminders}
          />
          <p className="text-sm text-muted-foreground">Days before due date</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Second Reminder</label>
          <Input
            type="number"
            min="0"
            value={reminderDays.second}
            onChange={(e) => setReminderDays({ ...reminderDays, second: e.target.value })}
            disabled={!enableReminders}
          />
          <p className="text-sm text-muted-foreground">Days before due date</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Final Reminder</label>
          <Input
            type="number"
            min="0"
            value={reminderDays.final}
            onChange={(e) => setReminderDays({ ...reminderDays, final: e.target.value })}
            disabled={!enableReminders}
          />
          <p className="text-sm text-muted-foreground">Days before due date</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Overdue Reminder</label>
          <Input
            type="number"
            min="0"
            value={reminderDays.overdue}
            onChange={(e) => setReminderDays({ ...reminderDays, overdue: e.target.value })}
            disabled={!enableReminders}
          />
          <p className="text-sm text-muted-foreground">Days after due date</p>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Email Template</label>
        <Textarea
          value={emailTemplate}
          onChange={(e) => setEmailTemplate(e.target.value)}
          className="min-h-[150px]"
          disabled={!enableReminders}
          placeholder="Enter your email template here..."
        />
        <p className="text-sm text-muted-foreground">
          Available variables: {'{client_name}'}, {'{invoice_number}'}, {'{due_date}'}
        </p>
      </div>

      <Button onClick={handleSave} disabled={!enableReminders}>Save Changes</Button>
    </div>
  );
}