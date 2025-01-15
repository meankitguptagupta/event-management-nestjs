// src/redux/features/eventSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';
import { RootState } from '../store';

interface TagState {
    loading: boolean;
    error: string | null;
    tags: {
        id: number,
        name: string
    }[],
}

const initialState: TagState = {
    loading: false,
    error: null,
    tags: []
};

// Async thunk to fetch the event count
export const fetchTags = createAsyncThunk(
    'tag/list',
    async (searchQuery: string, thunkAPI) => {
        try {
            const response = await axiosInstance.get(`/tags`, {
                params: { search: searchQuery } // Assuming the API supports query filtering by 'search'
            });
            return response.data; // Assuming the API returns { count: number }
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch tags');
        }
    }
);

// Async thunk to fetch the events
export const createTag = createAsyncThunk(
    'tag/create',
    async (params: { name: string }, thunkAPI) => {
        try {
            const response = await axiosInstance.post('/tags', params);

            return response.data; // Return the modified response
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch event count');
        }
    }
);

const tagSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        setGlobalError: (state, action) => {
            state.error = action.payload; // Store the error in the global state
        },
        clearGlobalError: (state) => {
            state.error = null; // Clear the error
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTags.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.loading = false;
                state.tags = action.payload;
            })
            .addCase(fetchTags.rejected, (state, action) => {
                state.loading = false;
                state.error = typeof action.payload === 'string'
                    ? action.payload
                    : JSON.stringify(action.payload);
            })
            .addCase(createTag.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTag.fulfilled, (state, action) => {
                state.loading = false;
                state.tags = [...state.tags, action.payload];
            })
            .addCase(createTag.rejected, (state, action) => {
                state.loading = false;
                state.error = typeof action.payload === 'string'
                    ? action.payload
                    : JSON.stringify(action.payload);
            })
    },
});

export const tagEvent = (state: RootState) => state.tag;
export default tagSlice.reducer;
