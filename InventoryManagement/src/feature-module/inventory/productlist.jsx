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
//   // ChevronUp,
//   Edit,
//   Filter,
//   PlusCircle,
//   // RotateCcw,
//   Sliders,
//   Trash2,
//   Info,
//   X,
//   Camera,
//   Search as SearchIcon,
// } from "feather-icons-react/build/IconComponents";
// import {  Modal } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { setToogleHeader } from "../../core/redux/action";
// import ImageWithBasePath from "../../core/img/imagewithbasebath";
// import AuthService from "../../services/authService";
// import Table from "../../core/pagination/datatable";
// // import { exportPDF,exportExcel,refreshData,toggleHeader } from "../../utils/exports";
// // import {DateTime} from 'luxon'
// import TableHeaderActions from "../tableheader";


// const ProductList = () => {
//   const route = all_routes;
//   const dispatch = useDispatch();
//   const data = useSelector((state) => state.toggle_header);
//   const MySwal = withReactContent(Swal);

//   // State for products
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isFilterVisible, setIsFilterVisible] = useState(false);

//   // Edit Modal State
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [submitting, setSubmitting] = useState(false);

//   // Scan Modal State
//   const [showScanModal, setShowScanModal] = useState(false);
//   const [scanInput, setScanInput] = useState("");
//   const [scanning, setScanning] = useState(false);

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

//   // Edit form state
//   const [editFormData, setEditFormData] = useState({
//     title: "",
//     article_profile_id: "",
//     warehouse_id: "",
//     location: "",
//     count: "",
//     status: "",
//     description: "",
//   });

//   // Update editFormData once warehouses or articleProfiles are loaded
// useEffect(() => {
//   if (editingProduct && warehouses.length && articleProfiles.length) {
//     const selectedWarehouse = warehouses.find(
//       (w) => w.value === editingProduct.warehouse_id
//     );
//     const selectedArticleProfile = articleProfiles.find(
//       (a) => a.value === editingProduct.article_profile_id
//     );

//     setEditFormData((prev) => ({
//       ...prev,
//       warehouse_id: selectedWarehouse || null,
//       article_profile_id: selectedArticleProfile || null,
//     }));
//   }
// }, [warehouses, articleProfiles, editingProduct]);


//   // Fetch initial data
//   useEffect(() => {
//     fetchProducts();
//     fetchFilterOptions();
//     // eslint-disable-next-line 
//   }, []);

//   // Fetch products from API - FIXED VERSION
//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       // Create a clean params object
//       const params = {};
      
//       // Only add non-empty filter values
//       if (filters.search && filters.search.trim() !== "") {
//         params.search = filters.search.trim();
//       }
//       if (filters.status) {
//         params.status = filters.status;
//       }
//       if (filters.warehouse_id) {
//         params.warehouse_id = filters.warehouse_id;
//       }
//       if (filters.article_profile_id) {
//         params.article_profile_id = filters.article_profile_id;
//       }
//       if (filters.sortBy) {
//         params.sortBy = filters.sortBy;
//       }
//       if (filters.sortOrder) {
//         params.sortOrder = filters.sortOrder;
//       }

//       console.log("Fetching products with params:", params); // Debug log

//       const response = await AuthService.getProduct(params);
//       const productsData = response.data.data || [];

//       const processedProducts = productsData.map((product) => ({
//         ...product,
//         key: product.id,
//       }));

//       setProducts(processedProducts);
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
//         AuthService.getArticleProfile(),
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
//   };

//   // Debounced search
//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       fetchProducts();
//     }, 500);

//     return () => clearTimeout(delayDebounceFn);
//     // eslint-disable-next-line 
//   }, [filters.search]);

//   // Fetch products when other filters change
//   useEffect(() => {
//     fetchProducts();
//     // eslint-disable-next-line 
//   }, [filters.status, filters.warehouse_id, filters.article_profile_id, filters.sortBy, filters.sortOrder]);

//   const handleSearch = (e) => {
//     const value = e.target.value;
//     setFilters((prev) => ({
//       ...prev,
//       search: value,
//     }));
//   };

//   // SCAN FUNCTIONALITY
//   const handleScanClick = () => {
//     setScanInput("");
//     setShowScanModal(true);
//   };

//   const handleScanSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!scanInput.trim()) {
//       MySwal.fire({
//         icon: "warning",
//         title: "Empty Input",
//         text: "Please enter a barcode or SKU",
//         timer: 2000,
//       });
//       return;
//     }

//     setScanning(true);
//     try {
//       const response = await AuthService.getProductByScan(scanInput.trim());
      
//       if (response.data.success) {
//         const product = response.data.data;
        
//         // Show product details in a nice modal
//         MySwal.fire({
//           title: `<strong>${product.title}</strong>`,
//           html: `
//             <div style="text-align: left;">
//               <p><strong>SKU:</strong> ${product.sku}</p>
//               <p><strong>Barcode:</strong> ${product.barcode}</p>
//               <p><strong>Article Profile:</strong> ${product.article_profile_name || 'N/A'}</p>
//               <p><strong>Warehouse:</strong> ${product.warehouse_name || 'N/A'}</p>
//               <p><strong>Location:</strong> ${product.location || 'N/A'}</p>
//               <p><strong>Quantity:</strong> ${product.count || 0}</p>
//               <p><strong>Status:</strong> <span class="badge badge-${product.status === 'new' ? 'success' : 'info'}">${product.status}</span></p>
//               ${product.description ? `<p><strong>Description:</strong> ${product.description}</p>` : ''}
//             </div>
//           `,
//           icon: "success",
//           showCancelButton: true,
//           confirmButtonText: "Edit Product",
//           cancelButtonText: "Close",
//         }).then((result) => {
//           if (result.isConfirmed) {
//             handleEditClick(product.id);
//           }
//         });
        
//         setShowScanModal(false);
//       }
//     } catch (error) {
//       console.error("Error scanning product:", error);
//       MySwal.fire({
//         icon: "error",
//         title: "Product Not Found",
//         text: "No product found with this barcode or SKU",
//         timer: 3000,
//       });
//     } finally {
//       setScanning(false);
//     }
//   };

//   // Open Edit Modal
// const handleEditClick = async (productId) => {
//   try {
//     const response = await AuthService.getProductById(productId);
//     const product = response.data.data;

//     // SAFETY GUARDS
//     const selectedWarehouse = Array.isArray(warehouses)
//       ? warehouses.find((w) => w.value === product.warehouse_id)
//       : null;

//     const selectedArticleProfile = Array.isArray(articleProfiles)
//       ? articleProfiles.find((a) => a.value === product.article_profile_id)
//       : null;

//     setEditingProduct(product);
//     setEditFormData({
//       title: product.title || "",
//       article_profile_id: selectedArticleProfile || null,
//       warehouse_id: selectedWarehouse || null,
//       location: product.location || "",
//       count: product.count || "",
//       status: product.status || "",
//       description: product.description || "",
//     });

//     setShowEditModal(true);
//   } catch (error) {
//     console.error("Error fetching product:", error);
//   }
// };



//   // Handle Edit Form Input Changes
//   const handleEditInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle Edit Form Select Changes
//   // const handleEditSelectChange = (name, option) => {
//   //   setEditFormData((prev) => ({
//   //     ...prev,
//   //     [name]: option?.value || "",
//   //   }));
//   // };

//   // Handle Edit Form Submission
//   const handleEditSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     if (!editFormData.title) {
//       MySwal.fire({
//         icon: "warning",
//         title: "Validation Error",
//         text: "Product name is required",
//         timer: 2000,
//       });
//       return;
//     }

//     if (!editFormData.article_profile_id) {
//       MySwal.fire({
//         icon: "warning",
//         title: "Validation Error",
//         text: "Article Profile is required",
//         timer: 2000,
//       });
//       return;
//     }

//     if (!editFormData.warehouse_id) {
//       MySwal.fire({
//         icon: "warning",
//         title: "Validation Error",
//         text: "Warehouse is required",
//         timer: 2000,
//       });
//       return;
//     }

//     try {
//       setSubmitting(true);

//       const dataToSubmit = {
//   title: editFormData.title,
//   article_profile_id: editFormData.article_profile_id.value,
//   warehouse_id: editFormData.warehouse_id.value,
//   location: editFormData.location,
//   count: parseInt(editFormData.count) || 0,
//   // status: editFormData.status,
//    status: editFormData.status?.value || "",
//   description: editFormData.description,
// };


//       await AuthService.updateProductById(editingProduct.id, dataToSubmit);

//       MySwal.fire({
//         icon: "success",
//         title: "Success!",
//         text: "Product updated successfully",
//         timer: 2000,
//         showConfirmButton: false,
//       });

//       setShowEditModal(false);
//       fetchProducts();
//     } catch (error) {
//       console.error("Error updating product:", error);
//       MySwal.fire({
//         icon: "error",
//         title: "Error",
//         text: error.response?.data?.message || "Failed to update product",
//         timer: 3000,
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Close Edit Modal
//   const handleCloseEditModal = () => {
//     if (submitting) return;
    
//     MySwal.fire({
//       title: "Discard changes?",
//       text: "Any unsaved changes will be lost",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       confirmButtonText: "Yes, discard",
//       cancelButtonColor: "#3085d6",
//       cancelButtonText: "No, keep editing",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         setShowEditModal(false);
//         setEditingProduct(null);
//       }
//     });
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
//   };

//   const statusOptions = [
//     { value: "", label: "All Status" },
//     { value: "new", label: "New" },
//     { value: "used", label: "Used" },
//     { value: "repaired", label: "Repaired" },
//     { value: "broken", label: "Broken" },
//     { value: "installed", label: "Installed" },
//   ];

//   const editStatusOptions = [
//     { value: "new", label: "New" },
//     { value: "used", label: "Used" },
//     { value: "repaired", label: "Repaired" },
//     { value: "broken", label: "Broken" },
//     { value: "installed", label: "Installed" },
//   ];

//   // TABLE COLUMNS
//   const columns = [
//     {
//       title: "Product",
//       dataIndex: "title",
//       render: (text, record) => (
//         <span className="productimgname">
//           <Link to={`${route.productdetails}/${record.id}`}>{text}</Link>
//         </span>
//       ),
//       sorter: (a, b) => (a.title || "").localeCompare(b.title || ""),
//     },
//     {
//       title: "SKU",
//       dataIndex: "sku",
//       render: (text) => <span className="badge badge-info">{text}</span>,
//       sorter: (a, b) => (a.sku || "").localeCompare(b.sku || ""),
//     },
//     {
//       title: "Barcode",
//       dataIndex: "barcode",
//       render: (text) => <span className="badge badge-secondary d-block mb-1">{text}</span>,
//       sorter: (a, b) => (a.barcode || "").localeCompare(b.barcode || ""),
//     },
//     {
//       title: "Article Profile",
//       dataIndex: "article_profile_name",
//       render: (text) => text || "N/A",
//       sorter: (a, b) => (a.article_profile_name || "").localeCompare(b.article_profile_name || ""),
//     },
//     {
//       title: "Warehouse",
//       dataIndex: "warehouse_name",
//       render: (text) => text || "N/A",
//       sorter: (a, b) => (a.warehouse_name || "").localeCompare(b.warehouse_name || ""),
//     },
//     {
//       title: "Location",
//       dataIndex: "location",
//       render: (text) => text || "N/A",
//       sorter: (a, b) => (a.location || "").localeCompare(b.location || ""),
//     },
//     {
//       title: "Quantity",
//       dataIndex: "count",
//       render: (text) => <span className="badge badge-primary">{text || 0}</span>,
//       sorter: (a, b) => (a.count || 0) - (b.count || 0),
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       render: (text) => (
//         <span
//           className={`badge ${
//             text === "new"
//               ? "badge-linesuccess"
//               : text === "used"
//               ? "badge-lineinfo"
//               : text === "repaired"
//               ? "badge-linewarning"
//               : text === "broken"
//               ? "badge-linedanger"
//               : "badge-secondary"
//           }`}
//         >
//           {text}
//         </span>
//       ),
//       sorter: (a, b) => (a.status || "").localeCompare(b.status || ""),
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
//         <div className="page-header">
//           <div className="add-item d-flex">
//             <div className="page-title">
//               <h4>Product List</h4>
//               <h6>Manage your products</h6>
//             </div>
//           </div>
//          <TableHeaderActions
//                                 onRefresh={fetchProducts}
//                                 pdfEndpoint="/auth/export/products/pdf"
//                                 excelEndpoint="/auth/export/products/excel"
//                                 filters={{
//                                     search: filters.search,
//                                     status: filters.status,
//                                     warehouse_id: filters.warehouse_id,
//                                     article_profile_id: filters.article_profile_id
                                   
//                                 }}
//                                 entityName="products"
//                                 dispatch={dispatch}
//                                 headerState={data}
//                                 headerAction={setToogleHeader}
//                                 showPrint={true}
//                             />
//           <div className="page-btn d-flex gap-2">
//             <button onClick={handleScanClick} className="btn btn-secondary">
//               <Camera className="me-2 iconsize" />
//               Scan Product
//             </button>
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
//                   <Link to="#" className="btn btn-searchset">
//                     <SearchIcon className="feather-search" />
//                   </Link>
//                 </div>
//               </div>
//               <div className="search-path">
//                 <Link
//                   className={`btn btn-filter ${isFilterVisible ? "setclose" : ""}`}>
//                   <Filter className="filter-icon" onClick={toggleFilterVisibility} />
//                   <span onClick={toggleFilterVisibility}>
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
//                   value={sortOptions.find((opt) => opt.value === `${filters.sortBy}:${filters.sortOrder}`)}
//                 />
//               </div>
//             </div>

//             {/* Filter Section */}
//              <div className={`card${isFilterVisible ? ' visible' : ''}`} id="filter_inputs" style={{ display: isFilterVisible ? 'block' : 'none' }}>
            
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
//                           options={[{ value: "", label: "All Article Profiles" }, ...articleProfiles]}
//                           placeholder="Choose Article Profile"
//                           onChange={(option) => handleFilterChange("article_profile_id", option?.value || "")}
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
//                         <a className="btn btn-filters ms-auto w-100" onClick={resetFilters}>
//                           Reset Filters
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
          

//             {/* Products Table with Pagination */}
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
//                 <Table columns={columns} dataSource={products} />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Scan Product Modal */}
//       <Modal show={showScanModal} onHide={() => setShowScanModal(false)} centered>
//         <Modal.Header>
//           <Modal.Title>Scan Product</Modal.Title>
//           <button type="button" className="btn-close" onClick={() => setShowScanModal(false)} disabled={scanning}>
//             <X />
//           </button>
//         </Modal.Header>
//         <Modal.Body>
//           <form onSubmit={handleScanSubmit}>
//             <div className="mb-3">
//               <label className="form-label">Enter Barcode or SKU</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={scanInput}
//                 onChange={(e) => setScanInput(e.target.value)}
//                 placeholder="Scan or type barcode/SKU"
//                 autoFocus
//                 disabled={scanning}
//               />
//               <small className="text-muted">Use a barcode scanner or manually enter the code</small>
//             </div>
//             <div className="d-flex gap-2">
//               <button 
//                 type="button" 
//                 className="btn btn-cancel flex-fill" 
//                 onClick={() => setShowScanModal(false)}
//                 disabled={scanning}
//               >
//                 Cancel
//               </button>
//               <button type="submit" className="btn btn-submit flex-fill" disabled={scanning}>
//                 {scanning ? (
//                   <>
//                     <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                     Searching...
//                   </>
//                 ) : (
//                   <>
//                     <SearchIcon className="me-2" size={16} />
//                     Find Product
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//         </Modal.Body>
//       </Modal>

//       {/* Edit Product Modal */}
//       <Modal show={showEditModal} onHide={handleCloseEditModal} size="xl" centered>
//         <Modal.Header>
//           <Modal.Title>Edit Product</Modal.Title>
//           <button type="button" className="btn-close" onClick={handleCloseEditModal} disabled={submitting}>
//             <X />
//           </button>
//         </Modal.Header>
//         <Modal.Body>
//           <form onSubmit={handleEditSubmit}>
//             <div className="card mb-0">
//               <div className="card-body add-product pb-0">
//                 <div className="accordion-card-one accordion" id="accordionExample">
//                   <div className="accordion-item">
//                     <div className="accordion-header" id="headingOne">
//                       <div className="accordion-button">
//                         <div className="addproduct-icon">
//                           <h5>
//                             <Info className="add-info" />
//                             <span>Product Information</span>
//                           </h5>
//                         </div>
//                       </div>
//                     </div>
//                     <div id="collapseOne" className="accordion-collapse collapse show">
//                       <div className="accordion-body">
//                         {/* Display Read-only SKU and Barcode */}
//                         {editingProduct && (
//                           <div className="row mb-3">
//                             <div className="col-lg-4">
//                               <div className="mb-3">
//                                 <label className="form-label">SKU (Read-only)</label>
//                                 <input
//                                   type="text"
//                                   className="form-control"
//                                   value={editingProduct.sku}
//                                   disabled
//                                   readOnly
//                                 />
//                               </div>
//                             </div>
//                             <div className="col-lg-4">
//                               <div className="mb-3">
//                                 <label className="form-label">Barcode (Read-only)</label>
//                                 <input
//                                   type="text"
//                                   className="form-control"
//                                   value={editingProduct.barcode}
//                                   disabled
//                                   readOnly
//                                 />
//                               </div>
//                             </div>
//                             <div className="col-lg-4">
//                               <div className="mb-3">
//                                 <label className="form-label">Barcode Image</label>
//                                 {editingProduct.barcode_image && (
//                                   <div className="border p-2 text-center">
//                                     <img
//                                       src={`${'http://localhost:5000'}${editingProduct.barcode_image}`}
//                                       alt="Barcode"
//                                       style={{ maxWidth: '100%', height: 'auto' }}
//                                     />
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         )}

//                         <div className="row">
//                           <div className="col-lg-4 col-sm-6 col-12">
//                             <div className="mb-3 add-product">
//                               <label className="form-label">
//                                 Article Profile <span className="text-danger">*</span>
//                               </label>
//                              <Select
//   options={articleProfiles}
//   value={editFormData.article_profile_id}
//   onChange={(option) =>
//     setEditFormData((prev) => ({
//       ...prev,
//       article_profile_id: option,
//     }))
//   }
//   placeholder="Select Article Profile"
// />


//                             </div>
//                           </div>
//                           <div className="col-lg-4 col-sm-6 col-12">
//                             <div className="mb-3 add-product">
//                               <label className="form-label">
//                                 Warehouse <span className="text-danger">*</span>
//                               </label>
                      

// <Select
//   options={warehouses}
//   value={editFormData.warehouse_id}
//   onChange={(option) =>
//     setEditFormData((prev) => ({
//       ...prev,
//       warehouse_id: option,
//     }))
//   }
//   placeholder="Select Warehouse"
// />



//                             </div>
//                           </div>
//                           <div className="col-lg-4 col-sm-6 col-12">
//                             <div className="mb-3 add-product">
//                               <label className="form-label">Location</label>
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 name="location"
//                                 value={editFormData.location}
//                                 onChange={handleEditInputChange}
//                                 placeholder="Enter location"
//                               />
//                             </div>
//                           </div>
//                         </div>

//                         <div className="row">
//                           <div className="col-lg-6 col-sm-6 col-12">
//                             <div className="mb-3 add-product">
//                               <label className="form-label">
//                                 Product Name <span className="text-danger">*</span>
//                               </label>
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 name="title"
//                                 value={editFormData.title}
//                                 onChange={handleEditInputChange}
//                                 placeholder="Enter product name"
//                               />
//                             </div>
//                           </div>
//                           <div className="col-lg-3 col-sm-6 col-12">
//                             <div className="mb-3 add-product">
//                               <label className="form-label">Quantity</label>
//                               <input
//                                 type="number"
//                                 className="form-control"
//                                 name="count"
//                                 value={editFormData.count}
//                                 onChange={handleEditInputChange}
//                                 placeholder="Enter quantity"
//                                 min="0"
//                               />
//                             </div>
//                           </div>
//                           <div className="col-lg-3 col-sm-6 col-12">
//                             <div className="mb-3 add-product">
//                               <label className="form-label">Status</label>
//                               <Select
//   className="select"
//   options={editStatusOptions}
//   placeholder="Choose Status"
//   value={editFormData.status}
//   onChange={(option) =>
//     setEditFormData((prev) => ({
//       ...prev,
//       status: option,
//     }))
//   }
// />

//                             </div>
//                           </div>
//                         </div>

//                         <div className="col-lg-12">
//                           <div className="input-blocks summer-description-box transfer mb-3">
//                             <label>Description</label>
//                             <textarea
//                               className="form-control h-100"
//                               rows={5}
//                               name="description"
//                               value={editFormData.description}
//                               onChange={handleEditInputChange}
//                               placeholder="Enter product description"
//                             />
//                             <p className="mt-1">Maximum 500 Characters</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="modal-footer-btn">
//               <button type="button" className="btn btn-cancel me-2" onClick={handleCloseEditModal} disabled={submitting}>
//                 Cancel
//               </button>
//               <button type="submit" className="btn btn-submit" disabled={submitting}>
//                 {submitting ? (
//                   <>
//                     <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                     Updating...
//                   </>
//                 ) : (
//                   "Update Product"
//                 )}
//               </button>
//             </div>
//           </form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default ProductList;







//WITH REDUX

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { all_routes } from "../../Router/all_routes";
import {
  Edit,
  Filter,
  PlusCircle,
  Sliders,
  Trash2,
  Info,
  X,
  Camera,
  Search as SearchIcon,
} from "feather-icons-react/build/IconComponents";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setToogleHeader } from "../../core/redux/action";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import AuthService from "../../services/authService";
import Table from "../../core/pagination/datatable";
import TableHeaderActions from "../tableheader";
import { 
  fetchProducts, 
  setFilters, 
  resetFilters,
  updateProduct,
  deleteProduct as deleteProductAction,
  scanProduct,
  clearScannedProduct
} from "../../core/redux/slices/productSlice";

const ProductList = () => {
  const route = all_routes;
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);

  // Redux state
  const { 
    product_list: products, 
    filters, 
    status: loadingStatus,
    
    scanStatus,
  
  } = useSelector((state) => state.products);
  
  const loading = loadingStatus === 'loading';
  const scanning = scanStatus === 'loading';

  // Redux data selector
  const data = useSelector((state) => state.toggle_header);

  // Local state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);
  const [scanInput, setScanInput] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [articleProfiles, setArticleProfiles] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Edit form state
  const [editFormData, setEditFormData] = useState({
    title: "",
    article_profile_id: null,
    warehouse_id: null,
    location: "",
    count: "",
    status: null,
    description: "",
  });

  // Fetch current user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await AuthService.getCurrentUser();
        setCurrentUser(response.data);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };
    fetchCurrentUser();
  }, []);

  // Fetch initial data
  useEffect(() => {
    dispatch(fetchProducts(filters));
    fetchFilterOptions();
     // eslint-disable-next-line
  }, []);

  // Update editFormData once warehouses or articleProfiles are loaded
  useEffect(() => {
    if (editingProduct && warehouses.length && articleProfiles.length) {
      const selectedWarehouse = warehouses.find(
        (w) => w.value === editingProduct.warehouse_id
      );
      const selectedArticleProfile = articleProfiles.find(
        (a) => a.value === editingProduct.article_profile_id
      );

      setEditFormData((prev) => ({
        ...prev,
        warehouse_id: selectedWarehouse || null,
        article_profile_id: selectedArticleProfile || null,
      }));
    }
  }, [warehouses, articleProfiles, editingProduct]);

  // Fetch filter options
  const fetchFilterOptions = async () => {
    try {
      const [warehousesRes, articleProfilesRes] = await Promise.all([
        AuthService.getWarehouse(),
        AuthService.getArticleProfile(),
      ]);

      setWarehouses(
        (warehousesRes.data.data || warehousesRes.data || []).map((item) => ({
          value: item.id,
          label: item.name || item.title,
        }))
      );

      setArticleProfiles(
        (articleProfilesRes.data.data || articleProfilesRes.data || []).map((item) => ({
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
    dispatch(setFilters({ [name]: value }));
  };

  // Debounced search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(fetchProducts(filters));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
     // eslint-disable-next-line
  }, [filters.search, dispatch]);

  // Fetch products when other filters change
  useEffect(() => {
    dispatch(fetchProducts(filters));
     // eslint-disable-next-line
  }, [filters.status, filters.warehouse_id, filters.article_profile_id, filters.sortBy, filters.sortOrder, dispatch]);

  const handleSearch = (e) => {
    const value = e.target.value;
    dispatch(setFilters({ search: value }));
  };

  // SCAN FUNCTIONALITY
  const handleScanClick = () => {
    setScanInput("");
    setShowScanModal(true);
  };

  const handleScanSubmit = async (e) => {
    e.preventDefault();
    
    if (!scanInput.trim()) {
      MySwal.fire({
        icon: "warning",
        title: "Empty Input",
        text: "Please enter a barcode or SKU",
        timer: 2000,
      });
      return;
    }

    try {
      const product = await dispatch(scanProduct(scanInput.trim())).unwrap();
      
      // Show product details
      MySwal.fire({
        title: `<strong>${product.title}</strong>`,
        html: `
          <div style="text-align: left;">
            <p><strong>SKU:</strong> ${product.sku}</p>
            <p><strong>Barcode:</strong> ${product.barcode}</p>
            <p><strong>Article Profile:</strong> ${product.article_profile_name || 'N/A'}</p>
            <p><strong>Warehouse:</strong> ${product.warehouse_name || 'N/A'}</p>
            <p><strong>Location:</strong> ${product.location || 'N/A'}</p>
            <p><strong>Quantity:</strong> ${product.count || 0}</p>
            <p><strong>Status:</strong> <span class="badge badge-${product.status === 'new' ? 'success' : 'info'}">${product.status}</span></p>
            ${product.description ? `<p><strong>Description:</strong> ${product.description}</p>` : ''}
          </div>
        `,
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Edit Product",
        cancelButtonText: "Close",
      }).then((result) => {
        if (result.isConfirmed) {
          handleEditClick(product.id);
        }
      });
      
      setShowScanModal(false);
      dispatch(clearScannedProduct());
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Product Not Found",
        text: "No product found with this barcode or SKU",
        timer: 3000,
      });
    }
  };

  // Open Edit Modal
  const handleEditClick = async (productId) => {
    try {
      const response = await AuthService.getProductById(productId);
      const product = response.data.data;

      const selectedWarehouse = Array.isArray(warehouses)
        ? warehouses.find((w) => w.value === product.warehouse_id)
        : null;

      const selectedArticleProfile = Array.isArray(articleProfiles)
        ? articleProfiles.find((a) => a.value === product.article_profile_id)
        : null;

      const selectedStatus = editStatusOptions.find(
        (s) => s.value === product.status
      );

      setEditingProduct(product);
      setEditFormData({
        title: product.title || "",
        article_profile_id: selectedArticleProfile || null,
        warehouse_id: selectedWarehouse || null,
        location: product.location || "",
        count: product.count || "",
        status: selectedStatus || null,
        description: product.description || "",
      });

      setShowEditModal(true);
    } catch (error) {
      console.error("Error fetching product:", error);
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load product details",
        timer: 2000,
      });
    }
  };

  // Close Edit Modal
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingProduct(null);
    setEditFormData({
      title: "",
      article_profile_id: null,
      warehouse_id: null,
      location: "",
      count: "",
      status: null,
      description: "",
    });
  };

  // Handle Edit Form Input Changes
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Edit Form Submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!editFormData.title) {
      MySwal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Product name is required",
        timer: 2000,
      });
      return;
    }

    if (!editFormData.article_profile_id?.value) {
      MySwal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Article profile is required",
        timer: 2000,
      });
      return;
    }

    if (!editFormData.warehouse_id?.value) {
      MySwal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Warehouse is required",
        timer: 2000,
      });
      return;
    }

    try {
      setSubmitting(true);

      const dataToSubmit = {
        title: editFormData.title,
        article_profile_id: editFormData.article_profile_id.value,
        warehouse_id: editFormData.warehouse_id.value,
        location: editFormData.location,
        count: parseInt(editFormData.count) || 0,
        status: editFormData.status?.value || "new",
        description: editFormData.description,
        last_updated_by: currentUser?.id || 1,
      };

      await dispatch(updateProduct({ 
        id: editingProduct.id, 
        data: dataToSubmit 
      })).unwrap();

      MySwal.fire({
        icon: "success",
        title: "Success!",
        text: "Product updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });

      handleCloseEditModal();
      dispatch(fetchProducts(filters));
    } catch (error) {
      console.error("Error updating product:", error);
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: error || "Failed to update product",
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
          await dispatch(deleteProductAction(id)).unwrap();
          MySwal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Product has been deleted.",
            timer: 2000,
            showConfirmButton: false,
          });
          dispatch(fetchProducts(filters));
        } catch (error) {
          console.error("Error deleting product:", error);
          MySwal.fire({
            icon: "error",
            title: "Error",
            text: error || "Failed to delete product",
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
    dispatch(fetchProducts(filters));
  };

  const sortOptions = [
    { value: "created_at:DESC", label: "Newest First" },
    { value: "created_at:ASC", label: "Oldest First" },
    { value: "title:ASC", label: "Name A-Z" },
    { value: "title:DESC", label: "Name Z-A" },
    { value: "count:ASC", label: "Quantity Low to High" },
    { value: "count:DESC", label: "Quantity High to Low" },
  ];

  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "new", label: "New" },
    { value: "used", label: "Used" },
    { value: "repaired", label: "Repaired" },
    { value: "broken", label: "Broken" },
    { value: "installed", label: "Installed" },
  ];

  const editStatusOptions = [
    { value: "new", label: "New" },
    { value: "used", label: "Used" },
    { value: "repaired", label: "Repaired" },
    { value: "broken", label: "Broken" },
    { value: "installed", label: "Installed" },
  ];

  // TABLE COLUMNS
  const columns = [
    {
      title: "Product",
      dataIndex: "title",
      render: (text, record) => (
        <span className="productimgname">
          <Link to={`${route.productdetails}/${record.id}`}>{text}</Link>
        </span>
      ),
      sorter: (a, b) => (a.title || "").localeCompare(b.title || ""),
    },
    {
      title: "SKU",
      dataIndex: "sku",
      render: (text) => <span className="badge badge-info">{text}</span>,
      sorter: (a, b) => (a.sku || "").localeCompare(b.sku || ""),
    },
    {
      title: "Barcode",
      dataIndex: "barcode",
      render: (text) => <span className="badge badge-secondary d-block mb-1">{text}</span>,
      sorter: (a, b) => (a.barcode || "").localeCompare(b.barcode || ""),
    },
    {
      title: "Article Profile",
      dataIndex: "article_profile_name",
      render: (text) => text || "N/A",
      sorter: (a, b) => (a.article_profile_name || "").localeCompare(b.article_profile_name || ""),
    },
    {
      title: "Warehouse",
      dataIndex: "warehouse_name",
      render: (text) => text || "N/A",
      sorter: (a, b) => (a.warehouse_name || "").localeCompare(b.warehouse_name || ""),
    },
    {
      title: "Location",
      dataIndex: "location",
      render: (text) => text || "N/A",
      sorter: (a, b) => (a.location || "").localeCompare(b.location || ""),
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
      sorter: (a, b) => (a.status || "").localeCompare(b.status || ""),
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
          <TableHeaderActions
            onRefresh={() => dispatch(fetchProducts(filters))}
            pdfEndpoint="/auth/export/products/pdf"
            excelEndpoint="/auth/export/products/excel"
            filters={{
              search: filters.search,
              status: filters.status,
              warehouse_id: filters.warehouse_id,
              article_profile_id: filters.article_profile_id
            }}
            entityName="products"
            dispatch={dispatch}
            headerState={data}
            headerAction={setToogleHeader}
            showPrint={true}
          />
          <div className="page-btn d-flex gap-2">
            <button onClick={handleScanClick} className="btn btn-secondary">
              <Camera className="me-2 iconsize" />
              Scan Product
            </button>
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
                    <SearchIcon className="feather-search" />
                  </Link>
                </div>
              </div>
              <div className="search-path">
                <Link
                  className={`btn btn-filter ${isFilterVisible ? "setclose" : ""}`}>
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
                  placeholder="Sort By"
                  onChange={handleSortChange}
                  value={sortOptions.find((opt) => opt.value === `${filters.sortBy}:${filters.sortOrder}`)}
                />
              </div>
            </div>

            {/* Filter Section */}
            <div className={`card${isFilterVisible ? ' visible' : ''}`} id="filter_inputs" style={{ display: isFilterVisible ? 'block' : 'none' }}>
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
                        options={[{ value: "", label: "All Article Profiles" }, ...articleProfiles]}
                        placeholder="Choose Article Profile"
                        onChange={(option) => handleFilterChange("article_profile_id", option?.value || "")}
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
                      <a className="btn btn-filters ms-auto w-100" onClick={resetFiltersHandler}>
                        Reset Filters
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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

      {/* Scan Product Modal */}
      <Modal show={showScanModal} onHide={() => setShowScanModal(false)} centered>
        <Modal.Header>
          <Modal.Title>Scan Product</Modal.Title>
          <button type="button" className="btn-close" onClick={() => setShowScanModal(false)} disabled={scanning}>
            <X />
          </button>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleScanSubmit}>
            <div className="mb-3">
              <label className="form-label">Enter Barcode or SKU</label>
              <input
                type="text"
                className="form-control"
                value={scanInput}
                onChange={(e) => setScanInput(e.target.value)}
                placeholder="Scan or type barcode/SKU"
                autoFocus
                disabled={scanning}
              />
              <small className="text-muted">Use a barcode scanner or manually enter the code</small>
            </div>
            <div className="d-flex gap-2">
              <button 
                type="button" 
                className="btn btn-cancel flex-fill" 
                onClick={() => setShowScanModal(false)}
                disabled={scanning}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-submit flex-fill" disabled={scanning}>
                {scanning ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Searching...
                  </>
                ) : (
                  <>
                    <SearchIcon className="me-2" size={16} />
                    Find Product
                  </>
                )}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Edit Product Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} size="xl" centered>
        <Modal.Header>
          <Modal.Title>Edit Product</Modal.Title>
          <button type="button" className="btn-close" onClick={handleCloseEditModal} disabled={submitting}>
            <X />
          </button>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleEditSubmit}>
            <div className="card mb-0">
              <div className="card-body add-product pb-0">
                <div className="accordion-card-one accordion" id="accordionExample">
                  <div className="accordion-item">
                    <div className="accordion-header" id="headingOne">
                      <div className="accordion-button">
                        <div className="addproduct-icon">
                          <h5>
                            <Info className="add-info" />
                            <span>Product Information</span>
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div id="collapseOne" className="accordion-collapse collapse show">
                      <div className="accordion-body">
                        {/* Display Read-only SKU and Barcode */}
                        {editingProduct && (
                          <div className="row mb-3">
                            <div className="col-lg-4">
                              <div className="mb-3">
                                <label className="form-label">SKU (Read-only)</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={editingProduct.sku}
                                  disabled
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="mb-3">
                                <label className="form-label">Barcode (Read-only)</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={editingProduct.barcode}
                                  disabled
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="mb-3">
                                <label className="form-label">Barcode Image</label>
                                {editingProduct.barcode_image && (
                                  <div className="border p-2 text-center">
                                    <img
                                      src={`http://localhost:5000${editingProduct.barcode_image}`}
                                      alt="Barcode"
                                      style={{ maxWidth: '100%', height: 'auto' }}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="row">
                          <div className="col-lg-4 col-sm-6 col-12">
                            <div className="mb-3 add-product">
                              <label className="form-label">
                                Article Profile <span className="text-danger">*</span>
                              </label>
                              <Select
                                options={articleProfiles}
                                value={editFormData.article_profile_id}
                                onChange={(option) =>
                                  setEditFormData((prev) => ({
                                    ...prev,
                                    article_profile_id: option,
                                  }))
                                }
                                placeholder="Select Article Profile"
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-sm-6 col-12">
                            <div className="mb-3 add-product">
                              <label className="form-label">
                                Warehouse <span className="text-danger">*</span>
                              </label>
                              <Select
                                options={warehouses}
                                value={editFormData.warehouse_id}
                                onChange={(option) =>
                                  setEditFormData((prev) => ({
                                    ...prev,
                                    warehouse_id: option,
                                  }))
                                }
                                placeholder="Select Warehouse"
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-sm-6 col-12">
                            <div className="mb-3 add-product">
                              <label className="form-label">Location</label>
                              <input
                                type="text"
                                className="form-control"
                                name="location"
                                value={editFormData.location}
                                onChange={handleEditInputChange}
                                placeholder="Enter location"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-6 col-sm-6 col-12">
                            <div className="mb-3 add-product">
<label className="form-label">
Product Name <span className="text-danger">*</span>
</label>
<input
                             type="text"
                             className="form-control"
                             name="title"
                             value={editFormData.title}
                             onChange={handleEditInputChange}
                             placeholder="Enter product name"
                           />
</div>
</div>
<div className="col-lg-3 col-sm-6 col-12">
<div className="mb-3 add-product">
<label className="form-label">Quantity</label>
<input
                             type="number"
                             className="form-control"
                             name="count"
                             value={editFormData.count}
                             onChange={handleEditInputChange}
                             placeholder="Enter quantity"
                             min="0"
                           />
</div>
</div>
<div className="col-lg-3 col-sm-6 col-12">
<div className="mb-3 add-product">
<label className="form-label">Status</label>
<Select
className="select"
options={editStatusOptions}
placeholder="Choose Status"
value={editFormData.status}
onChange={(option) =>
setEditFormData((prev) => ({
...prev,
status: option,
}))
}
/>
</div>
</div>
</div>
<div className="col-lg-12">
                      <div className="input-blocks summer-description-box transfer mb-3">
                        <label>Description</label>
                        <textarea
                          className="form-control h-100"
                          rows={5}
                          name="description"
                          value={editFormData.description}
                          onChange={handleEditInputChange}
                          placeholder="Enter product description"
                        />
                        <p className="mt-1">Maximum 500 Characters</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer-btn">
          <button type="button" className="btn btn-cancel me-2" onClick={handleCloseEditModal} disabled={submitting}>
            Cancel
          </button>
          <button type="submit" className="btn btn-submit" disabled={submitting}>
            {submitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Updating...
              </>
            ) : (
              "Update Product"
            )}
          </button>
        </div>
      </form>
    </Modal.Body>
  </Modal>
</div>
  )
}

export default ProductList;