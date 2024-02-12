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
import BackPageButton from "@/components/ui/BackPageButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import { errorMessage } from "@/helpers/validation";

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
  const NUM_REGEX = /^\d+$/;

  return (
    <div className="bg-[#fafafa]">
      <div className="mx-auto flex w-[35.1rem] flex-col gap-[2.4rem] pb-[8rem] pt-[4rem] tablet:w-[68rem] tablet:gap-[3.2rem] tablet:py-[6rem] desktop:w-[96.4rem]">
        <div className="flex items-center justify-between">
          <span className="text-[2rem] font-bold text-black tablet:text-[2.8rem]">
            가게 정보
          </span>
          <BackPageButton />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-[2rem] tablet:flex-row tablet:flex-wrap tablet:justify-between tablet:gap-y-[2.4rem]">
              <FormField
                control={form.control}
                rules={{
                  required: {
                    value: true,
                    message: errorMessage.REQUIRED_SHOPNAME,
                  },
                }}
                name="name"
                render={({ field }) => (
                  <FormItem className="relative flex flex-col">
                    <FormLabel className="text-[1.6rem] leading-[2.6rem]">
                      가게 이름*
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-[1.6rem] leading-[2.6rem] tablet:w-[33rem] desktop:w-[47.2rem]"
                        placeholder="입력"
                        {...field}
                        onBlur={() => form.trigger("name")}
                      />
                    </FormControl>
                    <FormMessage className="absolute bottom-[-2rem] text-[1.2rem]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                rules={{
                  required: {
                    value: true,
                    message: errorMessage.REQUIRED_SHOPCATEGORY,
                  },
                }}
                name="category"
                render={({ field }) => (
                  <FormItem className="relative flex flex-col">
                    <FormLabel className="text-[1.6rem] leading-[2.6rem] tablet:w-[33rem] desktop:w-[47.2rem]">
                      분류*
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="text-[1.6rem] leading-[2.6rem]">
                          <SelectValue placeholder="선택" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage className="absolute bottom-[-2rem] text-[1.2rem]" />
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
                rules={{
                  required: {
                    value: true,
                    message: errorMessage.REQUIRED_ADDRESS,
                  },
                }}
                name="address1"
                render={({ field }) => (
                  <FormItem className="relative flex flex-col">
                    <FormLabel className="text-[1.6rem] leading-[2.6rem] tablet:w-[33rem] desktop:w-[47.2rem]">
                      주소*
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="text-[1.6rem] leading-[2.6rem]">
                          <SelectValue placeholder="선택" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage className="absolute bottom-[-2rem] text-[1.2rem]" />
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
                rules={{
                  required: {
                    value: true,
                    message: errorMessage.REQUIRED_DETAILED_ADDRESS,
                  },
                }}
                name="address2"
                render={({ field }) => (
                  <FormItem className="relative flex flex-col">
                    <FormLabel className="text-[1.6rem] leading-[2.6rem] tablet:w-[33rem] desktop:w-[47.2rem]">
                      상세 주소*
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-[1.6rem] leading-[2.6rem]"
                        placeholder="입력"
                        {...field}
                        onBlur={() => form.trigger("address2")}
                      />
                    </FormControl>
                    <FormMessage className="absolute bottom-[-2rem] text-[1.2rem]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                rules={{
                  required: {
                    value: true,
                    message: errorMessage.REQUIRED_HOURLYPAY,
                  },
                  pattern: {
                    value: NUM_REGEX,
                    message: errorMessage.REQUIRED_NUMBER,
                  },
                  min: {
                    value: 9860,
                    message: errorMessage.INVALID_HOURLYPAY,
                  },
                }}
                name="originalHourlyPay"
                render={({ field }) => (
                  <FormItem className="relative flex flex-col">
                    <FormLabel className="text-[1.6rem] leading-[2.6rem] tablet:w-[33rem] desktop:w-[47.2rem]">
                      기본 시급*
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          className="text-[1.6rem] leading-[2.6rem]"
                          placeholder="입력"
                          {...field}
                          onBlur={() => form.trigger("originalHourlyPay")}
                        />
                      </FormControl>
                      <span className="absolute right-[2rem] top-[1.6rem] text-[1.6rem]">
                        원
                      </span>
                    </div>
                    <FormMessage className="absolute bottom-[-2rem] text-[1.2rem]" />
                  </FormItem>
                )}
              />
              <FormItem className="relative flex flex-col">
                <FormLabel
                  htmlFor="imgSelector"
                  className="text-[1.6rem] leading-[2.6rem]"
                >
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
                  <FormItem className="relative flex flex-col">
                    <FormLabel className="text-[1.6rem] leading-[2.6rem]">
                      가게 설명
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="입력"
                        className="h-[15.3rem] resize-none rounded-[0.5rem] px-[2rem] py-[1.6rem] text-[1.6rem] leading-[2.6rem] tablet:h-[15.3rem] tablet:w-[68rem] desktop:w-[96.4rem]"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="mt-[2.4rem] flex h-[4.8rem] w-[35.1rem] items-center justify-center px-[13.6rem] py-[1.4rem] text-[1.6rem] font-bold leading-[2rem] tablet:mx-auto tablet:mt-[3.2rem]"
                  disabled={!form.formState.isValid}
                  type="submit"
                >
                  {buttonText}
                </Button>
              </AlertDialogTrigger>
              {modalData && (
                <AlertDialogContent className="h-[22rem] w-[32.7rem] justify-center gap-0 rounded-[0.8rem] p-0 tablet:h-[25rem] tablet:w-[54rem]">
                  <AlertDialogHeader>
                    <AlertDialogTitle className=" mt-[8.1rem] font-pretendard text-[1.6rem] font-[500] tablet:mt-[10.8rem] tablet:text-[1.8rem]">
                      {modalData.msg}
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="pb-[2.8rem] tablet:absolute tablet:bottom-[0] tablet:right-[2.8rem]">
                    <Link href={modalData.path}>
                      <AlertDialogAction className="h-[4.2rem] w-[13.8rem] rounded-[0.8rem] font-pretendard text-[1.4rem] font-[500] tablet:text-[1.6rem]">
                        확인
                      </AlertDialogAction>
                    </Link>
                  </AlertDialogFooter>
                </AlertDialogContent>
              )}
            </AlertDialog>
          </form>
        </Form>
      </div>
    </div>
  );
}
