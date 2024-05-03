import Image from "next/image";
import React from "react";
import LoadingIcon from "~/assets/loadingIcon.svg";

const LoadingPage = () => {
  return (
    <div className="flex h-[600px] flex-col items-center justify-center gap-4">
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      <Image alt="loading" src={LoadingIcon} height={50} width={50} />
      <p>Loading...</p>
    </div>
  );
};

export { LoadingPage };
