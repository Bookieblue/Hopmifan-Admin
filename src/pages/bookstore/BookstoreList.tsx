import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/DataTable";
import { BookCard } from "@/components/bookstore/BookCard";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Author", accessor: "author" },
    { 
      header: "Price", 
      accessor: (book: Book) => `$${book.price.toFixed(2)}` 
    },
    { header: "Status", accessor: "status" },
    { header: "Date Added", accessor: "publishDate" }
  ];

  const handleDelete = (id: string) => {
    toast({
      description: "Book deleted successfully",
    });
    // Implement delete functionality
  };

  const handleStatusChange = (id: string, status: string) => {
    toast({
      description: `Book ${status === 'published' ? 'published' : 'unpublished'} successfully`,
    });
    // Implement status change functionality
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

  const handleExportCSV = () => {
    toast({
      description: "Books exported successfully",
    });
    // Implement CSV export functionality
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Books</h1>
        <Button onClick={() => navigate("/bookstore/create")}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Book
        </Button>
      </div>

      <DataTable
        data={books}
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