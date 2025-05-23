import { useState, useEffect } from "react";
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

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  description: string;
  status: "published" | "draft";
  publishDate: string;
  coverImage?: string;
}

const sampleBooks: Book[] = [
  {
    id: "BOOK-1",
    title: "The Purpose Driven Life",
    author: "Segun Adewunmi",
    price: 15000.00,
    description: "A comprehensive guide to finding your purpose in life through faith.",
    status: "published",
    publishDate: new Date(2024, 0, 15).toISOString()
  },
  {
    id: "BOOK-2",
    title: "Daily Devotional",
    author: "Segun Adewunmi",
    price: 10000.00,
    description: "A guide to effective prayer and spiritual warfare.",
    status: "published",
    publishDate: new Date(2024, 0, 20).toISOString()
  },
  {
    id: "BOOK-3",
    title: "Faith Over Fear",
    author: "Segun Adewunmi",
    price: 24.99,
    description: "Overcoming life's challenges through unwavering faith.",
    status: "published",
    publishDate: new Date(2024, 1, 1).toISOString()
  }
];

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
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Initialize books from localStorage with sample data if empty
  const [books, setBooks] = useState<Book[]>(() => {
    try {
      const stored = localStorage.getItem('books');
      if (!stored) {
        localStorage.setItem('books', JSON.stringify(sampleBooks));
        return sampleBooks;
      }
      const parsedBooks = JSON.parse(stored);
      return Array.isArray(parsedBooks) ? parsedBooks : sampleBooks;
    } catch (error) {
      console.error('Error parsing books from localStorage:', error);
      return sampleBooks;
    }
  });

  // Update localStorage whenever books change
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const handleDelete = (id: string) => {
    setBookToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    const updatedBooks = books.filter(book => book.id !== bookToDelete);
    setBooks(updatedBooks);
    setDeleteDialogOpen(false);
    setBookToDelete("");
    setSelectedItems(selectedItems.filter(itemId => itemId !== bookToDelete));
    toast({
      description: "Book deleted successfully",
    });
  };

  const handleStatusChange = (id: string, newStatus: "published" | "draft") => {
    const updatedBooks = books.map(book => 
      book.id === id ? { ...book, status: newStatus } : book
    );
    setBooks(updatedBooks);
    toast({
      description: `Book ${newStatus === 'published' ? 'published' : 'unpublished'} successfully`,
    });
  };

  const handleDuplicate = (id: string) => {
    const bookToDuplicate = books.find(book => book.id === id);
    if (bookToDuplicate) {
      const newBook = {
        ...bookToDuplicate,
        id: `BOOK-${Date.now()}`,
        title: `${bookToDuplicate.title} (Copy)`,
        status: 'draft' as const
      };
      setBooks([...books, newBook]);
      toast({
        description: "Book duplicated successfully",
      });
    }
  };

  const handleBulkAction = () => {
    if (!selectedItems.length || !bulkAction) return;

    const updatedBooks = [...books];
    selectedItems.forEach(id => {
      const bookIndex = updatedBooks.findIndex(book => book.id === id);
      if (bookIndex === -1) return;

      switch (bulkAction) {
        case "delete":
          updatedBooks.splice(bookIndex, 1);
          break;
        case "publish":
          updatedBooks[bookIndex].status = "published";
          break;
        case "unpublish":
          updatedBooks[bookIndex].status = "draft";
          break;
      }
    });

    setBooks(updatedBooks);
    toast({
      description: `${selectedItems.length} books ${bulkAction}ed successfully`,
    });
    setSelectedItems([]);
    setBulkAction("");
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || book.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).map(book => ({
    ...book,
    publishDate: new Date(book.publishDate).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }));

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

      <div className="bg-white md:rounded-lg md:border">
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
              header: "Price",
              accessor: (book: any) => (
                <div className="text-[14px]">${book.price.toFixed(2)}</div>
              ),
              className: "text-[14px]"
            },
            { 
              header: "Status", 
              accessor: (book: any) => (
                <span className={`px-2 py-1 rounded-full text-xs ${
                  book.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {book.status}
                </span>
              ),
              className: "text-[14px]"
            },
            {
              header: "Date",
              accessor: "publishDate",
              className: "text-[14px]"
            },
            {
              header: "Actions",
              accessor: (book: any) => (
                <div className="flex items-center justify-end gap-2 text-[14px]" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 dropdown-trigger"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="end" 
                      className="w-[200px] bg-white dropdown-content"
                    >
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/bookstore/${book.id}/edit`);
                      }}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        handleDuplicate(book.id);
                      }}>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(book.id, book.status === 'published' ? 'draft' : 'published');
                        }}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(book.id);
                        }}
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

        {selectedItems.length > 0 && (
          <BulkActions
            selectedCount={selectedItems.length}
            bulkAction={bulkAction}
            setBulkAction={setBulkAction}
            onBulkAction={handleBulkAction}
            actions={bulkActions}
          />
        )}
      </div>

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
