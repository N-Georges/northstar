import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { EmailCodeFactor } from "@clerk/types";
import VerifyOtpNotice from "@/components/common/auth/VerifyOtpNotice";
import { APIResponseError, parseError } from "@/utils/errors";
import Loading from "@/components/common/Loading";

type SignInOtpProps = {
  emailAddress: string;
  onDone: (sessionId: string) => void;
};

const SignInOtp = ({ emailAddress, onDone }: SignInOtpProps) => {
  const { isLoaded, signIn } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<{ code: string }>();

  if (!isLoaded) {
    return null;
  }

  const verifySignInOtp: SubmitHandler<{ code: string }> = async function ({ code }) {
    try {
      setIsLoading(true);
      const signInAttempt = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code,
      });
      if (signInAttempt.status === "complete") {
        onDone(signInAttempt.createdSessionId || "");
      }
    } catch (err) {
      setError("code", {
        type: "manual",
        message: parseError(err as APIResponseError),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resendSignInOtp = async function () {
    const emailCodeFactor = signIn.supportedFirstFactors.find(
      (factor) => factor.strategy === "email_code"
    ) as EmailCodeFactor;

    await signIn.prepareFirstFactor({
      strategy: "email_code",
      emailAddressId: emailCodeFactor.emailAddressId,
    });
  };

  return (
    <form onSubmit={handleSubmit(verifySignInOtp)} className="space-y-5">
      <div>
        <div className="flex flex-col space-y-2">
          <div className="text-2xl font-semibold text-gray-700 md:text-3xl">
            <p>Email Verification</p>
          </div>
          <VerifyOtpNotice emailAddress={emailAddress} onResendClick={resendSignInOtp} />
        </div>
      </div>

      <div>
        <div className="flex flex-col space-y-2">
          <div>
            <label htmlFor="Code" className="block text-sm font-medium text-gray-700">
              Code
            </label>

            <input
              type="text"
              id="otp"
              {...register("code")}
              className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
            />
            {errors.code && (
              <span className="text-xs text-red-500 transition-all delay-300 ease-out">{errors.code.message}</span>
            )}
          </div>

          <div className="flex flex-col space-y-5">
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`inline-block w-full items-center justify-center rounded-md bg-blue-600 px-12 py-3 text-sm font-medium text-white`}
              >
                {isLoading ? <Loading /> : "Verify code"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignInOtp;
