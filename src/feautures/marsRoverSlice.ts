import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import MarsRover from "../interfaces/interfaces";
import marsRoverService from "./marsRoverServices";
import {BookMark, QueryString } from "@/types/types";

interface MarsRoverState  {
    loading: boolean;
    loadingModal: boolean;
    error: string | null;
    success: boolean;
    marsRover: MarsRover[] | null;
    marsRoverPages: [] | null;
    queryString:string;
    message:string;
    pageNumber: number;
  }

const initialState: MarsRoverState = {
    loading: false,
    loadingModal : false,
    error: null,
    marsRover: [],
    marsRoverPages: [],
    success: false,
    queryString:"",
    message:"",
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

export const addBookMark = createAsyncThunk(
  "marsRover/addBookMark",
  async (query:BookMark, thunkApi) => {
    try {
      if (typeof window !== 'undefined') {
        let bookmarks = JSON.parse(window.localStorage.getItem("bookmarks") || "[]");
        bookmarks.push(query);
        window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      return query
    }
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

const marsRoverSlice = createSlice({
    name: "photos",
    initialState,
    reducers: {
      reset: (state) => {
        state.queryString = "";
        state.pageNumber = 0;
        state.error = "";
        state.marsRoverPages=[];
        },
      resetToast: (state) => {
        state.success = false
        state.error = "";
        state.message = "";
        },
    },
    extraReducers(builder){
        builder
          .addCase(getMarsRover.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(getMarsRover.fulfilled, (state, action: PayloadAction<MarsRover[]>) => {
            state.loading = false;
            state.marsRover = action.payload;
          })
          .addCase(getMarsRover.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
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
            if(action.payload.initialString){
              state.message = "Filters applied!"
            }
          })
          .addCase(addQueryString.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
            if(action.payload.initialString){
              state.message = "There was an error applying the filters!"
            }
          })
          .addCase(addBookMark.pending, (state, action) => {
            state.loadingModal = true;
          })
          .addCase(addBookMark.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingModal = false;
            state.success = true;
            state.message = "Bookmark added!"
            
          })
          .addCase(addBookMark.rejected, (state, action: PayloadAction<any>) => {
            state.loadingModal = false;
            state.error = action.payload;
            state.message = "There was an error!"
          })
    }
})

export const { reset,resetToast } = marsRoverSlice.actions

export default marsRoverSlice.reducer;