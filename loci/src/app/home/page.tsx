import { isSignedIn } from "../../../functions/isSignedIn";
import { HeaderSignedIn } from "../../../components/HeaderSignedIn";
import { redirect } from 'next/navigation';

export default function Home() {
  // isSignedIn().then(bool => bool ? console.log('signed in') : redirect('/'));

  return (
    <>
        <HeaderSignedIn/>
        <div>
        gallery here
        </div>
    </>
  );
}