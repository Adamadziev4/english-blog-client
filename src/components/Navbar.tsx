import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export const Navbar = () => {
  const authContext = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="nav-container">
        <Link to="/">
          <div className="logo">
            <img src="/images/logo.png" alt="logo" />
          </div>
        </Link>
        <div className="links">
          <Link className="link" to="/?category=art">
            <h6>ИСКУССТВО</h6>
          </Link>
          <Link className="link" to="/?category=science">
            <h6>НАУКА</h6>
          </Link>
          <Link className="link" to="/?category=technology">
            <h6>ТЕХНОЛОГИИ</h6>
          </Link>
          <Link className="link" to="/?category=cinema">
            <h6>КИНО</h6>
          </Link>
          <Link className="link" to="/?category=design">
            <h6>ДИЗАЙН</h6>
          </Link>
          <Link className="link" to="/?category=food">
            <h6>ЕДА</h6>
          </Link>
          <span className="username">{authContext?.currentUser?.username}</span>
          {authContext?.currentUser ? (
            <span onClick={authContext.logout}>Выйти</span>
          ) : (
            <Link className="link" to="/login">
              Войти
            </Link>
          )}
          <span className="write-btn">
            <Link className="link" to="/write">
              Пост
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};
