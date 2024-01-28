import { useContext } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { DialogActionContext, DialogContext } from "@/providers/DialogProvider";
import { fontPretendard } from "@/styles/fonts";

export default function ValidationErrorDialog() {
  const opened = useContext(DialogContext);
  const { close, toggle } = useContext(DialogActionContext);

  // TODO: "비밀번호가 일치하지 않습니다."를 errorMessage로 바꾸고 외부에서 주입받도록 변경. errorMessage는 에러 객체의 message.
  return (
    <Dialog open={opened} onOpenChange={toggle}>
      <DialogContent
        className={cn(
          "flex h-[22.4rem] flex-col items-center justify-end gap-[4.8rem] rounded-[0.8rem] p-[3.2rem]",
          fontPretendard.variable,
        )}
      >
        <DialogDescription className="text-[1.6rem] text-black">
          비밀번호가 일치하지 않습니다.
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
