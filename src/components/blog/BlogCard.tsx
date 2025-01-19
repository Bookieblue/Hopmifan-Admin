import { MoreVertical, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface BlogCardProps {
  item: {
    id: string;
    title: string;
    author: string;
    publishDate: string;
    status: string;
  };
  actions?: {
    onDelete?: (id: string) => void;
    onShare?: (id: string) => void;
  };
}

export const BlogCard = ({ item, actions }: BlogCardProps) => {
  return (
    <Card className="mb-4 relative">
      <CardContent className="p-4">
        <div className="flex justify-between items-start gap-4">
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
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link to={`/articles/${item.id}/edit`}>
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                </Link>
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
      </CardContent>
    </Card>
  );
};