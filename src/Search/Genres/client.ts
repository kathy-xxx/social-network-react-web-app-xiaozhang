import axios from "axios";
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const GENRES_API = `${REMOTE_SERVER}/api/genres`;
const axiosWithCredentials = axios.create({ withCredentials: true });
export const fetchAllGenres = async () => {
    const { data } = await axiosWithCredentials.get(`${GENRES_API}`);
    return data;
};