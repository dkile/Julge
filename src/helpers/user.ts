import { ShopDTO } from "@/apis/user/schema";
import { UserDTO, UserGetResponse } from "@/apis/user/schema";

export const extractUserShopDTOFromResponse = (
  res: UserGetResponse,
): { user: UserDTO; shop: ShopDTO } => {
  const { item: user } = res;
  const {
    shop: { item: shopDTO },
  } = user;
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
    shop: shopDTO,
  };
};
