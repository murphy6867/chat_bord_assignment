/* eslint-disable no-unused-vars */
import { FC } from "react";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FilterOption {
  id: number;
  name: string;
}

interface FilterDropdownProps {
  options: FilterOption[];
  selectedFilter: FilterOption | null;
  textRender: string;
  onSelect: (option: FilterOption) => void;
}

const FilterDropdown: FC<FilterDropdownProps> = ({
  options,
  selectedFilter,
  textRender = "Community",
  onSelect,
}) => {
  const textClassName =
    textRender === "Choose a community" ? "text-green-500" : "text-black";
  const iconClassName =
    textRender === "Choose a community" ? "text-green-500" : "text-gray-900";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={`w-full shadow-none border-none ${textClassName} `}>
          {selectedFilter ? selectedFilter.name : textRender}
          <ChevronDown className={`h-6 w-6 ${iconClassName}`} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        {options.map((option) => (
          <DropdownMenuItem key={option.id} onSelect={() => onSelect(option)}>
            {option.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
