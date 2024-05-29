import { CategoryState } from "@/@types/enum";
import { CategorySchema } from "@/Schema";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { string } from "zod";

const initialState: CategoryState = {
  category: null,
  userId:"",
  status: 'idle',
  error: null,
  success: null,
};

export const BACKEND_URL = "http://localhost:8080";

export const createCategory = createAsyncThunk(
  'category/create',
  async (payload: { category: string,userId:string |undefined }, thunkAPI) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/category`, payload);
      const category = response.data.category;  // Ensure this is correctly spelled
      CategorySchema.parse(category);

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

export const viewCategories = createAsyncThunk(
  '/allcategory',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/allcategory`);
      const categories = response.data;
      console.log("categoreies",categories)
      return categories;

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
      .addCase(editCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.category = action.payload.category;
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
      .addCase(viewCategories.fulfilled, (state, action) => {
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

export default categorySlice.reducer;
