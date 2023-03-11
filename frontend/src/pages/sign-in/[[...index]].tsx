import SignInForm from "@/components/auth/signin";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { SignedOut } from "@clerk/nextjs";

const SigninPage = () => {
  return (
    <AuthLayout>
      <SignedOut>
        <SignInForm />
      </SignedOut>
    </AuthLayout>
  );
};

export default SigninPage;
