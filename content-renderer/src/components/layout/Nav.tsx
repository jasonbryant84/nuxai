'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Redux
import { useAppSelector } from '@/redux/hooks';
import { BlockStateType } from '@/redux/blockSlice';

const Nav = () => {
  const { workbookId } = useAppSelector((state): BlockStateType => state.block);

  return (
    <nav className="flex flex-row justify-between items-center px-[10px] md:px-[20px] py-[15px] h-[79px] w-screen fixed bg-nuxGreen z-10">
      <Link href="/" className="flex flex-row items-center">
        <Image
          className="relative fill-air-blue"
          src="/images/nux_logo.png"
          alt="Air Logo"
          width={20}
          height={15}
          priority
        />
        <span className="text-white font-extrabold text-[20px]">NUX.ai</span>
      </Link>

      <div className="text-white">
        <span className="hidden sm:inline font-extrabold mr-[10px]">
          Workbook
        </span>
        <span className="font-light">
          <span className="sm:hidden">{`...${workbookId.substr(-8)}`}</span>
          <span className="hidden sm:inline">{workbookId}</span>
        </span>
      </div>
    </nav>
  );
};

export default Nav;
