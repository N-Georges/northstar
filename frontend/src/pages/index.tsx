import Image from "next/image";
import { useClerk, useUser } from "@clerk/clerk-react";
import Layout from "@/components/layouts";

export default function Home() {
  const { signOut } = useClerk();
  const { user } = useUser();

  return (
    <>
      <Layout>
        <button className="text-3xl font-bold underline" onClick={() => signOut()}>
          Sign out
        </button>
        <div>Hello {user?.firstName}</div>
        <a href="#" className="group relative block bg-black">
          <Image
            alt="Developer"
            src="/images/sf.webp"
            width={1920}
            height={1080}
            priority
            className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
          />

          <div className="relative p-4 sm:p-6 lg:p-8">
            <p className="text-sm font-medium uppercase tracking-widest text-pink-500">Developer</p>

            <p className="text-xl font-bold text-white sm:text-2xl">Tony Wayne</p>

            <div className="mt-32 sm:mt-48 lg:mt-64">
              <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm text-white">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic asperiores quibusdam
                  quidem voluptates doloremque reiciendis nostrum harum. Repudiandae?
                </p>
              </div>
            </div>
          </div>
        </a>
      </Layout>
    </>
  );
}
