import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import MarsRover from "../interfaces/interfaces";
import marsRoverService from "./marsRoverServices";
import {QueryString } from "@/types/types";

interface MarsRoverState  {
    loading: boolean;
    error: string | null;
    success: boolean;
    marsRover: MarsRover[] | null;
    marsRoverPages: [] | null;
    queryString:string;
    pageNumber: number;
  }

const initialState: MarsRoverState = {
    loading: false,
    error: null,
    marsRover: [],
    marsRoverPages: [],
    success: false,
    queryString:"",
    pageNumber:0,
}

export const getMarsRover = createAsyncThunk(
    "marsRover/getMarsRover",
    async (query:QueryString, thunkApi) => {
      try {
        return await marsRoverService.getMarsRover(query)
      } catch (error: any) {
        const message = error.message;
        return thunkApi.rejectWithValue(message);
      }
    }
);

export const addQueryString = createAsyncThunk(
  "marsRover/addQueryString",
  async (query:QueryString, thunkApi) => {
    try {
      return query
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

const marsRoverSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
      reset: (state) => {
        state.queryString = "";
        state.pageNumber = 0;
        state.success = false;
        state.error = "";
        state.marsRoverPages=[];
        },
    },
    extraReducers(builder){
        builder
          .addCase(getMarsRover.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(getMarsRover.fulfilled, (state, action: PayloadAction<MarsRover[]>) => {
            state.loading = false;
            state.success = true;
            state.marsRover = action.payload;
          })
          .addCase(getMarsRover.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(addQueryString.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(addQueryString.fulfilled, (state, action: PayloadAction<QueryString>) => {
            state.loading = false;
            state.queryString = action.payload.initialString;
            state.success = true;
            state.pageNumber = action.payload.pageNumber;
          })
          .addCase(addQueryString.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
          })
    }
})

export const { reset } = marsRoverSlice.actions

export default marsRoverSlice.reducer;