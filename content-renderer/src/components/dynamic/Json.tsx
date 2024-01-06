'use client';

import React from 'react';
import axios from 'axios';
import { ReactNode, useEffect, useState } from 'react';
import { BlockStateType } from '@/redux/blockSlice';

interface jsonType {
  jsonString?: BlockStateType;
  url?: string;
  dataTestId?: string;
}

export default function Json(props: jsonType): ReactNode {
  const { jsonString, url, dataTestId } = props;
  const [jsonStr, setJsonStr] = useState<string | null>(null);

  const getJSON = () => {
    if (jsonString || !url) return;

    axios
      .get(url)
      .then((response) => {
        const jsonString = JSON.stringify(response.data);
        setJsonStr(jsonString);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  useEffect(() => {
    getJSON();
  });

  return (
    <pre data-testid={dataTestId}>
      <code
        className={`flex text-[10px] text-wrap overflow-scroll max-w-[calc(100vw-48px)] ${
          url ? 'max-h-[400px]' : ''
        }`}
      >
        {jsonStr || JSON.stringify(jsonString, null, 2)}
      </code>
    </pre>
  );
}
