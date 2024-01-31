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
import useSigninForm from "@/hooks/useSigninForm";

export default function SigninForm() {
  const { form, onSubmit, rules, handlers } = useSigninForm();

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
        <Button
          type="submit"
          disabled={!form.formState.isValid}
          className="h-max rounded-[0.6rem] py-[1.6rem] text-[1.6rem]"
        >
          로그인 하기
        </Button>
      </form>
    </Form>
  );
}
