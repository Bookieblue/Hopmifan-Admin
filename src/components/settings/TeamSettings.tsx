import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Member, MemberFormData } from "@/types/team";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MemberForm from "./MemberForm";
import MemberList from "./MemberList";

export default function TeamSettings() {
  const { toast } = useToast();
  const [showAddMember, setShowAddMember] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  
  // Mock current user (in real app, this would come from auth)
  const currentUser = { 
    id: "1", 
    firstName: "John",
    lastName: "Doe",
    name: "John Doe", 
    email: "test@gmail.com", 
    role: "Admin" as const 
  };
  
  const [members, setMembers] = useState<Member[]>([
    currentUser,
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Member" }
  ]);

  const handleAddMember = (data: MemberFormData) => {
    const id = Math.random().toString(36).substr(2, 9);
    setMembers([...members, { ...data, id }]);
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

  const handleUpdateMember = (data: MemberFormData) => {
    if (!editingMember) return;
    
    setMembers(members.map(m => 
      m.id === editingMember.id ? { ...data, id: editingMember.id } : m
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
      </div>

      <Tabs defaultValue="admin" className="space-y-4">
        <TabsList>
          <TabsTrigger value="admin">Admin</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="admin" className="space-y-4">
          <div className="grid gap-4 p-4 border rounded-lg">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={currentUser.firstName}
                disabled
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={currentUser.lastName}
                disabled
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={currentUser.email}
                disabled
                className="bg-muted"
              />
              <p className="text-sm text-muted-foreground">Email cannot be changed</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => setShowAddMember(true)}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          </div>
          <MemberList 
            members={members}
            currentUserId={currentUser.id}
            onEdit={handleEditMember}
            onDelete={handleDeleteMember}
          />
        </TabsContent>
      </Tabs>

      {/* Add Member Dialog */}
      <Dialog open={showAddMember} onOpenChange={setShowAddMember}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
          </DialogHeader>
          <MemberForm
            onSubmit={handleAddMember}
            onCancel={() => setShowAddMember(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Member Dialog */}
      <Dialog open={!!editingMember} onOpenChange={(open) => !open && setEditingMember(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Team Member</DialogTitle>
          </DialogHeader>
          {editingMember && (
            <MemberForm
              initialData={editingMember}
              onSubmit={handleUpdateMember}
              onCancel={() => setEditingMember(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}