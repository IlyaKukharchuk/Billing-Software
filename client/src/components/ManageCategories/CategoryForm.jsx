import { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import { addCategory } from "../../Service/CategoryService";
import { AppContext } from "../../context/AppContext";

export default function CategoryForm() {
  const { categories, setCategories } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    bgColor: "#212529",
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
      { condition: !image, message: "Select image for category!" },
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
      const jsonFile = new File([jsonBlob], "category.json", {
        type: "application/json",
      });

      // 3. Формируем FormData
      const formData = new FormData();
      formData.append("category", jsonFile);
      formData.append("file", image);

      // 4. Отправляем запрос
      const response = await addCategory(formData);

      if (response.status === 201) {
        setCategories([...categories, response.data]);
        toast.success("Category added");
        setData({ name: "", description: "", bgColor: "#212529" });
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
            placeholder="Category name"
            onChange={handleDataChange}
            value={data.name}
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
            onChange={handleDataChange}
            value={data.description}
          />
        </div>
        <div className="category-fields description-container color-picker">
          <label htmlFor="bgColor" className="form-label">
            Backgroung color
          </label>
          <input
            type="color"
            name="bgColor"
            id="bgColor"
            className="form-control color-picker"
            onChange={handleDataChange}
            value={data.bgColor}
          />
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
