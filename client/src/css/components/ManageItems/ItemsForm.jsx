export default function ItemsForm() {
  return (
    <div className="category-form">
      <form>
        <label htmlFor="image" className="form-label">
          <img src="src\assets\download.png" alt="download-cloud" />
        </label>
        <input
          type="file"
          name="image"
          id="image"
          className="form-control"
          hidden
        />

        <div className="category-fields">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            placeholder="Item name"
          />
        </div>

        <div className="category-fields">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select name="category" id="category" className="form-control">
            <option value="">--SELECT CATEGORY--</option>
            <option value="Category 1">Category 1</option>
            <option value="Category 2">Category 2</option>
          </select>
        </div>
        <div className="category-fields">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            className="form-control"
            placeholder="200.00$"
          />
        </div>

        <div className="category-fields description-container">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            rows="5"
            name="description"
            id="description"
            className="form-control"
            placeholder="Write content here..."
          />
        </div>
        <button type="submit" className="submit-btn">
          Save
        </button>
      </form>
    </div>
  );
}
