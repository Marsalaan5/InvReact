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
          <li className="nav-item dropdown has-arrow main-drop select-store-dropdown">
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
                  <span className="user-name">Select Store</span>
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
          </li>
          {/* /Select Store */}

          {/* Flag */}
          <li className="nav-item dropdown has-arrow flag-nav nav-item-box">
            <Link
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              to="#"
              role="button"
            >
              {/* <i data-feather="globe" /> */}
              {/* <FeatherIcon icon="globe" /> */}
              <ImageWithBasePath
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
          </li>
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



