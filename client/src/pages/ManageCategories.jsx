import CategoryForm from "../components/ManageCategories/CategoryForm";
import CategoryList from "../components/ManageCategories/CategoryList";
import "../css/pages/ManageCategories.css";

export default function ManageCategories() {
  return (
    <div className="content-container">
      <div className="left-column">
        <CategoryForm />
      </div>
      <div className="right-column">
        <CategoryList />
      </div>
    </div>
  );
}
