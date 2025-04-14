import { Container } from "react-bootstrap";
import UserList from "../Users/UserList";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as userClient from "../client";

export default function Following() {
  const { uid } = useParams<{ uid: string }>();
  const [followees, setFollowees] = useState<any[]>([]);
    const fetchFollowees = async () => {
      if (!uid) return;
      try {
        const followees = await userClient.findFolloweesForUser(uid);
        setFollowees(followees);
      } catch (error) {
        console.error(error);
      }
    };
    useEffect(() => {
      fetchFollowees();
    }, [uid]);

  return (
    <Container className="my-4">
      <h3>Following</h3>
      <UserList users={followees} />
    </Container>
  );
}
