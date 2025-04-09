import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function UserList() {
  return (
    <ListGroup>
      <ListGroup.Item action as={Link} to="/profile/123">
        User 1
      </ListGroup.Item>
      <ListGroup.Item action as={Link} to="/profile/456">
        User 2
      </ListGroup.Item>
    </ListGroup>
  );
}
