"use client";
import useUser from "@/hooks/useUser";
import { GoogleUser } from "@/types";
import LoginButton from "./header/LoginButton";
import LoginedState from "./header/LoginedState";
import Logo from "./header/Logo";
import Search from "./header/Search";
import { Suspense } from "react";

const Header = () => {
  const user: GoogleUser | undefined = useUser();
  return (
    <div className="box-border flex h-[80px] items-center gap-[10px] px-[30px]">
      <Logo />
      <div className="flex flex-grow justify-center">
        <Suspense>
          <Search />
        </Suspense>
      </div>
      {user ? <LoginedState user={user} /> : <LoginButton />}
    </div>
  );
};

export default Header;
