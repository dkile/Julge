import { useState } from "react";

export const useDialog = (initial = false) => {
  const [opened, setOpened] = useState(initial);

  const open = () => {
    setOpened(true);
  };

  const close = () => {
    setOpened(false);
  };

  const toggle = () => {
    setOpened((o) => !o);
  };

  return { opened, open, close, toggle };
};
