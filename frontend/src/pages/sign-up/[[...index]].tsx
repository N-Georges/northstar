import SignupForm from "@/components/auth/signup";
import { SignedOut } from "@clerk/nextjs";
import { buildClerkProps, getAuth } from "@clerk/nextjs/server";
import { GetServerSideProps } from "next";

const SignUpPage = () => (
  <SignedOut>
    <SignupForm />
  </SignedOut>
);

export default SignUpPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId } = getAuth(ctx.req);
  if (userId) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: { ...buildClerkProps(ctx.req) } };
};
