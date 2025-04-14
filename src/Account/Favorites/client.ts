import axios from "axios";
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const FAVORITES_API = `${REMOTE_SERVER}/api/favorites`;
const axiosWithCredentials = axios.create({ withCredentials: true });
export const fetchAllFavorites = async () => {
    const { data } = await axiosWithCredentials.get(`${FAVORITES_API}`);
    return data;
};