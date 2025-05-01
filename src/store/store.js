const { default: apiSlice } = require("@/features/api/apiSlice");
const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
    reducer : {
        [apiSlice.reducerPath] : apiSlice.reducer,
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store