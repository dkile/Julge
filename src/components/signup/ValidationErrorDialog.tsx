import { useContext } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { DialogActionContext, DialogContext } from "@/providers/DialogProvider";

export default function ValidationErrorDialog() {
  const opened = useContext(DialogContext);
  const { close, toggle } = useContext(DialogActionContext);

  // TODO: "이미 사용 중인 이메일입니다."를 errorMessage로 바꾸고 외부에서 주입받도록 변경. errorMessage는 에러 객체의 message.
  return (
    <Dialog open={opened} onOpenChange={toggle}>
      <DialogContent>
        <DialogDescription>이미 사용 중인 이메일입니다.</DialogDescription>
        <DialogFooter>
          <Button type="button" onClick={close}>
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
