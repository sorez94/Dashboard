import {configureStore} from "@reduxjs/toolkit";
import executeManualReducer from "./executeManualSlice";

export default configureStore({
    reducer: {
        executeManual: executeManualReducer
    }
});