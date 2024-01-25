import { createContext, PropsWithChildren } from "react";

import { useDialog } from "@/hooks/useDialog";

export const DialogContext = createContext(false);
export const DialogActionContext = createContext({
  open: () => {},
  close: () => {},
  toggle: () => {},
});

interface Props extends PropsWithChildren {
  initialOpened?: boolean;
}

export default function DialogProvider({
  initialOpened = false,
  children,
}: Props) {
  const { opened, open, close, toggle } = useDialog(initialOpened);

  return (
    <DialogContext.Provider value={opened}>
      <DialogActionContext.Provider value={{ open, close, toggle }}>
        {children}
      </DialogActionContext.Provider>
    </DialogContext.Provider>
  );
}
