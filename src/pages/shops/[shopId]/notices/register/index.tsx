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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useNoticeRegistForm from "@/hooks/useNoticeRegistForm";

// const formSchema = z.object({
//   hourlyPay: z.string(),
//   startsAt: z.string(),
//   workhour: z.string(),
//   description: z.string(),
// });

function NoticeRegister() {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleRegisterButtonClick = () => {
  //   // 모달 열기
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   // 모달 닫기
  //   setIsModalOpen(false);
  // };

  const { form, onSubmit } = useNoticeRegistForm();

  return (
    <div className="flex h-screen items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Link href={"/notices"}>
            <div className="relative h-[2rem] w-[10.8rem]">
              <Image
                src="/icons/logo.svg"
                layout="fill"
                objectFit="contain"
                alt="로고이미지"
              />
            </div>
          </Link>
          <div className="w-[37.5rem] gap-[0.8rem] bg-[#FAFAFA]">
            <div className="flex flex-col items-center justify-center">
              <div className="flex w-[35.1rem] flex-col items-start gap-[0.8rem] px-[1.2rem] pb-[8rem] pt-[4rem]">
                <div className="flex h-[52.3rem] w-full flex-col items-center gap-[2.4rem]">
                  <div className="flex w-full items-center justify-between self-stretch">
                    <h3 className="text-[2rem] font-bold not-italic leading-normal text-black">
                      공고 등록
                    </h3>
                    <Button
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
                  <div className="flex h-[52.3rem] w-full flex-col justify-end gap-[2rem]">
                    <div className="flex w-full flex-col items-start gap-[0.8rem]">
                      <FormField
                        control={form.control}
                        name="hourlyPay"
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
                                  className="h-[2.6rem] w-full items-center self-stretch rounded-md border border-input bg-white px-[2rem] py-[1.6rem] disabled:cursor-not-allowed disabled:opacity-50"
                                  {...field}
                                  id="hourlyPay"
                                  name="hourlyPay"
                                />
                              </FormControl>
                              <span className="absolute inset-y-0 right-0 flex items-center pr-[2rem] text-[1.6rem] font-normal not-italic leading-[2.6rem] text-black">
                                원
                              </span>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex w-full flex-col items-start gap-[0.8rem]">
                      <FormField
                        control={form.control}
                        name="startsAt"
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
                                  className="h-[2.6rem] w-full items-center self-stretch rounded-md border border-input bg-white px-[2rem] py-[1.6rem] disabled:cursor-not-allowed disabled:opacity-50"
                                  {...field}
                                  id="startsAt"
                                  name="startsAt"
                                />
                              </FormControl>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex w-full flex-col items-start gap-[0.8rem]">
                      <FormField
                        control={form.control}
                        name="workhour"
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
                                  className="h-[2.6rem] w-full items-center self-stretch rounded-md border border-input bg-white px-[2rem] py-[1.6rem] disabled:cursor-not-allowed disabled:opacity-50"
                                  {...field}
                                  id="workhour"
                                  name="workhour"
                                />
                              </FormControl>
                              <span className="absolute inset-y-0 right-0 flex items-center pr-[2rem] text-[1.6rem] font-normal not-italic leading-[2.6rem] text-black">
                                시간
                              </span>
                            </div>
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
                                  className="h-[15.3rem] w-full items-center self-stretch overflow-auto rounded-md border border-input px-[2rem] py-[1.6rem] text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                  <RegisterModal />
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default NoticeRegister;
