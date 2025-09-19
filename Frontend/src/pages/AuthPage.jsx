import { SignIn, SignUp } from "@clerk/clerk-react";

function AuthPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      <h1>Welcome to My App</h1>
      <div style={{ marginBottom: '2rem' }}>
        <SignIn />
      </div>
      <div>
        <SignUp />
      </div>
    </div>
  );
}

export default AuthPage;
