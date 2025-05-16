import ItemsForm from "../css/components/ManageItems/ItemsForm";
import ItemsList from "../css/components/ManageItems/ItemsList";

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
