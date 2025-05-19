import { useState } from "react";

export default function UsersForm() {
  const [password, setPassword] = useState("");
  return (
    <div>
      <div className="category-form">
        <form>
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
              value={password}
              placeholder="***********"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-btn">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
