/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { Search, XCircle } from "react-feather";
import { all_routes } from "../../Router/all_routes";


import { loginSuccess,logout, } from "../../core/redux/slices/authSlice"; 
import { useDispatch ,useSelector} from 'react-redux';

const Header = () => {
  const route = all_routes;
  const location = useLocation();
  const [toggle, SetToggle] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
    // const [user, setUser] = useState(null);

    const dispatch = useDispatch();  
  const navigate = useNavigate();
  
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  // useEffect(() => {
  //   // Get user info from localStorage
  //   const storedUser = sessionStorage.getItem("user");
  //   if (storedUser) setUser(JSON.parse(storedUser));
  // }, []);

  // const handleLogout = () => {
  // sessionStorage.removeItem("token");
  // sessionStorage.removeItem("user");
  //   setUser(null);
  //   navigate(route.signin);
  // };






  const handleLogout = () => {
  
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');

  
    dispatch(logout());

   
    navigate('/signin');
  };

  const isElementVisible = (element) => {
    if (!element) return false;
    return element.offsetWidth > 0 || element.offsetHeight > 0;
  };

  const slideDownSubmenu = () => {
    const subdropPlusUl = document.getElementsByClassName("subdrop");
    for (let i = 0; i < subdropPlusUl.length; i++) {
      const submenu = subdropPlusUl[i].nextElementSibling;
      if (submenu && submenu.tagName.toLowerCase() === "ul") {
        submenu.style.display = "block";
      }
    }
  };

  const slideUpSubmenu = () => {
    const subdropPlusUl = document.getElementsByClassName("subdrop");
    for (let i = 0; i < subdropPlusUl.length; i++) {
      const submenu = subdropPlusUl[i].nextElementSibling;
      if (submenu && submenu.tagName.toLowerCase() === "ul") {
        submenu.style.display = "none";
      }
    }
  };

  useEffect(() => {
    let expandTimeout = null;
    
    const handleMouseover = (e) => {
      const body = document.body;
      const toggleBtn = document.getElementById("toggle_btn");

      // Only handle if mini-sidebar is active
      if (!body.classList.contains("mini-sidebar")) {
        return;
      }

      // Check if toggle button exists and is visible
      if (!toggleBtn) {
        return;
      }

      // Check if toggle button is visible (not hidden by CSS)
      const toggleBtnStyle = window.getComputedStyle(toggleBtn);
      if (toggleBtnStyle.display === 'none' || toggleBtnStyle.visibility === 'hidden') {
        return;
      }

      const target = e.target.closest(".sidebar, .header-left, #sidebar, #collapsed-sidebar");

      // Clear any pending timeout
      if (expandTimeout) {
        clearTimeout(expandTimeout);
        expandTimeout = null;
      }

      if (target) {
        // Expand menu when hovering over sidebar or header-left
        if (!body.classList.contains("expand-menu")) {
          body.classList.add("expand-menu");
          slideDownSubmenu();
        }
      } else {
        // Collapse menu when not hovering (with small delay to prevent flickering)
        if (body.classList.contains("expand-menu")) {
          expandTimeout = setTimeout(() => {
            body.classList.remove("expand-menu");
            slideUpSubmenu();
          }, 100);
        }
      }
    };

    document.addEventListener("mouseover", handleMouseover);

    return () => {
      document.removeEventListener("mouseover", handleMouseover);
      if (expandTimeout) {
        clearTimeout(expandTimeout);
      }
    };
  }, []);
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement ||
          document.mozFullScreenElement ||
          document.webkitFullscreenElement ||
          document.msFullscreenElement
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);
  const handlesidebar = () => {
    const body = document.body;
    const isMiniSidebar = body.classList.contains("mini-sidebar");
    
    body.classList.toggle("mini-sidebar");
    SetToggle((current) => !current);
    
    // If toggling off mini-sidebar, remove expand-menu
    if (isMiniSidebar) {
      body.classList.remove("expand-menu");
      slideUpSubmenu();
    }
  };
  
  const expandMenu = () => {
    // Only remove expand-menu if we're in mini-sidebar mode
    if (document.body.classList.contains("mini-sidebar")) {
      document.body.classList.remove("expand-menu");
      slideUpSubmenu();
    }
  };
  
  const expandMenuOpen = () => {
    // Only add expand-menu if we're in mini-sidebar mode
    if (document.body.classList.contains("mini-sidebar")) {
      document.body.classList.add("expand-menu");
      slideDownSubmenu();
    }
  };
  const sidebarOverlay = () => {
    document?.querySelector(".main-wrapper")?.classList?.toggle("slide-nav");
    document?.querySelector(".sidebar-overlay")?.classList?.toggle("opened");
    document?.querySelector("html")?.classList?.toggle("menu-opened");
  };

  const pathname = location.pathname;

  const exclusionArray = [
    "/reactjs/template/dream-pos/index-three",
    "/reactjs/template/dream-pos/index-one",
  ];
  if (exclusionArray.indexOf(window.location.pathname) >= 0) {
    return "";
  }




  const toggleFullscreen = (elem) => {
    elem = elem || document.documentElement;
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };

  return (
    <>
      <div className="header">
        {/* Logo */}
        <div
          className={`header-left ${toggle ? "" : "active"}`}
        >
          <Link to="/dashboard" className="logo logo-normal">
            <ImageWithBasePath src="assets/img/logo.png" alt="img" />
          </Link>
          <Link to="/dashboard" className="logo logo-white">
            <ImageWithBasePath src="assets/img/logo-white.png" alt="img" />
          </Link>
          <Link to="/dashboard" className="logo-small">
            <ImageWithBasePath src="assets/img/logo-small.png" alt="img" />
          </Link>
          <Link
            id="toggle_btn"
            to="#"
            style={{
              display: pathname.includes("tasks")
                ? "none"
                : pathname.includes("compose")
                ? "none"
                : "",
            }}
            onClick={handlesidebar}
          >
            <FeatherIcon icon="chevrons-left" className="feather-16" />
          </Link>
        </div>
        {/* /Logo */}
        <Link
          id="mobile_btn"
          className="mobile_btn"
          to="#"
          onClick={sidebarOverlay}
        >
          <span className="bar-icon">
            <span />
            <span />
            <span />
          </span>
        </Link>
        {/* Header Menu */}
        <ul className="nav user-menu">
          {/* Search */}
          <li className="nav-item nav-searchinputs">
            <div className="top-nav-search">
              <Link to="#" className="responsive-search">
                <Search />
              </Link>
              <form action="#" className="dropdown">
                <div
                  className="searchinputs dropdown-toggle"
                  id="dropdownMenuClickable"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="false"
                >
                  <input type="text" placeholder="Search" />
                  <div className="search-addon">
                    <span>
                      <XCircle className="feather-14" />
                    </span>
                  </div>
                </div>
                <div
                  className="dropdown-menu search-dropdown"
                  aria-labelledby="dropdownMenuClickable"
                >
                  <div className="search-info">
                    <h6>
                      <span>
                        <i data-feather="search" className="feather-16" />
                      </span>
                      Recent Searches
                    </h6>
                    <ul className="search-tags">
                      <li>
                        <Link to="#">Products</Link>
                      </li>
                      <li>
                        <Link to="#">Sales</Link>
                      </li>
                      <li>
                        <Link to="#">Applications</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="search-info">
                    <h6>
                      <span>
                        <i data-feather="help-circle" className="feather-16" />
                      </span>
                      Help
                    </h6>
                    <p>
                      How to Change Product Volume from 0 to 200 on Inventory
                      management
                    </p>
                    <p>Change Product Name</p>
                  </div>
                  <div className="search-info">
                    <h6>
                      <span>
                        <i data-feather="user" className="feather-16" />
                      </span>
                      Customers
                    </h6>
                    <ul className="customers">
                      <li>
                        <Link to="#">
                          Aron Varu
                          <ImageWithBasePath
                            src="assets/img/profiles/avator1.jpg"
                            alt
                            className="img-fluid"
                          />
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          Jonita
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-01.jpg"
                            alt
                            className="img-fluid"
                          />
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          Aaron
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-10.jpg"
                            alt
                            className="img-fluid"
                          />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </form>
            </div>
          </li>
          {/* /Search */}

          {/* Select Store */}
          {/* <li className="nav-item dropdown has-arrow main-drop select-store-dropdown">
            <Link
              to="#"
              className="dropdown-toggle nav-link select-store"
              data-bs-toggle="dropdown"
            >
              <span className="user-info">
                <span className="user-letter">
                  <ImageWithBasePath
                    src="assets/img/store/store-01.png"
                    alt="Store Logo"
                    className="img-fluid"
                  />
                </span>
                <span className="user-detail">
                  <span className="user-name">Select Warehouse</span>
                </span>
              </span>
            </Link>
            <div className="dropdown-menu dropdown-menu-right">
              <Link to="#" className="dropdown-item">
                <ImageWithBasePath
                  src="assets/img/store/store-01.png"
                  alt="Store Logo"
                  className="img-fluid"
                />{" "}
                Grocery Alpha
              </Link>
              <Link to="#" className="dropdown-item">
                <ImageWithBasePath
                  src="assets/img/store/store-02.png"
                  alt="Store Logo"
                  className="img-fluid"
                />{" "}
                Grocery Apex
              </Link>
              <Link to="#" className="dropdown-item">
                <ImageWithBasePath
                  src="assets/img/store/store-03.png"
                  alt="Store Logo"
                  className="img-fluid"
                />{" "}
                Grocery Bevy
              </Link>
              <Link to="#" className="dropdown-item">
                <ImageWithBasePath
                  src="assets/img/store/store-04.png"
                  alt="Store Logo"
                  className="img-fluid"
                />{" "}
                Grocery Eden
              </Link>
            </div>
          </li> */}
          {/* /Select Store */}

          {/* Flag */}
          {/* <li className="nav-item dropdown has-arrow flag-nav nav-item-box">
            <Link
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              to="#"
              role="button"
            > */}
              {/* <i data-feather="globe" /> */}
              {/* <FeatherIcon icon="globe" /> */}
              {/* <ImageWithBasePath
                src="assets/img/flags/us.png"
                alt="img"
                height={16}
              />
            </Link>
            <div className="dropdown-menu dropdown-menu-right">
              <Link to="#" className="dropdown-item active">
                <ImageWithBasePath
                  src="assets/img/flags/us.png"
                  alt="img"
                  height={16}
                />
                English
              </Link>
              <Link to="#" className="dropdown-item">
                <ImageWithBasePath
                  src="assets/img/flags/fr.png"
                  alt="img"
                  height={16}
                />{" "}
                French
              </Link>
              <Link to="#" className="dropdown-item">
                <ImageWithBasePath
                  src="assets/img/flags/es.png"
                  alt="img"
                  height={16}
                />{" "}
                Spanish
              </Link>
              <Link to="#" className="dropdown-item">
                <ImageWithBasePath
                  src="assets/img/flags/de.png"
                  alt="img"
                  height={16}
                />{" "}
                German
              </Link>
            </div>
          </li> */}
          
          {/* /Flag */}



          <li className="nav-item nav-item-box">
            <Link
              to="#"
              id="btnFullscreen"
              onClick={() => toggleFullscreen()}
              className={isFullscreen ? "Exit Fullscreen" : "Go Fullscreen"}
            >
              {/* <i data-feather="maximize" /> */}
              <FeatherIcon icon="maximize" />
            </Link>
          </li>
          <li className="nav-item nav-item-box">
            <Link to="/email">
              {/* <i data-feather="mail" /> */}
              <FeatherIcon icon="mail" />
              <span className="badge rounded-pill">1</span>
            </Link>
          </li>
          {/* Notifications */}
          <li className="nav-item dropdown nav-item-box">
            <Link
              to="#"
              className="dropdown-toggle nav-link"
              data-bs-toggle="dropdown"
            >
              {/* <i data-feather="bell" /> */}
              <FeatherIcon icon="bell" />
              <span className="badge rounded-pill">2</span>
            </Link>
            <div className="dropdown-menu notifications">
              <div className="topnav-dropdown-header">
                <span className="notification-title">Notifications</span>
                <Link to="#" className="clear-noti">
                  {" "}
                  Clear All{" "}
                </Link>
              </div>
              <div className="noti-content">
                <ul className="notification-list">
                  <li className="notification-message active">
                    <Link to="/activities">
                      <div className="media d-flex">
                        <span className="avatar flex-shrink-0">
                          <ImageWithBasePath
                            alt="img"
                            src="assets/img/profiles/avatar-02.jpg"
                          />
                        </span>
                        <div className="media-body flex-grow-1">
                          <p className="noti-details">
                            <span className="noti-title">John Doe</span> added
                            new task{" "}
                            <span className="noti-title">
                              Patient appointment booking
                            </span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              4 mins ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link to="/activities">
                      <div className="media d-flex">
                        <span className="avatar flex-shrink-0">
                          <ImageWithBasePath
                            alt="img"
                            src="assets/img/profiles/avatar-03.jpg"
                          />
                        </span>
                        <div className="media-body flex-grow-1">
                          <p className="noti-details">
                            <span className="noti-title">Tarah Shropshire</span>{" "}
                            changed the task name{" "}
                            <span className="noti-title">
                              Appointment booking with payment gateway
                            </span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              6 mins ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link to="/activities">
                      <div className="media d-flex">
                        <span className="avatar flex-shrink-0">
                          <ImageWithBasePath
                            alt="img"
                            src="assets/img/profiles/avatar-06.jpg"
                          />
                        </span>
                        <div className="media-body flex-grow-1">
                          <p className="noti-details">
                            <span className="noti-title">Misty Tison</span>{" "}
                            added{" "}
                            <span className="noti-title">Domenic Houston</span>{" "}
                            and <span className="noti-title">Claire Mapes</span>{" "}
                            to project{" "}
                            <span className="noti-title">
                              Doctor available module
                            </span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              8 mins ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link to="/activities">
                      <div className="media d-flex">
                        <span className="avatar flex-shrink-0">
                          <ImageWithBasePath
                            alt="img"
                            src="assets/img/profiles/avatar-17.jpg"
                          />
                        </span>
                        <div className="media-body flex-grow-1">
                          <p className="noti-details">
                            <span className="noti-title">Rolland Webber</span>{" "}
                            completed task{" "}
                            <span className="noti-title">
                              Patient and Doctor video conferencing
                            </span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              12 mins ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link to="/activities">
                      <div className="media d-flex">
                        <span className="avatar flex-shrink-0">
                          <ImageWithBasePath
                            alt="img"
                            src="assets/img/profiles/avatar-13.jpg"
                          />
                        </span>
                        <div className="media-body flex-grow-1">
                          <p className="noti-details">
                            <span className="noti-title">Bernardo Galaviz</span>{" "}
                            added new task{" "}
                            <span className="noti-title">
                              Private chat module
                            </span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              2 days ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="topnav-dropdown-footer">
                <Link to="/activities">View all Notifications</Link>
              </div>
            </div>
          </li>
          {/* /Notifications */}
          <li className="nav-item nav-item-box">
            <Link to="/general-settings">
              {/* <i data-feather="settings" /> */}
              <FeatherIcon icon="settings" />
            </Link>
          </li>
          {/* <li className="nav-item dropdown has-arrow main-drop">
            <Link
              to="#"
              className="dropdown-toggle nav-link userset"
              data-bs-toggle="dropdown"
            >
              <span className="user-info">
                <span className="user-letter">
                  <ImageWithBasePath
                    src="assets/img/profiles/avator1.jpg"
                    alt="img"
                    className="img-fluid"
                  />
                </span>
                <span className="user-detail">
                  <span className="user-name">John Smilga</span>
                  <span className="user-role">Super Admin</span>
                </span>
              </span>
            </Link>
            <div className="dropdown-menu menu-drop-user">
              <div className="profilename">
                <div className="profileset">
                  <span className="user-img">
                    <ImageWithBasePath
                      src="assets/img/profiles/avator1.jpg"
                      alt="img"
                    />
                    <span className="status online" />
                  </span>
                  <div className="profilesets">
                    <h6>John Smilga</h6>
                    <h5>Super Admin</h5>
                  </div>
                </div>
                <hr className="m-0" />
                <Link className="dropdown-item" to={route.route}>
                  <i className="me-2" data-feather="user" /> My Profile
                </Link>
                <Link className="dropdown-item" to={route.generalsettings}>
                  <i className="me-2" data-feather="settings" />
                  Settings
                </Link>
                <hr className="m-0" />
                <Link className="dropdown-item logout pb-0" to="/signin">
                  <ImageWithBasePath
                    src="assets/img/icons/log-out.svg"
                    alt="img"
                    className="me-2"
                  />
                  Logout
                </Link>
              </div>
            </div>
          </li> */}
          
          <li className="nav-item dropdown has-arrow main-drop">
  {user ? (
    <>
      <Link
        to="#"
        className="dropdown-toggle nav-link userset"
        data-bs-toggle="dropdown"
      >
        <span className="user-info">
          <span className="user-letter">
            <ImageWithBasePath
              src={user.avatar || "assets/img/profiles/avator1.jpg"}
              alt="img"
              className="img-fluid"
            />
          </span>
          <span className="user-detail">
            <span className="user-name">{user.name}</span>
            <span className="user-role">{user.role}</span>
          </span>
        </span>
      </Link>
      <div className="dropdown-menu menu-drop-user">
        <div className="profilename">
          <div className="profileset">
            <span className="user-img">
              <ImageWithBasePath
                src={user.avatar || "assets/img/profiles/avator1.jpg"}
                alt="img"
              />
              <span className="status online" />
            </span>
            <div className="profilesets">
              <h6>{user.name}</h6>
              <h5>{user.role}</h5>
            </div>
          </div>
          <hr className="m-0" />
          <Link className="dropdown-item" to={route.profile}>
            <i className="me-2" data-feather="user" /> My Profile
          </Link>
          <Link className="dropdown-item" to={route.generalsettings}>
            <i className="me-2" data-feather="settings" />
            Settings
          </Link>
          <hr className="m-0" />
          <button
            className="dropdown-item logout pb-0"
            onClick={handleLogout}
            style={{ border: "none", background: "none" }}
          >
            <ImageWithBasePath
              src="assets/img/icons/log-out.svg"
              alt="img"
              className="me-2"
            />
            Logout
          </button>
        </div>
      </div>
    </>
  ) : (
       <Link to={route.signin} className="nav-link">
                    <FeatherIcon icon="log-in" className="me-1" /> Sign In
         </Link>
  )}
</li>

        
        </ul>
        {/* /Header Menu */}
        {/* Mobile Menu */}
        {/* <div className="dropdown mobile-user-menu">
         */}
     <div className="dropdown mobile-user-menu">
  {/* Dropdown toggle button */}
  <Link
    to="#"
    className="nav-link dropdown-toggle"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <i className="fa fa-ellipsis-v" />
  </Link>

  {/* Dropdown menu */}
  <div className="dropdown-menu dropdown-menu-right">
    {user ? (
      <>
        <Link className="dropdown-item" to={route.profile}>
          My Profile
        </Link>
        <Link className="dropdown-item" to={route.generalsettings}>
          Settings
        </Link>
        <button
          className="dropdown-item"
          onClick={handleLogout}
          style={{ border: "none", background: "none" }}
        >
          Logout
        </button>
      </>
    ) : (
      <Link className="dropdown-item" to={route.signin}>
        Sign In
      </Link>
    )}
  </div>
</div>

        {/* /Mobile Menu */}
      </div>
    </>
  );
};

export default Header;




// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState, useCallback, useRef } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import FeatherIcon from "feather-icons-react";
// import ImageWithBasePath from "../../core/img/imagewithbasebath";
// import { Search, XCircle } from "react-feather";
// import { all_routes } from "../../Router/all_routes";
// import { loginSuccess, logout } from "../../core/redux/slices/authSlice";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";

// // Import countries data
// const countries = [
//   { code: "en", name: "English", flag: "us.png" },
//   { code: "es", name: "Spanish", flag: "es.png" },
//   { code: "fr", name: "French", flag: "fr.png" },
//   { code: "de", name: "German", flag: "de.png" },
//   { code: "it", name: "Italian", flag: "it.png" },
//   { code: "pt", name: "Portuguese", flag: "pt.png" },
//   { code: "ru", name: "Russian", flag: "ru.png" },
//   { code: "zh", name: "Chinese", flag: "cn.png" },
//   { code: "ja", name: "Japanese", flag: "jp.png" },
//   { code: "ko", name: "Korean", flag: "kr.png" },
//   { code: "ar", name: "Arabic", flag: "sa.png" },
//   { code: "hi", name: "Hindi", flag: "in.png" },
// ];

// const Header = () => {
//   const route = all_routes;
//   const location = useLocation();
//   const [toggle, SetToggle] = useState(false);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user, isAuthenticated } = useSelector((state) => state.auth);

//   // Warehouse state
//   const [warehouses, setWarehouses] = useState([]);
//   const [selectedWarehouse, setSelectedWarehouse] = useState(null);
//   const [loadingWarehouses, setLoadingWarehouses] = useState(false);

//   // Language state
//   const [selectedLanguage, setSelectedLanguage] = useState(
//     countries.find((c) => c.code === "en")
//   );

//   // Search state
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState({
//     products: [],
//     customers: [],
//     recent: [],
//   });
//   const [isSearching, setIsSearching] = useState(false);
//   const [showSearchResults, setShowSearchResults] = useState(false);
//   const searchTimeoutRef = useRef(null);

//   // Fetch warehouses
//   const fetchWarehouses = useCallback(async () => {
//     setLoadingWarehouses(true);
//     try {
//       const token = localStorage.getItem("token") || sessionStorage.getItem("token");
//       const response = await axios.get("/api/warehouses", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.data.success) {
//         setWarehouses(response.data.data);
        
//         // Set first warehouse as default if none selected
//         if (!selectedWarehouse && response.data.data.length > 0) {
//           const defaultWarehouse = response.data.data[0];
//           setSelectedWarehouse(defaultWarehouse);
//           localStorage.setItem("selectedWarehouse", JSON.stringify(defaultWarehouse));
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching warehouses:", error);
//     } finally {
//       setLoadingWarehouses(false);
//     }
//   }, [selectedWarehouse]);

//   // Load saved warehouse from localStorage
//   useEffect(() => {
//     const savedWarehouse = localStorage.getItem("selectedWarehouse");
//     if (savedWarehouse) {
//       setSelectedWarehouse(JSON.parse(savedWarehouse));
//     }
//     fetchWarehouses();
//   }, []);

//   // Handle warehouse selection
//   const handleWarehouseChange = (warehouse) => {
//     setSelectedWarehouse(warehouse);
//     localStorage.setItem("selectedWarehouse", JSON.stringify(warehouse));
//     // You can dispatch this to Redux store if needed
//     // dispatch(setWarehouse(warehouse));
//   };

//   // Handle language selection
//   const handleLanguageChange = (language) => {
//     setSelectedLanguage(language);
//     localStorage.setItem("selectedLanguage", language.code);
//     // Implement i18n language change here
//     // i18n.changeLanguage(language.code);
//   };

//   // Load saved language
//   useEffect(() => {
//     const savedLanguage = localStorage.getItem("selectedLanguage");
//     if (savedLanguage) {
//       const lang = countries.find((c) => c.code === savedLanguage);
//       if (lang) setSelectedLanguage(lang);
//     }
//   }, []);

//   // Debounced search function
//   const performSearch = useCallback(async (query) => {
//     if (!query || query.trim().length < 2) {
//       setSearchResults({ products: [], customers: [], recent: [] });
//       setIsSearching(false);
//       return;
//     }

//     setIsSearching(true);
//     try {
//       const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      
//       // Search products, customers, etc.
//       const [productsRes, customersRes] = await Promise.all([
//         axios.get(`/api/products?searchTerm=${encodeURIComponent(query)}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         }).catch(() => ({ data: { data: [] } })),
        
//         axios.get(`/api/customers?searchTerm=${encodeURIComponent(query)}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         }).catch(() => ({ data: { data: [] } })),
//       ]);

//       setSearchResults({
//         products: productsRes.data.data || [],
//         customers: customersRes.data.data || [],
//         recent: [], // You can store recent searches in localStorage
//       });
//     } catch (error) {
//       console.error("Search error:", error);
//       setSearchResults({ products: [], customers: [], recent: [] });
//     } finally {
//       setIsSearching(false);
//     }
//   }, []);

//   // Handle search input with debounce
//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchQuery(value);
//     setShowSearchResults(true);

//     // Clear existing timeout
//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current);
//     }

//     // Set new timeout for debounced search
//     searchTimeoutRef.current = setTimeout(() => {
//       performSearch(value);
//     }, 500); // 500ms delay
//   };

//   // Clear search
//   const handleClearSearch = () => {
//     setSearchQuery("");
//     setSearchResults({ products: [], customers: [], recent: [] });
//     setShowSearchResults(false);
//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current);
//     }
//   };

//   // Cleanup timeout on unmount
//   useEffect(() => {
//     return () => {
//       if (searchTimeoutRef.current) {
//         clearTimeout(searchTimeoutRef.current);
//       }
//     };
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     sessionStorage.removeItem("token");
//     sessionStorage.removeItem("user");
//     dispatch(logout());
//     navigate("/signin");
//   };

//   const slideDownSubmenu = () => {
//     const subdropPlusUl = document.getElementsByClassName("subdrop");
//     for (let i = 0; i < subdropPlusUl.length; i++) {
//       const submenu = subdropPlusUl[i].nextElementSibling;
//       if (submenu && submenu.tagName.toLowerCase() === "ul") {
//         submenu.style.display = "block";
//       }
//     }
//   };

//   const slideUpSubmenu = () => {
//     const subdropPlusUl = document.getElementsByClassName("subdrop");
//     for (let i = 0; i < subdropPlusUl.length; i++) {
//       const submenu = subdropPlusUl[i].nextElementSibling;
//       if (submenu && submenu.tagName.toLowerCase() === "ul") {
//         submenu.style.display = "none";
//       }
//     }
//   };

//   useEffect(() => {
//     let expandTimeout = null;
//     const handleMouseover = (e) => {
//       const body = document.body;
//       const toggleBtn = document.getElementById("toggle_btn");

//       if (!body.classList.contains("mini-sidebar")) {
//         return;
//       }

//       if (!toggleBtn) {
//         return;
//       }

//       const toggleBtnStyle = window.getComputedStyle(toggleBtn);
//       if (
//         toggleBtnStyle.display === "none" ||
//         toggleBtnStyle.visibility === "hidden"
//       ) {
//         return;
//       }

//       const target = e.target.closest(
//         ".sidebar, .header-left, #sidebar, #collapsed-sidebar"
//       );

//       if (expandTimeout) {
//         clearTimeout(expandTimeout);
//         expandTimeout = null;
//       }

//       if (target) {
//         if (!body.classList.contains("expand-menu")) {
//           body.classList.add("expand-menu");
//           slideDownSubmenu();
//         }
//       } else {
//         if (body.classList.contains("expand-menu")) {
//           expandTimeout = setTimeout(() => {
//             body.classList.remove("expand-menu");
//             slideUpSubmenu();
//           }, 100);
//         }
//       }
//     };

//     document.addEventListener("mouseover", handleMouseover);
//     return () => {
//       document.removeEventListener("mouseover", handleMouseover);
//       if (expandTimeout) {
//         clearTimeout(expandTimeout);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       setIsFullscreen(
//         document.fullscreenElement ||
//           document.mozFullScreenElement ||
//           document.webkitFullscreenElement ||
//           document.msFullscreenElement
//       );
//     };

//     document.addEventListener("fullscreenchange", handleFullscreenChange);
//     document.addEventListener("mozfullscreenchange", handleFullscreenChange);
//     document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
//     document.addEventListener("msfullscreenchange", handleFullscreenChange);

//     return () => {
//       document.removeEventListener("fullscreenchange", handleFullscreenChange);
//       document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
//       document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
//       document.removeEventListener("msfullscreenchange", handleFullscreenChange);
//     };
//   }, []);

//   const handlesidebar = () => {
//     const body = document.body;
//     const isMiniSidebar = body.classList.contains("mini-sidebar");
//     body.classList.toggle("mini-sidebar");
//     SetToggle((current) => !current);

//     if (isMiniSidebar) {
//       body.classList.remove("expand-menu");
//       slideUpSubmenu();
//     }
//   };

//   const sidebarOverlay = () => {
//     document?.querySelector(".main-wrapper")?.classList?.toggle("slide-nav");
//     document?.querySelector(".sidebar-overlay")?.classList?.toggle("opened");
//     document?.querySelector("html")?.classList?.toggle("menu-opened");
//   };

//   const pathname = location.pathname;
//   const exclusionArray = [
//     "/reactjs/template/dream-pos/index-three",
//     "/reactjs/template/dream-pos/index-one",
//   ];

//   if (exclusionArray.indexOf(window.location.pathname) >= 0) {
//     return "";
//   }

//   const toggleFullscreen = (elem) => {
//     elem = elem || document.documentElement;
//     if (
//       !document.fullscreenElement &&
//       !document.mozFullScreenElement &&
//       !document.webkitFullscreenElement &&
//       !document.msFullscreenElement
//     ) {
//       if (elem.requestFullscreen) {
//         elem.requestFullscreen();
//       } else if (elem.msRequestFullscreen) {
//         elem.msRequestFullscreen();
//       } else if (elem.mozRequestFullScreen) {
//         elem.mozRequestFullScreen();
//       } else if (elem.webkitRequestFullscreen) {
//         elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
//       }
//     } else {
//       if (document.exitFullscreen) {
//         document.exitFullscreen();
//       } else if (document.msExitFullscreen) {
//         document.msExitFullscreen();
//       } else if (document.mozCancelFullScreen) {
//         document.mozCancelFullScreen();
//       } else if (document.webkitExitFullscreen) {
//         document.webkitExitFullscreen();
//       }
//     }
//   };

//   return (
//     <>
//       <div className="header">
//         <div className="header-left active">
//           <Link to={route.dashboard} className="logo logo-normal">
//             <ImageWithBasePath src="assets/img/logo.png" alt="" />
//           </Link>
//           <Link to={route.dashboard} className="logo logo-white">
//             <ImageWithBasePath src="assets/img/logo-white.png" alt="" />
//           </Link>
//           <Link to={route.dashboard} className="logo-small">
//             <ImageWithBasePath src="assets/img/logo-small.png" alt="" />
//           </Link>
//           <Link
//             id="toggle_btn"
//             to="#"
//             style={{
//               display: pathname.includes("tasks")
//                 ? "none"
//                 : pathname.includes("compose")
//                 ? "none"
//                 : "",
//             }}
//             onClick={handlesidebar}
//           >
//             <FeatherIcon icon="chevrons-left" className="feather-16" />
//           </Link>
//         </div>

//         <Link
//           id="mobile_btn"
//           className="mobile_btn"
//           to="#sidebar"
//           onClick={sidebarOverlay}
//         >
//           <span className="bar-icon">
//             <span />
//             <span />
//             <span />
//           </span>
//         </Link>

//         <ul className="nav user-menu">
//           {/* Dynamic Search */}
//           <li className="nav-item nav-searchinputs">
//             <div className="top-nav-search">
//               <Link to="#" className="responsive-search">
//                 <Search />
//               </Link>
//               <form>
//                 <div className="searchinputs">
//                   <input
//                     type="text"
//                     placeholder="Search products, customers..."
//                     value={searchQuery}
//                     onChange={handleSearchChange}
//                     onFocus={() => setShowSearchResults(true)}
//                   />
//                   <div className="search-addon">
//                     {searchQuery && (
//                       <span onClick={handleClearSearch} style={{ cursor: "pointer" }}>
//                         <XCircle className="feather-14" />
//                       </span>
//                     )}
//                   </div>
//                 </div>
//                 <Link className="btn" id="searchdiv">
//                   <Search className="feather-16" />
//                 </Link>
//               </form>
              
//               {/* Search Results Dropdown */}
//               {showSearchResults && searchQuery && (
//                 <div 
//                   className="search-dropdown"
//                   style={{
//                     position: "absolute",
//                     top: "100%",
//                     left: 0,
//                     right: 0,
//                     backgroundColor: "white",
//                     border: "1px solid #ddd",
//                     borderRadius: "4px",
//                     maxHeight: "400px",
//                     overflowY: "auto",
//                     zIndex: 1000,
//                     marginTop: "5px",
//                     boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
//                   }}
//                 >
//                   {isSearching ? (
//                     <div style={{ padding: "20px", textAlign: "center" }}>
//                       <span>Searching...</span>
//                     </div>
//                   ) : (
//                     <>
//                       {searchResults.products.length > 0 && (
//                         <div style={{ padding: "10px" }}>
//                           <h6 style={{ marginBottom: "10px", fontWeight: "600" }}>Products</h6>
//                           {searchResults.products.slice(0, 5).map((product) => (
//                             <Link
//                               key={product.id}
//                               to={`/products/${product.id}`}
//                               style={{
//                                 display: "block",
//                                 padding: "8px",
//                                 borderBottom: "1px solid #f0f0f0",
//                                 color: "#333",
//                                 textDecoration: "none"
//                               }}
//                               onClick={() => setShowSearchResults(false)}
//                             >
//                               {product.name || product.title}
//                             </Link>
//                           ))}
//                         </div>
//                       )}

//                       {searchResults.customers.length > 0 && (
//                         <div style={{ padding: "10px" }}>
//                           <h6 style={{ marginBottom: "10px", fontWeight: "600" }}>Customers</h6>
//                           {searchResults.customers.slice(0, 5).map((customer) => (
//                             <Link
//                               key={customer.id}
//                               to={`/customers/${customer.id}`}
//                               style={{
//                                 display: "block",
//                                 padding: "8px",
//                                 borderBottom: "1px solid #f0f0f0",
//                                 color: "#333",
//                                 textDecoration: "none"
//                               }}
//                               onClick={() => setShowSearchResults(false)}
//                             >
//                               {customer.name}
//                             </Link>
//                           ))}
//                         </div>
//                       )}

//                       {searchResults.products.length === 0 && 
//                        searchResults.customers.length === 0 && (
//                         <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>
//                           No results found for "{searchQuery}"
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>
//           </li>

//           {/* Dynamic Warehouse Select */}
//           <li className="nav-item dropdown has-arrow main-drop select-store-dropdown">
//             <Link
//               to="#"
//               className="dropdown-toggle nav-link select-store"
//               data-bs-toggle="dropdown"
//             >
//               <span className="user-info">
//                 <span className="user-letter">
//                   <ImageWithBasePath
//                     src="assets/img/store/store-01.png"
//                     alt="Store Logo"
//                     className="img-fluid"
//                   />
//                 </span>
//                 <span className="user-detail">
//                   <span className="user-name">
//                     {selectedWarehouse ? selectedWarehouse.name : "Select Warehouse"}
//                   </span>
//                 </span>
//               </span>
//             </Link>
//             <div className="dropdown-menu dropdown-menu-right">
//               {loadingWarehouses ? (
//                 <Link to="#" className="dropdown-item">
//                   Loading...
//                 </Link>
//               ) : warehouses.length > 0 ? (
//                 warehouses.map((warehouse) => (
//                   <Link
//                     key={warehouse.id}
//                     to="#"
//                     className="dropdown-item"
//                     onClick={() => handleWarehouseChange(warehouse)}
//                   >
//                     <ImageWithBasePath
//                       src="assets/img/store/store-01.png"
//                       alt=""
//                       className="img-fluid"
//                     />
//                     {warehouse.name}
//                   </Link>
//                 ))
//               ) : (
//                 <Link to="#" className="dropdown-item">
//                   No warehouses available
//                 </Link>
//               )}
//             </div>
//           </li>

//           {/* Dynamic Language/Country Select */}
//           <li className="nav-item dropdown has-arrow flag-nav nav-item-box">
//             <Link
//               className="nav-link dropdown-toggle"
//               data-bs-toggle="dropdown"
//               to="#"
//               role="button"
//             >
//               <ImageWithBasePath
//                 src={`assets/img/flags/${selectedLanguage.flag}`}
//                 alt="Language"
//                 height={16}
//               />
//             </Link>
//             <div className="dropdown-menu dropdown-menu-right">
//               {countries.map((country) => (
//                 <Link
//                   key={country.code}
//                   to="#"
//                   className="dropdown-item"
//                   onClick={() => handleLanguageChange(country)}
//                 >
//                   <ImageWithBasePath
//                     src={`assets/img/flags/${country.flag}`}
//                     alt={country.name}
//                     height={16}
//                   />
//                   {country.name}
//                 </Link>
//               ))}
//             </div>
//           </li>

//           {/* Fullscreen */}
//           <li className="nav-item nav-item-box">
//             <Link
//               to="#"
//               id="btnFullscreen"
//               onClick={() => toggleFullscreen()}
//               className={isFullscreen ? "Exit Fullscreen" : "Go Fullscreen"}
//             >
//               <FeatherIcon icon={isFullscreen ? "minimize" : "maximize"} />
//             </Link>
//           </li>

//           {/* Notifications */}
//           <li className="nav-item dropdown nav-item-box">
//             <Link
//               to="#"
//               className="dropdown-toggle nav-link"
//               data-bs-toggle="dropdown"
//             >
//               <FeatherIcon icon="bell" />
//               <span className="badge rounded-pill">2</span>
//             </Link>
//             <div className="dropdown-menu notifications">
//               <div className="topnav-dropdown-header">
//                 <span className="notification-title">Notifications</span>
//                 <Link to="#" className="clear-noti">
//                   Clear All
//                 </Link>
//               </div>
//               <div className="noti-content">
//                 <ul className="notification-list">
//                   <li className="notification-message">
//                     <Link to={route.activities}>
//                       <div className="media d-flex">
//                         <span className="avatar flex-shrink-0">
//                           <ImageWithBasePath
//                             alt=""
//                             src="assets/img/profiles/avatar-02.jpg"
//                           />
//                         </span>
//                         <div className="media-body flex-grow-1">
//                           <p className="noti-details">
//                             <span className="noti-title">John Doe</span> added
//                             new task
//                             <span className="noti-title">
//                               Patient appointment booking
//                             </span>
//                           </p>
//                           <p className="noti-time">
//                             <span className="notification-time">4 mins ago</span>
//                           </p>
//                         </div>
//                       </div>
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//               <div className="topnav-dropdown-footer">
//                 <Link to={route.activities}>View all Notifications</Link>
//               </div>
//             </div>
//           </li>

//           {/* User Profile */}
//           <li className="nav-item dropdown has-arrow main-drop">
//             <Link
//               to="#"
//               className="dropdown-toggle nav-link userset"
//               data-bs-toggle="dropdown"
//             >
//               <span className="user-info">
//                 <span className="user-letter">
//                   <ImageWithBasePath
//                     src="assets/img/profiles/avator1.jpg"
//                     alt=""
//                     className="img-fluid"
//                   />
//                 </span>
//                 <span className="user-detail">
//                   <span className="user-name">{user?.name || "Guest"}</span>
//                   <span className="user-role">{user?.role || "User"}</span>
//                 </span>
//               </span>
//             </Link>
//             <div className="dropdown-menu menu-drop-user">
//               <div className="profilename">
//                 <div className="profileset">
//                   <span className="user-img">
//                     <ImageWithBasePath
//                       src="assets/img/profiles/avator1.jpg"
//                       alt=""
//                     />
//                     <span className="status online" />
//                   </span>
//                   <div className="profilesets">
//                     <h6>{user?.name || "Guest"}</h6>
//                     <h5>{user?.role || "User"}</h5>
//                   </div>
//                 </div>
//                 <hr className="m-0" />
//                 <Link className="dropdown-item" to={route.profile}>
//                   <FeatherIcon icon="user" className="me-2" />
//                   My Profile
//                 </Link>
//                 <Link className="dropdown-item" to={route.generalsettings}>
//                   <FeatherIcon icon="settings" className="me-2" />
//                   Settings
//                 </Link>
//                 <hr className="m-0" />
//                 <Link
//                   className="dropdown-item logout pb-0"
//                   to="#"
//                   onClick={handleLogout}
//                 >
//                   <ImageWithBasePath
//                     src="assets/img/icons/log-out.svg"
//                     className="me-2"
//                     alt="img"
//                   />
//                   Logout
//                 </Link>
//               </div>
//             </div>
//           </li>
//         </ul>

//         {/* Mobile Menu */}
//         <div className="dropdown mobile-user-menu">
//           <Link
//             to="#"
//             className="nav-link dropdown-toggle"
//             data-bs-toggle="dropdown"
//             aria-expanded="false"
//           >
//             <i className="fa fa-ellipsis-v" />
//           </Link>
//           <div className="dropdown-menu dropdown-menu-right">
//             <Link className="dropdown-item" to={route.profile}>
//               My Profile
//             </Link>
//             <Link className="dropdown-item" to={route.generalsettings}>
//               Settings
//             </Link>
//             <Link className="dropdown-item" to="#" onClick={handleLogout}>
//               Logout
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Header;