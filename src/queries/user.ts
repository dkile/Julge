import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

import { getUser, postUsers, putUser } from "@/apis/user";
import { userPutRequestBody, UsersPostRequestBody } from "@/apis/user/schema";
import { ConflictRequestError } from "@/helpers/error";
import { ErrorDialogActionContext } from "@/providers/ErrorDialogProvider";
import { UserActionContext, UserContext } from "@/providers/UserProvider";
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
  const { setProfile } = useContext(UserActionContext);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { open: openErrorDialog } = useContext(ErrorDialogActionContext);

  const { mutate } = useMutation({
    mutationFn: ({ name, phone, address, bio }: userPutRequestBody) =>
      putUser(user!.id, { name, phone, address, bio }),
    onSuccess: ({ item: user }) => {
      router.replace(PAGE_ROUTES.MY);
      queryClient.invalidateQueries({
        queryKey: ["user", user!.id],
      });
      setProfile(user);
    },
    onError: (err) => {
      openErrorDialog(err.message);
    },
  });

  return { mutate };
};

export const useUserQuery = () => {
  const user = useContext(UserContext);

  const { data, isLoading, error } = useQuery({
    queryKey: ["user", user?.id],
    queryFn: () => getUser(user?.id ?? ""),
    select: (data) => data.user,
    enabled: !!user,
  });

  return { user: data, isLoading, error };
};
