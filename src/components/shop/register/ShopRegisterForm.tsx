import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { fetcher } from "@/apis/fetcher";
import { ShopRegisterFormModal } from "@/components/shop/register/ShopRegisterFormModal";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { apiRouteUtils } from "@/routes";

const CATEGORY = [
  "한식",
  "중식",
  "일식",
  "양식",
  "분식",
  "카페",
  "편의점",
  "기타",
];
const ADDRESS = [
  "서울시 종로구",
  "서울시 중구",
  "서울시 용산구",
  "서울시 성동구",
  "서울시 광진구",
  "서울시 동대문구",
  "서울시 중랑구",
  "서울시 성북구",
  "서울시 강북구",
  "서울시 도봉구",
  "서울시 노원구",
  "서울시 은평구",
  "서울시 서대문구",
  "서울시 마포구",
  "서울시 양천구",
  "서울시 강서구",
  "서울시 구로구",
  "서울시 금천구",
  "서울시 영등포구",
  "서울시 동작구",
  "서울시 관악구",
  "서울시 서초구",
  "서울시 강남구",
  "서울시 송파구",
  "서울시 강동구",
];

const formSchema = z.object({
  name: z.string(),
  category: z.string(),
  address1: z.string(),
  address2: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  originalHourlyPay: z.string(),
});

export default function ShopRegisterForm() {
  const [responseResult, setResponseResult] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      address1: "",
      address2: "",
      description: "",
      imageUrl: "https://i.ibb.co/s9ZGXVd/202312223572.png",
      originalHourlyPay: "",
    },
  });

  const token = null; // 임시값

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await fetcher.post(apiRouteUtils.SHOPS, {
        json: values,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResponseResult("200");
    } catch (e: any) {
      if (e.response.status === 401) {
        setResponseResult("401");
      } else if (e.response.status === 409) {
        setResponseResult("409");
      }
    }
  }

  return (
    <>
      <div className="flex justify-between">
        <span>가게 정보</span>
        <Image src="/icons/close.svg" width="10" height="10" alt="종료이미지" />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            rules={{ required: true }}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>가게 이름*</FormLabel>
                <FormControl>
                  <Input placeholder="입력" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            rules={{ required: true }}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>분류*</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="입력" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CATEGORY.map((item) => {
                      return (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            rules={{ required: true }}
            name="address1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>주소*</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="입력" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ADDRESS.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            rules={{ required: true }}
            name="address2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>상세 주소*</FormLabel>
                <FormControl>
                  <Input placeholder="입력" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            rules={{ required: true }}
            name="originalHourlyPay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>기본 시급*</FormLabel>
                <FormControl>
                  <Input type="number" min={0} placeholder="입력" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          {/* TODO: Input Type : file 추가 예정 */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>가게 설명</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="입력"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button type="submit">등록하기</Button>
            </AlertDialogTrigger>
            <ShopRegisterFormModal responseResult={responseResult} />
          </AlertDialog>
        </form>
      </Form>
    </>
  );
}
