import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import * as client from "../client";
import { Button, Form } from "react-bootstrap";

export default function UserDetails() {
  const { uid } = useParams();
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const [role, setRole] = useState<string>("");
  const [editing, setEditing] = useState(false);

  const saveUser = async () => {
    const updatedUser = { ...user, role: role || user.role };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    navigate(-1);
  };

  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
  };

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);

  if (!uid) return null;

  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    navigate(-1);
  };

  return (
    <div
      className="wd-people-details position-fixed bg-white shadow p-4"
      style={{
        top: "10%",
        right: "0",
        width: "300px",
        height: "80%",
        zIndex: 1050,
        overflowY: "auto",
      }}
    >
      <div className="d-flex justify-content-end mb-2">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-link text-danger p-0"
          style={{ fontSize: "1.5rem" }}
        >
          <IoCloseSharp />
        </button>
      </div>
      <div className="wd-name fw-bold fs-4 mb-3">
        {user.firstName} {user.lastName}
      </div>
      <b>Role:</b>{" "}
      {!editing ? (
        <span className="wd-roles">{user.role}</span>
      ) : (
        <Form.Select
          value={role || user.role}
          onChange={(e) => setRole(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              saveUser();
            }
          }}
        >
          <option value="USER">USER</option>
          <option value="AUTHOR">AUTHOR</option>
          <option value="ADMIN">ADMIN</option>
        </Form.Select>
      )}
      <br />
      <hr />
      <div className="d-flex justify-content-between">
        <Button
          onClick={() => deleteUser(uid)}
          variant="outline-danger"
          className="wd-delete"
        >
          Delete
        </Button>
        {!editing && (
          <Button
            variant="outline-secondary"
            onClick={() => {
              setRole(user.role);
              setEditing(true);
            }}
          >
            Edit
          </Button>
        )}
        {editing && (
          <Button variant="outline-primary" onClick={saveUser}>
            Save
          </Button>
        )}
      </div>
    </div>
  );
}
