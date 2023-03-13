import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import Cookies from "js-cookie";
import Router from "next/router";

import { AUTH, UserRoleEnum } from "@/enums";

export type LoggedUser = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  locale: string;
  role: UserRoleEnum;
};

type LocalUser = {
  id?: string;
  authed: AUTH;
  user?: LoggedUser;
  token?: string | null;
};

type UserStoreObject = {
  user: LocalUser;
  signup: (first_name: string, last_name: string, phone: string, email: string) => void;
  signin: (email: string) => void;
  logout: () => void;
};

export const useStore = create<UserStoreObject>()(
  devtools(
    persist(
      (set, get) => ({
        user: { authed: AUTH.NOT_AUTHED },
        signup: (first_name: string, last_name: string, phone: string, email: string) => {},
        signin: (email: string) => {},
        logout: () => {
          set({ user: { authed: AUTH.NOT_AUTHED } });
          Cookies.remove("northstar-user-id");
          Router.push("/sign-in");
        },
      }),
      {
        name: "northstar",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
