import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/DataTable";
import { BookCard } from "@/components/bookstore/BookCard";
import { Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { TableColumn } from "@/components/shared/DataTable";
import { Input } from "@/components/ui/input";
import { ActionButton } from "@/components/shared/ActionButton";
import { format } from "date-fns";

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
    publishDate: "2024-01-15"
  },
  {
    id: "2",
    title: "Web Development Fundamentals",
    author: "Jane Smith",
    price: 24.99,
    status: "draft",
    publishDate: "2024-02-01"
  }
];

export default function BookstoreList() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [books] = useState<Book[]>(mockBooks);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: TableColumn<Book>[] = [
    { header: "Title", accessor: "title" as keyof Book },
    { header: "Author", accessor: "author" as keyof Book },
    { 
      header: "Price", 
      accessor: (book: Book) => `$${book.price.toFixed(2)}` 
    },
    { 
      header: "Status", 
      accessor: (book: Book) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
          book.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {book.status === 'published' ? 'Published' : 'Draft'}
        </span>
      )
    },
    { 
      header: "Date Added", 
      accessor: (book: Book) => format(new Date(book.publishDate), 'MMM dd, yyyy')
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

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Book Publications</h1>
        <ActionButton onClick={() => navigate("/bookstore/create")}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Book
        </ActionButton>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            className="pl-10"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <DataTable
        data={filteredBooks}
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
          { value: "export", label: "Export as CSV" }
        ]}
        CardComponent={({ item, actions }) => (
          <BookCard
            item={item}
            actions={{
              onDelete: actions?.onDelete,
              onStatusChange: handleStatusChange
            }}
          />
        )}
      />
    </div>
  );
}