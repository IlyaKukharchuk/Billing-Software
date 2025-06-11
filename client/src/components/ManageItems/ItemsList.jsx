import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import "../../css/components/CategoryList.css";
import deleteIcon from "../../assets/delete-cross.svg";
import toast from "react-hot-toast";
import { deleteItem } from "../../Service/ItemService";

export default function ItemsList() {
  const { items, setItems } = useContext(AppContext);
  const [searchData, setSearchData] = useState("");

  const filterItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchData.toLowerCase())
  );

  const deleteByItemId = async (itemId) => {
    try {
      const response = await deleteItem(itemId);
      if (response.status === 204) {
        const updatedItems = items.filter((item) => item.itemId !== itemId);
        setItems([...updatedItems]);
        toast.success("Item deleted");
      } else {
        toast.error("Unable to delete item");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete item");
    }
  };

  return (
    <div className="list-container">
      <h1>Items list</h1>
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
        {filterItems.map((item, index) => (
          <div
            className="list-item"
            key={item.itemId}
            style={{ backgroundColor: "#97a8b8" }}
          >
            <div className="item-image">
              <img
                src={item.imgUrl}
                alt={item.name}
                className="categoty-item-img"
              />
            </div>
            <div className="item-info">
              <p className="name">
                {item.name}{" "}
                <span className="grey-text">({item.categoryName})</span>
              </p>
              <p>{item.price}$</p>
            </div>
            <div className="item-delete">
              <button
                style={{ backgroundColor: item.bgColor }}
                className="delete-btn"
                onClick={() => deleteByItemId(item.itemId)}
              >
                <img src={deleteIcon} alt="delete icon" />
              </button>
            </div>

            <p>{item.bgcolor}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
