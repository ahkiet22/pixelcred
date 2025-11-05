import Guard from "@/guards";
import CreatePage from "@/views/pages/create";

export default function Page() {
  return (
    <Guard authGuard={true} guestGuard={false}>
      <CreatePage />
    </Guard>
  );
}
