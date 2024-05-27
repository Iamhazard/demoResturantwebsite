import { ProfileFormValues, ProfileState, Users } from "@/@types/enum";
import { LoginSchema, ProfielSchema, RegisterSchema } from "@/Schema";
import { User } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: ProfileState = {
  profile: {
    name: "",
    email: "",
    userId:"",
    streetAddress: "",
    postalCode: "",
    city: "",
    country: "",
    image: "",
  },
  status: "idle",
  error: null,
  isAdmin: false,
  success: null,
  isLoggedIn: false,
};

export const BACKEND_URL = "http://localhost:8080";
const API_URL = `${BACKEND_URL}`;

export const createProfile = createAsyncThunk(
  "/profile",
  async (payload:{formDataobject: FormData }, thunkAPI) => {
    try {
    console.log("formdata  from profieSlice", payload)
      const response = await fetch(`${API_URL}/profile`,
        {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: JSON.stringify(payload),
      });
      
      const data = await response.json();
  
      console.log("response from profileSlice", data)
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const editProfiel = createAsyncThunk(
  "profile/edit",
  async (
    credentials: {
      email: string;
      hashedPassword: string;
      lastName: string;
      name: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(`${API_URL}/register`, credentials);
      const user = response.data.user;
      RegisterSchema.parse(user);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchCurrentProfile = createAsyncThunk(
  "allprofile",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/allprofile`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const fetchCurrentProfileById = createAsyncThunk(
  "/profile/:id",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/allprofile`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const authslice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    SET_PROFILE(state, action) {
      const profile = action.payload;
      state.profile.email = profile.email;
      state.profile.name = profile.name;
      state.profile.streetAddress = profile.streetAddress;
      state.profile.city = profile.city;
      state.profile.country = profile.country;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProfile.pending, (state, action) => {
        state.status = "loading";
        state.success = null;
        state.error = null;
      })
      .addCase(
        createProfile.fulfilled,
        (
          state,
          action: PayloadAction<{
            user: User;
            profile: ProfileFormValues;
          }>
        ) => {
          state.status = "succeeded";
          state.profile = action.payload.profile;
          state.isAdmin = action.payload.user.role === "ADMIN";
          state.success = "profile created successfully";
        }
      )
      .addCase(createProfile.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(editProfiel.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.success = null;
      })
      .addCase(
        editProfiel.fulfilled,
        (
          state,
          action: PayloadAction<{ user: Users; profile: ProfileFormValues }>
        ) => {
          state.status = "succeeded";
          state.profile = action.payload.profile;
          state.isAdmin = action.payload.user.role === "ADMIN";
          state.success = "Registration successful!";
        }
      )
      .addCase(editProfiel.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
        state.success = null;
      })
      .addCase(fetchCurrentProfile.pending, (state) => {
        state.status = "loading";
        state.success = "null";
      })

      .addCase(
        fetchCurrentProfile.fulfilled,
        (
          state,
          action: PayloadAction<{ user: Users; profile: ProfileFormValues }>
        ) => {
          state.status = "succeeded";
          state.profile = action.payload.profile;
          state.isAdmin = action.payload.user.role === "ADMIN";
          state.success = "Data Fetched";
        }
      )
      .addCase(
        fetchCurrentProfile.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export const { SET_PROFILE } = authslice.actions;
export default authslice.reducer;
