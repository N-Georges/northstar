import Loading from "@/components/common/Loading";
import VerifyOtpNotice from "@/components/common/auth/VerifyOtpNotice";
import { APIResponseError, parseError } from "@/utils/errors";
import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type SignUpInputs = {
  emailAddress?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  city?: string;
  country?: string;
};
type CompanySignUpInputs = {
  emailAddress?: string;
  name?: string;
  address?: string;
  phone?: string;
  city?: string;
  size?: string;
  country?: string;
};

type InputProps = SignUpInputs & CompanySignUpInputs;

type SignUpCodeProps = InputProps & {
  onDone: (sessionId: string) => void;
};

const SignupOtp = ({
  emailAddress,
  firstName,
  lastName,
  phone,
  city,
  country,
  name,
  address,
  size,
  onDone,
}: SignUpCodeProps) => {
  const { isLoaded, signUp } = useSignUp();
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

  const verifySignUpCode: SubmitHandler<{ code: string }> = async function ({ code }) {
    try {
      setIsLoading(true);
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (signUpAttempt.status === "complete") {
        onDone(signUpAttempt.createdSessionId || "");
        //  mutation pour enregistrer l'user
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

  const resendSignUpCode = async function () {
    await signUp.prepareEmailAddressVerification();
  };
  return (
    <form onSubmit={handleSubmit(verifySignUpCode)} className="space-y-5 pt-10">
      <div>
        <div className="flex flex-col space-y-2">
          <div className="text-2xl font-semibold text-gray-700 md:text-3xl">
            <p>Email Verification</p>
          </div>
          <VerifyOtpNotice emailAddress={emailAddress || ""} onResendClick={resendSignUpCode} />
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

export default SignupOtp;
