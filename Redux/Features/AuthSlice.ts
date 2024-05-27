import { AuthState } from "@/@types/enum";
import { LoginSchema, RegisterSchema } from "@/Schema";
import { User } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { RootState } from "../store";

const loadStateFromLocalStorage = (): AuthState | undefined => {
    if (typeof window === 'undefined') {
    return undefined; 
  }

    const authStateJSON = localStorage.getItem('authState');
    if (authStateJSON) {
        return JSON.parse(authStateJSON);
    }
    return undefined;
};

const initialState: AuthState = loadStateFromLocalStorage() || {
    user: null,
    status: 'idle',
    sessionToken:null,
    error: null,
    isAdmin: false,
    isLoggedIn: false,
    success: null,

}
export const BACKEND_URL = "http://localhost:8080"
const API_URL = `${BACKEND_URL}/auth`;

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; hashedPassword: string }, thunkAPI) => {
        try {
            const response = await axios.post(`${API_URL}/login`, credentials);
            const user = response.data.user;
            LoginSchema.parse(user)
            localStorage.setItem('sessionToken', response.data.sessionToken);
            console.log("authslice", response.data.sessionToken)
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (credentials: { email: string; hashedPassword: string, lastName: string, name: string }, thunkAPI) => {
        try {
            const response = await axios.post(`${API_URL}/register`, credentials);
            const user = response.data.user;
            RegisterSchema.parse(user)

            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const fetchCurrentUser = createAsyncThunk(
    '/fetchCurrentUser',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${API_URL}/current_user`);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
const saveStateToLocalStorage = (state: AuthState) => {
    localStorage.setItem('authState', JSON.stringify(state));
};

const authslice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        initializeAuthState(state) {
      if (typeof window !== 'undefined') {
        state.sessionToken = localStorage.getItem('sessionToken');
        state.isLoggedIn = !!localStorage.getItem('sessionToken');
      }
    },
        set_login(state, action) {
            state.isLoggedIn = action.payload;
            saveStateToLocalStorage(state)

        },
        set_user(state, action) {
            state.user = action.payload.user;
            state.success = 'Completed'
            state.sessionToken = action.payload.sessionToken;
            state.isLoggedIn = true
            saveStateToLocalStorage(state);

        },
        is_admin(state, action) {
            state.isAdmin = action.payload;
            saveStateToLocalStorage(state);

        },
        logout: (state) => {
            state.user = null;
            state.isAdmin = false;
            state.isLoggedIn = false;
            state.success = null;
            localStorage.removeItem('sessionToken');
            localStorage.removeItem('authState')

        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.status = 'loading';
            state.success = null;
            state.error = null;
        })
            .addCase(login.fulfilled, (state, action: PayloadAction<{
                sessionToken: string | null; user: User
            }>) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.isLoggedIn = true;
                state.sessionToken = action.payload.sessionToken;
                state.isAdmin = action.payload.user.role === 'ADMIN';
                state.success = "Login successfull"
                saveStateToLocalStorage(state);
            })
            .addCase(login.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.success = null
            })
            .addCase(register.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
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
                state.success = "null"
            })

            .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.isLoggedIn = true;
                state.isAdmin = action.payload.user.role === 'ADMIN';
                state.success = "Data Fetched"
            })
            .addCase(fetchCurrentUser.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },

})

export const { logout } = authslice.actions;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsAdmin = (state: RootState) => state.auth.isAdmin;
export default authslice.reducer;