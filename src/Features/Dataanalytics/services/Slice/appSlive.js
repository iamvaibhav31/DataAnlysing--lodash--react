import { createSlice } from "@reduxjs/toolkit";
import { Appdata, Appnames } from "../Api/appRequests";
import _ from "lodash";

const initialState = {
  appname: [],
  appdata: [],
  status: "idle", // idle | loading | successful | failed
  error: null,
  maxrequests: 0,
  maxresponses: 0,
};

export const appSlice = createSlice({
  name: "AppData",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(Appnames.fulfilled, (state, action) => {
        state.appname = action.payload;
        // console.log(state.appname)
      })

      // App Data
      .addCase(Appdata.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(Appdata.fulfilled, (state, action) => {
        state.status = "successful";

        const updateddata = action.payload.map((item) => {
          const appname = _.find(state.appname, {
            app_id: item.app_id,
          });
          state.maxrequests = Math.max(state.maxrequests, item.requests);
          state.maxresponses = Math.max(state.maxresponses, item.responses);
          return {
            ...item,
            name: appname.app_name,
            fillrate: (item.requests / item.responses) * 100,
            ctr: (item.clicks / item.impressions) * 100,
          };
        });
        console.log(updateddata);
        state.appdata = updateddata;
      })
      .addCase(Appdata.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// export const { filterAppnamebydefault, filterAppnamebysearch, filterAppdatabydefault, filterAppdatabysearch } = appSlice.actions

export const getappname = (state) => state.appslice.appname;
export const getappdata = (state) => state.appslice.appdata;
export const getstatus = (state) => state.appslice.status;
export const geterror = (state) => state.appslice.error;
export const getMaxReq = (state) => state.appslice.maxrequests;
export const getMaxRes = (state) => state.appslice.maxresponses;
export default appSlice.reducer;
