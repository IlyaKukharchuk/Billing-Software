import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "../../css/components/CategoryList.css";

export default function CategoryList() {
  const { categories } = useContext(AppContext);
  return (
    <div className="list-container">
      <h1>Category list</h1>
      <div className="search-bar">search bar</div>
      <div className="list-content">
        List of categories
        {categories.map((category, index) => (
          <div
            className="list-item"
            key={index}
            style={{ backgroundColor: category.bgColor }}
          >
            <div className="item-image">
              {/* <img src={category.imgUrl} alt={category.name} /> */}
              <img
                src="https://dummyimage.com/48x48/f2f531/000000.png"
                alt="category image"
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
