import EmployeeLayout from "@/components/common/EmployeeLayout";
import ErrorDialog from "@/components/common/ErrorDialog";
import MyEditForm from "@/components/my/MyEditForm";
import ErrorDialogProvider from "@/providers/ErrorDialogProvider";

export default function MyEdit() {
  return (
    <ErrorDialogProvider>
      <EmployeeLayout>
        <section className="h-[calc(100dvh-125px)] px-[16px] py-[40px]">
          <MyEditForm />
        </section>
        <ErrorDialog />
      </EmployeeLayout>
    </ErrorDialogProvider>
  );
}
