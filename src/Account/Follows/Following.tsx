import { Container } from "react-bootstrap";
import UserList from "./UserList";

export default function Following() {
  return (
    <Container className="my-4">
      <h3>Following</h3>
      <UserList />
    </Container>
  );
}
