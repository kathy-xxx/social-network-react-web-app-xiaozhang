import { createSlice } from "@reduxjs/toolkit";
import { follows } from "../../Database";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  follows: follows,
};
const followsSlice = createSlice({
  name: "follows",
  initialState,
  reducers: {
    addFollow: (state, { payload: follow }) => {
      const newFollow: any = {
        _id: uuidv4(),
        followee_id: follow.followee_id,
        follower_id: follow.follower_id,
      };
      state.follows = [...state.follows, newFollow] as any;
    },
    deleteFollow: (state, { payload: followId }) => {
      state.follows = state.follows.filter((f: any) => f._id !== followId);
    },
  },
});
export const { addFollow, deleteFollow } = followsSlice.actions;
export default followsSlice.reducer;
