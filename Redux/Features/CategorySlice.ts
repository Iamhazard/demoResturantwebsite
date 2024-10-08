import { CategoryPageProps, CategoryState } from "@/@types/enum";
import { CategorySchema } from "@/Schema";
import { db } from "@/backend/src/lib/db";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../store";

interface SessionState {
  sessionToken: string | null;
}

interface Category{
  id:string;
  name:string,
}


const initialSessionState: SessionState = {
  sessionToken: null,
};

export const setSessionToken = (sessionToken: string | null) => {
  return { type: 'session/setSessionToken', payload: sessionToken };
};


export const fetchSessionToken = createAsyncThunk(
  'session/fetchSessionToken',
  async () => {
  
    const sessionToken = await db.session;
    return sessionToken;
  }
);

const initialState: CategoryPageProps = {
  category: null,
  status: 'idle',
  error: null,
  success: null,
};

export const BACKEND_URL = "http://localhost:8080";

export const createCategory = createAsyncThunk(
  'category/create',
  async (payload: { category: string,userId:string |undefined }, thunkAPI) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/category`, payload)
      
      const category = response.data.category;  // Ensure this is correctly spelled
      CategorySchema.parse(category);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const editCategory = createAsyncThunk<
  Category[], // Return type
  { userId: string; categoryName: string,category:string }, // Argument type
  { state: RootState } // ThunkAPI configuration
>(
  'category/editCategory',
  async ({ userId, categoryName }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const sessionToken = state.auth.sessionToken;

      const response = await axios.patch(`${BACKEND_URL}/category/editcategory`, { userId, categoryName }, {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });

      const categories: Category[] = response.data;
      return categories;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);



export const viewCategories = createAsyncThunk < [] ,void ,{state:RootState}>(
  '/category/getall',
  async (_, thunkAPI) => {
    try {
       const state = thunkAPI.getState();
    const sessionToken = state.auth.sessionToken;
      const response = await axios.get(`${BACKEND_URL}/category/getall`,{
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });
      const categories = response.data;
      //console.log("categoreies",categories)
      return categories;

    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteCategory  = createAsyncThunk <[] ,string  ,{state:RootState}>(
  '/category/:id',
  async (id:string, thunkAPI) => {
    try {
       const state = thunkAPI.getState();
    const sessionToken = state.auth.sessionToken;
      const response = await axios.delete(`${BACKEND_URL}/category/${id}`,{
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });
      const categories = response.data;
      //console.log("categoreies",categories)
      return categories;

    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);



const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.status = 'loading';
        state.success = null;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.category = action.payload.category;
        state.success = "Category created successfully";
      })
      .addCase(createCategory.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(editCategory.pending, (state) => {
        state.status = 'loading';
        state.success = null;
        state.error = null;
      })
      .addCase(editCategory.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.category = action.payload;
        state.success = "Category edited successfully";
      })
      .addCase(editCategory.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(viewCategories.pending, (state) => {
        state.status = 'loading';
        state.success = null;
        state.error = null;
      })
      .addCase(viewCategories.fulfilled, (state, action:PayloadAction<any>) => {
        state.status = 'succeeded';
        state.category = action.payload;
        state.success = "Categories fetched successfully";
      })
      .addCase(viewCategories.rejected, (state, action: PayloadAction<any>) => {
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
export const selectCategory = (state:RootState) => state.category;

export default categorySlice.reducer;


