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
import { Textarea } from "../ui/textarea";

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
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // edit
  const [postToDelete, setPostToDelete] = useState<OurPostContent | null>(null);
  const [postToEdit, setPostToEdit] = useState<OurPostContent | null>(null); // edit

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

  const handldeOpenEditDialog = (edit: OurPostContent) => {
    setPostToEdit(edit);
    setIsEditDialogOpen(true);
  };

  const handleEditPost = async () => {
    if (postToEdit) {
      try {
        const response = await fetch(
          `http://localhost:8000/posts/${postToEdit.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              title: postToEdit.title,
              content: postToEdit.content,
              categoryId: postToEdit.categoryId,
            }),
          }
        );
        setIsEditDialogOpen(false);
      } catch (error) {
        console.error("Error occurred:", error);
        alert(
          "An error occurred while processing your request. Please try again."
        );
        setIsEditDialogOpen(false);
      } finally {
        window.location.reload();
      }
    }
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
              <h2 className="text-3xl font-medium pb-3">
                Please confirm if you wish to delete the post
              </h2>
              <p className="mb-8 text-gray-500">
                Are you sure you want to delete the post? Once deleted, it
                cannot be recovered.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setIsDeleteDialogOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-xl w-32"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeletePost}
                  className="bg-red-500 text-white px-4 py-2 rounded-xl w-32"
                >
                  Delete
                </button>
              </div>
            </div>
          </ComponentDialog>
        )}

        {isEditDialogOpen && (
          <ComponentDialog
            isOpen={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            isEditPost={true}
          >
            <div className="text-start w-full flex flex-col items-start ">
              <h2 className="text-3xl font-medium pb-3">Edit Post</h2>
              <div className="flex flex-col gap-4 items-start w-full">
                <div className="border border-green-500 rounded-xl font-bold text-green-500">
                  <FilterDropdown
                    options={categoryOptions}
                    selectedFilter={
                      categoryOptions.find(
                        (option) => option.id === postToEdit?.categoryId
                      ) || null
                    }
                    onSelect={(selectedCategory) =>
                      setPostToEdit(
                        (prev) =>
                          prev && { ...prev, categoryId: selectedCategory.id }
                      )
                    }
                    textRender={""}
                  />
                </div>
                <Input
                  type="text"
                  placeholder="Title"
                  className="w-full border-gray-300 rounded-xl py-3"
                  value={postToEdit?.title || ""}
                  onChange={(e) =>
                    setPostToEdit(
                      (prev) => prev && { ...prev, title: e.target.value }
                    )
                  }
                />
                <Textarea
                  placeholder="Content"
                  className="w-full h-32 border-gray-300 rounded-xl py-3 px-4"
                  value={postToEdit?.content || ""}
                  onChange={(e) =>
                    setPostToEdit(
                      (prev) => prev && { ...prev, content: e.target.value }
                    )
                  }
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6 w-full ">
                <button
                  onClick={() => setIsEditDialogOpen(false)}
                  className="bg-white border border-green-500 hover:bg-green-200  text-green-500 px-4 py-2 rounded-xl w-32"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditPost}
                  className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-xl w-32"
                >
                  Confirm
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
                <Image
                  src={PenIcon}
                  width={18}
                  height={18}
                  alt="Pen Image"
                  onClick={() => handldeOpenEditDialog(post)}
                  className="hover:cursor-pointer"
                />
                <Image
                  src={TrashIcon}
                  width={18}
                  height={18}
                  alt="Trash Image"
                  onClick={() => handleOpenDeleteDialog(post)}
                  className="hover:cursor-pointer"
                />
              </div>
            </div>
            <span className="text-sm text-gray-700 bg-gray-200 py-1 px-3 rounded-2xl">
              {post.category.name}
            </span>
            <h3 className="text-xl font-semibold mb-2 mt-4">{post.title}</h3>
            <p className="text-gray-700 overflow-hidden text-ellipsis ">
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
