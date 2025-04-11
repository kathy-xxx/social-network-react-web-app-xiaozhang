import { Container } from "react-bootstrap";
import UserList from "../Users/UserList";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Following() {
  const { uid } = useParams<{ uid: string }>();
  const { users } = useSelector((state: any) => state.usersReducer);
  const { follows } = useSelector((state: any) => state.followsReducer);
  const followeeIDs = follows
    .filter((follow: any) => follow.follower_id === uid)
    .map((follow: any) => follow.followee_id);

  const followees = users.filter((user: any) => followeeIDs.includes(user._id));

  return (
    <Container className="my-4">
      <h3>Following</h3>
      <UserList users={followees} />
    </Container>
  );
}
