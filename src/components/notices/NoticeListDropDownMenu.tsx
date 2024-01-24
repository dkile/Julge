import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function NoticeDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="w-[auto] justify-between bg-gray-10 text-[1.2rem] font-bold "
          variant="outline"
        >
          Open
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>마감임박순</DropdownMenuItem>
          <DropdownMenuItem>시급많은순</DropdownMenuItem>
          <DropdownMenuItem>시급적은순</DropdownMenuItem>
          <DropdownMenuItem>가나다순</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
