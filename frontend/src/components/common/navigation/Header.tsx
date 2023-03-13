import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Bell, ChevronDown } from "tabler-icons-react";

const Header = () => {
  return (
    <header aria-label="Page Header" className="bg-gray-50">
      <div className="max-w-screen-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center sm:justify-between sm:gap-4">
          <Link href="/" className="flex cursor-pointer items-center">
            <div className="relative h-10 w-10 sm:h-12 sm:w-12 ">
              <Image src="/images/logo.webp" alt="Brand Logo Northstar" fill />
            </div>
            <div className="hidden text-sm font-bold leading-4 text-gray-900 sm:block">
              <p>NORTHSTAR</p>
              <p>TALENT</p>
            </div>
          </Link>
          <div className="flex flex-1 items-center gap-4 justify-end">
            <div className="gap-4 hidden sm:flex">
              <a
                href="#"
                className="block shrink-0 rounded-lg bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700"
              >
                <span className="sr-only">Academy</span>
                <MessageCircle className="h-5 w-5" strokeWidth={1.5} color={"black"} />
              </a>
              <a
                href="#"
                className="block shrink-0 rounded-lg bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700"
              >
                <span className="sr-only">Notifications</span>
                <Bell className="h-5 w-5" strokeWidth={1.5} color={"black"} />
              </a>
            </div>
            <span aria-hidden="true" className="hidden sm:block h-6 w-px rounded-full bg-gray-200"></span>
          </div>
          <button type="button" className="group flex shrink-0 items-center rounded-lg transition">
            <span className="sr-only">Menu</span>
            <Image
              alt="Man"
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="h-10 w-10 rounded-lg object-cover"
              width={40}
              height={40}
            />
            <p className="ml-2 hidden text-left text-xs sm:block">
              <strong className="block font-medium">Eric Frusciante</strong>
              <span className="text-gray-500"> eric@frusciante.com </span>
            </p>
            <ChevronDown className="ml-2 hidden sm:block h-4 w-4 text-gray-400 group-hover:text-gray-500" />
          </button>
        </div>
        <div className="mt-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Welcome Back, Barry!</h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Explore the career opportunities available to you with our quick and easy to use job search site! 🚀
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
