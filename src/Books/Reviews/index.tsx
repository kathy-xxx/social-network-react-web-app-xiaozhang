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

export default function Reviews() {
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
        <ListGroupItem className="mb-2">
          <h5>Review1 Title</h5>
          <p className="mb-1">
            <Link to="/profile/123" className="wd-reviewer">
              Reviewer: John Doe
            </Link>
          </p>
          <p className="wd-review-content">
            Review1 Content: Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.
          </p>
        </ListGroupItem>
        <ListGroupItem className="mb-2">
          <h5>Review2 Title</h5>
          <p className="mb-1">
            <Link to="/profile/456" className="wd-reviewer">
              Reviewer: Jane Smith
            </Link>
          </p>
          <p className="wd-review-content">
            Review2 Content: Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
