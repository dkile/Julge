import { CheckRadioGroupItem } from "@/components/signup/CheckRadioGroupItem";
import ValidationErrorDialog from "@/components/signup/ValidationErrorDialog";
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
import useSignupForm from "@/hooks/useSignupForm";
import { cn } from "@/lib/utils";

export default function SignupForm() {
  const { form, onSubmit, rules, handlers } = useSignupForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-[2.8rem]"
      >
        <FormField
          control={form.control}
          name="email"
          rules={rules.email}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-[1.6rem]">이메일</FormLabel>
              <FormControl>
                <Input
                  placeholder="이메일을 입력해주세요."
                  {...field}
                  onBlur={handlers.email.onBlur}
                  className="mt-[0.8rem] w-full focus-visible:ring-gray-40 data-[invalid]:border-red-40"
                />
              </FormControl>
              <FormMessage className="absolute text-[1.2rem]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          rules={rules.password}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[1.6rem]">비밀번호</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  {...field}
                  onBlur={handlers.password.onBlur}
                  className="mt-[0.8rem] w-full focus-visible:ring-gray-40"
                />
              </FormControl>
              <FormMessage className="absolute text-[1.2rem]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirm"
          rules={rules.passwordConfirm}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[1.6rem]">비밀번호 확인</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="비밀번호를 다시 입력해주세요."
                  {...field}
                  onBlur={handlers.passwordConfirm.onBlur}
                  className="mt-[0.8rem] w-full focus-visible:ring-gray-40"
                />
              </FormControl>
              <FormMessage className="absolute text-[1.2rem]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          rules={rules.type}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[1.6rem]">회원 유형</FormLabel>
              <FormControl>
                <RadioGroup
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  className="flex gap-[1.6rem]"
                >
                  <FormItem
                    className={cn(
                      "flex items-center justify-center gap-[1.2rem] space-y-0 rounded-[3.2rem] border-[0.1rem] border-gray-30 bg-white px-[4.2rem] py-[1.2rem]",
                      field.value === "employee" && "border-primary",
                    )}
                  >
                    <FormControl>
                      <CheckRadioGroupItem value="employee" />
                    </FormControl>
                    <FormLabel className="text-[1.4rem]">알바님</FormLabel>
                  </FormItem>
                  <FormItem
                    className={cn(
                      "flex items-center justify-center gap-[1.2rem] space-y-0 rounded-[3.2rem] border-[0.1rem] border-gray-30 bg-white px-[4.2rem] py-[1.2rem]",
                      field.value === "employer" && "border-primary",
                    )}
                  >
                    <FormControl>
                      <CheckRadioGroupItem value="employer" />
                    </FormControl>
                    <FormLabel className="text-[1.4rem]">사장님</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage className="absolute text-[1.2rem]" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={!form.formState.isValid}
          className="h-max rounded-[0.6rem] py-[1.6rem] text-[1.6rem]"
        >
          가입하기
        </Button>
        <ValidationErrorDialog />
      </form>
    </Form>
  );
}
