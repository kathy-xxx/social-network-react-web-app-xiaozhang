import { Container } from "react-bootstrap";
import UserList from "../Users/UserList";
import { useSelector } from "react-redux";

export default function Follower() {
  const { users } = useSelector((state: any) => state.usersReducer);
  return (
    <Container className="my-4">
      <h3>Followers</h3>
      <UserList users={users}/>
    </Container>
  );
}
