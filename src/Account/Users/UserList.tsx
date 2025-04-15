import { Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserDetails from "./UserDetails";

export default function UserList({ users }: { users: any[] }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const roleNames: { [key: string]: string } = {
    USER: "Reader",
    AUTHOR: "Author",
    ADMIN: "Administrator",
  };
  const isAdmin = () => {
    if (!currentUser) return false;
    return currentUser.role === "ADMIN";
  };

  return (
    <div>
      {currentUser && isAdmin() && <UserDetails />}
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            {currentUser && isAdmin() && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <Link to={`/profile/${user._id}`}>{user.username}</Link>
              </td>
              <td>{roleNames[user.role] || user.role}</td>
              {currentUser && isAdmin() && (
                <td>
                  <Link to={`/users/${user._id}`}>
                    <Button variant="outline-secondary">Show Details</Button>
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
