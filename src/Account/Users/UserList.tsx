import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function UserList({ users }: { users: any[] }) {
  return (
    <ListGroup>
      {users.map((user) => (
        <ListGroup.Item action as={Link} to={`/profile/${user._id}`}>
          {user.username}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
