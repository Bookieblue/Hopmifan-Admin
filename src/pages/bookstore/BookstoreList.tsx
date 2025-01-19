import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DataTable } from "@/components/shared/DataTable";
import { ShareModal } from "@/components/modals/ShareModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Pagination } from "@/components/ui/pagination";
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
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<string | null>(null);
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const postsPerPage = 15;
  
  const [books] = useState(Array.from({ length: 32 }, (_, i) => ({ 
    id: `BK-${String(i + 1).padStart(3, '0')}`,
    title: `Book ${i + 1}`,
    author: i % 2 === 0 ? "John Smith" : "Jane Doe",
    price: `$${(19.99 + i).toFixed(2)}`,
    publishDate: new Date(2024, 2, 15 - i).toISOString().split('T')[0],
    status: i % 3 === 0 ? "draft" : "published"
  })));

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Author", accessor: "author" },
    { header: "Price", accessor: "price" },
    { 
      header: "Status", 
      accessor: (book: any) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          book.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {book.status}
        </span>
      )
    },
  ];

  const handlePageChange = (value: number) => {
    setCurrentPage(value);
  };

  const handleDelete = (bookId: string) => {
    setBookToDelete(bookId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (bookToDelete) {
      toast({
        description: `Book ${bookToDelete} has been deleted successfully.`
      });
      setDeleteDialogOpen(false);
      setBookToDelete(null);
    }
  };

  const handleBulkAction = () => {
    if (selectedBooks.length === 0) return;
    
    toast({
      description: `${selectedBooks.length} books have been processed.`
    });
    setSelectedBooks([]);
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBooks.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentBooks = filteredBooks.slice(startIndex, endIndex);

  const handleRowClick = (id: string) => {
    navigate(`/bookstore/${id}/edit`);
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-0 md:px-6">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold">Bookstore Management</h1>
        <Link to="/bookstore/create">
          <Button size="default" className="bg-purple-600 hover:bg-purple-700 px-3 md:px-4">
            <Plus className="h-4 w-4 mr-2" />
            Add New Book
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input 
            placeholder="Search books..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
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
          getItemId={(item) => item.id}
          actions={{
            onDelete: handleDelete,
          }}
          onRowClick={handleRowClick}
        />
      </div>

      {totalPages > 1 && (
        <div className="mt-4">
          <Pagination
            total={totalPages}
            value={currentPage}
            onChange={handlePageChange}
          />
        </div>
      )}

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