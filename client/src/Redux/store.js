import { configureStore } from '@reduxjs/toolkit'
import usersReducer from "./slices/usersSlice.js";
import postsReducer from "./slices/postsSlice.js";
import requestsReducer from "./slices/requestsSlice.js";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        posts: postsReducer,
        requests: requestsReducer
    },
})