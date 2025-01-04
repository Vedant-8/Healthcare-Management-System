import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
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
          <header className="bg-gray-100 shadow-md p-4">
            <h1 className="text-xl font-bold">Welcome Back!</h1>
            <UserButton />
          </header>
          <main className="p-4">
            {/* Add more content for signed-in users */}
            <p>
              This is the dashboard or main content area for authenticated
              users.
            </p>
          </main>
        </div>
      </SignedIn>
    </>
  );
}
