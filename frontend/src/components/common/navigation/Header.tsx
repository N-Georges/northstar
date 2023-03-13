import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Bell, ChevronDown } from "tabler-icons-react";
import { useClerk, useUser } from "@clerk/nextjs";

const Header = () => {
  const { user } = useUser();
  const { session } = useClerk();
  return (
    <header aria-label="Page Header" className="bg-gray-50">
      <div className="max-w-screen-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center sm:justify-between sm:gap-4">
          <Link href="/" className="flex cursor-pointer items-center">
            <Image src="/images/logo.webp" alt="Brand Logo Northstar" width={45} height={45} />
            <div className="hidden text-sm font-bold leading-4 text-gray-900 sm:block">
              <p>NORTHSTAR</p>
              <p>TALENT</p>
            </div>
          </Link>
          <div className="flex flex-1 items-center gap-4 justify-end">
            <div className="gap-4 hidden sm:flex">
              <a
                href="#"
                className="block shrink-0 rounded-lg bg-white p-3 text-gray-600 shadow-sm hover:text-gray-700"
              >
                <span className="sr-only">Academy</span>
                <MessageCircle className="h-5 w-5" strokeWidth={1.5} color={"black"} />
              </a>
              <a
                href="#"
                className="block shrink-0 rounded-lg bg-white p-3 text-gray-600 shadow-sm hover:text-gray-700"
              >
                <span className="sr-only">Notifications</span>
                <Bell className="h-5 w-5" strokeWidth={1.5} color={"black"} />
              </a>
            </div>
            <span aria-hidden="true" className="hidden sm:block h-6 w-px rounded-full bg-gray-200"></span>
          </div>
          {session ? (
            <button type="button" className="group flex shrink-0 items-center rounded-lg transition">
              <span className="sr-only">Menu</span>
              <div className="w-10 h-10 sm:hidden relative flex justify-center items-center rounded-full bg-red-500 text-xl text-white uppercase">
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </div>
              {/* <Image
                alt="Man"
                src={user?.profileImageUrl || ""}
                className="h-10 w-10 rounded-lg object-cover"
                width={40}
                height={40}
              /> */}
              <p className="hidden text-left text-xs sm:block">
                <strong className="block font-medium capitalize">{user?.fullName}</strong>
                <span className="text-gray-500">{user?.emailAddresses[0].emailAddress}</span>
              </p>
              <ChevronDown className="ml-2 hidden sm:block h-4 w-4 text-gray-400 group-hover:text-gray-500" />
            </button>
          ) : (
            <Link href="/sign-in">
              <span className="text-gray-900">Connexion</span>
            </Link>
          )}
        </div>
        <div className="mt-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl capitalize">Welcome Back, {user?.firstName}!</h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Explore the career opportunities available to you with our quick and easy to use job search site! 🚀
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
