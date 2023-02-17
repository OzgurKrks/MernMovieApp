import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
// Create new favorite
export const createFavorite = createAsyncThunk(
  "favorite/add",
  async (favoriteData, thunkAPI) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user.token;
      const confing = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        process.env.REACT_APP_URL + "/movie/addMovie",
        favoriteData,
        confing
      );
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user favorites
export const getFavorites = createAsyncThunk(
  "favorites/getAll",
  async (_, thunkAPI) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user.token;
      const confing = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        process.env.REACT_APP_URL + "/movie/getAllMovies",
        confing
      );
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user favorite
export const deleteFavorite = createAsyncThunk(
  "favorites/delete",
  async (id, thunkAPI) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user.token;
      const confing = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(
        process.env.REACT_APP_URL + `/movie/deleteMovie/${id}`,

        confing
      );
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFavorite.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(createFavorite.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteFavorite.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload.id
        );
      })
      .addCase(deleteFavorite.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = favoriteSlice.actions;
export default favoriteSlice.reducer;
