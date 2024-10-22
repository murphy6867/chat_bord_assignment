/* eslint-disable no-unused-vars */
"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";

import { Input } from "../ui/input";
import FilterDropdown from "../ui/FilterDropdown";
import ComponentDialogCreatePost from "@/components/ui/ComponentDialogCreatePost";
import { PenIcon, TrashIcon } from "@/public/icons/types";
import ComponentDialog from "@/components/ui/ComponentDialog";

import { Category, OurPostContent } from "./types";
import { CommentIcon } from "@/public/icons/types";

interface OurContentProps {
  contents: OurPostContent[];
  category: Category[];
  userId: string;
}

interface CategoryOption {
  id: number;
  name: string;
}

const OurContent: FC<OurContentProps> = ({ contents, category, userId }) => {
  const defaultFilter: CategoryOption = {
    id: 0,
    name: "Community",
  };
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [filteredContents, setFilteredContents] =
    useState<OurPostContent[]>(contents);
  const [categoryOptions, setCategoryOptions] = useState<Category[]>([
    defaultFilter,
    ...category,
  ]);
  const [selectedFilter, setSelectedFilter] = useState<CategoryOption | null>(
    defaultFilter
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<OurPostContent | null>(null);

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

  const handleDialogOpen = (isOpen: boolean) => {
    setIsDialogOpen(isOpen);
  };

  const handleOpenDeleteDialog = (post: OurPostContent) => {
    setPostToDelete(post);
    setIsDeleteDialogOpen(true);
  };

  const handleDeletePost = async () => {
    if (postToDelete) {
      try {
        const response = await fetch(
          `http://localhost:8000/posts/${postToDelete.id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          // Update the UI to remove the deleted post
          const updatedContents = filteredContents.filter(
            (post) => post.id !== postToDelete.id
          );
          setFilteredContents(updatedContents);
          setIsDeleteDialogOpen(false);
        } else {
          console.error("Failed to delete post");
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  useEffect(() => {
    if (searchKeyword) {
      fetchPostsByKeyword(searchKeyword);
    } else {
      setFilteredContents(contents);
    }
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
              sessionUserId={userId || ""}
            />
          </div>
        </div>
      </section>
      <section className="bg-white rounded-xl shadow flex flex-col gap-5 p-6">
        {isDeleteDialogOpen && (
          <ComponentDialog
            isOpen={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <div className="text-center">
              <p className="mb-4">Are you sure you want to delete this post?</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleDeletePost}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Yes, delete
                </button>
                <button
                  onClick={() => setIsDeleteDialogOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </ComponentDialog>
        )}

        {filteredContents.map((post) => (
          <div className="p-6 border-b border-gray-300">
            <div className="flex items-center justify-between gap-3 mb-">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                <div>
                  <h2 className="font-semibold text-lg">
                    {post.user.username}
                  </h2>
                </div>
              </div>
              <div className="flex gap-7">
                <Image src={PenIcon} width={18} height={18} alt="Pen Image" />
                <Image
                  src={TrashIcon}
                  width={18}
                  height={18}
                  alt="Trash Image"
                  onClick={() => handleOpenDeleteDialog(post)}
                />
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
        ))}
        {filteredContents.length === 0 && (
          <h1 className="p-5 text-center">No Content</h1>
        )}
      </section>
    </main>
  );
};

export default OurContent;
