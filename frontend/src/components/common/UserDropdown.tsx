import Link from "next/link";
import Dropdown from "./ui/dropdown";
import {
  Bell,
  Building,
  ChevronDown,
  DeviceAnalytics,
  MessageChatbot,
  MessageCircle,
  Settings,
  Star,
  UserCircle,
} from "tabler-icons-react";

type UserDropdownProps = {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  fullName: string | null | undefined;
  emailAddress: string | null | undefined;
};

const UserDropdown = ({ firstName, lastName, fullName, emailAddress }: UserDropdownProps) => {
  return (
    <Dropdown
      button={
        <button type="button" className="flex items-center transition rounded-lg group shrink-0">
          <span className="sr-only">Menu</span>

          <div className="relative flex items-center justify-center w-10 h-10 text-xl text-white uppercase bg-red-500 rounded-full sm:hidden">
            {firstName?.charAt(0)}
            {lastName?.charAt(0)}
          </div>
          <p className="hidden text-xs text-left sm:block">
            <strong className="block font-medium capitalize">{fullName}</strong>
            <span className="text-gray-500">{emailAddress} </span>
          </p>
          <ChevronDown className="hidden w-4 h-4 ml-2 text-gray-400 sm:block group-hover:text-gray-500" />
        </button>
      }
    >
      <div
        className="absolute right-0 z-10 w-56 mt-2 bg-white border border-gray-100 divide-y divide-gray-100 rounded-md shadow-lg"
        role="menu"
      >
        <div className="p-2">
          <strong className="block p-2 text-xs font-medium text-gray-400 uppercase">General</strong>
          <Link
            href="#"
            className="flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            <UserCircle className="w-5 h-5" />
            <span>Profile</span>
          </Link>

          <Link
            href="#"
            className="flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            <DeviceAnalytics className="w-5 h-5" />
            <span>Analytics</span>
          </Link>

          <Link
            href="#"
            className="flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            <Star className="w-5 h-5" />
            <span>Favorites</span>
          </Link>

          <Link
            href="#"
            className="flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Messages</span>
          </Link>
          <Link
            href="#"
            className="flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </Link>
          <Link
            href="#"
            className="flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </div>

        <div className="p-2">
          <strong className="block p-2 text-xs font-medium text-gray-400 uppercase">More</strong>
          <Link
            href="#"
            className="flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            <Building className="w-5 h-5" />
            <span>Company</span>
          </Link>

          <Link
            href="#"
            className="flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            <MessageChatbot className="w-5 h-5" />
            <span>Help center</span>
          </Link>
        </div>
      </div>
    </Dropdown>
  );
};

export default UserDropdown;
