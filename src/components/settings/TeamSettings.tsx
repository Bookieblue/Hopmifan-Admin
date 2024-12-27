import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function TeamSettings() {
  const members = [
    { name: "User", email: "test@gmail.com", role: "Owner" },
    { name: "Jane Smith", email: "jane@example.com", role: "Member" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Team Members</h2>
        <Button>
          <span className="mr-2">+</span>
          Add Member
        </Button>
      </div>

      <div className="space-y-4">
        {members.map((member, index) => (
          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{member.name}</h3>
                {member.role === "Owner" && (
                  <Badge variant="secondary" className="text-xs">
                    Owner
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{member.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">
                {member.role === "Owner" ? "Admin" : "Member"}
              </span>
              {member.role !== "Owner" && (
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}