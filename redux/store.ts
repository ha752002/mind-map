import {configureStore, createListenerMiddleware, isAnyOf} from "@reduxjs/toolkit";
import mindMapSlice from "@/redux/slices/mind-map-slice";

const {nodesChange} = mindMapSlice.actions
const reducer = {
    mindMap: mindMapSlice.reducer
}
const mindMapMiddlewareListener = createListenerMiddleware()
mindMapMiddlewareListener.startListening({
    matcher: isAnyOf(nodesChange),
    effect: async (action, listenerApi) => {
        console.log(action)
    }
})
export type RootState = ReturnType<typeof store.getState>

export const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().prepend()
})