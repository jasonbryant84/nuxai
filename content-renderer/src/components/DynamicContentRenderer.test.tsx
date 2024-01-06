import React from 'react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import { DynamicContentRenderer } from '@/components';

interface ResponseData {
  index_id: string;
  created_at: string;
  run_id: string;
  data: {
    metadata: { content_type: string };
    response: { url: string };
  }[];
}

let responseData: ResponseData = {
  index_id: '',
  created_at: '',
  run_id: '',
  data: [
    {
      metadata: { content_type: '' },
      response: { url: '' },
    },
  ],
};
const workbookId = 'dd0f6b19c7854fb196d1d784d';

beforeAll(async () => {
  const url = `https://api.nux.ai/run/workbook/${workbookId}`;
  const authorization = `Bearer ${process.env.API_BEARER_TOKEN}`;

  try {
    const responseObj = await axios.post(url, null, {
      headers: { Authorization: authorization },
    });

    responseData = responseObj?.data;
  } catch (error) {
    console.error('Error making POST request:', error);
  }
}, 30000); // 30 second timeout for API to return

describe('DynamicContentRenderer', () => {
  // Happy Paths
  it('Happy Path: renders image/png result', () => {
    const src = responseData.data[0].response.url;

    render(
      <DynamicContentRenderer
        block={{
          ...responseData, // index_id, created_at, run_id, data
          workbookId: workbookId,
          status: 'succeeded',
          mediaStatus: 'succeeded',
          error: null,
          showResponse: false,
        }}
        handleMediaLoad={(): void => {}}
      />,
    );

    const renderedImageElement = screen.getByTestId('content-rendered-image');
    expect(renderedImageElement).toBeInTheDocument();
    expect(renderedImageElement.getAttribute('src')).toContain(
      encodeURIComponent(src),
    );

    const h3Element = screen.getByRole('heading', { level: 3 });
    expect(h3Element.innerHTML).toBe('Image');
  });

  it('Happy Path: renders application/json result', () => {
    responseData.data[0].metadata.content_type = 'application/json';
    responseData.data[0].response.url =
      'https://jsonplaceholder.typicode.com/posts';

    render(
      <DynamicContentRenderer
        block={{
          ...responseData,
          workbookId: workbookId,
          status: 'succeeded',
          mediaStatus: 'succeeded',
          error: null,
          showResponse: false,
        }}
        handleMediaLoad={(): void => {}}
      />,
    );

    const renderedAudioElement = screen.getByTestId('content-rendered-json');
    expect(renderedAudioElement).toBeInTheDocument();

    const h3Element = screen.getByRole('heading', { level: 3 });
    expect(h3Element.innerHTML).toBe('JSON');
  });

  it('Happy Path: renders audio/mpeg result', () => {
    responseData.data[0].metadata.content_type = 'audio/mpeg';
    responseData.data[0].response.url =
      'https://www.w3schools.com/html/horse.mp3';

    render(
      <DynamicContentRenderer
        block={{
          ...responseData,
          workbookId: workbookId,
          status: 'succeeded',
          mediaStatus: 'succeeded',
          error: null,
          showResponse: false,
        }}
        handleMediaLoad={(): void => {}}
      />,
    );

    const renderedAudioElement = screen.getByTestId('content-rendered-audio');
    expect(renderedAudioElement).toBeInTheDocument();

    const source = renderedAudioElement.querySelector('source');
    expect(source?.getAttribute('src')).toBe(responseData.data[0].response.url);

    const h3Element = screen.getByRole('heading', { level: 3 });
    expect(h3Element.innerHTML).toBe('Audio');
  });

  it('Happy Path: renders video/mp4 result', () => {
    responseData.data[0].metadata.content_type = 'video/mp4';
    responseData.data[0].response.url =
      'https://www.w3schools.com/html/mov_bbb.mp4';

    render(
      <DynamicContentRenderer
        block={{
          ...responseData,
          workbookId: workbookId,
          status: 'succeeded',
          mediaStatus: 'succeeded',
          error: null,
          showResponse: false,
        }}
        handleMediaLoad={(): void => {}}
      />,
    );

    const renderedVideoElement = screen.getByTestId('content-rendered-video');
    expect(renderedVideoElement).toBeInTheDocument();

    const source = renderedVideoElement.querySelector('source');
    expect(source?.getAttribute('src')).toBe(responseData.data[0].response.url);

    const h3Element = screen.getByRole('heading', { level: 3 });
    expect(h3Element.innerHTML).toBe('Video');
  });
});
