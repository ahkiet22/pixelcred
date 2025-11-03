import Guard from "@/guards";
import DevelopersPage from "@/views/pages/developers";

export default function Page() {
  return (
    <Guard authGuard={false} guestGuard={false}>
      <DevelopersPage />
    </Guard>
  );
}
