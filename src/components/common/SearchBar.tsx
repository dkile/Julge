import Image from "next/image";
import { useRouter } from "next/router";
import { KeyboardEvent } from "react";

import { PAGE_ROUTES } from "@/routes";

export default function SearchBar() {
  const router = useRouter();

  const handleEnterPressed = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter")
      router.push({
        pathname: PAGE_ROUTES.NOTICES,
        query: {
          search: (e.target as HTMLInputElement).value,
        },
      });
  };
  return (
    <div className="flex max-w-[480px] gap-[8px] rounded-[8px] bg-gray-10 p-[12px]">
      <Image src="/icons/search.svg" alt="" width={20} height={20} />
      <input
        className="w-full overflow-hidden bg-inherit text-[1.4rem] placeholder:text-[1.4rem] focus:outline-none"
        placeholder="가게 이름으로 찾아보세요"
        onKeyDown={handleEnterPressed}
      />
    </div>
  );
}
