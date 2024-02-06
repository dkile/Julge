import EmployeeLayout from "@/components/common/EmployeeLayout";
import EmptyProfileCard from "@/components/my/EmptyProfileCard";

export default function My() {
  return (
    <EmployeeLayout>
      <section className="w-full px-[16px] py-[40px]">
        <div>
          <header>
            <h2 className="text-[2rem] font-bold">내 프로필</h2>
          </header>
          <div className="mt-[16px]">
            <EmptyProfileCard />
          </div>
        </div>
      </section>
    </EmployeeLayout>
  );
}
