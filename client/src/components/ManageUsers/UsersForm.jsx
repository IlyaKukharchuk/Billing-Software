import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";
import { addUser } from "../../Service/UserService";

export default function UsersForm() {
  const { users, setUsers } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleDataChange = (e) => {
    const value = e.target.value;
    const key = e.target.name;
    setData((data) => ({ ...data, [key]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const validationRules = [
      { condition: !data.name.trim(), message: "Fill the name field" },
      { condition: !data.email.trim(), message: "Fill the email field" },
      { condition: !data.password.trim(), message: "Fill the password field" },
    ];

    const error = validationRules.find((rule) => rule.condition);

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }
    try {
      const response = await addUser(data);

      if (response.status === 201) {
        setUsers([...users, response.data]);
        toast.success("User added");
        setData({ name: "", email: "", password: "" });
      }
    } catch (error) {
      console.error("Ошибка:", error);
      toast.error(`Error: ${error.response?.data?.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="category-form">
        <form onSubmit={onSubmitHandler}>
          <div className="category-fields">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              placeholder="Ivan Ivanovich"
              onChange={handleDataChange}
              value={data.name}
            />
          </div>
          <div className="category-fields">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="form-control"
              placeholder="yourname@example.com"
              onChange={handleDataChange}
              value={data.email}
            />
          </div>
          <div className="category-fields">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              placeholder="***********"
              onChange={handleDataChange}
              value={data.password}
            />
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
