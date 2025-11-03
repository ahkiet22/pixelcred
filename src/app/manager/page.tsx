import Guard from "@/guards";
import ManagerPage from "@/views/pages/manager";

export default function Page() {
  return (
    <Guard authGuard={true}>
      <ManagerPage />
    </Guard>
  );
}
