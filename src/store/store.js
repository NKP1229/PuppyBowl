import { configureStore } from "@reduxjs/toolkit";
import reducer from "../features/puppies/puppySlice";
import api from "./api"

// TODO: configure the store to use the API slice's auto-generated reducer and custom middleware.
const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        reducer,
    },
    middleware: (getDefaultMiddleWare) => 
        getDefaultMiddleWare().concat(api.middleware),
});

export default store;
