import { useContext, useState } from "react";
import "../css/pages/Explore.css";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { deleteItem } from "../service/ItemService";

export default function Explore() {
  const { categories, items } = useContext(AppContext);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  // Фильтруем товары по выбранным категориям и поисковому запросу
  const filteredItems = (
    selectedCategoryIds.length > 0
      ? items.filter((item) => selectedCategoryIds.includes(item.categoryId))
      : items
  ).filter((item) =>
    item.name.toLowerCase().includes(searchData.toLowerCase())
  );

  const toggleCategorySelection = (categoryId) => {
    if (categoryId === "all") {
      setSelectedCategoryIds([]);
    } else {
      setSelectedCategoryIds((prev) =>
        prev.includes(categoryId)
          ? prev.filter((id) => id !== categoryId)
          : [...prev, categoryId]
      );
    }
  };

  const isAllActive = selectedCategoryIds.length === 0;

  const addToCart = (item) => {
    const existingItem = cart.find(
      (cartItem) => cartItem.itemId === item.itemId
    );
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.itemId === item.itemId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const existingItem = cart.find((item) => item.itemId === itemId);
    if (existingItem.quantity > 1) {
      setCart(
        cart.map((item) =>
          item.itemId === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } else {
      setCart(cart.filter((item) => item.itemId !== itemId));
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.01; // 1% налог
  const total = subtotal + tax;

  return (
    <div className="content-container explore">
      <div className="left-column explore">
        <div className="categories-row">
          {/* Кнопка "All" */}
          <div
            className={`category-card ${isAllActive ? "active" : ""}`}
            style={{ backgroundColor: "#97A8B8" }}
            onClick={() => toggleCategorySelection("all")}
          >
            <div className="category-card-image">
              <img src={assets.items} alt="all items" />
            </div>
            <div className="category-card-info">
              <p>All ({items.length})</p>
            </div>
          </div>

          {/* Категории */}
          {categories.map((category) => (
            <div
              className={`category-card ${
                selectedCategoryIds.includes(category.categoryId)
                  ? "active"
                  : ""
              }`}
              key={category.categoryId}
              style={{ backgroundColor: category.bgColor }}
              onClick={() => toggleCategorySelection(category.categoryId)}
            >
              <div className="category-card-image">
                <img src={category.imgUrl} alt={category.name} />
              </div>
              <div className="category-card-info">
                <p>
                  {category.name} (
                  {
                    items.filter((i) => i.categoryId === category.categoryId)
                      .length
                  }
                  )
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="items-row">
          <div className="selection-info">
            {selectedCategoryIds.length > 0 && (
              <button
                className="clear-selection"
                onClick={() => setSelectedCategoryIds([])}
              >
                Clear selection ({selectedCategoryIds.length})
              </button>
            )}
          </div>
          <hr />
          <div className="search-bar">
            <div className="input-group">
              <input
                type="text"
                name="keyword"
                id="keyword"
                value={searchData}
                onChange={(e) => setSearchData(e.target.value)}
                placeholder="Search by keyword"
              />
              <span className="input-group-text bg-warning">
                <i className="bi bi-search"></i>
              </span>
            </div>
          </div>
          {filteredItems.map((item) => (
            <div
              className="list-item explore"
              key={item.itemId}
              style={{ backgroundColor: "#97a8b8" }}
            >
              <div className="item-image">
                <img
                  src={item.imgUrl}
                  alt={item.name}
                  className="category-item-img"
                />
              </div>
              <div className="item-info">
                <p className="name">
                  {item.name}{" "}
                  <span className="grey-text">({item.categoryName})</span>
                </p>
                <p>{item.price}$</p>
              </div>
              <div className="item-buttons" onClick={() => addToCart(item)}>
                <img
                  src={assets.cart}
                  alt="cart icon"
                  className="item-button-element"
                />
                <button className="to-cart-btn">+</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="right-column explore">
        <div className="customer-form-container">
          <div className="form-group">
            <label>Customer name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
            />
          </div>
          <div className="form-group">
            <label>Mobile number</label>
            <input
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Enter mobile number"
            />
          </div>
        </div>

        <div className="cart-items">
          <hr />
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.itemId} className="cart-item">
                <div className="cart-item-info">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-price">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                <div className="cart-item-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => removeFromCart(item.itemId)}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => addToCart(item)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-calculations">
          <hr className="bold-hr" />
          <div className="calculation-row">
            <span>Item:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="calculation-row">
            <span>Tax (1%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="calculation-row total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="payment-methods">
            <button
              className={`payment-btn ${
                paymentMethod === "cash" ? "active" : ""
              }`}
              onClick={() => setPaymentMethod("cash")}
            >
              Cash
            </button>
            <button
              className={`payment-btn ${
                paymentMethod === "upi" ? "active" : ""
              }`}
              onClick={() => setPaymentMethod("upi")}
            >
              UPI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
