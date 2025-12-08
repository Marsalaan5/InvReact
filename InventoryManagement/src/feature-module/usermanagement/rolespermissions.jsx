// import React, { useState } from "react";
// import { OverlayTrigger, Tooltip } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import ImageWithBasePath from "../../core/img/imagewithbasebath";
// import { Link } from "react-router-dom";
// import { ChevronUp, RotateCcw } from "feather-icons-react/build/IconComponents";
// import { setToogleHeader } from "../../core/redux/action";
// import { Filter, PlusCircle, Sliders, Zap } from "react-feather";
// import Select from "react-select";
// import { DatePicker } from "antd";
// import withReactContent from "sweetalert2-react-content";
// import Swal from "sweetalert2";
// import Table from "../../core/pagination/datatable";
// import AddRole from "../../core/modals/usermanagement/addrole";
// import EditRole from "../../core/modals/usermanagement/editrole";
// import { all_routes } from "../../Router/all_routes";
// // import { all_routes } from "../../Router/all_routes";

// const RolesPermissions = () => {
//   const route = all_routes;
//   const data = useSelector((state) => state.toggle_header);
//   const dataSource = useSelector((state) => state.rolesandpermission_data);

//   const dispatch = useDispatch();
//   const [isFilterVisible, setIsFilterVisible] = useState(false);
//   const toggleFilterVisibility = () => {
//     setIsFilterVisible((prevVisibility) => !prevVisibility);
//   };
//   const oldandlatestvalue = [
//     { value: "date", label: "Sort by Date" },
//     { value: "newest", label: "Newest" },
//     { value: "oldest", label: "Oldest" },
//   ];
//   const role = [
//     { value: "Choose Role", label: "ose Role" },
//     { value: "AcStore ", label: "AcStore" },
//     { value: "Admin", label: "Admin" },
//   ];
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };
//   const renderTooltip = (props) => (
//     <Tooltip id="pdf-tooltip" {...props}>
//       Pdf
//     </Tooltip>
//   );
//   const renderExcelTooltip = (props) => (
//     <Tooltip id="excel-tooltip" {...props}>
//       Excel
//     </Tooltip>
//   );
//   const renderPrinterTooltip = (props) => (
//     <Tooltip id="printer-tooltip" {...props}>
//       Printer
//     </Tooltip>
//   );
//   const renderRefreshTooltip = (props) => (
//     <Tooltip id="refresh-tooltip" {...props}>
//       Refresh
//     </Tooltip>
//   );
//   const renderCollapseTooltip = (props) => (
//     <Tooltip id="refresh-tooltip" {...props}>
//       Collapse
//     </Tooltip>
//   );
//   const columns = [
//     {
//       title: "Role Name",
//       dataIndex: "rolename",
//       sorter: (a, b) => a.rolename.length - b.rolename.length,
//     },
//     {
//       title: "Created On",
//       dataIndex: "createdon",
//       sorter: (a, b) => a.createdon.length - b.createdon.length,
//     },

//     {
//       title: "Actions",
//       dataIndex: "actions",
//       key: "actions",
//       render: () => (
//         <td className="action-table-data">
//           <div className="edit-delete-action">
//             <Link
//               className="me-2 p-2"
//               to="#"
//               data-bs-toggle="modal"
//               data-bs-target="#edit-units"
//             >
//               <i data-feather="edit" className="feather-edit"></i>
//             </Link>
//             <Link className="me-2 p-2" to={route.permissions}>
//               <i
//                 data-feather="sheild"
//                 className="feather feather-shield shield"
//               ></i>
//             </Link>
//             <Link className="confirm-text p-2" to="#">
//               <i
//                 data-feather="trash-2"
//                 className="feather-trash-2"
//                 onClick={showConfirmationAlert}
//               ></i>
//             </Link>
//           </div>
//         </td>
//       ),
//     },
//   ];

//   const MySwal = withReactContent(Swal);

//   const showConfirmationAlert = () => {
//     MySwal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       showCancelButton: true,
//       confirmButtonColor: "#00ff00",
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonColor: "#ff0000",
//       cancelButtonText: "Cancel",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         MySwal.fire({
//           title: "Deleted!",
//           text: "Your file has been deleted.",
//           className: "btn btn-success",
//           confirmButtonText: "OK",
//           customClass: {
//             confirmButton: "btn btn-success",
//           },
//         });
//       } else {
//         MySwal.close();
//       }
//     });
//   };
//   return (
//     <div>
//       <div className="page-wrapper">
//         <div className="content">
//           <div className="page-header">
//             <div className="add-item d-flex">
//               <div className="page-title">
//                 <h4>Roles &amp; Permission</h4>
//                 <h6>Manage your roles</h6>
//               </div>
//             </div>
//             <ul className="table-top-head">
//               <li>
//                 <OverlayTrigger placement="top" overlay={renderTooltip}>
//                   <Link>
//                     <ImageWithBasePath
//                       src="assets/img/icons/pdf.svg"
//                       alt="img"
//                     />
//                   </Link>
//                 </OverlayTrigger>
//               </li>
//               <li>
//                 <OverlayTrigger placement="top" overlay={renderExcelTooltip}>
//                   <Link data-bs-toggle="tooltip" data-bs-placement="top">
//                     <ImageWithBasePath
//                       src="assets/img/icons/excel.svg"
//                       alt="img"
//                     />
//                   </Link>
//                 </OverlayTrigger>
//               </li>
//               <li>
//                 <OverlayTrigger placement="top" overlay={renderPrinterTooltip}>
//                   <Link data-bs-toggle="tooltip" data-bs-placement="top">
//                     <i data-feather="printer" className="feather-printer" />
//                   </Link>
//                 </OverlayTrigger>
//               </li>
//               <li>
//                 <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
//                   <Link data-bs-toggle="tooltip" data-bs-placement="top">
//                     <RotateCcw />
//                   </Link>
//                 </OverlayTrigger>
//               </li>
//               <li>
//                 <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
//                   <Link
//                     data-bs-toggle="tooltip"
//                     data-bs-placement="top"
//                     id="collapse-header"
//                     className={data ? "active" : ""}
//                     onClick={() => {
//                       dispatch(setToogleHeader(!data));
//                     }}
//                   >
//                     <ChevronUp />
//                   </Link>
//                 </OverlayTrigger>
//               </li>
//             </ul>
//             <div className="page-btn">
//               <a
//                 to="#"
//                 className="btn btn-added"
//                 data-bs-toggle="modal"
//                 data-bs-target="#add-units"
//               >
//                 <PlusCircle className="me-2" />
//                 Add New Role
//               </a>
//             </div>
//           </div>
//           {/* /product list */}
//           <div className="card table-list-card">
//             <div className="card-body">
//               <div className="table-top">
//                 <div className="search-input">
//                   <input
//                     type="text"
//                     placeholder="Search"
//                     className="form-control form-control-sm formsearch"
//                   />
//                   <Link to className="btn btn-searchset">
//                     <i data-feather="search" className="feather-search" />
//                   </Link>
//                 </div>
//                 <div className="search-path">
//                   <Link
//                     className={`btn btn-filter ${
//                       isFilterVisible ? "setclose" : ""
//                     }`}
//                     id="filter_search"
//                   >
//                     <Filter
//                       className="filter-icon"
//                       onClick={toggleFilterVisibility}
//                     />
//                     <span onClick={toggleFilterVisibility}>
//                       <ImageWithBasePath
//                         src="assets/img/icons/closes.svg"
//                         alt="img"
//                       />
//                     </span>
//                   </Link>
//                 </div>
//                 <div className="form-sort">
//                   <Sliders className="info-img" />
//                   <Select
//                     className="select"
//                     options={oldandlatestvalue}
//                     placeholder="Newest"
//                   />
//                 </div>
//               </div>
//               {/* /Filter */}
//               <div
//                 className={`card${isFilterVisible ? " visible" : ""}`}
//                 id="filter_inputs"
//                 style={{ display: isFilterVisible ? "block" : "none" }}
//               >
//                 <div className="card-body pb-0">
//                   <div className="row">
//                     <div className="col-lg-3 col-sm-6 col-12">
//                       <div className="input-blocks">
//                         <Zap className="info-img" />
//                         <Select
//                           className="select"
//                           options={role}
//                           placeholder="Choose Role"
//                         />
//                       </div>
//                     </div>
//                     <div className="col-lg-3 col-sm-6 col-12">
//                       <div className="input-blocks">
//                         <i data-feather="calendar" className="info-img" />
//                         <div className="input-groupicon">
//                           <DatePicker
//                             selected={selectedDate}
//                             onChange={handleDateChange}
//                             type="date"
//                             className="filterdatepicker"
//                             dateFormat="dd-MM-yyyy"
//                             placeholder="Choose Date"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-lg-3 col-sm-6 col-12 ms-auto">
//                       <div className="input-blocks">
//                         <a className="btn btn-filters ms-auto">
//                           {" "}
//                           <i
//                             data-feather="search"
//                             className="feather-search"
//                           />{" "}
//                           Search{" "}
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {/* /Filter */}
//               <div className="table-responsive">
//                 <Table columns={columns} dataSource={dataSource} />
//               </div>
//             </div>
//           </div>
//           {/* /product list */}
//         </div>
//       </div>
//       <AddRole />
//       <EditRole />
//     </div>
//   );
// };

// export default RolesPermissions;






// import React, { useState, useEffect } from "react";
// import { OverlayTrigger, Tooltip } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import ImageWithBasePath from "../../core/img/imagewithbasebath";
// import { Link } from "react-router-dom";
// import { ChevronUp, RotateCcw } from "feather-icons-react/build/IconComponents";
// import { setToogleHeader } from "../../core/redux/action";
// import { Filter, PlusCircle, Sliders, Zap } from "react-feather";
// import Select from "react-select";
// import { DatePicker } from "antd";
// import withReactContent from "sweetalert2-react-content";
// import Swal from "sweetalert2";
// import Table from "../../core/pagination/datatable";
// import AddRole from "../../core/modals/usermanagement/addrole";
// import EditRole from "../../core/modals/usermanagement/editrole";
// import AuthService from "../../services/authService";
// import { all_routes } from "../../Router/all_routes";

// const RolesPermissions = () => {
//   const route = all_routes;
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const data = useSelector((state) => state.toggle_header);

//   // State management
//   const [roles, setRoles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isFilterVisible, setIsFilterVisible] = useState(false);
//   const [selectedRole, setSelectedRole] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null);

//   // Filter states
//   const [filters, setFilters] = useState({
//     search: '',
//     roleName: '',
//     sortBy: 'date'
//   });

//   // Check authentication
//   useEffect(() => {
//     const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//     if (!token || token === 'undefined' || token === 'null') {
//       navigate('/signin');
//     }
//   }, [navigate]);

//   // Fetch roles from API with their permissions
//   const fetchRoles = async () => {
//     setLoading(true);
//     try {
//       const response = await AuthService.getRoles();
//       const rolesData = response.data.roles || response.data || [];

//       console.log('Raw roles data:', rolesData);

//       // Process roles data and fetch permissions for each role
//       const processedRoles = await Promise.all(
//         rolesData.map(async (role) => {
//           let permissionCount = 0;
          
//           try {
//             // Fetch permissions for this specific role
//             const permResponse = await AuthService.getPermissionsByRole(role.id);
            
//             // Handle nested response format
//             let permissionsData = [];
//             if (permResponse.data && permResponse.data.data) {
//               permissionsData = permResponse.data.data;
//             } else if (permResponse.data && Array.isArray(permResponse.data)) {
//               permissionsData = permResponse.data;
//             } else if (Array.isArray(permResponse)) {
//               permissionsData = permResponse;
//             }

//             permissionCount = Array.isArray(permissionsData) ? permissionsData.length : 0;
            
//             console.log(`Role ${role.name} has ${permissionCount} permissions`);
//           } catch (error) {
//             console.error(`Error fetching permissions for role ${role.id}:`, error);
//             // If permission fetch fails, try to get count from role object
//             if (role.permission) {
//               if (Array.isArray(role.permission)) {
//                 permissionCount = role.permission.length;
//               } else if (typeof role.permission === 'object') {
//                 permissionCount = Object.keys(role.permission).length;
//               }
//             }
//           }

//           return {
//             ...role,
//             rolename: role.name,
//             createdon: new Date(role.created_at || role.createdAt || Date.now()).toLocaleDateString(),
//             permissionCount
//           };
//         })
//       );

//       console.log('Processed roles:', processedRoles);

//       // Apply filters
//       let filteredRoles = processedRoles;

//       // Search filter
//       if (filters.search) {
//         filteredRoles = filteredRoles.filter(role =>
//           role.name?.toLowerCase().includes(filters.search.toLowerCase())
//         );
//       }

//       // Role name filter
//       if (filters.roleName) {
//         filteredRoles = filteredRoles.filter(role =>
//           role.name?.toLowerCase() === filters.roleName.toLowerCase()
//         );
//       }

//       // Date filter
//       if (selectedDate) {
//         filteredRoles = filteredRoles.filter(role => {
//           const roleDate = new Date(role.created_at || role.createdAt);
//           const filterDate = new Date(selectedDate);
//           return roleDate.toDateString() === filterDate.toDateString();
//         });
//       }

//       // Sorting
//       if (filters.sortBy === 'newest') {
//         filteredRoles.sort((a, b) => new Date(b.created_at || b.createdAt) - new Date(a.created_at || a.createdAt));
//       } else if (filters.sortBy === 'oldest') {
//         filteredRoles.sort((a, b) => new Date(a.created_at || a.createdAt) - new Date(b.created_at || b.createdAt));
//       }

//       setRoles(filteredRoles);
//     } catch (error) {
//       console.error('Error fetching roles:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: error.response?.data?.message || error.response?.data?.error || 'Failed to fetch roles'
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initial fetch
//   useEffect(() => {
//     fetchRoles();
//   }, []);

//   // Refetch when filters change (debounced)
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       fetchRoles();
//     }, 500);
//     return () => clearTimeout(timeoutId);
//   }, [filters, selectedDate]);

//   const toggleFilterVisibility = () => {
//     setIsFilterVisible((prevVisibility) => !prevVisibility);
//   };

//   // Handle delete role
//   const handleDelete = async (roleId) => {
//     const MySwal = withReactContent(Swal);

//     MySwal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this! This will also delete all permissions associated with this role.",
//       showCancelButton: true,
//       confirmButtonColor: "#00ff00",
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonColor: "#ff0000",
//       cancelButtonText: "Cancel",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await AuthService.deleteRoleById(roleId);
//           MySwal.fire({
//             title: "Deleted!",
//             text: "Role has been deleted.",
//             icon: "success",
//             confirmButtonText: "OK",
//             customClass: {
//               confirmButton: "btn btn-success",
//             },
//           });
//           fetchRoles(); // Refresh list
//         } catch (error) {
//           console.error('Delete error:', error);
//           MySwal.fire({
//             icon: 'error',
//             title: 'Error',
//             text: error.response?.data?.message || error.response?.data?.error || 'Failed to delete role'
//           });
//         }
//       }
//     });
//   };

//   // Handle search
//   const handleSearch = (e) => {
//     setFilters(prev => ({ ...prev, search: e.target.value }));
//   };

//   // Handle filter change
//   const handleFilterChange = (field, value) => {
//     setFilters(prev => ({ ...prev, [field]: value }));
//   };

//   // Handle date change
//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   // Handle refresh
//   const handleRefresh = () => {
//     setFilters({
//       search: '',
//       roleName: '',
//       sortBy: 'date'
//     });
//     setSelectedDate(null);
//     fetchRoles();
//   };

//   // Handle edit role
//   const handleEdit = (role) => {
//     setSelectedRole(role);
//   };

//   // Prepare dropdown options
//   const sortOptions = [
//     { value: "date", label: "Sort by Date" },
//     { value: "newest", label: "Newest" },
//     { value: "oldest", label: "Oldest" },
//   ];

//   const roleOptions = [
//     { value: '', label: 'Choose Role' },
//     ...Array.from(new Set(roles.map(role => role.name)))
//       .map(name => ({ value: name, label: name }))
//   ];

//   // Tooltips
//   const renderTooltip = (props) => (
//     <Tooltip id="pdf-tooltip" {...props}>Pdf</Tooltip>
//   );
//   const renderExcelTooltip = (props) => (
//     <Tooltip id="excel-tooltip" {...props}>Excel</Tooltip>
//   );
//   const renderPrinterTooltip = (props) => (
//     <Tooltip id="printer-tooltip" {...props}>Printer</Tooltip>
//   );
//   const renderRefreshTooltip = (props) => (
//     <Tooltip id="refresh-tooltip" {...props}>Refresh</Tooltip>
//   );
//   const renderCollapseTooltip = (props) => (
//     <Tooltip id="collapse-tooltip" {...props}>Collapse</Tooltip>
//   );

//   // Table columns
//   const columns = [
//     {
//       title: "Role Name",
//       dataIndex: "rolename",
//       sorter: (a, b) => (a.rolename || '').localeCompare(b.rolename || ''),
//       render: (text, record) => (
//         <div>
//           <strong>{text}</strong>
//           <br />
//           <small className="text-muted">
//             {record.permissionCount} permission module{record.permissionCount !== 1 ? 's' : ''}
//           </small>
//         </div>
//       )
//     },
//     {
//       title: "Created On",
//       dataIndex: "createdon",
//       sorter: (a, b) => new Date(a.created_at || a.createdAt) - new Date(b.created_at || b.createdAt),
//     },
//     {
//       title: "Actions",
//       dataIndex: "actions",
//       key: "actions",
//       render: (_, record) => (
//         <td className="action-table-data">
//           <div className="edit-delete-action">
//             <Link
//               className="me-2 p-2"
//               to="#"
//               data-bs-toggle="modal"
//               data-bs-target="#edit-units"
//               onClick={() => handleEdit(record)}
//               title="Edit Role"
//             >
//               <i data-feather="edit" className="feather-edit"></i>
//             </Link>
//             <Link 
//               className="me-2 p-2" 
//               to={`${route.permissions}?roleId=${record.id}`}
//               title="Manage Permissions"
//             >
//               <i
//                 data-feather="shield"
//                 className="feather feather-shield shield"
//               ></i>
//             </Link>
//             <Link 
//               className="confirm-text p-2" 
//               to="#"
//               onClick={() => handleDelete(record.id)}
//               title="Delete Role"
//             >
//               <i
//                 data-feather="trash-2"
//                 className="feather-trash-2"
//               ></i>
//             </Link>
//           </div>
//         </td>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <div className="page-wrapper">
//         <div className="content">
//           <div className="page-header">
//             <div className="add-item d-flex">
//               <div className="page-title">
//                 <h4>Roles &amp; Permission</h4>
//                 <h6>Manage your roles</h6>
//               </div>
//             </div>
//             <ul className="table-top-head">
//               <li>
//                 <OverlayTrigger placement="top" overlay={renderTooltip}>
//                   <Link>
//                     <ImageWithBasePath
//                       src="assets/img/icons/pdf.svg"
//                       alt="img"
//                     />
//                   </Link>
//                 </OverlayTrigger>
//               </li>
//               <li>
//                 <OverlayTrigger placement="top" overlay={renderExcelTooltip}>
//                   <Link>
//                     <ImageWithBasePath
//                       src="assets/img/icons/excel.svg"
//                       alt="img"
//                     />
//                   </Link>
//                 </OverlayTrigger>
//               </li>
//               <li>
//                 <OverlayTrigger placement="top" overlay={renderPrinterTooltip}>
//                   <Link>
//                     <i data-feather="printer" className="feather-printer" />
//                   </Link>
//                 </OverlayTrigger>
//               </li>
//               <li>
//                 <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
//                   <Link onClick={handleRefresh}>
//                     <RotateCcw />
//                   </Link>
//                 </OverlayTrigger>
//               </li>
//               <li>
//                 <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
//                   <Link
//                     id="collapse-header"
//                     className={data ? "active" : ""}
//                     onClick={() => {
//                       dispatch(setToogleHeader(!data));
//                     }}
//                   >
//                     <ChevronUp />
//                   </Link>
//                 </OverlayTrigger>
//               </li>
//             </ul>
//             <div className="page-btn">
//               <a
//                 to="#"
//                 className="btn btn-added"
//                 data-bs-toggle="modal"
//                 data-bs-target="#add-units"
//               >
//                 <PlusCircle className="me-2" />
//                 Add New Role
//               </a>
//             </div>
//           </div>

//           {/* Roles Table Card */}
//           <div className="card table-list-card">
//             <div className="card-body">
//               <div className="table-top">
//                 <div className="search-input">
//                   <input
//                     type="text"
//                     placeholder="Search roles"
//                     className="form-control form-control-sm formsearch"
//                     value={filters.search}
//                     onChange={handleSearch}
//                   />
//                   <Link to="#" className="btn btn-searchset">
//                     <i data-feather="search" className="feather-search" />
//                   </Link>
//                 </div>
//                 <div className="search-path">
//                   <Link
//                     className={`btn btn-filter ${
//                       isFilterVisible ? "setclose" : ""
//                     }`}
//                   >
//                     <Filter
//                       className="filter-icon"
//                       onClick={toggleFilterVisibility}
//                     />
//                     <span onClick={toggleFilterVisibility}>
//                       <ImageWithBasePath
//                         src="assets/img/icons/closes.svg"
//                         alt="img"
//                       />
//                     </span>
//                   </Link>
//                 </div>
//                 <div className="form-sort">
//                   <Sliders className="info-img" />
//                   <Select
//                     className="select"
//                     options={sortOptions}
//                     placeholder="Sort by Date"
//                     value={sortOptions.find(opt => opt.value === filters.sortBy)}
//                     onChange={(opt) => handleFilterChange('sortBy', opt.value)}
//                   />
//                 </div> 
//               </div>

//               {/* Filter Section */}
//               <div
//                 className={`card${isFilterVisible ? " visible" : ""}`}
//                 id="filter_inputs"
//                 style={{ display: isFilterVisible ? "block" : "none" }}
//               >
//                 <div className="card-body pb-0">
//                   <div className="row">
//                     <div className="col-lg-3 col-sm-6 col-12">
//                       <div className="input-blocks">
//                         <Zap className="info-img" />
//                         <Select
//                           className="select"
//                           options={roleOptions}
//                           placeholder="Choose Role"
//                           value={roleOptions.find(opt => opt.value === filters.roleName)}
//                           onChange={(opt) => handleFilterChange('roleName', opt.value)}
//                           isClearable
//                         />
//                       </div>
//                     </div>
//                     <div className="col-lg-3 col-sm-6 col-12">
//                       <div className="input-blocks">
//                         <i data-feather="calendar" className="info-img" />
//                         <div className="input-groupicon">
//                           <DatePicker
//                             selected={selectedDate}
//                             onChange={handleDateChange}
//                             className="filterdatepicker"
//                             format="DD-MM-YYYY"
//                             placeholder="Choose Date"
//                             style={{ width: '100%' }}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-lg-3 col-sm-6 col-12 ms-auto">
//                       <div className="input-blocks">
//                         <a 
//                           className="btn btn-filters ms-auto"
//                           onClick={fetchRoles}
//                         >
//                           <i
//                             data-feather="search"
//                             className="feather-search"
//                           />
//                           Search
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Table */}
//               <div className="table-responsive">
//                 {loading ? (
//                   <div className="text-center p-4">
//                     <div className="spinner-border text-primary" role="status">
//                       <span className="visually-hidden">Loading...</span>
//                     </div>
//                   </div>
//                 ) : roles.length > 0 ? (
//                   <Table columns={columns} dataSource={roles} />
//                 ) : (
//                   <div className="text-center p-4">
//                     <p>No roles found</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modals */}
//       <AddRole onSuccess={fetchRoles} />
//       <EditRole role={selectedRole} onSuccess={fetchRoles} />
//     </div>
//   );
// };

// export default RolesPermissions;














// import React, { useState, useEffect } from "react";
// import { OverlayTrigger, Tooltip } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import ImageWithBasePath from "../../core/img/imagewithbasebath";
// import { Link } from "react-router-dom";
// import { ChevronUp, RotateCcw } from "feather-icons-react/build/IconComponents";
// import { setToogleHeader } from "../../core/redux/action";
// import { Filter, PlusCircle, Sliders, Zap } from "react-feather";
// import Select from "react-select";
// import { DatePicker } from "antd";
// import withReactContent from "sweetalert2-react-content";
// import Swal from "sweetalert2";
// import Table from "../../core/pagination/datatable";
// import AddRole from "../../core/modals/usermanagement/addrole";
// import EditRole from "../../core/modals/usermanagement/editrole";
// import AuthService from "../../services/authService";
// import { all_routes } from "../../Router/all_routes";
// import { usePermissions } from "../../hooks/usePermission.js";
// import { RoleGuard } from "../../guard/RoleGuard.jsx";


// const RolesPermissions = () => {
//   const route = all_routes;
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const data = useSelector((state) => state.toggle_header);
//   const { isAdmin} = usePermissions();

//   // State management
//   const [roles, setRoles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isFilterVisible, setIsFilterVisible] = useState(false);
//   const [selectedRole, setSelectedRole] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null);

//   // Filter states
//   const [filters, setFilters] = useState({
//     search: '',
//     roleName: '',
//     sortBy: 'date'
//   });

//   // Check authentication and authorization
//   useEffect(() => {
//     const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//     if (!token || token === 'undefined' || token === 'null') {
//       navigate('/signin');
//       return;
//     }

//     // Check if user is admin
//     if (!isAdmin()) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Access Denied',
//         text: 'You do not have permission to access this page',
//       }).then(() => {
//         navigate('/dashboard');
//       });
//     }
//   }, [navigate, isAdmin]);

//   // Fetch roles from API
//   const fetchRoles = async () => {
//     setLoading(true);
//     try {
//       const response = await AuthService.getRoles();
//       const rolesData = response.data.roles || response.data || [];

//       console.log('Raw roles data:', rolesData);

//       // Process roles data - permissions are already in JSON format
//       const processedRoles = rolesData.map((role) => {
//         let permissionCount = 0;
        
//         // Count permissions from the permissions object
//         if (role.permissions) {
//           if (typeof role.permissions === 'string') {
//             try {
//               const parsed = JSON.parse(role.permissions);
//               permissionCount = Object.keys(parsed).length;
//             } catch (e) {
//               console.error('Error parsing permissions:', e);
//             }
//           } else if (typeof role.permissions === 'object') {
//             permissionCount = Object.keys(role.permissions).length;
//           }
//         }

//         return {
//           ...role,
//           rolename: role.name,
//           createdon: new Date(role.created_at || role.createdAt || Date.now()).toLocaleDateString(),
//           permissionCount
//         };
//       });

//       console.log('Processed roles:', processedRoles);

//       // Apply filters
//       let filteredRoles = processedRoles;

//       // Search filter
//       if (filters.search) {
//         filteredRoles = filteredRoles.filter(role =>
//           role.name?.toLowerCase().includes(filters.search.toLowerCase())
//         );
//       }

//       // Role name filter
//       if (filters.roleName) {
//         filteredRoles = filteredRoles.filter(role =>
//           role.name?.toLowerCase() === filters.roleName.toLowerCase()
//         );
//       }

//       // Date filter
//       if (selectedDate) {
//         filteredRoles = filteredRoles.filter(role => {
//           const roleDate = new Date(role.created_at || role.createdAt);
//           const filterDate = new Date(selectedDate);
//           return roleDate.toDateString() === filterDate.toDateString();
//         });
//       }

//       // Sorting
//       if (filters.sortBy === 'newest') {
//         filteredRoles.sort((a, b) => new Date(b.created_at || b.createdAt) - new Date(a.created_at || a.createdAt));
//       } else if (filters.sortBy === 'oldest') {
//         filteredRoles.sort((a, b) => new Date(a.created_at || a.createdAt) - new Date(b.created_at || b.createdAt));
//       }

//       setRoles(filteredRoles);
//     } catch (error) {
//       console.error('Error fetching roles:', error);
      
//       if (error.response?.status === 403) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Access Denied',
//           text: 'You do not have permission to view roles'
//         });
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: error.response?.data?.message || error.response?.data?.error || 'Failed to fetch roles'
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initial fetch
//   useEffect(() => {
//     if (isAdmin()) {
//       fetchRoles();
//     }
//   }, [isAdmin]);

//   // Refetch when filters change (debounced)
//   useEffect(() => {
//     if (!isAdmin()) return;
    
//     const timeoutId = setTimeout(() => {
//       fetchRoles();
//     }, 500);
//     return () => clearTimeout(timeoutId);
//   }, [filters, selectedDate, isAdmin]);

//   const toggleFilterVisibility = () => {
//     setIsFilterVisible((prevVisibility) => !prevVisibility);
//   };

//   // Handle delete role
//   const handleDelete = async (roleId) => {
//     if (!isAdmin()) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Access Denied',
//         text: 'You do not have permission to delete roles'
//       });
//       return;
//     }

//     const MySwal = withReactContent(Swal);

//     MySwal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this! This will also delete all permissions associated with this role.",
//       showCancelButton: true,
//       confirmButtonColor: "#00ff00",
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonColor: "#ff0000",
//       cancelButtonText: "Cancel",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await AuthService.deleteRoleById(roleId);
//           MySwal.fire({
//             title: "Deleted!",
//             text: "Role has been deleted.",
//             icon: "success",
//             confirmButtonText: "OK",
//             customClass: {
//               confirmButton: "btn btn-success",
//             },
//           });
//           fetchRoles(); // Refresh list
//         } catch (error) {
//           console.error('Delete error:', error);
//           MySwal.fire({
//             icon: 'error',
//             title: 'Error',
//             text: error.response?.data?.message || error.response?.data?.error || 'Failed to delete role'
//           });
//         }
//       }
//     });
//   };

//   // Handle search
//   const handleSearch = (e) => {
//     setFilters(prev => ({ ...prev, search: e.target.value }));
//   };

//   // Handle filter change
//   const handleFilterChange = (field, value) => {
//     setFilters(prev => ({ ...prev, [field]: value }));
//   };

//   // Handle date change
//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   // Handle refresh
//   const handleRefresh = () => {
//     setFilters({
//       search: '',
//       roleName: '',
//       sortBy: 'date'
//     });
//     setSelectedDate(null);
//     fetchRoles();
//   };

//   // Handle edit role
//   const handleEdit = (role) => {
//     setSelectedRole(role);
//   };

//   // Prepare dropdown options
//   const sortOptions = [
//     { value: "date", label: "Sort by Date" },
//     { value: "newest", label: "Newest" },
//     { value: "oldest", label: "Oldest" },
//   ];

//   const roleOptions = [
//     { value: '', label: 'Choose Role' },
//     ...Array.from(new Set(roles.map(role => role.name)))
//       .map(name => ({ value: name, label: name }))
//   ];

//   // Tooltips
//   const renderTooltip = (props) => (
//     <Tooltip id="pdf-tooltip" {...props}>Pdf</Tooltip>
//   );
//   const renderExcelTooltip = (props) => (
//     <Tooltip id="excel-tooltip" {...props}>Excel</Tooltip>
//   );
//   const renderPrinterTooltip = (props) => (
//     <Tooltip id="printer-tooltip" {...props}>Printer</Tooltip>
//   );
//   const renderRefreshTooltip = (props) => (
//     <Tooltip id="refresh-tooltip" {...props}>Refresh</Tooltip>
//   );
//   const renderCollapseTooltip = (props) => (
//     <Tooltip id="collapse-tooltip" {...props}>Collapse</Tooltip>
//   );

//   // Table columns
//   const columns = [
//     {
//       title: "Role Name",
//       dataIndex: "rolename",
//       sorter: (a, b) => (a.rolename || '').localeCompare(b.rolename || ''),
//       render: (text, record) => (
//         <div>
//           <strong>{text}</strong>
//           <br />
//           <small className="text-muted">
//             {record.permissionCount} permission module{record.permissionCount !== 1 ? 's' : ''}
//           </small>
//         </div>
//       )
//     },
//     {
//       title: "Created On",
//       dataIndex: "createdon",
//       sorter: (a, b) => new Date(a.created_at || a.createdAt) - new Date(b.created_at || b.createdAt),
//     },
//     {
//       title: "Actions",
//       dataIndex: "actions",
//       key: "actions",
//       render: (_, record) => (
//         <td className="action-table-data">
//           <div className="edit-delete-action">
//             <Link
//               className="me-2 p-2"
//               to="#"
//               data-bs-toggle="modal"
//               data-bs-target="#edit-units"
//               onClick={() => handleEdit(record)}
//               title="Edit Role"
//             >
//               <i data-feather="edit" className="feather-edit"></i>
//             </Link>
//             <Link 
//               className="me-2 p-2" 
//               to={`${route.permissions}?roleId=${record.id}`}
//               title="Manage Permissions"
//             >
//               <i
//                 data-feather="shield"
//                 className="feather feather-shield shield"
//               ></i>
//             </Link>
//             <Link 
//               className="confirm-text p-2" 
//               to="#"
//               onClick={() => handleDelete(record.id)}
//               title="Delete Role"
//             >
//               <i
//                 data-feather="trash-2"
//                 className="feather-trash-2"
//               ></i>
//             </Link>
//           </div>
//         </td>
//       ),
//     },
//   ];

//   // Wrap component in RoleGuard
//   return (
//     <RoleGuard 
//       roles={['Admin', 'Super Admin']}
//       showMessage={true}
//     >
//       <div>
//         <div className="page-wrapper">
//           <div className="content">
//             <div className="page-header">
//               <div className="add-item d-flex">
//                 <div className="page-title">
//                   <h4>Roles &amp; Permission</h4>
//                   <h6>Manage your roles</h6>
//                 </div>
//               </div>
//               <ul className="table-top-head">
//                 <li>
//                   <OverlayTrigger placement="top" overlay={renderTooltip}>
//                     <Link>
//                       <ImageWithBasePath
//                         src="assets/img/icons/pdf.svg"
//                         alt="img"
//                       />
//                     </Link>
//                   </OverlayTrigger>
//                 </li>
//                 <li>
//                   <OverlayTrigger placement="top" overlay={renderExcelTooltip}>
//                     <Link>
//                       <ImageWithBasePath
//                         src="assets/img/icons/excel.svg"
//                         alt="img"
//                       />
//                     </Link>
//                   </OverlayTrigger>
//                 </li>
//                 <li>
//                   <OverlayTrigger placement="top" overlay={renderPrinterTooltip}>
//                     <Link>
//                       <i data-feather="printer" className="feather-printer" />
//                     </Link>
//                   </OverlayTrigger>
//                 </li>
//                 <li>
//                   <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
//                     <Link onClick={handleRefresh}>
//                       <RotateCcw />
//                     </Link>
//                   </OverlayTrigger>
//                 </li>
//                 <li>
//                   <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
//                     <Link
//                       id="collapse-header"
//                       className={data ? "active" : ""}
//                       onClick={() => {
//                         dispatch(setToogleHeader(!data));
//                       }}
//                     >
//                       <ChevronUp />
//                     </Link>
//                   </OverlayTrigger>
//                 </li>
//               </ul>
//               <div className="page-btn">
//                 <a
//                   to="#"
//                   className="btn btn-added"
//                   data-bs-toggle="modal"
//                   data-bs-target="#add-units"
//                 >
//                   <PlusCircle className="me-2" />
//                   Add New Role
//                 </a>
//               </div>
//             </div>

//             {/* Roles Table Card */}
//             <div className="card table-list-card">
//               <div className="card-body">
//                 <div className="table-top">
//                   <div className="search-input">
//                     <input
//                       type="text"
//                       placeholder="Search roles"
//                       className="form-control form-control-sm formsearch"
//                       value={filters.search}
//                       onChange={handleSearch}
//                     />
//                     <Link to="#" className="btn btn-searchset">
//                       <i data-feather="search" className="feather-search" />
//                     </Link>
//                   </div>
//                   <div className="search-path">
//                     <Link
//                       className={`btn btn-filter ${
//                         isFilterVisible ? "setclose" : ""
//                       }`}
//                     >
//                       <Filter
//                         className="filter-icon"
//                         onClick={toggleFilterVisibility}
//                       />
//                       <span onClick={toggleFilterVisibility}>
//                         <ImageWithBasePath
//                           src="assets/img/icons/closes.svg"
//                           alt="img"
//                         />
//                       </span>
//                     </Link>
//                   </div>
//                   <div className="form-sort">
//                     <Sliders className="info-img" />
//                     <Select
//                       className="select"
//                       options={sortOptions}
//                       placeholder="Sort by Date"
//                       value={sortOptions.find(opt => opt.value === filters.sortBy)}
//                       onChange={(opt) => handleFilterChange('sortBy', opt.value)}
//                     />
//                   </div> 
//                 </div>

//                 {/* Filter Section */}
//                 <div
//                   className={`card${isFilterVisible ? " visible" : ""}`}
//                   id="filter_inputs"
//                   style={{ display: isFilterVisible ? "block" : "none" }}
//                 >
//                   <div className="card-body pb-0">
//                     <div className="row">
//                       <div className="col-lg-3 col-sm-6 col-12">
//                         <div className="input-blocks">
//                           <Zap className="info-img" />
//                           <Select
//                             className="select"
//                             options={roleOptions}
//                             placeholder="Choose Role"
//                             value={roleOptions.find(opt => opt.value === filters.roleName)}
//                             onChange={(opt) => handleFilterChange('roleName', opt.value)}
//                             isClearable
//                           />
//                         </div>
//                       </div>
//                       <div className="col-lg-3 col-sm-6 col-12">
//                         <div className="input-blocks">
//                           <i data-feather="calendar" className="info-img" />
//                           <div className="input-groupicon">
//                             <DatePicker
//                               selected={selectedDate}
//                               onChange={handleDateChange}
//                               className="filterdatepicker"
//                               format="DD-MM-YYYY"
//                               placeholder="Choose Date"
//                               style={{ width: '100%' }}
//                             />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="col-lg-3 col-sm-6 col-12 ms-auto">
//                         <div className="input-blocks">
//                           <a 
//                             className="btn btn-filters ms-auto"
//                             onClick={fetchRoles}
//                           >
//                             <i
//                               data-feather="search"
//                               className="feather-search"
//                             />
//                             Search
//                           </a>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Table */}
//                 <div className="table-responsive">
//                   {loading ? (
//                     <div className="text-center p-4">
//                       <div className="spinner-border text-primary" role="status">
//                         <span className="visually-hidden">Loading...</span>
//                       </div>
//                     </div>
//                   ) : roles.length > 0 ? (
//                     <Table columns={columns} dataSource={roles} />
//                   ) : (
//                     <div className="text-center p-4">
//                       <p>No roles found</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Modals */}
//         <AddRole onSuccess={fetchRoles} />
//         <EditRole role={selectedRole} onSuccess={fetchRoles} />
//       </div>
//     </RoleGuard>
//   );
// };

// export default RolesPermissions;



import React, { useState, useEffect } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import { ChevronUp, RotateCcw } from "feather-icons-react/build/IconComponents";
import { setToogleHeader } from "../../core/redux/action";
import { Filter, PlusCircle, Sliders, Zap } from "react-feather";
import Select from "react-select";
import { DatePicker } from "antd";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Table from "../../core/pagination/datatable";
import AddRole from "../../core/modals/usermanagement/addrole";
import EditRole from "../../core/modals/usermanagement/editrole";
import AuthService from "../../services/authService.js";
import { all_routes } from "../../Router/all_routes";
// import { usePermissions } from "../../hooks/usePermission.js";
import { RoleGuard } from "../../guard/RoleGuard.jsx";


const RolesPermissions = () => {
  const route = all_routes;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.toggle_header);
  // const { isAdmin, hasPermission } = usePermissions();

  // State management
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    roleName: '',
    sortBy: 'date'
  });

  // REMOVED: The duplicate authorization check in useEffect
  // The RoleGuard wrapper handles this now
  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token || token === 'undefined' || token === 'null') {
      navigate('/signin');
      return;
    }
  }, [navigate]);

  // Fetch roles from API
  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await AuthService.getRoles();
      const rolesData = response.data.roles || response.data || [];

      console.log('Raw roles data:', rolesData);

      // Process roles data - permissions are already in JSON format
      const processedRoles = rolesData.map((role) => {
        let permissionCount = 0;
        
        // Count permissions from the permissions object
        if (role.permissions) {
          if (typeof role.permissions === 'string') {
            try {
              const parsed = JSON.parse(role.permissions);
              permissionCount = Object.keys(parsed).length;
            } catch (e) {
              console.error('Error parsing permissions:', e);
            }
          } else if (typeof role.permissions === 'object') {
            permissionCount = Object.keys(role.permissions).length;
          }
        }

        return {
          ...role,
          rolename: role.name,
          createdon: new Date(role.created_at || role.createdAt || Date.now()).toLocaleDateString(),
          permissionCount
        };
      });

      console.log('Processed roles:', processedRoles);

      // Apply filters
      let filteredRoles = processedRoles;

      // Search filter
      if (filters.search) {
        filteredRoles = filteredRoles.filter(role =>
          role.name?.toLowerCase().includes(filters.search.toLowerCase())
        );
      }

      // Role name filter
      if (filters.roleName) {
        filteredRoles = filteredRoles.filter(role =>
          role.name?.toLowerCase() === filters.roleName.toLowerCase()
        );
      }

      // Date filter
      if (selectedDate) {
        filteredRoles = filteredRoles.filter(role => {
          const roleDate = new Date(role.created_at || role.createdAt);
          const filterDate = new Date(selectedDate);
          return roleDate.toDateString() === filterDate.toDateString();
        });
      }

      // Sorting
      if (filters.sortBy === 'newest') {
        filteredRoles.sort((a, b) => new Date(b.created_at || b.createdAt) - new Date(a.created_at || a.createdAt));
      } else if (filters.sortBy === 'oldest') {
        filteredRoles.sort((a, b) => new Date(a.created_at || a.createdAt) - new Date(b.created_at || b.createdAt));
      }

      setRoles(filteredRoles);
    } catch (error) {
      console.error('Error fetching roles:', error);
      
      if (error.response?.status === 403) {
        Swal.fire({
          icon: 'error',
          title: 'Access Denied',
          text: 'You do not have permission to view roles'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || error.response?.data?.error || 'Failed to fetch roles'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch - removed isAdmin check since RoleGuard handles it
  useEffect(() => {
    fetchRoles();
  }, []);

  // Refetch when filters change (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchRoles();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [filters, selectedDate]);

  const toggleFilterVisibility = () => {
    setIsFilterVisible((prevVisibility) => !prevVisibility);
  };

  // Handle delete role
  const handleDelete = async (roleId) => {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this! This will also delete all permissions associated with this role.",
      showCancelButton: true,
      confirmButtonColor: "#00ff00",
      confirmButtonText: "Yes, delete it!",
      cancelButtonColor: "#ff0000",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await AuthService.deleteRoleById(roleId);
          MySwal.fire({
            title: "Deleted!",
            text: "Role has been deleted.",
            icon: "success",
            confirmButtonText: "OK",
            customClass: {
              confirmButton: "btn btn-success",
            },
          });
          fetchRoles(); // Refresh list
        } catch (error) {
          console.error('Delete error:', error);
          MySwal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response?.data?.message || error.response?.data?.error || 'Failed to delete role'
          });
        }
      }
    });
  };

  // Handle search
  const handleSearch = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  // Handle filter change
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  // Handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Handle refresh
  const handleRefresh = () => {
    setFilters({
      search: '',
      roleName: '',
      sortBy: 'date'
    });
    setSelectedDate(null);
    fetchRoles();
  };

  // Handle edit role
  const handleEdit = (role) => {
    setSelectedRole(role);
  };

  // Prepare dropdown options
  const sortOptions = [
    { value: "date", label: "Sort by Date" },
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
  ];

  const roleOptions = [
    { value: '', label: 'Choose Role' },
    ...Array.from(new Set(roles.map(role => role.name)))
      .map(name => ({ value: name, label: name }))
  ];

  // Tooltips
  const renderTooltip = (props) => (
    <Tooltip id="pdf-tooltip" {...props}>Pdf</Tooltip>
  );
  const renderExcelTooltip = (props) => (
    <Tooltip id="excel-tooltip" {...props}>Excel</Tooltip>
  );
  const renderPrinterTooltip = (props) => (
    <Tooltip id="printer-tooltip" {...props}>Printer</Tooltip>
  );
  const renderRefreshTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>Refresh</Tooltip>
  );
  const renderCollapseTooltip = (props) => (
    <Tooltip id="collapse-tooltip" {...props}>Collapse</Tooltip>
  );

  // Table columns
  const columns = [
    {
      title: "Role Name",
      dataIndex: "rolename",
      sorter: (a, b) => (a.rolename || '').localeCompare(b.rolename || ''),
      render: (text, record) => (
        <div>
          <strong>{text}</strong>
          <br />
          <small className="text-muted">
            {record.permissionCount} permission module{record.permissionCount !== 1 ? 's' : ''}
          </small>
        </div>
      )
    },
    {
      title: "Created On",
      dataIndex: "createdon",
      sorter: (a, b) => new Date(a.created_at || a.createdAt) - new Date(b.created_at || b.createdAt),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <td className="action-table-data">
          <div className="edit-delete-action">
            <Link
              className="me-2 p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#edit-units"
              onClick={() => handleEdit(record)}
              title="Edit Role"
            >
              <i data-feather="edit" className="feather-edit"></i>
            </Link>
            <Link 
              className="me-2 p-2" 
              to={`${route.permissions}?roleId=${record.id}`}
              title="Manage Permissions"
            >
              <i
                data-feather="shield"
                className="feather feather-shield shield"
              ></i>
            </Link>
            <Link 
              className="confirm-text p-2" 
              to="#"
              onClick={() => handleDelete(record.id)}
              title="Delete Role"
            >
              <i
                data-feather="trash-2"
                className="feather-trash-2"
              ></i>
            </Link>
          </div>
        </td>
      ),
    },
  ];

  // Wrap component in RoleGuard
  return (
    <RoleGuard 
      roles={['Admin', 'Super Admin']}
      showMessage={true}
    >
      <div>
        <div className="page-wrapper">
          <div className="content">
            <div className="page-header">
              <div className="add-item d-flex">
                <div className="page-title">
                  <h4>Roles &amp; Permission</h4>
                  <h6>Manage your roles</h6>
                </div>
              </div>
              <ul className="table-top-head">
                <li>
                  <OverlayTrigger placement="top" overlay={renderTooltip}>
                    <Link>
                      <ImageWithBasePath
                        src="assets/img/icons/pdf.svg"
                        alt="img"
                      />
                    </Link>
                  </OverlayTrigger>
                </li>
                <li>
                  <OverlayTrigger placement="top" overlay={renderExcelTooltip}>
                    <Link>
                      <ImageWithBasePath
                        src="assets/img/icons/excel.svg"
                        alt="img"
                      />
                    </Link>
                  </OverlayTrigger>
                </li>
                <li>
                  <OverlayTrigger placement="top" overlay={renderPrinterTooltip}>
                    <Link>
                      <i data-feather="printer" className="feather-printer" />
                    </Link>
                  </OverlayTrigger>
                </li>
                <li>
                  <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
                    <Link onClick={handleRefresh}>
                      <RotateCcw />
                    </Link>
                  </OverlayTrigger>
                </li>
                <li>
                  <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
                    <Link
                      id="collapse-header"
                      className={data ? "active" : ""}
                      onClick={() => {
                        dispatch(setToogleHeader(!data));
                      }}
                    >
                      <ChevronUp />
                    </Link>
                  </OverlayTrigger>
                </li>
              </ul>
              <div className="page-btn">
                <a
                  to="#"
                  className="btn btn-added"
                  data-bs-toggle="modal"
                  data-bs-target="#add-units"
                >
                  <PlusCircle className="me-2" />
                  Add New Role
                </a>
              </div>
            </div>

            {/* Roles Table Card */}
            <div className="card table-list-card">
              <div className="card-body">
                <div className="table-top">
                  <div className="search-input">
                    <input
                      type="text"
                      placeholder="Search roles"
                      className="form-control form-control-sm formsearch"
                      value={filters.search}
                      onChange={handleSearch}
                    />
                    <Link to="#" className="btn btn-searchset">
                      <i data-feather="search" className="feather-search" />
                    </Link>
                  </div>
                  <div className="search-path">
                    <Link
                      className={`btn btn-filter ${
                        isFilterVisible ? "setclose" : ""
                      }`}
                    >
                      <Filter
                        className="filter-icon"
                        onClick={toggleFilterVisibility}
                      />
                      <span onClick={toggleFilterVisibility}>
                        <ImageWithBasePath
                          src="assets/img/icons/closes.svg"
                          alt="img"
                        />
                      </span>
                    </Link>
                  </div>
                  <div className="form-sort">
                    <Sliders className="info-img" />
                    <Select
                      className="select"
                      options={sortOptions}
                      placeholder="Sort by Date"
                      value={sortOptions.find(opt => opt.value === filters.sortBy)}
                      onChange={(opt) => handleFilterChange('sortBy', opt.value)}
                    />
                  </div> 
                </div>

                {/* Filter Section */}
                <div
                  className={`card${isFilterVisible ? " visible" : ""}`}
                  id="filter_inputs"
                  style={{ display: isFilterVisible ? "block" : "none" }}
                >
                  <div className="card-body pb-0">
                    <div className="row">
                      <div className="col-lg-3 col-sm-6 col-12">
                        <div className="input-blocks">
                          <Zap className="info-img" />
                          <Select
                            className="select"
                            options={roleOptions}
                            placeholder="Choose Role"
                            value={roleOptions.find(opt => opt.value === filters.roleName)}
                            onChange={(opt) => handleFilterChange('roleName', opt.value)}
                            isClearable
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6 col-12">
                        <div className="input-blocks">
                          <i data-feather="calendar" className="info-img" />
                          <div className="input-groupicon">
                            <DatePicker
                              selected={selectedDate}
                              onChange={handleDateChange}
                              className="filterdatepicker"
                              format="DD-MM-YYYY"
                              placeholder="Choose Date"
                              style={{ width: '100%' }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6 col-12 ms-auto">
                        <div className="input-blocks">
                          <a 
                            className="btn btn-filters ms-auto"
                            onClick={fetchRoles}
                          >
                            <i
                              data-feather="search"
                              className="feather-search"
                            />
                            Search
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Table */}
                <div className="table-responsive">
                  {loading ? (
                    <div className="text-center p-4">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : roles.length > 0 ? (
                    <Table columns={columns} dataSource={roles} />
                  ) : (
                    <div className="text-center p-4">
                      <p>No roles found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <AddRole onSuccess={fetchRoles} />
        <EditRole role={selectedRole} onSuccess={fetchRoles} />
      </div>
    </RoleGuard>
  );
};

export default RolesPermissions;