// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Filter, Sliders } from "react-feather";
// import Select from "react-select";
// import { Globe, User } from "react-feather";
// import ImageWithBasePath from "../../img/imagewithbasebath";
// import Breadcrumbs from "../../breadcrumbs";

// const WareHouses = () => {
//   const [isFilterVisible, setIsFilterVisible] = useState(false);
//   const toggleFilterVisibility = () => {
//     setIsFilterVisible((prevVisibility) => !prevVisibility);
//   };

//   const options = [
//     { value: "sortByDate", label: "Sort by Date" },
//     { value: "140923", label: "14 09 23" },
//     { value: "110923", label: "11 09 23" },
//   ];
//   const optionsTwo = [
//     { label: "Choose Store Name", value: "" },
//     { label: "Benjamin", value: "Benjamin" },
//     { label: "Ellen", value: "Ellen" },
//     { label: "Freda", value: "Freda" },
//     { label: "Kaitlin", value: "Kaitlin" },
//   ];

//   const countries = [
//     { label: "Choose Country", value: "" },
//     { label: "India", value: "India" },
//     { label: "USA", value: "USA" },
//   ];

//   const options1 = [
//     { value: "choose", label: "Choose" },
//     { value: "steven", label: "Steven" },
//     { value: "gravely", label: "Gravely" },
//   ];

//   const options2 = [
//     { value: "choose", label: "Choose" },
//     { value: "uk", label: "United Kingdom" },
//     { value: "us", label: "United States" },
//   ];

//   return (
//     <div className="page-wrapper">
//       <div className="content">
//         <Breadcrumbs
//           maintitle="Warehouse"
//           subtitle="Manage Your Warehouse"
//           addButton="Add New Warehouse"
//         />

//         {/* /product list */}
//         <div className="card table-list-card">
//           <div className="card-body">
//             <div className="table-top">
//               <div className="search-set">
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
//               </div>
//               <div className="search-path">
//                 <Link
//                   className={`btn btn-filter ${
//                     isFilterVisible ? "setclose" : ""
//                   }`}
//                   id="filter_search"
//                 >
//                   <Filter
//                     className="filter-icon"
//                     onClick={toggleFilterVisibility}
//                   />
//                   <span onClick={toggleFilterVisibility}>
//                     <ImageWithBasePath
//                       src="assets/img/icons/closes.svg"
//                       alt="img"
//                     />
//                   </span>
//                 </Link>
//               </div>
//               <div className="form-sort stylewidth">
//                 <Sliders className="info-img" />

//                 <Select
//                   className="select "
//                   options={options}
//                   placeholder="Sort by Date"
//                 />
//               </div>
//             </div>
//             {/* /Filter */}
//             <div
//               className={`card${isFilterVisible ? " visible" : ""}`}
//               id="filter_inputs"
//               style={{ display: isFilterVisible ? "block" : "none" }}
//             >
//               <div className="card-body pb-0">
//                 <div className="row">
//                   <div className="col-lg-3 col-sm-6 col-12">
//                     <div className="input-blocks">
//                       <User className="info-img" />
//                       <Select
//                         options={optionsTwo}
//                         placeholder="Choose Store Name"
//                       />
//                     </div>
//                   </div>
//                   <div className="col-lg-3 col-sm-6 col-12">
//                     <div className="input-blocks">
//                       <Globe className="info-img" />
//                       <Select
//                         options={countries}
//                         placeholder="Choose Country"
//                       />
//                     </div>
//                   </div>
//                   <div className="col-lg-3 col-sm-6 col-12 ms-auto">
//                     <div className="input-blocks">
//                       <Link className="btn btn-filters ms-auto">
//                         {" "}
//                         <i
//                           data-feather="search"
//                           className="feather-search"
//                         />{" "}
//                         Search{" "}
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {/* /Filter */}
//             <div className="table-responsive">
//               <table className="table  datanew">
//                 <thead>
//                   <tr>
//                     <th className="no-sort">
//                       <label className="checkboxs">
//                         <input type="checkbox" id="select-all" />
//                         <span className="checkmarks" />
//                       </label>
//                     </th>
//                     <th>Warehouse</th>
//                     <th>Contact Person</th>
//                     <th>Phone</th>
//                     <th>Total Products</th>
//                     <th>Stock</th>
//                     <th>Qty</th>
//                     <th>Created On</th>
//                     <th>Status</th>
//                     <th className="no-sort">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>
//                       <label className="checkboxs">
//                         <input type="checkbox" />
//                         <span className="checkmarks" />
//                       </label>
//                     </td>
//                     <td>Legendary</td>
//                     <td>
//                       <div className="userimgname">
//                         <Link to="#" className="product-img">
//                           <ImageWithBasePath
//                             src="assets/img/users/user-08.jpg"
//                             alt="product"
//                           />
//                         </Link>
//                         <Link to="#">Steven</Link>
//                       </div>
//                     </td>
//                     <td>+1 45445 4454</td>
//                     <td>04</td>
//                     <td>55</td>
//                     <td>600</td>
//                     <td>04 Aug 2023</td>
//                     <td>
//                       <span className="badge badge-linesuccess">Active</span>
//                     </td>
//                     <td className="action-table-data">
//                       <div className="edit-delete-action">
//                         <Link
//                           className="me-2 edit-icon p-2"
//                           to="#"
//                           data-bs-toggle="modal"
//                           data-bs-target="#edit-units"
//                         >
//                           <i data-feather="eye" className="feather-eye" />
//                         </Link>
//                         <Link
//                           className="me-2 p-2"
//                           to="#"
//                           data-bs-toggle="modal"
//                           data-bs-target="#edit-units"
//                         >
//                           <i data-feather="edit" className="feather-edit" />
//                         </Link>
//                         <Link className="confirm-text p-2" to="#">
//                           <i
//                             data-feather="trash-2"
//                             className="feather-trash-2"
//                           />
//                         </Link>
//                       </div>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <label className="checkboxs">
//                         <input type="checkbox" />
//                         <span className="checkmarks" />
//                       </label>
//                     </td>
//                     <td>Determined</td>
//                     <td>
//                       <div className="userimgname">
//                         <Link to="#" className="product-img">
//                           <ImageWithBasePath
//                             src="assets/img/users/user-04.jpg"
//                             alt="product"
//                           />
//                         </Link>
//                         <Link to="#">Gravely</Link>
//                       </div>
//                     </td>
//                     <td>+1 63728 3467</td>
//                     <td>04</td>
//                     <td>60</td>
//                     <td>300</td>
//                     <td>18 Sep 2023</td>
//                     <td>
//                       <span className="badge badge-linesuccess">Active</span>
//                     </td>
//                     <td className="action-table-data">
//                       <div className="edit-delete-action">
//                         <Link
//                           className="me-2 edit-icon p-2"
//                           to="#"
//                           data-bs-toggle="modal"
//                           data-bs-target="#edit-units"
//                         >
//                           <i data-feather="eye" className="feather-eye" />
//                         </Link>
//                         <Link
//                           className="me-2 p-2"
//                           to="#"
//                           data-bs-toggle="modal"
//                           data-bs-target="#edit-units"
//                         >
//                           <i data-feather="edit" className="feather-edit" />
//                         </Link>
//                         <Link className="confirm-text p-2" to="#">
//                           <i
//                             data-feather="trash-2"
//                             className="feather-trash-2"
//                           />
//                         </Link>
//                       </div>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <label className="checkboxs">
//                         <input type="checkbox" />
//                         <span className="checkmarks" />
//                       </label>
//                     </td>
//                     <td>Sincere</td>
//                     <td>
//                       <div className="userimgname">
//                         <Link to="#" className="product-img">
//                           <ImageWithBasePath
//                             src="assets/img/users/user-09.jpg"
//                             alt="product"
//                           />
//                         </Link>
//                         <Link to="#">Kevin</Link>
//                       </div>
//                     </td>
//                     <td>+1 95628 1036</td>
//                     <td>04</td>
//                     <td>26</td>
//                     <td>250</td>
//                     <td>05 Oct 2023</td>
//                     <td>
//                       <span className="badge badge-linesuccess">Active</span>
//                     </td>
//                     <td className="action-table-data">
//                       <div className="edit-delete-action">
//                         <Link
//                           className="me-2 edit-icon p-2"
//                           to="#"
//                           data-bs-toggle="modal"
//                           data-bs-target="#edit-units"
//                         >
//                           <i data-feather="eye" className="feather-eye" />
//                         </Link>
//                         <Link
//                           className="me-2 p-2"
//                           to="#"
//                           data-bs-toggle="modal"
//                           data-bs-target="#edit-units"
//                         >
//                           <i data-feather="edit" className="feather-edit" />
//                         </Link>
//                         <Link className="confirm-text p-2" to="#">
//                           <i
//                             data-feather="trash-2"
//                             className="feather-trash-2"
//                           />
//                         </Link>
//                       </div>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <label className="checkboxs">
//                         <input type="checkbox" />
//                         <span className="checkmarks" />
//                       </label>
//                     </td>
//                     <td>Pretty</td>
//                     <td>
//                       <div className="userimgname">
//                         <Link to="#" className="product-img">
//                           <ImageWithBasePath
//                             src="assets/img/users/user-10.jpg"
//                             alt="product"
//                           />
//                         </Link>
//                         <Link to="#">Grillo</Link>
//                       </div>
//                     </td>
//                     <td>+1 65730 1603</td>
//                     <td>04</td>
//                     <td>47</td>
//                     <td>400</td>
//                     <td>21 Nov 2023</td>
//                     <td>
//                       <span className="badge badge-linesuccess">Active</span>
//                     </td>
//                     <td className="action-table-data">
//                       <div className="edit-delete-action">
//                         <Link
//                           className="me-2 edit-icon p-2"
//                           to="#"
//                           data-bs-toggle="modal"
//                           data-bs-target="#edit-units"
//                         >
//                           <i data-feather="eye" className="feather-eye" />
//                         </Link>
//                         <Link
//                           className="me-2 p-2"
//                           to="#"
//                           data-bs-toggle="modal"
//                           data-bs-target="#edit-units"
//                         >
//                           <i data-feather="edit" className="feather-edit" />
//                         </Link>
//                         <Link className="confirm-text p-2" to="#">
//                           <i
//                             data-feather="trash-2"
//                             className="feather-trash-2"
//                           />
//                         </Link>
//                       </div>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//         {/* /product list */}
//       </div>

//       <div>
//         {/* Add Warehouse */}
//         <div className="modal fade" id="add-units">
//           <div className="modal-dialog modal-dialog-centered custom-modal-two">
//             <div className="modal-content">
//               <div className="page-wrapper-new p-0">
//                 <div className="content">
//                   <div className="modal-header border-0 custom-modal-header">
//                     <div className="page-title">
//                       <h4>Add Warehouse</h4>
//                     </div>
//                     <button
//                       type="button"
//                       className="close"
//                       data-bs-dismiss="modal"
//                       aria-label="Close"
//                     >
//                       <span aria-hidden="true">×</span>
//                     </button>
//                   </div>
//                   <div className="modal-body custom-modal-body">
//                     <form>
//                       <div className="modal-title-head">
//                         <h6>
//                           <span>
//                             <i data-feather="info" className="feather-edit" />
//                           </span>
//                           Warehouse Info
//                         </h6>
//                       </div>
//                       <div className="row">
//                         <div className="col-lg-6">
//                           <div className="mb-3">
//                             <label className="form-label">Name</label>
//                             <input type="text" className="form-control" />
//                           </div>
//                         </div>
//                         <div className="col-lg-6">
//                           <div className="input-blocks">
//                             <label>Contact Person</label>
//                             <Select className="select" options={options1} />
//                           </div>
//                         </div>
//                         <div className="col-lg-6">
//                           <div className="mb-3 war-add">
//                             <label className="mb-2">Phone Number</label>
//                             <input
//                               className="form-control"
//                               id="phone"
//                               name="phone"
//                               type="text"
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-6">
//                           <div className="mb-3">
//                             <label className="form-label">Work Phone</label>
//                             <input type="text" className="form-control" />
//                           </div>
//                         </div>
//                         <div className="col-lg-12">
//                           <div className="mb-3">
//                             <label className="form-label">Email</label>
//                             <input type="email" className="form-control" />
//                           </div>
//                         </div>
//                         <div className="modal-title-head">
//                           <h6>
//                             <span>
//                               <i data-feather="map-pin" />
//                             </span>
//                             Location
//                           </h6>
//                         </div>
//                         <div className="col-lg-12">
//                           <div className="mb-3">
//                             <label className="form-label">Address 1</label>
//                             <input type="text" className="form-control" />
//                           </div>
//                         </div>
//                         <div className="col-lg-12">
//                           <div className="mb-3">
//                             <label className="form-label">Address 2</label>
//                             <input type="text" className="form-control" />
//                           </div>
//                         </div>
//                         <div className="col-lg-6">
//                           <div className="input-blocks">
//                             <label>Country</label>
//                             <Select className="select" options={options2} />
//                           </div>
//                         </div>
//                         <div className="col-lg-6">
//                           <div className="mb-3">
//                             <label className="form-label">State</label>
//                             <input type="text" className="form-control" />
//                           </div>
//                         </div>
//                         <div className="col-lg-6">
//                           <div className="mb-3 mb-0">
//                             <label className="form-label">City</label>
//                             <input type="text" className="form-control" />
//                           </div>
//                         </div>
//                         <div className="col-lg-6">
//                           <div className="mb-3 mb-0">
//                             <label className="form-label">Zipcode</label>
//                             <input type="text" className="form-control" />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="modal-footer-btn">
//                         <button
//                           type="button"
//                           className="btn btn-cancel me-2"
//                           data-bs-dismiss="modal"
//                         >
//                           Cancel
//                         </button>
//                         <button type="submit" className="btn btn-submit">
//                           Create Warehouse
//                         </button>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* /Add Warehouse */}
//         {/* Edit Warehouse */}
//         <div className="modal fade" id="edit-units">
//           <div className="modal-dialog modal-dialog-centered custom-modal-two">
//             <div className="modal-content">
//               <div className="page-wrapper-new p-0">
//                 <div className="content">
//                   <div className="modal-header border-0 custom-modal-header">
//                     <div className="page-title">
//                       <h4>Edit Warehouse</h4>
//                     </div>
//                     <button
//                       type="button"
//                       className="close"
//                       data-bs-dismiss="modal"
//                       aria-label="Close"
//                     >
//                       <span aria-hidden="true">×</span>
//                     </button>
//                   </div>
//                   <div className="modal-body custom-modal-body">
//                     <form>
//                       <div className="modal-title-head">
//                         <h6>
//                           <span>
//                             <i data-feather="info" className="feather-edit" />
//                           </span>
//                           Warehouse Info
//                         </h6>
//                       </div>
//                       <div className="row">
//                         <div className="col-lg-6">
//                           <div className="mb-3">
//                             <label className="form-label">Name</label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               defaultValue="Legendary"
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-6">
//                           <div className="input-blocks">
//                             <label>Contact Person</label>
//                             <Select className="select" options={options1} />
//                           </div>
//                         </div>
//                         <div className="col-lg-6">
//                           <div className="mb-3 war-edit-phone">
//                             <label className="mb-2">Phone Number</label>
//                             <input
//                               className="form-control"
//                               id="phone2"
//                               name="phone"
//                               type="text"
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-6">
//                           <div className="mb-3 war-edit-phone">
//                             <label className="form-label">Work Phone</label>
//                             <input
//                               className="form-control"
//                               id="phone3"
//                               name="phone"
//                               type="text"
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-12">
//                           <div className="mb-3">
//                             <label className="form-label">Email</label>
//                             <input
//                               type="email"
//                               className="form-control"
//                               defaultValue="stevenlegendary@example.com"
//                             />
//                           </div>
//                         </div>
//                         <div className="modal-title-head">
//                           <h6>
//                             <span>
//                               <i data-feather="map-pin" />
//                             </span>
//                             Location
//                           </h6>
//                         </div>
//                         <div className="col-lg-12">
//                           <div className="mb-3">
//                             <label className="form-label">Address 1</label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               defaultValue="Admiral Street"
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-12">
//                           <div className="input-blocks">
//                             <label className="form-label">Address 2</label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               defaultValue="Aire Street"
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-6">
//                           <div className="input-blocks">
//                             <label>Country</label>
//                             <Select className="select" options={options2} />
//                           </div>
//                         </div>
//                         <div className="col-lg-6">
//                           <div className="mb-3">
//                             <label className="form-label">State</label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               defaultValue="East England"
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-6">
//                           <div className="mb-3 mb-0">
//                             <label className="form-label">City</label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               defaultValue="Leeds"
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-6">
//                           <div className="mb-3 mb-0">
//                             <label className="form-label">Zipcode</label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               defaultValue="LS1"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="modal-footer-btn">
//                         <button
//                           type="button"
//                           className="btn btn-cancel me-2"
//                           data-bs-dismiss="modal"
//                         >
//                           Cancel
//                         </button>
//                         <button type="submit" className="btn btn-submit">
//                           Save Changes
//                         </button>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WareHouses;








// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Filter, Sliders } from "react-feather";
// import Select from "react-select";
// // import { Globe, User } from "react-feather";
// import ImageWithBasePath from "../../img/imagewithbasebath";
// import Breadcrumbs from "../../breadcrumbs";
// // import { toast } from "react-toastify";
// import AuthService from "../../../services/authService";

// const WareHouses = () => {
//   const [isFilterVisible, setIsFilterVisible] = useState(false);
//   const [warehouses, setWarehouses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [users, setUsers] = useState([]);
//   // const [countries, setCountries] = useState([]);
//   // const [storeNames, setStoreNames] = useState([]);
  
//   // Filter states
//   const [searchTerm, setSearchTerm] = useState("");
//   // const [selectedStore, setSelectedStore] = useState(null);
//   // const [selectedCountry, setSelectedCountry] = useState(null);
//   const [sortBy, setSortBy] = useState(null);
  
//   // Form states
//   const [formData, setFormData] = useState({
//     title: "",
//     user_id: "",
//     phone_1: "",
//     email_1: "",
//     address:"",
//     status: "active"
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [selectedIds, setSelectedIds] = useState([]);

//   useEffect(() => {
//     fetchWarehouses();
//     fetchUsers();
//     // fetchFilterOptions();
//   }, []);

//   const fetchWarehouses = async () => {
//     try {
//       setLoading(true);
    
      
//       const response = await AuthService.getWarehouse();
//       setWarehouses(response.data.data);
//     } catch (error) {
//       console.error("Error fetching warehouses:", error);
//       console.error("Failed to load warehouses");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const response = await AuthService.getUser();
//       setUsers(response.data.users || []);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   // const fetchFilterOptions = async () => {
//   //   try {
//   //     const [countriesRes, storesRes] = await Promise.all([
//   //       WarehouseService.getCountries(),
//   //       WarehouseService.getStoreNames()
//   //     ]);
      
//   //     setCountries(
//   //       countriesRes.data.data.map(c => ({ label: c, value: c }))
//   //     );
//   //     setStoreNames(
//   //       storesRes.data.data.map(s => ({ label: s, value: s }))
//   //     );
//   //   } catch (error) {
//   //     console.error("Error fetching filter options:", error);
//   //   }
//   // };

//   const handleSearch = () => {
//     fetchWarehouses();
//   };

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingId) {
//         await AuthService.updateWarehouse(editingId, formData);
//         console.success("Warehouse updated successfully");
//       } else {
//         await AuthService.createWarehouse(formData);
//         console.success("Warehouse created successfully");
//       }
//       resetForm();
//       fetchWarehouses();
//       document.querySelector('[data-bs-dismiss="modal"]')?.click();
//     } catch (error) {
//       console.error("Error saving warehouse:", error);
//       console.error(error.response?.data?.message || "Failed to save warehouse");
//     }
//   };

//   const handleEdit = async (id) => {
//     try {
//       const response = await AuthService.getWarehouseById(id);
//       setFormData(response.data.data);
//       setEditingId(id);
//     } catch (error) {
//       console.error("Error fetching warehouse:", error);
//       console.error("Failed to load warehouse details");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this warehouse?")) {
//       try {
//         await AuthService.deleteWarehouse(id);
//         console.success("Warehouse deleted successfully");
//         fetchWarehouses();
//       } catch (error) {
//         console.error("Error deleting warehouse:", error);
//         console.error("Failed to delete warehouse");
//       }
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       title: "",
//       user_id: "",
//       phone_1: "",
//       email_1: "",
//       address:"",
//       status: "active"
//     });
//     setEditingId(null);
//   };

//   const toggleFilterVisibility = () => {
//     setIsFilterVisible(!isFilterVisible);
//   };

//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       setSelectedIds(warehouses.map(w => w.id));
//     } else {
//       setSelectedIds([]);
//     }
//   };

//   const handleSelectOne = (id) => {
//     if (selectedIds.includes(id)) {
//       setSelectedIds(selectedIds.filter(i => i !== id));
//     } else {
//       setSelectedIds([...selectedIds, id]);
//     }
//   };

//   const sortOptions = [
//     { value: "date_desc", label: "Sort by Date (Newest)" },
//     { value: "date_asc", label: "Sort by Date (Oldest)" },
//   ];

//   const userOptions = users.map(u => ({ 
//     label: u.name, 
//     value: u.id 
//   }));

//   // const countryOptions = [
//   //   { label: "Choose Country", value: "" },
//   //   { label: "India", value: "India" },
//   //   { label: "USA", value: "USA" },
//   //   { label: "United Kingdom", value: "United Kingdom" },
//   // ];

//   return (
//     <div className="page-wrapper">
//       <div className="content">
//         <Breadcrumbs
//           maintitle="Warehouse"
//           subtitle="Manage Your Warehouse"
//           addButton="Add New Warehouse"
//           onAddClick={() => {
//             resetForm();
//             document.querySelector('[data-bs-target="#add-units"]')?.click();
//           }}
//         />

//         <div className="card table-list-card">
//           <div className="card-body">
//             <div className="table-top">
//               <div className="search-set">
//                 <div className="search-input">
//                   <input
//                     type="text"
//                     placeholder="Search"
//                     className="form-control form-control-sm formsearch"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//                   />
//                   <Link to="#" className="btn btn-searchset" onClick={handleSearch}>
//                     <i data-feather="search" className="feather-search" />
//                   </Link>
//                 </div>
//               </div>
//               <div className="search-path">
//                 <Link
//                   className={`btn btn-filter ${isFilterVisible ? "setclose" : ""}`}
//                   id="filter_search"
//                   onClick={toggleFilterVisibility}
//                 >
//                   <Filter className="filter-icon" />
//                   <span>
//                     <ImageWithBasePath src="assets/img/icons/closes.svg" alt="img" />
//                   </span>
//                 </Link>
//               </div>
//               <div className="form-sort stylewidth">
//                 <Sliders className="info-img" />
//                 <Select
//                   className="select"
//                   options={sortOptions}
//                   placeholder="Sort by Date"
//                   value={sortBy}
//                   onChange={(option) => {
//                     setSortBy(option);
//                     fetchWarehouses({ sortBy: option.value });
//                   }}
//                 />
//               </div>
//             </div>

//             {/* Filter */}
//             <div
//               className={`card${isFilterVisible ? " visible" : ""}`}
//               id="filter_inputs"
//               style={{ display: isFilterVisible ? "block" : "none" }}
//             >
//               <div className="card-body pb-0">
//                 <div className="row">
              
                 
//                   <div className="col-lg-3 col-sm-6 col-12 ms-auto">
//                     <div className="input-blocks">
//                       <Link className="btn btn-filters ms-auto" onClick={handleSearch}>
//                         <i data-feather="search" className="feather-search" /> Search
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="table-responsive">
//               {loading ? (
//                 <div className="text-center p-4">Loading...</div>
//               ) : (
//                 <table className="table datanew">
//                   <thead>
//                     <tr>
//                       <th className="no-sort">
//                         <label className="checkboxs">
//                           <input 
//                             type="checkbox" 
//                             id="select-all"
//                             checked={selectedIds.length === warehouses.length && warehouses.length > 0}
//                             onChange={handleSelectAll}
//                           />
//                           <span className="checkmarks" />
//                         </label>
//                       </th>
//                       <th>Warehouse</th>
//                       <th>Contact Person</th>
//                       <th>Phone</th>
//                       <th>Email</th>
//                       {/* <th>Total Products</th> */}
//                       {/* <th>Stock</th> */}
//                       <th>Qty</th>
//                       <th>Created On</th>
//                       <th>Status</th>
//                       <th className="no-sort">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {warehouses.length === 0 ? (
//                       <tr>
//                         <td colSpan="10" className="text-center">No warehouses found</td>
//                       </tr>
//                     ) : (
//                       warehouses.map((warehouse) => (
//                         <tr key={warehouse.id}>
//                           <td>
//                             <label className="checkboxs">
//                               <input 
//                                 type="checkbox"
//                                 checked={selectedIds.includes(warehouse.id)}
//                                 onChange={() => handleSelectOne(warehouse.id)}
//                               />
//                               <span className="checkmarks" />
//                             </label>
//                           </td>
//                           <td>{warehouse.name}</td>
//                           <td>
//                             <div className="userimgname">
//                               <Link to="#" className="product-img">
//                                 <ImageWithBasePath
//                                   src={warehouse.contact_person_image || "assets/img/users/user-08.jpg"}
//                                   alt="product"
//                                 />
//                               </Link>
//                               <Link to="#">{warehouse.contact_person_name || "N/A"}</Link>
//                             </div>
//                           </td>
//                           <td>{warehouse.phone || "N/A"}</td>
//                           <td>{warehouse.total_products}</td>
//                           <td>{warehouse.total_stock}</td>
//                           <td>{warehouse.total_qty}</td>
//                           <td>{new Date(warehouse.created_at).toLocaleDateString()}</td>
//                           <td>
//                             <span className={`badge ${warehouse.status === 'active' ? 'badge-linesuccess' : 'badge-linedanger'}`}>
//                               {warehouse.status === 'active' ? 'Active' : 'Inactive'}
//                             </span>
//                           </td>
//                           <td className="action-table-data">
//                             <div className="edit-delete-action">
//                               <Link
//                                 className="me-2 edit-icon p-2"
//                                 to="#"
//                                 onClick={() => handleEdit(warehouse.id)}
//                                 data-bs-toggle="modal"
//                                 data-bs-target="#edit-units"
//                               >
//                                 <i data-feather="eye" className="feather-eye" />
//                               </Link>
//                               <Link
//                                 className="me-2 p-2"
//                                 to="#"
//                                 onClick={() => handleEdit(warehouse.id)}
//                                 data-bs-toggle="modal"
//                                 data-bs-target="#edit-units"
//                               >
//                                 <i data-feather="edit" className="feather-edit" />
//                               </Link>
//                               <Link 
//                                 className="confirm-text p-2" 
//                                 to="#"
//                                 onClick={() => handleDelete(warehouse.id)}
//                               >
//                                 <i data-feather="trash-2" className="feather-trash-2" />
//                               </Link>
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Add/Edit Modal */}
//       <div className="modal fade" id={editingId ? "edit-units" : "add-units"}>
//         <div className="modal-dialog modal-dialog-centered custom-modal-two">
//           <div className="modal-content">
//             <div className="page-wrapper-new p-0">
//               <div className="content">
//                 <div className="modal-header border-0 custom-modal-header">
//                   <div className="page-title">
//                     <h4>{editingId ? "Edit" : "Add"} Warehouse</h4>
//                   </div>
//                   <button
//                     type="button"
//                     className="close"
//                     data-bs-dismiss="modal"
//                     aria-label="Close"
//                     onClick={resetForm}
//                   >
//                     <span aria-hidden="true">×</span>
//                   </button>
//                 </div>
//                 <div className="modal-body custom-modal-body">
//                   <form onSubmit={handleSubmit}>
//                     <div className="modal-title-head">
//                       <h6>
//                         <span>
//                           <i data-feather="info" className="feather-edit" />
//                         </span>
//                         Warehouse Info
//                       </h6>
//                     </div>
//                     <div className="row">
//                       <div className="col-lg-6">
//                         <div className="mb-3">
//                           <label className="form-label">Title *</label>
//                           <input 
//                             type="text" 
//                             className="form-control"
//                             name="title"
//                             value={formData.title}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                       <div className="col-lg-6">
//                         <div className="input-blocks">
//                           <label>Contact Person</label>
//                           <Select 
//                             className="select" 
//                             options={userOptions}
//                             value={userOptions.find(u => u.value === formData.contact_person_id)}
//                             onChange={(option) => setFormData({...formData, contact_person_id: option?.value || ""})}
//                             isClearable
//                           />
//                         </div>
//                       </div>
//                       <div className="col-lg-6">
//                         <div className="mb-3">
//                           <label className="form-label">Phone Number</label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             name="phone"
//                             value={formData.phone_1}
//                             onChange={handleInputChange}
//                           />
//                         </div>
//                       </div>
                    
//                       <div className="col-lg-12">
//                         <div className="mb-3">
//                           <label className="form-label">Email</label>
//                           <input 
//                             type="email" 
//                             className="form-control"
//                             name="email"
//                             value={formData.email_1}
//                             onChange={handleInputChange}
//                           />
//                         </div>
//                       </div>
//                       <div className="modal-title-head">
//                         <h6>
//                           <span>
//                             <i data-feather="map-pin" />
//                           </span>
//                           Location
//                         </h6>
//                       </div>
//                       <div className="col-lg-12">
//                         <div className="mb-3">
//                           <label className="form-label">Address 1</label>
//                           <input 
//                             type="text" 
//                             className="form-control"
//                             name="address_1"
//                             value={formData.address}
//                             onChange={handleInputChange}
//                           />
//                         </div>
//                       </div>
                    
                      
                    
                    
                     
//                     </div>
//                     <div className="modal-footer-btn">
//                       <button
//                         type="button"
//                         className="btn btn-cancel me-2"
//                         data-bs-dismiss="modal"
//                         onClick={resetForm}
//                       >
//                         Cancel
//                       </button>
//                       <button type="submit" className="btn btn-submit">
//                         {editingId ? "Save Changes" : "Create Warehouse"}
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WareHouses;



// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Filter, Sliders } from "react-feather";
// import Select from "react-select";
// import ImageWithBasePath from "../../img/imagewithbasebath";
// import Breadcrumbs from "../../breadcrumbs";
// import AuthService from "../../../services/authService";


// const WareHouses = () => {


//   const [isFilterVisible, setIsFilterVisible] = useState(false);
//   const [warehouses, setWarehouses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState(null);
//   const [formData, setFormData] = useState({
//     wh_title: "",
//     user_id: "",
//     phone_1: "",
//     email_1: "",
//     address: "",
//     // status: "active",
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [selectedIds, setSelectedIds] = useState([]);

//   useEffect(() => {
//     fetchWarehouses();
//     fetchUsers();
//   }, []);

//   const fetchWarehouses = async () => {
//     try {
//       setLoading(true);
//       const response = await AuthService.getWarehouse({ searchTerm, sortBy });
//       setWarehouses(response.data.data);
//     } catch (error) {
//       console.log("Error fetching warehouses:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const response = await AuthService.getUser();
//       setUsers(response.data.users || []);
//     } catch (error) {
//       console.log("Error fetching users:", error);
//     }
//   };

//   const handleSearch = () => {
//     fetchWarehouses();
//   };

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingId) {
//         await AuthService.updateWarehouse(editingId, formData);
//         console.success("Warehouse updated successfully");
//       } else {
//         await AuthService.createWarehouse(formData);
//         console.success("Warehouse created successfully");
//       }
//       resetForm();
//       fetchWarehouses();
//       document.querySelector('[data-bs-dismiss="modal"]')?.click();
//     } catch (error) {
//       console.error("Error saving warehouse:", error);
//       console.error(error.response?.data?.message || "Failed to save warehouse");
//     }
//   };

// const handleEdit = async (id) => {
//   try {
//     const response = await AuthService.getWarehouseById(id);
//     setFormData(response.data.data); // Assuming response.data.data has the correct structure
//     setEditingId(id);
//   } catch (error) {
//     console.log("Error fetching warehouse:", error);
//   }
// };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this warehouse?")) {
//       try {
//         await AuthService.deleteWarehouse(id);
//         console.success("Warehouse deleted successfully");
//         fetchWarehouses();
//       } catch (error) {
//         console.log("Error deleting warehouse:", error);
//         console.error("Failed to delete warehouse");
//       }
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       wh_title: "",
//       user_id: "",
//       phone_1: "",
//       email_1: "",
//       wh_address: "",
//       // status: "active",
//     });
//     setEditingId(null);
//   };

//   const toggleFilterVisibility = () => {
//     setIsFilterVisible(!isFilterVisible);
//   };

//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       setSelectedIds(warehouses.map((w) => w.id));
//     } else {
//       setSelectedIds([]);
//     }
//   };

//   const handleSelectOne = (id) => {
//     if (selectedIds.includes(id)) {
//       setSelectedIds(selectedIds.filter((i) => i !== id));
//     } else {
//       setSelectedIds([...selectedIds, id]);
//     }
//   };

//   const sortOptions = [
//     { value: "date_desc", label: "Sort by Date (Newest)" },
//     { value: "date_asc", label: "Sort by Date (Oldest)" },
//   ];

//   const userOptions = users.map((u) => ({ label: u.name, value: u.id }));

//   return (
//     <div className="page-wrapper">
//       <div className="content">
//         <Breadcrumbs
//           maintitle="Warehouse"
//           subtitle="Manage Your Warehouse"
//           addButton="Add New Warehouse"
//           onAddClick={() => {
//             resetForm();
//             document.querySelector('[data-bs-target="#add-units"]')?.click();
//           }}
//         />

//         <div className="card table-list-card">
//           <div className="card-body">
//             <div className="table-top">
//               <div className="search-set">
//                 <div className="search-input">
//                   <input
//                     type="text"
//                     placeholder="Search"
//                     className="form-control form-control-sm formsearch"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//                   />
//                   <Link to="#" className="btn btn-searchset" onClick={handleSearch}>
//                     <i data-feather="search" className="feather-search" />
//                   </Link>
//                 </div>
//               </div>
//               <div className="search-path">
//                 <Link
//                   className={`btn btn-filter ${isFilterVisible ? "setclose" : ""}`}
//                   id="filter_search"
//                   onClick={toggleFilterVisibility}
//                 >
//                   <Filter className="filter-icon" />
//                   <span>
//                     <ImageWithBasePath src="assets/img/icons/closes.svg" alt="img" />
//                   </span>
//                 </Link>
//               </div>
//               <div className="form-sort stylewidth">
//                 <Sliders className="info-img" />
//                 <Select
//                   className="select"
//                   options={sortOptions}
//                   placeholder="Sort by Date"
//                   value={sortBy}
//                   onChange={(option) => {
//                     setSortBy(option);
//                     fetchWarehouses({ sortBy: option.value });
//                   }}
//                 />
//               </div>
//             </div>

//             {/* Filter */}
//             <div
//               className={`card${isFilterVisible ? " visible" : ""}`}
//               id="filter_inputs"
//               style={{ display: isFilterVisible ? "block" : "none" }}
//             >
//               <div className="card-body pb-0">
//                 <div className="row">
              
                 
//                   <div className="col-lg-3 col-sm-6 col-12 ms-auto">
//                     <div className="input-blocks">
//                       <Link className="btn btn-filters ms-auto" onClick={handleSearch}>
//                         <i data-feather="search" className="feather-search" /> Search
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="table-responsive">
//               {loading ? (
//                 <div className="text-center p-4">Loading...</div>
//               ) : (
//                 <table className="table datanew">
//                   <thead>
//                     <tr>
//                       <th className="no-sort">
//                         <label className="checkboxs">
//                           <input 
//                             type="checkbox" 
//                             id="select-all"
//                             checked={selectedIds.length === warehouses.length && warehouses.length > 0}
//                             onChange={handleSelectAll}
//                           />
//                           <span className="checkmarks" />
//                         </label>
//                       </th>
//                       <th>Warehouse</th>
//                       <th>Contact Person</th>
//                       <th>Phone</th>
//                       <th>Email</th>
//                       {/* <th>Total Products</th> */}
//                       {/* <th>Stock</th> */}
//                       <th>Qty</th>
//                       <th>Created On</th>
//                       <th>Status</th>
//                       <th className="no-sort">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {warehouses.length === 0 ? (
//                       <tr>
//                         <td colSpan="10" className="text-center">No warehouses found</td>
//                       </tr>
//                     ) : (
//                       warehouses.map((warehouse) => (
//                         <tr key={warehouse.id}>
//                           <td>
//                             <label className="checkboxs">
//                               <input 
//                                 type="checkbox"
//                                 checked={selectedIds.includes(warehouse.id)}
//                                 onChange={() => handleSelectOne(warehouse.id)}
//                               />
//                               <span className="checkmarks" />
//                             </label>
//                           </td>
//                           <td>{warehouse.name}</td>
//                           <td>
//                             <div className="userimgname">
//                               <Link to="#" className="product-img">
//                                 <ImageWithBasePath
//                                   src={warehouse.contact_person_image || "assets/img/users/user-08.jpg"}
//                                   alt="product"
//                                 />
//                               </Link>
//                               <Link to="#">{warehouse.contact_person_name || "N/A"}</Link>
//                             </div>
//                           </td>
//                           <td>{warehouse.phone || "N/A"}</td>
//                           <td>{warehouse.total_products}</td>
//                           <td>{warehouse.total_stock}</td>
//                           <td>{warehouse.total_qty}</td>
//                           <td>{new Date(warehouse.created_at).toLocaleDateString()}</td>
//                           <td>
//                             <span className={`badge ${warehouse.status === 'active' ? 'badge-linesuccess' : 'badge-linedanger'}`}>
//                               {warehouse.status === 'active' ? 'Active' : 'Inactive'}
//                             </span>
//                           </td>
//                           <td className="action-table-data">
//                             <div className="edit-delete-action">
//                               <Link
//                                 className="me-2 edit-icon p-2"
//                                 to="#"
//                                 onClick={() => handleEdit(warehouse.id)}
//                                 data-bs-toggle="modal"
//                                 data-bs-target="#edit-units"
//                               >
//                                 <i data-feather="eye" className="feather-eye" />
//                               </Link>
//                               <Link
//                                 className="me-2 p-2"
//                                 to="#"
//                                 onClick={() => handleEdit(warehouse.id)}
//                                 data-bs-toggle="modal"
//                                 data-bs-target="#edit-units"
//                               >
//                                 <i data-feather="edit" className="feather-edit" />
//                               </Link>
//                               <Link 
//                                 className="confirm-text p-2" 
//                                 to="#"
//                                 onClick={() => handleDelete(warehouse.id)}
//                               >
//                                 <i data-feather="trash-2" className="feather-trash-2" />
//                               </Link>
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Add/Edit Modal */}
//       <div className="modal fade" id={editingId ? "edit-units" : "add-units"}>
//         <div className="modal-dialog modal-dialog-centered custom-modal-two">
//           <div className="modal-content">
//             <div className="page-wrapper-new p-0">
//               <div className="content">
//                 <div className="modal-header border-0 custom-modal-header">
//                   <div className="page-title">
//                     <h4>{editingId ? "Edit" : "Add"} Warehouse</h4>
//                   </div>
//                   <button
//                     type="button"
//                     className="close"
//                     data-bs-dismiss="modal"
//                     aria-label="Close"
//                     onClick={resetForm}
//                   >
//                     <span aria-hidden="true">×</span>
//                   </button>
//                 </div>
//                 <div className="modal-body custom-modal-body">
               
//                  <form onSubmit={handleSubmit}>
//   <div className="modal-title-head">
//     <h6>
//       <span>
//         <i data-feather="info" className="feather-edit" />
//       </span>
//       Warehouse Info
//     </h6>
//   </div>
//   <div className="row">
//     <div className="col-lg-6">
//       <div className="mb-3">
//         <label className="form-label">Title *</label>
//         <input 
//           type="text" 
//           className="form-control"
//           name="wh_title"
//           value={formData.wh_title} 
//           onChange={handleInputChange}
//           required
//         />
//       </div>
//     </div>
//     <div className="col-lg-6">
//       <div className="input-blocks">
//         <label>Contact Person</label>
//         <Select 
//           className="select" 
//           options={userOptions}
//           value={userOptions.find(u => u.value === formData.user_id)}
//           onChange={(option) => setFormData({...formData, user_id: option?.value || ""})}
//           isClearable
//         />
//       </div>
//     </div>
//     <div className="col-lg-6">
//       <div className="mb-3">
//         <label className="form-label">Phone Number</label>
//         <input
//           type="text"
//           className="form-control"
//           name="phone_1" 
//           value={formData.phone_1} 
//           onChange={handleInputChange}
//         />
//       </div>
//     </div>
  
//     <div className="col-lg-12">
//       <div className="mb-3">
//         <label className="form-label">Email</label>
//         <input 
//           type="email" 
//           className="form-control"
//           name="email_1" 
//           value={formData.email_1}  
//           onChange={handleInputChange}
//         />
//       </div>
//     </div>
//     <div className="modal-title-head">
//       <h6>
//         <span>
//           <i data-feather="map-pin" />
//         </span>
//         Location
//       </h6>
//     </div>
//     <div className="col-lg-12">
//       <div className="mb-3">
//         <label className="form-label">Address</label>
//         <input 
//           type="text" 
//           className="form-control"
//           name="address"  // This should match formData
//           value={formData.address}  // This should match formData
//           onChange={handleInputChange}
//         />
//       </div>
//     </div>
//   </div>
//   <div className="modal-footer-btn">
//     <button
//       type="button"
//       className="btn btn-cancel me-2"
//       data-bs-dismiss="modal"
//       onClick={resetForm}
//     >
//       Cancel
//     </button>
//     <button type="submit" className="btn btn-submit">
//       {editingId ? "Save Changes" : "Create Warehouse"}
//     </button>
//   </div>
// </form>


//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default WareHouses;



import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Filter, Sliders } from "react-feather";
import Select from "react-select";
import Swal from "sweetalert2";
import ImageWithBasePath from "../../img/imagewithbasebath";
import Breadcrumbs from "../../breadcrumbs";
import AuthService from "../../../services/authService";

const WareHouses = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [formData, setFormData] = useState({
    wh_title: "",
    user_id: "",
    phone_1: "",
    email_1: "",
    address: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    fetchWarehouses();
    fetchUsers();
  }, []);

  const fetchWarehouses = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.searchTerm = searchTerm;
      if (sortBy) params.sortBy = sortBy.value;
      
      const response = await AuthService.getWarehouse(params);
      setWarehouses(response.data.data || []);
    } catch (error) {
      console.error("Error fetching warehouses:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch warehouses",
        timer: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await AuthService.getUser();
      setUsers(response.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSearch = () => {
    fetchWarehouses();
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        await AuthService.updateWarehouseById(editingId, formData);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Warehouse updated successfully",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await AuthService.createWarehouse(formData);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Warehouse created successfully",
          timer: 2000,
          showConfirmButton: false,
        });
      }
      
      // Close modal
      const modalElement = document.getElementById(editingId ? "edit-units" : "add-units");
      const modal = window.bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
      
      // Remove backdrop manually if it persists
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('padding-right');
      
      resetForm();
      fetchWarehouses();
    } catch (error) {
      console.error("Error saving warehouse:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to save warehouse",
        timer: 3000,
      });
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await AuthService.getWarehouseById(id);
      setFormData(response.data.data);
      setEditingId(id);
    } catch (error) {
      console.error("Error fetching warehouse:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch warehouse details",
        timer: 2000,
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await AuthService.deleteWarehouse(id);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Warehouse has been deleted.",
          timer: 2000,
          showConfirmButton: false,
        });
        fetchWarehouses();
      } catch (error) {
        console.error("Error deleting warehouse:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.message || "Failed to delete warehouse",
          timer: 3000,
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      wh_title: "",
      user_id: "",
      phone_1: "",
      email_1: "",
      address: "",
    });
    setEditingId(null);
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(warehouses.map((w) => w.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const sortOptions = [
    { value: "date_desc", label: "Sort by Date (Newest)" },
    { value: "date_asc", label: "Sort by Date (Oldest)" },
  ];

  const userOptions = users.map((u) => ({ label: u.name, value: u.id }));

  return (
    <div className="page-wrapper">
      <div className="content">
        <Breadcrumbs
          maintitle="Warehouse"
          subtitle="Manage Your Warehouse"
          addButton="Add New Warehouse"
          onAddClick={() => {
            resetForm();
          }}
        />

        <div className="card table-list-card">
          <div className="card-body">
            <div className="table-top">
              <div className="search-set">
                <div className="search-input">
                  <input
                    type="text"
                    placeholder="Search"
                    className="form-control form-control-sm formsearch"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  />
                  <Link to="#" className="btn btn-searchset" onClick={handleSearch}>
                    <i data-feather="search" className="feather-search" />
                  </Link>
                </div>
              </div>
              <div className="search-path">
                <Link
                  className={`btn btn-filter ${isFilterVisible ? "setclose" : ""}`}
                  id="filter_search"
                  onClick={toggleFilterVisibility}
                >
                  <Filter className="filter-icon" />
                  <span>
                    <ImageWithBasePath src="assets/img/icons/closes.svg" alt="img" />
                  </span>
                </Link>
              </div>
              <div className="form-sort stylewidth">
                <Sliders className="info-img" />
                <Select
                  className="select"
                  options={sortOptions}
                  placeholder="Sort by Date"
                  value={sortBy}
                  onChange={(option) => {
                    setSortBy(option);
                    fetchWarehouses();
                  }}
                />
              </div>
            </div>

            {/* Filter */}
            <div
              className={`card${isFilterVisible ? " visible" : ""}`}
              id="filter_inputs"
              style={{ display: isFilterVisible ? "block" : "none" }}
            >
              <div className="card-body pb-0">
                <div className="row">
                  <div className="col-lg-3 col-sm-6 col-12 ms-auto">
                    <div className="input-blocks">
                      <Link className="btn btn-filters ms-auto" onClick={handleSearch}>
                        <i data-feather="search" className="feather-search" /> Search
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              {loading ? (
                <div className="text-center p-4">Loading...</div>
              ) : (
                <table className="table datanew">
                  <thead>
                    <tr>
                      <th className="no-sort">
                        <label className="checkboxs">
                          <input
                            type="checkbox"
                            id="select-all"
                            checked={selectedIds.length === warehouses.length && warehouses.length > 0}
                            onChange={handleSelectAll}
                          />
                          <span className="checkmarks" />
                        </label>
                      </th>
                      <th>Warehouse</th>
                      <th>Contact Person</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Address</th>

                      <th>Total Products</th>
                      {/* <th>Stock</th> */}
                      <th>Qty</th>
                      <th>Created On</th>
                      <th>Status</th>
                      <th className="no-sort">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {warehouses.length === 0 ? (
                      <tr>
                        <td colSpan="11" className="text-center">
                          No warehouses found
                        </td>
                      </tr>
                    ) : (
                      warehouses.map((warehouse) => (
                        <tr key={warehouse.id}>
                          <td>
                            <label className="checkboxs">
                              <input
                                type="checkbox"
                                checked={selectedIds.includes(warehouse.id)}
                                onChange={() => handleSelectOne(warehouse.id)}
                              />
                              <span className="checkmarks" />
                            </label>
                          </td>
                          <td>{warehouse.name}</td>
                          <td>
                            <div className="userimgname">
                              <Link to="#" className="product-img">
                                <ImageWithBasePath
                                  src={warehouse.contact_person_image || "assets/img/users/user-08.jpg"}
                                  alt="product"
                                />
                              </Link>
                              <Link to="#">{warehouse.contact_person_name || "N/A"}</Link>
                            </div>
                          </td>
                          <td>{warehouse.phone || "N/A"}</td>
                          <td>{warehouse.email || "N/A"}</td>
                          <td>{warehouse.address || "N/A"}</td>
                          <td>{warehouse.total_products}</td>
                          {/* <td>{warehouse.total_stock}</td> */}
                          <td>{warehouse.total_qty}</td>
                          <td>{new Date(warehouse.created_at).toLocaleDateString()}</td>
                          <td>
                            <span
                              className={`badge ${
                                warehouse.status === "active" ? "badge-linesuccess" : "badge-linedanger"
                              }`}
                            >
                              {warehouse.status === "active" ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="action-table-data">
                            <div className="edit-delete-action">
                              <Link
                                className="me-2 edit-icon p-2"
                                to="#"
                                onClick={() => handleEdit(warehouse.id)}
                                data-bs-toggle="modal"
                                data-bs-target="#edit-units"
                              >
                                <i data-feather="eye" className="feather-eye" />
                              </Link>
                              <Link
                                className="me-2 p-2"
                                to="#"
                                onClick={() => handleEdit(warehouse.id)}
                                data-bs-toggle="modal"
                                data-bs-target="#edit-units"
                              >
                                <i data-feather="edit" className="feather-edit" />
                              </Link>
                              <Link className="confirm-text p-2" to="#" onClick={() => handleDelete(warehouse.id)}>
                                <i data-feather="trash-2" className="feather-trash-2" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <div className="modal fade" id="add-units">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Add Warehouse</h4>
                  </div>
                  <button
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={resetForm}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body custom-modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="modal-title-head">
                      <h6>
                        <span>
                          <i data-feather="info" className="feather-edit" />
                        </span>
                        Warehouse Info
                      </h6>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">Title *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="wh_title"
                            value={formData.wh_title}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>Contact Person *</label>
                          <Select
                            className="select"
                            options={userOptions}
                            value={userOptions.find((u) => u.value === formData.user_id)}
                            onChange={(option) => setFormData({ ...formData, user_id: option?.value || "" })}
                            isClearable
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">Phone Number *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="phone_1"
                            value={formData.phone_1}
                            onChange={handleInputChange}
                            maxLength="10"
                            pattern="[0-9]{10}"
                            required
                          />
                          <small className="text-muted">10 digits only</small>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">Email *</label>
                          <input
                            type="email"
                            className="form-control"
                            name="email_1"
                            value={formData.email_1}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="modal-title-head">
                        <h6>
                          <span>
                            <i data-feather="map-pin" />
                          </span>
                          Location
                        </h6>
                      </div>
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <label className="form-label">Address *</label>
                          <textarea
                            className="form-control"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            rows="3"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer-btn">
                      <button
                        type="button"
                        className="btn btn-cancel me-2"
                        data-bs-dismiss="modal"
                        onClick={resetForm}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-submit">
                        Create Warehouse
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <div className="modal fade" id="edit-units">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Edit Warehouse</h4>
                  </div>
                  <button
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={resetForm}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body custom-modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="modal-title-head">
                      <h6>
                        <span>
                          <i data-feather="info" className="feather-edit" />
                        </span>
                        Warehouse Info
                      </h6>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">Title *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="wh_title"
                            value={formData.wh_title}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-blocks">
                          <label>Contact Person *</label>
                          <Select
                            className="select"
                            options={userOptions}
                            value={userOptions.find((u) => u.value === formData.user_id)}
                            onChange={(option) => setFormData({ ...formData, user_id: option?.value || "" })}
                            isClearable
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">Phone Number *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="phone_1"
                            value={formData.phone_1}
                            onChange={handleInputChange}
                            maxLength="10"
                            pattern="[0-9]{10}"
                            required
                          />
                          <small className="text-muted">10 digits only</small>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">Email *</label>
                          <input
                            type="email"
                            className="form-control"
                            name="email_1"
                            value={formData.email_1}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="modal-title-head">
                        <h6>
                          <span>
                            <i data-feather="map-pin" />
                          </span>
                          Location
                        </h6>
                      </div>
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <label className="form-label">Address *</label>
                          <textarea
                            className="form-control"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            rows="3"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer-btn">
                      <button
                        type="button"
                        className="btn btn-cancel me-2"
                        data-bs-dismiss="modal"
                        onClick={resetForm}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-submit">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WareHouses;