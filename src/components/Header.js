import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import Home from "../pages/Home";
import "./Header.css";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [search, setSearch] = useState("");
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Home");
    } else if (location.pathname === "/add") {
      setActiveTab("AddContact");
    } else if (location.pathname === "/about") {
      setActiveTab("About");
    }
  }, [location]);

  // Form Submit Function

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?name=${search}`);
    setSearch("");
  };

  // Function for data searching

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="header">
      <p className="logo">User Management</p>
      <div className="header-right">
        <form style={{ display: "inline" }} onSubmit={handleSubmit}>
          <input
            type="text"
            className="inputField"
            placeholder="Search name"
            onChange={handleSearch}
            value={search}
          />
        </form>
        <Link to="/">
          <p
            className={`${activeTab === "Home" ? "active" : ""}`}
            onClick={() => setActiveTab("Home")}
          >
            Home
          </p>
        </Link>

        <Link to="/add">
          <p
            className={`${activeTab === "AddContact" ? "active" : ""}`}
            onClick={() => setActiveTab("AddContact")}
          >
            Add User
          </p>
        </Link>

        <Link to="/about">
          <p
            className={`${activeTab === "About" ? "active" : ""}`}
            onClick={() => setActiveTab("About")}
          >
            About
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
