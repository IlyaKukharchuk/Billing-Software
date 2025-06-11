import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import deleteIcon from "../../assets/delete-cross.svg";
import toast from "react-hot-toast";
import { deleteItem } from "../../Service/ItemService";
import { deleteUser } from "../../Service/UserService";
import { assets } from "../../assets/assets";

export default function UsersList() {
  const { users, setUsers } = useContext(AppContext);
  const [searchData, setSearchData] = useState("");

  console.log(users);

  const filterUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchData.toLowerCase())
  );

  const deleteByItemId = async (userId) => {
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
            className="list-user"
            key={user.userId}
            style={{ backgroundColor: "#97a8b8" }}
          >
            <div className="user-image">
              <img
                src={assets.user}
                alt={user.name}
                className="categoty-user-img"
              />
            </div>
            <div className="user-info">
              <p className="name">
                {user.name}{" "}
                <span className="grey-text">({user.categoryName})</span>
              </p>
              <p>{user.price}$</p>
            </div>
            <div className="user-delete">
              <button
                style={{ backgroundColor: user.bgColor }}
                className="delete-btn"
                onClick={() => deleteByItemId(user.itemId)}
              >
                <img src={deleteIcon} alt="delete icon" />
              </button>
            </div>

            <p>{user.bgcolor}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
