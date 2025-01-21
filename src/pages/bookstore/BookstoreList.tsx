import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, CheckSquare, XSquare, Copy } from "lucide-react";
import { DataTable } from "@/components/shared/DataTable";
import { FilterModal } from "@/components/bookstore/FilterModal";
import { BookCard } from "@/components/bookstore/BookCard";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BulkActions } from "@/components/shared/BulkActions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function BookstoreList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [bulkAction, setBulkAction] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<string>("");
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Sample data
  const books = [
    {
      id: "1",
      title: "The Purpose Driven Life",
      author: "Rick Warren",
      price: 19.99,
      status: "published",
    },
    {
      id: "2",
      title: "Mere Christianity",
      author: "C.S. Lewis",
      price: 15.99,
      status: "draft",
    },
  ];

  const handleDelete = (id: string) => {
    setBookToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // Here you would typically delete the book from your backend
    toast({
      description: "Book deleted successfully",
    });
    setDeleteDialogOpen(false);
    setBookToDelete("");
    setSelectedItems(selectedItems.filter(itemId => itemId !== bookToDelete));
  };

  const handleStatusChange = (id: string, status: string) => {
    // Here you would typically update the book status in your backend
    toast({
      description: `Book ${status === 'published' ? 'published' : 'unpublished'} successfully`,
    });
  };

  const handleDuplicate = (id: string) => {
    // Here you would typically duplicate the book in your backend
    toast({
      description: "Book duplicated successfully",
    });
  };

  const handleBulkAction = () => {
    if (!selectedItems.length) return;

    switch (bulkAction) {
      case "delete":
        toast({
          description: `${selectedItems.length} books deleted successfully`,
        });
        break;
      case "publish":
        toast({
          description: `${selectedItems.length} books published successfully`,
        });
        break;
      case "unpublish":
        toast({
          description: `${selectedItems.length} books unpublished successfully`,
        });
        break;
      default:
        break;
    }
    setSelectedItems([]);
    setBulkAction("");
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || book.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectItem = (id: string, checked: boolean) => {
    setSelectedItems(prev =>
      checked ? [...prev, id] : prev.filter(item => item !== id)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedItems(checked ? filteredBooks.map(book => book.id) : []);
  };

  const handleRowClick = (id: string) => {
    navigate(`/bookstore/${id}/edit`);
  };

  const bulkActions = [
    { value: "delete", label: "Delete Selected" },
    { value: "publish", label: "Publish Selected" },
    { value: "unpublish", label: "Unpublish Selected" }
  ];

  return (
    <div className="page-container">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Bookstore</h1>
        <Link 
          to="/bookstore/create"
          className="bg-[#695CAE] hover:bg-[#695CAE]/90 text-white inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2"
        >
          <Plus className="h-4 w-4" />
          New Book
        </Link>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setFilterModalOpen(true)}
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <DataTable
        data={filteredBooks}
        columns={[
          { 
            header: "Title", 
            accessor: "title",
            className: "text-[14px]"
          },
          { 
            header: "Author", 
            accessor: "author",
            className: "text-[14px]"
          },
          { 
            header: "Price & Status", 
            accessor: (book: any) => (
              <div className="space-y-1 text-[14px]">
                <div>${book.price}</div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  book.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {book.status}
                </span>
              </div>
            ),
            className: "text-[14px]"
          },
          {
            header: "Actions",
            accessor: (book: any) => (
              <div className="flex items-center justify-end gap-2 text-[14px]">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px] bg-white">
                    <DropdownMenuItem onClick={() => navigate(`/bookstore/${book.id}/edit`)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDuplicate(book.id)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleStatusChange(book.id, book.status === 'published' ? 'draft' : 'published')}
                    >
                      {book.status === 'published' ? (
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
                    <DropdownMenuItem
                      onClick={() => handleDelete(book.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ),
            className: "w-[100px] text-[14px]"
          }
        ]}
        selectedItems={selectedItems}
        onSelectItem={handleSelectItem}
        onSelectAll={handleSelectAll}
        getItemId={(item) => item.id}
        onRowClick={handleRowClick}
        CardComponent={isMobile ? BookCard : undefined}
        actions={{
          onDelete: handleDelete,
          onStatusChange: handleStatusChange,
          onDuplicate: handleDuplicate,
        }}
        showCheckboxes={true}
        bulkActions={bulkActions}
        bulkAction={bulkAction}
        setBulkAction={setBulkAction}
        onBulkAction={handleBulkAction}
      />

      <FilterModal
        open={filterModalOpen}
        onOpenChange={setFilterModalOpen}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the book
              and remove all of its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
