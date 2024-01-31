import { createContext, PropsWithChildren, useState } from "react";

import { useDialog } from "@/hooks/useDialog";

export const ErrorDialogContext = createContext({
  opened: false,
  errorMessage: "",
});
export const ErrorDialogActionContext = createContext({
  open: (errorMessage: string) => {},
  close: () => {},
  toggle: () => {},
});

interface Props extends PropsWithChildren {
  initialOpened?: boolean;
}

export default function ErrorDialogProvider({
  initialOpened = false,
  children,
}: Props) {
  const { opened, open: openDialog, close, toggle } = useDialog(initialOpened);
  const [errorMessage, setErrorMessage] = useState("");

  const open = (errorMessage: string) => {
    setErrorMessage(errorMessage);
    openDialog();
  };

  return (
    <ErrorDialogContext.Provider value={{ opened, errorMessage }}>
      <ErrorDialogActionContext.Provider value={{ open, close, toggle }}>
        {children}
      </ErrorDialogActionContext.Provider>
    </ErrorDialogContext.Provider>
  );
}
