'use client';

import React from 'react';

// Redux
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { BlockStateType, setMediaStatus } from '@/redux/blockSlice';

import { DynamicContentRenderer, Loading } from '@/components';

export default function Home() {
  const dispatch = useAppDispatch();
  const blockInfo = useAppSelector((state): BlockStateType => state.block);
  const { error, status, mediaStatus } = blockInfo;

  const handleMediaLoad = (status: string) => {
    dispatch(setMediaStatus(status));
  };

  const showLoading =
    status === 'loading' ||
    (status === 'succeeded' && mediaStatus !== 'succeeded');
  const loadingPrompt =
    status === 'loading' ? 'fetching results' : 'loading media';

  return (
    <section className="flex h-[calc(100vh-79px)] flex-col items-center justify-between flex-grow md:ml-[180px]">
      <section
        id="content-wrapper"
        className="flex relative flex-col items-center justify-between w-[100%] h-[100%]"
      >
        {showLoading && <Loading label={error || loadingPrompt} />}

        {status === 'succeeded' && (
          <DynamicContentRenderer
            block={blockInfo}
            handleMediaLoad={handleMediaLoad}
          />
        )}
      </section>
    </section>
  );
}
