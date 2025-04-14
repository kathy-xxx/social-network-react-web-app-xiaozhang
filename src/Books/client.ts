import axios from "axios";
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const BOOKS_API = `${REMOTE_SERVER}/api/books`;
const axiosWithCredentials = axios.create({ withCredentials: true });
export const fetchAllBooks = async () => {
    const { data } = await axiosWithCredentials.get(`${BOOKS_API}`);
    return data;
};
export const createBook = async (book: any) => {
    const { data } = await axiosWithCredentials.post(`${BOOKS_API}`, book);
    return data;
};
export const deleteBook = async (bookId: string) => {
    const { data } = await axiosWithCredentials.delete(`${BOOKS_API}/${bookId}`);
    return data;
}