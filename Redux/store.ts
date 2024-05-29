import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Features/AuthSlice'
import profileReducer from './Features/ProfileSlice'
import categoryReducer from './Features/ProfileSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        auth:authReducer,
        profile:profileReducer,
        category:categoryReducer,
       
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']