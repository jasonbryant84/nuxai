'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

// Redux
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  fetchBlock,
  BlockStateType,
  setShowResponse,
} from '@/redux/blockSlice';

const Sidebar = () => {
  // Redux
  const dispatch = useAppDispatch();
  const { status, mediaStatus, showResponse } = useAppSelector(
    (state): BlockStateType => state.block,
  );
  const showHideCTA = showResponse ? 'See Result' : 'See Response';

  return (
    <aside className="flex justify-between md:justify-normal md:fixed flex-row md:flex-col md:items-center px-[10px] md:px-[20px] py-[15px] h-auto md:h-[calc(100vh-79px)] w-[100%] md:w-[180px] md:border-r-[1px] pt-[20px] md:pt-[40px] border-gray-300">
      <Button
        onClick={() => {
          if (status !== 'loading') dispatch(fetchBlock());
        }}
        className="bg-nuxGreenBtn hover:bg-nuxGreenBtnHover md:mb-[20px] w-full max-w-[140px] md:max-w-none"
      >
        Load Content
      </Button>

      {status === 'succeeded' && mediaStatus === 'succeeded' && (
        <Button
          onClick={() => dispatch(setShowResponse())}
          className="bg-nuxGreenBtn hover:bg-nuxGreenBtnHover w-full max-w-[140px] md:max-w-none"
        >
          {showHideCTA}
        </Button>
      )}
    </aside>
  );
};

export default Sidebar;
