import { MoreVertical, Edit, Trash2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface EventCardProps {
  item: {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    status: string;
  };
  actions?: {
    onDelete?: (id: string) => void;
    onDuplicate?: (id: string) => void;
  };
}

export const EventCard = ({ item, actions }: EventCardProps) => {
  const navigate = useNavigate();
  
  const handleEdit = (id: string) => {
    navigate(`/events/${id}/edit`);
  };
  
  return (
    <div className="py-4 border-b last:border-b-0">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-left mb-2 line-clamp-2">{item.title}</h3>
            <div className="text-sm text-muted-foreground text-left space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span>{item.date} {item.time}</span>
                <span>{item.location}</span>
              </div>
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                item.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {item.status}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem onClick={() => handleEdit(item.id)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                {actions?.onDuplicate && (
                  <DropdownMenuItem onClick={() => actions.onDuplicate(item.id)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </DropdownMenuItem>
                )}
                {actions?.onDelete && (
                  <DropdownMenuItem
                    onClick={() => actions.onDelete(item.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};