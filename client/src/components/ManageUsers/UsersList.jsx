import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import deleteIcon from "../../assets/delete-cross.svg";
import "../../css/components/CategoryList.css";
import toast from "react-hot-toast";
import { deleteUser } from "../../Service/UserService";
import { assets } from "../../assets/assets";

export default function UsersList() {
  const { users, setUsers } = useContext(AppContext);
  const [searchData, setSearchData] = useState("");

  console.log(users);

  const filterUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchData.toLowerCase())
  );

  const deleteByUserId = async (userId) => {
    try {
      const response = await deleteUser(userId);
      if (response.status === 204) {
        const updatedUsers = users.filter((user) => user.userId !== userId);
        setUsers([...updatedUsers]);
        toast.success("Item deleted");
      } else {
        toast.error("Unable to delete user");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete user");
    }
  };

  return (
    <div className="list-container">
      <h1>Users list</h1>
      <div className="search-bar">
        <div className="input-group">
          <input
            type="text"
            name="keyword"
            id="keyword"
            value={searchData}
            onChange={(e) => {
              setSearchData(e.target.value);
            }}
            placeholder="Search by keyword"
          />
          <span className="input-group-text bg-warning">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>
      <div className="list-content">
        <hr />
        {filterUsers.map((user, index) => (
          <div
            className="list-item"
            key={user.userId}
            style={{ backgroundColor: "#97a8b8" }}
          >
            <div className="item-image">
              <img
                src={assets.user}
                alt={user.name}
                className="categoty-user-img"
              />
            </div>
            <div className="item-info">
              <p className="name">
                {user.name} <span className="grey-text">({user.role})</span>
              </p>
              <p>{user.email}</p>
            </div>
            <div className="item-delete">
              <button
                className="delete-btn"
                onClick={() => deleteByUserId(user.userId)}
              >
                <img src={deleteIcon} alt="delete icon" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
