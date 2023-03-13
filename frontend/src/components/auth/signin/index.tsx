import { EmailCodeFactor } from "@clerk/types";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSignIn } from "@clerk/nextjs";
import Loading from "@/components/common/Loading";
import Notice from "@/components/common/auth/Notice";
import { useForm } from "react-hook-form";
import { APIResponseError, parseError } from "@/utils/errors";
import { AlertCircle, ArrowNarrowLeft, KeyOff } from "tabler-icons-react";
import SignInCode from "./code";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { AnimatePresence, motion } from "framer-motion";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  emailAddress: z.string().email("Invalid email").min(1, "Email is required"),
});

type FormSchemaType = z.infer<typeof formSchema> & { clerkError?: string };

export enum SignInFormSteps {
  EMAIL,
  CODE,
}

const SignInForm = () => {
  const { isLoaded, signIn, setSession } = useSignIn();
  const router = useRouter();

  const [formStep, setFormStep] = useState(SignInFormSteps.EMAIL);
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isSubmitting },
    watch,
    clearErrors,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

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

    await signInAttempt.prepareFirstFactor({
      strategy: "email_code",
      emailAddressId: emailCodeFactor.emailAddressId,
    });
  };

  const verifyEmail = async function () {
    try {
      await sendSignInCode();
      setFormStep(SignInFormSteps.CODE);
    } catch (err) {
      setError("clerkError", {
        type: "manual",
        message: parseError(err as APIResponseError),
      });
    }
  };
  /** Clerk API related errors on change. */
  watch(() => errors.clerkError && clearErrors("clerkError"));

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
          <div className="col-span-6 space-y-2">
            {errors.clerkError?.message && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.2, ease: "easeIn" }}
                  role="error alert"
                  aria-labelledby="error-label"
                  className="col-span-6 ease-in-out"
                >
                  <div className="flex items-center space-x-2 rounded-md bg-gray-50 p-4 text-xs leading-4">
                    <AlertCircle height={18} className="text-red-500" />
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-red-500  transition-all delay-300 ease-out">
                        {errors.clerkError.message}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
            <div className="col-span-6">
              <Notice
                content="Don't have an account?"
                actionLink="/sign-up"
                actionMessage="Sign up"
                icon={<KeyOff height={18} />}
              />
            </div>
          </div>

          <div className="col-span-6 space-y-2">
            <div className="col-span-6">
              <div className="flex items-center justify-between">
                <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                {errors.emailAddress && (
                  <span className="text-xs text-red-500 transition-all delay-300 ease-out">
                    {errors.emailAddress.message}
                  </span>
                )}
              </div>

              <input
                type="email"
                id="Email"
                {...register("emailAddress")}
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>
            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
              <button
                disabled={isSubmitting || !!Object.keys(errors).length}
                className="inline-block w-full items-center justify-center rounded-md bg-blue-600 px-12 py-2 text-sm font-medium text-white"
              >
                {isSubmitting ? <Loading /> : "Sign in"}
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
