import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;

export const signin = async (credentials: any) => {
  const response = await axiosWithCredentials.post( `${USERS_API}/signin`, credentials );
  return response.data;
};
export const signup = async (user: any) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
    return response.data;
};
export const profile = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
    return response.data;
};  
export const updateUser = async (user: any) => {
    const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
    return response.data;
};
export const signout = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
    return response.data;
};
export const fetchAllUsers = async () => {
    const response = await axiosWithCredentials.get(`${USERS_API}`);
    return response.data;
};
export const findUserById = async (userId: string) => {
    const response = await axiosWithCredentials.get(`${USERS_API}/${userId}`);
    return response.data;
};
export const findFavorites = async () => {
    const response = await axiosWithCredentials.get(`${USERS_API}/favorites`);
    return response.data;
}
export const favorite = async (bookId: string) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/favorite/${bookId}`);
    return response.data;
}
export const unfavorite = async (bookId: string) => {
    const response = await axiosWithCredentials.delete(`${USERS_API}/favorite/${bookId}`);
    return response.data;
}
export const follow = async (followeeId: string) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/follow/${followeeId}`);
    return response.data;
}
export const unfollow = async (followeeId: string) => {
    const response = await axiosWithCredentials.delete(`${USERS_API}/follow/${followeeId}`);
    return response.data;
}
export const findFollowersForUser = async (userId: string) => {
    const response = await axiosWithCredentials.get(`${USERS_API}/${userId}/followers`);
    return response.data;
}
export const findFolloweesForUser = async (userId: string) => {
    const response = await axiosWithCredentials.get(`${USERS_API}/${userId}/followees`);
    return response.data;
}
  
  