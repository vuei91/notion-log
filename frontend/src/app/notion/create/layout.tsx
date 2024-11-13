import React, { Suspense } from "react";

const CreateLayout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense>{children}</Suspense>;
};

export default CreateLayout;
