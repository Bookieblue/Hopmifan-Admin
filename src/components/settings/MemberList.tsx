import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PenLine, Trash2 } from "lucide-react";
import { Member } from "@/types/team";

interface MemberListProps {
  members: Member[];
  currentUserId: string;
  onEdit: (member: Member) => void;
  onDelete: (id: string) => void;
}

export default function MemberList({ members, currentUserId, onEdit, onDelete }: MemberListProps) {
  return (
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
            {member.id !== currentUserId && (
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onEdit(member)}
                >
                  <PenLine className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onDelete(member.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}