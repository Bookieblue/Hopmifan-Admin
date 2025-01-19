import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/shared/DataTable";
import { BookCard } from "@/components/bookstore/BookCard";
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, CheckSquare, XSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ActionButton } from "@/components/shared/ActionButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import type { TableColumn } from "@/components/shared/DataTable";

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  status: string;
  publishDate: string;
}

const mockBooks: Book[] = [
  {
    id: "1",
    title: "The Art of Programming",
    author: "John Doe",
    price: 29.99,
    status: "published",
    publishDate: new Date(2024, 1, 15).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  },
  {
    id: "2",
    title: "Web Development Fundamentals",
    author: "Jane Smith",
    price: 24.99,
    status: "draft",
    publishDate: new Date(2024, 2, 1).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }
];

export default function BookstoreList() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [bulkAction, setBulkAction] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<string>("");
  const postsPerPage = 15;

  const handleDelete = (id: string) => {
    setBookToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setBooks(books.filter(book => book.id !== bookToDelete));
    toast({
      description: "Book deleted successfully",
    });
    setDeleteDialogOpen(false);
    setBookToDelete("");
    setSelectedBooks(selectedBooks.filter(id => id !== bookToDelete));
  };

  const handleStatusChange = (id: string, status: string) => {
    setBooks(books.map(book => 
      book.id === id ? { ...book, status } : book
    ));
    toast({
      description: `Book ${status === 'published' ? 'published' : 'unpublished'} successfully`,
    });
  };

  const handleBulkAction = () => {
    if (bulkAction === 'delete') {
      setBooks(books.filter(book => !selectedBooks.includes(book.id)));
      toast({
        description: `${selectedBooks.length} books have been deleted.`
      });
      setSelectedBooks([]);
    } else if (bulkAction === 'publish') {
      setBooks(books.map(book => 
        selectedBooks.includes(book.id) ? { ...book, status: 'published' } : book
      ));
      toast({
        description: `${selectedBooks.length} books have been published.`
      });
      setSelectedBooks([]);
    }
    setBulkAction("");
  };

  const columns: TableColumn<Book>[] = [
    { header: "Title", accessor: "title" },
    { header: "Author", accessor: "author" },
    { 
      header: "Price", 
      accessor: (book: Book) => `$${book.price.toFixed(2)}` 
    },
    { 
      header: "Date & Status", 
      accessor: (book: Book) => (
        <div className="space-y-1">
          <div>{book.publishDate}</div>
          <span className={`px-2 py-1 rounded-full text-xs ${
            book.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {book.status}
          </span>
        </div>
      )
    },
    {
      header: "Actions",
      accessor: (book: Book) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuItem onClick={() => navigate(`/bookstore/${book.id}/edit`)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
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
      ),
      className: "w-[50px]"
    }
  ];

  const bulkActions = [
    { value: "delete", label: "Delete Selected" },
    { value: "export", label: "Export as CSV" },
    { value: "publish", label: "Publish Selected" },
    { value: "draft", label: "Move to Draft" },
  ];

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBooks.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentBooks = filteredBooks.slice(startIndex, startIndex + postsPerPage);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Books</h1>
        <ActionButton onClick={() => navigate("/bookstore/create")}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Book
        </ActionButton>
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
          data={currentBooks}
          columns={columns}
          selectedItems={selectedBooks}
          onSelectItem={(id, checked) => {
            if (checked) {
              setSelectedBooks([...selectedBooks, id]);
            } else {
              setSelectedBooks(selectedBooks.filter(bookId => bookId !== id));
            }
          }}
          onSelectAll={(checked) => {
            if (checked) {
              setSelectedBooks(currentBooks.map(book => book.id));
            } else {
              setSelectedBooks([]);
            }
          }}
          getItemId={(book) => book.id}
          actions={{
            onDelete: handleDelete,
            onStatusChange: handleStatusChange,
          }}
          bulkActions={bulkActions}
          bulkAction={bulkAction}
          setBulkAction={setBulkAction}
          onBulkAction={handleBulkAction}
          CardComponent={BookCard}
          showCheckboxes={true}
        />

        {selectedBooks.length > 0 && (
          <BulkActions
            selectedCount={selectedBooks.length}
            bulkAction={bulkAction}
            setBulkAction={setBulkAction}
            onBulkAction={handleBulkAction}
            actions={bulkActions}
          />
        )}
      </div>

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