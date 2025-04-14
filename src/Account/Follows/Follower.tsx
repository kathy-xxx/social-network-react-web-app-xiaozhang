import { Container } from "react-bootstrap";
import UserList from "../Users/UserList";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as userClient from "../client";

export default function Follower() {
  const { uid } = useParams<{ uid: string }>();
  const [followers, setFollowers] = useState<any[]>([]);
  const fetchFollowers = async () => {
    if (!uid) return;
    try {
      const followers = await userClient.findFollowersForUser(uid);
      setFollowers(followers);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchFollowers();
  }, [uid]);
  
  return (
    <Container className="my-4">
      <h3>Followers</h3>
      <UserList users={followers} />
    </Container>
  );
}
