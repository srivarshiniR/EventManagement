import { createSlice } from '@reduxjs/toolkit';
import { createEventAPI, mockEventsAPI } from '../../services/mockAPI'; 

const initialState = {
    events: [],
    loading: false,
    error: null,
};

const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setEvents: (state, action) => {
            // Set events, replacing the existing list
            state.events = action.payload;
        },
        addEvent: (state, action) => {
            // Add new event to the beginning of the list
            state.events = [action.payload, ...state.events];
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        updateEvent: (state, action) => {
            // Update the specific event in the list
            const index = state.events.findIndex((e) => e.id === action.payload.id);
            if (index !== -1) {
                state.events[index] = action.payload;
            }
        },
        updateAttendees: (state, action) => {
            // Update attendees for a specific event
            const { eventId, attendees } = action.payload;
            const index = state.events.findIndex((e) => e.id === eventId);
            if (index !== -1) {
                state.events[index].attendees = attendees;
            }
        },

    },
});

// Async actions
export const fetchEvents = () => async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
        const response = await mockEventsAPI();
        const existingEvents = getState().events.events; // Get current state
        const mergedEvents = [...response.events, ...existingEvents].reduce(
            (acc, event) => {
                acc[event.id] = event; // Ensure uniqueness by event ID
                return acc;
            },
            {}
        );

        dispatch(setEvents(Object.values(mergedEvents))); // Convert back to array
    } catch (error) {
        dispatch(setError('Failed to fetch events'));
    } finally {
        dispatch(setLoading(false));
    }
};

export const createEvent = (newEvent) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const createdEvent = await createEventAPI(newEvent);
        dispatch(addEvent(createdEvent));
    } catch (error) {
        dispatch(setError('Failed to create event'));
    } finally {
        dispatch(setLoading(false));
    }
};

// Reducers export
export const { setLoading, setEvents, addEvent, setError, updateEvent, updateAttendees } = eventSlice.actions;
export default eventSlice.reducer;
