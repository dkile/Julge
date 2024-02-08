import EmployeeLayout from "@/components/common/EmployeeLayout";
import ErrorDialog from "@/components/common/ErrorDialog";
import RegisterForm from "@/components/my/RegisterForm";
import ErrorDialogProvider from "@/providers/ErrorDialogProvider";

export default function MyRegister() {
  return (
    <ErrorDialogProvider>
      <EmployeeLayout>
        <section className="h-[calc(100dvh-125px)] px-[16px] py-[40px]">
          <RegisterForm />
        </section>
        <ErrorDialog />
      </EmployeeLayout>
    </ErrorDialogProvider>
  );
}
