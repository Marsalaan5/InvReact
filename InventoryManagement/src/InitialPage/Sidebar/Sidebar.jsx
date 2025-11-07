// import React, { useState } from "react";
// import Scrollbars from "react-custom-scrollbars-2";
// // import { useSelector } from "react-redux";
// import { Link, useLocation } from "react-router-dom";
// import { SidebarData } from "../../core/json/siderbar_data";
// import HorizontalSidebar from "./horizontalSidebar";
// import CollapsedSidebar from "./collapsedSidebar";

// const Sidebar = () => {
//   // const SidebarData = useSelector((state) => state.sidebar_data);
//   // console.log(sidebarData, "sidebar");

//   const Location = useLocation();

//   console.log("Location.pathname", Location.pathname);

//   const [subOpen, setSubopen] = useState("");
//   const [subsidebar, setSubsidebar] = useState("");

//   const toggleSidebar = (title) => {
//     if (title == subOpen) {
//       setSubopen("");
//     } else {
//       setSubopen(title);
//     }
//   };

//   const toggleSubsidebar = (subitem) => {
//     if (subitem == subsidebar) {
//       setSubsidebar("");
//     } else {
//       setSubsidebar(subitem);
//     }
//   };

//   return (
//     <div>
//       <div className="sidebar" id="sidebar">
//         <Scrollbars>
//           <div className="sidebar-inner slimscroll">
//             <div id="sidebar-menu" className="sidebar-menu">
//               <ul>
//                 {SidebarData?.map((mainLabel, index) => (
//                   <li className="submenu-open" key={index}>
//                     <h6 className="submenu-hdr">{mainLabel?.label}</h6>

//                     <ul>
//                       {mainLabel?.submenuItems?.map((title, i) => {
//                         let link_array = [];
//                         title?.submenuItems?.map((link) => {
//                           link_array?.push(link?.link);
//                           if (link?.submenu) {
//                             link?.submenuItems?.map((item) => {
//                               link_array?.push(item?.link);
//                             });
//                           }
//                           return link_array;
//                         });
//                         title.links = link_array;
//                         return (
//                           <>
//                             <li className="submenu" key={i}>
//                               <Link
//                                 to={title?.link}
//                                 onClick={() => toggleSidebar(title?.label)}
//                                 className={`${
//                                   subOpen == title?.label ? "subdrop" : ""
//                                 } ${
//                                   title?.links?.includes(Location.pathname)
//                                     ? "active"
//                                     : ""
//                                 }
//                             `}
//                               >
//                                 {/* <Grid /> */}
//                                 {title?.icon}
//                                 <span>{title?.label}</span>
//                                 <span
//                                   className={title?.submenu ? "menu-arrow" : ""}
//                                 />
//                               </Link>
//                               <ul
//                                 style={{
//                                   display:
//                                     subOpen == title?.label ? "block" : "none",
//                                 }}
//                               >
//                                 {title?.submenuItems?.map(
//                                   (item, titleIndex) => (
//                                     <li
//                                       className="submenu submenu-two"
//                                       key={titleIndex}
//                                     >
//                                       {/* {item.lebel} */}
//                                       <Link
//                                         to={item?.link}
//                                         className={
//                                           item?.submenuItems
//                                             ?.map((link) => link?.link)
//                                             .includes(Location.pathname) ||
//                                           item?.link == Location.pathname
//                                             ? "active"
//                                             : ""
//                                         }
//                                         onClick={() => {
//                                           toggleSubsidebar(item?.label);
//                                         }}
//                                       >
//                                         {item?.label}
//                                         <span
//                                           className={
//                                             item?.submenu ? "menu-arrow" : ""
//                                           }
//                                         />
//                                       </Link>
//                                       <ul
//                                         style={{
//                                           display:
//                                             subsidebar == item?.label
//                                               ? "block"
//                                               : "none",
//                                         }}
//                                       >
//                                         {item?.submenuItems?.map(
//                                           (items, titleIndex) => (
//                                             <li key={titleIndex}>
//                                               {/* {item.lebel} */}
//                                               <Link
//                                                 to={items?.link}
//                                                 className={`${
//                                                   subsidebar == items?.label
//                                                     ? "submenu-two subdrop"
//                                                     : "submenu-two"
//                                                 } ${
//                                                   items?.submenuItems
//                                                     ?.map((link) => link.link)
//                                                     .includes(
//                                                       Location.pathname
//                                                     ) ||
//                                                   items?.link ==
//                                                     Location.pathname
//                                                     ? "active"
//                                                     : ""
//                                                 }`}
//                                               >
//                                                 {items?.label}
//                                               </Link>
//                                             </li>
//                                           )
//                                         )}
//                                       </ul>
//                                     </li>
//                                   )
//                                 )}
//                               </ul>
//                             </li>
//                           </>
//                         );
//                       })}
//                     </ul>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </Scrollbars>
//       </div>
//       <HorizontalSidebar />
//       <CollapsedSidebar />
//     </div>
//   );
// };

// export default Sidebar;




// // src/InitialPage/Sidebar/Sidebar.jsx
// import React, { useState } from "react";
// import Scrollbars from "react-custom-scrollbars-2";
// import { useSelector } from "react-redux";
// import { Link, useLocation } from "react-router-dom";
// // import { fetchMenu } from "../../core/redux/slices/menuSlice";
// import FeatherIcon from "feather-icons-react";
// import HorizontalSidebar from "./horizontalSidebar";
// import CollapsedSidebar from "./collapsedSidebar";

// const Sidebar = () => {
//   // const dispatch = useDispatch();
//   const location = useLocation();
  
//   const { items: sidebarData, loading } = useSelector((state) => state.menu);
//   // const { user } = useSelector((state) => state.auth);

//   const [subOpen, setSubopen] = useState("");
//   const [subsidebar, setSubsidebar] = useState("");

//   // Fetch menu on component mount
//   // useEffect(() => {
//   //   if (user) {
//   //     dispatch(fetchMenu());
//   //   }
//   // }, [dispatch, user]);

//   const toggleSidebar = (title) => {
//     setSubopen(subOpen === title ? "" : title);
//   };

//   const toggleSubsidebar = (subitem) => {
//     setSubsidebar(subsidebar === subitem ? "" : subitem);
//   };

//   // Render icon based on icon name
//   const renderIcon = (iconName) => {
//     if (!iconName) return null;
//     return <FeatherIcon icon={iconName} />;
//   };

//   // Check if current path matches menu item
//   const isActive = (item) => {
//     if (item.path === location.pathname) return true;
//     if (item.submenuItems) {
//       return item.submenuItems.some(sub => isActive(sub));
//     }
//     return false;
//   };

//   if (loading) {
//     return <div className="sidebar">Loading menu...</div>;
//   }

//   return (
//     <div>
//       <div className="sidebar" id="sidebar">
//         <Scrollbars>
//           <div className="sidebar-inner slimscroll">
//             <div id="sidebar-menu" className="sidebar-menu">
//               <ul>
//                 {sidebarData?.map((mainLabel, index) => (
//                   <li className="submenu-open" key={index}>
//                     {/* Only show label if it's a parent menu */}
//                     {!mainLabel.path && <h6 className="submenu-hdr">{mainLabel.title}</h6>}

//                     <ul>
//                       {mainLabel?.submenuItems?.map((title, i) => (
//                         <li className="submenu" key={i}>
//                           <Link
//                             to={title?.path || "#"}
//                             onClick={() => title.submenuItems && toggleSidebar(title?.title)}
//                             className={`${subOpen === title?.title ? "subdrop" : ""} ${
//                               isActive(title) ? "active" : ""
//                             }`}
//                           >
//                             {renderIcon(title?.icon)}
//                             <span>{title?.title}</span>
//                             {title?.submenuItems && <span className="menu-arrow" />}
//                           </Link>

//                           {title?.submenuItems && (
//                             <ul
//                               style={{
//                                 display: subOpen === title?.title ? "block" : "none",
//                               }}
//                             >
//                               {title.submenuItems.map((item, titleIndex) => (
//                                 <li
//                                   className={`submenu submenu-two ${
//                                     item.submenuItems ? "" : ""
//                                   }`}
//                                   key={titleIndex}
//                                 >
//                                   <Link
//                                     to={item?.path || "#"}
//                                     className={`${
//                                       item?.path === location.pathname ? "active" : ""
//                                     }`}
//                                     onClick={() => {
//                                       if (item.submenuItems) {
//                                         toggleSubsidebar(item?.title);
//                                       }
//                                     }}
//                                   >
//                                     {item?.title}
//                                     {item?.submenuItems && <span className="menu-arrow" />}
//                                   </Link>

//                                   {item?.submenuItems && (
//                                     <ul
//                                       style={{
//                                         display:
//                                           subsidebar === item?.title ? "block" : "none",
//                                       }}
//                                     >
//                                       {item.submenuItems.map((subItem, subIndex) => (
//                                         <li key={subIndex}>
//                                           <Link
//                                             to={subItem?.path || "#"}
//                                             className={`${
//                                               subItem?.path === location.pathname
//                                                 ? "active"
//                                                 : ""
//                                             }`}
//                                           >
//                                             {subItem?.title}
//                                           </Link>
//                                         </li>
//                                       ))}
//                                     </ul>
//                                   )}
//                                 </li>
//                               ))}
//                             </ul>
//                           )}
//                         </li>
//                       ))}
//                     </ul>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </Scrollbars>
//       </div>
//       <HorizontalSidebar />
//       <CollapsedSidebar />
//     </div>
//   );
// };

// export default Sidebar;



// // src/InitialPage/Sidebar/Sidebar.jsx
// import React, { useState} from "react";
// import Scrollbars from "react-custom-scrollbars-2";
// import { useSelector } from "react-redux";
// import { Link, useLocation } from "react-router-dom";
// // import { fetchMenu } from "../../core/redux/slices/menuSlice";
// import getIconComponent from "../../utils/iconMapper"; 
// import HorizontalSidebar from "./horizontalSidebar";
// import CollapsedSidebar from "./collapsedSidebar";

// const Sidebar = () => {
//   // const dispatch = useDispatch();
//   const location = useLocation();
  
//   const { items: sidebarData, loading } = useSelector((state) => state.menu);
//   // const { user } = useSelector((state) => state.auth);

//   const [subOpen, setSubopen] = useState("");
//   const [subsidebar, setSubsidebar] = useState("");


//   // useEffect(() => {
//   //   if (user) {
//   //     dispatch(fetchMenu());
//   //   }
//   // }, [dispatch, user]);

//   const toggleSidebar = (title) => {
//     setSubopen(subOpen === title ? "" : title);
//   };

//   const toggleSubsidebar = (subitem) => {
//     setSubsidebar(subsidebar === subitem ? "" : subitem);
//   };


//   const renderIcon = (iconName) => {
//     if (!iconName) return null;
//     return getIconComponent(iconName);
//   };

//   // Check if current path matches menu item
//   const isActive = (item) => {
//     if (item.path === location.pathname) return true;
//     if (item.submenuItems) {
//       return item.submenuItems.some(sub => isActive(sub));
//     }
//     return false;
//   };

//   if (loading) {
//     return <div className="sidebar">Loading menu...</div>;
//   }

//   return (
//     <div>
//       <div className="sidebar" id="sidebar">
//         <Scrollbars>
//           <div className="sidebar-inner slimscroll">
//             <div id="sidebar-menu" className="sidebar-menu">
//               <ul>
//                 {sidebarData?.map((mainLabel, index) => (
//                   <li className="submenu-open" key={index}>
//                     {/* Show header for section menus */}
//                     {mainLabel.submenu_hdr && (
//                       <h6 className="submenu-hdr">{mainLabel.submenu_hdr}</h6>
//                     )}

//                     <ul>
//                       {mainLabel?.submenuItems?.map((title, i) => (
//                         <li className="submenu" key={i}>
//                           <Link
//                             to={title?.path || "#"}
//                             onClick={() => title.submenuItems && toggleSidebar(title?.title)}
//                             className={`${subOpen === title?.title ? "subdrop" : ""} ${
//                               isActive(title) ? "active" : ""
//                             }`}
//                           >
                            
//                             {renderIcon(title?.icon)}
//                             <span>{title?.label || title?.title}</span>
//                             {title?.submenuItems && title.submenuItems.length > 0 && (
//                               <span className="menu-arrow" />
//                             )}
//                           </Link>

//                           {title?.submenuItems && title.submenuItems.length > 0 && (
//                             <ul
//                               style={{
//                                 display: subOpen === title?.title ? "block" : "none",
//                               }}
//                             >
//                               {title.submenuItems.map((item, titleIndex) => (
//                                 <li
//                                   className="submenu submenu-two"
//                                   key={titleIndex}
//                                 >
//                                   <Link
//                                     to={item?.path || "#"}
//                                     className={`${
//                                       item?.path === location.pathname ? "active" : ""
//                                     }`}
//                                     onClick={() => {
//                                       if (item.submenuItems && item.submenuItems.length > 0) {
//                                         toggleSubsidebar(item?.title);
//                                       }
//                                     }}
//                                   >
//                                     {item?.label || item?.title}
//                                     {item?.submenuItems && item.submenuItems.length > 0 && (
//                                       <span className="menu-arrow" />
//                                     )}
//                                   </Link>

//                                   {item?.submenuItems && item.submenuItems.length > 0 && (
//                                     <ul
//                                       style={{
//                                         display:
//                                           subsidebar === item?.title ? "block" : "none",
//                                       }}
//                                     >
//                                       {item.submenuItems.map((subItem, subIndex) => (
//                                         <li key={subIndex}>
//                                           <Link
//                                             to={subItem?.path || "#"}
//                                             className={`${
//                                               subItem?.path === location.pathname
//                                                 ? "active"
//                                                 : ""
//                                             }`}
//                                           >
//                                             {subItem?.label || subItem?.title}
//                                           </Link>
//                                         </li>
//                                       ))}
//                                     </ul>
//                                   )}
//                                 </li>
//                               ))}
//                             </ul>
//                           )}
//                         </li>
//                       ))}
//                     </ul>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </Scrollbars>
//       </div>
//       <HorizontalSidebar />
//       <CollapsedSidebar />
//     </div>
//   );
// };

// export default Sidebar;




// src/InitialPage/Sidebar/Sidebar.jsx
import React, { useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import getIconComponent from "../../utils/iconMapper"; 
import HorizontalSidebar from "./horizontalSidebar";
import CollapsedSidebar from "./collapsedSidebar";

const Sidebar = () => {
  const location = useLocation();
  
  const { items: sidebarData, loading } = useSelector((state) => state.menu);

  const [subOpen, setSubopen] = useState("");
  const [subsidebar, setSubsidebar] = useState("");

  const toggleSidebar = (title) => {
    setSubopen(subOpen === title ? "" : title);
  };

  const toggleSubsidebar = (subitem) => {
    setSubsidebar(subsidebar === subitem ? "" : subitem);
  };

  const renderIcon = (iconName) => {
    if (!iconName) return null;
    return getIconComponent(iconName);
  };

  // Check if current path matches menu item
  const isActive = (item) => {
    if (item.path === location.pathname) return true;
    if (item.submenuItems) {
      return item.submenuItems.some(sub => isActive(sub));
    }
    return false;
  };

  if (loading) {
    return <div className="sidebar">Loading menu...</div>;
  }

  return (
    <div>
      <div className="sidebar" id="sidebar">
        <Scrollbars>
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                {sidebarData?.map((mainLabel, index) => (
                  <li className="submenu-open" key={index}>
                    {/* Show header for section menus */}
                    {mainLabel.submenu_hdr && (
                      <h6 className="submenu-hdr">{mainLabel.submenu_hdr}</h6>
                    )}

                    <ul>
                      {mainLabel?.submenuItems?.map((title, i) => (
                        <li className="submenu" key={i}>
                          <Link
                            to={title?.path || "#"}
                            onClick={() => title.submenuItems && toggleSidebar(title?.title)}
                            className={`${subOpen === title?.title ? "subdrop" : ""} ${
                              isActive(title) ? "active" : ""
                            }`}
                          >
                       
                            {renderIcon(title?.icon)}
                            <span>{title?.label || title?.title}</span>
                            {title?.submenuItems && title.submenuItems.length > 0 && (
                              <span className="menu-arrow" />
                            )}
                          </Link>

                          {/* Second Level Submenu */}
                          {title?.submenuItems && title.submenuItems.length > 0 && (
                            <ul
                              style={{
                                display: subOpen === title?.title ? "block" : "none",
                              }}
                            >
                              {title.submenuItems.map((item, titleIndex) => (
                                <li
                                  className="submenu submenu-two"
                                  key={titleIndex}
                                >
                                  <Link
                                    to={item?.path || "#"}
                                    className={`${
                                      item?.path === location.pathname ? "active" : ""
                                    } ${item?.icon ? "has-icon" : ""}`}
                                    onClick={() => {
                                      if (item.submenuItems && item.submenuItems.length > 0) {
                                        toggleSubsidebar(item?.title);
                                      }
                                    }}
                                  >
                                   
                                    {renderIcon(item?.icon)}
                                    <span>{item?.label || item?.title}</span>
                                    {item?.submenuItems && item.submenuItems.length > 0 && (
                                      <span className="menu-arrow" />
                                    )}
                                  </Link>

                                  {/* Third Level Submenu */}
                                  {item?.submenuItems && item.submenuItems.length > 0 && (
                                    <ul
                                      style={{
                                        display:
                                          subsidebar === item?.title ? "block" : "none",
                                      }}
                                    >
                                      {item.submenuItems.map((subItem, subIndex) => (
                                        <li key={subIndex}>
                                          <Link
                                            to={subItem?.path || "#"}
                                            className={`${
                                              subItem?.path === location.pathname
                                                ? "active"
                                                : ""
                                            } ${subItem?.icon ? "has-icon" : ""}`}
                                          >
                                         
                                            {renderIcon(subItem?.icon)}
                                            <span>{subItem?.label || subItem?.title}</span>
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Scrollbars>
      </div>
      <HorizontalSidebar />
      <CollapsedSidebar />
    </div>
  );
};

export default Sidebar;