import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import "../../css/components/CategoryList.css";
import { deleteCategory } from "../../Service/CategoryService";
import deleteIcon from "../../assets/delete-cross.svg";
import toast from "react-hot-toast";

export default function CategoryList() {
  const { categories, setCategories } = useContext(AppContext);
  const [searchData, setSearchData] = useState("");

  const filterCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchData.toLowerCase())
  );
  const deleteByCategoryId = async (categoryId) => {
    try {
      const response = await deleteCategory(categoryId);
      if (response.status === 204) {
        const updatedCategories = categories.filter(
          (category) => category.categoryId !== categoryId
        );
        setCategories([...updatedCategories]);
        toast.success("Category deleted");
      } else {
        toast.error("Unable to delete category");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete category");
    }
  };

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
            key={category.categoryId}
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
              <button
                style={{ backgroundColor: category.bgColor }}
                className="delete-btn"
                onClick={() => deleteByCategoryId(category.categoryId)}
              >
                <img src={deleteIcon} alt="delete icon" />
              </button>
            </div>

            <p>{category.bgcolor}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
