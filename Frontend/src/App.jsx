import { SignedIn, SignedOut } from "@clerk/clerk-react";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="min-h-screen">
      {/* Only renders if user is logged in */}
      <SignedIn>
        <Dashboard />
      </SignedIn>

      {/* Only renders if user is logged out */}
      <SignedOut>
        <HomePage />
      </SignedOut>
    </div>
  );
}

export default App;
