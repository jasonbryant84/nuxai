import { BlockStateType } from '@/redux/blockSlice';

interface responseType {
  url: string;
}

interface metaDataType {
  content_type: string;
  block_type: string;
  block_subtype: string;
  revised_prompt: string;
}

interface ParsedBlock {
  createdAt: string;
  url: string;
  contentType: string;
  blockType: string;
  blockSubtype: string;
  revisedPrompt: string;
}

const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true,
};

export const parseBlock = (blockInfo: BlockStateType): ParsedBlock => {
  if (blockInfo?.data?.[0]) {
    const { created_at: createdAtTemp } = blockInfo;
    const createdAtDate = new Date(createdAtTemp);
    const createdAt = createdAtDate.toLocaleString('en-US', options);

    const { metadata, response } = blockInfo.data[0] as {
      metadata?: metaDataType;
      response?: responseType;
    };
    const url: string = (response && response.url) || '';
    const contentType: string = (metadata && metadata.content_type) || '';
    const blockType: string = (metadata && metadata.block_type) || '';
    const blockSubtype: string = (metadata && metadata.block_subtype) || '';
    const revisedPrompt: string = (metadata && metadata.revised_prompt) || '';

    return {
      createdAt,
      url,
      contentType,
      blockType,
      blockSubtype,
      revisedPrompt,
    };
  }

  return {
    createdAt: '',
    url: '',
    contentType: '',
    blockType: '',
    blockSubtype: '',
    revisedPrompt: '',
  };
};
