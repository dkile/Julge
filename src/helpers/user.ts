import { Shop, User } from "@/apis/schema";
import { UserGetResponse } from "@/apis/user/schema";

export const extractUserShopDTOFromResponse = (
  res: UserGetResponse,
): { user: User; shop: Shop | null } => {
  const { item: user } = res;
  const shopDTO = user.shop;
  return {
    user: {
      id: user.id,
      email: user.email,
      type: user.type,
      name: user.name,
      address: user.address,
      bio: user.bio,
      phone: user.phone,
    },
    shop: shopDTO ? shopDTO.item : null,
  };
};
