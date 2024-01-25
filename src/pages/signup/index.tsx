import SignupForm from "@/components/signup/SignupForm";
import DialogProvider from "@/providers/DialogProvider";

export default function Page() {
  return (
    <DialogProvider>
      <section>
        <SignupForm />
      </section>
    </DialogProvider>
  );
}
