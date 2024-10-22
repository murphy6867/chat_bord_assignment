/* eslint-disable no-unused-vars */
import { FC, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FilterDropdown from "./FilterDropdown";
import { Input } from "./input";
import { Textarea } from "./textarea";

interface CategoryOption {
  id: number;
  name: string;
}

interface ComponentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  categoryOptions: CategoryOption[];
  sessionUserId: string;
}

const ComponentDialogEditPost: FC<ComponentDialogProps> = ({
  isOpen,
  onOpenChange,
  categoryOptions,
  sessionUserId,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<CategoryOption | null>(
    null
  );
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleFilterSelect = (option: CategoryOption) => {
    setSelectedFilter(option);
  };

  const handleSubmitCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFilter) {
      console.error("Please select a category.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          userId: +sessionUserId,
          categoryId: selectedFilter.id,
        }),
      });

      const result = await response.json();
      onOpenChange(false);
      // console.log("Post created successfully:", result);
    } catch (error) {
      console.error("Error submitting post:", error);
      onOpenChange(false);
    } finally {
      window.location.reload();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-full shadow-none border-none text-white bg-green-500 hover:bg-green-400 rounded-xl">
          Create +
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white !rounded-xl w-[90%]">
        <DialogHeader>
          <DialogTitle className="mb-5 text-left text-2xl">
            Create Post
          </DialogTitle>
          <DialogDescription>
            <div>
              <form
                onSubmit={handleSubmitCreatePost}
                className="flex flex-col space-y-4"
              >
                <div className="border border-green-500 rounded-xl w-3/5 md:w-2/5 py-1">
                  <FilterDropdown
                    options={categoryOptions}
                    selectedFilter={selectedFilter}
                    onSelect={handleFilterSelect}
                    textRender="Choose a community"
                  />
                </div>
                <div className="border border-gray-300 rounded-xl py-1">
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Title"
                    className="w-full border-white rounded-xl text-gray-600"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="border border-gray-300 rounded-xl py-1 h-36">
                  <Textarea
                    id="content"
                    name="content"
                    placeholder="What’s on your mind..."
                    className="w-full border-white rounded-xl text-gray-600 h-full"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="text-right space-x-2">
                  <Button
                    type="button"
                    className="shadow-none border !border-green-500 bg-white rounded-xl text-green-500 w-24"
                    onClick={() => onOpenChange(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="shadow-none border !border-green-500 bg-green-500 rounded-xl text-white w-24"
                  >
                    Post
                  </Button>
                </div>
              </form>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ComponentDialogEditPost;
