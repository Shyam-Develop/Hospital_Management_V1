import React, { createContext, useEffect, useReducer } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { AppLoading } from "app/components";

const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decodedToken = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated, user } = action.payload;
     
      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      };
    }
    case "LOGIN": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case " LOGOUT": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: false,
        user
      };
    }
    case "REGISTER": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case "UPDATE_USER": {
      const { user } = action.payload;
      state.user = user;
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT",
  login: () => Promise.resolve(),
  logout: () => {},
  register: () => Promise.resolve(),
  updateUser: () => {}
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email, password) => {
    
    const response = await axios.post("/api/auth/login", {
      email,
      password,
    });

    console.log('login',response);
    
    const { accessToken, user } = response.data;

    setSession(accessToken);

    dispatch({
      type: "LOGIN",
      payload: {
        user,
      },
    });
  };

  const register = async (email, username, password) => {
    const response = await axios.post("/api/auth/login", {
      email,
      username,
      password,
    });

    const { accessToken, user } = response.data;

    setSession(accessToken);

    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
  };
  const logout = () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  const updateUser = (user) => {
    dispatch({ type: "UPDATE_USER" ,payload: {
      user,
    }, });
  };

  useEffect(() => {
    (async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          
          setSession(accessToken);
          const response = await axios.get("link");
          const { user } = response.data;

          dispatch({

            type: "INIT",
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          
          dispatch({
            type: "INIT",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
    
        console.log(err);
        dispatch({
          type: "INIT",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    })();
  }, []);
  if (!state.isInitialised) {
    // console.log("🚀 ~ file: JWTAuthContext.js:171 ~ AuthProvider ~ !state.isInitialised:", state.isInitialised)
    return <AppLoading />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "JWT",
        login,
        logout,
        register,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
