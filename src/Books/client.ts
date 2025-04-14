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
export const updateBook = async (book: any) => {
    const { data } = await axiosWithCredentials.put(`${BOOKS_API}/${book._id}`, book);
    return data;
}
export const findBookById = async (bookId: string) => {
    const { data } = await axiosWithCredentials.get(`${BOOKS_API}/${bookId}`);
    return data;
}
export const findAuthorForBook = async (bookId: string) => {
    const { data } = await axiosWithCredentials.get(`${BOOKS_API}/${bookId}/author`);
    return data;
}
export const findBooksByGenre = async (genreId: string) => {
    const { data } = await axiosWithCredentials.get(`${BOOKS_API}/genres/${genreId}`);
    return data;
}
export const findFavoriteBooksForUser = async (userId: string) => {
    const {data} = await axiosWithCredentials.get(`${BOOKS_API}/favorites/users/${userId}`);
    return data;
}