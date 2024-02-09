import AddressList from "@/components/notices/AddressList";
import { ScrollArea } from "@/components/ui/scroll-area";

const ADDRESS = [
  "서울시 강남구",
  "서울시 강동구",
  "서울시 강북구",
  "서울시 강서구",
  "서울시 관악구",
  "서울시 광진구",
  "서울시 구로구",
  "서울시 금천구",
  "서울시 노원구",
  "서울시 도봉구",
  "서울시 동대문구",
  "서울시 동작구",
  "서울시 마포구",
  "서울시 서대문구",
  "서울시 서초구",
  "서울시 성동구",
  "서울시 성북구",
  "서울시 송파구",
  "서울시 양천구",
  "서울시 영등포구",
  "서울시 용산구",
  "서울시 은평구",
  "서울시 종로구",
  "서울시 중구",
  "서울시 중랑구",
];

interface AddressSelectorProps {
  address: string[];
  setAddress: (value: string[]) => void;
}

export default function AddressSelector({
  address,
  setAddress,
}: AddressSelectorProps) {
  const handleAddAddress = (value: string) => {
    const newSet = new Set(address);
    newSet.add(value);
    setAddress(Array.from(newSet));
  };

  return (
    <div className="flex flex-col gap-[1.2rem]">
      <ScrollArea className="h-[25.8rem] border-[1px] border-solid p-[0.5rem]">
        <ul className="flex flex-wrap justify-between">
          {ADDRESS.map((item) => {
            return (
              <li
                className="w-[45%] cursor-pointer p-[0.5rem] text-center text-[1.4rem] hover:rounded-[0.8rem] hover:bg-red-10"
                onClick={() => handleAddAddress(item)}
                key={item}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </ScrollArea>
      <AddressList address={address} setAddress={setAddress} />
    </div>
  );
}
