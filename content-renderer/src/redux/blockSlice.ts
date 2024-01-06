import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from './store';
import { getBlock } from '@/utils/apis';
import { stubMediaType } from '@/utils/stub';

// For used for mocking other return types from API
interface blockDataType {
  metadata: { content_type: string };
  response: { url: string };
}

export interface blockAPIReturnType {
  index_id: string;
  created_at: string;
  run_id: string;
  data: blockDataType[];
}

export interface BlockStateType extends blockAPIReturnType {
  workbookId: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  mediaStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  showResponse: boolean;
}

const initialState: BlockStateType = {
  index_id: '',
  created_at: '',
  data: [],
  run_id: '',
  workbookId: 'dd0f6b19c7854fb196d1d784d',
  status: 'idle',
  mediaStatus: 'idle',
  error: null,
  showResponse: false,
};

// Thunk (Async calls)
export const fetchBlock = createAsyncThunk<
  blockAPIReturnType,
  void,
  { rejectValue: string }
>('Block/fetchBlock', async (_, { rejectWithValue, getState }) => {
  const { block } = getState() as RootState;
  const workbookId = block?.workbookId;

  try {
    return await getBlock(workbookId);
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('An unknown error occurred');
  }
});

export const BlockSlice = createSlice({
  name: 'Block',
  initialState,
  reducers: {
    setShowResponse(state) {
      state.showResponse = !state.showResponse;
    },
    setMediaStatus(state, action) {
      state.mediaStatus = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBlock.pending, (state): void => {
        state.status = 'loading';
        state.showResponse = false;
        state.mediaStatus = 'idle';
      })
      .addCase(fetchBlock.fulfilled, (state, action): void => {
        const { created_at, data, index_id, run_id } = action.payload;

        // Stubbing out content types for proof of concept
        // the url values are hardcoded in DynamicContentRenderer for PoC
        // ie ?type=video
        const { contentType, url } = stubMediaType(
          window.location.search,
          data[0].response.url,
        );
        data[0].metadata.content_type = contentType;
        data[0].response.url = url;

        state.index_id = index_id;
        state.created_at = created_at;
        state.data = data;
        state.run_id = run_id;
        state.status = 'succeeded';
      })
      .addCase(fetchBlock.rejected, (state, action): void => {
        state.status = 'failed';
        state.error = action.error.message || null;
        state.mediaStatus = 'idle';
      });
  },
});

export const { setShowResponse, setMediaStatus } = BlockSlice.actions;

export default BlockSlice.reducer;
