import { configureStore } from '@reduxjs/toolkit'
import appdataSlice from '../Features/Dataanalytics/services/Slice/appSlive'
import colSlice from '../Features/Dataanalytics/services/Slice/colSlice'

export const store = configureStore({
          reducer: {
                    appslice: appdataSlice,
                    colslice: colSlice
          },
})