"use client";
import useUser from "@/hooks/useUser";
import { CreateNotion, GoogleUser } from "@/types";
import { getLogginedUser, insertNotion } from "@/utils/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Create = () => {
  const router = useRouter();
  const user: GoogleUser | undefined = useUser();
  const searchParams = useSearchParams();
  const insertData = async (result: CreateNotion) => {
    try {
      await insertNotion(result);
      router.push("/");
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    try {
      if (!user) return;
      const data = searchParams.get("data");
      if (!data) return;
      const result = JSON.parse(data) as CreateNotion;
      result.user_id = user.id;
      insertData(result);
    } catch (error) {
      alert("노션 등록 실패");
      router.push("/");
    }
  }, [user, router]);
  return <></>;
};

export default Create;
