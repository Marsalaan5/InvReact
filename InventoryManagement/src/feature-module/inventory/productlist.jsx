// import {
//   Box,
//   ChevronUp,
//   Edit,
//   Eye,
//   Filter,
//   GitMerge,
//   PlusCircle,
//   RotateCcw,
//   Sliders,
//   StopCircle,
//   Trash2,
// } from "feather-icons-react/build/IconComponents";
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import Select from "react-select";
// import ImageWithBasePath from "../../core/img/imagewithbasebath";
// import Brand from "../../core/modals/inventory/brand";
// import withReactContent from "sweetalert2-react-content";
// import Swal from "sweetalert2";
// import { all_routes } from "../../Router/all_routes";
// import { OverlayTrigger, Tooltip } from "react-bootstrap";
// import Table from "../../core/pagination/datatable";
// import { setToogleHeader } from "../../core/redux/action";
// import { Download } from "react-feather";

// const ProductList = () => {
//   const dataSource = useSelector((state) => state.product_list);
//   const dispatch = useDispatch();
//   const data = useSelector((state) => state.toggle_header);

//   const [isFilterVisible, setIsFilterVisible] = useState(false);
//   const toggleFilterVisibility = () => {
//     setIsFilterVisible((prevVisibility) => !prevVisibility);
//   };
//   const route = all_routes;
//   const options = [
//     { value: "sortByDate", label: "Sort by Date" },
//     { value: "140923", label: "14 09 23" },
//     { value: "110923", label: "11 09 23" },
//   ];
//   const productlist = [
//     { value: "choose", label: "Choose Product" },
//     { value: "lenovo", label: "Lenovo 3rd Generation" },
//     { value: "nike", label: "Nike Jordan" },
//   ];
//   const categorylist = [
//     { value: "choose", label: "Choose Category" },
//     { value: "laptop", label: "Laptop" },
//     { value: "shoe", label: "Shoe" },
//   ];
//   const subcategorylist = [
//     { value: "choose", label: "Choose Sub Category" },
//     { value: "computers", label: "Computers" },
//     { value: "fruits", label: "Fruits" },
//   ];
//   const brandlist = [
//     { value: "all", label: "All Brand" },
//     { value: "lenovo", label: "Lenovo" },
//     { value: "nike", label: "Nike" },
//   ];
//   const price = [
//     { value: "price", label: "Price" },
//     { value: "12500", label: "$12,500.00" },
//     { value: "13000", label: "$13,000.00" }, // Replace with your actual values
//   ];

//   const columns = [
//     {
//       title: "Product",
//       dataIndex: "product",
//       render: (text, record) => (
//         <span className="productimgname">
//           <Link to="/profile" className="product-img stock-img">
//             <ImageWithBasePath alt="" src={record.productImage} />
//           </Link>
//           <Link to="/profile">{text}</Link>
//         </span>
//       ),
//       sorter: (a, b) => a.product.length - b.product.length,
//     },
//     {
//       title: "SKU",
//       dataIndex: "sku",
//       sorter: (a, b) => a.sku.length - b.sku.length,
//     },

//     {
//       title: "Category",
//       dataIndex: "category",
//       sorter: (a, b) => a.category.length - b.category.length,
//     },

//     {
//       title: "Brand",
//       dataIndex: "brand",
//       sorter: (a, b) => a.brand.length - b.brand.length,
//     },
//     {
//       title: "Price",
//       dataIndex: "price",
//       sorter: (a, b) => a.price.length - b.price.length,
//     },
//     {
//       title: "Unit",
//       dataIndex: "unit",
//       sorter: (a, b) => a.unit.length - b.unit.length,
//     },
//     {
//       title: "Qty",
//       dataIndex: "qty",
//       sorter: (a, b) => a.qty.length - b.qty.length,
//     },

//     {
//       title: "Created By",
//       dataIndex: "createdby",
//       render: (text, record) => (
//         <span className="userimgname">
//           <Link to="/profile" className="product-img">
//             <ImageWithBasePath alt="" src={record.img} />
//           </Link>
//           <Link to="/profile">{text}</Link>
//         </span>
//       ),
//       sorter: (a, b) => a.createdby.length - b.createdby.length,
//     },
//     {
//       title: "Action",
//       dataIndex: "action",
//       render: () => (
//         <td className="action-table-data">
//           <div className="edit-delete-action">
//             <div className="input-block add-lists"></div>
//             <Link className="me-2 p-2" to={route.productdetails}>
//               <Eye className="feather-view" />
//             </Link>
//             <Link className="me-2 p-2" to={route.editproduct}>
//               <Edit className="feather-edit" />
//             </Link>
//             <Link
//               className="confirm-text p-2"
//               to="#"
//               onClick={showConfirmationAlert}
//             >
//               <Trash2 className="feather-trash-2" />
//             </Link>
//           </div>
//         </td>
//       ),
//       sorter: (a, b) => a.createdby.length - b.createdby.length,
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
//   return (
//     <div className="page-wrapper">
//       <div className="content">
//         <div className="page-header">
//           <div className="add-item d-flex">
//             <div className="page-title">
//               <h4>Product List</h4>
//               <h6>Manage your products</h6>
//             </div>
//           </div>
//           <ul className="table-top-head">
//             <li>
//               <OverlayTrigger placement="top" overlay={renderTooltip}>
//                 <Link>
//                   <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
//                 </Link>
//               </OverlayTrigger>
//             </li>
//             <li>
//               <OverlayTrigger placement="top" overlay={renderExcelTooltip}>
//                 <Link data-bs-toggle="tooltip" data-bs-placement="top">
//                   <ImageWithBasePath
//                     src="assets/img/icons/excel.svg"
//                     alt="img"
//                   />
//                 </Link>
//               </OverlayTrigger>
//             </li>
//             <li>
//               <OverlayTrigger placement="top" overlay={renderPrinterTooltip}>
//                 <Link data-bs-toggle="tooltip" data-bs-placement="top">
//                   <i data-feather="printer" className="feather-printer" />
//                 </Link>
//               </OverlayTrigger>
//             </li>
//             <li>
//               <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
//                 <Link data-bs-toggle="tooltip" data-bs-placement="top">
//                   <RotateCcw />
//                 </Link>
//               </OverlayTrigger>
//             </li>
//             <li>
//               <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
//                 <Link
//                   data-bs-toggle="tooltip"
//                   data-bs-placement="top"
//                   id="collapse-header"
//                   className={data ? "active" : ""}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     dispatch(setToogleHeader(!data));
//                   }}
//                 >
//                   <ChevronUp />
//                 </Link>
//               </OverlayTrigger>
//             </li>
//           </ul>
//           <div className="page-btn">
//             <Link to={route.addproduct} className="btn btn-added">
//               <PlusCircle className="me-2 iconsize" />
//               Add New Product
//             </Link>
//           </div>
//           <div className="page-btn import">
//             <Link
//               to="#"
//               className="btn btn-added color"
//               data-bs-toggle="modal"
//               data-bs-target="#view-notes"
//             >
//               <Download className="me-2" />
//               Import Product
//             </Link>
//           </div>
//         </div>
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
//               <div className="form-sort">
//                 <Sliders className="info-img" />
//                 <Select
//                   className="select"
//                   options={options}
//                   placeholder="14 09 23"
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
//                   <div className="col-lg-12 col-sm-12">
//                     <div className="row">
//                       <div className="col-lg-2 col-sm-6 col-12">
//                         <div className="input-blocks">
//                           <Box className="info-img" />
//                           <Select
//                             className="select"
//                             options={productlist}
//                             placeholder="Choose Product"
//                           />
//                         </div>
//                       </div>
//                       <div className="col-lg-2 col-sm-6 col-12">
//                         <div className="input-blocks">
//                           <StopCircle className="info-img" />
//                           <Select
//                             className="select"
//                             options={categorylist}
//                             placeholder="Choose Category"
//                           />
//                         </div>
//                       </div>
//                       <div className="col-lg-2 col-sm-6 col-12">
//                         <div className="input-blocks">
//                           <GitMerge className="info-img" />
//                           <Select
//                             className="select"
//                             options={subcategorylist}
//                             placeholder="Choose Sub Category"
//                           />
//                         </div>
//                       </div>
//                       <div className="col-lg-2 col-sm-6 col-12">
//                         <div className="input-blocks">
//                           <StopCircle className="info-img" />
//                           <Select
//                             className="select"
//                             options={brandlist}
//                             placeholder="Nike"
//                           />
//                         </div>
//                       </div>
//                       <div className="col-lg-2 col-sm-6 col-12">
//                         <div className="input-blocks">
//                           <i className="fas fa-money-bill info-img" />

//                           <Select
//                             className="select"
//                             options={price}
//                             placeholder="Price"
//                           />
//                         </div>
//                       </div>
//                       <div className="col-lg-2 col-sm-6 col-12">
//                         <div className="input-blocks">
//                           <Link className="btn btn-filters ms-auto">
//                             {" "}
//                             <i
//                               data-feather="search"
//                               className="feather-search"
//                             />{" "}
//                             Search{" "}
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {/* /Filter */}
//             <div className="table-responsive">
//               <Table columns={columns} dataSource={dataSource} />
//             </div>
//           </div>
//         </div>
//         {/* /product list */}
//         <Brand />
//       </div>
//     </div>
//   );
// };

// export default ProductList;




// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Select from "react-select";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import { all_routes } from "../../Router/all_routes";
// import {
//   ChevronUp,
//   Edit,
//   // Eye,
//   Filter,
//   PlusCircle,
//   RotateCcw,
//   Sliders,
//   Trash2,
// } from "feather-icons-react/build/IconComponents";
// import { OverlayTrigger, Tooltip } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { setToogleHeader } from "../../core/redux/action";
// import ImageWithBasePath from "../../core/img/imagewithbasebath";
// import AuthService from "../../services/authService";

// const ProductList = () => {
//   const route = all_routes;
//   const dispatch = useDispatch();
//   const data = useSelector((state) => state.toggle_header);
//   const MySwal = withReactContent(Swal);

//   // State for products
//   const [products, setProducts] = useState([]);
//     // const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isFilterVisible, setIsFilterVisible] = useState(false);

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   // const [totalItems, setTotalItems] = useState(0);
//   // const [itemsPerPage, setItemsPerPage] = useState(10);

//   // Filter state
//   const [filters, setFilters] = useState({
//     search: "",
//     status: "",
//     warehouse_id: "",
//     article_profile_id: "",
//     sortBy: "created_at",
//     sortOrder: "DESC",
//   });

//   // Dropdown options
//   const [warehouses, setWarehouses] = useState([]);
//   const [articleProfiles, setArticleProfiles] = useState([]);

//   // Fetch initial data
//   useEffect(() => {
//     // fetchUsers();
//     fetchProducts();
//     fetchFilterOptions();
//   }, [currentPage]);


//   //   const fetchUsers = async () => {
//   //   try {
//   //     const response = await AuthService.getUser();
//   //     setUsers(response.data.users || []);
//   //   } catch (error) {
//   //     console.error("Error fetching users:", error);
//   //   }
//   // };

// //   const getUserName = (userId) => {
// //   const user = users.find((u) => u.id === userId);
// //   return user ? user.name : "Unknown";
// // };



//   // Fetch products from API
//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const params = {
//         page: currentPage,
//         // limit: itemsPerPage,
//         ...filters,
//       };

//       // Remove empty filters
//       Object.keys(params).forEach((key) => params[key] === "" && delete params[key]);

//       const response = await AuthService.getProduct(params);

//       setProducts(response.data.data || []);
//       setTotalPages(response.data.pagination?.totalPages || 1);
//       // setTotalItems(response.data.pagination?.total || 0);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       MySwal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to load products",
//         timer: 2000,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch filter options
//   const fetchFilterOptions = async () => {
//     try {
//       const [warehousesRes, articleProfilesRes] = await Promise.all([
//         AuthService.getWarehouse(),
//         AuthService.getArticleProfiles(),
//       ]);

//       setWarehouses(
//         (warehousesRes.data.data || []).map((item) => ({
//           value: item.id,
//           label: item.name || item.title,
//         }))
//       );

//       setArticleProfiles(
//         (articleProfilesRes.data.data || []).map((item) => ({
//           value: item.id,
//           label: item.name || item.title,
//         }))
//       );
//     } catch (error) {
//       console.error("Error fetching filter options:", error);
//     }
//   };

//   // Handle filter changes
//   const handleFilterChange = (name, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     setCurrentPage(1);
//   };

//   // Handle search with debounce effect
//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       if (currentPage === 1) {
//         fetchProducts();
//       } else {
//         setCurrentPage(1);
//       }
//     }, 500);

//     return () => clearTimeout(delayDebounceFn);
//   }, [filters.search]);

//   // Fetch products when filters or pagination change
//   useEffect(() => {
//     fetchProducts();
//   }, [currentPage, filters.status, filters.warehouse_id, filters.article_profile_id, filters.sortBy, filters.sortOrder]);

//   const handleSearch = (e) => {
//     const value = e.target.value;
//     setFilters((prev) => ({
//       ...prev,
//       search: value,
//     }));
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
//           await AuthService.deleteProduct(id);
//           MySwal.fire({
//             icon: "success",
//             title: "Deleted!",
//             text: "Product has been deleted.",
//             timer: 2000,
//             showConfirmButton: false,
//           });
//           fetchProducts();
//         } catch (error) {
//           console.error("Error deleting product:", error);
//           MySwal.fire({
//             icon: "error",
//             title: "Error",
//             text: error.response?.data?.message || "Failed to delete product",
//             timer: 3000,
//           });
//         }
//       }
//     });
//   };

//   // Toggle filter visibility
//   const toggleFilterVisibility = () => {
//     setIsFilterVisible((prev) => !prev);
//   };

//   // Reset filters
//   const resetFilters = () => {
//     setFilters({
//       search: "",
//       status: "",
//       warehouse_id: "",
//       article_profile_id: "",
//       sortBy: "created_at",
//       sortOrder: "DESC",
//     });
//     setCurrentPage(1);
//   };

//   // Pagination handlers
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   // Tooltips
//   const renderTooltip = (text) => {
//     const TooltipComponent = (props) => (
//       <Tooltip id={`${text}-tooltip`} {...props}>
//         {text}
//       </Tooltip>
//     );
//     TooltipComponent.displayName = `Tooltip-${text}`;
//     return TooltipComponent;
//   };

//   const sortOptions = [
//     { value: "created_at:DESC", label: "Newest First" },
//     { value: "created_at:ASC", label: "Oldest First" },
//     { value: "title:ASC", label: "Name A-Z" },
//     { value: "title:DESC", label: "Name Z-A" },
//     { value: "count:ASC", label: "Quantity Low to High" },
//     { value: "count:DESC", label: "Quantity High to Low" },
//   ];

//   const handleSortChange = (option) => {
//     const [sortBy, sortOrder] = option.value.split(":");
//     setFilters((prev) => ({
//       ...prev,
//       sortBy,
//       sortOrder,
//     }));
//     setCurrentPage(1);
//   };

//   const statusOptions = [
//     { value: "", label: "All Status" },
//     { value: "new", label: "New" },
//     { value: "used", label: "Used" },
//     { value: "repaired", label: "Repaired" },
//     { value: "broken", label: "Broken" },
//     { value: "installed", label: "Installed" },
//   ];

//   // Generate pagination numbers
//   const getPaginationNumbers = () => {
//     const delta = 2;
//     const range = [];
//     const rangeWithDots = [];
//     let l;

//     for (let i = 1; i <= totalPages; i++) {
//       if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
//         range.push(i);
//       }
//     }

//     range.forEach((i) => {
//       if (l) {
//         if (i - l === 2) {
//           rangeWithDots.push(l + 1);
//         } else if (i - l !== 1) {
//           rangeWithDots.push("...");
//         }
//       }
//       rangeWithDots.push(i);
//       l = i;
//     });

//     return rangeWithDots;
//   };


//     // const userOptions = users.map((u) => ({ label: u.name, value: u.id }));

//   return (
//     <div className="page-wrapper">
//       <div className="content">
//         <div className="page-header">
//           <div className="add-item d-flex">
//             <div className="page-title">
//               <h4>Product List</h4>
//               <h6>Manage your products</h6>
//             </div>
//           </div>
//           <ul className="table-top-head">
//             <li>
//               <OverlayTrigger placement="top" overlay={renderTooltip("PDF")}>
//                 <Link>
//                   <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
//                 </Link>
//               </OverlayTrigger>
//             </li>
//             <li>
//               <OverlayTrigger placement="top" overlay={renderTooltip("Excel")}>
//                 <Link>
//                   <ImageWithBasePath src="assets/img/icons/excel.svg" alt="img" />
//                 </Link>
//               </OverlayTrigger>
//             </li>
//             <li>
//               <OverlayTrigger placement="top" overlay={renderTooltip("Refresh")}>
//                 <Link onClick={fetchProducts}>
//                   <RotateCcw />
//                 </Link>
//               </OverlayTrigger>
//             </li>
//             <li>
//               <OverlayTrigger placement="top" overlay={renderTooltip("Collapse")}>
//                 <Link
//                   className={data ? "active" : ""}
//                   onClick={() => dispatch(setToogleHeader(!data))}
//                 >
//                   <ChevronUp />
//                 </Link>
//               </OverlayTrigger>
//             </li>
//           </ul>
//           <div className="page-btn">
//             <Link to={route.addproduct} className="btn btn-added">
//               <PlusCircle className="me-2 iconsize" />
//               Add New Product
//             </Link>
//           </div>
//         </div>

//         <div className="card table-list-card">
//           <div className="card-body">
//             <div className="table-top">
//               <div className="search-set">
//                 <div className="search-input">
//                   <input
//                     type="text"
//                     placeholder="Search by name, SKU, or barcode"
//                     className="form-control form-control-sm formsearch"
//                     value={filters.search}
//                     onChange={handleSearch}
//                   />
//                 </div>
//               </div>
//               <div className="search-path">
//                 <Link
//                   className={`btn btn-filter ${isFilterVisible ? "setclose" : ""}`}
//                   onClick={toggleFilterVisibility}
//                 >
//                   <Filter className="filter-icon" />
//                   <span>
//                     <ImageWithBasePath src="assets/img/icons/closes.svg" alt="img" />
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
//                     (opt) => opt.value === `${filters.sortBy}:${filters.sortOrder}`
//                   )}
//                 />
//               </div>
//             </div>

//             {/* Filter Section */}
//             {isFilterVisible && (
//               <div className="card" id="filter_inputs">
//                 <div className="card-body pb-0">
//                   <div className="row">
//                     <div className="col-lg-3 col-sm-6 col-12">
//                       <div className="input-blocks">
//                         <label>Warehouse</label>
//                         <Select
//                           className="select"
//                           options={[{ value: "", label: "All Warehouses" }, ...warehouses]}
//                           placeholder="Choose Warehouse"
//                           onChange={(option) => handleFilterChange("warehouse_id", option?.value || "")}
//                           value={
//                             warehouses.find((w) => w.value === filters.warehouse_id) || {
//                               value: "",
//                               label: "All Warehouses",
//                             }
//                           }
//                           isClearable
//                         />
//                       </div>
//                     </div>
//                     <div className="col-lg-3 col-sm-6 col-12">
//                       <div className="input-blocks">
//                         <label>Article Profile</label>
//                         <Select
//                           className="select"
//                           options={[
//                             { value: "", label: "All Article Profiles" },
//                             ...articleProfiles,
//                           ]}
//                           placeholder="Choose Article Profile"
//                           onChange={(option) =>
//                             handleFilterChange("article_profile_id", option?.value || "")
//                           }
//                           value={
//                             articleProfiles.find((ap) => ap.value === filters.article_profile_id) || {
//                               value: "",
//                               label: "All Article Profiles",
//                             }
//                           }
//                           isClearable
//                         />
//                       </div>
//                     </div>
//                     <div className="col-lg-3 col-sm-6 col-12">
//                       <div className="input-blocks">
//                         <label>Status</label>
//                         <Select
//                           className="select"
//                           options={statusOptions}
//                           placeholder="Status"
//                           onChange={(option) => handleFilterChange("status", option?.value || "")}
//                           value={
//                             statusOptions.find((s) => s.value === filters.status) || {
//                               value: "",
//                               label: "All Status",
//                             }
//                           }
//                           isClearable
//                         />
//                       </div>
//                     </div>
//                     <div className="col-lg-3 col-sm-6 col-12">
//                       <div className="input-blocks">
//                         <button className="btn btn-filters ms-auto w-100" onClick={resetFilters}>
//                           Reset Filters
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Products Table */}
//             <div className="table-responsive">
//               {loading ? (
//                 <div className="text-center p-5">
//                   <div className="spinner-border" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                   </div>
//                 </div>
//               ) : products.length === 0 ? (
//                 <div className="text-center p-5">
//                   <p>No products found</p>
//                 </div>
//               ) : (
//                 <table className="table datanew">
//                   <thead>
//                     <tr>
//                       <th>Product</th>
//                       <th>SKU</th>
//                       <th>Article Profile</th>
//                       <th>Warehouse</th>
//                       <th>Location</th>
//                       <th>Quantity</th>
//                       <th>Status</th>
//                       {/* <th>Created By</th> */}
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {products.map((product) => (
//                       <tr key={product.id}>
//                         <td>
//                           <span className="productimgname">
//                             <Link
//                               to={`${route.productdetails}/${product.id}`}
//                               className="product-img stock-img"
//                             >
//                               {/* <img
//                                 src={
//                                   product.barcode
//                                     ? `http://localhost:5000${product.barcode}`
//                                     : "/assets/img/products/default.png"
//                                 }
//                                 alt={product.title}
//                                 style={{
//                                   width: "40px",
//                                   height: "40px",
//                                   objectFit: "cover",
//                                 }}
//                               /> */}
//                             </Link>
//                             <Link to={`${route.productdetails}/${product.id}`}>
//                               {product.title}
//                             </Link>
//                           </span>
//                         </td>
//                         <td>
//                           <span className="badge badge-info">{product.sku}</span>
//                         </td>
//                         <td>{product.article_profile_name || "N/A"}</td>
//                         <td>{product.warehouse_name || "N/A"}</td>
//                         <td>{product.location || "N/A"}</td>
//                         <td>
//                           <span className="badge badge-primary">{product.count || 0}</span>
//                         </td>
//                         <td>
//                           <span
//                             className={`badge ${
//                               product.status === "new"
//                                 ? "badge-linesuccess"
//                                 : product.status === "used"
//                                 ? "badge-lineinfo"
//                                 : product.status === "repaired"
//                                 ? "badge-linewarning"
//                                 : product.status === "broken"
//                                 ? "badge-linedanger"
//                                 : "badge-secondary"
//                             }`}
//                           >
//                             {product.status}
//                           </span>
//                         </td>
//                         {/* <td>
//                           <span className="userimgname">
//                             <img
//                               src={
//                                 product.created_by_image ||
//                                 "/assets/img/users/default.jpg"
//                               }
//                               alt="user"
//                               style={{
//                                 width: "30px",
//                                 height: "30px",
//                                 borderRadius: "50%",
//                                 marginRight: "8px",
//                               }}
//                             />
//                             {getUserName(product.created_by)}
//                           </span>
//                         </td> */}
//                         <td className="action-table-data">
//                           <div className="edit-delete-action">
//                             {/* <Link
//                               className="me-2 p-2"
//                               to={`${route.productdetails}/${product.id}`}
//                             >
//                               <Eye className="feather-view" />
//                             </Link> */}
//                             <Link
//                               className="me-2 p-2"
//                               to={`${route.editproduct}/${product.id}`}
//                             >
//                               <Edit className="feather-edit" />
//                             </Link>
//                             <Link
//                               className="confirm-text p-2"
//                               to="#"
//                               onClick={() => handleDelete(product.id)}
//                             >
//                               <Trash2 className="feather-trash-2" />
//                             </Link>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               )}
//             </div>

//             {/* Pagination */}
//             {!loading && products.length > 0 && (
//               <div className="row align-items-center">
              
//                 <div className="col-sm-12 col-md-6">
//                   <div className="dataTables_paginate paging_simple_numbers">
//                     <ul className="pagination justify-content-end gap-2">
//                       <li
//                         className={`paginate_button page-item previous ${
//                           currentPage === 1 ? "disabled" : ""
//                         }`}
//                       >
//                         <button
//                           className="page-link"
//                           onClick={() => handlePageChange(currentPage - 1)}
//                           disabled={currentPage === 1}
//                         >
//                           Previous
//                         </button>
//                       </li>
//                       {getPaginationNumbers().map((page, index) =>
//                         page === "..." ? (
//                           <li key={`dots-${index}`} className="paginate_button page-item disabled">
//                             <span className="page-link">...</span>
//                           </li>
//                         ) : (
//                           <li
//                             key={page}
//                             className={`paginate_button page-item ${
//                               currentPage === page ? "active" : ""
//                             }`}
//                           >
//                             <button className="page-link" onClick={() => handlePageChange(page)}>
//                               {page}
//                             </button>
//                           </li>
//                         )
//                       )}
//                       <li
//                         className={`paginate_button page-item next ${
//                           currentPage === totalPages ? "disabled" : ""
//                         }`}
//                       >
//                         <button
//                           className="page-link"
//                           onClick={() => handlePageChange(currentPage + 1)}
//                           disabled={currentPage === totalPages}
//                         >
//                           Next
//                         </button>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductList;




import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { all_routes } from "../../Router/all_routes";
import {
  ChevronUp,
  Edit,
  Filter,
  PlusCircle,
  RotateCcw,
  Sliders,
  Trash2,
} from "feather-icons-react/build/IconComponents";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setToogleHeader } from "../../core/redux/action";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import AuthService from "../../services/authService";
import Table from "../../core/pagination/datatable";

const ProductList = () => {
  const route = all_routes;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);
  const MySwal = withReactContent(Swal);

  // State for products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // Filter state
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    warehouse_id: "",
    article_profile_id: "",
    sortBy: "created_at",
    sortOrder: "DESC",
  });

  // Dropdown options
  const [warehouses, setWarehouses] = useState([]);
  const [articleProfiles, setArticleProfiles] = useState([]);

  // Fetch initial data
  useEffect(() => {
    fetchProducts();
    fetchFilterOptions();
  }, []);

  // Fetch products from API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {
        ...filters,
      };

      // Remove empty filters
      Object.keys(params).forEach((key) => params[key] === "" && delete params[key]);

      const response = await AuthService.getProduct(params);
      const productsData = response.data.data || [];

      // Process products data
      const processedProducts = productsData.map((product) => ({
        ...product,
        key: product.id, // For ant design table
      }));

      setProducts(processedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load products",
        timer: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch filter options
  const fetchFilterOptions = async () => {
    try {
      const [warehousesRes, articleProfilesRes] = await Promise.all([
        AuthService.getWarehouse(),
        AuthService.getArticleProfiles(),
      ]);

      setWarehouses(
        (warehousesRes.data.data || []).map((item) => ({
          value: item.id,
          label: item.name || item.title,
        }))
      );

      setArticleProfiles(
        (articleProfilesRes.data.data || []).map((item) => ({
          value: item.id,
          label: item.name || item.title,
        }))
      );
    } catch (error) {
      console.error("Error fetching filter options:", error);
    }
  };

  // Handle filter changes
  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ DEBOUNCED SEARCH - Search with 500ms delay
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (filters.search !== undefined) {
        fetchProducts();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [filters.search]);

  // Fetch products when other filters change (non-search)
  useEffect(() => {
    fetchProducts();
  }, [filters.status, filters.warehouse_id, filters.article_profile_id, filters.sortBy, filters.sortOrder]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      search: value,
    }));
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
          await AuthService.deleteProduct(id);
          MySwal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Product has been deleted.",
            timer: 2000,
            showConfirmButton: false,
          });
          fetchProducts();
        } catch (error) {
          console.error("Error deleting product:", error);
          MySwal.fire({
            icon: "error",
            title: "Error",
            text: error.response?.data?.message || "Failed to delete product",
            timer: 3000,
          });
        }
      }
    });
  };

  // Toggle filter visibility
  const toggleFilterVisibility = () => {
    setIsFilterVisible((prev) => !prev);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      search: "",
      status: "",
      warehouse_id: "",
      article_profile_id: "",
      sortBy: "created_at",
      sortOrder: "DESC",
    });
  };

  // Tooltips
  const renderTooltip = (text) => {
    const TooltipComponent = (props) => (
      <Tooltip id={`${text}-tooltip`} {...props}>
        {text}
      </Tooltip>
    );
    TooltipComponent.displayName = `Tooltip-${text}`;
    return TooltipComponent;
  };

  const sortOptions = [
    { value: "created_at:DESC", label: "Newest First" },
    { value: "created_at:ASC", label: "Oldest First" },
    { value: "title:ASC", label: "Name A-Z" },
    { value: "title:DESC", label: "Name Z-A" },
    { value: "count:ASC", label: "Quantity Low to High" },
    { value: "count:DESC", label: "Quantity High to Low" },
  ];

  const handleSortChange = (option) => {
    const [sortBy, sortOrder] = option.value.split(":");
    setFilters((prev) => ({
      ...prev,
      sortBy,
      sortOrder,
    }));
  };

  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "new", label: "New" },
    { value: "used", label: "Used" },
    { value: "repaired", label: "Repaired" },
    { value: "broken", label: "Broken" },
    { value: "installed", label: "Installed" },
  ];

  //  TABLE COLUMNS for ant design table
  const columns = [
    {
      title: "Product",
      dataIndex: "title",
      render: (text, record) => (
        <span className="productimgname">
          <Link to={`${route.productdetails}/${record.id}`}>
            {text}
          </Link>
        </span>
      ),
      sorter: (a, b) => (a.title || '').localeCompare(b.title || ''),
    },
    {
      title: "SKU",
      dataIndex: "sku",
      render: (text) => <span className="badge badge-info">{text}</span>,
      sorter: (a, b) => (a.sku || '').localeCompare(b.sku || ''),
    },
    {
      title: "Article Profile",
      dataIndex: "article_profile_name",
      render: (text) => text || "N/A",
      sorter: (a, b) => (a.article_profile_name || '').localeCompare(b.article_profile_name || ''),
    },
    {
      title: "Warehouse",
      dataIndex: "warehouse_name",
      render: (text) => text || "N/A",
      sorter: (a, b) => (a.warehouse_name || '').localeCompare(b.warehouse_name || ''),
    },
    {
      title: "Location",
      dataIndex: "location",
      render: (text) => text || "N/A",
      sorter: (a, b) => (a.location || '').localeCompare(b.location || ''),
    },
    {
      title: "Quantity",
      dataIndex: "count",
      render: (text) => <span className="badge badge-primary">{text || 0}</span>,
      sorter: (a, b) => (a.count || 0) - (b.count || 0),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => (
        <span
          className={`badge ${
            text === "new"
              ? "badge-linesuccess"
              : text === "used"
              ? "badge-lineinfo"
              : text === "repaired"
              ? "badge-linewarning"
              : text === "broken"
              ? "badge-linedanger"
              : "badge-secondary"
          }`}
        >
          {text}
        </span>
      ),
      sorter: (a, b) => (a.status || '').localeCompare(b.status || ''),
    },
{
  title: "Action",
  dataIndex: "actions",
  render: (_, record) => (
    <td className="action-table-data">
      <div className="edit-delete-action">
        {/* Edit Button */}
        <Link
          className="me-2 p-2"
          to={`${route.editproduct}/${record.id}`}
          title="Edit"
        >
          <Edit className="feather-edit" />
        </Link>

        {/* Delete Button */}
        <Link
          className="confirm-text p-2"
          to="#"
          onClick={() => handleDelete(record.id)}
          title="Delete"
        >
          <Trash2 className="feather-trash-2" />
        </Link>
      </div>
    </td>
  ),
}

  ];


  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Product List</h4>
              <h6>Manage your products</h6>
            </div>
          </div>
          <ul className="table-top-head">
            <li>
              <OverlayTrigger placement="top" overlay={renderTooltip("PDF")}>
                <Link>
                  <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="top" overlay={renderTooltip("Excel")}>
                <Link>
                  <ImageWithBasePath src="assets/img/icons/excel.svg" alt="img" />
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="top" overlay={renderTooltip("Refresh")}>
                <Link onClick={fetchProducts}>
                  <RotateCcw />
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="top" overlay={renderTooltip("Collapse")}>
                <Link
                  className={data ? "active" : ""}
                  onClick={() => dispatch(setToogleHeader(!data))}
                >
                  <ChevronUp />
                </Link>
              </OverlayTrigger>
            </li>
          </ul>
          <div className="page-btn">
            <Link to={route.addproduct} className="btn btn-added">
              <PlusCircle className="me-2 iconsize" />
              Add New Product
            </Link>
          </div>
        </div>

        <div className="card table-list-card">
          <div className="card-body">
            <div className="table-top">
              <div className="search-set">
                <div className="search-input">
                  <input
                    type="text"
                    placeholder="Search by name, SKU, or barcode"
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
                <Link
                  className={`btn btn-filter ${isFilterVisible ? "setclose" : ""}`}
                  onClick={toggleFilterVisibility}
                >
                  <Filter className="filter-icon" />
                  <span>
                    <ImageWithBasePath src="assets/img/icons/closes.svg" alt="img" />
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
                    (opt) => opt.value === `${filters.sortBy}:${filters.sortOrder}`
                  )}
                />
              </div>
            </div>

            {/* Filter Section */}
            {isFilterVisible && (
              <div className="card" id="filter_inputs">
                <div className="card-body pb-0">
                  <div className="row">
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="input-blocks">
                        <label>Warehouse</label>
                        <Select
                          className="select"
                          options={[{ value: "", label: "All Warehouses" }, ...warehouses]}
                          placeholder="Choose Warehouse"
                          onChange={(option) => handleFilterChange("warehouse_id", option?.value || "")}
                          value={
                            warehouses.find((w) => w.value === filters.warehouse_id) || {
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
                        <label>Article Profile</label>
                        <Select
                          className="select"
                          options={[
                            { value: "", label: "All Article Profiles" },
                            ...articleProfiles,
                          ]}
                          placeholder="Choose Article Profile"
                          onChange={(option) =>
                            handleFilterChange("article_profile_id", option?.value || "")
                          }
                          value={
                            articleProfiles.find((ap) => ap.value === filters.article_profile_id) || {
                              value: "",
                              label: "All Article Profiles",
                            }
                          }
                          isClearable
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="input-blocks">
                        <label>Status</label>
                        <Select
                          className="select"
                          options={statusOptions}
                          placeholder="Status"
                          onChange={(option) => handleFilterChange("status", option?.value || "")}
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
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="input-blocks">
                        <button className="btn btn-filters ms-auto w-100" onClick={resetFilters}>
                          Reset Filters
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Products Table with Pagination */}
            <div className="table-responsive">
              {loading ? (
                <div className="text-center p-5">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center p-5">
                  <p>No products found</p>
                </div>
              ) : (
                <Table columns={columns} dataSource={products} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;