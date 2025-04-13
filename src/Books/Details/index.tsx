import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Reviews from "../Reviews";
import { useState } from "react";
import { addReview, deleteReview, updateReview } from "../Reviews/reducer";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, deleteFavorite } from "../../Account/Favorites/reducer";
import { updateBook } from "../reducer";

export default function Details() {
  const dispatch = useDispatch();
  const { bid } = useParams<{ bid: string }>();
  const { reviews } = useSelector((state: any) => state.reviewsReducer);
  const { books } = useSelector((state: any) => state.booksReducer);
  const { users } = useSelector((state: any) => state.usersReducer);
  const { favorites } = useSelector((state: any) => state.favoritesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  // Use the new book data and find the specific book by its _id
  const book = books.find((b: any) => b._id === bid);
  // Filter reviews for this specific book
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
  // If no book is found, show a message
  if (!book) {
    return <div>Book not found</div>;
  }
  // Find the author for the book using db.users by matching author_id
  const author = users.find((u: any) => u._id === book.author_id);
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
  const lockReviews = () => {
    if (!isAuthor) return false;
    dispatch(updateBook({ ...book, reviews_locked: "true" }));
  };
  const unlockReviews = () => {
    if (!isAuthor) return false;
    dispatch(updateBook({ ...book, reviews_locked: "false" }));
  };
  const isFavorite = () => {
    if (!currentUser) return false;
    return favorites.some(
      (f: any) => f.book_id === bid && f.user_id === currentUser._id
    );
  };
  const favorite = () => {
    if (!currentUser) return false;
    dispatch(addFavorite({ book_id: bid, user_id: currentUser._id }));
  };
  const favoriteObj = currentUser
    ? favorites.find(
        (f: any) => f.book_id === bid && f.user_id === currentUser._id
      )
    : null;
  const favoriteId = favoriteObj ? favoriteObj._id : null;
  const unfavorite = () => {
    if (favoriteId) {
      dispatch(deleteFavorite(favoriteId));
    }
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
            <strong>Publication Date:</strong> {book.publication_date}
          </p>
          <div className="mt-3">
            {currentUser &&
              (isFavorite() ? (
                <Button variant="danger" onClick={unfavorite}>
                  Unfavorite
                </Button>
              ) : (
                <Button onClick={favorite}>Favorite</Button>
              ))}
          </div>
          <div className="mt-3">
            {isAuthor() &&
              (reviewsLocked() ? (
                <Button onClick={unlockReviews}>Unlock Reviews</Button>
              ) : (
                <Button onClick={lockReviews}>Lock Reviews</Button>
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
              reviews={reviews.filter((r: any) => r.book_id === bid)}
              review={review}
              setReview={setReview}
              addNewReview={() => {
                dispatch(addReview(review));
              }}
              deleteReview={(reviewId: string) => {
                dispatch(deleteReview(reviewId));
              }}
              updateReview={() => {
                dispatch(updateReview(review));
              }}
            />
          )}
          {reviewsLocked() && <p>Reviews locked by author.</p>}
        </Col>
      </Row>
    </Container>
  );
}
