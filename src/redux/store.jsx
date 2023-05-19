import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";

import storage from "redux-persist/lib/storage";
import { userSlice } from "./user";
import { recuiterSlice } from "./recruiter";
import { adminSlice } from "./admin";


const persistConfigUser = { key: "user", storage, version: 1 };
const persistConfigRecruiter = { key: "recuiter", storage, version: 1 };
const persistConfigAdmin = { key: "admin", storage, version: 1 };




const userPersistedReducer = persistReducer(
    persistConfigUser,
    userSlice.reducer
);

const recuiterPersistedReducer = persistReducer(
  persistConfigRecruiter,
  recuiterSlice.reducer
);

const adminPersistedReducer = persistReducer(
  persistConfigAdmin,
  adminSlice.reducer
);



export const store=configureStore({
    reducer:{
        clientLogin: userPersistedReducer,
        recuiterLogin:recuiterPersistedReducer,
        adminLogin: adminPersistedReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor= persistStore(store)