import React, { useState, createContext } from 'react';
import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  async function Login(id, password) {
    try {
      const res = await api.post(
        `/Login/Aluno?matricula=${id}&senha=${password}`
      );

      if (res.data.accessToken) {
        localStorage.setItem('token', `Bearer ${res.data.accessToken}`);
        api.defaults.headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${res.data.accessToken}`,
        };

        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    } catch (err) {
      setIsAuth(false);
      console.error(err.message);
    }
  }

  async function Logout() {
    window.localStorage.clear();
    setIsAuth(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        Login,
        Logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
