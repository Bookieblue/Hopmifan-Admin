import { MoreVertical, Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface BlogCardProps {
  item: {
    id: string;
    title: string;
    author: string;
    publishDate: string;
    status: string;
    content?: string;
  };
  actions?: {
    onDelete?: (id: string) => void;
    onShare?: (id: string) => void;
  };
}

export const BlogCard = ({ item, actions }: BlogCardProps) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleEdit = (id: string) => {
    navigate(`/articles/${id}/edit`);
  };
  
  return (
    <div className="py-4 border-b last:border-b-0">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-left mb-2 truncate">{item.title}</h3>
            <div className="text-sm text-muted-foreground text-left space-y-1">
              <p>{item.author}</p>
              <div className="flex items-center gap-2">
                <span>{item.publishDate}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  item.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 md:hidden"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
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
        {isExpanded && (
          <div className="text-sm text-muted-foreground md:hidden">
            <p className="line-clamp-3">{item.content}</p>
          </div>
        )}
      </div>
    </div>
  );
}