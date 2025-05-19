import UsersForm from "../components/ManageUsers/UsersForm";
import UsersList from "../components/ManageUsers/UsersList";
import "../css/pages/ManageUsers.css";

export default function ManageUsers() {
  return (
    <div className="content-container">
      <div className="left-column">
        <UsersForm />
      </div>
      <div className="right-column">
        <UsersList />
      </div>
    </div>
  );
}
