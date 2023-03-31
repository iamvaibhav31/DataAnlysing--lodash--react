import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const Appnames = createAsyncThunk("App/Names", async () => {
          try {
                    const response = await axios.get("http://go-dev.greedygame.com/v3/dummy/apps")
                    return response.data.data
          } catch (e) {
                    return e.message
          }
})

export const Appdata = createAsyncThunk("App/Data", async (date) => {
          try {
                    const response = await axios.get(`https://go-dev.greedygame.com/v3/dummy/report?startDate=${date.From}&endDate=${date.To}`)
                    return response.data.data
          } catch (e) {
                    return e.message
          }
})