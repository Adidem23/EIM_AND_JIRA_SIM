import { SignedOut, SignedIn } from "@clerk/clerk-react";
import BeforeSign from "./BeforeSign";
import AfterSign from "./AfterSign";


const MainPage = () => {
  return (
    <>

    <SignedOut>
      <BeforeSign/>
    </SignedOut>

    <SignedIn>
      <AfterSign />
    </SignedIn>

    </>

  )
}

export default MainPage