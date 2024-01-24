import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { postUsers } from "@/apis/user";
import { UserDTO, UsersRequestBody } from "@/apis/user/schema";
import { PAGE_ROUTES } from "@/routes";
import { User } from "@/types/user";

export const useSignup = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: ({ email, password, type }: UsersRequestBody) =>
      postUsers({ email, password, type }),
    onSuccess: () => {
      alert("가입이 완료되었습니다.");
      router.push(PAGE_ROUTES.SIGNIN);
    },
  });

  return mutation;
};

const mapUserDtoToUser = (dto: UserDTO): User => ({
  id: dto.id,
  type: dto.type,
});
