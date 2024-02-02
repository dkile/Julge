import Image from "next/image";
import Link from "next/link";

import ShopImageCard from "@/components/shop/ShopImageCard";
import {
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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

interface ShopDataFormProps {
  form: any;
  onSubmit: (values: any) => void;
  imgURL: string;
  handleInputImgFile: (value: any) => void;
  buttonText: string;
  modalData: {
    msg: string;
    path: string;
  } | null;
}

export default function ShopDataForm({
  form,
  onSubmit,
  imgURL,
  handleInputImgFile,
  buttonText,
  modalData,
}: ShopDataFormProps) {
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
          <FormItem>
            <FormLabel htmlFor="imgSelector">
              가게 이미지
              <ShopImageCard imgURL={imgURL} />
            </FormLabel>
            <FormControl>
              <Input
                accept=".jpg, .jpeg, .png"
                className="hidden"
                id="imgSelector"
                type="file"
                onChange={handleInputImgFile}
              />
            </FormControl>
          </FormItem>
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
              <Button type="submit">{buttonText}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              {modalData && (
                <>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{modalData.msg}</AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <Link href={modalData.path}>
                      <AlertDialogAction>확인</AlertDialogAction>
                    </Link>
                  </AlertDialogFooter>
                </>
              )}
            </AlertDialogContent>
          </AlertDialog>
        </form>
      </Form>
    </>
  );
}
