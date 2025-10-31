// import React, { useState } from 'react'
// import { OverlayTrigger, Tooltip } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import ImageWithBasePath from '../../core/img/imagewithbasebath';
// import { ChevronUp, RotateCcw } from 'feather-icons-react/build/IconComponents';
// import { setToogleHeader } from '../../core/redux/action';
// import { useDispatch, useSelector } from 'react-redux';
// import { Filter, PlusCircle, Sliders, StopCircle, User, Zap } from 'react-feather';
// import Select from 'react-select';
// import withReactContent from 'sweetalert2-react-content';
// import Swal from 'sweetalert2';
// import Table from '../../core/pagination/datatable'
// import AddUsers from '../../core/modals/usermanagement/addusers';
// import EditUser from '../../core/modals/usermanagement/edituser';


// const Users = () => {

//     const oldandlatestvalue = [
//         { value: 'date', label: 'Sort by Date' },
//         { value: 'newest', label: 'Newest' },
//         { value: 'oldest', label: 'Oldest' },
//     ];
//     const users = [
//         { value: 'Choose Name', label: 'Choose Name' },
//         { value: 'Lilly', label: 'Lilly' },
//         { value: 'Benjamin', label: 'Benjamin' },
//     ];
//     const status = [
//         { value: 'Choose Name', label: 'Choose Status' },
//         { value: 'Active', label: 'Active' },
//         { value: 'InActive', label: 'InActive' },
//     ];
//     const role = [
//         { value: 'Choose Role', label: 'Choose Role' },
//         { value: 'AcStore Keeper', label: 'Store Keeper' },
//         { value: 'Salesman', label: 'Salesman' },
//     ];


//     const dispatch = useDispatch();
//     const data = useSelector((state) => state.toggle_header);
//     const dataSource = useSelector((state) => state.userlist_data);
//     const [isFilterVisible, setIsFilterVisible] = useState(false);
//     const toggleFilterVisibility = () => {
//         setIsFilterVisible((prevVisibility) => !prevVisibility);
//     };

//     const renderTooltip = (props) => (
//         <Tooltip id="pdf-tooltip" {...props}>
//             Pdf
//         </Tooltip>
//     );
//     const renderExcelTooltip = (props) => (
//         <Tooltip id="excel-tooltip" {...props}>
//             Excel
//         </Tooltip>
//     );
//     const renderPrinterTooltip = (props) => (
//         <Tooltip id="printer-tooltip" {...props}>
//             Printer
//         </Tooltip>
//     );
//     const renderRefreshTooltip = (props) => (
//         <Tooltip id="refresh-tooltip" {...props}>
//             Refresh
//         </Tooltip>
//     );
//     const renderCollapseTooltip = (props) => (
//         <Tooltip id="refresh-tooltip" {...props}>
//             Collapse
//         </Tooltip>
//     )

//     const columns = [

//         {
//             title: "User Name",
//             dataIndex: "username",
//             render: (text, record) => (
//                 <span className="userimgname">
//                     <Link to="#" className="userslist-img bg-img">
//                         <ImageWithBasePath alt="" src={record.img} />
//                     </Link>
//                     <div>
//                     <Link to="#">{text}</Link>
//                     </div>
//                 </span>
//             ),
//             sorter: (a, b) => a.username.length - b.username.length,
//         },

//         {
//             title: "Phone",
//             dataIndex: "phone",
//             sorter: (a, b) => a.phone.length - b.phone.length,
//         },
//         {
//             title: "Email",
//             dataIndex: "email",
//             sorter: (a, b) => a.email.length - b.email.length,
//         },
//         {
//             title: "Role",
//             dataIndex: "role",
//             sorter: (a, b) => a.role.length - b.role.length,
//         },
//         {
//             title: "Created On",
//             dataIndex: "createdon",
//             sorter: (a, b) => a.createdon.length - b.createdon.length,
//         },
//         {
//             title: "Status",
//             dataIndex: "status",
//             render: (text) => (
//                 <div>
//                   {text === "Active" && (
//                     <span className="badge badge-linesuccess">{text}</span>
//                   )}
//                   {text === "Inactive" && (
//                     <span className="badge badge-linedanger">{text}</span>
//                   )}
                  
//                 </div>
//               ),
//             sorter: (a, b) => a.status.length - b.status.length,
//         },
//         {
//             title: 'Actions',
//             dataIndex: 'actions',
//             key: 'actions',
//             render: () => (
//                 <td className="action-table-data">
//                     <div className="edit-delete-action">
                        
//                         <Link className="me-2 p-2" to="#">
//                             <i data-feather="eye" className="feather feather-eye action-eye"></i>
//                         </Link>
//                         <Link className="me-2 p-2" to="#" data-bs-toggle="modal" data-bs-target="#edit-units">
//                             <i data-feather="edit" className="feather-edit"></i>
//                         </Link>
//                         <Link className="confirm-text p-2" to="#"  >
//                             <i data-feather="trash-2" className="feather-trash-2" onClick={showConfirmationAlert}></i>
//                         </Link>
//                     </div>
//                 </td>
//             )
//         },
//     ]
//     const MySwal = withReactContent(Swal);

//     const showConfirmationAlert = () => {
//         MySwal.fire({
//             title: 'Are you sure?',
//             text: 'You won\'t be able to revert this!',
//             showCancelButton: true,
//             confirmButtonColor: '#00ff00',
//             confirmButtonText: 'Yes, delete it!',
//             cancelButtonColor: '#ff0000',
//             cancelButtonText: 'Cancel',
//         }).then((result) => {
//             if (result.isConfirmed) {

//                 MySwal.fire({
//                     title: 'Deleted!',
//                     text: 'Your file has been deleted.',
//                     className: "btn btn-success",
//                     confirmButtonText: 'OK',
//                     customClass: {
//                         confirmButton: 'btn btn-success',
//                     },
//                 });
//             } else {
//                 MySwal.close();
//             }

//         });
//     };
//     return (
//         <div>
//             <div className="page-wrapper">
//                 <div className="content">
//                     <div className="page-header">
//                         <div className="add-item d-flex">
//                             <div className="page-title">
//                                 <h4>User List</h4>
//                                 <h6>Manage Your Users</h6>
//                             </div>
//                         </div>
//                         <ul className="table-top-head">
//                             <li>
//                                 <OverlayTrigger placement="top" overlay={renderTooltip}>
//                                     <Link>
//                                         <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
//                                     </Link>
//                                 </OverlayTrigger>
//                             </li>
//                             <li>
//                                 <OverlayTrigger placement="top" overlay={renderExcelTooltip}>
//                                     <Link data-bs-toggle="tooltip" data-bs-placement="top">
//                                         <ImageWithBasePath src="assets/img/icons/excel.svg" alt="img" />
//                                     </Link>
//                                 </OverlayTrigger>
//                             </li>
//                             <li>
//                                 <OverlayTrigger placement="top" overlay={renderPrinterTooltip}>

//                                     <Link data-bs-toggle="tooltip" data-bs-placement="top">
//                                         <i data-feather="printer" className="feather-printer" />
//                                     </Link>
//                                 </OverlayTrigger>
//                             </li>
//                             <li>
//                                 <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>

//                                     <Link data-bs-toggle="tooltip" data-bs-placement="top">
//                                         <RotateCcw />
//                                     </Link>
//                                 </OverlayTrigger>
//                             </li>
//                             <li>
//                                 <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>

//                                     <Link
//                                         data-bs-toggle="tooltip"
//                                         data-bs-placement="top"
//                                         id="collapse-header"
//                                         className={data ? "active" : ""}
//                                         onClick={() => { dispatch(setToogleHeader(!data)) }}
//                                     >
//                                         <ChevronUp />
//                                     </Link>
//                                 </OverlayTrigger>
//                             </li>
//                         </ul>
//                         <div className="page-btn">
//                             <a
//                                 to="#"
//                                 className="btn btn-added"
//                                 data-bs-toggle="modal"
//                                 data-bs-target="#add-units"
//                             >
//                                 <PlusCircle className="me-2" />
//                                 Add New User
//                             </a>
//                         </div>
//                     </div>
//                     {/* /product list */}
//                     <div className="card table-list-card">
//                         <div className="card-body">
//                             <div className="table-top">
//                                 <div className="search-set">
//                                     <div className="search-input">
//                                         <input
//                                             type="text"
//                                             placeholder="Search"
//                                             className="form-control form-control-sm formsearch"
//                                         />
//                                         <Link to className="btn btn-searchset">
//                                             <i data-feather="search" className="feather-search" />
//                                         </Link>
//                                     </div>
//                                 </div>
//                                 <div className="search-path">
//                                     <Link className={`btn btn-filter ${isFilterVisible ? "setclose" : ""}`} id="filter_search">
//                                         <Filter
//                                             className="filter-icon"
//                                             onClick={toggleFilterVisibility}
//                                         />
//                                         <span onClick={toggleFilterVisibility}>
//                                             <ImageWithBasePath src="assets/img/icons/closes.svg" alt="img" />
//                                         </span>
//                                     </Link>
//                                 </div>
//                                 <div className="form-sort">
//                                     <Sliders className="info-img" />
//                                     <Select
//                                         className="select"
//                                         options={oldandlatestvalue}
//                                         placeholder="Newest"
//                                     />
//                                 </div>
//                             </div>
//                             {/* /Filter */}
//                             <div
//                                 className={`card${isFilterVisible ? ' visible' : ''}`}
//                                 id="filter_inputs"
//                                 style={{ display: isFilterVisible ? 'block' : 'none' }}
//                             >
//                                 <div className="card-body pb-0">
//                                     <div className="row">
//                                         <div className="col-lg-3 col-sm-6 col-12">
//                                             <div className="input-blocks">
//                                                 <User className="info-img" />

//                                                 <Select
//                                                     className="select"
//                                                     options={users}
//                                                     placeholder="Newest"
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="col-lg-3 col-sm-6 col-12">
//                                             <div className="input-blocks">
//                                                 <StopCircle className="info-img" />

//                                                 <Select
//                                                     className="select"
//                                                     options={status}
//                                                     placeholder="Choose Status"
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="col-lg-3 col-sm-6 col-12">
//                                             <div className="input-blocks">
//                                                 <Zap className="info-img" />

//                                                 <Select
//                                                     className="select"
//                                                     options={role}
//                                                     placeholder="Choose Role"
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="col-lg-3 col-sm-6 col-12">
//                                             <div className="input-blocks">
//                                                 <a className="btn btn-filters ms-auto">
//                                                     {" "}
//                                                     <i data-feather="search" className="feather-search" />{" "}
//                                                     Search{" "}
//                                                 </a>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             {/* /Filter */}
//                             <div className="table-responsive">
//                                 <Table columns={columns} dataSource={dataSource} />

//                             </div>
//                         </div>
//                     </div>
//                     {/* /product list */}
//                 </div>
//             </div>
//         <AddUsers/>
//         <EditUser/>
//         </div>
//     )
// }

// export default Users






// import React, { useState, useEffect } from 'react'
// import { OverlayTrigger, Tooltip } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import ImageWithBasePath from '../../core/img/imagewithbasebath';
// import { ChevronUp, RotateCcw } from 'feather-icons-react/build/IconComponents';
// import { setToogleHeader } from '../../core/redux/action';
// import { useDispatch, useSelector } from 'react-redux';
// import { Filter, PlusCircle, Sliders, StopCircle, User, Zap } from 'react-feather';
// import Select from 'react-select';
// import withReactContent from 'sweetalert2-react-content';
// import Swal from 'sweetalert2';
// import Table from '../../core/pagination/datatable'
// import AddUsers from '../../core/modals/usermanagement/addusers';
// import EditUser from '../../core/modals/usermanagement/edituser';
// import axiosInstance from '../../services/axiosInstance';

// const Users = () => {
//     const dispatch = useDispatch();
//     const data = useSelector((state) => state.toggle_header);
    
//     // State management
//     const [users, setUsers] = useState([]);
//     const [roles, setRoles] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [isFilterVisible, setIsFilterVisible] = useState(false);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [pagination, setPagination] = useState({
//         page: 1,
//         limit: 10,
//         totalPages: 1,
//         totalCount: 0
//     });
    
//     // Filter states
//     const [filters, setFilters] = useState({
//         search: '',
//         username: '',
//         status: '',
//         role: '',
//         sortBy: 'date'
//     });

//     // Fetch users from API
//     const fetchUsers = async () => {
//         setLoading(true);
//         try {
//             const params = {
//                 page: pagination.page,
//                 limit: pagination.limit
//             };

//             const response = await axiosInstance.get('/users', { params });
            
//             const usersData = response.data.users || [];
            
//             // Process users data to match frontend format
//             const processedUsers = usersData.map(user => ({
//                 ...user,
//                 username: user.username || user.name,
//                 img: user.avatar ? `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/${user.avatar}` : 'assets/img/avatar/avatar-default.jpg',
//                 createdon: new Date(user.created_at).toLocaleDateString(),
//                 status: user.status || 'Active'
//             }));

//             // Apply client-side filters
//             let filteredUsers = processedUsers;

//             if (filters.search) {
//                 filteredUsers = filteredUsers.filter(user => 
//                     user.username?.toLowerCase().includes(filters.search.toLowerCase()) ||
//                     user.email?.toLowerCase().includes(filters.search.toLowerCase()) ||
//                     user.phone?.includes(filters.search)
//                 );
//             }

//             if (filters.username) {
//                 filteredUsers = filteredUsers.filter(user => 
//                     user.username?.toLowerCase() === filters.username.toLowerCase()
//                 );
//             }

//             if (filters.status) {
//                 filteredUsers = filteredUsers.filter(user => 
//                     user.status === filters.status
//                 );
//             }

//             if (filters.role) {
//                 const selectedRole = roles.find(r => r.name === filters.role);
//                 if (selectedRole) {
//                     filteredUsers = filteredUsers.filter(user => 
//                         user.role_id === selectedRole.id
//                     );
//                 }
//             }

//             // Apply sorting
//             if (filters.sortBy === 'newest') {
//                 filteredUsers.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//             } else if (filters.sortBy === 'oldest') {
//                 filteredUsers.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
//             }

//             setUsers(filteredUsers);
//             setPagination(prev => ({
//                 ...prev,
//                 totalPages: response.data.totalPages || 1,
//                 totalCount: response.data.totalCount || filteredUsers.length
//             }));
//         } catch (error) {
//             console.error('Error fetching users:', error);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error',
//                 text: error.response?.data?.message || 'Failed to fetch users'
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Fetch roles from API
//     const fetchRoles = async () => {
//         try {
//             const response = await axiosInstance.get('/roles');
//             setRoles(response.data.roles || []);
//         } catch (error) {
//             console.error('Error fetching roles:', error);
//         }
//     };

//     // Initial data fetch
//     useEffect(() => {
//         fetchRoles();
//     }, []);

//     useEffect(() => {
//         fetchUsers();
//     }, [pagination.page, pagination.limit]);

//     // Debounced search
//     useEffect(() => {
//         const timeoutId = setTimeout(() => {
//             if (filters.search || filters.username || filters.status || filters.role) {
//                 fetchUsers();
//             }
//         }, 500);

//         return () => clearTimeout(timeoutId);
//     }, [filters.search, filters.username, filters.status, filters.role, filters.sortBy]);

//     const toggleFilterVisibility = () => {
//         setIsFilterVisible((prevVisibility) => !prevVisibility);
//     };

//     // Delete user
//     const handleDelete = async (userId) => {
//         const MySwal = withReactContent(Swal);
        
//         MySwal.fire({
//             title: 'Are you sure?',
//             text: 'You won\'t be able to revert this!',
//             showCancelButton: true,
//             confirmButtonColor: '#00ff00',
//             confirmButtonText: 'Yes, delete it!',
//             cancelButtonColor: '#ff0000',
//             cancelButtonText: 'Cancel',
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 try {
//                     await axiosInstance.delete(`/users/${userId}`);
//                     MySwal.fire({
//                         title: 'Deleted!',
//                         text: 'User has been deleted.',
//                         icon: 'success',
//                         confirmButtonText: 'OK',
//                         customClass: {
//                             confirmButton: 'btn btn-success',
//                         },
//                     });
//                     fetchUsers(); // Refresh list
//                 } catch (error) {
//                     MySwal.fire({
//                         icon: 'error',
//                         title: 'Error',
//                         text: error.response?.data?.message || 'Failed to delete user'
//                     });
//                 }
//             }
//         });
//     };

//     // Handle search input
//     const handleSearch = (e) => {
//         setFilters(prev => ({ ...prev, search: e.target.value }));
//     };

//     // Handle filter change
//     const handleFilterChange = (field, value) => {
//         setFilters(prev => ({ ...prev, [field]: value }));
//     };

//     // Handle filter search button
//     const handleFilterSearch = () => {
//         fetchUsers();
//     };

//     // Handle refresh
//     const handleRefresh = () => {
//         setFilters({
//             search: '',
//             username: '',
//             status: '',
//             role: '',
//             sortBy: 'date'
//         });
//         setPagination(prev => ({ ...prev, page: 1 }));
//         fetchUsers();
//     };

//     // Handle edit user
//     const handleEdit = (user) => {
//         setSelectedUser(user);
//     };

//     // Get role name by role_id
//     const getRoleName = (roleId) => {
//         const role = roles.find(r => r.id === roleId);
//         return role ? role.name : 'N/A';
//     };

//     // Prepare dropdown options
//     const sortOptions = [
//         { value: 'date', label: 'Sort by Date' },
//         { value: 'newest', label: 'Newest' },
//         { value: 'oldest', label: 'Oldest' },
//     ];

//     const userOptions = [
//         { value: '', label: 'Choose Name' },
//         ...Array.from(new Set(users.map(user => user.username)))
//             .map(username => ({ value: username, label: username }))
//     ];

//     const statusOptions = [
//         { value: '', label: 'Choose Status' },
//         { value: 'Active', label: 'Active' },
//         { value: 'Inactive', label: 'Inactive' },
//     ];

//     const roleOptions = [
//         { value: '', label: 'Choose Role' },
//         ...roles.map(role => ({ 
//             value: role.name, 
//             label: role.name 
//         }))
//     ];

//     const renderTooltip = (props) => (
//         <Tooltip id="pdf-tooltip" {...props}>Pdf</Tooltip>
//     );
//     const renderExcelTooltip = (props) => (
//         <Tooltip id="excel-tooltip" {...props}>Excel</Tooltip>
//     );
//     const renderPrinterTooltip = (props) => (
//         <Tooltip id="printer-tooltip" {...props}>Printer</Tooltip>
//     );
//     const renderRefreshTooltip = (props) => (
//         <Tooltip id="refresh-tooltip" {...props}>Refresh</Tooltip>
//     );
//     const renderCollapseTooltip = (props) => (
//         <Tooltip id="refresh-tooltip" {...props}>Collapse</Tooltip>
//     );

//     const columns = [
//         {
//             title: "User Name",
//             dataIndex: "username",
//             render: (text, record) => (
//                 <span className="userimgname">
//                     <Link to="#" className="userslist-img bg-img">
//                         <ImageWithBasePath 
//                             alt="" 
//                             src={record.img} 
//                         />
//                     </Link>
//                     <div>
//                         <Link to="#">{text}</Link>
//                     </div>
//                 </span>
//             ),
//             sorter: (a, b) => (a.username || '').localeCompare(b.username || ''),
//         },
//         {
//             title: "Phone",
//             dataIndex: "phone",
//             render: (text) => text || 'N/A',
//             sorter: (a, b) => (a.phone || '').localeCompare(b.phone || ''),
//         },
//         {
//             title: "Email",
//             dataIndex: "email",
//             sorter: (a, b) => (a.email || '').localeCompare(b.email || ''),
//         },
//         {
//             title: "Role",
//             dataIndex: "role_id",
//             render: (roleId) => getRoleName(roleId),
//             sorter: (a, b) => getRoleName(a.role_id).localeCompare(getRoleName(b.role_id)),
//         },
//         {
//             title: "Created On",
//             dataIndex: "createdon",
//             sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
//         },
//         {
//             title: "Status",
//             dataIndex: "status",
//             render: (text) => (
//                 <div>
//                     {text === "Active" && (
//                         <span className="badge badge-linesuccess">{text}</span>
//                     )}
//                     {text === "Inactive" && (
//                         <span className="badge badge-linedanger">{text}</span>
//                     )}
//                 </div>
//             ),
//             sorter: (a, b) => (a.status || '').localeCompare(b.status || ''),
//         },
//         {
//             title: 'Actions',
//             dataIndex: 'actions',
//             key: 'actions',
//             render: (_, record) => (
//                 <td className="action-table-data">
//                     <div className="edit-delete-action">
//                         <Link className="me-2 p-2" to={`/users/${record.id}`}>
//                             <i data-feather="eye" className="feather feather-eye action-eye"></i>
//                         </Link>
//                         <Link 
//                             className="me-2 p-2" 
//                             to="#" 
//                             data-bs-toggle="modal" 
//                             data-bs-target="#edit-units"
//                             onClick={() => handleEdit(record)}
//                         >
//                             <i data-feather="edit" className="feather-edit"></i>
//                         </Link>
//                         <Link 
//                             className="confirm-text p-2" 
//                             to="#"
//                             onClick={() => handleDelete(record.id)}
//                         >
//                             <i data-feather="trash-2" className="feather-trash-2"></i>
//                         </Link>
//                     </div>
//                 </td>
//             )
//         },
//     ];

//     return (
//         <div>
//             <div className="page-wrapper">
//                 <div className="content">
//                     <div className="page-header">
//                         <div className="add-item d-flex">
//                             <div className="page-title">
//                                 <h4>User List</h4>
//                                 <h6>Manage Your Users</h6>
//                             </div>
//                         </div>
//                         <ul className="table-top-head">
//                             <li>
//                                 <OverlayTrigger placement="top" overlay={renderTooltip}>
//                                     <Link>
//                                         <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
//                                     </Link>
//                                 </OverlayTrigger>
//                             </li>
//                             <li>
//                                 <OverlayTrigger placement="top" overlay={renderExcelTooltip}>
//                                     <Link>
//                                         <ImageWithBasePath src="assets/img/icons/excel.svg" alt="img" />
//                                     </Link>
//                                 </OverlayTrigger>
//                             </li>
//                             <li>
//                                 <OverlayTrigger placement="top" overlay={renderPrinterTooltip}>
//                                     <Link>
//                                         <i data-feather="printer" className="feather-printer" />
//                                     </Link>
//                                 </OverlayTrigger>
//                             </li>
//                             <li>
//                                 <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
//                                     <Link onClick={handleRefresh}>
//                                         <RotateCcw />
//                                     </Link>
//                                 </OverlayTrigger>
//                             </li>
//                             <li>
//                                 <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
//                                     <Link
//                                         id="collapse-header"
//                                         className={data ? "active" : ""}
//                                         onClick={() => { dispatch(setToogleHeader(!data)) }}
//                                     >
//                                         <ChevronUp />
//                                     </Link>
//                                 </OverlayTrigger>
//                             </li>
//                         </ul>
//                         <div className="page-btn">
//                             <a
//                                 to="#"
//                                 className="btn btn-added"
//                                 data-bs-toggle="modal"
//                                 data-bs-target="#add-units"
//                             >
//                                 <PlusCircle className="me-2" />
//                                 Add New User
//                             </a>
//                         </div>
//                     </div>

//                     <div className="card table-list-card">
//                         <div className="card-body">
//                             <div className="table-top">
//                                 <div className="search-set">
//                                     <div className="search-input">
//                                         <input
//                                             type="text"
//                                             placeholder="Search"
//                                             className="form-control form-control-sm formsearch"
//                                             value={filters.search}
//                                             onChange={handleSearch}
//                                         />
//                                         <Link to="#" className="btn btn-searchset">
//                                             <i data-feather="search" className="feather-search" />
//                                         </Link>
//                                     </div>
//                                 </div>
//                                 <div className="search-path">
//                                     <Link className={`btn btn-filter ${isFilterVisible ? "setclose" : ""}`}>
//                                         <Filter
//                                             className="filter-icon"
//                                             onClick={toggleFilterVisibility}
//                                         />
//                                         <span onClick={toggleFilterVisibility}>
//                                             <ImageWithBasePath src="assets/img/icons/closes.svg" alt="img" />
//                                         </span>
//                                     </Link>
//                                 </div>
//                                 <div className="form-sort">
//                                     <Sliders className="info-img" />
//                                     <Select
//                                         className="select"
//                                         options={sortOptions}
//                                         placeholder="Sort by Date"
//                                         value={sortOptions.find(opt => opt.value === filters.sortBy)}
//                                         onChange={(opt) => handleFilterChange('sortBy', opt.value)}
//                                     />
//                                 </div>
//                             </div>

//                             {/* Filter Section */}
//                             <div
//                                 className={`card${isFilterVisible ? ' visible' : ''}`}
//                                 id="filter_inputs"
//                                 style={{ display: isFilterVisible ? 'block' : 'none' }}
//                             >
//                                 <div className="card-body pb-0">
//                                     <div className="row">
//                                         <div className="col-lg-3 col-sm-6 col-12">
//                                             <div className="input-blocks">
//                                                 <User className="info-img" />
//                                                 <Select
//                                                     className="select"
//                                                     options={userOptions}
//                                                     placeholder="Choose Name"
//                                                     value={userOptions.find(opt => opt.value === filters.username)}
//                                                     onChange={(opt) => handleFilterChange('username', opt.value)}
//                                                     isClearable
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="col-lg-3 col-sm-6 col-12">
//                                             <div className="input-blocks">
//                                                 <StopCircle className="info-img" />
//                                                 <Select
//                                                     className="select"
//                                                     options={statusOptions}
//                                                     placeholder="Choose Status"
//                                                     value={statusOptions.find(opt => opt.value === filters.status)}
//                                                     onChange={(opt) => handleFilterChange('status', opt.value)}
//                                                     isClearable
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="col-lg-3 col-sm-6 col-12">
//                                             <div className="input-blocks">
//                                                 <Zap className="info-img" />
//                                                 <Select
//                                                     className="select"
//                                                     options={roleOptions}
//                                                     placeholder="Choose Role"
//                                                     value={roleOptions.find(opt => opt.value === filters.role)}
//                                                     onChange={(opt) => handleFilterChange('role', opt.value)}
//                                                     isClearable
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="col-lg-3 col-sm-6 col-12">
//                                             <div className="input-blocks">
//                                                 <a 
//                                                     className="btn btn-filters ms-auto"
//                                                     onClick={handleFilterSearch}
//                                                 >
//                                                     <i data-feather="search" className="feather-search" />
//                                                     Search
//                                                 </a>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Table */}
//                             <div className="table-responsive">
//                                 {loading ? (
//                                     <div className="text-center p-4">
//                                         <div className="spinner-border text-primary" role="status">
//                                             <span className="visually-hidden">Loading...</span>
//                                         </div>
//                                     </div>
//                                 ) : users.length > 0 ? (
//                                     <Table columns={columns} dataSource={users} />
//                                 ) : (
//                                     <div className="text-center p-4">
//                                         <p>No users found</p>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <AddUsers onSuccess={fetchUsers} roles={roles} />
//             <EditUser user={selectedUser} onSuccess={fetchUsers} roles={roles} />
//         </div>
//     )
// }

// export default Users


import React, { useState, useEffect } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ImageWithBasePath from '../../core/img/imagewithbasebath';
import { ChevronUp, RotateCcw } from 'feather-icons-react/build/IconComponents';
import { setToogleHeader } from '../../core/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { Filter, PlusCircle, Sliders, StopCircle, User, Zap } from 'react-feather';
import Select from 'react-select';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import Table from '../../core/pagination/datatable';
import AddUsers from '../../core/modals/usermanagement/addusers';
import EditUser from '../../core/modals/usermanagement/edituser';
import AuthService from '../../services/authService';

const Users = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector((state) => state.toggle_header);

    // State management
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
   
    
    const [filters, setFilters] = useState({
        search: '',
        username: '',
        status: '',
        role: '',
        sortBy: 'date'
    });

    // Redirect if not logged in
    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         navigate('/signin');
    //     }
    // }, [navigate]);

    useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token || token === 'undefined' || token === 'null') {
        navigate('/signin');
    }
}, [navigate]);


    // Fetch users from API
  const fetchUsers = async () => {
  setLoading(true);
  try {
    const response = await AuthService.getUser();
    const usersData = Array.isArray(response.data)
      ? response.data
      : response.data.users || [];

    const processedUsers = usersData.map((user) => ({
      ...user,
      username: user.username || user.name,
      img: user.avatar
        ? `${'http://localhost:5000'}/${user.avatar}`
        : 'assets/img/avatar/avatar-default.jpg',
      createdon: new Date(user.created_at).toLocaleDateString(),
      status: user.status || 'Active'
    }));

    let filteredUsers = processedUsers;

    if (filters.search) {
      filteredUsers = filteredUsers.filter(user =>
        user.username?.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.email?.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.phone?.includes(filters.search)
      );
    }

    if (filters.username) {
      filteredUsers = filteredUsers.filter(
        user => user.username?.toLowerCase() === filters.username.toLowerCase()
      );
    }

    if (filters.status) {
      filteredUsers = filteredUsers.filter(user => user.status === filters.status);
    }

    if (filters.role) {
      const selectedRole = roles.find(r => r.name === filters.role);
      if (selectedRole) {
        filteredUsers = filteredUsers.filter(user => user.role_id === selectedRole.id);
      }
    }

    // Sorting
    if (filters.sortBy === 'newest') {
      filteredUsers.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (filters.sortBy === 'oldest') {
      filteredUsers.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }

    setUsers(filteredUsers);
   
  } catch (error) {
    console.error('Error fetching users:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.response?.data?.message || 'Failed to fetch users'
    });
  } finally {
    setLoading(false);
  }
};

// Fetch roles
const fetchRoles = async () => {
  try {
    const response = await AuthService.getRoles();
    setRoles(response.data.roles || []);
  } catch (error) {
    console.error('Error fetching roles:', error);
  }
};


    useEffect(() => {
        fetchRoles();
        fetchUsers();
    }, []);

    // Debounced search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchUsers();
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [filters]);

    const toggleFilterVisibility = () => {
        setIsFilterVisible(prev => !prev);
    };

    // Delete user
    const handleDelete = async (userId) => {
        const MySwal = withReactContent(Swal);

        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: '#00ff00',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonColor: '#ff0000',
            cancelButtonText: 'Cancel',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await AuthService.deleteUserById(userId);
                    MySwal.fire({
                        title: 'Deleted!',
                        text: 'User has been deleted.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        customClass: { confirmButton: 'btn btn-success' },
                    });
                    fetchUsers();
                } catch (error) {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.response?.data?.message || 'Failed to delete user'
                    });
                }
            }
        });
    };

    const handleSearch = (e) => {
        setFilters(prev => ({ ...prev, search: e.target.value }));
    };

    const handleFilterChange = (field, value) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    const handleFilterSearch = () => {
        fetchUsers();
    };

    const handleRefresh = () => {
        setFilters({
            search: '',
            username: '',
            status: '',
            role: '',
            sortBy: 'date'
        });
       
        fetchUsers();
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
    };

    const getRoleName = (roleId) => {
        const role = roles.find(r => r.id === roleId);
        return role ? role.name : 'N/A';
    };

    const sortOptions = [
        { value: 'date', label: 'Sort by Date' },
        { value: 'newest', label: 'Newest' },
        { value: 'oldest', label: 'Oldest' },
    ];

    const userOptions = [
        { value: '', label: 'Choose Name' },
        ...Array.from(new Set(users.map(user => user.username)))
            .map(username => ({ value: username, label: username }))
    ];

    const statusOptions = [
        { value: '', label: 'Choose Status' },
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
    ];

    const roleOptions = [
        { value: '', label: 'Choose Role' },
        ...roles.map(role => ({ value: role.name, label: role.name }))
    ];

    const renderTooltip = (props) => <Tooltip id="pdf-tooltip" {...props}>Pdf</Tooltip>;
    const renderExcelTooltip = (props) => <Tooltip id="excel-tooltip" {...props}>Excel</Tooltip>;
    const renderPrinterTooltip = (props) => <Tooltip id="printer-tooltip" {...props}>Printer</Tooltip>;
    const renderRefreshTooltip = (props) => <Tooltip id="refresh-tooltip" {...props}>Refresh</Tooltip>;
    const renderCollapseTooltip = (props) => <Tooltip id="collapse-tooltip" {...props}>Collapse</Tooltip>;

    const columns = [
        {
            title: "User Name",
            dataIndex: "username",
            render: (text, record) => (
                <span className="userimgname">
                    <Link to="#" className="userslist-img bg-img">
                        <ImageWithBasePath alt="" src={record.img} />
                    </Link>
                    <div><Link to="#">{text}</Link></div>
                </span>
            ),
            sorter: (a, b) => (a.username || '').localeCompare(b.username || ''),
        },
        {
            title: "Phone",
            dataIndex: "phone",
            render: (text) => text || 'N/A',
            sorter: (a, b) => (a.phone || '').localeCompare(b.phone || ''),
        },
        {
            title: "Email",
            dataIndex: "email",
            sorter: (a, b) => (a.email || '').localeCompare(b.email || ''),
        },
        {
            title: "Role",
            dataIndex: "role_id",
            render: (roleId) => getRoleName(roleId),
            sorter: (a, b) => getRoleName(a.role_id).localeCompare(getRoleName(b.role_id)),
        },
        {
            title: "Created On",
            dataIndex: "createdon",
            sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (text) => (
                <div>
                    {text === "Active" && <span className="badge badge-linesuccess">{text}</span>}
                    {text === "Inactive" && <span className="badge badge-linedanger">{text}</span>}
                </div>
            ),
            sorter: (a, b) => (a.status || '').localeCompare(b.status || ''),
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <td className="action-table-data">
                    <div className="edit-delete-action">
                        <Link className="me-2 p-2" to={`/users/${record.id}`}>
                            <i data-feather="eye" className="feather feather-eye action-eye"></i>
                        </Link>
                        <Link
                            className="me-2 p-2"
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#edit-units"
                            onClick={() => handleEdit(record)}
                        >
                            <i data-feather="edit" className="feather-edit"></i>
                        </Link>
                        <Link
                            className="confirm-text p-2"
                            to="#"
                            onClick={() => handleDelete(record.id)}
                        >
                            <i data-feather="trash-2" className="feather-trash-2"></i>
                        </Link>
                    </div>
                </td>
            )
        },
    ];

    return (
        <div className="page-wrapper">
            <div className="content">
                <div className="page-header">
                    <div className="add-item d-flex">
                        <div className="page-title">
                            <h4>User List</h4>
                            <h6>Manage Your Users</h6>
                        </div>
                    </div>
                    <ul className="table-top-head">
                        <li><OverlayTrigger placement="top" overlay={renderTooltip}><Link><ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" /></Link></OverlayTrigger></li>
                        <li><OverlayTrigger placement="top" overlay={renderExcelTooltip}><Link><ImageWithBasePath src="assets/img/icons/excel.svg" alt="img" /></Link></OverlayTrigger></li>
                        <li><OverlayTrigger placement="top" overlay={renderPrinterTooltip}><Link><i data-feather="printer" className="feather-printer" /></Link></OverlayTrigger></li>
                        <li><OverlayTrigger placement="top" overlay={renderRefreshTooltip}><Link onClick={handleRefresh}><RotateCcw /></Link></OverlayTrigger></li>
                        <li><OverlayTrigger placement="top" overlay={renderCollapseTooltip}><Link id="collapse-header" className={data ? "active" : ""} onClick={() => dispatch(setToogleHeader(!data))}><ChevronUp /></Link></OverlayTrigger></li>
                    </ul>
                    <div className="page-btn">
                        <a to="#" className="btn btn-added" data-bs-toggle="modal" data-bs-target="#add-units">
                            <PlusCircle className="me-2" /> Add New User
                        </a>
                    </div>
                </div>

                <div className="card table-list-card">
                    <div className="card-body">
                        <div className="table-top">
                            <div className="search-set">
                                <div className="search-input">
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="form-control form-control-sm formsearch"
                                        value={filters.search}
                                        onChange={handleSearch}
                                    />
                                    <Link to="#" className="btn btn-searchset">
                                        <i data-feather="search" className="feather-search" />
                                    </Link>
                                </div>
                            </div>
                            <div className="search-path">
                                <Link className={`btn btn-filter ${isFilterVisible ? "setclose" : ""}`}>
                                    <Filter className="filter-icon" onClick={toggleFilterVisibility} />
                                    <span onClick={toggleFilterVisibility}>
                                        <ImageWithBasePath src="assets/img/icons/closes.svg" alt="img" />
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
                        <div className={`card${isFilterVisible ? ' visible' : ''}`} id="filter_inputs" style={{ display: isFilterVisible ? 'block' : 'none' }}>
                            <div className="card-body pb-0">
                                <div className="row">
                                    <div className="col-lg-3 col-sm-6 col-12">
                                        <div className="input-blocks">
                                            <User className="info-img" />
                                            <Select
                                                className="select"
                                                options={userOptions}
                                                placeholder="Choose Name"
                                                value={userOptions.find(opt => opt.value === filters.username)}
                                                onChange={(opt) => handleFilterChange('username', opt.value)}
                                                isClearable
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6 col-12">
                                        <div className="input-blocks">
                                            <StopCircle className="info-img" />
                                            <Select
                                                className="select"
                                                options={statusOptions}
                                                placeholder="Choose Status"
                                                value={statusOptions.find(opt => opt.value === filters.status)}
                                                onChange={(opt) => handleFilterChange('status', opt.value)}
                                                isClearable
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6 col-12">
                                        <div className="input-blocks">
                                            <Zap className="info-img" />
                                            <Select
                                                className="select"
                                                options={roleOptions}
                                                placeholder="Choose Role"
                                                value={roleOptions.find(opt => opt.value === filters.role)}
                                                onChange={(opt) => handleFilterChange('role', opt.value)}
                                                isClearable
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6 col-12">
                                        <div className="input-blocks">
                                            <a className="btn btn-filters ms-auto" onClick={handleFilterSearch}>
                                                <i data-feather="search" className="feather-search" /> Search
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
                            ) : users.length > 0 ? (
                                <Table columns={columns} dataSource={users} />
                            ) : (
                                <div className="text-center p-4">
                                    <p>No users found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <AddUsers onSuccess={fetchUsers} roles={roles} />
            <EditUser user={selectedUser} onSuccess={fetchUsers} roles={roles} />
        </div>
    );
};

export default Users;
