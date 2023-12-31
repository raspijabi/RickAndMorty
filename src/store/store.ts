import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./ui/uiSlice";



export const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
    reducer: {
        ui: uiSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch