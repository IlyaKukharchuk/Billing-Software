export default function CategoryForm() {
  return (
    <div className="category-form">
      <form>
        <label htmlFor="image" className="form-label">
          <img src="https://placehold.co/600x400" alt="" />
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
            placeholder="Category name"
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
            placeholder="Category description"
          />
        </div>
        <div className="category-fields description-container color-picker">
          <label htmlFor="bgcolor" className="form-label">
            Backgroung color
          </label>
          <input
            type="color"
            name="bgcolor"
            id="bgcolor"
            className="form-control color-picker"
          />
        </div>
        <button type="submit" className="submit-btn">
          Save
        </button>
      </form>
    </div>
  );
}
