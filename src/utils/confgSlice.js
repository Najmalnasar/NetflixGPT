import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
    name: "confif",
    initialState: {
        lang: "English"
    },
    reducers: {
        channgeLanguage: (state, action) => {
            state.lang = action.payload;
        }
    }

})

export const { channgeLanguage } = configSlice.actions;

export default configSlice.reducer