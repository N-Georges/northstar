import Notice from "@/components/common/auth/Notice";
import { APIResponseError, parseError } from "@/utils/errors";
import { useSignUp } from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AlertCircle, ArrowNarrowLeft, Key } from "tabler-icons-react";
import Terms from "./terms";
import Loading from "@/components/common/Loading";
import SignupCode from "./code";
import { AuthLayout } from "@/components/layouts/AuthLayout";

type SignUpInputs = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phone: string;
  locale: string;
  clerkError?: string;
};

enum SignUpFormSteps {
  FORM,
  CODE,
}

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formStep, setFormStep] = useState(SignUpFormSteps.FORM);
  const { isLoaded, setSession, signUp } = useSignUp();
  const router = useRouter();
  const userLocale = router.locale;

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
    watch,
    clearErrors,
  } = useForm<SignUpInputs>({ defaultValues: { locale: userLocale } });

  if (!isLoaded) {
    return null;
  }

  const onSubmit: SubmitHandler<SignUpInputs> = async ({ firstName, lastName, emailAddress, locale, phone }) => {
    try {
      setIsLoading(true);
      const signUpAttempt = await signUp.create({
        emailAddress,
        lastName,
        firstName,
        unsafeMetadata: {
          locale,
          phone,
        },
      });
      await signUpAttempt.prepareEmailAddressVerification();
      setFormStep(SignUpFormSteps.CODE);
    } catch (err) {
      setError("clerkError", {
        type: "manual",
        message: parseError(err as APIResponseError),
      });
    } finally {
      setIsLoading(false);
    }
  };

  /** Clerk API related errors on change. */
  watch(() => errors.clerkError && clearErrors("clerkError"));

  const signUpComplete = async (createdSessionId: string) => {
    /** Couldn't the signup be updated and have the createdSessionId ? */
    await setSession(createdSessionId, () => router.push("/"));
  };
  return (
    <AuthLayout>
      <div className="col-span-6">
        {formStep !== SignUpFormSteps.FORM && (
          <button className="flex items-center text-xs text-blue-500" onClick={() => setFormStep(SignUpFormSteps.FORM)}>
            <ArrowNarrowLeft height={18} />
            <span>Back</span>
          </button>
        )}
      </div>
      {formStep === SignUpFormSteps.FORM && (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 grid grid-cols-6 gap-6">
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
                content="Already have an account?"
                actionLink="/sign-in"
                actionMessage="Sign in"
                icon={<Key height={18} />}
              />
            </div>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>

            <input
              type="text"
              id="FirstName"
              {...register("firstName")}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
            {errors.firstName && (
              <span className="text-xs text-red-500 transition-all delay-300 ease-out">{errors.firstName.message}</span>
            )}
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>

            <input
              type="text"
              id="LastName"
              {...register("lastName")}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
            {errors.lastName && (
              <span className="text-xs text-red-500 transition-all delay-300 ease-out">{errors.lastName.message}</span>
            )}
          </div>
          <div className="col-span-6">
            <label htmlFor="Phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>

            <input
              type="tel"
              id="Phone"
              {...register("phone")}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
            {errors.emailAddress && (
              <span className="text-xs text-red-500 transition-all delay-300 ease-out">
                {errors.emailAddress.message}
              </span>
            )}
          </div>
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
          <Terms />
          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              disabled={isLoading || !!Object.keys(errors).length}
              className="inline-block w-full items-center justify-center rounded-md bg-blue-600 px-12 py-2 text-sm font-medium text-white"
            >
              {isLoading ? <Loading /> : "Sign up"}
            </button>
          </div>
        </form>
      )}
      {formStep === SignUpFormSteps.CODE && (
        <SignupCode
          emailAddress={getValues("emailAddress")}
          firstName={getValues("firstName")}
          lastName={getValues("lastName")}
          phone={getValues("phone")}
          country={getValues("locale")}
          onDone={signUpComplete}
        />
      )}
    </AuthLayout>
  );
};

export default SignupForm;
