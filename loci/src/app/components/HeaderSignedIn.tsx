import Link from "next/link";
import "animate.css";
import { logout } from "../../../functions/logout";

export function HeaderSignedIn() {
  return (
    <span className="sticky flex items-center w-full gap-10 mix-blend-difference">
      <Link
        href="/home"
        className="animate__animated animate__slideInDown text-10xl duration-300"
      >
        Home
      </Link>
      <Link
        href="/"
        className="animate__animated animate__slideInDown text-10xl duration-300"
      >
        Log Out
      </Link>
    </span>
  );
}
