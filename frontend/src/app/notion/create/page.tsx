"use client";
import useUser from "@/hooks/useUser";
import { CreateNotion, GoogleUser } from "@/types";
import { insertNotion } from "@/utils/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import { parsePageId } from "notion-utils";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

const Create = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user: GoogleUser | undefined = useUser();

  const insertData = async (result: CreateNotion) => {
    try {
      await insertNotion(result);
      router.push("/");
    } catch (error: Error | any) {
      throw error;
    }
  };
  useEffect(() => {
    try {
      if (!user && typeof user === "object") {
        alert("로그인 후 사용해주세요");
        router.push("/");
        return;
      }
      if (!user) return;
      const url = searchParams.get("url");
      if (!url) {
        alert("URL이 존재하지 않습니다");
        router.push("/");
        return;
      }
      if (url.includes(".notion.site")) {
        alert("노션 링크가 아닙니다");
        router.push("/");
        return;
      }
      const pageId = parsePageId(url);
      if (!pageId) {
        alert("노션 링크가 아닙니다");
        router.push("/");
        return;
      }
      const param: CreateNotion = { url, user_id: user!.id };
      insertData(param);
    } catch (error) {
      console.error(error);
      alert("노션 등록 실패");
      router.push("/");
    }
  }, [user]);
  return (
    <div className="flex h-[80vh] w-full items-center justify-center">
      <ClipLoader />
    </div>
  );
};

export default Create;
