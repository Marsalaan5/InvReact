
// import React, { useState, useEffect, useCallback } from "react";
// import { Link } from "react-router-dom";
// import { Filter, Sliders, Plus, X } from "react-feather";
// import { PlusCircle } from "feather-icons-react/build/IconComponents";
// import Select from "react-select";
// import Swal from "sweetalert2";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useDispatch, useSelector } from "react-redux";
// import { debounce } from "lodash";
// import ImageWithBasePath from "../../core/img/imagewithbasebath";
// import TableHeaderActions from "../tableheader";
// import { setToogleHeader } from "../../core/redux/action";
// import {
//   fetchArticles,
//   fetchArticleById,
//   createArticle,
//   updateArticle,
//   deleteArticle,
//   setFilters,
//   clearCurrentArticle,
//   clearError,
// } from '../../core/redux/slices/articleSlice';
// import AuthService from "../../services/authService";
// import { usePermissions } from "../../hooks/usePermission"; 

// const ArticleProfile = () => {
//   const dispatch = useDispatch();
  
//   const { hasPermission } = usePermissions();
  
//   // Redux state
//   const { 
//     article_list, 
//     currentArticle,
//     status, 
//     filters,
//     error 
//   } = useSelector((state) => state.articles);
  
//   const headerState = useSelector((state) => state.toggle_header);

//   // Local state
//   const [isFilterVisible, setIsFilterVisible] = useState(false);
//   const [glossaries, setGlossaries] = useState([]);
//   const [attributes, setAttributes] = useState([{ glossary_id: "", value: "" }]);
//   const [formData, setFormData] = useState({
//     title: "",
//     category: "",
//     brand: "",
//     model: "",
//     year: new Date(),
//     sku: "",
//     weight: "",
//     dimensions: "",
//     unit_: "piece",
//     description: "",
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [selectedIds, setSelectedIds] = useState([]);
//   const [glossaryAttributes, setGlossaryAttributes] = useState({});

//   useEffect(() => {
//     handleRefresh();
//     fetchGlossaries();
//   }, []);

  
//   useEffect(() => {
//     if (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: error,
//         timer: 2000,
//       });
//       dispatch(clearError());
//     }
//   }, [error, dispatch]);


//   useEffect(() => {
//     if (currentArticle) {
//       const parsedGlossaries = currentArticle.glossary_ids
//         ? JSON.parse(currentArticle.glossary_ids)
//         : [];

//       setFormData({
//         title: currentArticle.title || "",
//         category: currentArticle.category || "",
//         brand: currentArticle.brand || "",
//         model: currentArticle.model || "",
//         year: currentArticle.year ? new Date(currentArticle.year, 0) : new Date(),
//         sku: currentArticle.sku || "",
//         weight: currentArticle.weight || "",
//         dimensions: currentArticle.dimensions
//           ? JSON.parse(currentArticle.dimensions)
//           : "",
//         unit_: currentArticle.unit_ || "piece",
//         description: currentArticle.description || "",
//       });

//       if (Array.isArray(parsedGlossaries) && parsedGlossaries.length > 0) {
//         setAttributes(
//           parsedGlossaries.map((g) => ({
//             glossary_id: g.glossary_id || "",
//             value: g.value || "",
//           }))
//         );

//         parsedGlossaries.forEach((g) => {
//           if (g.glossary_id && !glossaryAttributes[g.glossary_id]) {
//             fetchGlossaryAttributes(g.glossary_id);
//           }
//         });
//       } else {
//         setAttributes([{ glossary_id: "", value: "" }]);
//       }
//     }
//   }, [currentArticle]);

//   const handleRefresh = () => {
//     dispatch(fetchArticles(filters));
//   };

//   const fetchGlossaries = async () => {
//     try {
//       const response = await AuthService.getGlossaries();
//       setGlossaries(response.data.glossaries || []);
//     } catch (error) {
//       console.error("Error fetching glossaries:", error);
//     }
//   };

//   const fetchGlossaryAttributes = async (glossaryId) => {
//     try {
//       const response = await AuthService.getGlossaryAttributes(glossaryId);
//       setGlossaryAttributes((prev) => ({
//         ...prev,
//         [glossaryId]: response.data.attributes || [],
//       }));
//     } catch (error) {
//       console.error("Error fetching glossary attributes:", error);
//     }
//   };

//   // Debounced search function
//   const debouncedSearch = useCallback(
//     debounce((searchValue) => {
//       dispatch(setFilters({ search: searchValue }));
//       dispatch(fetchArticles({ ...filters, search: searchValue }));
//     }, 500),
//     [dispatch, filters]
//   );

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     dispatch(setFilters({ search: value }));
//     debouncedSearch(value);
//   };

//   const handleSearch = () => {
//     handleRefresh();
//   };

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleYearChange = (date) => {
//     setFormData({ ...formData, year: date });
//   };

//   const addAttribute = () => {
//     setAttributes([...attributes, { glossary_id: "", value: "" }]);
//   };

//   const removeAttribute = (index) => {
//     const newAttributes = attributes.filter((_, i) => i !== index);
//     setAttributes(newAttributes);
//   };

//   const handleAttributeGlossaryChange = (index, selectedOption) => {
//     const newAttributes = [...attributes];
//     newAttributes[index].glossary_id = selectedOption?.value || "";
//     newAttributes[index].value = "";
//     setAttributes(newAttributes);

//     if (selectedOption?.value && !glossaryAttributes[selectedOption.value]) {
//       fetchGlossaryAttributes(selectedOption.value);
//     }
//   };

//   const handleAttributeValueChange = (index, selectedOption) => {
//     const newAttributes = [...attributes];
//     newAttributes[index].value = selectedOption?.value || "";
//     setAttributes(newAttributes);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const submitData = {
//         ...formData,
//         year: formData.year.getFullYear().toString(),
//         glossary_ids: JSON.stringify(
//           attributes
//             .filter((attr) => attr.glossary_id && attr.value)
//             .map((attr) => ({
//               glossary_id: attr.glossary_id,
//               value: attr.value,
//             }))
//         ),
//         dimensions: formData.dimensions
//           ? JSON.stringify(formData.dimensions)
//           : null,
//       };

//       if (editingId) {
//         await dispatch(updateArticle({ id: editingId, data: submitData })).unwrap();
//         Swal.fire({
//           icon: "success",
//           title: "Success",
//           text: "Article updated successfully",
//           timer: 2000,
//           showConfirmButton: false,
//         });
//       } else {
//         await dispatch(createArticle(submitData)).unwrap();
//         Swal.fire({
//           icon: "success",
//           title: "Success",
//           text: "Article created successfully",
//           timer: 2000,
//           showConfirmButton: false,
//         });
//       }

//       closeModal(editingId ? "edit-units" : "add-units");
//       resetForm();
//     } catch (error) {
//       console.error("Error saving article:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: error || "Failed to save article",
//         timer: 3000,
//       });
//     }
//   };

//   const closeModal = (modalId) => {
//     const modal = document.getElementById(modalId);
//     const backdrop = document.querySelector(".modal-backdrop");

//     if (modal) {
//       modal.classList.remove("show");
//       modal.style.display = "none";
//       document.body.classList.remove("modal-open");
//       document.body.style.removeProperty("overflow");
//       document.body.style.removeProperty("padding-right");
//     }

//     if (backdrop) {
//       backdrop.remove();
//     }
//   };

//   const handleEdit = async (id) => {
//     try {
//       await dispatch(fetchArticleById(id)).unwrap();
//       setEditingId(id);
//     } catch (error) {
//       console.error("Error fetching article:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to fetch article details",
//         timer: 2000,
//       });
//     }
//   };

//   const handleDelete = async (id) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "Cancel",
//     });

//     if (result.isConfirmed) {
//       try {
//         await dispatch(deleteArticle(id)).unwrap();
//         Swal.fire({
//           icon: "success",
//           title: "Deleted!",
//           text: "Article has been deleted.",
//           timer: 2000,
//           showConfirmButton: false,
//         });
//       } catch (error) {
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: error || "Failed to delete article",
//           timer: 3000,
//         });
//       }
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       title: "",
//       category: "",
//       brand: "",
//       model: "",
//       year: new Date(),
//       sku: "",
//       weight: "",
//       dimensions: "",
//       unit_: "piece",
//       description: "",
//     });
//     setAttributes([{ glossary_id: "", value: "" }]);
//     setEditingId(null);
//     dispatch(clearCurrentArticle());
//   };

//   const toggleFilterVisibility = () => {
//     setIsFilterVisible(!isFilterVisible);
//   };

//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       setSelectedIds(article_list.map((a) => a.id));
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
//     { value: "created_at_desc", label: "Sort by Date (Newest)" },
//     { value: "created_at_asc", label: "Sort by Date (Oldest)" },
//     { value: "title_asc", label: "Sort by Title (A-Z)" },
//     { value: "title_desc", label: "Sort by Title (Z-A)" },
//   ];

//   const unitOptions = [
//     { value: "piece", label: "Piece" },
//     { value: "gram", label: "Gram" },
//     { value: "kilogram", label: "Kilogram" },
//     { value: "metre", label: "Metre" },
//     { value: "litre", label: "Litre" },
//   ];

//   const glossaryOptions = glossaries.map((g) => ({
//     label: g.name,
//     value: g.id,
//   }));

//   return (
//     <div className="page-wrapper">
//       <div className="content">
//         <div className="page-header">
//           <div className="add-item d-flex">
//             <div className="page-title">
//               <h4>Article Profile</h4>
//               <h6>Manage Your Article Profiles</h6>
//             </div>
//           </div>
//           <TableHeaderActions
//             onRefresh={handleRefresh}
//             pdfEndpoint="/auth/export/articles/pdf"
//             excelEndpoint="/auth/export/articles/excel"
//             entityName="articles"
//             dispatch={dispatch}
//             headerState={headerState}
//             headerAction={setToogleHeader}
//             showPrint={true}
//           />
//           {hasPermission("Article Profile", "create") && (
//             <div className="page-btn">
//               <a
//                 href="#"
//                 className="btn btn-added"
//                 data-bs-toggle="modal"
//                 data-bs-target="#add-units"
//                 onClick={resetForm}
//               >
//                 <PlusCircle className="me-2" /> Add New Article
//               </a>
//             </div>
//           )}
//         </div>

//         <div className="card table-list-card">
//           <div className="card-body">
//             <div className="table-top">
//               <div className="search-set">
//                 <div className="search-input">
//                   <input
//                     type="text"
//                     placeholder="Search"
//                     className="form-control form-control-sm formsearch"
//                     value={filters.search}
//                     onChange={handleSearchChange}
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
//                   className="select"
//                   options={sortOptions}
//                   placeholder="Sort by Date"
//                   onChange={(option) => {
//                     dispatch(setFilters({ sortBy: option?.value }));
//                     setTimeout(handleRefresh, 100);
//                   }}
//                 />
//               </div>
//             </div>

//             <div className="table-responsive">
//               {status === "loading" ? (
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
//                             checked={
//                               selectedIds.length === article_list.length &&
//                               article_list.length > 0
//                             }
//                             onChange={handleSelectAll}
//                           />
//                           <span className="checkmarks" />
//                         </label>
//                       </th>
//                       <th>Title</th>
//                       <th>Category</th>
//                       <th>Brand</th>
//                       <th>Model</th>
//                       <th>Year</th>
//                       <th>SKU</th>
//                       <th>Attributes</th>
//                       <th>Weight</th>
//                       <th>Unit</th>
//                       <th>Description</th>
//                       <th>Created On</th>
//                       {hasPermission("Article Profile", "view") && (
//                         <th className="no-sort">Action</th>
//                       )}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {article_list.length === 0 ? (
//                       <tr>
//                         <td colSpan="13" className="text-center">
//                           No articles found
//                         </td>
//                       </tr>
//                     ) : (
//                       article_list.map((article) => {
//                         const parsedAttributes = article.glossary_ids
//                           ? JSON.parse(article.glossary_ids)
//                           : [];
//                         return (
//                           <tr key={article.id}>
//                             <td>
//                               <label className="checkboxs">
//                                 <input
//                                   type="checkbox"
//                                   checked={selectedIds.includes(article.id)}
//                                   onChange={() => handleSelectOne(article.id)}
//                                 />
//                                 <span className="checkmarks" />
//                               </label>
//                             </td>
//                             <td>{article.title}</td>
//                             <td>{article.category || "N/A"}</td>
//                             <td>{article.brand || "N/A"}</td>
//                             <td>{article.model || "N/A"}</td>
//                             <td>{article.manufacturing_year || "N/A"}</td>
//                             <td>{article.sku || "N/A"}</td>
//                             <td>
//                               {Array.isArray(parsedAttributes)
//                                 ? parsedAttributes.length
//                                 : 0}{" "}
//                               attributes
//                             </td>
//                             <td>{article.weight || "N/A"}</td>
//                             <td>
//                               <span className="badge badge-linesuccess">
//                                 {article.unit}
//                               </span>
//                             </td>
//                             <td
//                               style={{
//                                 maxWidth: "200px",
//                                 whiteSpace: "nowrap",
//                                 overflow: "hidden",
//                                 textOverflow: "ellipsis",
//                               }}
//                             >
//                               <span title={article.description || "N/A"}>
//                                 {article.description || "N/A"}
//                               </span>
//                             </td>
//                             <td>
//                               {new Date(article.created_at).toLocaleDateString()}
//                             </td>
//                             {hasPermission("Article Profile", "view") && (
//                               <td className="action-table-data">
//                                 <div className="edit-delete-action">
//                                   <Link
//                                     className="me-2 edit-icon p-2"
//                                     to="#"
//                                     onClick={() => handleEdit(article.id)}
//                                     data-bs-toggle="modal"
//                                     data-bs-target="#edit-units"
//                                   >
//                                     <i data-feather="eye" className="feather-eye" />
//                                   </Link>
//                                   {hasPermission("Article Profile", "update") && (
//                                     <Link
//                                       className="me-2 p-2"
//                                       to="#"
//                                       onClick={() => handleEdit(article.id)}
//                                       data-bs-toggle="modal"
//                                       data-bs-target="#edit-units"
//                                     >
//                                       <i
//                                         data-feather="edit"
//                                         className="feather-edit"
//                                       />
//                                     </Link>
//                                   )}
//                                   {hasPermission("Article Profile", "delete") && (
//                                     <Link
//                                       className="confirm-text p-2"
//                                       to="#"
//                                       onClick={() => handleDelete(article.id)}
//                                     >
//                                       <i
//                                         data-feather="trash-2"
//                                         className="feather-trash-2"
//                                       />
//                                     </Link>
//                                   )}
//                                 </div>
//                               </td>
//                             )}
//                           </tr>
//                         );
//                       })
//                     )}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Add/Edit Modal */}
//       {["add-units", "edit-units"].map((modalId) => (
//         <div className="modal fade" id={modalId} key={modalId}>
//           <div className="modal-dialog modal-dialog-centered modal-lg">
//             <div className="modal-content">
//               <div className="page-wrapper-new p-0">
//                 <div className="content">
//                   <div className="modal-header border-0 custom-modal-header">
//                     <div className="page-title">
//                       <h4>{editingId ? "Edit" : "Add"} Article</h4>
//                     </div>
//                     <button
//                       type="button"
//                       className="close"
//                       data-bs-dismiss="modal"
//                       aria-label="Close"
//                       onClick={resetForm}
//                     >
//                       <span aria-hidden="true">×</span>
//                     </button>
//                   </div>
//                   <div className="modal-body custom-modal-body">
//                     <form onSubmit={handleSubmit}>
//                       <div className="modal-title-head">
//                         <h6>
//                           <span>
//                             <i data-feather="info" className="feather-edit" />
//                           </span>
//                           Article Info
//                         </h6>
//                       </div>
//                       <div className="row">
//                         <div className="col-lg-6">
//                           <div className="mb-3">
//                             <label className="form-label">Title *</label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               name="title"
//                               value={formData.title}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-6">
//                           <div className="mb-3">
//                             <label className="form-label">Category *</label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               name="category"
//                               value={formData.category}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-6">
//                           <div className="mb-3">
//                             <label className="form-label">Brand *</label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               name="brand"
//                               value={formData.brand}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-3">
//                           <div className="mb-3">
//                             <label className="form-label">Model *</label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               name="model"
//                               value={formData.model}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-3">
//                           <div className="mb-3">
//                             <label className="form-label">Year *  </label> 
//                             <DatePicker
//                               selected={formData.year}
//                               onChange={handleYearChange}
//                               showYearPicker
//                               dateFormat="yyyy"
//                               className="form-control"
//                               required
//                             />
//                           </div>
//                         </div>
                      
//                         <div className="col-lg-12">
//                           <div className="mb-3">
//                             <label className="form-label">
//                               Attributes
//                               <button
//                                 type="button"
//                                 className="btn btn-sm btn-primary ms-2"
//                                 onClick={addAttribute}
//                               >
//                                 <Plus size={16} /> Add Attribute
//                               </button>
//                             </label>
//                             {attributes.map((attr, index) => (
//                               <div
//                                 key={index}
//                                 className="row align-items-end mb-2"
//                               >
//                                 <div className="col-5">
//                                   <Select
//                                     className="select"
//                                     options={glossaryOptions}
//                                     value={glossaryOptions.find(
//                                       (g) => g.value === attr.glossary_id
//                                     )}
//                                     onChange={(option) =>
//                                       handleAttributeGlossaryChange(index, option)
//                                     }
//                                     placeholder="Select Attribute"
//                                     isClearable
//                                   />
//                                 </div>
//                                 <div className="col-5">
//                                   {attr.glossary_id &&
//                                   glossaryAttributes[attr.glossary_id] ? (
//                                     <Select
//                                       className="select"
//                                       options={glossaryAttributes[
//                                         attr.glossary_id
//                                       ].map((a) => ({
//                                         label: a.value || a.name,
//                                         value: a.value || a.name,
//                                       }))}
//                                       value={
//                                         attr.value
//                                           ? {
//                                               label: attr.value,
//                                               value: attr.value,
//                                             }
//                                           : null
//                                       }
//                                       onChange={(option) =>
//                                         handleAttributeValueChange(index, option)
//                                       }
//                                       placeholder="Select Value"
//                                       isClearable
//                                     />
//                                   ) : (
//                                     <input
//                                       type="text"
//                                       className="form-control"
//                                       placeholder="Enter value"
//                                       value={attr.value}
//                                       onChange={(e) => {
//                                         const newAttributes = [...attributes];
//                                         newAttributes[index].value =
//                                           e.target.value;
//                                         setAttributes(newAttributes);
//                                       }}
//                                       disabled={!attr.glossary_id}
//                                     />
//                                   )}
//                                 </div>
//                                 <div className="col-2">
//                                   {index > 0 && (
//                                     <button
//                                       type="button"
//                                       className="btn btn-sm btn-danger"
//                                       onClick={() => removeAttribute(index)}
//                                     >
//                                       <X size={16} />
//                                     </button>
//                                   )}
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         <div className="col-lg-6">
//                           <div className="mb-3">
//                             <label className="form-label">Weight</label>
//                             <input
//                               type="number"
//                               className="form-control"
//                               name="weight"
//                               value={formData.weight}
//                               onChange={handleInputChange}
//                               step="0.01"
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-6">
//                           <div className="input-blocks">
//                             <label>Unit *</label>
//                             <Select
//                               className="select"
//                               options={unitOptions}
//                               value={unitOptions.find(
//                                 (u) => u.value === formData.unit_
//                               )}
//                               onChange={(option) =>
//                                 setFormData({
//                                   ...formData,
//                                   unit_: option?.value || "piece",
//                                 })
//                               }
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-12">
//                           <div className="mb-3">
//                             <label className="form-label">Dimensions</label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               name="dimensions"
//                               value={formData.dimensions}
//                               onChange={handleInputChange}
//                               placeholder="e.g., 10x20x30 cm"
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-12">
//                           <div className="mb-3">
//                             <label className="form-label">Description</label>
//                             <textarea
//                               className="form-control"
//                               name="description"
//                               value={formData.description}
//                               onChange={handleInputChange}
//                               rows="3"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="modal-footer-btn">
//                         <button
//                           type="button"
//                           className="btn btn-cancel me-2"
//                           data-bs-dismiss="modal"
//                           onClick={resetForm}
//                         >
//                           Cancel
//                         </button>
//                         <button type="submit" className="btn btn-submit">
//                           {editingId ? "Save Changes" : "Create Article"}
//                         </button>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ArticleProfile;


// import React, { useState, useEffect, useCallback } from "react";
// import { Link } from "react-router-dom";
// import { Filter, Sliders, Plus, X } from "react-feather";
// import { PlusCircle } from "feather-icons-react/build/IconComponents";
// import Select from "react-select";
// import Swal from "sweetalert2";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useDispatch, useSelector } from "react-redux";
// import { debounce } from "lodash";
// import ImageWithBasePath from "../../core/img/imagewithbasebath";
// import TableHeaderActions from "../tableheader";
// import { setToogleHeader } from "../../core/redux/action";
// import {
//   fetchArticles,
//   fetchArticleById,
//   createArticle,
//   updateArticle,
//   deleteArticle,
//   setFilters,
//   clearCurrentArticle,
//   clearError,
// } from '../../core/redux/slices/articleSlice';
// import AuthService from "../../services/authService";
// import { usePermissions } from "../../hooks/usePermission"; 

// const ArticleProfile = () => {
//   const dispatch = useDispatch();
  
//   const { hasPermission } = usePermissions();
  
//   // Redux state
//   const { 
//     article_list, 
//     currentArticle,
//     status, 
//     filters,
//     error 
//   } = useSelector((state) => state.articles);
  
//   const headerState = useSelector((state) => state.toggle_header);

//   // Local state
//   const [isFilterVisible, setIsFilterVisible] = useState(false);
//   const [glossaries, setGlossaries] = useState([]);
//   const [attributes, setAttributes] = useState([{ glossary_id: "", value: "" }]);
//   const [formData, setFormData] = useState({
//     title: "",
//     category: "",
//     brand: "",
//     model: "",
//     year: new Date(),
//     sku: "",
//     weight: "",
//     dimensions: "",
//     unit_: "piece",
//     description: "",
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [selectedIds, setSelectedIds] = useState([]);

//   useEffect(() => {
//     handleRefresh();
//     fetchGlossaries();
//   }, []);

//   useEffect(() => {
//     if (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: error,
//         timer: 2000,
//       });
//       dispatch(clearError());
//     }
//   }, [error, dispatch]);

//   useEffect(() => {
//     if (currentArticle) {
//       const parsedGlossaries = currentArticle.glossary_ids
//         ? JSON.parse(currentArticle.glossary_ids)
//         : [];

//       setFormData({
//         title: currentArticle.title || "",
//         category: currentArticle.category || "",
//         brand: currentArticle.brand || "",
//         model: currentArticle.model || "",
//         year: currentArticle.year ? new Date(currentArticle.year, 0) : new Date(),
//         sku: currentArticle.sku || "",
//         weight: currentArticle.weight || "",
//         dimensions: currentArticle.dimensions
//           ? JSON.parse(currentArticle.dimensions)
//           : "",
//         unit_: currentArticle.unit_ || "piece",
//         description: currentArticle.description || "",
//       });

//       if (Array.isArray(parsedGlossaries) && parsedGlossaries.length > 0) {
//         setAttributes(
//           parsedGlossaries.map((g) => ({
//             glossary_id: g.glossary_id || "",
//             value: g.value || "",
//           }))
//         );
//       } else {
//         setAttributes([{ glossary_id: "", value: "" }]);
//       }
//     }
//   }, [currentArticle]);

//   const handleRefresh = () => {
//     dispatch(fetchArticles(filters));
//   };

//   const fetchGlossaries = async () => {
//     try {
//       const response = await AuthService.getGlossaries();
//       setGlossaries(response.data.data.glossaries || []);
//     } catch (error) {
//       console.error("Error fetching glossaries:", error);
//     }
//   };

//   // Debounced search function
//   const debouncedSearch = useCallback(
//     debounce((searchValue) => {
//       dispatch(setFilters({ search: searchValue }));
//       dispatch(fetchArticles({ ...filters, search: searchValue }));
//     }, 500),
//     [dispatch, filters]
//   );

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     dispatch(setFilters({ search: value }));
//     debouncedSearch(value);
//   };

//   const handleSearch = () => {
//     handleRefresh();
//   };

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleYearChange = (date) => {
//     setFormData({ ...formData, year: date });
//   };

//   const addAttribute = () => {
//     setAttributes([...attributes, { glossary_id: "", value: "" }]);
//   };

//   const removeAttribute = (index) => {
//     const newAttributes = attributes.filter((_, i) => i !== index);
//     setAttributes(newAttributes);
//   };

//   const handleAttributeGlossaryChange = (index, selectedOption) => {
//     const newAttributes = [...attributes];
//     newAttributes[index].glossary_id = selectedOption?.value || "";
//     newAttributes[index].value = ""; // Reset value when glossary changes
//     setAttributes(newAttributes);
//   };

//   const handleAttributeValueChange = (index, value) => {
//     const newAttributes = [...attributes];
//     newAttributes[index].value = value;
//     setAttributes(newAttributes);
//   };

//  const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Transform attributes array to object format expected by backend
//       const more_attr = {};
//       attributes
//         .filter((attr) => attr.glossary_id && attr.value)
//         .forEach((attr) => {
//           const glossary = glossaries.find(g => g.id === parseInt(attr.glossary_id));
//           if (glossary) {
//             more_attr[glossary.title] = attr.value;
//           }
//         });

//       // Parse dimensions if it's a string (e.g., "10x20x30")
//       let dimensionsObj = null;
//       if (formData.dimensions) {
//         if (typeof formData.dimensions === 'string') {
//           const dims = formData.dimensions.split('x').map(d => parseFloat(d.trim()));
//           if (dims.length === 3 && dims.every(d => !isNaN(d))) {
//             dimensionsObj = {
//               length: dims[0],
//               width: dims[1],
//               height: dims[2]
//             };
//           }
//         } else {
//           dimensionsObj = formData.dimensions;
//         }
//       }

 
//       const submitData = {
//         art_prof_title: formData.title,
//         category: formData.category,
//         brand: formData.brand,
//         model: formData.model,
//         mfg_yr: formData.year.getFullYear(),
//         more_attr: Object.keys(more_attr).length > 0 ? more_attr : undefined,
//         weight: formData.weight ? parseFloat(formData.weight) : undefined,
//         dim: dimensionsObj,
//         unit: formData.unit_,
//         desc: formData.description || undefined,
//         last_updated_by: 2 // Replace with actual user ID from auth context
//       };

      
//       Object.keys(submitData).forEach(key => 
//         submitData[key] === undefined && delete submitData[key]
//       );

//       if (editingId) {
//         await dispatch(updateArticle({ id: editingId, data: submitData })).unwrap();
//         Swal.fire({
//           icon: "success",
//           title: "Success",
//           text: "Article updated successfully",
//           timer: 2000,
//           showConfirmButton: false,
//         });
//       } else {
//         await dispatch(createArticle(submitData)).unwrap();
//         Swal.fire({
//           icon: "success",
//           title: "Success",
//           text: "Article created successfully",
//           timer: 2000,
//           showConfirmButton: false,
//         });
//       }

//       closeModal(editingId ? "edit-units" : "add-units");
//       resetForm();
//     } catch (error) {
//       console.error("Error saving article:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: error || "Failed to save article",
//         timer: 3000,
//       });
//     }
//   };

//   const closeModal = (modalId) => {
//     const modal = document.getElementById(modalId);
//     const backdrop = document.querySelector(".modal-backdrop");

//     if (modal) {
//       modal.classList.remove("show");
//       modal.style.display = "none";
//       document.body.classList.remove("modal-open");
//       document.body.style.removeProperty("overflow");
//       document.body.style.removeProperty("padding-right");
//     }

//     if (backdrop) {
//       backdrop.remove();
//     }
//   };

//   const handleEdit = async (id) => {
//     try {
//       await dispatch(fetchArticleById(id)).unwrap();
//       setEditingId(id);
//     } catch (error) {
//       console.error("Error fetching article:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to fetch article details",
//         timer: 2000,
//       });
//     }
//   };

//   const handleDelete = async (id) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "Cancel",
//     });

//     if (result.isConfirmed) {
//       try {
//         await dispatch(deleteArticle(id)).unwrap();
//         Swal.fire({
//           icon: "success",
//           title: "Deleted!",
//           text: "Article has been deleted.",
//           timer: 2000,
//           showConfirmButton: false,
//         });
//       } catch (error) {
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: error || "Failed to delete article",
//           timer: 3000,
//         });
//       }
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       title: "",
//       category: "",
//       brand: "",
//       model: "",
//       year: new Date(),
//       sku: "",
//       weight: "",
//       dimensions: "",
//       unit_: "piece",
//       description: "",
//     });
//     setAttributes([{ glossary_id: "", value: "" }]);
//     setEditingId(null);
//     dispatch(clearCurrentArticle());
//   };

//   const toggleFilterVisibility = () => {
//     setIsFilterVisible(!isFilterVisible);
//   };

//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       setSelectedIds(article_list.map((a) => a.id));
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
//     { value: "created_at_desc", label: "Sort by Date (Newest)" },
//     { value: "created_at_asc", label: "Sort by Date (Oldest)" },
//     { value: "title_asc", label: "Sort by Title (A-Z)" },
//     { value: "title_desc", label: "Sort by Title (Z-A)" },
//   ];

//   const unitOptions = [
//     { value: "piece", label: "Piece" },
//     { value: "gram", label: "Gram" },
//     { value: "kilogram", label: "Kilogram" },
//     { value: "metre", label: "Metre" },
//     { value: "litre", label: "Litre" },
//   ];

//   const glossaryOptions = glossaries.map((g) => ({
//     label: g.title || g.name,
//     value: g.id,
//   }));

//   // Get glossary name by ID for display
//   const getGlossaryName = (glossaryId) => {
//     const glossary = glossaries.find(g => g.id === parseInt(glossaryId));
//     return glossary ? glossary.title : glossaryId;
//   };

//   return (
//     <div className="page-wrapper">
//       <div className="content">
//         <div className="page-header">
//           <div className="add-item d-flex">
//             <div className="page-title">
//               <h4>Article Profile</h4>
//               <h6>Manage Your Article Profiles</h6>
//             </div>
//           </div>
//           <TableHeaderActions
//             onRefresh={handleRefresh}
//             pdfEndpoint="/auth/export/articles/pdf"
//             excelEndpoint="/auth/export/articles/excel"
//             entityName="articles"
//             dispatch={dispatch}
//             headerState={headerState}
//             headerAction={setToogleHeader}
//             showPrint={true}
//           />
//           {hasPermission("Article Profile", "create") && (
//             <div className="page-btn">
//               <a
//                 href="#"
//                 className="btn btn-added"
//                 data-bs-toggle="modal"
//                 data-bs-target="#add-units"
//                 onClick={resetForm}
//               >
//                 <PlusCircle className="me-2" /> Add New Article
//               </a>
//             </div>
//           )}
//         </div>

//         <div className="card table-list-card">
//           <div className="card-body">
//             <div className="table-top">
//               <div className="search-set">
//                 <div className="search-input">
//                   <input
//                     type="text"
//                     placeholder="Search"
//                     className="form-control form-control-sm formsearch"
//                     value={filters.search}
//                     onChange={handleSearchChange}
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
//                   className="select"
//                   options={sortOptions}
//                   placeholder="Sort by Date"
//                   onChange={(option) => {
//                     dispatch(setFilters({ sortBy: option?.value }));
//                     setTimeout(handleRefresh, 100);
//                   }}
//                 />
//               </div>
//             </div>

//             <div className="table-responsive">
//               {status === "loading" ? (
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
//                             checked={
//                               selectedIds.length === article_list.length &&
//                               article_list.length > 0
//                             }
//                             onChange={handleSelectAll}
//                           />
//                           <span className="checkmarks" />
//                         </label>
//                       </th>
//                       <th>Title</th>
//                       <th>Category</th>
//                       <th>Brand</th>
//                       <th>Model</th>
//                       <th>Year</th>
//                       <th>SKU</th>
//                       <th>Attributes</th>
//                       <th>Weight</th>
//                       <th>Unit</th>
//                       <th>Description</th>
//                       <th>Created On</th>
//                       {hasPermission("Article Profile", "view") && (
//                         <th className="no-sort">Action</th>
//                       )}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {article_list.length === 0 ? (
//                       <tr>
//                         <td colSpan="13" className="text-center">
//                           No articles found
//                         </td>
//                       </tr>
//                     ) : (
//                       article_list.map((article) => {
//                         const parsedAttributes = article.glossary_ids
//                           ? JSON.parse(article.glossary_ids)
//                           : [];
//                         return (
//                           <tr key={article.id}>
//                             <td>
//                               <label className="checkboxs">
//                                 <input
//                                   type="checkbox"
//                                   checked={selectedIds.includes(article.id)}
//                                   onChange={() => handleSelectOne(article.id)}
//                                 />
//                                 <span className="checkmarks" />
//                               </label>
//                             </td>
//                             <td>{article.title}</td>
//                             <td>{article.category || "N/A"}</td>
//                             <td>{article.brand || "N/A"}</td>
//                             <td>{article.model || "N/A"}</td>
//                             <td>{article.manufacturing_year || "N/A"}</td>
//                             <td>{article.sku || "N/A"}</td>
//                             <td>
//                               {Array.isArray(parsedAttributes) && parsedAttributes.length > 0 ? (
//                                 <span 
//                                   title={parsedAttributes.map(
//                                     attr => `${getGlossaryName(attr.glossary_id)}: ${attr.value}`
//                                   ).join(', ')}
//                                   style={{ cursor: 'pointer' }}
//                                 >
//                                   {parsedAttributes.length} attribute{parsedAttributes.length !== 1 ? 's' : ''}
//                                 </span>
//                               ) : (
//                                 "No attributes"
//                               )}
//                             </td>
//                             <td>{article.weight || "N/A"}</td>
//                             <td>
//                               <span className="badge badge-linesuccess">
//                                 {article.unit}
//                               </span>
//                             </td>
//                             <td
//                               style={{
//                                 maxWidth: "200px",
//                                 whiteSpace: "nowrap",
//                                 overflow: "hidden",
//                                 textOverflow: "ellipsis",
//                               }}
//                             >
//                               <span title={article.description || "N/A"}>
//                                 {article.description || "N/A"}
//                               </span>
//                             </td>
//                             <td>
//                               {new Date(article.created_at).toLocaleDateString()}
//                             </td>
//                             {hasPermission("Article Profile", "view") && (
//                               <td className="action-table-data">
//                                 <div className="edit-delete-action">
//                                   <Link
//                                     className="me-2 edit-icon p-2"
//                                     to="#"
//                                     onClick={() => handleEdit(article.id)}
//                                     data-bs-toggle="modal"
//                                     data-bs-target="#edit-units"
//                                   >
//                                     <i data-feather="eye" className="feather-eye" />
//                                   </Link>
//                                   {hasPermission("Article Profile", "update") && (
//                                     <Link
//                                       className="me-2 p-2"
//                                       to="#"
//                                       onClick={() => handleEdit(article.id)}
//                                       data-bs-toggle="modal"
//                                       data-bs-target="#edit-units"
//                                     >
//                                       <i
//                                         data-feather="edit"
//                                         className="feather-edit"
//                                       />
//                                     </Link>
//                                   )}
//                                   {hasPermission("Article Profile", "delete") && (
//                                     <Link
//                                       className="confirm-text p-2"
//                                       to="#"
//                                       onClick={() => handleDelete(article.id)}
//                                     >
//                                       <i
//                                         data-feather="trash-2"
//                                         className="feather-trash-2"
//                                       />
//                                     </Link>
//                                   )}
//                                 </div>
//                               </td>
//                             )}
//                           </tr>
//                         );
//                       })
//                     )}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Add/Edit Modal */}
//       {["add-units", "edit-units"].map((modalId) => (
//         <div className="modal fade" id={modalId} key={modalId}>
//           <div className="modal-dialog modal-dialog-centered modal-lg">
//             <div className="modal-content">
//               <div className="page-wrapper-new p-0">
//                 <div className="content">
//                   <div className="modal-header border-0 custom-modal-header">
//                     <div className="page-title">
//                       <h4>{editingId ? "Edit" : "Add"} Article</h4>
//                     </div>
//                     <button
//                       type="button"
//                       className="close"
//                       data-bs-dismiss="modal"
//                       aria-label="Close"
//                       onClick={resetForm}
//                     >
//                       <span aria-hidden="true">×</span>
//                     </button>
//                   </div>
//                   <div className="modal-body custom-modal-body">
//                     <form onSubmit={handleSubmit}>
//                       <div className="modal-title-head">
//                         <h6>
//                           <span>
//                             <i data-feather="info" className="feather-edit" />
//                           </span>
//                           Article Info
//                         </h6>
//                       </div>
//                       <div className="row">
//                         <div className="col-lg-6">
//                           <div className="mb-3">
//                             <label className="form-label">Title *</label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               name="title"
//                               value={formData.title}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-6">
//                           <div className="mb-3">
//                             <label className="form-label">Category *</label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               name="category"
//                               value={formData.category}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-6">
//                           <div className="mb-3">
//                             <label className="form-label">Brand *</label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               name="brand"
//                               value={formData.brand}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-3">
//                           <div className="mb-3">
//                             <label className="form-label">Model *</label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               name="model"
//                               value={formData.model}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-3">
//                           <div className="mb-3">
//                             <label className="form-label">Year *</label> 
//                             <DatePicker
//                               selected={formData.year}
//                               onChange={handleYearChange}
//                               showYearPicker
//                               dateFormat="yyyy"
//                               className="form-control"
//                               required
//                             />
//                           </div>
//                         </div>
                      
//                         <div className="col-lg-12">
//                           <div className="mb-3">
//                             <label className="form-label">
//                               Attributes
//                               <button
//                                 type="button"
//                                 className="btn btn-sm btn-primary ms-2"
//                                 onClick={addAttribute}
//                               >
//                                 <Plus size={16} /> Add Attribute
//                               </button>
//                             </label>
//                             {attributes.map((attr, index) => (
//                               <div
//                                 key={index}
//                                 className="row align-items-end mb-2"
//                               >
//                                 <div className="col-5">
//                                   <Select
//                                     className="select"
//                                     options={glossaryOptions}
//                                     value={glossaryOptions.find(
//                                       (g) => g.value === parseInt(attr.glossary_id)
//                                     )}
//                                     onChange={(option) =>
//                                       handleAttributeGlossaryChange(index, option)
//                                     }
//                                     placeholder="Select Attribute Type"
//                                     isClearable
//                                   />
//                                 </div>
//                                 <div className="col-5">
//                                   <input
//                                     type="text"
//                                     className="form-control"
//                                     placeholder="Enter value"
//                                     value={attr.value}
//                                     onChange={(e) =>
//                                       handleAttributeValueChange(index, e.target.value)
//                                     }
//                                     disabled={!attr.glossary_id}
//                                   />
//                                 </div>
//                                 <div className="col-2">
//                                   {attributes.length > 1 && (
//                                     <button
//                                       type="button"
//                                       className="btn btn-sm btn-danger"
//                                       onClick={() => removeAttribute(index)}
//                                     >
//                                       <X size={16} />
//                                     </button>
//                                   )}
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         <div className="col-lg-6">
//                           <div className="mb-3">
//                             <label className="form-label">Weight</label>
//                             <input
//                               type="number"
//                               className="form-control"
//                               name="weight"
//                               value={formData.weight}
//                               onChange={handleInputChange}
//                               step="0.01"
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-6">
//                           <div className="input-blocks">
//                             <label>Unit *</label>
//                             <Select
//                               className="select"
//                               options={unitOptions}
//                               value={unitOptions.find(
//                                 (u) => u.value === formData.unit_
//                               )}
//                               onChange={(option) =>
//                                 setFormData({
//                                   ...formData,
//                                   unit_: option?.value || "piece",
//                                 })
//                               }
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-12">
//                           <div className="mb-3">
//                             <label className="form-label">Dimensions</label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               name="dimensions"
//                               value={formData.dimensions}
//                               onChange={handleInputChange}
//                               placeholder="e.g., 10x20x30 cm"
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-12">
//                           <div className="mb-3">
//                             <label className="form-label">Description</label>
//                             <textarea
//                               className="form-control"
//                               name="description"
//                               value={formData.description}
//                               onChange={handleInputChange}
//                               rows="3"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="modal-footer-btn">
//                         <button
//                           type="button"
//                           className="btn btn-cancel me-2"
//                           data-bs-dismiss="modal"
//                           onClick={resetForm}
//                         >
//                           Cancel
//                         </button>
//                         <button type="submit" className="btn btn-submit">
//                           {editingId ? "Save Changes" : "Create Article"}
//                         </button>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ArticleProfile;



// import React, { useState, useEffect, useCallback } from "react";
// import { Link } from "react-router-dom";
// import { Filter, Sliders, Plus, X } from "react-feather";
// import { PlusCircle } from "feather-icons-react/build/IconComponents";
// import Select from "react-select";
// import Swal from "sweetalert2";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useDispatch, useSelector } from "react-redux";
// import { debounce } from "lodash";
// import ImageWithBasePath from "../../core/img/imagewithbasebath";
// import TableHeaderActions from "../tableheader";
// import { setToogleHeader } from "../../core/redux/action";
// import {
//   fetchArticles,
//   fetchArticleById,
//   createArticle,
//   updateArticle,
//   deleteArticle,
//   setFilters,
//   clearCurrentArticle,
//   clearError,
// } from '../../core/redux/slices/articleSlice';
// import AuthService from "../../services/authService";
// import { usePermissions } from "../../hooks/usePermission"; 

// const ArticleProfile = () => {
//   const dispatch = useDispatch();
  
//   const { hasPermission } = usePermissions();
  
//   // Redux state
//   const { 
//     article_list, 
//     currentArticle,
//     status, 
//     filters,
//     error 
//   } = useSelector((state) => state.articles);
  
//   const currentUser = useSelector((state) => state.auth?.user); 
//   const headerState = useSelector((state) => state.toggle_header);

//   // Local state
//   const [isFilterVisible, setIsFilterVisible] = useState(false);
//   const [glossaries, setGlossaries] = useState([]);
//   const [attributes, setAttributes] = useState([{ glossary_id: "", value: "" }]);
//   const [formData, setFormData] = useState({
//     title: "",
//     category: "",
//     brand: "",
//     model: "",
//     year: new Date(),
//     sku: "",
//     weight: "",
//     dimensions: "",
//     unit_: "piece",
//     description: "",
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [selectedIds, setSelectedIds] = useState([]);

//   useEffect(() => {
//     handleRefresh();
//     fetchGlossaries();
//   }, []);

//   useEffect(() => {
//     if (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: error,
//         timer: 2000,
//       });
//       dispatch(clearError());
//     }
//   }, [error, dispatch]);

//   useEffect(() => {
//     if (currentArticle) {
//       // Parse attributes from backend format (object) to frontend format (array)
//       const attributesArray = [];
//       if (currentArticle.attributes && typeof currentArticle.attributes === 'object') {
//         Object.entries(currentArticle.attributes).forEach(([key, value]) => {
//           const glossary = glossaries.find(g => g.title === key);
//           if (glossary) {
//             attributesArray.push({
//               glossary_id: glossary.id.toString(),
//               value: value
//             });
//           }
//         });
//       }

      
//       let dimensionsStr = "";
//       if (currentArticle.dimensions) {
//         const dim = currentArticle.dimensions;
//         dimensionsStr = `${dim.length}x${dim.width}x${dim.height}`;
//       }

//       setFormData({
//         title: currentArticle.title || "",
//         category: currentArticle.category || "",
//         brand: currentArticle.brand || "",
//         model: currentArticle.model || "",
//         year: currentArticle.manufacturing_year ? new Date(currentArticle.manufacturing_year, 0) : new Date(),
//         sku: currentArticle.sku || "",
//         weight: currentArticle.weight || "",
//         dimensions: dimensionsStr,
//         unit_: currentArticle.unit || "piece",
//         description: currentArticle.description || "",
//       });

//       setAttributes(attributesArray.length > 0 ? attributesArray : [{ glossary_id: "", value: "" }]);
//     }
//   }, [currentArticle, glossaries]);

//   const handleRefresh = () => {
//     dispatch(fetchArticles(filters));
//   };

//   const fetchGlossaries = async () => {
//     try {
//       const response = await AuthService.getGlossaries();
//       setGlossaries(response.data.data.glossaries || []);
//     } catch (error) {
//       console.error("Error fetching glossaries:", error);
//     }
//   };

//   // Debounced search function
//   const debouncedSearch = useCallback(
//     debounce((searchValue) => {
//       dispatch(setFilters({ search: searchValue }));
//       dispatch(fetchArticles({ ...filters, search: searchValue }));
//     }, 500),
//     [dispatch, filters]
//   );

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     dispatch(setFilters({ search: value }));
//     debouncedSearch(value);
//   };

//   const handleSearch = () => {
//     handleRefresh();
//   };

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleYearChange = (date) => {
//     setFormData({ ...formData, year: date });
//   };

//   const addAttribute = () => {
//     setAttributes([...attributes, { glossary_id: "", value: "" }]);
//   };

//   const removeAttribute = (index) => {
//     const newAttributes = attributes.filter((_, i) => i !== index);
//     setAttributes(newAttributes);
//   };

//   const handleAttributeGlossaryChange = (index, selectedOption) => {
//     const newAttributes = [...attributes];
//     newAttributes[index].glossary_id = selectedOption?.value || "";
//     newAttributes[index].value = ""; // Reset value when glossary changes
//     setAttributes(newAttributes);
//   };

//   const handleAttributeValueChange = (index, value) => {
//     const newAttributes = [...attributes];
//     newAttributes[index].value = value;
//     setAttributes(newAttributes);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Transform attributes array to object format expected by backend
//       const more_attr = {};
//       attributes
//         .filter((attr) => attr.glossary_id && attr.value)
//         .forEach((attr) => {
//           const glossary = glossaries.find(g => g.id === parseInt(attr.glossary_id));
//           if (glossary) {
//             more_attr[glossary.title] = attr.value;
//           }
//         });

//       // Parse dimensions if it's a string (e.g., "10x20x30")
//       let dimensionsObj = null;
//       if (formData.dimensions) {
//         if (typeof formData.dimensions === 'string') {
//           const dims = formData.dimensions.split('x').map(d => parseFloat(d.trim()));
//           if (dims.length === 3 && dims.every(d => !isNaN(d))) {
//             dimensionsObj = {
//               length: dims[0],
//               width: dims[1],
//               height: dims[2]
//             };
//           }
//         } else {
//           dimensionsObj = formData.dimensions;
//         }
//       }

//       // Transform data to match backend expectations
//       const submitData = {
//         art_prof_title: formData.title,
//         category: formData.category,
//         brand: formData.brand,
//         model: formData.model,
//         mfg_yr: formData.year.getFullYear(),
//         more_attr: Object.keys(more_attr).length > 0 ? more_attr : undefined,
//         weight: formData.weight ? parseFloat(formData.weight) : undefined,
//         dim: dimensionsObj,
//         unit: formData.unit_,
//         desc: formData.description || undefined,
//         last_updated_by: currentUser?.id || 'System'
//       };

//       // Remove undefined fields
//       Object.keys(submitData).forEach(key => 
//         submitData[key] === undefined && delete submitData[key]
//       );

//       if (editingId) {
//         await dispatch(updateArticle({ id: editingId, data: submitData })).unwrap();
//         Swal.fire({
//           icon: "success",
//           title: "Success",
//           text: "Article updated successfully",
//           timer: 2000,
//           showConfirmButton: false,
//         });
//       } else {
//         await dispatch(createArticle(submitData)).unwrap();
//         Swal.fire({
//           icon: "success",
//           title: "Success",
//           text: "Article created successfully",
//           timer: 2000,
//           showConfirmButton: false,
//         });
//       }

//       closeModal(editingId ? "edit-units" : "add-units");
//       resetForm();
//       // Refresh the list immediately after creation
//       handleRefresh();
//     } catch (error) {
//       console.error("Error saving article:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: error || "Failed to save article",
//         timer: 3000,
//       });
//     }
//   };

//   const closeModal = (modalId) => {
//     const modal = document.getElementById(modalId);
//     const backdrop = document.querySelector(".modal-backdrop");

//     if (modal) {
//       modal.classList.remove("show");
//       modal.style.display = "none";
//       document.body.classList.remove("modal-open");
//       document.body.style.removeProperty("overflow");
//       document.body.style.removeProperty("padding-right");
//     }

//     if (backdrop) {
//       backdrop.remove();
//     }
//   };

//   const handleEdit = async (id) => {
//     try {
//       await dispatch(fetchArticleById(id)).unwrap();
//       setEditingId(id);
//     } catch (error) {
//       console.error("Error fetching article:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to fetch article details",
//         timer: 2000,
//       });
//     }
//   };

//   const handleDelete = async (id) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "Cancel",
//     });

//     if (result.isConfirmed) {
//       try {
//         await dispatch(deleteArticle(id)).unwrap();
//         Swal.fire({
//           icon: "success",
//           title: "Deleted!",
//           text: "Article has been deleted.",
//           timer: 2000,
//           showConfirmButton: false,
//         });
//         handleRefresh();
//       } catch (error) {
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: error || "Failed to delete article",
//           timer: 3000,
//         });
//       }
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       title: "",
//       category: "",
//       brand: "",
//       model: "",
//       year: new Date(),
//       sku: "",
//       weight: "",
//       dimensions: "",
//       unit_: "piece",
//       description: "",
//     });
//     setAttributes([{ glossary_id: "", value: "" }]);
//     setEditingId(null);
//     dispatch(clearCurrentArticle());
//   };

//   const toggleFilterVisibility = () => {
//     setIsFilterVisible(!isFilterVisible);
//   };

//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       setSelectedIds(article_list.map((a) => a.id));
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
//     { value: "created_at_desc", label: "Sort by Date (Newest)" },
//     { value: "created_at_asc", label: "Sort by Date (Oldest)" },
//     { value: "title_asc", label: "Sort by Title (A-Z)" },
//     { value: "title_desc", label: "Sort by Title (Z-A)" },
//   ];

//   const unitOptions = [
//     { value: "piece", label: "Piece" },
//     { value: "gram", label: "Gram" },
//     { value: "kilogram", label: "Kilogram" },
//     { value: "metre", label: "Metre" },
//     { value: "litre", label: "Litre" },
//   ];

//   const glossaryOptions = glossaries.map((g) => ({
//     label: g.title || g.name,
//     value: g.id,
//   }));

//   const formatDimensions = (dimensions) => {
//     if (!dimensions) return "N/A";
//     if (typeof dimensions === 'object') {
//       return `${dimensions.length}×${dimensions.width}×${dimensions.height}`;
//     }
//     return dimensions;
//   };

//   return (
//     <div className="page-wrapper">
//       <div className="content">
//         <div className="page-header">
//           <div className="add-item d-flex">
//             <div className="page-title">
//               <h4>Article Profile</h4>
//               <h6>Manage Your Article Profiles</h6>
//             </div>
//           </div>
//           <TableHeaderActions
//             onRefresh={handleRefresh}
//             pdfEndpoint="/auth/export/articles/pdf"
//             excelEndpoint="/auth/export/articles/excel"
//             entityName="articles"
//             dispatch={dispatch}
//             headerState={headerState}
//             headerAction={setToogleHeader}
//             showPrint={true}
//           />
//           {hasPermission("Article Profile", "create") && (
//             <div className="page-btn">
//               <a
//                 href="#"
//                 className="btn btn-added"
//                 data-bs-toggle="modal"
//                 data-bs-target="#add-units"
//                 onClick={resetForm}
//               >
//                 <PlusCircle className="me-2" /> Add New Article
//               </a>
//             </div>
//           )}
//         </div>

//         <div className="card table-list-card">
//           <div className="card-body">
//             <div className="table-top">
//               <div className="search-set">
//                 <div className="search-input">
//                   <input
//                     type="text"
//                     placeholder="Search"
//                     className="form-control form-control-sm formsearch"
//                     value={filters.search}
//                     onChange={handleSearchChange}
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
//                   className="select"
//                   options={sortOptions}
//                   placeholder="Sort by Date"
//                   onChange={(option) => {
//                     dispatch(setFilters({ sortBy: option?.value }));
//                     setTimeout(handleRefresh, 100);
//                   }}
//                 />
//               </div>
//             </div>

//             <div className="table-responsive">
//               {status === "loading" ? (
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
//                             checked={
//                               selectedIds.length === article_list.length &&
//                               article_list.length > 0
//                             }
//                             onChange={handleSelectAll}
//                           />
//                           <span className="checkmarks" />
//                         </label>
//                       </th>
//                       <th>Title</th>
//                       <th>Category</th>
//                       <th>Brand</th>
//                       <th>Model</th>
//                       <th>Year</th>
//                       <th>SKU</th>
//                       <th>Attributes</th>
//                       <th>Weight</th>
//                       <th>Unit</th>
//                       <th>Description</th>
//                       <th>Created On</th>
//                       {hasPermission("Article Profile", "view") && (
//                         <th className="no-sort">Action</th>
//                       )}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {article_list.length === 0 ? (
//                       <tr>
//                         <td colSpan="13" className="text-center">
//                           No articles found
//                         </td>
//                       </tr>
//                     ) : (
//                       article_list.map((article) => {
//                         return (
//                           <tr key={article.id}>
//                             <td>
//                               <label className="checkboxs">
//                                 <input
//                                   type="checkbox"
//                                   checked={selectedIds.includes(article.id)}
//                                   onChange={() => handleSelectOne(article.id)}
//                                 />
//                                 <span className="checkmarks" />
//                               </label>
//                             </td>
//                             <td>{article.title}</td>
//                             <td>{article.category || "N/A"}</td>
//                             <td>{article.brand || "N/A"}</td>
//                             <td>{article.model || "N/A"}</td>
//                             <td>{article.manufacturing_year || "N/A"}</td>
//                             <td>{article.sku || "N/A"}</td>
                            // <td>
                            //   {article.attributes && typeof article.attributes === 'object' && Object.keys(article.attributes).length > 0 ? (
                            //     <span 
                            //       title={Object.entries(article.attributes).map(
                            //         ([key, value]) => `${key}: ${value}`
                            //       ).join(', ')}
                            //       style={{ cursor: 'pointer' }}
                            //     >
                            //       {Object.keys(article.attributes).length} attribute{Object.keys(article.attributes).length !== 1 ? 's' : ''}
                            //     </span>
                            //   ) : (
                            //     "No attributes"
                            //   )}
                            // </td>
//                             <td>{article.weight || "N/A"}</td>
//                             <td>
//                               <span className="badge badge-linesuccess">
//                                 {article.unit}
//                               </span>
//                             </td>
//                             <td
//                               style={{
//                                 maxWidth: "200px",
//                                 whiteSpace: "nowrap",
//                                 overflow: "hidden",
//                                 textOverflow: "ellipsis",
//                               }}
//                             >
//                               <span title={article.description || "N/A"}>
//                                 {article.description || "N/A"}
//                               </span>
//                             </td>
//                             <td>
//                               {new Date(article.created_at).toLocaleDateString()}
//                             </td>
//                             {hasPermission("Article Profile", "view") && (
//                               <td className="action-table-data">
//                                 <div className="edit-delete-action">
//                                   <Link
//                                     className="me-2 edit-icon p-2"
//                                     to="#"
//                                     onClick={() => handleEdit(article.id)}
//                                     data-bs-toggle="modal"
//                                     data-bs-target="#edit-units"
//                                   >
//                                     <i data-feather="eye" className="feather-eye" />
//                                   </Link>
//                                   {hasPermission("Article Profile", "update") && (
//                                     <Link
//                                       className="me-2 p-2"
//                                       to="#"
//                                       onClick={() => handleEdit(article.id)}
//                                       data-bs-toggle="modal"
//                                       data-bs-target="#edit-units"
//                                     >
//                                       <i
//                                         data-feather="edit"
//                                         className="feather-edit"
//                                       />
//                                     </Link>
//                                   )}
//                                   {hasPermission("Article Profile", "delete") && (
//                                     <Link
//                                       className="confirm-text p-2"
//                                       to="#"
//                                       onClick={() => handleDelete(article.id)}
//                                     >
//                                       <i
//                                         data-feather="trash-2"
//                                         className="feather-trash-2"
//                                       />
//                                     </Link>
//                                   )}
//                                 </div>
//                               </td>
//                             )}
//                           </tr>
//                         );
//                       })
//                     )}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Add/Edit Modal */}
//       {["add-units", "edit-units"].map((modalId) => (
//         <div className="modal fade" id={modalId} key={modalId}>
//           <div className="modal-dialog modal-dialog-centered modal-lg">
//             <div className="modal-content">
//               <div className="page-wrapper-new p-0">
//                 <div className="content">
//                   <div className="modal-header border-0 custom-modal-header">
//                     <div className="page-title">
//                       <h4>{editingId ? "Edit" : "Add"} Article</h4>
//                     </div>
//                     <button
//                       type="button"
//                       className="close"
//                       data-bs-dismiss="modal"
//                       aria-label="Close"
//                       onClick={resetForm}
//                     >
//                       <span aria-hidden="true">×</span>
//                     </button>
//                   </div>
//                   <div className="modal-body custom-modal-body">
//                     <form onSubmit={handleSubmit}>
//                       <div className="modal-title-head">
//                         <h6>
//                           <span>
//                             <i data-feather="info" className="feather-edit" />
//                           </span>
//                           Article Info
//                         </h6>
//                       </div>
//                       <div className="row">
//                         <div className="col-lg-6">
//                           <div className="mb-3">
//                             <label className="form-label">Title *</label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               name="title"
//                               value={formData.title}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-6">
//                           <div className="mb-3">
//                             <label className="form-label">Category *</label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               name="category"
//                               value={formData.category}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-6">
//                           <div className="mb-3">
//                             <label className="form-label">Brand *</label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               name="brand"
//                               value={formData.brand}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-3">
//                           <div className="mb-3">
//                             <label className="form-label">Model *</label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               name="model"
//                               value={formData.model}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-3">
//                           <div className="mb-3">
//                             <label className="form-label">Year *</label> 
//                             <DatePicker
//                               selected={formData.year}
//                               onChange={handleYearChange}
//                               showYearPicker
//                               dateFormat="yyyy"
//                               className="form-control"
//                               required
//                             />
//                           </div>
//                         </div>
                      
//                         <div className="col-lg-12">
//                           <div className="mb-3">
//                             <label className="form-label">
//                               Attributes
//                               <button
//                                 type="button"
//                                 className="btn btn-sm btn-primary ms-2"
//                                 onClick={addAttribute}
//                               >
//                                 <Plus size={16} /> Add Attribute
//                               </button>
//                             </label>
//                             {attributes.map((attr, index) => (
//                               <div
//                                 key={index}
//                                 className="row align-items-end mb-2"
//                               >
//                                 <div className="col-5">
//                                   <Select
//                                     className="select"
//                                     options={glossaryOptions}
//                                     value={glossaryOptions.find(
//                                       (g) => g.value === parseInt(attr.glossary_id)
//                                     )}
//                                     onChange={(option) =>
//                                       handleAttributeGlossaryChange(index, option)
//                                     }
//                                     placeholder="Select Attribute Type"
//                                     isClearable
//                                   />
//                                 </div>
//                                 <div className="col-5">
//                                   <input
//                                     type="text"
//                                     className="form-control"
//                                     placeholder="Enter value"
//                                     value={attr.value}
//                                     onChange={(e) =>
//                                       handleAttributeValueChange(index, e.target.value)
//                                     }
//                                     disabled={!attr.glossary_id}
//                                   />
//                                 </div>
//                                 <div className="col-2">
//                                   {attributes.length > 1 && (
//                                     <button
//                                       type="button"
//                                       className="btn btn-sm btn-danger"
//                                       onClick={() => removeAttribute(index)}
//                                     >
//                                       <X size={16} />
//                                     </button>
//                                   )}
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         <div className="col-lg-6">
//                           <div className="mb-3">
//                             <label className="form-label">Weight</label>
//                             <input
//                               type="number"
//                               className="form-control"
//                               name="weight"
//                               value={formData.weight}
//                               onChange={handleInputChange}
//                               step="0.01"
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-6">
//                           <div className="input-blocks">
//                             <label>Unit *</label>
//                             <Select
//                               className="select"
//                               options={unitOptions}
//                               value={unitOptions.find(
//                                 (u) => u.value === formData.unit_
//                               )}
//                               onChange={(option) =>
//                                 setFormData({
//                                   ...formData,
//                                   unit_: option?.value || "piece",
//                                 })
//                               }
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-12">
//                           <div className="mb-3">
//                             <label className="form-label">Dimensions</label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               name="dimensions"
//                               value={formData.dimensions}
//                               onChange={handleInputChange}
//                               placeholder="e.g., 10x20x30 cm"
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-12">
//                           <div className="mb-3">
//                             <label className="form-label">Description</label>
//                             <textarea
//                               className="form-control"
//                               name="description"
//                               value={formData.description}
//                               onChange={handleInputChange}
//                               rows="3"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="modal-footer-btn">
//                         <button
//                           type="button"
//                           className="btn btn-cancel me-2"
//                           data-bs-dismiss="modal"
//                           onClick={resetForm}
//                         >
//                           Cancel
//                         </button>
//                         <button type="submit" className="btn btn-submit">
//                           {editingId ? "Save Changes" : "Create Article"}
//                         </button>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ArticleProfile;





















import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Filter, Sliders, Plus, X } from "react-feather";
import { PlusCircle } from "feather-icons-react/build/IconComponents";
import Select from "react-select";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import TableHeaderActions from "../tableheader";
import { setToogleHeader } from "../../core/redux/action";
import {
  fetchArticles,
  fetchArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  setFilters,
  clearCurrentArticle,
  clearError,
} from '../../core/redux/slices/articleSlice';
import AuthService from "../../services/authService";
import { usePermissions } from "../../hooks/usePermission"; 

const ArticleProfile = () => {
  const dispatch = useDispatch();
  
  const { hasPermission } = usePermissions();
  
  // Redux state
  const { 
    article_list, 
    currentArticle,
    status, 
    filters,
    error 
  } = useSelector((state) => state.articles);
  
  // Get current user from Redux or context
  const currentUser = useSelector((state) => state.auth?.user); // Adjust based on your auth structure
  
  const headerState = useSelector((state) => state.toggle_header);

  // Local state
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [glossaries, setGlossaries] = useState([]);
  const [attributes, setAttributes] = useState([{ glossary_id: "", value: "" }]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    brand: "",
    model: "",
    year: new Date(),
    sku: "",
    weight: "",
    dimensions: "",
    unit_: "piece",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    handleRefresh();
    fetchGlossaries();
  }, []);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
        timer: 2000,
      });
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (currentArticle) {
      const attributesArray = [];
      if (currentArticle.attributes && typeof currentArticle.attributes === 'object') {
        Object.entries(currentArticle.attributes).forEach(([key, value]) => {
          const glossary = glossaries.find(g => g.title === key);
          if (glossary) {
            attributesArray.push({
              glossary_id: glossary.id.toString(),
              value: value
            });
          }
        });
      }

      let dimensionsStr = "";
      if (currentArticle.dimensions) {
        const dim = currentArticle.dimensions;
        dimensionsStr = `${dim.length}x${dim.width}x${dim.height}`;
      }

      setFormData({
        title: currentArticle.title || "",
        category: currentArticle.category || "",
        brand: currentArticle.brand || "",
        model: currentArticle.model || "",
        year: currentArticle.manufacturing_year ? new Date(currentArticle.manufacturing_year, 0) : new Date(),
        sku: currentArticle.sku || "",
        weight: currentArticle.weight || "",
        dimensions: dimensionsStr,
        unit_: currentArticle.unit || "piece",
        description: currentArticle.description || "",
      });

      setAttributes(attributesArray.length > 0 ? attributesArray : [{ glossary_id: "", value: "" }]);
    }
  }, [currentArticle, glossaries]);

  const handleRefresh = () => {
    dispatch(fetchArticles(filters));
  };

  const fetchGlossaries = async () => {
    try {
      const response = await AuthService.getGlossaries();
      setGlossaries(response.data.data.glossaries || []);
    } catch (error) {
      console.error("Error fetching glossaries:", error);
    }
  };

  const debouncedSearch = useCallback(
    debounce((searchValue) => {
      dispatch(setFilters({ search: searchValue }));
      dispatch(fetchArticles({ ...filters, search: searchValue }));
    }, 500),
    [dispatch, filters]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    dispatch(setFilters({ search: value }));
    debouncedSearch(value);
  };

  const handleSearch = () => {
    handleRefresh();
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleYearChange = (date) => {
    setFormData({ ...formData, year: date });
  };

  const addAttribute = () => {
    setAttributes([...attributes, { glossary_id: "", value: "" }]);
  };

  const removeAttribute = (index) => {
    const newAttributes = attributes.filter((_, i) => i !== index);
    setAttributes(newAttributes);
  };

  const handleAttributeGlossaryChange = (index, selectedOption) => {
    const newAttributes = [...attributes];
    newAttributes[index].glossary_id = selectedOption?.value || "";
    newAttributes[index].value = "";
    setAttributes(newAttributes);
  };

  const handleAttributeValueChange = (index, value) => {
    const newAttributes = [...attributes];
    newAttributes[index].value = value;
    setAttributes(newAttributes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const more_attr = {};
      attributes
        .filter((attr) => attr.glossary_id && attr.value)
        .forEach((attr) => {
          const glossary = glossaries.find(g => g.id === parseInt(attr.glossary_id));
          if (glossary) {
            more_attr[glossary.title] = attr.value;
          }
        });

      let dimensionsObj = null;
      if (formData.dimensions) {
        if (typeof formData.dimensions === 'string') {
          const dims = formData.dimensions.split('x').map(d => parseFloat(d.trim()));
          if (dims.length === 3 && dims.every(d => !isNaN(d))) {
            dimensionsObj = {
              length: dims[0],
              width: dims[1],
              height: dims[2]
            };
          }
        } else {
          dimensionsObj = formData.dimensions;
        }
      }

      const submitData = {
        art_prof_title: formData.title,
        category: formData.category,
        brand: formData.brand,
        model: formData.model,
        mfg_yr: formData.year.getFullYear(),
        more_attr: Object.keys(more_attr).length > 0 ? more_attr : undefined,
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
        dim: dimensionsObj,
        unit: formData.unit_,
        desc: formData.description || undefined,
        last_updated_by: currentUser?.id || 'System'
      };

      Object.keys(submitData).forEach(key => 
        submitData[key] === undefined && delete submitData[key]
      );

      if (editingId) {
        await dispatch(updateArticle({ id: editingId, data: submitData })).unwrap();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Article updated successfully",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await dispatch(createArticle(submitData)).unwrap();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Article created successfully",
          timer: 2000,
          showConfirmButton: false,
        });
      }

      closeModal(editingId ? "edit-units" : "add-units");
      resetForm();
      handleRefresh();
    } catch (error) {
      console.error("Error saving article:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error || "Failed to save article",
        timer: 3000,
      });
    }
  };

  const closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    const backdrop = document.querySelector(".modal-backdrop");

    if (modal) {
      modal.classList.remove("show");
      modal.style.display = "none";
      document.body.classList.remove("modal-open");
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("padding-right");
    }

    if (backdrop) {
      backdrop.remove();
    }
  };

  const handleEdit = async (id) => {
    try {
      await dispatch(fetchArticleById(id)).unwrap();
      setEditingId(id);
    } catch (error) {
      console.error("Error fetching article:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch article details",
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
        await dispatch(deleteArticle(id)).unwrap();
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Article has been deleted.",
          timer: 2000,
          showConfirmButton: false,
        });
        handleRefresh();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error || "Failed to delete article",
          timer: 3000,
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      brand: "",
      model: "",
      year: new Date(),
      sku: "",
      weight: "",
      dimensions: "",
      unit_: "piece",
      description: "",
    });
    setAttributes([{ glossary_id: "", value: "" }]);
    setEditingId(null);
    dispatch(clearCurrentArticle());
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(article_list.map((a) => a.id));
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
    { value: "created_at_desc", label: "Sort by Date (Newest)" },
    { value: "created_at_asc", label: "Sort by Date (Oldest)" },
    { value: "title_asc", label: "Sort by Title (A-Z)" },
    { value: "title_desc", label: "Sort by Title (Z-A)" },
  ];

  const unitOptions = [
    { value: "piece", label: "Piece" },
    { value: "gram", label: "Gram" },
    { value: "kilogram", label: "Kilogram" },
    { value: "metre", label: "Metre" },
    { value: "litre", label: "Litre" },
  ];

  const glossaryOptions = glossaries.map((g) => ({
    label: g.title || g.name,
    value: g.id,
  }));

  // Helper function to format dimensions
  const formatDimensions = (dimensions) => {
    if (!dimensions) return "N/A";
    if (typeof dimensions === 'object') {
      return `${dimensions.length}×${dimensions.width}×${dimensions.height}`;
    }
    return dimensions;
  };

  
  // const formatAttributes = (attributes) => {
  //   if (!attributes || typeof attributes !== 'object' || Object.keys(attributes).length === 0) {
  //     return "No attributes";
  //   }
  //   return Object.entries(attributes).map(([key, value]) => 
  //     `${key}: ${value}`
  //   ).join(', ');
  // };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Article Profile</h4>
              <h6>Manage Your Article Profiles</h6>
            </div>
          </div>
          <TableHeaderActions
            onRefresh={handleRefresh}
            pdfEndpoint="/auth/export/articles/pdf"
            excelEndpoint="/auth/export/articles/excel"
            entityName="articles"
            dispatch={dispatch}
            headerState={headerState}
            headerAction={setToogleHeader}
            showPrint={true}
          />
          {hasPermission("Article Profile", "create") && (
            <div className="page-btn">
              <a
                href="#"
                className="btn btn-added"
                data-bs-toggle="modal"
                data-bs-target="#add-units"
                onClick={resetForm}
              >
                <PlusCircle className="me-2" /> Add New Article
              </a>
            </div>
          )}
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
                    onChange={handleSearchChange}
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
                    <ImageWithBasePath
                      src="assets/img/icons/closes.svg"
                      alt="img"
                    />
                  </span>
                </Link>
              </div>
              <div className="form-sort stylewidth">
                <Sliders className="info-img" />
                <Select
                  className="select"
                  options={sortOptions}
                  placeholder="Sort by Date"
                  onChange={(option) => {
                    dispatch(setFilters({ sortBy: option?.value }));
                    setTimeout(handleRefresh, 100);
                  }}
                />
              </div>
            </div>

            <div className="table-responsive">
              {status === "loading" ? (
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
                            checked={
                              selectedIds.length === article_list.length &&
                              article_list.length > 0
                            }
                            onChange={handleSelectAll}
                          />
                          <span className="checkmarks" />
                        </label>
                      </th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Brand</th>
                      <th>Model</th>
                      <th>Year</th>
                      <th>SKU</th>
                      <th>Attributes</th>
                      <th>Weight</th>
                      <th>Dimensions</th>
                      <th>Unit</th>
                      <th>Description</th>
                      <th>Updated By</th>
                      <th>Created On</th>
                      {hasPermission("Article Profile", "view") && (
                        <th className="no-sort">Action</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {article_list.length === 0 ? (
                      <tr>
                        <td colSpan="15" className="text-center">
                          No articles found
                        </td>
                      </tr>
                    ) : (
                      article_list.map((article) => {
                        return (
                          <tr key={article.id}>
                            <td>
                              <label className="checkboxs">
                                <input
                                  type="checkbox"
                                  checked={selectedIds.includes(article.id)}
                                  onChange={() => handleSelectOne(article.id)}
                                />
                                <span className="checkmarks" />
                              </label>
                            </td>
                            <td>{article.title}</td>
                            <td>{article.category || "N/A"}</td>
                            <td>{article.brand || "N/A"}</td>
                            <td>{article.model || "N/A"}</td>
                            <td>{article.manufacturing_year || "N/A"}</td>
                            <td>{article.sku || "N/A"}</td>
                            {/* <td style={{ maxWidth: "200px" }}>
                              {formatAttributes(article.attributes)}
                            </td> */}
                             <td>
                              {article.attributes && typeof article.attributes === 'object' && Object.keys(article.attributes).length > 0 ? (
                                <span 
                                  title={Object.entries(article.attributes).map(
                                    ([key, value]) => `${key}: ${value}`
                                  ).join(', ')}
                                  style={{ cursor: 'pointer' }}
                                >
                                  {Object.keys(article.attributes).length} attribute{Object.keys(article.attributes).length !== 1 ? 's' : ''}
                                </span>
                              ) : (
                                "No attributes"
                              )}
                            </td>
                            <td>{article.weight || "N/A"}</td>
                            <td>{formatDimensions(article.dimensions)}</td>
                            <td>
                              <span className="badge badge-linesuccess">
                                {article.unit}
                              </span>
                            </td>
                            <td
                              style={{
                                maxWidth: "200px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              <span title={article.description || "N/A"}>
                                {article.description || "N/A"}
                              </span>
                            </td>
                            <td>{article.updated_by_username || "Unknown"}</td>
                            {/* <td>
                              {new Date(article.created_at).toLocaleDateString()}
                            </td> */}
                            <td>
                             {new Date(article.created_at).toLocaleString()}
                            </td>

                            {hasPermission("Article Profile", "view") && (
                              <td className="action-table-data">
                                <div className="edit-delete-action">
                                  <Link
                                    className="me-2 edit-icon p-2"
                                    to="#"
                                    onClick={() => handleEdit(article.id)}
                                    data-bs-toggle="modal"
                                    data-bs-target="#edit-units"
                                  >
                                    <i data-feather="eye" className="feather-eye" />
                                  </Link>
                                  {hasPermission("Article Profile", "update") && (
                                    <Link
                                      className="me-2 p-2"
                                      to="#"
                                      onClick={() => handleEdit(article.id)}
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit-units"
                                    >
                                      <i
                                        data-feather="edit"
                                        className="feather-edit"
                                      />
                                    </Link>
                                  )}
                                  {hasPermission("Article Profile", "delete") && (
                                    <Link
                                      className="confirm-text p-2"
                                      to="#"
                                      onClick={() => handleDelete(article.id)}
                                    >
                                      <i
                                        data-feather="trash-2"
                                        className="feather-trash-2"
                                      />
                                    </Link>
                                  )}
                                </div>
                              </td>
                            )}
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {["add-units", "edit-units"].map((modalId) => (
        <div className="modal fade" id={modalId} key={modalId}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="page-wrapper-new p-0">
                <div className="content">
                  <div className="modal-header border-0 custom-modal-header">
                    <div className="page-title">
                      <h4>{editingId ? "Edit" : "Add"} Article</h4>
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
                          Article Info
                        </h6>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">Title *</label>
                            <input
                              type="text"
                              className="form-control"
                              name="title"
                              value={formData.title}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">Category *</label>
                            <input
                              type="text"
                              className="form-control"
                              name="category"
                              value={formData.category}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">Brand *</label>
                            <input
                              type="text"
                              className="form-control"
                              name="brand"
                              value={formData.brand}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="mb-3">
                            <label className="form-label">Model *</label>
                            <input
                              type="text"
                              className="form-control"
                              name="model"
                              value={formData.model}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="mb-3">
                            <label className="form-label">Year *</label> 
                            <DatePicker
                              selected={formData.year}
                              onChange={handleYearChange}
                              showYearPicker
                              dateFormat="yyyy"
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                      
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Attributes
                              <button
                                type="button"
                                className="btn btn-sm btn-primary ms-2"
                                onClick={addAttribute}
                              >
                                <Plus size={16} /> Add Attribute
                              </button>
                            </label>
                            {attributes.map((attr, index) => (
                              <div
                                key={index}
                                className="row align-items-end mb-2"
                              >
                                <div className="col-5">
                                  <Select
                                    className="select"
                                    options={glossaryOptions}
                                    value={glossaryOptions.find(
                                      (g) => g.value === parseInt(attr.glossary_id)
                                    )}
                                    onChange={(option) =>
                                      handleAttributeGlossaryChange(index, option)
                                    }
                                    placeholder="Select Attribute Type"
                                    isClearable
                                  />
                                </div>
                                <div className="col-5">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter value"
                                    value={attr.value}
                                    onChange={(e) =>
                                      handleAttributeValueChange(index, e.target.value)
                                    }
                                    disabled={!attr.glossary_id}
                                  />
                                </div>
                                <div className="col-2">
                                  {attributes.length > 1 && (
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-danger"
                                      onClick={() => removeAttribute(index)}
                                    >
                                      <X size={16} />
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">Weight</label>
                            <input
                              type="number"
                              className="form-control"
                              name="weight"
                              value={formData.weight}
                              onChange={handleInputChange}
                              step="0.01"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="input-blocks">
                            <label>Unit *</label>
                            <Select
                              className="select"
                              options={unitOptions}
                              value={unitOptions.find(
                                (u) => u.value === formData.unit_
                              )}
                              onChange={(option) =>
                                setFormData({
                                  ...formData,
                                  unit_: option?.value || "piece",
                                })
                              }
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">Dimensions (LxWxH)</label>
                            <input
                              type="text"
                              className="form-control"
                              name="dimensions"
                              value={formData.dimensions}
                              onChange={handleInputChange}
                              placeholder="e.g., 10x20x30"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                              className="form-control"
                              name="description"
                              value={formData.description}
                              onChange={handleInputChange}
                              rows="3"
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
                          {editingId ? "Save Changes" : "Create Article"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleProfile;