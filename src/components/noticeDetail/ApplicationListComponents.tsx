import ApplicationList from "@/components/noticeDetail/ApplicationList";

function ApplicationListComponents({
  shopId,
  noticeId,
  handleApprove,
  handleReject,
}: {
  shopId: string;
  noticeId: string;
  handleApprove: (id: string) => void;
  handleReject: (id: string) => void;
}) {
  return (
    <div className="flex w-full flex-col gap-[1.6rem] px-[1.2rem] py-[4rem] tablet:w-[68rem] tablet:px-[3.2rem] tablet:py-[6rem] desktop:w-[144rem] desktop:px-[23.8rem]">
      <span className="text-[2rem] font-bold not-italic leading-normal text-black tablet:text-[2.8rem]">
        신청자 목록
      </span>
      <ApplicationList
        shopId={shopId}
        noticeId={noticeId}
        handleApprove={handleApprove}
        handleReject={handleReject}
      />
    </div>
  );
}

export default ApplicationListComponents;
