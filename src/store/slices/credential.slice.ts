import { createSlice } from "@reduxjs/toolkit"; // Importing necessary functions and types from Redux Toolkit

interface CredentialState {
    token : boolean
}

// Initial state for the authentication slice
const initialState: CredentialState = {
    token: false,
}

// Create a slice for authentication with actions and reducers
const credentialSlice = createSlice({
    name: "credential",         // Name of the slice
    initialState,               // Initial state for the slice
    reducers: {                 // Reducers to handle actions
        setTokenTrue: (state) => { // Action to set the token to true
            state.token = true;
        },
        setTokenFalse: (state) => { // Action to set the token to false
            state.token = false;
        },
    },
});

// Export the action creators generated by createSlice
export const { setTokenTrue, setTokenFalse } = credentialSlice.actions;

// Export the reducer to be used in the store
export default credentialSlice.reducer;