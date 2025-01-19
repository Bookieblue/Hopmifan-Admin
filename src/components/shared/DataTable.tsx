import { Link } from "react-router-dom";
import { MoreVertical } from "lucide-react";
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
import { TableBody } from "@/components/ui/table";

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
  onRowClick?: (id: string) => void;
  CardComponent?: React.ComponentType<{ item: T }>;
}

export function DataTable<T>({
  data,
  columns,
  selectedItems,
  onSelectItem,
  onSelectAll,
  getItemId,
  onRowClick,
  CardComponent,
}: DataTableProps<T>) {
  const isMobile = useIsMobile();

  const handleRowClick = (e: React.MouseEvent, id: string) => {
    if (
      (e.target as HTMLElement).closest('.checkbox-cell')
    ) {
      return;
    }
    onRowClick?.(id);
  };

  if (isMobile && CardComponent) {
    return (
      <div className="space-y-4">
        <div className="px-4 py-2 flex items-center gap-3 border-b">
          <Checkbox
            checked={selectedItems.length === data.length}
            onCheckedChange={onSelectAll}
          />
          <h2 className="font-semibold text-lg">Topics</h2>
        </div>
        <div className="px-4">
          {data.map((item) => (
            <div key={getItemId(item)} className="flex items-center gap-2">
              <Checkbox
                checked={selectedItems.includes(getItemId(item))}
                onCheckedChange={(checked) => onSelectItem(getItemId(item), checked as boolean)}
              />
              <div className="flex-1">
                <CardComponent item={item} />
              </div>
            </div>
          ))}
        </div>
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
              </tr>
            );
          })}
        </TableBody>
      </table>
    </div>
  );
}
