import SignInForm from "@/components/auth/signin";
import { SignedOut } from "@clerk/nextjs";
import { buildClerkProps, getAuth } from "@clerk/nextjs/server";
import { GetServerSideProps } from "next";

const SigninPage = () => {
  return (
    <SignedOut>
      <SignInForm />
    </SignedOut>
  );
};

export default SigninPage;

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
