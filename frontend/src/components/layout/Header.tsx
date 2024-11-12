"use client";
import useUser from "@/hooks/useUser";
import { loginGoogle, logoutGoogle } from "@/utils/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AvartarL from "../common/AvartarL";
import { GoogleUser } from "@/types";

const Header = () => {
  const user: GoogleUser | undefined = useUser();
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
  const router = useRouter();
  return (
    <div
      className="box-border flex h-[50px] w-[110px] cursor-pointer items-center justify-center gap-2 rounded-md bg-[#efefef] shadow-sm"
      onClick={async () => {
        const { isSuccess, message } = await loginGoogle();
        if (isSuccess) {
          router.refresh();
        } else {
          alert("로그인 실패");
          console.error(message);
        }
      }}
    >
      <GoogleIcon />
      <div>로그인</div>
    </div>
  );
};

const GoogleIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
      <path d="M1 1h22v22H1z" fill="none" />
    </svg>
  );
};

const LoginnedState = ({ user }: { user: GoogleUser }) => {
  const logout = async () => {
    const { isSuccess, message } = await logoutGoogle();
    if (isSuccess) {
      window.location.reload();
    } else {
      alert("로그아웃 실패");
      console.error(message);
    }
  };

  const addNotionLink = async () => {
    const link = prompt("노션의 링크를 넣어주세요");
    if (link === "") {
      alert("링크가 존재하지 않습니다");
      return;
    } else if (!link?.includes(".notion.site")) {
      alert("노션 링크가 아닙니다");
      return;
    }
    window.location.replace("/notion/about/?id=" + link);
  };

  return (
    <div className="flex items-center gap-[10px]">
      <button
        className="box-border h-[48px] w-[124px] rounded-md bg-[#0066FF] text-white"
        onClick={addNotionLink}
      >
        링크 등록하기
      </button>
      <div className="flex gap-[5px]">
        <AvartarL url={user.user_metadata.picture} />
      </div>
    </div>
  );
};

export default Header;
