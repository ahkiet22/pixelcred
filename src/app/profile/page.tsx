import Guard from "@/guards";
import ProfilePage from "@/views/pages/profile";

export default function Page() {
  return (
    <Guard authGuard={true}>
      <ProfilePage />
    </Guard>
  );
}
