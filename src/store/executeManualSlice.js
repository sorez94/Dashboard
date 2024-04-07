import { createSlice } from "@reduxjs/toolkit";

export const executeManualSlice = createSlice({
    name: "execute-manual",
    initialState: {
        hubMessage: '',
        isExecuteActive: true,
        featureClasses: [],
        osUpdateFeatureClasses: [],
        osInsertUpdate: null
    },
    reducers: {
        setMessage: (state, action) => {
            state.hubMessage = action.payload;
        },
        setExecuteButtonActive: (state, action) => {
            state.isExecuteActive = action.payload;
        },
        setFeatureClasses: (state, action) => {
            state.featureClasses = action.payload;
        },
        setOsUpdateFeatureClasses: (state, action) => {
            state.osUpdateFeatureClasses = action.payload;
        },
        setOsInsertUpdate: (state, action) => {
            state.osInsertUpdate = action.payload;
        },
    }
});

export const {setMessage, setExecuteButtonActive, setFeatureClasses, setOsUpdateFeatureClasses, setOsInsertUpdate} = executeManualSlice.actions;

export default executeManualSlice.reducer;