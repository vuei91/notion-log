"use client";
import useUser from "@/hooks/useUser";
import { CreateNotion, GoogleUser } from "@/types";
import { decrypt } from "@/utils/crypto";
import { insertNotion } from "@/utils/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";

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
      // if (!user) {
      //   router.push("/");
      //   return;
      // }
      const encData = searchParams.get("data");
      if (!encData) {
        router.push("/");
        return;
      }
      const data = decrypt(encData, process.env.NEXT_PUBLIC_AES_SCERET_KEY!);
      console.log("data", data);
      if (!data) {
        router.push("/");
        return;
      }
      const result = JSON.parse(data) as CreateNotion;
      // result.user_id = user.id;
      console.log("result", result);
      // insertData(result);
    } catch (error) {
      alert("노션 등록 실패");
      router.push("/");
    }
  }, [user, router]);
  return (
    <div className="flex h-[80vh] w-full items-center justify-center">
      <ClipLoader />
    </div>
  );
};

export default Create;
