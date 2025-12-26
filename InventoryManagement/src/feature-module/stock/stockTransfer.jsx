// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Select from "react-select";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import {
//   Edit,
//   Filter,
//   PlusCircle,
//   Sliders,
//   Trash2,
//   Search as SearchIcon,
//   TrendingUp,
//   TrendingDown,
//   Package,
// } from "feather-icons-react/build/IconComponents";
// import { Modal } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { setToogleHeader } from "../../core/redux/action";
// import ImageWithBasePath from "../../core/img/imagewithbasebath";
// import AuthService from "../../services/authService";
// import Table from "../../core/pagination/datatable";
// import TableHeaderActions from "../tableheader";
// import {
//   fetchStockFlows,
//   fetchStockFlowStats,
//   setFilters,
//   resetFilters,
//   createStockFlow,
//   updateStockFlow,
//   deleteStockFlow as deleteStockFlowAction,
//   clearError,
//   fetchStockFlowById,
// } from '../../core/redux/slices/stockSlice.js'

// const StockTransfer = () => {
//   const dispatch = useDispatch();
//   const MySwal = withReactContent(Swal);

//   // Redux state
//   const {
//     stockFlows,
//     stats,
//     filters,
//     status: loadingStatus,
//     error,
//   } = useSelector((state) => state.stockFlow);

//   const loading = loadingStatus === "loading";
//   const data = useSelector((state) => state.toggle_header);

//   // Local state
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editingStockFlow, setEditingStockFlow] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [isFilterVisible, setIsFilterVisible] = useState(false);
//   const [warehouses, setWarehouses] = useState([]);


//   // Form state
//   const [formData, setFormData] = useState({
//     articleProfile:"",
//     product:"",
//     from_wh: null,
//     to_wh: null,
//     from_loc: "",
//     to_loc: "",
//     quantity: "",
//     transport: null,
//     status: null,
//     description: "",
//   });

//   // Fetch initial data
//   useEffect(() => {
//     dispatch(fetchStockFlows(filters));
//     dispatch(fetchStockFlowStats());
//     fetchWarehouses();
 
//      // eslint-disable-next-line 
//   }, []);

//   // Show error notifications
//   useEffect(() => {
//     if (error) {
//       MySwal.fire({
//         icon: "error",
//         title: "Error",
//         text: error,
//         timer: 3000,
//       });
//       dispatch(clearError());
//     }
//   }, [error, dispatch, MySwal]);
  



  

//   // Fetch warehouses
//   const fetchWarehouses = async () => {
//     try {
//       const response = await AuthService.getWarehouse();
//       setWarehouses(
//         (response.data.data || response.data || []).map((item) => ({
//           value: item.id,
//           label: item.name || item.title,
//         }))
//       );
//     } catch (error) {
//       console.error("Error fetching warehouses:", error);
//     }
//   };


//   // Handle filter changes
//   const handleFilterChange = (name, value) => {
//     dispatch(setFilters({ [name]: value }));
//   };

//   // Debounced search
//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       dispatch(fetchStockFlows(filters));
//     }, 500);

//     return () => clearTimeout(delayDebounceFn);
//      // eslint-disable-next-line 
//   }, [filters.search]);

//   // Fetch stock flows when other filters change
//   useEffect(() => {
//     dispatch(fetchStockFlows(filters));
//      // eslint-disable-next-line 
//   }, [
//     filters.status,
//     filters.transport,
//     filters.from_wh,
//     filters.to_wh,
//     filters.sortBy,
//     filters.sortOrder,
//   ]);

//   const handleSearch = (e) => {
//     const value = e.target.value;
//     dispatch(setFilters({ search: value }));
//   };

//   // Reset form
//   const resetForm = () => {
//     setFormData({
//       from_wh: null,
//       to_wh: null,
//       from_loc: "",
//       to_loc: "",
//       quantity: "",
//       transport: null,
//       status: { value: "approved", label: "Approved" },
//       description: "",
//     });
//   };

//   // Open Add Modal
//   const handleAddClick = () => {
//     resetForm();
//     setShowAddModal(true);
//   };

//   // Close Add Modal
//   const handleCloseAddModal = () => {
//     setShowAddModal(false);
//     resetForm();
//   };

//   // Open Edit Modal
//   const handleEditClick = async (id) => {
//     try {
//       const stockFlowData = await dispatch(fetchStockFlowById(id)).unwrap();

//       const selectedFromWh = warehouses.find(
//         (w) => w.value === stockFlowData.from_wh
//       );
//       const selectedToWh = warehouses.find((w) => w.value === stockFlowData.to_wh);
//       const selectedTransport = transportOptions.find(
//         (t) => t.value === stockFlowData.transport
//       );
//       const selectedStatus = statusOptionsForForm.find(
//         (s) => s.value === stockFlowData.status
//       );

//       setEditingStockFlow(stockFlowData);
//       setFormData({
//         from_wh: selectedFromWh || null,
//         to_wh: selectedToWh || null,
//         from_loc: stockFlowData.from_loc || "",
//         to_loc: stockFlowData.to_loc || "",
//         quantity: stockFlowData.quantity || "",
//         transport: selectedTransport || null,
//         status: selectedStatus || null,
//         description: stockFlowData.description || "",
//       });

//       setShowEditModal(true);
//     } catch (error) {
//       console.error("Error fetching stock flow:", error);
//       MySwal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to load stock flow details",
//         timer: 2000,
//       });
//     }
//   };

//   // Close Edit Modal
//   const handleCloseEditModal = () => {
//     setShowEditModal(false);
//     setEditingStockFlow(null);
//     resetForm();
//   };

//   // Handle Input Changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle Add Submit
//   const handleAddSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     if (!formData.from_wh && !formData.to_wh) {
//       MySwal.fire({
//         icon: "warning",
//         title: "Validation Error",
//         text: "Either from warehouse or to warehouse must be selected",
//         timer: 2000,
//       });
//       return;
//     }

//     if (!formData.quantity || formData.quantity < 1) {
//       MySwal.fire({
//         icon: "warning",
//         title: "Validation Error",
//         text: "Quantity must be at least 1",
//         timer: 2000,
//       });
//       return;
//     }

//     if (!formData.transport) {
//       MySwal.fire({
//         icon: "warning",
//         title: "Validation Error",
//         text: "Transport method is required",
//         timer: 2000,
//       });
//       return;
//     }

//     try {
//       setSubmitting(true);

//       const dataToSubmit = {
//         from_wh: formData.from_wh?.value || null,
//         to_wh: formData.to_wh?.value || null,
//         from_loc: formData.from_loc,
//         to_loc: formData.to_loc,
//         quantity: parseInt(formData.quantity),
//         transport: formData.transport.value,
//         status: formData.status?.value || "approved",
//         description: formData.description,
//       };

//       await dispatch(createStockFlow(dataToSubmit)).unwrap();

//       MySwal.fire({
//         icon: "success",
//         title: "Success!",
//         text: "Stock flow created successfully",
//         timer: 2000,
//         showConfirmButton: false,
//       });

//       handleCloseAddModal();
//       dispatch(fetchStockFlows(filters));
//       dispatch(fetchStockFlowStats());
//     } catch (error) {
//       console.error("Error creating stock flow:", error);
//       MySwal.fire({
//         icon: "error",
//         title: "Error",
//         text: error || "Failed to create stock flow",
//         timer: 3000,
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Handle Edit Submit
//   const handleEditSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setSubmitting(true);

//       const dataToSubmit = {
//         from_wh: formData.from_wh?.value || null,
//         to_wh: formData.to_wh?.value || null,
//         from_loc: formData.from_loc,
//         to_loc: formData.to_loc,
//         quantity: parseInt(formData.quantity),
//         transport: formData.transport.value,
//         status: formData.status.value,
//         description: formData.description,
//       };

//       await dispatch(
//         updateStockFlow({ id: editingStockFlow.id, data: dataToSubmit })
//       ).unwrap();

//       MySwal.fire({
//         icon: "success",
//         title: "Success!",
//         text: "Stock flow updated successfully",
//         timer: 2000,
//         showConfirmButton: false,
//       });

//       handleCloseEditModal();
//       dispatch(fetchStockFlows(filters));
//       dispatch(fetchStockFlowStats());
//     } catch (error) {
//       console.error("Error updating stock flow:", error);
//       MySwal.fire({
//         icon: "error",
//         title: "Error",
//         text: error || "Failed to update stock flow",
//         timer: 3000,
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Handle delete
//   const handleDelete = async (id) => {
//     MySwal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonColor: "#3085d6",
//       cancelButtonText: "Cancel",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await dispatch(deleteStockFlowAction(id)).unwrap();
//           MySwal.fire({
//             icon: "success",
//             title: "Deleted!",
//             text: "Stock flow has been deleted.",
//             timer: 2000,
//             showConfirmButton: false,
//           });
//           dispatch(fetchStockFlows(filters));
//           dispatch(fetchStockFlowStats());
//         } catch (error) {
//           console.error("Error deleting stock flow:", error);
//           MySwal.fire({
//             icon: "error",
//             title: "Error",
//             text: error || "Failed to delete stock flow",
//             timer: 3000,
//           });
//         }
//       }
//     });
//   };

//   const handleSortChange = (option) => {
//     const [sortBy, sortOrder] = option.value.split(":");
//     dispatch(setFilters({ sortBy, sortOrder }));
//   };

//   // Toggle filter visibility
//   const toggleFilterVisibility = () => {
//     setIsFilterVisible((prev) => !prev);
//   };

//   // Reset filters
//   const resetFiltersHandler = () => {
//     dispatch(resetFilters());
//     dispatch(fetchStockFlows(filters));
//   };

//   const sortOptions = [
//     { value: "created_at:DESC", label: "Newest First" },
//     { value: "created_at:ASC", label: "Oldest First" },
//     { value: "quantity:DESC", label: "Quantity High to Low" },
//     { value: "quantity:ASC", label: "Quantity Low to High" },
//   ];

//   const statusOptions = [
//     { value: "", label: "All Status" },
//     { value: "approved", label: "Approved" },
//     { value: "in-transit", label: "In Transit" },
//     { value: "delivered", label: "Delivered" },
//   ];

//   const statusOptionsForForm = [
//     { value: "approved", label: "Approved" },
//     { value: "in-transit", label: "In Transit" },
//     { value: "delivered", label: "Delivered" },
//   ];

//   const transportOptions = [
//     { value: "bus", label: "Bus" },
//     { value: "courier", label: "Courier" },
//     { value: "employee", label: "Employee" },
//     { value: "transport_co", label: "Transport Company" },
//   ];

//   const transportFilterOptions = [
//     { value: "", label: "All Transport" },
//     ...transportOptions,
//   ];

//   // TABLE COLUMNS
//   const columns = [
//     {
//       title: "ID",
//       dataIndex: "id",
//       render: (text) => <span className="badge badge-primary">#{text}</span>,
//       sorter: (a, b) => a.id - b.id,
//     },
//     {
//       title: "From Warehouse",
//       dataIndex: "from_warehouse_name",
//       render: (text) => (
//         <div className="d-flex align-items-center">
//           <TrendingUp size={16} className="text-danger me-2" />
//           {text || "N/A"}
//         </div>
//       ),
//       sorter: (a, b) =>
//         (a.from_warehouse_name || "").localeCompare(b.from_warehouse_name || ""),
//     },
//     {
//       title: "To Warehouse",
//       dataIndex: "to_warehouse_name",
//       render: (text) => (
//         <div className="d-flex align-items-center">
//           <TrendingDown size={16} className="text-success me-2" />
//           {text || "N/A"}
//         </div>
//       ),
//       sorter: (a, b) =>
//         (a.to_warehouse_name || "").localeCompare(b.to_warehouse_name || ""),
//     },
//     {
//       title: "From Location",
//       dataIndex: "from_location_name",
//       render: (text) => (
//         <div className="d-flex align-items-center">
//           <TrendingUp size={16} className="text-danger me-2" />
//           {text || "N/A"}
//         </div>
//       ),
//       sorter: (a, b) =>
//         (a.from_location_name || "").localeCompare(b.from_location_name || ""),
//     },
//     {
//       title: "To Location",
//       dataIndex: "to_location_name",
//       render: (text) => (
//         <div className="d-flex align-items-center">
//           <TrendingDown size={16} className="text-success me-2" />
//           {text || "N/A"}
//         </div>
//       ),
//       sorter: (a, b) =>
//         (a.to_location_name || "").localeCompare(b.to_location_name || ""),
//     },
//     {
//       title: "Quantity",
//       dataIndex: "quantity",
//       render: (text) => (
//         <div className="d-flex align-items-center">
//           <Package size={16} className="text-primary me-2" />
//           <span className="badge badge-info">{text}</span>
//         </div>
//       ),
//       sorter: (a, b) => (a.quantity || 0) - (b.quantity || 0),
//     },
//     {
//       title: "Transport",
//       dataIndex: "transport",
//       render: (text) => (
//         <span
//           className={`badge ${
//             text === "bus"
//               ? "badge-secondary"
//               : text === "courier"
//               ? "badge-info"
//               : text === "employee"
//               ? "badge-warning"
//               : "badge-primary"
//           }`}
//         >
//           {text === "transport_co"
//             ? "Transport Co."
//             : text.charAt(0).toUpperCase() + text.slice(1)}
//         </span>
//       ),
//       sorter: (a, b) => (a.transport || "").localeCompare(b.transport || ""),
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       render: (text) => (
//         <span
//           className={`badge ${
//             text === "approved"
//               ? "badge-linesuccess"
//               : text === "in-transit"
//               ? "badge-linewarning"
//               : "badge-lineinfo"
//           }`}
//         >
//           {text === "in-transit"
//             ? "In Transit"
//             : text.charAt(0).toUpperCase() + text.slice(1)}
//         </span>
//       ),
//       sorter: (a, b) => (a.status || "").localeCompare(b.status || ""),
//     },
//     {
//   title: "Description",
//   dataIndex: "description",
//   render: (text) => (
//     <span className="badge badge-secondary">
//       {text || "N/A"}
//     </span>
//   ),
//   sorter: (a, b) => (a.description || "").localeCompare(b.description || ""),
// },

//     {
//       title: "Created Date",
//       dataIndex: "created_at",
//       render: (text) => new Date(text).toLocaleDateString(),
//       sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
//     },
//     {
//       title: "Action",
//       dataIndex: "actions",
//       render: (_, record) => (
//         <td className="action-table-data">
//           <div className="edit-delete-action">
//             <Link
//               className="me-2 p-2"
//               to="#"
//               onClick={(e) => {
//                 e.preventDefault();
//                 handleEditClick(record.id);
//               }}
//               title="Edit"
//             >
//               <Edit className="feather-edit" />
//             </Link>

//             <Link
//               className="confirm-text p-2"
//               to="#"
//               onClick={(e) => {
//                 e.preventDefault();
//                 handleDelete(record.id);
//               }}
//               title="Delete"
//             >
//               <Trash2 className="feather-trash-2" />
//             </Link>
//           </div>
//         </td>
//       ),
//     },
//   ];

//   return (
//     <div className="page-wrapper">
//       <div className="content">
//         <div className="page-header mb-3">
//           <div className="add-item d-flex">
//             <div className="page-title">
//               <h4>Stock Flow Management</h4>
//               <h6>Manage your stock transfers</h6>
//             </div>
//           </div>

//           {/* Stats Cards */}
        

//           <TableHeaderActions
//             onRefresh={() => {
//               dispatch(fetchStockFlows(filters));
//               dispatch(fetchStockFlowStats());
//             }}
//             pdfEndpoint="/auth/export/stockflows/pdf"
//             excelEndpoint="/auth/export/stockflows/excel"
//             filters={{
//               search: filters.search,
//               status: filters.status,
//               transport: filters.transport,
//             }}
//             entityName="stock flows"
//             dispatch={dispatch}
//             headerState={data}
//             headerAction={setToogleHeader}
//             showPrint={true}
//           />

//           <div className="page-btn">
//             <button onClick={handleAddClick} className="btn btn-added">
//               <PlusCircle className="me-2 iconsize" />
//               Add Stock Flow
//             </button>
//           </div>
//         </div>

//           <div className="row">
//             <div className="col-xl-3 col-sm-6 col-12 d-flex">
//               <div className="dash-count das1 w-100">
//                 <div className="dash-counts">
//                   <h4>{stats.total || 0}</h4>
//                   <h5>Total Transfers</h5>
//                 </div>
//                 <div className="dash-imgs">
//                   <Package />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-sm-6 col-12 d-flex">
//               <div className="dash-count das2">
//                 <div className="dash-counts">
//                   <h4>{stats.approved || 0}</h4>
//                   <h5>Approved</h5>
//                 </div>
//                 <div className="dash-imgs">
//                   <i data-feather="check-circle" className="feather-check-circle" />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-sm-6 col-12 d-flex">
//               <div className="dash-count das3 w-100">
//                 <div className="dash-counts">
//                   <h4>{stats.in_transit || 0}</h4>
//                   <h5>In Transit</h5>
//                 </div>
//                 <div className="dash-imgs">
//                   <i data-feather="truck" className="feather-truck" />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-sm-6 col-12 d-flex">
//               <div className="dash-count">
//                 <div className="dash-counts">
//                   <h4>{stats.delivered || 0}</h4>
//                   <h5>Delivered</h5>
//                 </div>
//                 <div className="dash-imgs">
//                   <i data-feather="check-square" className="feather-check-square" />
//                 </div>
//               </div>
//             </div>
//           </div>

//         <div className="card table-list-card">
//           <div className="card-body">
//             <div className="table-top">
//               <div className="search-set">
//                 <div className="search-input">
//                   <input
//                     type="text"
//                     placeholder="Search by description or location"
//                     className="form-control form-control-sm formsearch"
//                     value={filters.search}
//                     onChange={handleSearch}
//                   />
//                   <Link to="#" className="btn btn-searchset">
//                     <SearchIcon className="feather-search" />
//                   </Link>
//                 </div>
//               </div>
//               <div className="search-path">
//                 <Link
//                   className={`btn btn-filter ${isFilterVisible ? "setclose" : ""}`}
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
//               <div className="form-sort">
//                 <Sliders className="info-img" />
//                 <Select
//                   className="select"
//                   options={sortOptions}
//                   placeholder="Sort By"
//                   onChange={handleSortChange}
//                   value={sortOptions.find(
//                     (opt) =>
//                       opt.value === `${filters.sortBy}:${filters.sortOrder}`
//                   )}
//                 />
//               </div>
//             </div>

//             {/* Filter Section */}
//             <div
//               className={`card${isFilterVisible ? " visible" : ""}`}
//               id="filter_inputs"
//               style={{ display: isFilterVisible ? "block" : "none" }}
//             >
//               <div className="card-body pb-0">
//                 <div className="row">
//                   <div className="col-lg-3 col-sm-6 col-12">
//                     <div className="input-blocks">
//                       <label>From Warehouse</label>
//                       <Select
//                         className="select"
//                         options={[
//                           { value: "", label: "All Warehouses" },
//                           ...warehouses,
//                         ]}
//                         placeholder="Choose Warehouse"
//                         onChange={(option) =>
//                           handleFilterChange("from_wh", option?.value || "")
//                         }
//                         value={
//                           warehouses.find((w) => w.value === filters.from_wh) || {
//                             value: "",
//                             label: "All Warehouses",
//                           }
//                         }
//                         isClearable
//                       />
//                     </div>
//                   </div>
//                   <div className="col-lg-3 col-sm-6 col-12">
//                     <div className="input-blocks">
//                       <label>To Warehouse</label>
//                       <Select
//                         className="select"
//                         options={[
//                           { value: "", label: "All Warehouses" },
//                           ...warehouses,
//                         ]}
//                         placeholder="Choose Warehouse"
//                         onChange={(option) =>
//                           handleFilterChange("to_wh", option?.value || "")
//                         }
//                         value={
//                           warehouses.find((w) => w.value === filters.to_wh) || {
//                             value: "",
//                             label: "All Warehouses",
//                           }
//                         }
//                         isClearable
//                       />
//                     </div>
//                   </div>
//                   <div className="col-lg-2 col-sm-6 col-12">
//                     <div className="input-blocks">
//                       <label>Transport</label>
//                       <Select
//                         className="select"
//                         options={transportFilterOptions}
//                         placeholder="Transport"
//                         onChange={(option) =>
//                           handleFilterChange("transport", option?.value || "")
//                         }
//                         value={
//                           transportFilterOptions.find(
//                             (t) => t.value === filters.transport
//                           ) || {
//                             value: "",
//                             label: "All Transport",
//                           }
//                         }
//                         isClearable
//                       />
//                     </div>
//                   </div>
//                   <div className="col-lg-2 col-sm-6 col-12">
//                     <div className="input-blocks">
//                       <label>Status</label>
//                       <Select
//                         className="select"
//                         options={statusOptions}
//                         placeholder="Status"
//                         onChange={(option) =>
//                           handleFilterChange("status", option?.value || "")
//                         }
//                         value={
//                           statusOptions.find((s) => s.value === filters.status) || {
//                             value: "",
//                             label: "All Status",
//                           }
//                         }
//                         isClearable
//                       />
//                     </div>
//                   </div>
//                   <div className="col-lg-2 col-sm-6 col-12">
//                     <div className="input-blocks">
//                       <a
//                         className="btn btn-filters ms-auto w-100"
//                         onClick={resetFiltersHandler}
//                       >
//                         Reset Filters
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Stock Flows Table */}
//             <div className="table-responsive">
//               {loading ? (
//                 <div className="text-center p-5">
//                   <div className="spinner-border" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                   </div>
//                 </div>
//               ) : stockFlows.length === 0 ? (
//                 <div className="text-center p-5">
//                   <p>No stock flows found</p>
//                 </div>
//               ) : (
//                 <Table columns={columns} dataSource={stockFlows} />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Add/Edit Modal Form - Common Fields */}
// {/* <div className="row">
//   <div className="col-12">
//     <div className="mb-3">
//       <label className="form-label">Description</label>
//       <textarea
//         className="form-control"
//         name="description"
//         value={formData.description}
//         onChange={handleInputChange}
//         rows="3"
//         placeholder="Enter description"
//       />
//     </div>
//   </div>
// </div> */}

// {/* <div className="modal-footer-btn">
//   <button
//     type="button"
//     className="btn btn-cancel me-2"
//     onClick={showAddModal ? handleCloseAddModal : handleCloseEditModal}
//     disabled={submitting}
//   >
//     Cancel
//   </button>
//   <button type="submit" className="btn btn-submit" disabled={submitting}>
//     {submitting ? (
//       <>
//         <span className="spinner-border spinner-border-sm me-2" />
//         {showAddModal ? 'Creating...' : 'Updating...'}
//       </>
//     ) : (
//       showAddModal ? 'Create Stock Flow' : 'Update Stock Flow'
//     )}
//   </button>
// </div> */}

//       {/* Add Modal */}
//       <Modal show={showAddModal} onHide={handleCloseAddModal} size="lg" centered>
//         <Modal.Header>
//           <Modal.Title>Add Stock Flow</Modal.Title>
//           <button
//             type="button"
//             className="btn-close"
//             onClick={handleCloseAddModal}
//             disabled={submitting}
//           />
//         </Modal.Header>
//         <Modal.Body>
//           <form onSubmit={handleAddSubmit}>
//             <div className="row">
//               {/* <div className="col-lg-6">
//                 <div className="mb-3">
//                   <label className="form-label">Article Profile</label>
//                   <Select
//                     options={warehouses}
//                     value={formData.from_wh}
//                     onChange={(option) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         from_wh: option,
//                       }))
//                     }
//                     placeholder="Select From Warehouse"
//                     isClearable
//                   />
//                 </div>
//               </div>
//               <div className="col-lg-6">
//                 <div className="mb-3">
//                   <label className="form-label">Product</label>
//                   <Select
//                     options={warehouses}
//                     value={formData.from_wh}
//                     onChange={(option) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         from_wh: option,
//                       }))
//                     }
//                     placeholder="Select From Warehouse"
//                     isClearable
//                   />
//                 </div>
//               </div> */}
//               <div className="col-lg-6">
//                 <div className="mb-3">
//                   <label className="form-label">From Warehouse</label>
//                   <Select
//                     options={warehouses}
//                     value={formData.from_wh}
//                     onChange={(option) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         from_wh: option,
//                       }))
//                     }
//                     placeholder="Select From Warehouse"
//                     isClearable
//                   />
//                 </div>
//               </div>
//               <div className="col-lg-6">
//                 <div className="mb-3">
//                   <label className="form-label">To Warehouse</label>
//                   <Select
//                     options={warehouses}
//                     value={formData.to_wh}
//                     onChange={(option) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         to_wh: option,
//                       }))
//                     }
//                     placeholder="Select To Warehouse"
//                     isClearable
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="row">
//               <div className="col-lg-6">
//                 <div className="mb-3">
//                   <label className="form-label">From Location</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="from_loc"
//                     value={formData.from_loc}
//                     onChange={handleInputChange}
//                     placeholder="Enter from location"
//                   />
//                 </div>
//               </div>
//               <div className="col-lg-6">
//                 <div className="mb-3">
//                   <label className="form-label">To Location</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="to_loc"
//                     value={formData.to_loc}
//                     onChange={handleInputChange}
//                     placeholder="Enter to location"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="row">
//               <div className="col-lg-4">
//                 <div className="mb-3">
//                   <label className="form-label">
//                     Quantity <span className="text-danger">*</span>
//                   </label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     name="quantity"
//                     value={formData.quantity}
//                     onChange={handleInputChange}
//                     placeholder="Enter quantity"
//                     min="1"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="col-lg-4">
//                 <div className="mb-3">
//                   <label className="form-label">
//                     Transport <span className="text-danger">*</span>
//                   </label>
//                   <Select
//                     options={transportOptions}
//                     value={formData.transport}
//                     onChange={(option) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         transport: option,
//                       }))
//                     }
//                     placeholder="Select Transport"
//                   />
//                 </div>
//               </div>
//               <div className="col-lg-4">
//                 <div className="mb-3">
//                   <label className="form-label">Status</label>
//                   <Select
//                     options={statusOptionsForForm}
//                     value={formData.status}
//                     onChange={(option) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         status: option,
//                       }))
//                     }
//                     placeholder="Select Status"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="row">
//               <div className="col-lg-12">
//                 <div className="mb-3">
//                   <label className="form-label">Description</label>
//                   <textarea
//                     className="form-control"
//                     name="description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     rows="3"
//                     placeholder="Enter description"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-cancel me-2"
//                 onClick={handleCloseAddModal}
//                 disabled={submitting}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="btn btn-submit"
//                 disabled={submitting}
//               >
//                 {submitting ? "Creating..." : "Create"}
//               </button>
//             </div>
//           </form>
//         </Modal.Body>
//       </Modal>

//       {/* Edit Modal */}
//       <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg" centered>
//         <Modal.Header>
//           <Modal.Title>Edit Stock Flow</Modal.Title>
//           <button
//             type="button"
//             className="btn-close"
//             onClick={handleCloseEditModal}
//             disabled={submitting}
//           />
//         </Modal.Header>
//         <Modal.Body>
//           <form onSubmit={handleEditSubmit}>
//             <div className="row">
//               <div className="col-lg-6">
//                 <div className="mb-3">
//                   <label className="form-label">From Warehouse</label>
//                   <Select
//                     options={warehouses}
//                     value={formData.from_wh}
//                     onChange={(option) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         from_wh: option,
//                       }))
//                     }
//                     placeholder="Select From Warehouse"
//                     isClearable
//                   />
//                 </div>
//               </div>
//               <div className="col-lg-6">
//                 <div className="mb-3">
//                   <label className="form-label">To Warehouse</label>
//                   <Select
//                     options={warehouses}
//                     value={formData.to_wh}
//                     onChange={(option) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         to_wh: option,
//                       }))
//                     }
//                     placeholder="Select To Warehouse"
//                     isClearable
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="row">
//               <div className="col-lg-6">
//                 <div className="mb-3">
//                   <label className="form-label">From Location</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="from_loc"
//                     value={formData.from_loc}
//                     onChange={handleInputChange}
//                     placeholder="Enter from location"
//                   />
//                 </div>
//               </div>
//               <div className="col-lg-6">
//                 <div className="mb-3">
//                   <label className="form-label">To Location</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="to_loc"
//                     value={formData.to_loc}
//                     onChange={handleInputChange}
//                     placeholder="Enter to location"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="row">
//               <div className="col-lg-4">
//                 <div className="mb-3">
//                   <label className="form-label">
//                     Quantity <span className="text-danger">*</span>
//                   </label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     name="quantity"
//                     value={formData.quantity}
//                     onChange={handleInputChange}
//                     placeholder="Enter quantity"
//                     min="1"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="col-lg-4">
//                 <div className="mb-3">
//                   <label className="form-label">
//                     Transport <span className="text-danger">*</span>
//                   </label>
//                   <Select
//                     options={transportOptions}
//                     value={formData.transport}
//                     onChange={(option) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         transport: option,
//                       }))
//                     }
//                     placeholder="Select Transport"
//                   />
//                 </div>
//               </div>
//               <div className="col-lg-4">
//                 <div className="mb-3">
//                   <label className="form-label">
//                     Status <span className="text-danger">*</span>
//                   </label>
//                   <Select
//                     options={statusOptionsForForm}
//                     value={formData.status}
//                     onChange={(option) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         status: option,
//                       }))
//                     }
//                     placeholder="Select Status"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="row">
//               <div className="col-lg-12">
//                 <div className="mb-3">
//                   <label className="form-label">Description</label>
//                   <textarea
//                     className="form-control"
//                     name="description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     rows="3"
//                     placeholder="Enter description"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-cancel me-2"
//                 onClick={handleCloseEditModal}
//                 disabled={submitting}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="btn btn-submit"
//                 disabled={submitting}
//               >
//                 {submitting ? "Saving..." : "Save Changes"}
//               </button>
//             </div>
//           </form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default StockTransfer;







// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Select from "react-select";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import {
//   Edit,
//   Filter,
//   PlusCircle,
//   Sliders,
//   Trash2,
//   Search as SearchIcon,
//   TrendingUp,
//   TrendingDown,
//   Package,
//   Download,
//   // FileText,
// } from "feather-icons-react/build/IconComponents";
// import { Modal } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { setToogleHeader } from "../../core/redux/action";
// import ImageWithBasePath from "../../core/img/imagewithbasebath";
// import AuthService from "../../services/authService";
// import Table from "../../core/pagination/datatable";
// import TableHeaderActions from "../tableheader";
// import {
//   fetchStockFlows,
//   fetchStockFlowStats,
//   setFilters,
//   resetFilters,
//   createStockFlow,
//   updateStockFlow,
//   deleteStockFlow as deleteStockFlowAction,
//   clearError,
//   fetchStockFlowById,
// } from '../../core/redux/slices/stockSlice.js'

// const StockTransfer = () => {
//   const dispatch = useDispatch();
//   const MySwal = withReactContent(Swal);

//   // Redux state
//   const {
//     stockFlows,
//     stats,
//     filters,
//     status: loadingStatus,
//     error,
//   } = useSelector((state) => state.stockFlow);

//   const loading = loadingStatus === "loading";
//   const data = useSelector((state) => state.toggle_header);

//   // Local state
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editingStockFlow, setEditingStockFlow] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [isFilterVisible, setIsFilterVisible] = useState(false);
//   const [warehouses, setWarehouses] = useState([]);
//   const [fromIsWarehouse, setFromIsWarehouse] = useState(true);
//   const [toIsWarehouse, setToIsWarehouse] = useState(true);

//   // Form state
//   const [formData, setFormData] = useState({
//     from_wh: null,
//     to_wh: null,
//     from_loc: "",
//     to_loc: "",
//     quantity: "",
//     transport: null,
//     status: { value: "approved", label: "Approved" },
//     description: "",
//   });

//   // Fetch initial data
//   useEffect(() => {
//     dispatch(fetchStockFlows(filters));
//     dispatch(fetchStockFlowStats());
//     fetchWarehouses();
//     //eslint-disable-next-line
//   }, []);

//   useEffect(() => {
//   console.log('🔄 stockFlows updated:', stockFlows);
// }, [stockFlows]);

//   // Show error notifications
//   useEffect(() => {
//     if (error) {
//       MySwal.fire({
//         icon: "error",
//         title: "Error",
//         text: error,
//         timer: 3000,
//       });
//       dispatch(clearError());
//     }
//   }, [error, dispatch, MySwal]);

//   // Fetch warehouses
//   const fetchWarehouses = async () => {
//     try {
//       const response = await AuthService.getWarehouse();
//       setWarehouses(
//         (response.data.data || response.data || []).map((item) => ({
//           value: item.id,
//           label: item.name || item.title,
//         }))
//       );
//     } catch (error) {
//       console.error("Error fetching warehouses:", error);
//     }
//   };

//   // Handle filter changes
//   const handleFilterChange = (name, value) => {
//     dispatch(setFilters({ [name]: value }));
//   };

//   // Debounced search
//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       dispatch(fetchStockFlows(filters));
//     }, 500);

//     return () => clearTimeout(delayDebounceFn);
//     //eslint-disable-next-line
//   }, [filters.search]);

//   // Fetch stock flows when other filters change
//   useEffect(() => {
//     dispatch(fetchStockFlows(filters));
//     //eslint-disable-next-line
//   }, [
//     filters.status,
//     filters.transport,
//     filters.from_wh,
//     filters.to_wh,
//     filters.sortBy,
//     filters.sortOrder,
//   ]);

//   const handleSearch = (e) => {
//     const value = e.target.value;
//     dispatch(setFilters({ search: value }));
//   };

//   // Reset form
//   const resetForm = () => {
//     setFormData({
//       from_wh: null,
//       to_wh: null,
//       from_loc: "",
//       to_loc: "",
//       quantity: "",
//       transport: null,
//       status: { value: "approved", label: "Approved" },
//       description: "",
//     });
//     setFromIsWarehouse(true);
//     setToIsWarehouse(true);
//   };

//   // Open Add Modal
//   const handleAddClick = () => {
//     resetForm();
//     setShowAddModal(true);
//   };

//   // Close Add Modal
//   const handleCloseAddModal = () => {
//     setShowAddModal(false);
//     resetForm();
//   };

//   // Open Edit Modal
//   const handleEditClick = async (id) => {
//     try {
//       const stockFlowData = await dispatch(fetchStockFlowById(id)).unwrap();

//       const selectedFromWh = warehouses.find(
//         (w) => w.value === stockFlowData.from_wh
//       );
//       const selectedToWh = warehouses.find((w) => w.value === stockFlowData.to_wh);
//       const selectedTransport = transportOptions.find(
//         (t) => t.value === stockFlowData.transport
//       );
//       const selectedStatus = statusOptionsForForm.find(
//         (s) => s.value === stockFlowData.status
//       );

//       setEditingStockFlow(stockFlowData);
      
//       // Determine if from/to are warehouses or locations
//       setFromIsWarehouse(!!stockFlowData.from_wh);
//       setToIsWarehouse(!!stockFlowData.to_wh);

//       setFormData({
//         from_wh: selectedFromWh || null,
//         to_wh: selectedToWh || null,
//         from_loc: stockFlowData.from_loc || "",
//         to_loc: stockFlowData.to_loc || "",
//         quantity: stockFlowData.quantity || "",
//         transport: selectedTransport || null,
//         status: selectedStatus || null,
//         description: stockFlowData.description || "",
//       });

//       setShowEditModal(true);
//     } catch (error) {
//       console.error("Error fetching stock flow:", error);
//       MySwal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to load stock flow details",
//         timer: 2000,
//       });
//     }
//   };

//   // Close Edit Modal
//   const handleCloseEditModal = () => {
//     setShowEditModal(false);
//     setEditingStockFlow(null);
//     resetForm();
//   };

//   // Handle Input Changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Download Invoice
//   const handleDownloadInvoice = async (id) => {
//     try {
//       const response = await AuthService.downloadStockFlowInvoice(id);
//       const blob = new Blob([response.data], { type: 'application/pdf' });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = `stock-flow-invoice-${id}.pdf`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Error downloading invoice:", error);
//       MySwal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to download invoice",
//         timer: 2000,
//       });
//     }
//   };

//   // Handle Add Submit
//   const handleAddSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     if (!fromIsWarehouse && !formData.from_loc) {
//       MySwal.fire({
//         icon: "warning",
//         title: "Validation Error",
//         text: "From location is required",
//         timer: 2000,
//       });
//       return;
//     }

//     if (!toIsWarehouse && !formData.to_loc) {
//       MySwal.fire({
//         icon: "warning",
//         title: "Validation Error",
//         text: "To location is required",
//         timer: 2000,
//       });
//       return;
//     }

//     if (!formData.quantity || formData.quantity < 1) {
//       MySwal.fire({
//         icon: "warning",
//         title: "Validation Error",
//         text: "Quantity must be at least 1",
//         timer: 2000,
//       });
//       return;
//     }

//     if (!formData.transport) {
//       MySwal.fire({
//         icon: "warning",
//         title: "Validation Error",
//         text: "Transport method is required",
//         timer: 2000,
//       });
//       return;
//     }

//     try {
//       setSubmitting(true);

//       const dataToSubmit = {
//         from_wh: fromIsWarehouse ? formData.from_wh?.value || null : null,
//         to_wh: toIsWarehouse ? formData.to_wh?.value || null : null,
//         from_loc: !fromIsWarehouse ? formData.from_loc : null,
//         to_loc: !toIsWarehouse ? formData.to_loc : null,
//         quantity: parseInt(formData.quantity),
//         transport: formData.transport.value,
//         status: formData.status?.value || "approved",
//         description: formData.description,
//       };

//       const result = await dispatch(createStockFlow(dataToSubmit)).unwrap();

//       MySwal.fire({
//         icon: "success",
//         title: "Success!",
//         text: "Stock flow created successfully",
//         timer: 2000,
//         showConfirmButton: false,
//       });

//       handleCloseAddModal();
//       dispatch(fetchStockFlows(filters));
//       dispatch(fetchStockFlowStats());

//       // Auto-download invoice
//       if (result.data?.id) {
//         setTimeout(() => handleDownloadInvoice(result.data.id), 500);
//       }
//     } catch (error) {
//       console.error("Error creating stock flow:", error);
//       MySwal.fire({
//         icon: "error",
//         title: "Error",
//         text: error || "Failed to create stock flow",
//         timer: 3000,
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Handle Edit Submit

  
//   const currentStockFlows = useSelector((state) => state.stockFlow.stockFlows);
//   const handleEditSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     setSubmitting(true);

//     const dataToSubmit = {
//       from_wh: fromIsWarehouse ? formData.from_wh?.value || null : null,
//       to_wh: toIsWarehouse ? formData.to_wh?.value || null : null,
//       from_loc: !fromIsWarehouse ? formData.from_loc : null,
//       to_loc: !toIsWarehouse ? formData.to_loc : null,
//       quantity: parseInt(formData.quantity),
//       transport: formData.transport.value,
//       status: formData.status.value,
//       description: formData.description,
//     };

//     console.log('📤 Sending update:', dataToSubmit);
//     console.log('📤 Status being sent:', dataToSubmit.status);

//     const result = await dispatch(
//       updateStockFlow({ id: editingStockFlow.id, data: dataToSubmit })
//     ).unwrap();

//     console.log('📥 Update result received:', result);
//     console.log('📥 Status in result:', result.status);

//     // Check Redux state after update
//     const updatedItem = currentStockFlows.find(sf => sf.id === editingStockFlow.id);
//     console.log('🔄 Redux state after update:', updatedItem);

//     MySwal.fire({
//       icon: "success",
//       title: "Success!",
//       text: "Stock flow updated successfully",
//       timer: 2000,
//       showConfirmButton: false,
//     });

//     handleCloseEditModal();
    
//     // Force refetch to ensure UI is in sync
//     dispatch(fetchStockFlows(filters));
//     dispatch(fetchStockFlowStats());
    
//   } catch (error) {
//     console.error(" Error updating stock flow:", error);
//     MySwal.fire({
//       icon: "error",
//       title: "Error",
//       text: error || "Failed to update stock flow",
//       timer: 3000,
//     });
//   } finally {
//     setSubmitting(false);
//   }
// };


//   // Handle delete
//   const handleDelete = async (id) => {
//     MySwal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonColor: "#3085d6",
//       cancelButtonText: "Cancel",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await dispatch(deleteStockFlowAction(id)).unwrap();
//           MySwal.fire({
//             icon: "success",
//             title: "Deleted!",
//             text: "Stock flow has been deleted.",
//             timer: 2000,
//             showConfirmButton: false,
//           });
//           dispatch(fetchStockFlows(filters));
//           dispatch(fetchStockFlowStats());
//         } catch (error) {
//           console.error("Error deleting stock flow:", error);
//           MySwal.fire({
//             icon: "error",
//             title: "Error",
//             text: error || "Failed to delete stock flow",
//             timer: 3000,
//           });
//         }
//       }
//     });
//   };

//   const handleSortChange = (option) => {
//     const [sortBy, sortOrder] = option.value.split(":");
//     dispatch(setFilters({ sortBy, sortOrder }));
//   };

//   // Toggle filter visibility
//   const toggleFilterVisibility = () => {
//     setIsFilterVisible((prev) => !prev);
//   };

//   // Reset filters
//   const resetFiltersHandler = () => {
//     dispatch(resetFilters());
//     dispatch(fetchStockFlows(filters));
//   };

//   const sortOptions = [
//     { value: "created_at:DESC", label: "Newest First" },
//     { value: "created_at:ASC", label: "Oldest First" },
//     { value: "quantity:DESC", label: "Quantity High to Low" },
//     { value: "quantity:ASC", label: "Quantity Low to High" },
//   ];

//   const statusOptions = [
//     { value: "", label: "All Status" },
//     { value: "approved", label: "Approved" },
//     { value: "in-transit", label: "In Transit" },
//     { value: "delivered", label: "Delivered" },
//   ];

//   const statusOptionsForForm = [
//     { value: "approved", label: "Approved" },
//     { value: "in-transit", label: "In Transit" },
//     { value: "delivered", label: "Delivered" },
//   ];

//   const transportOptions = [
//     { value: "bus", label: "Bus" },
//     { value: "courier", label: "Courier" },
//     { value: "employee", label: "Employee" },
//     { value: "transport_co", label: "Transport Company" },
//   ];

//   const transportFilterOptions = [
//     { value: "", label: "All Transport" },
//     ...transportOptions,
//   ];

//   // TABLE COLUMNS
//   const columns = [
//     {
//       title: "ID",
//       dataIndex: "id",
//       render: (text) => <span className="badge badge-primary">#{text}</span>,
//       sorter: (a, b) => a.id - b.id,
//     },
//     {
//       title: "From",
//       dataIndex: "from_warehouse_name",
//       render: (text, record) => (
//         <div className="d-flex align-items-center">
//           <TrendingUp size={16} className="text-danger me-2" />
//           {text || record.from_loc || "N/A"}
//         </div>
//       ),
//       sorter: (a, b) =>
//         (a.from_warehouse_name || a.from_loc || "").localeCompare(
//           b.from_warehouse_name || b.from_loc || ""
//         ),
//     },
//     {
//       title: "To",
//       dataIndex: "to_warehouse_name",
//       render: (text, record) => (
//         <div className="d-flex align-items-center">
//           <TrendingDown size={16} className="text-success me-2" />
//           {text || record.to_loc || "N/A"}
//         </div>
//       ),
//       sorter: (a, b) =>
//         (a.to_warehouse_name || a.to_loc || "").localeCompare(
//           b.to_warehouse_name || b.to_loc || ""
//         ),
//     },
//     {
//       title: "Quantity",
//       dataIndex: "quantity",
//       render: (text) => (
//         <div className="d-flex align-items-center">
//           <Package size={16} className="text-primary me-2" />
//           <span className="badge badge-info">{text}</span>
//         </div>
//       ),
//       sorter: (a, b) => (a.quantity || 0) - (b.quantity || 0),
//     },
//     {
//       title: "Transport",
//       dataIndex: "transport",
//       render: (text) => (
//         <span
//           className={`badge ${
//             text === "bus"
//               ? "badge-secondary"
//               : text === "courier"
//               ? "badge-info"
//               : text === "employee"
//               ? "badge-warning"
//               : "badge-primary"
//           }`}
//         >
//           {text === "transport_co"
//             ? "Transport Co."
//             : text.charAt(0).toUpperCase() + text.slice(1)}
//         </span>
//       ),
//       sorter: (a, b) => (a.transport || "").localeCompare(b.transport || ""),
//     },
//     // {
//     //   title: "Status",
//     //   dataIndex: "status",
//     //   render: (text) => (
//     //     <span
//     //       className={`badge ${
//     //         text === "approved"
//     //           ? "badge-linesuccess"
//     //           : text === "in-transit"
//     //           ? "badge-linewarning"
//     //           : "badge-lineinfo"
//     //       }`}
//     //     >
//     //       {text === "in-transit"
//     //         ? "In Transit"
//     //         : text.charAt(0).toUpperCase() + text.slice(1)}
//     //     </span>
//     //   ),
//     //   sorter: (a, b) => (a.status || "").localeCompare(b.status || ""),
//     // },
//     {
//   title: "Status",
//   dataIndex: "status",
//   render: (text, record) => {
//     // DEBUG: Log what we're rendering
//     console.log(` Status render - ID: ${record.id}, Status value: "${text}", Type: ${typeof text}`);
    
//     return (
//      <span
//   className={`badge ${
//     text === "approved"
//       ? "badge-linesuccess"
//       : text === "in-transit"
//       ? "badge-linewarning"
//       : text === "delivered"
//       ? "badge-linesuccess"
//       : "badge-secondary"
//   }`}
// >

//         {/* DEBUG: Show both raw and formatted */}
//         {text === "in-transit"
//           ? "In Transit"
//           : text === "delivered"
//           ? "Delivered"
//           : text === "approved"
//           ? "Approved"
//           : text || "N/A"}
//       </span>
//     );
//   },
//   sorter: (a, b) => (a.status || "").localeCompare(b.status || ""),
// },
//     {
//       title: "Created Date",
//       dataIndex: "created_at",
//       render: (text) => new Date(text).toLocaleDateString(),
//       sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
//     },
//     {
//       title: "Action",
//       dataIndex: "actions",
//       render: (_, record) => (
//         <td className="action-table-data">
//           <div className="edit-delete-action">
//             <Link
//               className="me-2 p-2"
//               to="#"
//               onClick={(e) => {
//                 e.preventDefault();
//                 handleDownloadInvoice(record.id);
//               }}
//               title="Download Invoice"
//             >
//               <Download className="feather-download text-primary" />
//             </Link>

//             <Link
//               className="me-2 p-2"
//               to="#"
//               onClick={(e) => {
//                 e.preventDefault();
//                 handleEditClick(record.id);
//               }}
//               title="Edit"
//             >
//               <Edit className="feather-edit" />
//             </Link>

//             <Link
//               className="confirm-text p-2"
//               to="#"
//               onClick={(e) => {
//                 e.preventDefault();
//                 handleDelete(record.id);
//               }}
//               title="Delete"
//             >
//               <Trash2 className="feather-trash-2" />
//             </Link>
//           </div>
//         </td>
//       ),
//     },
//   ];

//   return (
//     <div className="page-wrapper">
//       <div className="content">
//         <div className="page-header mb-3">
//           <div className="add-item d-flex">
//             <div className="page-title">
//               <h4>Stock Flow Management</h4>
//               <h6>Manage your stock transfers</h6>
//             </div>
//           </div>

//           <TableHeaderActions
//             onRefresh={() => {
//               dispatch(fetchStockFlows(filters));
//               dispatch(fetchStockFlowStats());
//             }}
//             pdfEndpoint="/auth/export/stockflows/pdf"
//             excelEndpoint="/auth/export/stockflows/excel"
//             filters={{
//               search: filters.search,
//               status: filters.status,
//               transport: filters.transport,
//             }}
//             entityName="stock flows"
//             dispatch={dispatch}
//             headerState={data}
//             headerAction={setToogleHeader}
//             showPrint={true}
//           />

//           <div className="page-btn">
//             <button onClick={handleAddClick} className="btn btn-added">
//               <PlusCircle className="me-2 iconsize" />
//               Add Stock Flow
//             </button>
//           </div>
//         </div>

//         <div className="row">
//           <div className="col-xl-3 col-sm-6 col-12 d-flex">
//             <div className="dash-count das1 w-100">
//               <div className="dash-counts">
//                 <h4>{stats.total || 0}</h4>
//                 <h5>Total Transfers</h5>
//               </div>
//               <div className="dash-imgs">
//                 <Package />
//               </div>
//             </div>
//           </div>
//           <div className="col-xl-3 col-sm-6 col-12 d-flex">
//             <div className="dash-count das2">
//               <div className="dash-counts">
//                 <h4>{stats.approved || 0}</h4>
//                 <h5>Approved</h5>
//               </div>
//               <div className="dash-imgs">
//                 <i data-feather="check-circle" className="feather-check-circle" />
//               </div>
//             </div>
//           </div>
//           <div className="col-xl-3 col-sm-6 col-12 d-flex">
//             <div className="dash-count das3 w-100">
//               <div className="dash-counts">
//                 <h4>{stats.in_transit || 0}</h4>
//                 <h5>In Transit</h5>
//               </div>
//               <div className="dash-imgs">
//                 <i data-feather="truck" className="feather-truck" />
//               </div>
//             </div>
//           </div>
//           <div className="col-xl-3 col-sm-6 col-12 d-flex">
//             <div className="dash-count">
//               <div className="dash-counts">
//                 <h4>{stats.delivered || 0}</h4>
//                 <h5>Delivered</h5>
//               </div>
//               <div className="dash-imgs">
//                 <i data-feather="check-square" className="feather-check-square" />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="card table-list-card">
//           <div className="card-body">
//             <div className="table-top">
//               <div className="search-set">
//                 <div className="search-input">
//                   <input
//                     type="text"
//                     placeholder="Search by description or location"
//                     className="form-control form-control-sm formsearch"
//                     value={filters.search}
//                     onChange={handleSearch}
//                   />
//                   <Link to="#" className="btn btn-searchset">
//                     <SearchIcon className="feather-search" />
//                   </Link>
//                 </div>
//               </div>
//               <div className="search-path">
//                 <Link
//                   className={`btn btn-filter ${isFilterVisible ? "setclose" : ""}`}
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
//               <div className="form-sort">
//                 <Sliders className="info-img" />
//                 <Select
//                   className="select"
//                   options={sortOptions}
//                   placeholder="Sort By"
//                   onChange={handleSortChange}
//                   value={sortOptions.find(
//                     (opt) =>
//                       opt.value === `${filters.sortBy}:${filters.sortOrder}`
//                   )}
//                 />
//               </div>
//             </div>

//             {/* Filter Section */}
//             <div
//               className={`card${isFilterVisible ? " visible" : ""}`}
//               id="filter_inputs"
//               style={{ display: isFilterVisible ? "block" : "none" }}
//             >
//               <div className="card-body pb-0">
//                 <div className="row">
//                   <div className="col-lg-3 col-sm-6 col-12">
//                     <div className="input-blocks">
//                       <label>From Warehouse</label>
//                       <Select
//                         className="select"
//                         options={[
//                           { value: "", label: "All Warehouses" },
//                           ...warehouses,
//                         ]}
//                         placeholder="Choose Warehouse"
//                         onChange={(option) =>
//                           handleFilterChange("from_wh", option?.value || "")
//                         }
//                         value={
//                           warehouses.find((w) => w.value === filters.from_wh) || {
//                             value: "",
//                             label: "All Warehouses",
//                           }
//                         }
//                         isClearable
//                       />
//                     </div>
//                   </div>
//                   <div className="col-lg-3 col-sm-6 col-12">
//                     <div className="input-blocks">
//                       <label>To Warehouse</label>
//                       <Select
//                         className="select"
//                         options={[
//                           { value: "", label: "All Warehouses" },
//                           ...warehouses,
//                         ]}
//                         placeholder="Choose Warehouse"
//                         onChange={(option) =>
//                           handleFilterChange("to_wh", option?.value || "")
//                         }
//                         value={
//                           warehouses.find((w) => w.value === filters.to_wh) || {
//                             value: "",
//                             label: "All Warehouses",
//                           }
//                         }
//                         isClearable
//                       />
//                     </div>
//                   </div>
//                   <div className="col-lg-2 col-sm-6 col-12">
//                     <div className="input-blocks">
//                       <label>Transport</label>
//                       <Select
//                         className="select"
//                         options={transportFilterOptions}
//                         placeholder="Transport"
//                         onChange={(option) =>
//                           handleFilterChange("transport", option?.value || "")
//                         }
//                         value={
//                           transportFilterOptions.find(
//                             (t) => t.value === filters.transport
//                           ) || {
//                             value: "",
//                             label: "All Transport",
//                           }
//                         }
//                         isClearable
//                       />
//                     </div>
//                   </div>
//                   <div className="col-lg-2 col-sm-6 col-12">
//                     <div className="input-blocks">
//                       <label>Status</label>
//                       <Select
//                         className="select"
//                         options={statusOptions}
//                         placeholder="Status"
//                         onChange={(option) =>
//                           handleFilterChange("status", option?.value || "")
//                         }
//                         value={
//                           statusOptions.find((s) => s.value === filters.status) || {
//                             value: "",
//                             label: "All Status",
//                           }
//                         }
//                         isClearable
//                       />
//                     </div>
//                   </div>
//                   <div className="col-lg-2 col-sm-6 col-12">
//                     <div className="input-blocks">
//                       <a
//                         className="btn btn-filters ms-auto w-100"
//                         onClick={resetFiltersHandler}
//                       >
//                         Reset Filters
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Stock Flows Table */}
//             <div className="table-responsive">
//               {loading ? (
//                 <div className="text-center p-5">
//                   <div className="spinner-border" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                   </div>
//                 </div>
//               ) : stockFlows.length === 0 ? (
//                 <div className="text-center p-5">
//                   <p>No stock flows found</p>
//                 </div>
//               ) : (
//                 <Table columns={columns} dataSource={stockFlows} />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Add Modal */}
//       <Modal show={showAddModal} onHide={handleCloseAddModal} size="lg" centered>
//         <Modal.Header>
//           <Modal.Title>Add Stock Flow</Modal.Title>
//           <button
//             type="button"
//             className="btn-close"
//             onClick={handleCloseAddModal}
//             disabled={submitting}
//           />
//         </Modal.Header>
//         <Modal.Body>
//           <form onSubmit={handleAddSubmit}>
//             {/* FROM Section */}
//             <div className="row mb-3">
//               <div className="col-12">
//                 <h6 className="mb-3">From Location</h6>
//                 <div className="d-flex gap-3 mb-3">
//                   <div className="form-check">
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name="fromType"
//                       id="fromWarehouse"
//                       checked={fromIsWarehouse}
//                       onChange={() => {
//                         setFromIsWarehouse(true);
//                         setFormData(prev => ({ ...prev, from_loc: "" }));
//                       }}
//                     />
//                     <label className="form-check-label" htmlFor="fromWarehouse">
//                       Warehouse
//                     </label>
//                   </div>
//                   <div className="form-check">
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name="fromType"
//                       id="fromLocation"
//                       checked={!fromIsWarehouse}
//                       onChange={() => {
//                         setFromIsWarehouse(false);
//                         setFormData(prev => ({ ...prev, from_wh: null }));
//                       }}
//                     />
//                     <label className="form-check-label" htmlFor="fromLocation">
//                       Other Location
//                     </label>
//                   </div>
//                 </div>

//                 {fromIsWarehouse ? (
//                   <Select
//                     options={warehouses}
//                     value={formData.from_wh}
//                     onChange={(option) =>
//                       setFormData(prev => ({ ...prev, from_wh: option }))
//                     }
//                     placeholder="Select Warehouse"
//                     isClearable
//                   />
//                 ) : (
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={formData.from_loc}
//                     onChange={(e) => setFormData(prev => ({ ...prev, from_loc: e.target.value }))}
//                     placeholder="Enter location name"
//                   />
//                 )}
//               </div>
//             </div>

//             {/* TO Section */}
//             <div className="row mb-3">
//               <div className="col-12">
//                 <h6 className="mb-3">To Location</h6>
//                 <div className="d-flex gap-3 mb-3">
//                   <div className="form-check">
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name="toType"
//                       id="toWarehouse"
//                       checked={toIsWarehouse}
//                       onChange={() => {
//                         setToIsWarehouse(true);
//                         setFormData(prev => ({ ...prev, to_loc: "" }));
//                       }}
//                     />
//                     <label className="form-check-label" htmlFor="toWarehouse">
//                       Warehouse
//                     </label>
//                   </div>
//                   <div className="form-check">
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name="toType"
//                       id="toLocation"
//                       checked={!toIsWarehouse}
//                       onChange={() => {
//                         setToIsWarehouse(false);
//                         setFormData(prev => ({ ...prev, to_wh: null }));
//                       }}
//                     />
//                     <label className="form-check-label" htmlFor="toLocation">
//                       Other Location
//                     </label>
//                   </div>
//                 </div>

//                 {toIsWarehouse ? (
//                   <Select
//                     options={warehouses}
//                     value={formData.to_wh}
//                     onChange={(option) =>
//                       setFormData(prev => ({ ...prev, to_wh: option }))
//                     }
//                     placeholder="Select Warehouse"
//                     isClearable
//                   />
//                 ) : (
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={formData.to_loc}
//                     onChange={(e) => setFormData(prev => ({ ...prev, to_loc: e.target.value }))}
//                     placeholder="Enter location name"
//                   />
//                 )}
//               </div>
//             </div>

//             {/* Other fields */}
//             <div className="row">
//               <div className="col-lg-4">
//                 <div className="mb-3">
//                   <label className="form-label">
//                     Quantity <span className="text-danger">*</span>
//                   </label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     name="quantity"
//                     value={formData.quantity}
//                     onChange={handleInputChange}
//                     placeholder="Enter quantity"
//                     min="1"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="col-lg-4">
//                 <div className="mb-3">
//                   <label className="form-label">
//                     Transport <span className="text-danger">*</span>
//                   </label>
//                   <Select
//                     options={transportOptions}
//                     value={formData.transport}
//                     onChange={(option) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         transport: option,
//                       }))
//                     }
//                     placeholder="Select Transport"
//                   />
//                 </div>
//               </div>
//               <div className="col-lg-4">
//                 <div className="mb-3">
//                   <label className="form-label">Status</label>
//                   <Select
//                     options={statusOptionsForForm}
//                     value={formData.status}
//                     onChange={(option) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         status: option,
//                       }))
//                     }
//                     placeholder="Select Status"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="row">
//               <div className="col-12">
//                 <div className="mb-3">
//                   <label className="form-label">Description</label>
//                   <textarea
//                     className="form-control"
//                     name="description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     rows="3"
//                     placeholder="Enter description"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-cancel me-2"
//                 onClick={handleCloseAddModal}
//                 disabled={submitting}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="btn btn-submit"
//                 disabled={submitting}
//               >
//                 {submitting ? "Creating..." : "Create & Download Invoice"}
//               </button>
//             </div>
//           </form>
//         </Modal.Body>
//       </Modal>

//       {/* Edit Modal - Same structure */}


// <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg" centered>
//   <Modal.Header>
//     <Modal.Title>Edit Stock Flow</Modal.Title>
//     <button
//       type="button"
//       className="btn-close"
//       onClick={handleCloseEditModal}
//       disabled={submitting}
//     />
//   </Modal.Header>
//   <Modal.Body>
//     <form onSubmit={handleEditSubmit}>
//       {/* FROM Section */}
//       <div className="row mb-3">
//         <div className="col-12">
//           <h6 className="mb-3">From Location</h6>
//           <div className="d-flex gap-3 mb-3">
//             <div className="form-check">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name="fromTypeEdit"
//                 id="fromWarehouseEdit"
//                 checked={fromIsWarehouse}
//                 onChange={() => {
//                   setFromIsWarehouse(true);
//                   setFormData(prev => ({ ...prev, from_loc: "" }));
//                 }}
//               />
//               <label className="form-check-label" htmlFor="fromWarehouseEdit">
//                 Warehouse
//               </label>
//             </div>
//             <div className="form-check">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name="fromTypeEdit"
//                 id="fromLocationEdit"
//                 checked={!fromIsWarehouse}
//                 onChange={() => {
//                   setFromIsWarehouse(false);
//                   setFormData(prev => ({ ...prev, from_wh: null }));
//                 }}
//               />
//               <label className="form-check-label" htmlFor="fromLocationEdit">
//                 Other Location
//               </label>
//             </div>
//           </div>

//           {fromIsWarehouse ? (
//             <Select
//               options={warehouses}
//               value={formData.from_wh}
//               onChange={(option) =>
//                 setFormData(prev => ({ ...prev, from_wh: option }))
//               }
//               placeholder="Select Warehouse"
//               isClearable
//             />
//           ) : (
//             <input
//               type="text"
//               className="form-control"
//               value={formData.from_loc}
//               onChange={(e) => setFormData(prev => ({ ...prev, from_loc: e.target.value }))}
//               placeholder="Enter location name"
//             />
//           )}
//         </div>
//       </div>

//       {/* TO Section */}
//       <div className="row mb-3">
//         <div className="col-12">
//           <h6 className="mb-3">To Location</h6>
//           <div className="d-flex gap-3 mb-3">
//             <div className="form-check">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name="toTypeEdit"
//                 id="toWarehouseEdit"
//                 checked={toIsWarehouse}
//                 onChange={() => {
//                   setToIsWarehouse(true);
//                   setFormData(prev => ({ ...prev, to_loc: "" }));
//                 }}
//               />
//               <label className="form-check-label" htmlFor="toWarehouseEdit">
//                 Warehouse
//               </label>
//             </div>
//             <div className="form-check">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name="toTypeEdit"
//                 id="toLocationEdit"
//                 checked={!toIsWarehouse}
//                 onChange={() => {
//                   setToIsWarehouse(false);
//                   setFormData(prev => ({ ...prev, to_wh: null }));
//                 }}
//               />
//               <label className="form-check-label" htmlFor="toLocationEdit">
//                 Other Location
//               </label>
//             </div>
//           </div>

//           {toIsWarehouse ? (
//             <Select
//               options={warehouses}
//               value={formData.to_wh}
//               onChange={(option) =>
//                 setFormData(prev => ({ ...prev, to_wh: option }))
//               }
//               placeholder="Select Warehouse"
//               isClearable
//             />
//           ) : (
//             <input
//               type="text"
//               className="form-control"
//               value={formData.to_loc}
//               onChange={(e) => setFormData(prev => ({ ...prev, to_loc: e.target.value }))}
//               placeholder="Enter location name"
//             />
//           )}
//         </div>
//       </div>

//       {/* Other fields */}
//       <div className="row">
//         <div className="col-lg-4">
//           <div className="mb-3">
//             <label className="form-label">
//               Quantity <span className="text-danger">*</span>
//             </label>
//             <input
//               type="number"
//               className="form-control"
//               name="quantity"
//               value={formData.quantity}
//               onChange={handleInputChange}
//               placeholder="Enter quantity"
//               min="1"
//               required
//             />
//           </div>
//         </div>
//         <div className="col-lg-4">
//           <div className="mb-3">
//             <label className="form-label">
//               Transport <span className="text-danger">*</span>
//             </label>
//             <Select
//               options={transportOptions}
//               value={formData.transport}
//               onChange={(option) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   transport: option,
//                 }))
//               }
//               placeholder="Select Transport"
//             />
//           </div>
//         </div>
//         <div className="col-lg-4">
//           <div className="mb-3">
//             <label className="form-label">
//               Status <span className="text-danger">*</span>
//             </label>
//             <Select
//               options={statusOptionsForForm}
//               value={formData.status}
//               onChange={(option) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   status: option,
//                 }))
//               }
//               placeholder="Select Status"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="row">
//         <div className="col-12">
//           <div className="mb-3">
//             <label className="form-label">Description</label>
//             <textarea
//               className="form-control"
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               rows="3"
//               placeholder="Enter description"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="modal-footer">
//         <button
//           type="button"
//           className="btn btn-cancel me-2"
//           onClick={handleCloseEditModal}
//           disabled={submitting}
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="btn btn-submit"
//           disabled={submitting}
//         >
//           {submitting ? "Saving..." : "Save Changes"}
//         </button>
//       </div>
//     </form>
//   </Modal.Body>
// </Modal>
//     </div>
//   );
// };

// export default StockTransfer;




// StockTransfer.jsx - UPDATED WITH DYNAMIC OPTIONS
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  Edit,
  Filter,
  PlusCircle,
  Sliders,
  Trash2,
  Search as SearchIcon,
  TrendingUp,
  TrendingDown,
  Package,
  Download,
} from "feather-icons-react/build/IconComponents";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setToogleHeader } from "../../core/redux/action";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import AuthService from "../../services/authService.js";
import Table from "../../core/pagination/datatable";
import TableHeaderActions from "../tableheader";
import {
  fetchStockFlowOptions,
  fetchStockFlows,
  fetchStockFlowStats,
  setFilters,
  resetFilters,
  createStockFlow,
  updateStockFlow,
  deleteStockFlow as deleteStockFlowAction,
  clearError,
  fetchStockFlowById,
} from '../../core/redux/slices/stockSlice.js';


const StockTransfer = () => {
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);

  // Redux state
  const {
    stockFlows,
    stats,
    filters,
    status: loadingStatus,
    error,
    options,
  } = useSelector((state) => state.stockFlow);

  // NEW: Get dynamic options from Redux
const transportOptions = options?.transport || [];
  const statusOptionsForForm = options?.status || [];
  const sortOptions = options?.sort || [];
  const optionsLoading = options?.loading || false;

  const loading = loadingStatus === "loading";
  const data = useSelector((state) => state.toggle_header);

  // Local state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingStockFlow, setEditingStockFlow] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [fromIsWarehouse, setFromIsWarehouse] = useState(true);
  const [toIsWarehouse, setToIsWarehouse] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    from_wh: null,
    to_wh: null,
    from_loc: "",
    to_loc: "",
    quantity: "",
    transport: null,
    status: { value: "approved", label: "Approved" },
    description: "",
  });

  // NEW: Create filter-friendly options
  // const transportOptions = transportOptionsData || [];
  
  const transportFilterOptions = [
    { value: "", label: "All Transport" },
    ...transportOptions,
  ];

  // const statusOptionsForForm = statusOptionsData || [];

  const statusOptions = [
    { value: "", label: "All Status" },
    ...statusOptionsForForm,
  ];

  // const sortOptions = sortOptionsData || [];

  // Fetch initial data
  useEffect(() => {
    dispatch(fetchStockFlows(filters));
    dispatch(fetchStockFlowStats());
    dispatch(fetchStockFlowOptions()); // NEW: Fetch dynamic options
    fetchWarehouses();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log('🔄 stockFlows updated:', stockFlows);
  }, [stockFlows]);

  // Show error notifications
  useEffect(() => {
    if (error) {
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: error,
        timer: 3000,
      });
      dispatch(clearError());
    }
  }, [error, dispatch, MySwal]);

  // Fetch warehouses
  const fetchWarehouses = async () => {
    try {
      const response = await AuthService.getWarehouse();
      setWarehouses(
        (response.data.data || response.data || []).map((item) => ({
          value: item.id,
          label: item.name || item.title,
        }))
      );
    } catch (error) {
      console.error("Error fetching warehouses:", error);
    }
  };

  // Handle filter changes
  const handleFilterChange = (name, value) => {
    dispatch(setFilters({ [name]: value }));
  };

  // Debounced search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(fetchStockFlows(filters));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line
  }, [filters.search]);

  // Fetch stock flows when other filters change
  useEffect(() => {
    dispatch(fetchStockFlows(filters));
    // eslint-disable-next-line
  }, [
    filters.status,
    filters.transport,
    filters.from_wh,
    filters.to_wh,
    filters.sortBy,
    filters.sortOrder,
  ]);

  const handleSearch = (e) => {
    const value = e.target.value;
    dispatch(setFilters({ search: value }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      from_wh: null,
      to_wh: null,
      from_loc: "",
      to_loc: "",
      quantity: "",
      transport: null,
      status: statusOptionsForForm[0] || { value: "approved", label: "Approved" },
      description: "",
    });
    setFromIsWarehouse(true);
    setToIsWarehouse(true);
  };

  // Open Add Modal
  const handleAddClick = () => {
    resetForm();
    setShowAddModal(true);
  };

  // Close Add Modal
  const handleCloseAddModal = () => {
    setShowAddModal(false);
    resetForm();
  };

  // Open Edit Modal
  const handleEditClick = async (id) => {
    try {
      const stockFlowData = await dispatch(fetchStockFlowById(id)).unwrap();

      const selectedFromWh = warehouses.find(
        (w) => w.value === stockFlowData.from_wh
      );
      const selectedToWh = warehouses.find((w) => w.value === stockFlowData.to_wh);
      const selectedTransport = transportOptions.find(
        (t) => t.value === stockFlowData.transport
      );
      const selectedStatus = statusOptionsForForm.find(
        (s) => s.value === stockFlowData.status
      );

      setEditingStockFlow(stockFlowData);
      
      // Determine if from/to are warehouses or locations
      setFromIsWarehouse(!!stockFlowData.from_wh);
      setToIsWarehouse(!!stockFlowData.to_wh);

      setFormData({
        from_wh: selectedFromWh || null,
        to_wh: selectedToWh || null,
        from_loc: stockFlowData.from_loc || "",
        to_loc: stockFlowData.to_loc || "",
        quantity: stockFlowData.quantity || "",
        transport: selectedTransport || null,
        status: selectedStatus || null,
        description: stockFlowData.description || "",
      });

      setShowEditModal(true);
    } catch (error) {
      console.error("Error fetching stock flow:", error);
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load stock flow details",
        timer: 2000,
      });
    }
  };

  // Close Edit Modal
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingStockFlow(null);
    resetForm();
  };

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Download Invoice
  const handleDownloadInvoice = async (id) => {
    try {
      const response = await AuthService.downloadStockFlowInvoice(id);
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `stock-flow-invoice-${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading invoice:", error);
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to download invoice",
        timer: 2000,
      });
    }
  };

  // Handle Add Submit
  const handleAddSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!fromIsWarehouse && !formData.from_loc) {
      MySwal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "From location is required",
        timer: 2000,
      });
      return;
    }

    if (!toIsWarehouse && !formData.to_loc) {
      MySwal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "To location is required",
        timer: 2000,
      });
      return;
    }

    if (!formData.quantity || formData.quantity < 1) {
      MySwal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Quantity must be at least 1",
        timer: 2000,
      });
      return;
    }

    if (!formData.transport) {
      MySwal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Transport method is required",
        timer: 2000,
      });
      return;
    }

    try {
      setSubmitting(true);

      const dataToSubmit = {
        from_wh: fromIsWarehouse ? formData.from_wh?.value || null : null,
        to_wh: toIsWarehouse ? formData.to_wh?.value || null : null,
        from_loc: !fromIsWarehouse ? formData.from_loc : null,
        to_loc: !toIsWarehouse ? formData.to_loc : null,
        quantity: parseInt(formData.quantity),
        transport: formData.transport.value,
        status: formData.status?.value || "approved",
        description: formData.description,
      };

      const result = await dispatch(createStockFlow(dataToSubmit)).unwrap();

      MySwal.fire({
        icon: "success",
        title: "Success!",
        text: "Stock flow created successfully",
        timer: 2000,
        showConfirmButton: false,
      });

      handleCloseAddModal();
      dispatch(fetchStockFlows(filters));
      dispatch(fetchStockFlowStats());

      // Auto-download invoice
      if (result.data?.id) {
        setTimeout(() => handleDownloadInvoice(result.data.id), 500);
      }
    } catch (error) {
      console.error("Error creating stock flow:", error);
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: error || "Failed to create stock flow",
        timer: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Edit Submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const dataToSubmit = {
        from_wh: fromIsWarehouse ? formData.from_wh?.value || null : null,
        to_wh: toIsWarehouse ? formData.to_wh?.value || null : null,
        from_loc: !fromIsWarehouse ? formData.from_loc : null,
        to_loc: !toIsWarehouse ? formData.to_loc : null,
        quantity: parseInt(formData.quantity),
        transport: formData.transport.value,
        status: formData.status.value,
        description: formData.description,
      };

      console.log('📤 Sending update:', dataToSubmit);

      const result = await dispatch(
        updateStockFlow({ id: editingStockFlow.id, data: dataToSubmit })
      ).unwrap();

      console.log('📥 Update result:', result);

      MySwal.fire({
        icon: "success",
        title: "Success!",
        text: "Stock flow updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });

      handleCloseEditModal();
      
      // Force refetch
      dispatch(fetchStockFlows(filters));
      dispatch(fetchStockFlowStats());
      
    } catch (error) {
      console.error("❌ Error updating stock flow:", error);
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: error || "Failed to update stock flow",
        timer: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonColor: "#3085d6",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(deleteStockFlowAction(id)).unwrap();
          MySwal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Stock flow has been deleted.",
            timer: 2000,
            showConfirmButton: false,
          });
          dispatch(fetchStockFlows(filters));
          dispatch(fetchStockFlowStats());
        } catch (error) {
          console.error("Error deleting stock flow:", error);
          MySwal.fire({
            icon: "error",
            title: "Error",
            text: error || "Failed to delete stock flow",
            timer: 3000,
          });
        }
      }
    });
  };

  const handleSortChange = (option) => {
    const [sortBy, sortOrder] = option.value.split(":");
    dispatch(setFilters({ sortBy, sortOrder }));
  };

  // Toggle filter visibility
  const toggleFilterVisibility = () => {
    setIsFilterVisible((prev) => !prev);
  };

  // Reset filters
  const resetFiltersHandler = () => {
    dispatch(resetFilters());
    dispatch(fetchStockFlows(filters));
  };



  // TABLE COLUMNS
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (text) => <span className="badge badge-primary">#{text}</span>,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "From",
      dataIndex: "from_warehouse_name",
      render: (text, record) => (
        <div className="d-flex align-items-center">
          <TrendingUp size={16} className="text-danger me-2" />
          {text || record.from_loc || "N/A"}
        </div>
      ),
      sorter: (a, b) =>
        (a.from_warehouse_name || a.from_loc || "").localeCompare(
          b.from_warehouse_name || b.from_loc || ""
        ),
    },
    {
      title: "To",
      dataIndex: "to_warehouse_name",
      render: (text, record) => (
        <div className="d-flex align-items-center">
          <TrendingDown size={16} className="text-success me-2" />
          {text || record.to_loc || "N/A"}
        </div>
      ),
      sorter: (a, b) =>
        (a.to_warehouse_name || a.to_loc || "").localeCompare(
          b.to_warehouse_name || b.to_loc || ""
        ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (text) => (
        <div className="d-flex align-items-center">
          <Package size={16} className="text-primary me-2" />
          <span className="badge badge-info">{text}</span>
        </div>
      ),
      sorter: (a, b) => (a.quantity || 0) - (b.quantity || 0),
    },
    {
      title: "Transport",
      dataIndex: "transport",
      render: (text) => {
        const transportOption = transportOptions.find(t => t.value === text);
        return (
          <span
            className={`badge ${
              text === "bus"
                ? "badge-secondary"
                : text === "courier"
                ? "badge-info"
                : text === "employee"
                ? "badge-warning"
                : "badge-primary"
            }`}
          >
            {transportOption ? transportOption.label : text}
          </span>
        );
      },
      sorter: (a, b) => (a.transport || "").localeCompare(b.transport || ""),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        console.log(`🔍 Status render - ID: ${record.id}, Status: "${text}"`);
        
        const statusOption = statusOptionsForForm.find(s => s.value === text);
        
        return (
          <span
            className={`badge ${
              text === "approved"
                ? "badge-linesuccess"
                : text === "in-transit"
                ? "badge-linewarning"
                : text === "delivered"
                ? "badge-lineinfo"
                : "badge-secondary"
            }`}
          >
            {statusOption ? statusOption.label : text || "N/A"}
          </span>
        );
      },
      sorter: (a, b) => (a.status || "").localeCompare(b.status || ""),
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      render: (text) => new Date(text).toLocaleDateString(),
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
    },
    {
      title: "Action",
      dataIndex: "actions",
      render: (_, record) => (
        <td className="action-table-data">
          <div className="edit-delete-action">
            <Link
              className="me-2 p-2"
              to="#"
              onClick={(e) => {
                e.preventDefault();
                handleDownloadInvoice(record.id);
              }}
              title="Download Invoice"
            >
              <Download className="feather-download text-primary" />
            </Link>

            <Link
              className="me-2 p-2"
              to="#"
              onClick={(e) => {
                e.preventDefault();
                handleEditClick(record.id);
              }}
              title="Edit"
            >
              <Edit className="feather-edit" />
            </Link>

            <Link
              className="confirm-text p-2"
              to="#"
              onClick={(e) => {
                e.preventDefault();
                handleDelete(record.id);
              }}
              title="Delete"
            >
              <Trash2 className="feather-trash-2" />
            </Link>
          </div>
        </td>
      ),
    },
  ];

  // Show loading if options are still loading
  if (optionsLoading) {
    return (
      <div className="page-wrapper">
        <div className="content">
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
            <div className="text-center">
              <div className="spinner-border text-primary mb-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p>Loading options...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="content">
   <div className="page-header mb-3">
         <div className="add-item d-flex">
           <div className="page-title">
            <h4>Stock Flow Management</h4>
            <h6>Manage your stock transfers</h6>
         </div>
         </div>

          <TableHeaderActions
            onRefresh={() => {
              dispatch(fetchStockFlows(filters));
              dispatch(fetchStockFlowStats());
            }}
            pdfEndpoint="/auth/export/stockflows/pdf"
            excelEndpoint="/auth/export/stockflows/excel"
            filters={{
              search: filters.search,
              status: filters.status,
              transport: filters.transport,
            }}
            entityName="stock flows"
            dispatch={dispatch}
            headerState={data}
            headerAction={setToogleHeader}
            showPrint={true}
          />
           

          <div className="page-btn">
            <button onClick={handleAddClick} className="btn btn-added">
              <PlusCircle className="me-2 iconsize" />
              Add Stock Flow
            </button>
          </div>
           </div>
      

        <div className="row">
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="dash-count das1 w-100">
              <div className="dash-counts">
                <h4>{stats.total || 0}</h4>
                <h5>Total Transfers</h5>
              </div>
              <div className="dash-imgs">
                <Package />
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="dash-count das2">
              <div className="dash-counts">
                <h4>{stats.approved || 0}</h4>
                <h5>Approved</h5>
              </div>
              <div className="dash-imgs">
                <i data-feather="check-circle" className="feather-check-circle" />
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="dash-count das3 w-100">
              <div className="dash-counts">
                <h4>{stats.in_transit || 0}</h4>
                <h5>In Transit</h5>
              </div>
              <div className="dash-imgs">
                <i data-feather="truck" className="feather-truck" />
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="dash-count">
              <div className="dash-counts">
                <h4>{stats.delivered || 0}</h4>
                <h5>Delivered</h5>
              </div>
              <div className="dash-imgs">
                <i data-feather="check-square" className="feather-check-square" />
              </div>
            </div>
          </div>
        </div>

        <div className="card table-list-card">
          <div className="card-body">
            <div className="table-top">
              <div className="search-set">
                <div className="search-input">
                  <input
                    type="text"
                    placeholder="Search by description or location"
                    className="form-control form-control-sm formsearch"
                    value={filters.search}
                    onChange={handleSearch}
                  />
                  <Link to="#" className="btn btn-searchset">
                    <SearchIcon className="feather-search" />
                  </Link>
                </div>
              </div>
              <div className="search-path">
                <Link
                  className={`btn btn-filter ${isFilterVisible ? "setclose" : ""}`}
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
                  placeholder="Sort By"
                  onChange={handleSortChange}
                  value={sortOptions.find(
                    (opt) =>
                      opt.value === `${filters.sortBy}:${filters.sortOrder}`
                  )}
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
                      <label>From Warehouse</label>
                      <Select
                        className="select"
                        options={[
                          { value: "", label: "All Warehouses" },
                          ...warehouses,
                        ]}
                        placeholder="Choose Warehouse"
                        onChange={(option) =>
                          handleFilterChange("from_wh", option?.value || "")
                        }
                        value={
                          warehouses.find((w) => w.value === filters.from_wh) || {
                            value: "",
                            label: "All Warehouses",
                          }
                        }
                        isClearable
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="input-blocks">
                      <label>To Warehouse</label>
                      <Select
                        className="select"
                        options={[
                          { value: "", label: "All Warehouses" },
                          ...warehouses,
                        ]}
                        placeholder="Choose Warehouse"
                        onChange={(option) =>
                          handleFilterChange("to_wh", option?.value || "")
                        }
                        value={
                          warehouses.find((w) => w.value === filters.to_wh) || {
                            value: "",
                            label: "All Warehouses",
                          }
                        }
                        isClearable
                      />
                    </div>
                  </div>
                  <div className="col-lg-2 col-sm-6 col-12">
                    <div className="input-blocks">
                      <label>Transport</label>
                      <Select
                        className="select"
                        options={transportFilterOptions}
                        placeholder="Transport"
                        onChange={(option) =>
                          handleFilterChange("transport", option?.value || "")
                        }
                        value={
                          transportFilterOptions.find(
                            (t) => t.value === filters.transport
                          ) || {
                            value: "",
                            label: "All Transport",
                          }
                        }
                        isClearable
                      />
                    </div>
                  </div>
                  <div className="col-lg-2 col-sm-6 col-12">
                    <div className="input-blocks">
                      <label>Status</label>
                      <Select
                        className="select"
                        options={statusOptions}
                        placeholder="Status"
                        onChange={(option) =>
                          handleFilterChange("status", option?.value || "")
                        }
                        value={
                          statusOptions.find((s) => s.value === filters.status) || {
                            value: "",
                            label: "All Status",
                          }
                        }
                        isClearable
                      />
                    </div>
                  </div>
                  <div className="col-lg-2 col-sm-6 col-12">
                    <div className="input-blocks">
                      <a
                        className="btn btn-filters ms-auto w-100"
                        onClick={resetFiltersHandler}
                      >
                        Reset Filters
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stock Flows Table */}
            <div className="table-responsive">
              {loading ? (
                <div className="text-center p-5">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : stockFlows.length === 0 ? (
                <div className="text-center p-5">
                  <p>No stock flows found</p>
                </div>
              ) : (
                <Table columns={columns} dataSource={stockFlows} />
              )}
            </div>
          </div>
        </div>
 </div>

      {/* Add Modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal} size="lg" centered>
        <Modal.Header>
          <Modal.Title>Add Stock Flow</Modal.Title>
          <button
            type="button"
            className="btn-close"
            onClick={handleCloseAddModal}
            disabled={submitting}
          />
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAddSubmit}>
            {/* FROM Section */}
            <div className="row mb-3">
              <div className="col-12">
                <h6 className="mb-3">From Location</h6>
                <div className="d-flex gap-3 mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="fromType"
                      id="fromWarehouse"
                      checked={fromIsWarehouse}
                      onChange={() => {
                        setFromIsWarehouse(true);
                        setFormData(prev => ({ ...prev, from_loc: "" }));
                      }}
                    />
                    <label className="form-check-label" htmlFor="fromWarehouse">
                      Warehouse
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="fromType"
                      id="fromLocation"
                      checked={!fromIsWarehouse}
                      onChange={() => {
                        setFromIsWarehouse(false);
                        setFormData(prev => ({ ...prev, from_wh: null }));
                      }}
                    />
                    <label className="form-check-label" htmlFor="fromLocation">
                      Other Location
                    </label>
                  </div>
                </div>

                {fromIsWarehouse ? (
                  <Select
                    options={warehouses}
                    value={formData.from_wh}
                    onChange={(option) =>
                      setFormData(prev => ({ ...prev, from_wh: option }))
                    }
                    placeholder="Select Warehouse"
                    isClearable
                  />
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    value={formData.from_loc}
                    onChange={(e) => setFormData(prev => ({ ...prev, from_loc: e.target.value }))}
                    placeholder="Enter location name"
                  />
                )}
              </div>
            </div>

            {/* TO Section */}
            <div className="row mb-3">
              <div className="col-12">
                <h6 className="mb-3">To Location</h6>
                <div className="d-flex gap-3 mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="toType"
                      id="toWarehouse"
                      checked={toIsWarehouse}
                      onChange={() => {
                        setToIsWarehouse(true);
                        setFormData(prev => ({ ...prev, to_loc: "" }));
                      }}
                    />
                    <label className="form-check-label" htmlFor="toWarehouse">
                      Warehouse
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="toType"
                      id="toLocation"
                      checked={!toIsWarehouse}
                      onChange={() => {
                        setToIsWarehouse(false);
                        setFormData(prev => ({ ...prev, to_wh: null }));
                      }}
                    />
                    <label className="form-check-label" htmlFor="toLocation">
                      Other Location
                    </label>
                  </div>
                </div>

                {toIsWarehouse ? (
                  <Select
                    options={warehouses}
                    value={formData.to_wh}
                    onChange={(option) =>
                      setFormData(prev => ({ ...prev, to_wh: option }))
                    }
                    placeholder="Select Warehouse"
                    isClearable
                  />
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    value={formData.to_loc}
                    onChange={(e) => setFormData(prev => ({ ...prev, to_loc: e.target.value }))}
                    placeholder="Enter location name"
                  />
                )}
              </div>
            </div>

            {/* Other fields */}
            <div className="row">
              <div className="col-lg-4">
                <div className="mb-3">
                  <label className="form-label">
                    Quantity <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="Enter quantity"
                    min="1"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mb-3">
                  <label className="form-label">
                    Transport <span className="text-danger">*</span>
                  </label>
                  <Select
                    options={transportOptions}
                    value={formData.transport}
                    onChange={(option) =>
                      setFormData((prev) => ({
                        ...prev,
                        transport: option,
                      }))
                    }
                    placeholder="Select Transport"
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <Select
                    options={statusOptionsForForm}
                    value={formData.status}
                    onChange={(option) =>
                      setFormData((prev) => ({
                        ...prev,
                        status: option,
                      }))
                    }
                    placeholder="Select Status"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Enter description"
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-cancel me-2"
                onClick={handleCloseAddModal}
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-submit"
                disabled={submitting}
              >
                {submitting ? "Creating..." : "Create & Download Invoice"}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Edit Modal - Same structure */}


<Modal show={showEditModal} onHide={handleCloseEditModal} size="lg" centered>
  <Modal.Header>
    <Modal.Title>Edit Stock Flow</Modal.Title>
    <button
      type="button"
      className="btn-close"
      onClick={handleCloseEditModal}
      disabled={submitting}
    />
  </Modal.Header>
  <Modal.Body>
    <form onSubmit={handleEditSubmit}>
      {/* FROM Section */}
      <div className="row mb-3">
        <div className="col-12">
          <h6 className="mb-3">From Location</h6>
          <div className="d-flex gap-3 mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="fromTypeEdit"
                id="fromWarehouseEdit"
                checked={fromIsWarehouse}
                onChange={() => {
                  setFromIsWarehouse(true);
                  setFormData(prev => ({ ...prev, from_loc: "" }));
                }}
              />
              <label className="form-check-label" htmlFor="fromWarehouseEdit">
                Warehouse
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="fromTypeEdit"
                id="fromLocationEdit"
                checked={!fromIsWarehouse}
                onChange={() => {
                  setFromIsWarehouse(false);
                  setFormData(prev => ({ ...prev, from_wh: null }));
                }}
              />
              <label className="form-check-label" htmlFor="fromLocationEdit">
                Other Location
              </label>
            </div>
          </div>

          {fromIsWarehouse ? (
            <Select
              options={warehouses}
              value={formData.from_wh}
              onChange={(option) =>
                setFormData(prev => ({ ...prev, from_wh: option }))
              }
              placeholder="Select Warehouse"
              isClearable
            />
          ) : (
            <input
              type="text"
              className="form-control"
              value={formData.from_loc}
              onChange={(e) => setFormData(prev => ({ ...prev, from_loc: e.target.value }))}
              placeholder="Enter location name"
            />
          )}
        </div>
      </div>

      {/* TO Section */}
      <div className="row mb-3">
        <div className="col-12">
          <h6 className="mb-3">To Location</h6>
          <div className="d-flex gap-3 mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="toTypeEdit"
                id="toWarehouseEdit"
                checked={toIsWarehouse}
                onChange={() => {
                  setToIsWarehouse(true);
                  setFormData(prev => ({ ...prev, to_loc: "" }));
                }}
              />
              <label className="form-check-label" htmlFor="toWarehouseEdit">
                Warehouse
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="toTypeEdit"
                id="toLocationEdit"
                checked={!toIsWarehouse}
                onChange={() => {
                  setToIsWarehouse(false);
                  setFormData(prev => ({ ...prev, to_wh: null }));
                }}
              />
              <label className="form-check-label" htmlFor="toLocationEdit">
                Other Location
              </label>
            </div>
          </div>

          {toIsWarehouse ? (
            <Select
              options={warehouses}
              value={formData.to_wh}
              onChange={(option) =>
                setFormData(prev => ({ ...prev, to_wh: option }))
              }
              placeholder="Select Warehouse"
              isClearable
            />
          ) : (
            <input
              type="text"
              className="form-control"
              value={formData.to_loc}
              onChange={(e) => setFormData(prev => ({ ...prev, to_loc: e.target.value }))}
              placeholder="Enter location name"
            />
          )}
        </div>
      </div>

      {/* Other fields */}
      <div className="row">
        <div className="col-lg-4">
          <div className="mb-3">
            <label className="form-label">
              Quantity <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              className="form-control"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="Enter quantity"
              min="1"
              required
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="mb-3">
            <label className="form-label">
              Transport <span className="text-danger">*</span>
            </label>
            <Select
              options={transportOptions}
              value={formData.transport}
              onChange={(option) =>
                setFormData((prev) => ({
                  ...prev,
                  transport: option,
                }))
              }
              placeholder="Select Transport"
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="mb-3">
            <label className="form-label">
              Status <span className="text-danger">*</span>
            </label>
            <Select
              options={statusOptionsForForm}
              value={formData.status}
              onChange={(option) =>
                setFormData((prev) => ({
                  ...prev,
                  status: option,
                }))
              }
              placeholder="Select Status"
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              placeholder="Enter description"
            />
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-cancel me-2"
          onClick={handleCloseEditModal}
          disabled={submitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-submit"
          disabled={submitting}
        >
          {submitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  </Modal.Body>
</Modal>
   
      </div>
    
  );
};

export default StockTransfer;

// The rest of your component's JSX (modals, etc.) remains exactly the same
// since we're just replacing the data source for the options!