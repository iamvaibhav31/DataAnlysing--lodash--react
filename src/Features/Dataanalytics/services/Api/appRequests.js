import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://go-dev.greedygame.com/v3/dummy/apps",
});

instance.defaults.baseURL = "https://go-dev.greedygame.com/v3/dummy";

export const Appnames = createAsyncThunk("App/Names", async () => {
  try {
    const response = await instance.get("/apps");
    return response.data.data;
  } catch (e) {
    return e.message;
  }
});

export const Appdata = createAsyncThunk("App/Data", async (date) => {
  try {
    const response = await instance.get(
      `/report?startDate=${date.From}&endDate=${date.To}`,
    );
    return response.data.data;
  } catch (e) {
    return e.message;
  }
});
