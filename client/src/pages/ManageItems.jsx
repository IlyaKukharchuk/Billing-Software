import ItemsForm from "../components/ManageItems/ItemsForm";
import ItemsList from "../components/ManageItems/ItemsList";

export default function ManageItems() {
  return (
    <div className="content-container">
      <div className="left-column">
        <ItemsForm />
      </div>
      <div className="right-column">
        <ItemsList />
      </div>
    </div>
  );
}
