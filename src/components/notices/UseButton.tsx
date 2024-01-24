import { useState } from "react";

import { Button } from "@/components/ui/button";

import FilterModal from "./FilterModal";

export default function UseButton() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const onCloseHandle = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Button
        onClick={openModal}
        className="w-[auto] bg-red-30 text-[1.2rem] font-semibold text-white"
      >
        상세 필터
      </Button>
      {modalIsOpen && (
        <div>
          <FilterModal isOpen={modalIsOpen} onClose={onCloseHandle} />
        </div>
      )}
    </>
  );
}
