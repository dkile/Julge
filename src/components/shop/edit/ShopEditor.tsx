import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { postImages, putPresignedURL } from "@/apis/image";
import { putShopEditData } from "@/apis/shop";
import ShopDataForm from "@/components/shop/ShopDataForm";
import { PAGE_ROUTES } from "@/routes";

const formSchema = z.object({
  name: z.string(),
  category: z.string(),
  address1: z.string(),
  address2: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  originalHourlyPay: z.string(),
});

type ModalDataType = {
  msg: string;
  path: string;
};

interface ShopEditorProps {
  shopId: string;
  shopData: {
    id: string;
    name: string;
    category: string;
    address1: string;
    address2: string;
    description: string;
    imageUrl: string;
    originalHourlyPay: string;
  };
}

export default function ShopEditor({ shopId, shopData }: ShopEditorProps) {
  const [modalData, setModalData] = useState<null | ModalDataType>(null);
  const [imgURL, setImgURL] = useState(shopData.imageUrl);

  const form = useForm<z.infer<typeof formSchema>>({
    values: {
      name: shopData.name,
      category: shopData.category,
      address1: shopData.address1,
      address2: shopData.address2,
      description: shopData.description,
      imageUrl: shopData.imageUrl,
      originalHourlyPay: shopData.originalHourlyPay,
    },
  });

  const handleInputImgFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const presignedURL = await postImages(token, file.name);
      await putPresignedURL(presignedURL, file);
      const nonQueryPresignedURL = presignedURL.split("?")[0];
      setImgURL(nonQueryPresignedURL);
    }
  };

  const token = ""; // 임시값

  async function onSubmit(values: z.infer<typeof formSchema>) {
    values.imageUrl = imgURL;
    try {
      await putShopEditData(token, values, shopId);
      setModalData({
        msg: "수정이 완료되었습니다.",
        path: PAGE_ROUTES.parseShopsURL(shopId),
      });
    } catch (err: any) {
      if (err.response.status === 401) {
        setModalData({
          msg: "로그인이 필요합니다.",
          path: PAGE_ROUTES.SIGNIN,
        });
      } else if (err.response.status === 404) {
        setModalData({
          msg: "존재하지 않는 가게입니다.",
          path: PAGE_ROUTES.SHOPS,
        });
      }
    }
  }

  return (
    <ShopDataForm
      form={form}
      onSubmit={onSubmit}
      imgURL={imgURL}
      handleInputImgFile={handleInputImgFile}
      buttonText="수정하기"
      modalData={modalData}
    />
  );
}
