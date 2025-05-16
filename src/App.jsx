import React, { useState } from "react";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import "./App.css";
import { useDispatch } from "react-redux";
import authservice from "./appwrite/auth.js";
import { useEffect } from "react";
import { login, logout } from "./store/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authservice
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div className="flex flex-row min-h-screen content-between bg-gray-400">
    <div className="w-full block "> 
      <Header />
       <main>
        <p>hiii</p>
      </main>
      <Footer/>
    </div>
    </div>
  ) :  null;
}

export default App;
