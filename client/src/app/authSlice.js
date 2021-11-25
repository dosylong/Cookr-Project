import userApi from 'api/userApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const getUserProfile = createAsyncThunk(
  'auth/userInfo',
  async (userFirebaseId) => {
    const response = await userApi.getUserProfile({
      userFirebaseId: userFirebaseId,
    });
    console.log('Profile: ', response);
    return response;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    id: '',
    fullName: '',
    email: '',
    photoURL: '',
    bio: '',
    username: '',
    isLoggedIn: false,
  },
  reducers: {
    userProfile: (state, action) => {
      const { uid, displayName, email, photoURL, isLoggedIn } = action.payload;
      state.id = uid;
      state.fullName = displayName;
      state.email = email;
      state.photoURL = photoURL;
      state.isLoggedIn = isLoggedIn;
    },
  },
  extraReducers: {
    [getUserProfile.fulfilled]: (state, action) => {
      const { username, bio } = action.payload;
      state.username = username;
      state.bio = bio;
    },
  },
});

const { reducer, actions } = authSlice;
export const { userProfile } = actions;
export default reducer;
