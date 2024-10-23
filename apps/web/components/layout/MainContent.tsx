/* eslint-disable no-unused-vars */
"use client";

import { FC, useEffect, useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import FilterDropdown from "@/components/ui/FilterDropdown";
import ComponentDialogCreatePost from "@/components/ui/ComponentDialogCreatePost";
import { CommentIcon } from "@/public/icons/types";
import type { GeneralPost, Category } from "./types";

interface MainContentProps {
  contents: GeneralPost[];
  category: Category[];
  sessionUserId?: string | null;
}

interface CategoryOption {
  id: number;
  name: string;
}

const MainContent: FC<MainContentProps> = ({
  contents,
  category,
  sessionUserId,
}) => {
  const defaultFilter: CategoryOption = {
    id: 0,
    name: "Community",
  };

  const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>([
    defaultFilter,
    ...category,
  ]);
  const [selectedFilter, setSelectedFilter] = useState<CategoryOption | null>(
    defaultFilter
  );

  const [filteredContents, setFilteredContents] =
    useState<GeneralPost[]>(contents);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const handleFilterSelect = (category: CategoryOption) => {
    setSelectedFilter(category);

    if (category.id === 0) {
      setFilteredContents(contents);
    } else {
      const filtered = contents.filter(
        (post) => post.categoryId === category.id
      );
      setFilteredContents(filtered);
    }
  };

  const handleDialogOpen = (isOpen: boolean) => {
    if (!sessionUserId) {
      window.location.href = "/signin";
    } else {
      setIsDialogOpen(isOpen);
    }
  };

  const fetchPostsByKeyword = async (keyword: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/posts?keyword=${keyword}`
      );
      const data = await response.json();
      setFilteredContents(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (searchKeyword) {
        fetchPostsByKeyword(searchKeyword);
      } else {
        setFilteredContents(contents);
      }
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [searchKeyword, contents]);

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
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>
          <div className="w-1/5 flex justify-center">
            <FilterDropdown
              options={categoryOptions}
              selectedFilter={selectedFilter}
              onSelect={handleFilterSelect}
              textRender="Community"
            />
          </div>
          <div className="w-1/5">
            <ComponentDialogCreatePost
              isOpen={isDialogOpen}
              onOpenChange={handleDialogOpen}
              categoryOptions={categoryOptions}
              sessionUserId={sessionUserId || ""}
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
                  <h2 className="font-semibold text-lg">
                    {post.user.username}
                  </h2>
                </div>
              </div>
              <span className="text-sm text-gray-700 bg-gray-200 py-1 px-3 rounded-2xl">
                {post.category.name}
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
                <p className="text-base text-gray-400">{`${post._count.comments ? post._count.comments : 0} ${post._count.comments > 1 ? "Comments" : "Comment"}`}</p>
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
