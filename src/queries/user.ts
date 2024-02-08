import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

import { postUsers, putUser } from "@/apis/user";
import { userPutRequestBody, UsersPostRequestBody } from "@/apis/user/schema";
import { ConflictRequestError } from "@/helpers/error";
import { ErrorDialogActionContext } from "@/providers/ErrorDialogProvider";
import { UserContext } from "@/providers/UserProvider";
import { PAGE_ROUTES } from "@/routes";

export const useSignup = () => {
  const router = useRouter();
  const { open: openValidationErrorDialog } = useContext(
    ErrorDialogActionContext,
  );

  const mutation = useMutation({
    mutationFn: ({ email, password, type }: UsersPostRequestBody) =>
      postUsers({ email, password, type }),
    onSuccess: () => {
      alert("가입이 완료되었습니다.");
      router.push(PAGE_ROUTES.SIGNIN);
    },
    onError: (err) => {
      if (err instanceof ConflictRequestError)
        openValidationErrorDialog(err.message);
    },
  });

  return mutation;
};

export const useMyRegister = () => {
  const user = useContext(UserContext);
  const router = useRouter();
  const { open: openErrorDialog } = useContext(ErrorDialogActionContext);

  const { mutate } = useMutation({
    mutationFn: ({ name, phone, address, bio }: userPutRequestBody) =>
      putUser(user!.id, { name, phone, address, bio }),
    onSuccess: () => {
      router.replace(PAGE_ROUTES.MY);
    },
    onError: (err) => {
      openErrorDialog(err.message);
    },
  });

  return { mutate };
};
