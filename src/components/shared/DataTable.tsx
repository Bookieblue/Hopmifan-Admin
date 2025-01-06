import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { useIsMobile } from "@/hooks/use-mobile";
import { BulkActions } from "./BulkActions";

export interface TableColumn<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  selectedItems: string[];
  onSelectItem: (id: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  getItemId: (item: T) => string;
  actions?: {
    onDelete?: (id: string) => void;
    onDuplicate?: (id: string) => void;
    onShare?: (id: string) => void;
    additionalActions?: Array<{
      label: string;
      onClick: (id: string) => void;
    }>;
  };
  bulkActions?: {
    value: string;
    label: string;
  }[];
  bulkAction?: string;
  setBulkAction?: (value: string) => void;
  onBulkAction?: () => void;
  onRowClick?: (id: string) => void;
  CardComponent?: React.ComponentType<{ item: T; actions?: DataTableProps<T>['actions'] }>;
}

export function DataTable<T>({
  data,
  columns,
  selectedItems,
  onSelectItem,
  onSelectAll,
  getItemId,
  actions,
  bulkActions,
  bulkAction = "",
  setBulkAction = () => {},
  onBulkAction = () => {},
  onRowClick,
  CardComponent
}: DataTableProps<T>) {
  const isMobile = useIsMobile();

  const handleRowClick = (e: React.MouseEvent, id: string) => {
    if (
      (e.target as HTMLElement).closest('.checkbox-cell') ||
      (e.target as HTMLElement).closest('.actions-cell') ||
      (e.target as HTMLElement).closest('[role="menuitem"]')
    ) {
      return;
    }
    onRowClick?.(id);
  };

  if (isMobile && CardComponent) {
    return (
      <div className="-mx-4">
        {data.map((item) => (
          <CardComponent key={getItemId(item)} item={item} actions={actions} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-3 text-left">
              <Checkbox
                checked={selectedItems.length === data.length}
                onCheckedChange={onSelectAll}
              />
            </th>
            {columns.map((column, index) => (
              <th
                key={index}
                className={cn(
                  "px-4 py-3 text-left text-sm font-medium text-gray-500",
                  column.className
                )}
              >
                {column.header}
              </th>
            ))}
            <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <TableBody>
          {data.map((item) => {
            const id = getItemId(item);
            return (
              <tr
                key={id}
                className="border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
                onClick={(e) => handleRowClick(e, id)}
              >
                <td className="px-4 py-3 checkbox-cell">
                  <Checkbox
                    checked={selectedItems.includes(id)}
                    onCheckedChange={(checked) => onSelectItem(id, checked as boolean)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>
                {columns.map((column, index) => (
                  <td
                    key={index}
                    className={cn("px-4 py-3", column.className)}
                  >
                    {typeof column.accessor === 'function'
                      ? column.accessor(item)
                      : String(item[column.accessor])}
                  </td>
                ))}
                <td className="px-4 py-3 text-right actions-cell">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                      {onRowClick && (
                        <Link to={`edit`}>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                        </Link>
                      )}
                      {onRowClick && (
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`preview`, '_blank');
                          }}
                        >
                          View
                        </DropdownMenuItem>
                      )}
                      {actions?.onDuplicate && (
                        <DropdownMenuItem onClick={() => actions.onDuplicate?.(id)}>
                          Duplicate
                        </DropdownMenuItem>
                      )}
                      {actions?.onShare && (
                        <DropdownMenuItem onClick={() => actions.onShare?.(id)}>
                          Share
                        </DropdownMenuItem>
                      )}
                      {actions?.additionalActions?.map((action, index) => (
                        <DropdownMenuItem
                          key={index}
                          onClick={() => action.onClick(id)}
                        >
                          {action.label}
                        </DropdownMenuItem>
                      ))}
                      {actions?.onDelete && (
                        <DropdownMenuItem
                          onClick={() => actions.onDelete?.(id)}
                          className="text-red-600"
                        >
                          Delete
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            );
          })}
        </TableBody>
      </table>
      {!isMobile && (
        <BulkActions
          selectedCount={selectedItems.length}
          bulkAction={bulkAction}
          setBulkAction={setBulkAction}
          onBulkAction={onBulkAction}
          actions={bulkActions}
        />
      )}
    </div>
  );
}