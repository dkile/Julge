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
          "h-[22rem] w-[32.7rem] justify-center gap-0 rounded-[0.8rem] p-0 tablet:h-[25rem] tablet:w-[54rem]",
          fontPretendard.variable,
        )}
      >
        <DialogDescription className="mt-[8.1rem] font-pretendard text-[1.6rem] font-[500] tablet:mt-[10.8rem] tablet:text-[1.8rem]">
          {errorMessage}
        </DialogDescription>
        <DialogFooter className="mx-auto pb-[2.8rem] tablet:absolute tablet:bottom-[0] tablet:right-[2.8rem]">
          <Button
            type="button"
            onClick={close}
            className="h-[4.2rem] w-[13.8rem] rounded-[0.8rem] font-pretendard text-[1.4rem] font-[500] tablet:text-[1.6rem]"
          >
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
