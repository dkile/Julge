import { useContext } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  ErrorDialogActionContext,
  ErrorDialogContext,
} from "@/providers/ErrorDialogProvider";
import { fontPretendard } from "@/styles/fonts";

export default function ErrorDialog() {
  const { opened, errorMessage } = useContext(ErrorDialogContext);
  const { close, toggle } = useContext(ErrorDialogActionContext);

  return (
    <Dialog open={opened} onOpenChange={toggle}>
      <DialogContent
        className={cn(
          "flex h-[22.4rem] flex-col items-center justify-end gap-[4.8rem] rounded-[0.8rem] p-[3.2rem]",
          fontPretendard.variable,
        )}
      >
        <DialogDescription className="text-[1.6rem] text-black">
          {errorMessage}
        </DialogDescription>
        <DialogFooter>
          <Button
            type="button"
            onClick={close}
            className="h-[4.2rem] w-[13.8rem] rounded-[0.6rem] font-pretendard text-[1.4rem]"
          >
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
