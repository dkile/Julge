interface AddressListProps {
  address: string[];
  setAddress: (value: string[]) => void;
}

export default function AddressList({ address, setAddress }: AddressListProps) {
  const handleAddress = (value: string) => {
    const deletedAddress = address.filter((address) => address !== value);
    setAddress(deletedAddress);
  };

  return (
    <div>
      <ul className="flex flex-wrap gap-[1rem]">
        {address.map((address: string) => (
          <li
            onClick={() => handleAddress(address)}
            className="w-auto cursor-pointer rounded-[2rem] bg-red-10 px-[0.8rem] py-[0.6rem] text-center text-[1.4rem] font-bold text-primary"
            key={address}
          >
            {address} X
          </li>
        ))}
      </ul>
    </div>
  );
}
