import marsRoverSlice from '@/feautures/marsRoverSlice';
import { configureStore } from '@reduxjs/toolkit'

// ...
const store = configureStore({
  reducer: {
    marsRover: marsRoverSlice
  },
})
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store