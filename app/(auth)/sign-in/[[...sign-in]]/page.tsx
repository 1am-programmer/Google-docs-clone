/*Creating a folder or file for [...sign-in] 
is likely related to setting up your authentication pages and routes in a way that integrates with Clerk. */
import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignInPage = () => {
  return (
    <main className="auth-page">
      <SignIn />
    </main>
  );
};

export default SignInPage;
