import UsersForm from "../css/components/ManageUsers/UsersForm";
import UsersList from "../css/components/ManageUsers/UsersList";
import "../css/pages/ManageUsers.css";

export default function ManageUsers() {
  return (
    <div className="users-container">
      <div className="left-column">
        <UsersForm />
      </div>
      <div className="right-column">
        <UsersList />
      </div>
    </div>
  );
}
