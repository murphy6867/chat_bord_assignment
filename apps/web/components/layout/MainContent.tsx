"use client";

import { FC, useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import FilterDropdown from "@/components/ui/FilterDropdown";
import ComponentDialog from "@/components/ui/ComponentDialog";
import type { Post } from "./types";

interface MainContentProps {
  contents: Post[];
}

interface FilterOption {
  id: number;
  name: string;
}

const filterOptions: FilterOption[] = [
  { id: 1, name: "History" },
  { id: 2, name: "Food" },
  { id: 3, name: "Pets" },
  { id: 4, name: "Health" },
  { id: 5, name: "Fashion" },
  { id: 6, name: "Exercise" },
  { id: 7, name: "Others" },
];

const MainContent: FC<MainContentProps> = ({ contents }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<FilterOption | null>(
    null
  );
  const [filteredContents, setFilteredContents] = useState<Post[]>(contents);

  const handleFilterSelect = (option: FilterOption) => {
    setSelectedFilter(option);
    const filtered = contents.filter((post) => post.user_id === option.id);
    setFilteredContents(filtered);
  };

  return (
    <main className="flex flex-col space-y-6 w-screen">
      <section>
        <div className="flex flex-row space-x-2">
          <div className="w-3/5 relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4 " />
            <Input
              type="text"
              placeholder="Search..."
              className="w-full pl-8 border-white rounded-xl py-5"
            />
          </div>
          <div className="w-1/5 flex justify-center">
            <FilterDropdown
              options={filterOptions}
              selectedFilter={selectedFilter}
              onSelect={handleFilterSelect}
              textRender="Community"
            />
          </div>
          <div className="w-1/5">
            <ComponentDialog
              isOpen={isDialogOpen}
              onOpenChange={setIsDialogOpen}
            />
          </div>
        </div>
      </section>
      <section className="bg-white p-4 rounded-xl shadow">
        {filteredContents.map((content) => (
          <div key={content.id} className="mb-4 p-4 border rounded">
            <h2 className="text-xl font-semibold">{content.title}</h2>
            <p className="text-sm text-gray-500">User ID: {content.user_id}</p>
            <p className="mt-2">{content.content}</p>
          </div>
        ))}
        {filteredContents.length === 0 && <h1>No Content</h1>}
      </section>
    </main>
  );
};

export default MainContent;
