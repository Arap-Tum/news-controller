import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) =>  {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // LOad from LocalStorage on app start 
    useEffect(() => {
        const savedUser =localStorage.getItem('user');
        const savedToken =  localStorage.getItem('token');

        if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  // Save to local storage wenever the use r and token changes 
   useEffect(() => {
    if (user && token) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    }
  }, [user, token]);

  //Register method 
  const register = (userData) => {
    setUser(userData);
  }

    // Login method
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
  };    

  // Logout method
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

//Hook  to use auth
export const useAuth = () => useContext(AuthContext);

