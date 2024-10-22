/* eslint-disable no-unused-vars */
import { FC, useState } from "react";
// import { useFormState } from "react-dom";

import { createPost } from "@/lib/createPost";
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
// import SubmitButton from "./submitButton";

interface ComponentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
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
const ComponentDialog: FC<ComponentDialogProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterOption | null>(
    null
  );
  // const [state, action] = useFormState(createPost, undefined);

  // console.log("====================================");
  // console.log("state", state);
  // console.log("====================================");

  const handleFilterSelect = (option: FilterOption) => {
    setSelectedFilter(option);
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
              <form action={createPost} className="flex flex-col space-y-4">
                <div className="border border-green-500 rounded-xl w-3/5 md:w-2/5 py-1">
                  <FilterDropdown
                    options={filterOptions}
                    selectedFilter={selectedFilter}
                    onSelect={handleFilterSelect}
                    textRender={"Choose a community"}
                  />
                </div>
                <div className="border border-gray-300 rounded-xl py-1">
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Title"
                    className="w-full  border-white rounded-xl  text-gray-600"
                  />
                </div>
                <div className="border border-gray-300 rounded-xl py-1 h-36">
                  <Textarea
                    id="content"
                    name="content"
                    placeholder={`What’s on your mind...`}
                    className="w-full  border-white rounded-xl  text-gray-600 h-full"
                  />
                </div>
                <div className="text-right space-x-2">
                  <Button className="shadow-none border !border-green-500 bg-white rounded-xl text-green-500 w-24">
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

export default ComponentDialog;
