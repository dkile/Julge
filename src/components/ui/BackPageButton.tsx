import Image from "next/image";
import { useRouter } from "next/router";

export default function BackPageButton() {
  const router = useRouter();
  const handleBackPage = () => {
    router.back();
  };

  return (
    <div className="cursor-pointer" onClick={handleBackPage}>
      <Image src="/icons/close.svg" width="24" height="24" alt="" />
    </div>
  );
}
