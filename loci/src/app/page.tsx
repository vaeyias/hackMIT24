import { isSignedIn } from "../../functions/isSignedIn";
import { HeaderLoggedOut } from "../../components/HeaderLoggedOut";
import { redirect } from "next/navigation";
import { logout } from "../../functions/logout";

export default function Home() {
  logout("/");
  isSignedIn().then((bool) =>
    bool ? redirect("/home") : console.log("not signed")
  );

  return (
    <>
      <HeaderLoggedOut />
      <div>log in bruh!!!!</div>
    </>
  );
}
