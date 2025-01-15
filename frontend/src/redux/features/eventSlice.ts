// src/redux/features/eventSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';
import { RootState } from '../store';
import { ICreateEvent, IEvent, IEventDetail } from '../../types/event.interface';

interface EventState {
    count: number | null;
    loading: boolean;
    error: string | null;
    events: IEvent[] | [],
    selectedEvent: IEventDetail | null
}

const initialState: EventState = {
    count: null,
    loading: false,
    error: null,
    events: [],
    selectedEvent: null
};

// Async thunk to fetch the event count
export const fetchEventCount = createAsyncThunk(
    'events/fetchCount',
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get('/events/count');
            return response.data.count; // Assuming the API returns { count: number }
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch event count');
        }
    }
);

// Async thunk to fetch the events
export const fetchEvents = createAsyncThunk(
    'events/list',
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get('/events');
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch event count');
        }
    }
);

// Async thunk to fetch the events
export const createEvent = createAsyncThunk(
    'events/create',
    async (params: ICreateEvent, thunkAPI) => {
        try {
            const response = await axiosInstance.post('/events', params);

            const state = thunkAPI.getState() as RootState; // Access the Redux state
            const user = state.auth.user; // Get user data from authSlice

            // Include creator details in the response data
            const data = {
                ...response.data,
                creator: {
                    name: user?.name,
                    role: user?.role,
                },
            };

            return data; // Return the modified response
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch event count');
        }
    }
);

// Async thunk to fetch an event by ID
export const fetchEventById = createAsyncThunk(
    'events/fetchById',
    async (id: string, thunkAPI) => {
        try {
            const response = await axiosInstance.get(`/events/${id}`);
            return response.data; // Assuming the API returns a single event object
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch event');
        }
    }
);

const eventSlice = createSlice({
    name: 'events',
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
            .addCase(fetchEventCount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEventCount.fulfilled, (state, action) => {
                state.loading = false;
                state.count = action.payload;
            })
            .addCase(fetchEventCount.rejected, (state, action) => {
                state.loading = false;
                state.error = typeof action.payload === 'string'
                    ? action.payload
                    : JSON.stringify(action.payload);
            })
            .addCase(fetchEvents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.loading = false;
                state.events = action.payload;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = typeof action.payload === 'string'
                    ? action.payload
                    : JSON.stringify(action.payload);
            })
            .addCase(createEvent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createEvent.fulfilled, (state, action) => {
                state.loading = false;
                state.events = [...state.events, action.payload];
            })
            .addCase(createEvent.rejected, (state, action) => {
                state.loading = false;
                state.error = typeof action.payload === 'string'
                    ? action.payload
                    : JSON.stringify(action.payload);
            })
            .addCase(fetchEventById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEventById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedEvent = action.payload
            })
            .addCase(fetchEventById.rejected, (state, action) => {
                state.loading = false;
                state.error = typeof action.payload === 'string'
                    ? action.payload
                    : JSON.stringify(action.payload);
            });
    },
});

export const selectEvent = (state: RootState) => state.event;
export default eventSlice.reducer;
