import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Reviews from "../Reviews";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReviews } from "../Reviews/reducer";
import * as reviewClient from "../Reviews/client";
import * as bookClient from "../client";
import * as userClient from "../../Account/client";
import * as favoriteClient from "../../Account/Favorites/client";

export default function Details() {
  const { bid } = useParams<{ bid: string }>();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  // Use the new book data and find the specific book by its _id
  const [book, setBook] = useState<any>();
  const fetchBook = async () => {
    if (!bid) return;
    try {
      const book = await bookClient.findBookById(bid);
      setBook(book);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchBook();
  }, []);
  const [favorites, setFavorites] = useState<any[]>([]);
  const fetchFavorites = async () => {
    try {
      const favorites = await favoriteClient.fetchAllFavorites();
      setFavorites(favorites);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchFavorites();
  }, []);
  const { reviews } = useSelector((state: any) => state.reviewsReducer);
  const dispatch = useDispatch();
  const defaultReview = {
    _id: "0",
    rating: "5",
    title: "New Title",
    content: "New Content",
    review_date: "1900-01-01",
    book_id: bid,
    user_id: currentUser ? currentUser._id : "123",
  };
  const [review, setReview] = useState<any>(defaultReview);
  const fetchReviews = async () => {
    try {
      const reviews = await reviewClient.findReviewsForBook(book._id);
      dispatch(setReviews(reviews));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (book) {
      fetchReviews();
    }
  }, [book]);
  const addReview = async () => {
    const newReview = await reviewClient.createReview(review);
    dispatch(setReviews([...reviews, newReview]));
  };
  const deleteReview = async (reviewId: string) => {
    await reviewClient.deleteReview(reviewId);
    dispatch(
      setReviews(reviews.filter((review: any) => review._id !== reviewId))
    );
  };
  const updateReview = async () => {
    await reviewClient.updateReview(review);
    dispatch(
      setReviews(
        reviews.map((r) => {
          if (r._id === review._id) {
            return review;
          } else {
            return r;
          }
        })
      )
    );
    setReview(defaultReview);
  };
  const [author, setAuthor] = useState<any>();
  const fetchAuthor = async () => {
    try {
      const author = await bookClient.findAuthorForBook(book._id);
      setAuthor(author);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (book) {
      fetchAuthor();
    }
  }, [book]);
  // Construct the full name of the author; fallback to "Unknown Author" if not found
  const authorName = author
    ? `${author.firstName} ${author.lastName}`
    : "Unknown Author";
  if (!book) {
    return <div>Book not found</div>;
  }
  const isAuthor = () => {
    if (!currentUser) return;
    return currentUser.role === "AUTHOR" && book.author_id === currentUser._id;
  };
  const reviewsLocked = () => book.reviews_locked === "true";
  const lockReviews = async () => {
    if (!isAuthor) return false;
    await bookClient.updateBook({ ...book, reviews_locked: "true" });
    fetchBook();
  };
  const unlockReviews = async () => {
    if (!isAuthor) return false;
    await bookClient.updateBook({ ...book, reviews_locked: "false" });
    fetchBook();
  };
  const isFavorite = () => {
    if (!currentUser) return false;
    return favorites.some(
      (f: any) => f.book_id === bid && f.user_id === currentUser._id
    );
  };
  const favorite = async () => {
    if (!currentUser) return false;
    const newFavorite = await userClient.favorite(book._id);
    setFavorites([...favorites, newFavorite]);
  };
  const unfavorite = async () => {
    await userClient.unfavorite(book._id);
    setFavorites(
      favorites.filter((favorite: any) => favorite.book_id !== book._id)
    );
  };

  return (
    <Container id="wd-book-detail" className="my-4">
      {/* Book details header */}
      <Row className="mb-4">
        {/* Left Column: Book Cover */}
        <Col md={4}>
          <Image src={book.cover_image_url} alt={book.title} fluid />
        </Col>
        {/* Right Column: Book Info */}
        <Col md={8}>
          <h1>{book.title}</h1>
          <p>{book.summary}</p>
          <p>
            <Link to={`/profile/${book.author_id}`} className="wd-book-author">
              <strong>{authorName}</strong>
            </Link>
          </p>
          <p>
            <strong>Average Rating:</strong> {book.average_rating}
          </p>
          <p>
            <strong>Publication Date:</strong>
            {new Date(book.publication_date).toISOString().split("T")[0]}
          </p>
          <div className="mt-3">
            {currentUser &&
              (isFavorite() ? (
                <Button variant="outline-danger" onClick={unfavorite}>
                  Unfavorite
                </Button>
              ) : (
                <Button variant="outline-primary" onClick={favorite}>
                  Favorite
                </Button>
              ))}
          </div>
          <div className="mt-3">
            {isAuthor() &&
              (reviewsLocked() ? (
                <Button variant="outline-dark" onClick={unlockReviews}>
                  Unlock Reviews
                </Button>
              ) : (
                <Button variant="outline-danger" onClick={lockReviews}>
                  Lock Reviews
                </Button>
              ))}
          </div>
        </Col>
      </Row>
      {/* Reviews Section */}
      <Row>
        <Col>
          <h2>Reviews</h2>
          {/* Pass the reviews for this book as a prop */}
          {!reviewsLocked() && (
            <Reviews
              reviews={reviews}
              review={review}
              setReview={setReview}
              addNewReview={addReview}
              deleteReview={(reviewId: string) => {
                deleteReview(reviewId);
              }}
              updateReview={updateReview}
            />
          )}
          {reviewsLocked() && <p>Reviews locked by author.</p>}
        </Col>
      </Row>
    </Container>
  );
}
