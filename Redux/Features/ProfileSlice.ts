import { ProfileFormValues, ProfileState, Users } from "@/@types/enum";
import {ProfielSchema, RegisterSchema } from "@/Schema";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const loadStateFromLocalStorage = (): ProfileState | undefined => {
    if (typeof window === 'undefined') {
    return undefined; 
  }

    const authStateJSON = localStorage.getItem('authState');
    if (authStateJSON) {
        return JSON.parse(authStateJSON);
    }
    return undefined;
};

const initialState: ProfileState = loadStateFromLocalStorage () || {
  profile:null,
    name: "",
    email: "",
    userId:"",
    streetAddress: "",
    postalCode: "",
    city: "",
    country: "",
    image: "",
      error: null,
      success: null,
  status: "idle",
  isAdmin: false,
  isLoggedIn: false,
};

export const BACKEND_URL = "http://localhost:8080";
const API_URL = `${BACKEND_URL}`;

export const createProfile = createAsyncThunk(
  "/profile",
  async (payload:{ 
     formDataobject:ProfileFormValues
   } , thunkAPI) => {
    try {
    console.log("formdata  from profieSlice", payload)
      const response = await axios.post(`${BACKEND_URL}/profile`,payload)
       const profie=response.data.profie;
       ProfielSchema.parse(profie)
      localStorage.setItem('sessionToken', response.data.sessionToken);
      console.log("response from profileSlice", response.data)
      return response.data;
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
const profileslice = createSlice({
  name: "profile",
  initialState,
  reducers: {
     initializeAuthState(state) {
      if (typeof window !== 'undefined') {
        state.isLoggedIn = !!localStorage.getItem('sessionToken');
      }
      },
 SET_PROFILE(state, action) {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProfile.pending, (state, action) => {
        state.status = "loading";
        state.success = null;
        state.error = null;
      })
       .addCase(createProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
        state.success = 'Profile created successfully';
      })
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
          action: PayloadAction<{
            profile: any; user: Users 
}>
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
          action: PayloadAction<{
            profile: any; user: Users 
}>
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

export const { SET_PROFILE } = profileslice.actions;
export default profileslice.reducer;
