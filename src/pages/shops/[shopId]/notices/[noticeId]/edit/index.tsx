import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

import { fetcher } from "@/apis/fetcher";
import EmployerLayout from "@/components/common/EmployerLayout";
import RenderFormFields from "@/components/noticeEdit/RenderFormFields";
import { Form } from "@/components/ui/form";
import { getAccessTokenInStorage } from "@/helpers/auth";
import useNoticeEditForm from "@/hooks/useNoticeEditForm";
import { UserContext } from "@/providers/UserProvider";
import { apiRouteUtils, PAGE_ROUTES } from "@/routes";

function NoticeEdit() {
  const user = useContext(UserContext);
  const router = useRouter();
  const { shopId, noticeId } = router.query;
  const parsedShopId = shopId as string;
  const parsedNoticeId = noticeId as string;
  const { data } = useQuery<any>({
    queryKey: ["notice", noticeId],
    queryFn: async () => {
      const response = await fetcher.get(
        apiRouteUtils.parseShopNoticeDetail(parsedShopId, parsedNoticeId),
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
  const currentNoticeData = data?.item;
  const { form, onSubmit, rules, handlers } = useNoticeEditForm(
    parsedShopId,
    parsedNoticeId,
    currentNoticeData,
  );

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
            <RenderFormFields form={form} rules={rules} handlers={handlers} />
          </form>
        </Form>
      </div>
    </EmployerLayout>
  );
}

export default NoticeEdit;
