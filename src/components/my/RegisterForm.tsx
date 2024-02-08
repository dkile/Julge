import useMyRegisterForm from "@/components/my/useMyRegisterForm";
import { CheckRadioGroupItem } from "@/components/signup/CheckRadioGroupItem";
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
import { RadioGroup } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function RegisterForm() {
  const { form, onSubmit, rules, handlers } = useMyRegisterForm();
  const addressList = [
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full flex-col"
      >
        <div className="flex flex-col gap-[28px]">
          <FormField
            control={form.control}
            name="name"
            rules={rules.name}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-[1.6rem]">이름*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="이름을 입력해주세요."
                    {...field}
                    onBlur={handlers.name.onBlur}
                    className="mt-[0.8rem] w-full focus-visible:ring-gray-40 data-[invalid]:border-red-40"
                  />
                </FormControl>
                <FormMessage className="absolute text-[1.2rem]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            rules={rules.phone}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[1.6rem]">{"연락처*"}</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="010-OOOO-OOOO"
                    {...field}
                    onBlur={handlers.phone.onBlur}
                    className="mt-[0.8rem] w-full focus-visible:ring-gray-40"
                  />
                </FormControl>
                <FormMessage className="absolute text-[1.2rem]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            rules={rules.address}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[1.6rem]">선호 지역*</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-[8px]">
                    {addressList.map((address) => (
                      <SelectItem key={address} value={address}>
                        {address}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="absolute text-[1.2rem]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            rules={rules.bio}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[1.6rem]">성별</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-[1.6rem]"
                  >
                    <FormItem
                      className={cn(
                        "flex items-center justify-center gap-[1.2rem] space-y-0 rounded-[3.2rem] border-[0.1rem] border-gray-30 bg-white px-[4.2rem] py-[1.2rem]",
                        field.value === "male" && "border-primary",
                      )}
                    >
                      <FormControl>
                        <CheckRadioGroupItem value="male" />
                      </FormControl>
                      <FormLabel className="text-[1.4rem]">남성</FormLabel>
                    </FormItem>
                    <FormItem
                      className={cn(
                        "flex items-center justify-center gap-[1.2rem] space-y-0 rounded-[3.2rem] border-[0.1rem] border-gray-30 bg-white px-[4.2rem] py-[1.2rem]",
                        field.value === "female" && "border-primary",
                      )}
                    >
                      <FormControl>
                        <CheckRadioGroupItem value="female" />
                      </FormControl>
                      <FormLabel className="text-[1.4rem]">여성</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage className="absolute text-[1.2rem]" />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-auto">
          <Button
            type="submit"
            disabled={!form.formState.isValid}
            className="flex h-max w-full rounded-[8px] py-[1.6rem] text-[1.6rem]"
          >
            등록하기
          </Button>
        </div>
      </form>
    </Form>
  );
}
