import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export function AuthLayout({ children }: { children: React.ReactNode }): JSX.Element {
  const router = useRouter();
  const { asPath } = router;
  const signup = asPath.includes("sign-up");
  const signin = asPath.includes("sign-in");

  return (
    <div className="h-screen">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            alt="San Francisco Golden Gate Bridge"
            src="/images/sf.webp"
            className="h-auto w-full object-cover opacity-90"
            priority
            fill
          />
          <div className="hidden lg:relative lg:block lg:p-12">
            <Link className="block" href="/">
              <span className="sr-only">Home</span>
              <Image src="/images/logo.webp" alt="Brand Logo Of Northstar" width={60} height={60} />
            </Link>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              {signin && "Sign in to Northstar"}
              {signup && "Sign up to Northstar"}
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              {signin && `Welcome back! Please sign in to your Northstar account to continue your job search.`}
              {signup && "Create your Northstar account today and find your job adapted to your profile"}
            </p>
          </div>
        </section>
        <main
          aria-label="Main"
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
        >
          <div className="w-full max-w-lg space-y-8">
            <div className="relative -mt-16 block lg:hidden">
              <Link
                className="md:h-26 md:w-26 inline-flex h-16 w-16 items-center justify-center  rounded-full bg-white"
                href="/"
              >
                <span className="sr-only">Home</span>
                <div>
                  <Image src="/images/logo.webp" alt="Brand Logo Of Northstar" width={40} height={40} />
                </div>
              </Link>

              <h1 className="mt-2 text-2xl font-bold text-gray-700 sm:text-3xl md:text-4xl">
                {signin && "Sign in to Northstar"}
                {signup && "Sign up to Northstar"}
              </h1>

              <p className="text-xs leading-relaxed text-gray-500 md:mt-4 md:text-base">
                {signin && `Welcome back! Please sign in to your Northstar account to continue your job search.`}
                {signup && "Create your Northstar account today and find your job adapted to your profile"}
              </p>
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
