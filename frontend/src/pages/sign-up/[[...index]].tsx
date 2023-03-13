import SignupForm from "@/components/auth/signup";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { SignedOut } from "@clerk/nextjs";

const SignUpPage = () => (
  <AuthLayout>
    <SignedOut>
      <SignupForm />
    </SignedOut>
  </AuthLayout>
);

export default SignUpPage;
