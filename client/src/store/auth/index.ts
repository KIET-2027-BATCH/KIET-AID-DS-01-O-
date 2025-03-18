import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

interface AuthState {
  user: any;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: Cookies.get('token') || null,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: { user_name: string; email: string; password: string; re_password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/auth/users/', userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/auth/jwt/create/', userData);
      const token = response.data.access;
      const userResponse = await axios.get('http://127.0.0.1:8000/api/v1/auth/users/me/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { token, user: userResponse.data };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      Cookies.remove('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        Cookies.set('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
