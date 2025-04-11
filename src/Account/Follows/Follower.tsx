import { Container } from "react-bootstrap";
import UserList from "../Users/UserList";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Follower() {
  const { uid } = useParams<{ uid: string }>();
  const { users } = useSelector((state: any) => state.usersReducer);
  const { follows } = useSelector((state: any) => state.followsReducer);
  const followerIDs = follows
    .filter((follow: any) => follow.followee_id === uid)
    .map((follow: any) => follow.follower_id);
  const followers = users.filter((user: any) => followerIDs.includes(user._id));

  return (
    <Container className="my-4">
      <h3>Followers</h3>
      <UserList users={followers} />
    </Container>
  );
}
