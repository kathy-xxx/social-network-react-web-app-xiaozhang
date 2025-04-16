import axios from "axios";
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const BOOKS_API = `${REMOTE_SERVER}/api/books`;
export const GOOGLE_BOOKS_API = `https://www.googleapis.com/books/v1/volumes`;
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
export async function searchGoogleBooks(query: string) {
    const { data } = await axios.get(GOOGLE_BOOKS_API, {
      params: { q: query, maxResults: 12 },
    });
    if (!data.items) return [];
    return data.items.map((item: any) => ({
      id:          item.id,
      title:       item.volumeInfo.title,
      authors:     item.volumeInfo.authors?.join(", "),
      summary:     item.volumeInfo.description?.slice(0, 120) + "...",
      thumbnail:   item.volumeInfo.imageLinks?.thumbnail,
      published:   item.volumeInfo.publishedDate,
      infoLink:    item.volumeInfo.infoLink,
    }));
}