import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell, Star } from "tabler-icons-react";
import { useClerk, useUser } from "@clerk/nextjs";
import UserDropdown from "../UserDropdown";

const Header = () => {
  const { user } = useUser();
  const { session } = useClerk();
  return (
    <header aria-label="Page Header" className="bg-gray-50">
      <div className="px-4 py-8 mx-auto max-w-screen-5xl sm:px-6 lg:px-8">
        <div className="flex items-center sm:justify-between sm:gap-4">
          <Link href="/" className="flex items-center cursor-pointer">
            <Image src="/images/logo.webp" alt="Brand Logo Northstar" width={45} height={45} />
            <div className="hidden text-sm font-bold leading-4 text-gray-900 sm:block">
              <p>NORTHSTAR</p>
              <p>TALENT</p>
            </div>
          </Link>
          <div className="flex items-center justify-end flex-1 gap-4">
            <div className="hidden gap-4 sm:flex">
              <Link
                href="#"
                className="block p-3 text-gray-600 bg-white rounded-lg shadow-sm shrink-0 hover:text-gray-700"
              >
                <span className="sr-only">Favorites</span>
                <Star className="w-5 h-5" strokeWidth={1.5} color={"black"} />
              </Link>
              <Link
                href="#"
                className="block p-3 text-gray-600 bg-white rounded-lg shadow-sm shrink-0 hover:text-gray-700"
              >
                <span className="sr-only">Notifications</span>
                <Bell className="w-5 h-5" strokeWidth={1.5} color={"black"} />
              </Link>
            </div>
            <span aria-hidden="true" className="hidden w-px h-6 bg-gray-200 rounded-full sm:block"></span>
          </div>
          {session ? (
            <>
              <UserDropdown
                firstName={user?.firstName}
                lastName={user?.lastName}
                fullName={user?.fullName}
                emailAddress={user?.emailAddresses[0].emailAddress}
              />
            </>
          ) : (
            <Link href="/sign-in">
              <span className="text-gray-900">Connexion</span>
            </Link>
          )}
        </div>
        <div className="mt-8">
          <h1 className="text-2xl font-bold text-gray-900 capitalize sm:text-3xl">Welcome Back, {user?.firstName}!</h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Explore the career opportunities available to you with our quick and easy to use job search site! 🚀
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
