import { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";
import { addItem } from "../../Service/ItemService";

export default function ItemsForm() {
  const { items, setItems, categories } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "",
  });

  useEffect(() => {
    if (!image) return;
    const url = URL.createObjectURL(image);
    return () => URL.revokeObjectURL(url); // Чистим URL
  }, [image]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      setImage(null);
      toast("File not chosen!", {
        icon: "🥴",
      });
    }
  };

  const handleDataChange = (e) => {
    const value = e.target.value;
    const key = e.target.name;
    setData((data) => ({ ...data, [key]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const validationRules = [
      { condition: !image, message: "Select image for item!" },
      { condition: !data.name.trim(), message: "Fill the name field" },
      {
        condition: !data.description.trim(),
        message: "Fill the description field",
      },
    ];

    const error = validationRules.find((rule) => rule.condition);

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }
    try {
      // 1. Создаём JSON-файл из данных
      const jsonBlob = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });

      // 2. Создаём File объект с правильным именем
      const jsonFile = new File([jsonBlob], "item.json", {
        type: "application/json",
      });

      // 3. Формируем FormData
      const formData = new FormData();
      formData.append("item", jsonFile);
      formData.append("file", image);

      // 4. Отправляем запрос
      const response = await addItem(formData);

      if (response.status === 201) {
        setItems([...items, response.data]);
        toast.success("Item added");
        setData({ name: "", price: "", description: "", categoryId: "" });
        setImage(null);
      }
    } catch (error) {
      console.error("Ошибка:", error);
      toast.error(`Error: ${error.response?.data?.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="category-form">
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="image" className="form-label">
          <img
            src={image ? URL.createObjectURL(image) : assets.upload}
            alt="download-cloud"
          />
        </label>
        <input
          type="file"
          name="image"
          id="image"
          className="form-control"
          hidden
          onChange={handleImageChange}
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
            onChange={handleDataChange}
            value={data.name}
          />
        </div>

        <div className="category-fields">
          <label htmlFor="categoryId" className="form-label">
            Category
          </label>
          <select
            name="categoryId"
            id="categoryId"
            className="form-control"
            onChange={handleDataChange}
            value={data.categoryId}
            disabled={!categories?.length}
          >
            <option value="">--SELECT CATEGORY--</option>
            {!categories?.length ? (
              <option disabled>Loading categories...</option>
            ) : (
              categories.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.name}
                </option>
              ))
            )}
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
            placeholder="200.0$"
            onChange={handleDataChange}
            value={data.price}
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
            onChange={handleDataChange}
            value={data.description}
          />
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
