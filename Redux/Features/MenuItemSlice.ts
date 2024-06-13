import { CategoryPageProps, CategoryState, MenuitemsProps } from "@/@types/enum";
import { CategorySchema } from "@/Schema";
import { db } from "@/backend/src/lib/db";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface SessionState {
  sessionToken: string | null;
}

// Add an initial state for the session
const initialSessionState: SessionState = {
  sessionToken: null,
};

// Add a Redux action to set the session token
export const setSessionToken = (sessionToken: string | null) => {
  return { type: 'session/setSessionToken', payload: sessionToken };
};

// Create a thunk to fetch the session token from the server
export const fetchSessionToken = createAsyncThunk(
  'session/fetchSessionToken',
  async () => {
    // Implement your logic to fetch the session token from the server
    const sessionToken = await db.session;
    return sessionToken;
  }
);

const initialState: CategoryPageProps = {
  category: [],
  status: 'idle',
  error: null,
  success: null,
};

export const BACKEND_URL = "http://localhost:8080";

export const createMenu= createAsyncThunk(
  'menu-items/new',
  async (payload: { formDataObject:MenuitemsProps }, thunkAPI) => {
    try {
      console.log("formdata  from menUslice", payload)
      const response = await axios.post(`${BACKEND_URL}/menu-items/new`, payload);
      const category = response.data.category; 
      CategorySchema.parse(category)
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);



export const editCategory = createAsyncThunk(
  'category/edit',
  async (payload: { id: string, name: string }, thunkAPI) => {
    try {
      const response = await axios.patch(`${BACKEND_URL}/editcategory/${payload.id}`, { name: payload.name });
      const category = response.data.category;
      CategorySchema.parse(category);
      
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const viewMenuItems = createAsyncThunk < [] ,void ,{state:RootState}>(
  '/menu-items/view',
  async (_, thunkAPI) => {
    try {
       const state = thunkAPI.getState();
    const sessionToken = state.auth.sessionToken;
      const response = await axios.get(`${BACKEND_URL}/menu-items/view`,{
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });
      const menus = response.data;
      console.log("categoreies",menus)
      return menus;

    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//menuitems byid

export const menuItemsByid = createAsyncThunk < [] ,string ,{state:RootState}>(
  '/menu-items/id',
  async (id: string, thunkAPI) => {
    try {
       const state = thunkAPI.getState();
        console.log(id,"slice")
    const sessionToken = state.auth.sessionToken;
      const response = await axios.get(`${BACKEND_URL}/menu-items/${id}`,{
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });
      const menus = response.data;
      console.log("categoreies",menus)
      return menus;

    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);



export const deleteCategory = createAsyncThunk(
  'category/delete',
  async (id: string, thunkAPI) => {
    try {
      await axios.delete(`${BACKEND_URL}/category/${id}`);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const menuItemSlice= createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMenu.pending, (state) => {
        state.status = 'loading';
        state.success = null;
        state.error = null;
      })
      .addCase(createMenu.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.category = action.payload.category;
        state.success = "Category created successfully";
      })
      .addCase(createMenu.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(editCategory.pending, (state) => {
        state.status = 'loading';
        state.success = null;
        state.error = null;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.category = action.payload.category;
        state.success = "Category edited successfully";
      })
      .addCase(editCategory.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(viewMenuItems.pending, (state) => {
        state.status = 'loading';
        state.success = null;
        state.error = null;
      })
      .addCase(viewMenuItems.fulfilled, (state, action:PayloadAction<any>) => {
        state.status = 'succeeded';
        state.category = action.payload;
        state.success = "Categories fetched successfully";
      })
      .addCase(viewMenuItems.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.status = 'loading';
        state.success = null;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.category = state?.category;
        state.success = "Category deleted successfully";
      })
      .addCase(deleteCategory.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default menuItemSlice.reducer;


