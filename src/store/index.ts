import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import machinesReducer from "./slices/machines";

const store = configureStore({
  reducer: {
    machines: machinesReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export type State = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
export default store;
