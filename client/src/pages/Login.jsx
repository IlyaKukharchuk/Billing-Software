import { useContext, useState } from "react";
import "../css/pages/Login.css";
import toast from "react-hot-toast";
import { login } from "../Service/AuthService";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function Login() {
  const navigate = useNavigate();
  const { setAuthData } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(data);
      setAuthData(response.data.token, response.data.role);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Email/Password Invalid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light login-bg">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Sign in</h1>
          <p className="card-text text-mutes">
            Sign-in below to acess your account
          </p>
          <form onSubmit={onSubmitHandler}>
            <div className="form-element">
              <label htmlFor="email">Email adress</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="yourname@example.com"
                className="form-control"
                onChange={onChangeHandler}
                value={data.email}
              />
            </div>
            <div className="form-element">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*********"
                className="form-control"
                onChange={onChangeHandler}
                value={data.password}
              />
            </div>
            <div className="form-element">
              <button className="submit-btn" disabled={loading}>
                {loading ? "Loading..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
