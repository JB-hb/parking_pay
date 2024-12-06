import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importa useNavigate correctamente
import React, { useContext, useState, createContext, useEffect } from "react";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate(); // Usarlo dentro del componente
  const baseUrl = "http://localhost:1234/parking";

  // Cargar usuario desde localStorage al iniciar
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async ({ mail, password }) => {
    const response = await axios.get(baseUrl + "/login", {
      params: { mail: mail, password: password },
    });

    if (response.data.error) {
      return { error: response.data.error };
    }

    const userData = response.data.auth;
    setUser(userData);

    // Guardar usuario en localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    return { statusText: "completed" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/parking/login")
  };

  useEffect(() => {
    // Opcional: Validar sesión automáticamente en cada carga si necesario
  }, []);

  return (
    <authContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
