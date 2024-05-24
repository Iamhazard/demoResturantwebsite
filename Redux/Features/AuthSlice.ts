import { AuthState, Users } from "@/@types/enum";
import { LoginSchema, RegisterSchema } from "@/Schema";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const initialState:AuthState={
        user:null,
        status:'idle',
        error:null,
        isAdmin:false,
        isLoggedIn:false,
         success: null,
    
    }


    export const BACKEND_URL = "http://localhost:8080"
const API_URL = `${BACKEND_URL}/auth`;

    export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; hashedPassword: string }, thunkAPI) => {
        try {
            const response = await axios.post(`${API_URL}/login`, credentials);
            const user=response.data.user;
            LoginSchema.parse(user)
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (credentials: { email: string; hashedPassword: string,lastName:string,name:string}, thunkAPI) => {
        try {
            const response = await axios.post(`${API_URL}/register`, credentials);
            const user=response.data.user;
            RegisterSchema.parse(user)
            
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const fetchCurrentUser = createAsyncThunk(
    'auth/fetchCurrentUser',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${API_URL}/current_user`);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
const authslice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout:(state)=>{
            state.user=null;
            state.isAdmin=false;
            state.isLoggedIn=false;
            state.success = null;

        }
    },
    extraReducers:(builder)=>{
        builder.addCase(login.pending,(state,action)=>{
            state.status='loading';
            state.success = null;
             state.error = null;
        })
         .addCase(login.fulfilled, (state, action: PayloadAction<{ user: Users }>) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.isLoggedIn = true;
                state.isAdmin = action.payload.user.role === 'ADMIN';
                state.success="Login successfull"
            })
            .addCase(login.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.status = 'loading';
                 state.error = null;
                 state.success=null
            })
            .addCase(register.fulfilled, (state, action: PayloadAction<{ user: Users }>) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.isLoggedIn = true;
                state.isAdmin = action.payload.user.role === 'ADMIN';
                state.success = 'Registration successful!';
            })
            .addCase(register.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed';
                state.error = action.payload;
                state.success = null;
            })
            .addCase(fetchCurrentUser.pending, (state) => {
                state.status = 'loading';
                state.success="null"
            })
            
            .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<{ user: Users }>) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.isLoggedIn = true;
                state.isAdmin = action.payload.user.role === 'ADMIN';
                state.success="Data Fetched"
            })
            .addCase(fetchCurrentUser.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
    
})

export const {logout}=authslice.actions;
export default authslice.reducer;