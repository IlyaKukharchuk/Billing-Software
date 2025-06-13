import { createContext, useEffect, useState } from "react";
import { fetchCategories } from "../service/CategoryService";
import { fetchItems } from "../service/ItemService";
import { fetchUsers } from "../service/UserService";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [auth, setAuth] = useState({
    token: null,
    role: null,
  });

  useEffect(() => {
    async function loadData() {
      try {
        const fetchCategoriesResponse = await fetchCategories();
        setCategories(fetchCategoriesResponse);
        const fetchItemsResponse = await fetchItems();
        setItems(fetchItemsResponse);
        const fetchUsersResponse = await fetchUsers();
        setUsers(fetchUsersResponse);
      } catch (error) {
        console.error("Ошибка загрузки:", error);
      }
    }
    loadData();
  }, []);

  const setAuthData = (token, role) => {
    setAuth({ token, role });
  };

  const contextValue = {
    categories,
    setCategories,
    auth,
    setAuthData,
    items,
    setItems,
    users,
    setUsers,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
