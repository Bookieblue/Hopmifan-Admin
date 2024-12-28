import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, UserPlus, Trash2, PenLine } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface Member {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Member";
}

export default function TeamSettings() {
  const { toast } = useToast();
  const [showAddMember, setShowAddMember] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [newMember, setNewMember] = useState({ name: "", email: "", role: "Member" as const });
  
  // Mock current user (in real app, this would come from auth)
  const currentUser = { id: "1", name: "User", email: "test@gmail.com", role: "Admin" as const };
  
  const [members, setMembers] = useState<Member[]>([
    currentUser,
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Member" }
  ]);

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields"
      });
      return;
    }

    if (!newMember.email.includes('@')) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid email address"
      });
      return;
    }

    const id = Math.random().toString(36).substr(2, 9);
    setMembers([...members, { ...newMember, id }]);
    setNewMember({ name: "", email: "", role: "Member" });
    setShowAddMember(false);
    toast({
      title: "Member added",
      description: "Team member has been added successfully"
    });
  };

  const handleEditMember = (member: Member) => {
    if (member.id === currentUser.id) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Cannot edit admin account"
      });
      return;
    }
    setEditingMember(member);
  };

  const handleUpdateMember = () => {
    if (!editingMember) return;
    
    setMembers(members.map(m => 
      m.id === editingMember.id ? editingMember : m
    ));
    setEditingMember(null);
    toast({
      title: "Member updated",
      description: "Team member has been updated successfully"
    });
  };

  const handleDeleteMember = (id: string) => {
    if (id === currentUser.id) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Cannot delete admin account"
      });
      return;
    }
    
    setMembers(members.filter(m => m.id !== id));
    toast({
      title: "Member removed",
      description: "Team member has been removed successfully"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Team Members</h2>
        <Button onClick={() => setShowAddMember(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>

      <div className="space-y-4">
        {members.map((member) => (
          <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{member.name}</h3>
                {member.role === "Admin" && (
                  <Badge variant="secondary" className="text-xs">
                    Admin
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{member.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">{member.role}</span>
              {member.id !== currentUser.id && (
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleEditMember(member)}
                  >
                    <PenLine className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDeleteMember(member.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Member Dialog */}
      <Dialog open={showAddMember} onOpenChange={setShowAddMember}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                placeholder="Enter name"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={newMember.email}
                onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Role</label>
              <Select
                value={newMember.role}
                onValueChange={(value: "Admin" | "Member") => 
                  setNewMember({ ...newMember, role: value })
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
            <Button className="w-full" onClick={handleAddMember}>
              Add Member
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Member Dialog */}
      <Dialog open={!!editingMember} onOpenChange={(open) => !open && setEditingMember(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Team Member</DialogTitle>
          </DialogHeader>
          {editingMember && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={editingMember.email}
                  onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Role</label>
                <Select
                  value={editingMember.role}
                  onValueChange={(value: "Admin" | "Member") => 
                    setEditingMember({ ...editingMember, role: value })
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
              <Button className="w-full" onClick={handleUpdateMember}>
                Update Member
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}