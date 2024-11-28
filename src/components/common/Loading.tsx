"use client";
import loadingAtom from "@/atom/loadingAtom";
import { ClipLoader } from "react-spinners";
import { useRecoilValue } from "recoil";

const Loading = () => {
  const showLoading = useRecoilValue(loadingAtom);
  return (
    showLoading && (
      <div className="fixed left-0 top-0 z-[300] flex h-[100vh] w-[100vw] items-center justify-center bg-[#000] opacity-50">
        <ClipLoader color="#fff" />
      </div>
    )
  );
};

export default Loading;
