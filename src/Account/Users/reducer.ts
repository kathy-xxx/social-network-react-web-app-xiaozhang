import { createSlice } from "@reduxjs/toolkit";
import { users } from "../../Database";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  users: users,
};
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, { payload: user }) => {
      const newUser: any = {
        _id: uuidv4(),
        username: user.username,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        bio: user.bio,
        role: user.role,
      };
      state.users = [...state.users, newUser] as any;
    },
    deleteUser: (state, { payload: userId }) => {
      state.users = state.users.filter((u: any) => u._id !== userId);
    },
    updateUser: (state, { payload: user }) => {
      state.users = state.users.map((u: any) =>
        u._id === user._id ? user : u
      ) as any;
    },
  },
});
export const { addUser, deleteUser, updateUser } = usersSlice.actions;
export default usersSlice.reducer;
