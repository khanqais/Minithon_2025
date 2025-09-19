// AuthPage.jsx
import React, { useState } from 'react';
import { SignIn, SignUp } from "@clerk/clerk-react";

function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(false);

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {isSignIn ? "Sign In to Continue" : "Create an Account"}
      </h2>

      {isSignIn ? <SignIn /> : <SignUp />}

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          {isSignIn ? (
            <>
              Don't have an account?{' '}
              <button
                onClick={() => setIsSignIn(false)}
                className="text-eco-blue-600 hover:underline font-medium"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                onClick={() => setIsSignIn(true)}
                className="text-eco-blue-600 hover:underline font-medium"
              >
                Sign In
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
