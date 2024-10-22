"use client";

import { FC, useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import FilterDropdown from "@/components/ui/FilterDropdown";
import ComponentDialog from "@/components/ui/ComponentDialog";
import { CommentIcon } from "@/public/icons/types";
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
    const filtered = contents.filter((post) => post.userId === option.id);
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
      <section className="bg-white rounded-xl shadow flex flex-col gap-5 p-6">
        {filteredContents.map((post) => (
          <Link key={post.id} href={`/mainblog/${post.id}`}>
            <div className="p-6 border-b border-gray-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                <div>
                  <h2 className="font-semibold text-lg">{post.id}</h2>
                </div>
              </div>
              {/* <span className="text-sm text-gray-500">{post.category}</span> */}
              <span className="text-sm text-gray-700 bg-gray-200 py-1 px-3 rounded-2xl">
                History
              </span>
              <h3 className="text-xl font-semibold mb-2 mt-4">{post.title}</h3>
              <p className="text-gray-700 overflow-hidden text-ellipsis max-h-[3.6em] line-clamp-2">
                {post.content}
              </p>
              <div className="mt-4 flex flex-row gap-2">
                <Image
                  src={CommentIcon}
                  width={18}
                  height={18}
                  alt="Picture of the author"
                />
                <p className="text-base text-gray-400">{`${0} Comments`}</p>
              </div>
            </div>
          </Link>
        ))}
        {filteredContents.length === 0 && (
          <h1 className="p-5 text-center">No Content</h1>
        )}
      </section>
    </main>
  );
};

export default MainContent;
