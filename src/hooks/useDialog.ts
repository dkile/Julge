import { useCallback, useState } from "react";

export const useDialog = (initial = false) => {
  const [opened, setOpened] = useState(initial);

  const open = useCallback(() => {
    setOpened(true);
  }, []);

  const close = useCallback(() => {
    setOpened(false);
  }, []);

  const toggle = useCallback(() => {
    setOpened((o) => !o);
  }, []);

  return { opened, open, close, toggle };
};
