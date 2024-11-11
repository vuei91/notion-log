"use client";
import { loginGoogle, getLogginedUser, logoutGoogle } from "@/utils/supabase";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Avartar from "../common/Avartar";

const Header = () => {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await getLogginedUser();
    setUser(data.user);
  };

  return (
    <div className="box-border flex h-[80px] items-center gap-[10px] px-[20px]">
      <Logo />
      <div className="flex flex-grow justify-center">
        <Search />
      </div>
      {user ? <LoginnedState user={user} /> : <LoginButton />}
    </div>
  );
};

const Logo = () => {
  return (
    <Link className="itim-regular cursor-pointer text-[24px]" href={"/"}>
      NOTION LOG
    </Link>
  );
};

const Search = () => {
  return (
    <div className="box-border flex w-full max-w-[654px] gap-[8px] rounded-[20px] bg-[#F7F9FC] p-[12px_24px]">
      <SearchIcon />
      <input
        type="text"
        className="w-full border-none bg-[#F7F9FC] focus:outline-none"
        placeholder="검색어를 입력해 주세요."
      />
    </div>
  );
};

const SearchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M10.5 17C14.0899 17 17 14.0899 17 10.5C17 6.91015 14.0899 4 10.5 4C6.91015 4 4 6.91015 4 10.5C4 14.0899 6.91015 17 10.5 17Z"
        stroke="#111111"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M19.2929 20.7071C19.6834 21.0976 20.3166 21.0976 20.7071 20.7071C21.0976 20.3166 21.0976 19.6834 20.7071 19.2929L19.2929 20.7071ZM14.2929 15.7071L19.2929 20.7071L20.7071 19.2929L15.7071 14.2929L14.2929 15.7071Z"
        fill="#111111"
      />
    </svg>
  );
};

const LoginButton = () => {
  return (
    <button
      className="box-border h-[40px] w-[90px] rounded-md bg-[#0066FF] text-white"
      onClick={loginGoogle}
    >
      로그인
    </button>
  );
};

const LoginnedState = ({ user }: { user: { email: string } }) => {
  return (
    <>
      <div className="flex gap-[5px]">
        <Avartar />
        <div>{user.email.split("@")[0]}</div>
      </div>
      <button
        className="box-border h-[40px] w-[90px] rounded-md bg-[#0066FF] text-white"
        onClick={logoutGoogle}
      >
        로그아웃
      </button>
    </>
  );
};

export default Header;
