import axios from "axios";
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const FOLLOWS_API = `${REMOTE_SERVER}/api/follows`;
const axiosWithCredentials = axios.create({ withCredentials: true });
export const fetchAllFollows = async () => {
    const { data } = await axiosWithCredentials.get(`${FOLLOWS_API}`);
    return data;
};