import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

import EmployerLayout from "@/components/common/EmployerLayout";
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
import { Textarea } from "@/components/ui/textarea";
import { getAccessTokenInStorage } from "@/helpers/auth";
import useNoticeRegistForm from "@/hooks/useNoticeRegistForm";
import { UserContext } from "@/providers/UserProvider";
import { PAGE_ROUTES } from "@/routes";

function NoticeRegister() {
  const user = useContext(UserContext);
  const router = useRouter();
  const { shopId } = router.query;
  const parsedShopId = shopId as string;
  const { form, onSubmit, rules, handlers } = useNoticeRegistForm(parsedShopId);

  useEffect(() => {
    if (!getAccessTokenInStorage()) {
      router.push(PAGE_ROUTES.SIGNIN);
      return;
    }
  }, [router, user]);

  return (
    <EmployerLayout>
      <div className="flex h-screen flex-col items-center justify-center bg-[#FAFAFA]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="w-[37.5rem] gap-[0.8rem] tablet:w-[74.4rem] desktop:w-[128rem]">
              <div className="flex w-full flex-col items-center justify-center">
                <div className="flex w-full flex-col items-start gap-[0.8rem] px-[1.2rem] pb-[8rem] pt-[4rem] tablet:px-[3.2rem] tablet:py-[6rem] desktop:px-[23.8rem] desktop:py-[6rem]">
                  <div className="flex w-full flex-col items-center gap-[2.4rem] tablet:gap-[3.2rem]">
                    <div className="flex w-full items-center justify-between self-stretch">
                      <h3 className="text-[2rem] font-bold not-italic leading-normal text-black tablet:text-[2.8rem] desktop:text-[2.8rem]">
                        공고 등록
                      </h3>
                      <Button
                        type="button"
                        variant="ghost"
                        className="relative h-[2.4rem] w-[2.4rem] tablet:h-[3.2rem] tablet:w-[3.2rem]"
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
                      <div className="flex flex-col gap-[2rem] gap-x-[2.4rem] desktop:flex desktop:w-full desktop:flex-row desktop:gap-y-[2rem]">
                        <div className="flex flex-col gap-[2rem] tablet:flex tablet:w-full tablet:flex-row tablet:gap-[2rem] desktop:w-2/3">
                          <div className="flex w-full flex-col items-start gap-[0.8rem] tablet:w-1/2 desktop:w-1/2">
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
                          <div className="flex w-full flex-col items-start gap-[0.8rem] tablet:w-1/2 desktop:w-1/2">
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
                                        type="datetime-local"
                                        onBlur={handlers.startsAt.onBlur}
                                      />
                                    </FormControl>
                                  </div>
                                  <FormMessage className="absolute text-[1.2rem]" />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        <div className="flex w-full flex-col items-start gap-[0.8rem] tablet:w-1/2 desktop:w-1/3">
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
                                <FormControl className="max-h-[10rem] w-full overflow-y-auto tablet:max-h-[15.3rem] tablet:overflow-y-auto">
                                  <Textarea
                                    {...field}
                                    id="description"
                                    name="description"
                                    className="h-[15.3rem]"
                                  />
                                </FormControl>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <RegisterModal form={form} parsedShopId={parsedShopId} />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </EmployerLayout>
  );
}

export default NoticeRegister;
