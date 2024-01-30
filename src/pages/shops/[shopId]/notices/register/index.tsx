import Image from "next/image";
import Link from "next/link";

import RegisterModal from "@/components/noticeRegister/Modal";
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
import useNoticeRegistForm from "@/hooks/useNoticeRegistForm";

function NoticeRegister() {
  const { form, onSubmit, rules, handlers } = useNoticeRegistForm();

  return (
    <>
      <Link href={"/notices"}>
        <div className="relative h-[1.5rem] w-[8.1rem]">
          <Image
            src="/icons/logo.svg"
            layout="fill"
            objectFit="contain"
            alt="로고이미지"
          />
        </div>
      </Link>
      <div className="flex h-screen flex-col items-center justify-center bg-[#FAFAFA]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="w-[37.5rem] gap-[0.8rem]">
              <div className="flex flex-col items-center justify-center">
                <div className="flex w-full flex-col items-start gap-[0.8rem] px-[1.2rem] pb-[8rem] pt-[4rem]">
                  <div className="flex w-full flex-col items-center gap-[2.4rem]">
                    <div className="flex w-full items-center justify-between self-stretch">
                      <h3 className="text-[2rem] font-bold not-italic leading-normal text-black">
                        공고 등록
                      </h3>
                      <Button
                        type="button"
                        variant="ghost"
                        className="relative h-[2.4rem] w-[2.4rem]"
                      >
                        <Image
                          src="/icons/close.svg"
                          layout="fill"
                          objectFit="contain"
                          alt="닫기이미지"
                        />
                      </Button>
                    </div>
                    <div className="flex w-full flex-col justify-end gap-[2rem]">
                      <div className="flex w-full flex-col items-start gap-[0.8rem]">
                        <FormField
                          control={form.control}
                          name="hourlyPay"
                          rules={rules.hourlyPay}
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel
                                className="text--black text-[1.6rem] font-normal not-italic leading-[2.6rem]"
                                htmlFor="hourlyPay"
                              >
                                시급*
                              </FormLabel>
                              <div className="relative inline-block w-full">
                                <FormControl className="w-full">
                                  <Input
                                    {...field}
                                    id="hourlyPay"
                                    name="hourlyPay"
                                    onBlur={handlers.hourlyPay.onBlur}
                                  />
                                </FormControl>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-[2rem] text-[1.6rem] font-normal not-italic leading-[2.6rem] text-black">
                                  원
                                </span>
                              </div>
                              <FormMessage className="absolute text-[1.2rem]" />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex w-full flex-col items-start gap-[0.8rem]">
                        <FormField
                          control={form.control}
                          name="startsAt"
                          rules={rules.startsAt}
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel
                                className="text--black text-[1.6rem] font-normal not-italic leading-[2.6rem]"
                                htmlFor="startsAt"
                              >
                                시작 일시*
                              </FormLabel>
                              <div className="relative inline-block w-full">
                                <FormControl className="w-full">
                                  <Input
                                    {...field}
                                    id="startsAt"
                                    name="startsAt"
                                    placeholder="2023-07-01 15:00"
                                    onBlur={handlers.startsAt.onBlur}
                                  />
                                </FormControl>
                              </div>
                              <FormMessage className="absolute text-[1.2rem]" />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex w-full flex-col items-start gap-[0.8rem]">
                        <FormField
                          control={form.control}
                          name="workhour"
                          rules={rules.workhour}
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel
                                className="text--black text-[1.6rem] font-normal not-italic leading-[2.6rem]"
                                htmlFor="workhour"
                              >
                                업무 시간*
                              </FormLabel>
                              <div className="relative inline-block w-full">
                                <FormControl className="w-full">
                                  <Input
                                    {...field}
                                    id="workhour"
                                    name="workhour"
                                    onBlur={handlers.workhour.onBlur}
                                  />
                                </FormControl>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-[2rem] text-[1.6rem] font-normal not-italic leading-[2.6rem] text-black">
                                  시간
                                </span>
                              </div>
                              <FormMessage className="absolute text-[1.2rem]" />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex w-full flex-col items-start gap-[0.8rem]">
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel
                                className="text--black text-[1.6rem] font-normal not-italic leading-[2.6rem]"
                                htmlFor="description"
                              >
                                공고 설명
                              </FormLabel>
                              <div className="relative inline-block w-full">
                                <FormControl className="w-full">
                                  <Input
                                    {...field}
                                    id="description"
                                    name="description"
                                  />
                                </FormControl>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <RegisterModal form={form} />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}

export default NoticeRegister;
