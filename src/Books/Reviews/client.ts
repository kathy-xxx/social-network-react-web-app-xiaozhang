import axios from "axios";
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const BOOKS_API = `${REMOTE_SERVER}/api/books`;
export const REVIEWS_API = `${REMOTE_SERVER}/api/reviews`;
const axiosWithCredentials = axios.create({ withCredentials: true });
export const fetchAllReviews = async () => {
    const { data } = await axiosWithCredentials.get(`${REVIEWS_API}`);
    return data;
};
export const findReviewsForBook = async (bookId: string) => {
    const { data } = await axiosWithCredentials.get(`${BOOKS_API}/${bookId}/reviews`);
    return data;
}
export const createReview = async (review: any) => {
    const { data } = await axiosWithCredentials.post(`${REVIEWS_API}`, review);
    return data;
};
export const deleteReview = async (reviewId: string) => {
    const { data } = await axiosWithCredentials.delete(`${REVIEWS_API}/${reviewId}`);
    return data;
}
export const updateReview = async (review: any) => {
    const { data } = await axiosWithCredentials.put(`${REVIEWS_API}/${review._id}`, review);
    return data;
}
export const findReviewsForUser = async (userId: string) => {
    const { data } = await axiosWithCredentials.get(`${REVIEWS_API}/users/${userId}`);
    return data;
}
export const findWriterForReview = async (reviewId: string) => {
    const { data } = await axiosWithCredentials.get(`${REVIEWS_API}/${reviewId}/writer`);
    return data;
}