'use client';

import Image from 'next/image';
import React, { ReactNode, useEffect } from 'react';

import { BlockStateType } from '@/redux/blockSlice';
import { parseBlock } from '@/utils/parsers';
import { DynamicJson } from '@/components';

// shadcn Components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface PropsType {
  block: BlockStateType;
  handleMediaLoad: Function;
}

const titleMap = {
  'image/png': 'Image',
  'application/json': 'JSON',
  'audio/mpeg': 'Audio',
  'video/mp4': 'Video',
  none: 'No Result',
};

export default function DynamicContentRenderer(props: PropsType): ReactNode {
  const { block, handleMediaLoad } = props;
  const { showResponse } = block;
  const {
    createdAt,
    url,
    contentType,
    blockType,
    blockSubtype,
    revisedPrompt,
  } = parseBlock(block);

  const title = titleMap[contentType as keyof typeof titleMap] || 'none';

  useEffect(() => {
    // Consequent of stubbing/mocking other media file types
    if (contentType !== 'image/png') handleMediaLoad('succeeded');
  }, [contentType, handleMediaLoad]);

  return (
    <div
      id="dynamic-content-render"
      data-testid="dynamic-content-render"
      className="relative flex flex-col items-center w-[100%] h-[calc(100vh-79px)] px-0 sm:p-[20px] pt-0 md:p-[40px]"
    >
      <Card className="relative max-w-[800px] width-[100%] border-0 md:border-[1px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            <span className="font-semibold">Created</span> {createdAt}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!showResponse && (
            <section className="flex flex-col lg:flex-row">
              <div className="min-w-[300px]">
                {contentType === 'image/png' && (
                  <Image
                    className="grow"
                    data-testid="content-rendered-image"
                    src={url}
                    alt="ai generated image"
                    width={1000}
                    height={0}
                    style={{ width: '100%', height: 'auto' }}
                    onLoad={() => handleMediaLoad('succeeded')}
                    loading="lazy"
                  />
                )}
                {contentType === 'video/mp4' && (
                  <video
                    data-testid="content-rendered-video"
                    width="640"
                    height="360"
                    controls
                  >
                    <source src={url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                {contentType === 'audio/mpeg' && (
                  <audio data-testid="content-rendered-audio" controls>
                    <source src={url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}
                {contentType === 'application/json' && (
                  <DynamicJson dataTestId="content-rendered-json" url={url} />
                )}
              </div>
              <div className="mt-[20px] lg:mt-0 lg:ml-[20px] min-w-[300px]">
                <h2 className="text-[16px] font-semibold">Revised Prompt</h2>
                <p className="text-[14px]">{revisedPrompt}</p>
              </div>
            </section>
          )}
          {showResponse && (
            <section className="flex flex-col overflow-scroll">
              <DynamicJson jsonString={block} />
            </section>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <p className="text-[12px]">
            <span className="font-bold">Block type</span> {blockType}
          </p>
          <p className="text-[12px]">
            <span className="font-bold">Block sub-type</span> {blockSubtype}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
