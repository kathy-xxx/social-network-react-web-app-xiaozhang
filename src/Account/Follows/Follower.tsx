import { Container } from "react-bootstrap";
import UserList from "./UserList";

export default function Follower() {
  return (
    <Container className="my-4">
      <h3>Followers</h3>
      <UserList />
    </Container>
  );
}
