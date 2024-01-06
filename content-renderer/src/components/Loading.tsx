import Image from 'next/image';
import React, { ReactNode } from 'react';

interface LoadingProps {
  label: string;
}

export default function Loading({ label }: LoadingProps): ReactNode {
  return (
    <div
      id="loading"
      className="flex flex-col absolute top-0 left-0 justify-center items-center w-[100%] h-[100%] bg-nuxGreenSecondary z-10"
    >
      <Image
        className={`animate-spin mb-[30px]`}
        src={`/images/nux_logo.png`}
        alt="nux logo"
        width={100}
        height={100}
        priority
      />
      <span className="text-white font-bold text-[30px]">{label}</span>
    </div>
  );
}
