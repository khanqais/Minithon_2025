import { RedirectToSignIn, useUser } from "@clerk/clerk-react";

function ProtectedRoute({ children }) {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return children;
}

export default ProtectedRoute;
