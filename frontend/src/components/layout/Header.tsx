"use client";
import useUser from "@/hooks/useUser";
import { GoogleUser } from "@/types";
import LoginButton from "./header/LoginButton";
import LoginedState from "./header/LoginedState";
import Logo from "./header/Logo";
import Search from "./header/Search";

const Header = ({
  refreshServer,
}: {
  refreshServer: (path: string) => void;
}) => {
  const user: GoogleUser | undefined = useUser();
  return (
    <div className="box-border flex h-[80px] items-center gap-[10px] px-[20px]">
      <Logo />
      <div className="flex flex-grow justify-center">
        <Search />
      </div>
      {user ? (
        <LoginedState user={user} refreshServer={refreshServer} />
      ) : (
        <LoginButton />
      )}
    </div>
  );
};

export default Header;
