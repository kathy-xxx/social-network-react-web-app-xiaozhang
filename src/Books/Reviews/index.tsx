import {
  Card,
  Form,
  FormControl,
  FormLabel,
  Button,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import * as db from "../../Database";

export default function Reviews({ reviews }: { reviews: any[] }) {
  return (
    <div id="wd-reviews">
      {/* New Review Form */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>New Review</Card.Title>
          <Form id="wd-new-review-form">
            <Form.Group className="mb-3" controlId="reviewTitle">
              <FormLabel>Title</FormLabel>
              <FormControl type="text" placeholder="Enter review title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="reviewContent">
              <FormLabel>Content</FormLabel>
              <FormControl
                as="textarea"
                placeholder="Enter review content"
                rows={3}
              />
            </Form.Group>
            <Button variant="primary">Add Review</Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Existing Reviews */}
      <ListGroup>
        {reviews.map((review) => {
          const reviewer = db.users.find((user) => user._id === review.user_id);
          const reviewerName = reviewer
            ? `${reviewer.firstName} ${reviewer.lastName}`
            : "Unknown Reviewer";
          return (
            <ListGroupItem key={review._id} className="mb-2">
              <h5>{review.title}</h5>
              <p className="mb-1">
                <Link to={`/profile/${review.user_id}`} className="wd-reviewer">
                  {reviewerName}
                </Link>
              </p>
              <p className="wd-review-content"><strong>Rating: </strong>{review.rating}</p>
              <p className="wd-review-content">{review.content}</p>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
}
