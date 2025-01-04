import { SignedIn, SignedOut } from "@clerk/clerk-react";
import LandingPage from "./pages/LandingPage";

export default function App() {
  return (
    <>
      {/* Display LandingPage for signed-out users */}
      <SignedOut>
        <LandingPage />
      </SignedOut>

      {/* Display authenticated content for signed-in users */}
      <SignedIn>
        <div>
          <LandingPage />
        </div>
      </SignedIn>
    </>
  );
}
