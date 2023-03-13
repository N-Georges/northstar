import { EmailCodeFactor } from "@clerk/types";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSignIn } from "@clerk/nextjs";
import Loading from "@/components/common/Loading";
import Notice from "@/components/common/auth/Notice";
import { useForm } from "react-hook-form";
import { APIResponseError, parseError } from "@/utils/errors";
import { ArrowNarrowLeft, KeyOff } from "tabler-icons-react";
import SignInCode from "./code";
import { AuthLayout } from "@/components/layouts/AuthLayout";

type SignInInputs = {
  emailAddress: string;
};

export enum SignInFormSteps {
  EMAIL,
  CODE,
}

const SignInForm = () => {
  const { isLoaded, signIn, setSession } = useSignIn();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formStep, setFormStep] = useState(SignInFormSteps.EMAIL);
  localStorage.setItem("firstName", firstName);
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm<SignInInputs>();

  if (!isLoaded) {
    return null;
  }

  const sendSignInCode = async function () {
    const emailAddress = getValues("emailAddress");
    const signInAttempt = await signIn.create({
      identifier: emailAddress,
    });

    const emailCodeFactor = signInAttempt.supportedFirstFactors.find(
      (factor: { strategy: string }) => factor.strategy === "email_code"
    ) as EmailCodeFactor;

    setFirstName(signInAttempt.userData.firstName || "");
    await signInAttempt.prepareFirstFactor({
      strategy: "email_code",
      emailAddressId: emailCodeFactor.emailAddressId,
    });
  };

  const verifyEmail = async function () {
    try {
      setIsLoading(true);
      await sendSignInCode();
      setFormStep(SignInFormSteps.CODE);
    } catch (err) {
      setError("emailAddress", {
        type: "manual",
        message: parseError(err as APIResponseError),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signInComplete = async (createdSessionId: string) => {
    /** Couldn't the signin be updated and have the createdSessionId ? */
    setSession(createdSessionId, () => router.push("/"));
  };

  return (
    <AuthLayout>
      <div className="col-span-6">
        {formStep !== SignInFormSteps.EMAIL && (
          <button
            className="flex items-center text-xs text-blue-500"
            onClick={() => setFormStep(SignInFormSteps.EMAIL)}
          >
            <ArrowNarrowLeft height={18} />
            <span>Back</span>
          </button>
        )}
      </div>
      {formStep === SignInFormSteps.EMAIL && (
        <form onSubmit={handleSubmit(verifyEmail)} noValidate className="grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <Notice
              content="Don't have an account?"
              actionLink="/sign-up"
              actionMessage="Sign up"
              icon={<KeyOff height={18} />}
            />
          </div>
          <div className="col-span-6 space-y-2">
            <div className="col-span-6">
              <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                id="Email"
                {...register("emailAddress")}
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
              {errors.emailAddress && (
                <span className="text-xs text-red-500 transition-all delay-300 ease-out">
                  {errors.emailAddress.message}
                </span>
              )}
            </div>
            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
              <button
                disabled={isLoading || !!Object.keys(errors).length}
                className="inline-block w-full items-center justify-center rounded-md bg-blue-600 px-12 py-2 text-sm font-medium text-white"
              >
                {isLoading ? <Loading /> : "Sign in"}
              </button>
            </div>
          </div>
        </form>
      )}
      {formStep === SignInFormSteps.CODE && (
        <SignInCode onDone={signInComplete} emailAddress={getValues("emailAddress")} />
      )}
    </AuthLayout>
  );
};

export default SignInForm;
