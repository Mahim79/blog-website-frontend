const { default: apiSlice } = require("@/features/api/apiSlice");
const { configureStore } = require("@reduxjs/toolkit");
import editReducer from "../features/edit/editSlice"

const store = configureStore({
    reducer : {
        [apiSlice.reducerPath] : apiSlice.reducer,
        edit : editReducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store