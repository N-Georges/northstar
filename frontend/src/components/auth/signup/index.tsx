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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  firstName: z.string().min(1, "firstname is required").max(25),
  lastName: z.string().min(1, "lastname is required").max(25),
  emailAddress: z.string().email("Invalid email").min(1, "Email is required"),
  phone: z.string().min(1, "Phone is required"),
  locale: z.string().min(1, "Locale is required"),
  role: z.string().min(1, "Role is required"),
});

type FormSchemaType = z.infer<typeof formSchema> & { clerkError?: string };

enum SignUpFormSteps {
  FORM,
  CODE,
}

const SignupForm = () => {
  const [formStep, setFormStep] = useState(SignUpFormSteps.FORM);
  const { isLoaded, setSession, signUp } = useSignUp();
  const router = useRouter();
  const userLocale = router.locale;

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isSubmitting },
    watch,
    clearErrors,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: { locale: userLocale, role: "applicant" },
  });

  if (!isLoaded) {
    return null;
  }

  const onSubmit: SubmitHandler<FormSchemaType> = async ({
    firstName,
    lastName,
    emailAddress,
    locale,
    phone,
    role,
  }) => {
    try {
      const signUpAttempt = await signUp.create({
        emailAddress,
        lastName,
        firstName,
        unsafeMetadata: {
          locale,
          phone,
          role,
        },
      });
      await signUpAttempt.prepareEmailAddressVerification();
      setFormStep(SignUpFormSteps.CODE);
    } catch (err) {
      setError("clerkError", {
        type: "manual",
        message: parseError(err as APIResponseError),
      });
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
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid grid-cols-6 gap-6">
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
            <div className="flex items-center justify-between">
              <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              {errors.firstName && (
                <span className="text-xs text-red-500 transition-all delay-300 ease-out">
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <input
              type="text"
              id="FirstName"
              {...register("firstName")}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <div className="flex items-center justify-between">
              <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              {errors.lastName && (
                <span className="text-xs text-red-500 transition-all delay-300 ease-out">
                  {errors.lastName.message}
                </span>
              )}
            </div>

            <input
              type="text"
              id="LastName"
              {...register("lastName")}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div className="col-span-6">
            <div className="flex items-center justify-between">
              <label htmlFor="Phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              {errors.phone && (
                <span className="text-xs text-red-500 transition-all delay-300 ease-out">{errors.phone.message}</span>
              )}
            </div>
            <input
              type="tel"
              id="Phone"
              {...register("phone")}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
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
          <Terms />
          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              disabled={isSubmitting}
              className="inline-block w-full items-center justify-center rounded-md bg-blue-600 px-12 py-2 text-sm font-medium text-white"
            >
              {isSubmitting ? <Loading /> : "Sign up"}
            </button>
          </div>
        </form>
      )}
      {formStep === SignUpFormSteps.CODE && (
        <SignupCode emailAddress={getValues("emailAddress")} onDone={signUpComplete} />
      )}
    </AuthLayout>
  );
};

export default SignupForm;
