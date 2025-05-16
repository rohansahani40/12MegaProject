import React from "react";
import { Link } from "react-router-dom";
import { Logo, Container, Logoutbtn } from "../index";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "all posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "add post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header className=" py-3 shadow bg-gray-500">
      <Container className="flex justify-between items-center">
        <nav className="flex ">
          <div className="mr-4">
            <Link to="/">
              <Logo className="text-2xl font-bold text-white" />
            </Link>
          </div>
          <ul className="flex ml-auto">
             {navItems.map((item)=>
             item.active ? (
              <li key={item.name} className="mr-4">
                <button
                onClick={()=>navigate(item.slug)}
                className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md px-3 py-2 text-sm font-medium"
                >{item.name}</button>
              </li>
             ) :null
            )}
            {authStatus && (
              <li className="mr-4">
                <Logoutbtn className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md px-3 py-2 text-sm font-medium" />
              </li>
            )}
           </ul >
        </nav>
      </Container>
    </header>
  );
};

export default Header;
