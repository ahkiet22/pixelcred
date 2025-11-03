import Guard from "@/guards";
import Home from "@/views/pages/home";

export default function Page() {
  return (
    <Guard authGuard={false} guestGuard={false}>
      <Home />
    </Guard>
  );
}
