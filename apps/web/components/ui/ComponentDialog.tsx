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

interface ComponentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}
interface FilterOption {
  id: number;
  name: string;
}

const filterOptions: FilterOption[] = [
  { id: 1, name: "Option 1" },
  { id: 2, name: "Option 2" },
  { id: 3, name: "Option 3" },
];
const ComponentDialog: FC<ComponentDialogProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterOption | null>(
    null
  );

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
      <DialogContent className="bg-white !rounded-xl">
        <DialogHeader>
          <DialogTitle className="mb-5">Create Post</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col space-y-4">
              <div className="border border-green-500 rounded-xl w-2/5 py-1">
                <FilterDropdown
                  options={filterOptions}
                  selectedFilter={selectedFilter}
                  onSelect={handleFilterSelect}
                  textRender={"Choose a community"}
                />
              </div>
              <div className="border border-gray-300 rounded-xl py-1">
                <Input
                  type="text"
                  placeholder="Title"
                  className="w-full  border-white rounded-xl  text-gray-600"
                />
              </div>
              <div className="border border-gray-300 rounded-xl py-1 h-32">
                <Input
                  type="text"
                  placeholder={`What’s on your mind...`}
                  className="w-full  border-white rounded-xl  text-gray-600"
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ComponentDialog;
