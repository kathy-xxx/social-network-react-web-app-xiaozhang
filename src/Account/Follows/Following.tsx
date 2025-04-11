import { Container } from "react-bootstrap";
import UserList from "../Users/UserList";
import { useSelector } from "react-redux";

export default function Following() {
  const { users } = useSelector((state: any) => state.usersReducer);
  return (
    <Container className="my-4">
      <h3>Following</h3>
      <UserList users={users} />
    </Container>
  );
}
