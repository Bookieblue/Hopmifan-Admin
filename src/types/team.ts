export interface Member {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Member";
}

export interface MemberFormData {
  name: string;
  email: string;
  role: "Admin" | "Member";
}