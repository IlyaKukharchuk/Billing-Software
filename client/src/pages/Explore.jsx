import { useContext } from "react";
import "../css/pages/Explore.css";
import { AppContext } from "../context/AppContext";

export default function Explore() {
  const { categories } = useContext(AppContext);
  console.log(categories);
  return (
    <div className="content-container explore">
      <div className="left-column explore">
        <div className="categories-row">
          categories...categories...categories...categories...categories...categories...categories...categories...categories...categories...categories...categories...categories...categories...
        </div>

        <div className="items-row">
          <hr />
          items...
        </div>
      </div>
      <div className="right-column explore">
        <div className="customer-form-container">form</div>

        <div className="cart-items">
          <hr />
          cart items
        </div>

        <div className="cart-calculations">
          <hr className="bold-hr" />
          cart calculations
        </div>
      </div>
    </div>
  );
}
