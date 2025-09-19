import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Header = () => {
  return (
    <header>
      <h1>My App</h1>
      <nav>
        <SignedIn>
          
          <UserButton />
        </SignedIn>
        <SignedOut>
          
          <SignInButton />
        </SignedOut>
      </nav>
    </header>
  );
};

export default Header;
