"use client";
import useUser from "@/hooks/useUser";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Create = () => {
  const searchParams = useSearchParams();
  const user = useUser();
  if (user) return;
  useEffect(() => {
    console.log(searchParams);
  }, []);
  return <></>;
};

export default Create;
