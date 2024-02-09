import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const frameworks = [
  {
    value: "time",
    label: "마감임박순",
  },
  {
    value: "pay",
    label: "시급많은순",
  },
  {
    value: "hour",
    label: "시간적은순",
  },
  {
    value: "shop",
    label: "가나다순",
  },
];

interface NotcieListDropdownMenuProps {
  handleSort: (value: string) => void;
}

export default function NoticeListDropdownMenu({
  handleSort,
}: NotcieListDropdownMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  React.useEffect(() => {
    handleSort(value);
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-[3rem] rounded-[0.5rem] bg-gray-10 p-[1.2rem] text-[1.4rem] font-semibold"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "마감임박순"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[10.5rem] p-[0.8rem]">
        <Command className="p-0">
          <CommandGroup className="p-0">
            {frameworks.map((framework) => (
              <CommandItem
                className=" h-[3rem] p-0 text-center text-[1.4rem] leading-[2.2rem]"
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue: string) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
