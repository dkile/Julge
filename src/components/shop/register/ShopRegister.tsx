import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { postImages, postShopRegistData, putPresignedURL } from "@/apis/shops";
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

export default function ShopRegister() {
  const [modalData, setModalData] = useState<null | ModalDataType>(null);
  const [imgURL, setImgURL] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      address1: "",
      address2: "",
      description: "",
      imageUrl: "https://i.ibb.co/0V2PH9f/default.jpg",
      originalHourlyPay: "",
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
      await postShopRegistData(token, values);
      setModalData({
        msg: "등록이 완료되었습니다.",
        path: PAGE_ROUTES.SHOPS,
      });
    } catch (err: any) {
      if (err.response.status === 401) {
        setModalData({
          msg: "로그인이 필요합니다.",
          path: PAGE_ROUTES.SIGNIN,
        });
      } else if (err.response.status === 409) {
        setModalData({
          msg: "이미 등록한 가게가 있습니다.",
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
      buttonText="등록하기"
      modalData={modalData}
    />
  );
}
