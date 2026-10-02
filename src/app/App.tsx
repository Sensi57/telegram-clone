import { useSession } from "@/entities/model/store";
import { LoginPage } from "@/pages/login-page/ui/LoginPage";

export default function App() {
  const authed = useSession((s) => !!s.credentials);
  return authed ? "" : <LoginPage />;
}
