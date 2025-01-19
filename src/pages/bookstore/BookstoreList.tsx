import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/shared/DataTable";
import { BookCard } from "@/components/bookstore/BookCard";
import { Plus, Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ActionButton } from "@/components/shared/ActionButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  const [books] = useState<Book[]>(mockBooks);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 15;

  const columns: TableColumn<Book>[] = [
    { header: "Title", accessor: "title" as keyof Book },
    { header: "Author", accessor: "author" as keyof Book },
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
    }
  ];

  const handleDelete = (id: string) => {
    toast({
      description: "Book deleted successfully",
    });
  };

  const handleStatusChange = (id: string, status: string) => {
    toast({
      description: `Book ${status === 'published' ? 'published' : 'unpublished'} successfully`,
    });
  };

  const handleSelectBook = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedBooks([...selectedBooks, id]);
    } else {
      setSelectedBooks(selectedBooks.filter((bookId) => bookId !== id));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedBooks(books.map((book) => book.id));
    } else {
      setSelectedBooks([]);
    }
  };

  const handleBulkAction = () => {
    toast({
      description: "Bulk action completed successfully",
    });
  };

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
        <h1 className="text-2xl font-bold">Book Publications</h1>
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
          onSelectItem={handleSelectBook}
          onSelectAll={handleSelectAll}
          getItemId={(book) => book.id}
          actions={{
            onDelete: handleDelete,
            additionalActions: [
              {
                label: "Edit",
                onClick: (id) => navigate(`/bookstore/${id}/edit`)
              }
            ]
          }}
          bulkActions={[
            { value: "delete", label: "Delete Selected" },
            { value: "export", label: "Export as CSV" },
            { value: "publish", label: "Publish Selected" },
            { value: "draft", label: "Move to Draft" }
          ]}
          bulkAction=""
          setBulkAction={() => {}}
          onBulkAction={handleBulkAction}
          CardComponent={({ item, actions }) => (
            <BookCard
              item={item}
              actions={{
                onDelete: actions?.onDelete,
                onStatusChange: handleStatusChange
              }}
            />
          )}
          showCheckboxes={true}
        />
      </div>
    </div>
  );
}
