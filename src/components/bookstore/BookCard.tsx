import {
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  CheckSquare,
  XSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { Book } from '@/hooks/services/books/hook';

interface Actions {
  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onStatusChange?: (id: string, status: 'publish' | 'unpublish') => void;
}

export const BookCard = ({
  item,
  actions,
}: {
  item: Book;
  actions?: Actions;
}) => {
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`/bookstore/${id}/edit`);
  };

  return (
    <div className="py-4 border-b last:border-b-0">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-2">
          <div
            className="flex-1 min-w-0"
            onClick={() => handleEdit(item.id)}
            style={{ cursor: 'pointer' }}
          >
            <h3 className="font-semibold text-left mb-2 line-clamp-2">
              {item.title}
            </h3>
            <div className="text-sm text-muted-foreground text-left space-y-1">
              <p className="truncate">{item.authorName}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <span>${item.price.toFixed(2)}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    item.status === 'publish'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          </div>

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
              {actions?.onStatusChange && (
                <DropdownMenuItem
                  onClick={() =>
                    actions.onStatusChange(
                      item.id,
                      item.status === 'publish' ? 'unpublish' : 'publish'
                    )
                  }
                >
                  {item.status === 'publish' ? (
                    <>
                      <XSquare className="h-4 w-4 mr-2" />
                      Unpublish
                    </>
                  ) : (
                    <>
                      <CheckSquare className="h-4 w-4 mr-2" />
                      Publish
                    </>
                  )}
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
  );
};
