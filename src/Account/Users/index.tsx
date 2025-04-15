import { Container, Form, Row, Col } from "react-bootstrap";
import UserList from "./UserList";
import { useEffect, useState } from "react";
import * as userClient from "../client";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState<string>("");
  const [name, setName] = useState<string>("");

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await userClient.fetchAllUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filterUsersByRole = async (role: string) => {
    setRole(role);
    if (role) {
      const filtered = await userClient.findUsersByRole(role);
      setUsers(filtered);
    } else {
      fetchUsers();
    }
  };

  const filterUsersByName = async (name: string) => {
    setName(name);
    if (name) {
      const filtered = await userClient.findUsersByPartialName(name);
      setUsers(filtered);
    } else {
      fetchUsers();
    }
  };

  return (
    <Container className="my-4">
      <h3>Users</h3>
      {/* Filters Row */}
      <Row className="mb-4">
        <Col xs={12} md={4}>
          <Form.Control
            type="text"
            placeholder="Search people"
            value={name}
            onChange={(e) => filterUsersByName(e.target.value)}
            className="mb-2 mb-md-0"
          />
        </Col>
        <Col xs={12} md={4}>
          <Form.Select
            value={role}
            onChange={(e) => filterUsersByRole(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="USER">Readers</option>
            <option value="AUTHOR">Authors</option>
            <option value="ADMIN">Administrators</option>
          </Form.Select>
        </Col>
      </Row>
      <UserList users={users} />
    </Container>
  );
}
