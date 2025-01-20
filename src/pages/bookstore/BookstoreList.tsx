import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/shared/DataTable";
import { FilterModal } from "@/components/bookstore/FilterModal";
import { BookCard } from "@/components/bookstore/BookCard";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

export default function BookstoreList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [locationFilter, setLocationFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const { toast } = useToast();
  const isMobile = useIsMobile();

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
    toast({
      description: "Book deleted successfully",
    });
  };

  const handleStatusChange = (id: string, status: string) => {
    toast({
      description: `Book ${status === 'published' ? 'published' : 'unpublished'} successfully`,
    });
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
                <Link to={`/bookstore/${book.id}/edit`}>Edit</Link>
                <button onClick={() => handleDelete(book.id)}>Delete</button>
              </div>
            ),
            className: "w-[100px] text-[14px]"
          }
        ]}
        selectedItems={selectedItems}
        onSelectItem={handleSelectItem}
        onSelectAll={handleSelectAll}
        getItemId={(item) => item.id}
        CardComponent={isMobile ? BookCard : undefined}
        actions={{
          onDelete: handleDelete,
          onStatusChange: handleStatusChange,
        }}
        showCheckboxes={true}
      />

      <FilterModal
        open={filterModalOpen}
        onOpenChange={setFilterModalOpen}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />
    </div>
  );
}