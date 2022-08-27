import { configureStore } from '@reduxjs/toolkit'
import gridReducer from './features/grid/gridSlice'

export const store = configureStore({
  reducer: {
    grid: gridReducer,
  },
})
