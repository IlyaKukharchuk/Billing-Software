import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import "../../css/components/CategoryList.css";

export default function CategoryList() {
  const { categories } = useContext(AppContext);
  const [searchData, setSearchData] = useState("");

  const filterCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchData.toLowerCase())
  );

  return (
    <div className="list-container">
      <h1>Category list</h1>
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
        {filterCategories.map((category, index) => (
          <div
            className="list-item"
            key={index}
            style={{ backgroundColor: category.bgColor }}
          >
            <div className="item-image">
              <img
                src={category.imgUrl}
                alt={category.name}
                className="categoty-item-img"
              />
            </div>
            <div className="item-info">
              <p className="name">{category.name}</p>
              <p>{category.items} items</p>
            </div>
            <div className="item-delete">
              <button style={{ backgroundColor: category.bgcolor }}>
                <img src="src\assets\delete-cross.svg" alt="delete icon" />
              </button>
            </div>

            <p>{category.bgcolor}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
