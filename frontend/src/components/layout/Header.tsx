"use client";
import useUser from "@/hooks/useUser";
import { GoogleUser } from "@/types";
import LoginButton from "./header/LoginButton";
import LoginedState from "./header/LoginedState";
import Logo from "./header/Logo";
import Search from "./header/Search";

const Header = () => {
  const user: GoogleUser | undefined = useUser();
  return (
    <div className="box-border flex h-[80px] items-center gap-[10px] px-[20px]">
      <Logo />
      <div className="flex flex-grow justify-center">
        <Search />
      </div>
      {user ? <LoginedState user={user} /> : <LoginButton />}
    </div>
  );
};

export default Header;
