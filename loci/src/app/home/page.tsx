import { isSignedIn } from "../../../functions/isSignedIn";
import { HeaderSignedIn } from "../components/HeaderSignedIn";
import { redirect } from "next/navigation";
import Gallery from "../components/Gallery";

export default function Home() {
  // isSignedIn().then(bool => bool ? console.log('signed in') : redirect('/'));

  return (
    <>
      <HeaderSignedIn />
      <div className="w-full h-full">
        <Gallery />
      </div>
    </>
  );
}
