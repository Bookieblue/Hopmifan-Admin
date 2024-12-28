import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Member, MemberFormData } from "@/types/team";
import { useToast } from "@/components/ui/use-toast";

interface MemberFormProps {
  initialData?: Member;
  onSubmit: (data: MemberFormData) => void;
  onCancel: () => void;
}

export default function MemberForm({ initialData, onSubmit, onCancel }: MemberFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<MemberFormData>({
    name: initialData?.name || "",
    email: initialData?.email || "",
    role: initialData?.role || "Member"
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields"
      });
      return;
    }

    if (!formData.email.includes('@')) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid email address"
      });
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Name</label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter name"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Email</label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter email"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Role</label>
        <Select
          value={formData.role}
          onValueChange={(value: "Admin" | "Member") => 
            setFormData({ ...formData, role: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Member">Member</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2">
        <Button className="w-full" onClick={handleSubmit}>
          {initialData ? 'Update' : 'Add'} Member
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}