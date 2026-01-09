// import React, { useState,useEffect } from "react";
// import { Link } from "react-router-dom";
// import Select from "react-select";
// import { all_routes } from "../../Router/all_routes";
// // import { DatePicker } from "antd";
// import Addunits from "../../core/modals/inventory/addunits";
// import AddCategory from "../../core/modals/inventory/addcategory";
// import AddBrand from "../../core/modals/addbrand";
// import {
//   ArrowLeft,
//   // Calendar,
//   ChevronDown,
//   ChevronUp,
//   Info,
//   // LifeBuoy,
//   // List,
//   // PlusCircle,
//   // Trash2,
//   // X,
// } from "feather-icons-react/build/IconComponents";
// import { useDispatch, useSelector } from "react-redux";
// import { setToogleHeader } from "../../core/redux/action";
// import { OverlayTrigger, Tooltip } from "react-bootstrap";
// import AuthService from "../../services/authService";
// // import ImageWithBasePath from "../../core/img/imagewithbasebath";

// const AddProduct = () => {
//   const [articleProfile,setArticleProfiles] = useState([])
//   const [warehouse,setWarehouse] = useState([])
//   const [productName,setProductName] = useState([])
//   // const [Status,setStatus] = useState([])

//   const route = all_routes;
//   const dispatch = useDispatch();

//   const data = useSelector((state) => state.toggle_header);

 

//     useEffect(() => {
//       // fetchUsers();
//       fetchArticleProfile();
//       fetchWarehouse();
//     }, []);

//   const renderCollapseTooltip = (props) => (
//     <Tooltip id="refresh-tooltip" {...props}>
//       Collapse
//     </Tooltip>
//   );

// const fetchArticleProfile = async() => {
//   try {
//     const res = await AuthService.getArticleProfile();

//     const formatted = res.data.data.map(item => ({
//   value: item.id,
//   label: item.name
// }));

//     setArticleProfiles(formatted)
//   } catch (error) {
//     console.error("Failed to load Article Profile",error)
//   }
// }

// const fetchWarehouse = async() =>{
//   try {
//     const res = await AuthService.getWarehouse();
//    const formatted = res.data.data.map(item => ({
//   value: item.id,
//   label: item.name
// }));

//     setWarehouse(formatted)
//   } catch (error) {
//     console.error("Failed to load Warehouses")
//   }
// }

//   // const article = [
//   //   { value: "choose", label: "Choose" },
//   //   { value: "thomas", label: "Thomas" },
//   //   { value: "rasmussen", label: "Rasmussen" },
//   //   { value: "fredJohn", label: "Fred John" },
//   // ];
//   // const warehouse = [
//   //   { value: "choose", label: "Choose" },
//   //   { value: "legendary", label: "Legendary" },
//   //   { value: "determined", label: "Determined" },
//   //   { value: "sincere", label: "Sincere" },
//   // ];
//   // const category = [
//   //   { value: "choose", label: "Choose" },
//   //   { value: "lenovo", label: "Lenovo" },
//   //   { value: "electronics", label: "Electronics" },
//   // ];
//   // const subcategory = [
//   //   { value: "choose", label: "Choose" },
//   //   { value: "lenovo", label: "Lenovo" },
//   //   { value: "electronics", label: "Electronics" },
//   // ];
//   // const subsubcategories = [
//   //   { value: "Fruits", label: "Fruits" },
//   //   { value: "Computer", label: "Computer" },
//   //   { value: "Shoes", label: "Shoes" },
//   // ];
//   // const brand = [
//   //   { value: "choose", label: "Choose" },
//   //   { value: "nike", label: "Nike" },
//   //   { value: "bolt", label: "Bolt" },
//   // ];
//   // const unit = [
//   //   { value: "choose", label: "Choose" },
//   //   { value: "kg", label: "Kg" },
//   //   { value: "pc", label: "Pc" },
//   // ];
//   // const sellingtype = [
//   //   { value: "choose", label: "Choose" },
//   //   { value: "transactionalSelling", label: "Transactional selling" },
//   //   { value: "solutionSelling", label: "Solution selling" },
//   // ];
//   // const barcodesymbol = [
//   //   { value: "choose", label: "Choose" },
//   //   { value: "code34", label: "Code34" },
//   //   { value: "code35", label: "Code35" },
//   //   { value: "code36", label: "Code36" },
//   // ];

//   return (
//     <div className="page-wrapper">
//       <div className="content">
//         <div className="page-header">
//           <div className="add-item d-flex">
//             <div className="page-title">
//               <h4>New Product</h4>
//               <h6>Create new product</h6>
//             </div>
//           </div>
//           <ul className="table-top-head">
//             <li>
//               <div className="page-btn">
//                 <Link to={route.productlist} className="btn btn-secondary">
//                   <ArrowLeft className="me-2" />
//                   Back to Product
//                 </Link>
//               </div>
//             </li>
//             <li>
//               <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
//                 <Link
//                   data-bs-toggle="tooltip"
//                   data-bs-placement="top"
//                   title="Collapse"
//                   id="collapse-header"
//                   className={data ? "active" : ""}
//                   onClick={() => {
//                     dispatch(setToogleHeader(!data));
//                   }}
//                 >
//                   <ChevronUp className="feather-chevron-up" />
//                 </Link>
//               </OverlayTrigger>
//             </li>
//           </ul>
//         </div>
//         {/* /add */}
//         <form>
//           <div className="card">
//             <div className="card-body add-product pb-0">
//               <div
//                 className="accordion-card-one accordion"
//                 id="accordionExample"
//               >
//                 <div className="accordion-item">
//                   <div className="accordion-header" id="headingOne">
//                     <div
//                       className="accordion-button"
//                       data-bs-toggle="collapse"
//                       data-bs-target="#collapseOne"
//                       aria-controls="collapseOne"
//                     >
//                       <div className="addproduct-icon">
//                         <h5>
//                           <Info className="add-info" />

//                           <span>Product Information</span>
//                         </h5>
//                         <Link to="#">
//                           <ChevronDown className="chevron-down-add" />
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                   <div
//                     id="collapseOne"
//                     className="accordion-collapse collapse show"
//                     aria-labelledby="headingOne"
//                     data-bs-parent="#accordionExample"
//                   >
//                     <div className="accordion-body">
//                       <div className="row">
//                         <div className="col-lg-4 col-sm-6 col-12">
//                           <div className="mb-3 add-product">
//                             <label className="form-label">Article Profile</label>
//                             <Select
//                               className="select"
//                               options={articleProfile}
//                               placeholder="Choose"
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-4 col-sm-6 col-12">
//                           <div className="mb-3 add-product">
//                             <label className="form-label">Warehouse</label>
//                             <Select
//                               className="select"
//                               options={warehouse}
//                               placeholder="Choose"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="row">
//                         <div className="col-lg-4 col-sm-6 col-12">
//                           <div className="mb-3 add-product">
//                             <label className="form-label">Product Name</label>
//                            <input
//   type="text"
//   className="form-control"
//   value={productName}
//   onChange={(e) => setProductName(e.target.value)}
// />
//                           </div>
//                         </div>
//                         {/* <div className="col-lg-4 col-sm-6 col-12">
//                           <div className="mb-3 add-product">
//                             <label className="form-label">Slug</label>
//                             <input type="text" className="form-control" />
//                           </div>
//                         </div> */}
//                           <div className="col-lg-4 col-sm-6 col-12">
//                           <div className="mb-3 add-product">
//                             <label className="form-label">Status</label>
//                             <Select
//                               className="select"
//                               options={status}
//                               placeholder="Choose"
//                             />
//                           </div>
//                         </div>
                  
//                       </div>
//                       {/* <div className="addservice-info">
//                         <div className="row">
//                           <div className="col-lg-4 col-sm-6 col-12">
//                             <div className="mb-3 add-product">
//                               <div className="add-newplus">
//                                 <label className="form-label">Category</label>
//                                 <Link
//                                   to="#"
//                                   data-bs-toggle="modal"
//                                   data-bs-target="#add-units-category"
//                                 >
//                                   <PlusCircle className="plus-down-add" />
//                                   <span>Add New</span>
//                                 </Link>
//                               </div>
//                               <Select
//                                 className="select"
//                                 options={category}
//                                 placeholder="Choose"
//                               />
//                             </div>
//                           </div>
//                           <div className="col-lg-4 col-sm-6 col-12">
//                             <div className="mb-3 add-product">
//                               <label className="form-label">Sub Category</label>
//                               <Select
//                                 className="select"
//                                 options={subcategory}
//                                 placeholder="Choose"
//                               />
//                             </div>
//                           </div>
//                           <div className="col-lg-4 col-sm-6 col-12">
//                             <div className="mb-3 add-product">
//                               <label className="form-label">
//                                 Sub Sub Category
//                               </label>
//                               <Select
//                                 className="select"
//                                 options={subsubcategories}
//                                 placeholder="Choose"
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="add-product-new">
//                         <div className="row">
//                           <div className="col-lg-4 col-sm-6 col-12">
//                             <div className="mb-3 add-product">
//                               <div className="add-newplus">
//                                 <label className="form-label">Brand</label>
//                                 <Link
//                                   to="#"
//                                   data-bs-toggle="modal"
//                                   data-bs-target="#add-units-brand"
//                                 >
//                                   <PlusCircle className="plus-down-add" />
//                                   <span>Add New</span>
//                                 </Link>
//                               </div>
//                               <Select
//                                 className="select"
//                                 options={brand}
//                                 placeholder="Choose"
//                               />
//                             </div>
//                           </div>
//                           <div className="col-lg-4 col-sm-6 col-12">
//                             <div className="mb-3 add-product">
//                               <div className="add-newplus">
//                                 <label className="form-label">Unit</label>
//                                 <Link
//                                   to="#"
//                                   data-bs-toggle="modal"
//                                   data-bs-target="#add-unit"
//                                 >
//                                   <PlusCircle className="plus-down-add" />
//                                   <span>Add New</span>
//                                 </Link>
//                               </div>
//                               <Select
//                                 className="select"
//                                 options={unit}
//                                 placeholder="Choose"
//                               />
//                             </div>
//                           </div>
//                           <div className="col-lg-4 col-sm-6 col-12">
//                             <div className="mb-3 add-product">
//                               <label className="form-label">Selling Type</label>
//                               <Select
//                                 className="select"
//                                 options={sellingtype}
//                                 placeholder="Choose"
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       </div> */}
//                       <div className="row">
//                         {/* <div className="col-lg-6 col-sm-6 col-12">
//                           <div className="mb-3 add-product">
//                             <label className="form-label">
//                               Barcode Symbology
//                             </label>
//                             <Select
//                               className="select"
//                               options={barcodesymbol}
//                               placeholder="Choose"
//                             />
//                           </div>
//                         </div> */}
//                         {/* <div className="col-lg-6 col-sm-6 col-12">
//                           <div className="input-blocks add-product list">
//                             <label>Item Code</label>
//                             <input
//                               type="text"
//                               className="form-control list"
//                               placeholder="Please Enter Item Code"
//                             />
//                             <Link
//                               to={route.addproduct}
//                               className="btn btn-primaryadd"
//                             >
//                               Generate Code
//                             </Link>
//                           </div>
//                         </div> */}
//                       </div>
//                       {/* Editor */}
//                       <div className="col-lg-12">
//                         <div className="input-blocks summer-description-box transfer mb-3">
//                           <label>Description</label>
//                           <textarea
//                             className="form-control h-100"
//                             rows={5}
//                             defaultValue={""}
//                           />
//                           <p className="mt-1">Maximum 60 Characters</p>
//                         </div>
//                       </div>
//                       {/* /Editor */}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {/* <div
//                 className="accordion-card-one accordion"
//                 id="accordionExample2"
//               >
//                 <div className="accordion-item">
//                   <div className="accordion-header" id="headingTwo">
//                     <div
//                       className="accordion-button"
//                       data-bs-toggle="collapse"
//                       data-bs-target="#collapseTwo"
//                       aria-controls="collapseTwo"
//                     >
//                       <div className="text-editor add-list">
//                         <div className="addproduct-icon list icon">
//                           <h5>
//                             <LifeBuoy className="add-info" />
//                             <span>Pricing &amp; Stocks</span>
//                           </h5>
//                           <Link to="#">
//                             <ChevronDown className="chevron-down-add" />
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div
//                     id="collapseTwo"
//                     className="accordion-collapse collapse show"
//                     aria-labelledby="headingTwo"
//                     data-bs-parent="#accordionExample2"
//                   >
//                     <div className="accordion-body">
//                       <div className="input-blocks add-products">
//                         <label className="d-block">Product Type</label>
//                         <div className="single-pill-product">
//                           <ul
//                             className="nav nav-pills"
//                             id="pills-tab1"
//                             role="tablist"
//                           >
//                             <li className="nav-item" role="presentation">
//                               <span
//                                 className="custom_radio me-4 mb-0 active"
//                                 id="pills-home-tab"
//                                 data-bs-toggle="pill"
//                                 data-bs-target="#pills-home"
//                                 role="tab"
//                                 aria-controls="pills-home"
//                                 aria-selected="true"
//                               >
//                                 <input
//                                   type="radio"
//                                   className="form-control"
//                                   name="payment"
//                                 />
//                                 <span className="checkmark" /> Single Product
//                               </span>
//                             </li>
//                             <li className="nav-item" role="presentation">
//                               <span
//                                 className="custom_radio me-2 mb-0"
//                                 id="pills-profile-tab"
//                                 data-bs-toggle="pill"
//                                 data-bs-target="#pills-profile"
//                                 role="tab"
//                                 aria-controls="pills-profile"
//                                 aria-selected="false"
//                               >
//                                 <input
//                                   type="radio"
//                                   className="form-control"
//                                   name="sign"
//                                 />
//                                 <span className="checkmark" /> Variable Product
//                               </span>
//                             </li>
//                           </ul>
//                         </div>
//                       </div>
//                       <div className="tab-content" id="pills-tabContent">
//                         <div
//                           className="tab-pane fade show active"
//                           id="pills-home"
//                           role="tabpanel"
//                           aria-labelledby="pills-home-tab"
//                         >
//                           <div className="row">
//                             <div className="col-lg-4 col-sm-6 col-12">
//                               <div className="input-blocks add-product">
//                                 <label>Quantity</label>
//                                 <input type="text" className="form-control" />
//                               </div>
//                             </div>
//                             <div className="col-lg-4 col-sm-6 col-12">
//                               <div className="input-blocks add-product">
//                                 <label>Price</label>
//                                 <input type="text" className="form-control" />
//                               </div>
//                             </div>
//                             <div className="col-lg-4 col-sm-6 col-12">
//                               <div className="input-blocks add-product">
//                                 <label>Tax Type</label>
//                                 <Select
//                                   className="select"
//                                   options={taxtype}
//                                   placeholder="Select Option"
//                                 />
//                               </div>
//                             </div>
//                           </div>
//                           <div className="row">
//                             <div className="col-lg-4 col-sm-6 col-12">
//                               <div className="input-blocks add-product">
//                                 <label>Discount Type</label>
//                                 <Select
//                                   className="select"
//                                   options={discounttype}
//                                   placeholder="Choose"
//                                 />
//                               </div>
//                             </div>
//                             <div className="col-lg-4 col-sm-6 col-12">
//                               <div className="input-blocks add-product">
//                                 <label>Discount Value</label>
//                                 <input type="text" placeholder="Choose" />
//                               </div>
//                             </div>
//                             <div className="col-lg-4 col-sm-6 col-12">
//                               <div className="input-blocks add-product">
//                                 <label>Quantity Alert</label>
//                                 <input type="text" className="form-control" />
//                               </div>
//                             </div>
//                           </div>
//                           <div
//                             className="accordion-card-one accordion"
//                             id="accordionExample3"
//                           >
//                             <div className="accordion-item">
//                               <div
//                                 className="accordion-header"
//                                 id="headingThree"
//                               >
//                                 <div
//                                   className="accordion-button"
//                                   data-bs-toggle="collapse"
//                                   data-bs-target="#collapseThree"
//                                   aria-controls="collapseThree"
//                                 >
//                                   <div className="addproduct-icon list">
//                                     <h5>
//                                       <i
//                                         data-feather="image"
//                                         className="add-info"
//                                       />
//                                       <span>Images</span>
//                                     </h5>
//                                     <Link to="#">
//                                       <ChevronDown className="chevron-down-add" />
//                                     </Link>
//                                   </div>
//                                 </div>
//                               </div>
//                               <div
//                                 id="collapseThree"
//                                 className="accordion-collapse collapse show"
//                                 aria-labelledby="headingThree"
//                                 data-bs-parent="#accordionExample3"
//                               >
//                                 <div className="accordion-body">
//                                   <div className="text-editor add-list add">
//                                     <div className="col-lg-12">
//                                       <div className="add-choosen">
//                                         <div className="input-blocks">
//                                           <div className="image-upload">
//                                             <input type="file" />
//                                             <div className="image-uploads">
//                                               <PlusCircle className="plus-down-add me-0" />
//                                               <h4>Add Images</h4>
//                                             </div>
//                                           </div>
//                                         </div>
//                                         {isImageVisible1 && (
//                                           <div className="phone-img">
//                                             <ImageWithBasePath
//                                               src="assets/img/products/phone-add-2.png"
//                                               alt="image"
//                                             />
//                                             <Link to="#">
//                                               <X
//                                                 className="x-square-add remove-product"
//                                                 onClick={handleRemoveProduct1}
//                                               />
//                                             </Link>
//                                           </div>
//                                         )}
//                                         {isImageVisible && (
//                                           <div className="phone-img">
//                                             <ImageWithBasePath
//                                               src="assets/img/products/phone-add-1.png"
//                                               alt="image"
//                                             />
//                                             <Link to="#">
//                                               <X
//                                                 className="x-square-add remove-product"
//                                                 onClick={handleRemoveProduct}
//                                               />
//                                             </Link>
//                                           </div>
//                                         )}
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div
//                           className="tab-pane fade"
//                           id="pills-profile"
//                           role="tabpanel"
//                           aria-labelledby="pills-profile-tab"
//                         >
//                           <div className="row select-color-add">
//                             <div className="col-lg-6 col-sm-6 col-12">
//                               <div className="input-blocks add-product">
//                                 <label>Variant Attribute</label>
//                                 <div className="row">
//                                   <div className="col-lg-10 col-sm-10 col-10">
//                                     <select
//                                       className="form-control variant-select select-option"
//                                       id="colorSelect"
//                                     >
//                                       <option>Choose</option>
//                                       <option>Color</option>
//                                       <option value="red">Red</option>
//                                       <option value="black">Black</option>
//                                     </select>
//                                   </div>
//                                   <div className="col-lg-2 col-sm-2 col-2 ps-0">
//                                     <div className="add-icon tab">
//                                       <Link
//                                         className="btn btn-filter"
//                                         data-bs-toggle="modal"
//                                         data-bs-target="#add-units"
//                                       >
//                                         <PlusCircle className="feather feather-plus-circle" />
//                                       </Link>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                               <div
//                                 className="selected-hide-color"
//                                 id="input-show"
//                               >
//                                 <div className="row align-items-center">
//                                   <div className="col-sm-10">
//                                     <div className="input-blocks">
//                                       <input
//                                         className="input-tags form-control"
//                                         id="inputBox"
//                                         type="text"
//                                         data-role="tagsinput"
//                                         name="specialist"
//                                         defaultValue="red, black"
//                                       />
//                                     </div>
//                                   </div>
//                                   <div className="col-lg-2">
//                                     <div className="input-blocks ">
//                                       <Link to="#" className="remove-color">
//                                         <Trash2 />
//                                       </Link>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                           <div
//                             className="modal-body-table variant-table"
//                             id="variant-table"
//                           >
//                             <div className="table-responsive">
//                               <table className="table">
//                                 <thead>
//                                   <tr>
//                                     <th>Variantion</th>
//                                     <th>Variant Value</th>
//                                     <th>SKU</th>
//                                     <th>Quantity</th>
//                                     <th>Price</th>
//                                     <th className="no-sort">Action</th>
//                                   </tr>
//                                 </thead>
//                                 <tbody>
//                                   <tr>
//                                     <td>
//                                       <div className="add-product">
//                                         <input
//                                           type="text"
//                                           className="form-control"
//                                           defaultValue="color"
//                                         />
//                                       </div>
//                                     </td>
//                                     <td>
//                                       <div className="add-product">
//                                         <input
//                                           type="text"
//                                           className="form-control"
//                                           defaultValue="red"
//                                         />
//                                       </div>
//                                     </td>
//                                     <td>
//                                       <div className="add-product">
//                                         <input
//                                           type="text"
//                                           className="form-control"
//                                           defaultValue={1234}
//                                         />
//                                       </div>
//                                     </td>
//                                     <td>
//                                       <div className="product-quantity">
//                                         <span className="quantity-btn">
//                                           <i
//                                             data-feather="minus-circle"
//                                             className="feather-search"
//                                           />
//                                         </span>
//                                         <input
//                                           type="text"
//                                           className="quntity-input"
//                                           defaultValue={2}
//                                         />
//                                         <span className="quantity-btn">
//                                           +
//                                           <i
//                                             data-feather="plus-circle"
//                                             className="plus-circle"
//                                           />
//                                         </span>
//                                       </div>
//                                     </td>
//                                     <td>
//                                       <div className="add-product">
//                                         <input
//                                           type="text"
//                                           className="form-control"
//                                           defaultValue={50000}
//                                         />
//                                       </div>
//                                     </td>
//                                     <td className="action-table-data">
//                                       <div className="edit-delete-action">
//                                         <div className="input-block add-lists">
//                                           <label className="checkboxs">
//                                             <input
//                                               type="checkbox"
//                                               defaultChecked=""
//                                             />
//                                             <span className="checkmarks" />
//                                           </label>
//                                         </div>
//                                         <Link
//                                           className="me-2 p-2"
//                                           to="#"
//                                           data-bs-toggle="modal"
//                                           data-bs-target="#add-variation"
//                                         >
//                                           <i
//                                             data-feather="plus"
//                                             className="feather-edit"
//                                           />
//                                         </Link>
//                                         <Link
//                                           className="confirm-text p-2"
//                                           to="#"
//                                         >
//                                           <i
//                                             data-feather="trash-2"
//                                             className="feather-trash-2"
//                                           />
//                                         </Link>
//                                       </div>
//                                     </td>
//                                   </tr>
//                                   <tr>
//                                     <td>
//                                       <div className="add-product">
//                                         <input
//                                           type="text"
//                                           className="form-control"
//                                           defaultValue="color"
//                                         />
//                                       </div>
//                                     </td>
//                                     <td>
//                                       <div className="add-product">
//                                         <input
//                                           type="text"
//                                           className="form-control"
//                                           defaultValue="black"
//                                         />
//                                       </div>
//                                     </td>
//                                     <td>
//                                       <div className="add-product">
//                                         <input
//                                           type="text"
//                                           className="form-control"
//                                           defaultValue={2345}
//                                         />
//                                       </div>
//                                     </td>
//                                     <td>
//                                       <div className="product-quantity">
//                                         <span className="quantity-btn">
//                                           <i
//                                             data-feather="minus-circle"
//                                             className="feather-search"
//                                           />
//                                         </span>
//                                         <input
//                                           type="text"
//                                           className="quntity-input"
//                                           defaultValue={3}
//                                         />
//                                         <span className="quantity-btn">
//                                           +
//                                           <i
//                                             data-feather="plus-circle"
//                                             className="plus-circle"
//                                           />
//                                         </span>
//                                       </div>
//                                     </td>
//                                     <td>
//                                       <div className="add-product">
//                                         <input
//                                           type="text"
//                                           className="form-control"
//                                           defaultValue={50000}
//                                         />
//                                       </div>
//                                     </td>
//                                     <td className="action-table-data">
//                                       <div className="edit-delete-action">
//                                         <div className="input-block add-lists">
//                                           <label className="checkboxs">
//                                             <input
//                                               type="checkbox"
//                                               defaultChecked=""
//                                             />
//                                             <span className="checkmarks" />
//                                           </label>
//                                         </div>
//                                         <Link
//                                           className="me-2 p-2"
//                                           to="#"
//                                           data-bs-toggle="modal"
//                                           data-bs-target="#edit-units"
//                                         >
//                                           <i
//                                             data-feather="plus"
//                                             className="feather-edit"
//                                           />
//                                         </Link>
//                                         <Link
//                                           className="confirm-text p-2"
//                                           to="#"
//                                         >
//                                           <i
//                                             data-feather="trash-2"
//                                             className="feather-trash-2"
//                                           />
//                                         </Link>
//                                       </div>
//                                     </td>
//                                   </tr>
//                                 </tbody>
//                               </table>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div> */}
//               {/* <div
//                 className="accordion-card-one accordion"
//                 id="accordionExample4"
//               >
//                 <div className="accordion-item">
//                   <div className="accordion-header" id="headingFour">
//                     <div
//                       className="accordion-button"
//                       data-bs-toggle="collapse"
//                       data-bs-target="#collapseFour"
//                       aria-controls="collapseFour"
//                     >
//                       <div className="text-editor add-list">
//                         <div className="addproduct-icon list">
//                           <h5>
//                             <List className="add-info" />
//                             <span>Custom Fields</span>
//                           </h5>
//                           <Link to="#">
//                             <ChevronDown className="chevron-down-add" />
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div
//                     id="collapseFour"
//                     className="accordion-collapse collapse show"
//                     aria-labelledby="headingFour"
//                     data-bs-parent="#accordionExample4"
//                   >
//                     <div className="accordion-body">
//                       <div className="text-editor add-list add">
//                         <div className="custom-filed">
//                           <div className="input-block add-lists">
//                             <label className="checkboxs">
//                               <input type="checkbox" />
//                               <span className="checkmarks" />
//                               Warranties
//                             </label>
//                             <label className="checkboxs">
//                               <input type="checkbox" />
//                               <span className="checkmarks" />
//                               Manufacturer
//                             </label>
//                             <label className="checkboxs">
//                               <input type="checkbox" />
//                               <span className="checkmarks" />
//                               Expiry
//                             </label>
//                           </div>
//                         </div>
//                         <div className="row">
//                           <div className="col-lg-4 col-sm-6 col-12">
//                             <div className="input-blocks add-product">
//                               <label>Discount Type</label>
//                               <Select
//                                 className="select"
//                                 options={discounttype1}
//                                 placeholder="Choose"
//                               />
//                             </div>
//                           </div>
//                         </div>
//                         <div className="row">
//                           <div className="col-lg-4 col-sm-6 col-12">
//                             <div className="input-blocks add-product">
//                               <label>Quantity Alert</label>
//                               <input type="text" className="form-control" />
//                             </div>
//                           </div>
//                           <div className="col-lg-4 col-sm-6 col-12">
//                             <div className="input-blocks">
//                               <label>Manufactured Date</label>
//                               <div className="input-groupicon calender-input">
//                                 <Calendar className="info-img" />
//                                 <DatePicker
//                                   selected={selectedDate}
//                                   onChange={handleDateChange}
//                                   type="date"
//                                   className="datetimepicker"
//                                   dateFormat="dd-MM-yyyy"
//                                   placeholder="Choose Date"
//                                 />
//                               </div>
//                             </div>
//                           </div>
//                           <div className="col-lg-4 col-sm-6 col-12">
//                             <div className="input-blocks">
//                               <label>Expiry On</label>
//                               <div className="input-groupicon calender-input">
//                                 <Calendar className="info-img" />
//                                 <DatePicker
//                                   selected={selectedDate1}
//                                   onChange={handleDateChange1}
//                                   type="date"
//                                   className="datetimepicker"
//                                   dateFormat="dd-MM-yyyy"
//                                   placeholder="Choose Date"
//                                 />
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div> */}
//             </div>
//           </div>
//           <div className="col-lg-12">
//             <div className="btn-addproduct mb-4">
//               <button type="button" className="btn btn-cancel me-2">
//                 Cancel
//               </button>
//               <Link to={route.addproduct} className="btn btn-submit">
//                 Save Product
//               </Link>
//             </div>
//           </div>
//         </form>
//         {/* /add */}
//       </div>
//       <Addunits />
//       <AddCategory />
//       <AddBrand />
//     </div>
//   );
// };

// export default AddProduct;



//WITH REDUX


// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Select from "react-select";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import { all_routes } from "../../Router/all_routes";
// import {
//   ArrowLeft,
//   ChevronDown,
//   ChevronUp,
//   Info,
// } from "feather-icons-react/build/IconComponents";
// import { useDispatch, useSelector } from "react-redux";
// import { setToogleHeader } from "../../core/redux/action";
// import { createProduct } from "../../core/redux/slices/productSlice";
// import { OverlayTrigger, Tooltip } from "react-bootstrap";
// import AuthService from "../../services/authService";

// const AddProduct = () => {
//   const route = all_routes;
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const MySwal = withReactContent(Swal);

//   const data = useSelector((state) => state.toggle_header);
//   const { user } = useSelector((state) => state.auth);
//   const { createStatus, error } = useSelector((state) => state.products);

//   const [articleProfiles, setArticleProfiles] = useState([]);
//   const [warehouses, setWarehouses] = useState([]);
//   const [submitting, setSubmitting] = useState(false);

//   const [formData, setFormData] = useState({
//     title: "",
//     article_profile_id: null,
//     warehouse_id: null,
//     location: "",
//     status: { value: "new", label: "New" },
//     count: 0,
//     description: "",
//   });

//   useEffect(() => {
//     fetchArticleProfile();
//     fetchWarehouse();
//   }, []);

//   useEffect(() => {
//     if (createStatus === 'succeeded') {
//       MySwal.fire({
//         icon: "success",
//         title: "Success!",
//         text: "Product created successfully",
//         timer: 2000,
//         showConfirmButton: false,
//       }).then(() => {
//         navigate(route.productlist);
//       });
//     } else if (createStatus === 'failed') {
//       MySwal.fire({
//         icon: "error",
//         title: "Error",
//         text: error || "Failed to create product",
//         timer: 3000,
//       });
//     }
//   }, [createStatus, error, navigate, route.productlist, MySwal]);

//   const renderCollapseTooltip = (props) => (
//     <Tooltip id="refresh-tooltip" {...props}>
//       Collapse
//     </Tooltip>
//   );

//   const fetchArticleProfile = async () => {
//     try {
//       const res = await AuthService.getArticleProfile();
//       const formatted = res.data.data.map((item) => ({
//         value: item.id,
//         label: item.name || item.title,
//       }));
//       setArticleProfiles(formatted);
//     } catch (error) {
//       console.error("Failed to load Article Profile", error);
//     }
//   };

//   const fetchWarehouse = async () => {
//     try {
//       const res = await AuthService.getWarehouse();
//       const formatted = res.data.data.map((item) => ({
//         value: item.id,
//         label: item.name || item.title,
//       }));
//       setWarehouses(formatted);
//     } catch (error) {
//       console.error("Failed to load Warehouses", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSelectChange = (name, option) => {
//     setFormData((prev) => ({
//       ...prev,
//       [name]: option,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     if (!formData.title.trim()) {
//       MySwal.fire({
//         icon: "warning",
//         title: "Validation Error",
//         text: "Product name is required",
//         timer: 2000,
//       });
//       return;
//     }

//     if (!formData.article_profile_id) {
//       MySwal.fire({
//         icon: "warning",
//         title: "Validation Error",
//         text: "Article Profile is required",
//         timer: 2000,
//       });
//       return;
//     }

//     if (!formData.warehouse_id) {
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
//         title: formData.title,
//         article_profile_id: formData.article_profile_id.value,
//         warehouse_id: formData.warehouse_id.value,
//         location: formData.location,
//         count: parseInt(formData.count) || 0,
//         status: formData.status?.value || "new",
//         description: formData.description,
//         last_updated_by: user?.id || 1, // Use logged-in user ID
//       };

//       await dispatch(createProduct(dataToSubmit)).unwrap();
//     } catch (error) {
//       console.error("Error creating product:", error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const statusOptions = [
//     { value: "new", label: "New" },
//     { value: "used", label: "Used" },
//     { value: "repaired", label: "Repaired" },
//     { value: "broken", label: "Broken" },
//     { value: "installed", label: "Installed" },
//   ];

//   return (
//     <div className="page-wrapper">
//       <div className="content">
//         <div className="page-header">
//           <div className="add-item d-flex">
//             <div className="page-title">
//               <h4>New Product</h4>
//               <h6>Create new product</h6>
//             </div>
//           </div>
//           <ul className="table-top-head">
//             <li>
//               <div className="page-btn">
//                 <Link to={route.productlist} className="btn btn-secondary">
//                   <ArrowLeft className="me-2" />
//                   Back to Product
//                 </Link>
//               </div>
//             </li>
//             <li>
//               <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
//                 <Link
//                   data-bs-toggle="tooltip"
//                   data-bs-placement="top"
//                   title="Collapse"
//                   id="collapse-header"
//                   className={data ? "active" : ""}
//                   onClick={() => {
//                     dispatch(setToogleHeader(!data));
//                   }}
//                 >
//                   <ChevronUp className="feather-chevron-up" />
//                 </Link>
//               </OverlayTrigger>
//             </li>
//           </ul>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="card">
//             <div className="card-body add-product pb-0">
//               <div className="accordion-card-one accordion" id="accordionExample">
//                 <div className="accordion-item">
//                   <div className="accordion-header" id="headingOne">
//                     <div
//                       className="accordion-button"
//                       data-bs-toggle="collapse"
//                       data-bs-target="#collapseOne"
//                       aria-controls="collapseOne"
//                     >
//                       <div className="addproduct-icon">
//                         <h5>
//                           <Info className="add-info" />
//                           <span>Product Information</span>
//                         </h5>
//                         <Link to="#">
//                           <ChevronDown className="chevron-down-add" />
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                   <div
//                     id="collapseOne"
//                     className="accordion-collapse collapse show"
//                     aria-labelledby="headingOne"
//                     data-bs-parent="#accordionExample"
//                   >
//                     <div className="accordion-body">
//                       <div className="row">
//                         <div className="col-lg-4 col-sm-6 col-12">
//                           <div className="mb-3 add-product">
//                             <label className="form-label">
//                               Article Profile <span className="text-danger">*</span>
//                             </label>
//                             <Select
//                               className="select"
//                               options={articleProfiles}
//                               placeholder="Choose Article Profile"
//                               value={formData.article_profile_id}
//                               onChange={(option) => handleSelectChange("article_profile_id", option)}
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-4 col-sm-6 col-12">
//                           <div className="mb-3 add-product">
//                             <label className="form-label">
//                               Warehouse <span className="text-danger">*</span>
//                             </label>
//                             <Select
//                               className="select"
//                               options={warehouses}
//                               placeholder="Choose Warehouse"
//                               value={formData.warehouse_id}
//                               onChange={(option) => handleSelectChange("warehouse_id", option)}
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-4 col-sm-6 col-12">
//                           <div className="mb-3 add-product">
//                             <label className="form-label">Location</label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               name="location"
//                               value={formData.location}
//                               onChange={handleInputChange}
//                               placeholder="Enter location"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="row">
//                         <div className="col-lg-6 col-sm-6 col-12">
//                           <div className="mb-3 add-product">
//                             <label className="form-label">
//                               Product Name <span className="text-danger">*</span>
//                             </label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               name="title"
//                               value={formData.title}
//                               onChange={handleInputChange}
//                               placeholder="Enter product name"
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-3 col-sm-6 col-12">
//                           <div className="mb-3 add-product">
//                             <label className="form-label">Quantity</label>
//                             <input
//                               type="number"
//                               className="form-control"
//                               name="count"
//                               value={formData.count}
//                               onChange={handleInputChange}
//                               placeholder="Enter quantity"
//                               min="0"
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-3 col-sm-6 col-12">
//                           <div className="mb-3 add-product">
//                             <label className="form-label">Status</label>
//                             <Select
//                               className="select"
//                               options={statusOptions}
//                               placeholder="Choose Status"
//                               value={formData.status}
//                               onChange={(option) => handleSelectChange("status", option)}
//                             />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="col-lg-12">
//                         <div className="input-blocks summer-description-box transfer mb-3">
//                           <label>Description</label>
//                           <textarea
//                             className="form-control h-100"
//                             rows={5}
//                             name="description"
//                             value={formData.description}
//                             onChange={handleInputChange}
//                             placeholder="Enter product description"
//                           />
//                           <p className="mt-1">Maximum 500 Characters</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-12">
//             <div className="btn-addproduct mb-4">
//               <Link to={route.productlist} className="btn btn-cancel me-2" type="button">
//                 Cancel
//               </Link>
//               <button type="submit" className="btn btn-submit" disabled={submitting}>
//                 {submitting ? (
//                   <>
//                     <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                     Creating...
//                   </>
//                 ) : (
//                   "Save Product"
//                 )}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;


import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { all_routes } from "../../Router/all_routes";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Info,
  Camera,
  CheckCircle,
  AlertCircle,
} from "feather-icons-react/build/IconComponents";
import { useDispatch, useSelector } from "react-redux";
import { setToogleHeader } from "../../core/redux/action";
import { createProduct, scanProduct, clearScannedProduct } from "../../core/redux/slices/productSlice";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import AuthService from "../../services/authService";

const AddProduct = () => {
  const route = all_routes;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const MySwal = withReactContent(Swal);

  const data = useSelector((state) => state.toggle_header);
  const { user } = useSelector((state) => state.auth);
  const { createStatus, error } = useSelector((state) => state.products);

  const [articleProfiles, setArticleProfiles] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [submitting, setSubmitting] = useState(false);


  const [barcodeInput, setBarcodeInput] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [barcodeVerified, setBarcodeVerified] = useState(false);
  const [scanBuffer, setScanBuffer] = useState("");
  const [lastKeystroke, setLastKeystroke] = useState(0);

  const [formData, setFormData] = useState({
    title: "",
    article_profile_id: null,
    warehouse_id: null,
    location: "",
    status: { value: "new", label: "New" },
    count: 1,
    description: "",
  });

  useEffect(() => {
    fetchArticleProfile();
    fetchWarehouse();
  }, []);

 
  useEffect(() => {
    if (location.state?.barcode) {
      setBarcodeInput(location.state.barcode);
      handleVerifyBarcode(location.state.barcode);
    }
    //eslint-disable-next-line
  }, [location.state]);

  // GLOBAL BARCODE SCANNER 
  useEffect(() => {
    const handleKeyPress = (e) => {
      const currentTime = Date.now();
      const timeSinceLastKey = currentTime - lastKeystroke;


      if (timeSinceLastKey > 100 && scanBuffer.length > 0) {
        setScanBuffer("");
      }

      setLastKeystroke(currentTime);

    
      const isInput = e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA';
      const isBarcodeInput = e.target.name === 'barcodeInput';
      
      if (isInput && !isBarcodeInput) return;

    
      if (e.key === 'Enter' && scanBuffer.length >= 8) {
        e.preventDefault();
        const scannedCode = scanBuffer.trim();
        setBarcodeInput(scannedCode);
        handleVerifyBarcode(scannedCode);
        setScanBuffer(""); 
        return;
      }
      

      // Build scan buffer
      if (e.key.length === 1) {
        setScanBuffer(prev => prev + e.key);
        
        // Auto-clear buffer after 200ms of inactivity
        setTimeout(() => {
          setScanBuffer("");
        }, 200);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
    //eslint-disable-next-line
  }, [scanBuffer, lastKeystroke]);

  //  Verify barcode
  const handleVerifyBarcode = async (barcode) => {
    if (!barcode.trim()) return;

    setIsScanning(true);
    setBarcodeVerified(false);

    try {
      // Try to find existing product with this barcode
      const product = await dispatch(scanProduct(barcode.trim())).unwrap();
      
      // Product EXISTS - show warning
      MySwal.fire({
        icon: "warning",
        title: " Product Already Exists",
        html: `
          <div style="text-align: left; padding: 20px;">
            <p><strong>Name:</strong> ${product.title}</p>
            <p><strong>Barcode:</strong> ${product.barcode}</p>
            <p><strong>Warehouse:</strong> ${product.warehouse_name || 'N/A'}</p>
            <p><strong>Quantity:</strong> ${product.count || 0}</p>
            <hr>
            <p class="text-muted">This product is already in the system. Do you want to view</p>
          </div>
        `,
        showCancelButton: true,
        // showDenyButton: true,
        // confirmButtonText: "View/Edit Product",
        // denyButtonText: "Add Anyway",
        cancelButtonText: "Cancel",
        // confirmButtonColor: "#28a745",
        // denyButtonColor: "#ffc107",
        cancelButtonColor: "#6c757d",
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to product list
          navigate(route.productlist);
        } else if (result.isDenied) {
          // User wants to add anyway
          setBarcodeVerified(true);
        } else {
          // Cancel - clear barcode
          setBarcodeInput("");
        }
      });

      dispatch(clearScannedProduct());
    } catch (error) {
      // Product DOESN'T EXIST - good to add!
      setBarcodeVerified(true);
      MySwal.fire({
        icon: "success",
        title: "Ready to Add",
        text: `New product with barcode: ${barcode}`,
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setIsScanning(false);
    }
  };

  // Manual barcode input change
  const handleBarcodeInputChange = (e) => {
    const value = e.target.value;
    setBarcodeInput(value);
    setBarcodeVerified(false); 
  };

  useEffect(() => {
    if (createStatus === 'succeeded') {
      MySwal.fire({
        icon: "success",
        title: "Success!",
        text: "Product created successfully",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate(route.productlist);
      });
    } else if (createStatus === 'failed') {
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: error || "Failed to create product",
        timer: 3000,
      });
    }
  }, [createStatus, error, navigate, route.productlist, MySwal]);

  const renderCollapseTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Collapse
    </Tooltip>
  );

  const fetchArticleProfile = async () => {
    try {
      const res = await AuthService.getArticles();
      const formatted = res.data.data.map((item) => ({
        value: item.id,
        label: item.name || item.title,
      }));
      setArticleProfiles(formatted);
    } catch (error) {
      console.error("Failed to load Article Profile", error);
    }
  };

  const fetchWarehouse = async () => {
    try {
      const res = await AuthService.getWarehouse();
      const formatted = res.data.data.map((item) => ({
        value: item.id,
        label: item.name || item.title,
      }));
      setWarehouses(formatted);
    } catch (error) {
      console.error("Failed to load Warehouses", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, option) => {
    setFormData((prev) => ({
      ...prev,
      [name]: option,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      MySwal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Product name is required",
        timer: 2000,
      });
      return;
    }

    if (!formData.article_profile_id) {
      MySwal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Article Profile is required",
        timer: 2000,
      });
      return;
    }

    if (!formData.warehouse_id) {
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
        title: formData.title,
        article_profile_id: formData.article_profile_id.value,
        warehouse_id: formData.warehouse_id.value,
        location: formData.location,
        count: parseInt(formData.count) || 0,
        status: formData.status?.value || "new",
        description: formData.description,
        last_updated_by: user?.id || 1,
      };

      await dispatch(createProduct(dataToSubmit)).unwrap();
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const statusOptions = [
    { value: "new", label: "New" },
    { value: "used", label: "Used" },
    { value: "repaired", label: "Repaired" },
    { value: "broken", label: "Broken" },
    { value: "installed", label: "Installed" },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>New Product</h4>
              <h6>Create new product - Scan barcode anywhere</h6>
            </div>
          </div>
          <ul className="table-top-head">
            <li>
              <div className="page-btn">
                <Link to={route.productlist} className="btn btn-secondary">
                  <ArrowLeft className="me-2" />
                  Back to Product
                </Link>
              </div>
            </li>
            <li>
              <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
                <Link
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Collapse"
                  id="collapse-header"
                  className={data ? "active" : ""}
                  onClick={() => {
                    dispatch(setToogleHeader(!data));
                  }}
                >
                  <ChevronUp className="feather-chevron-up" />
                </Link>
              </OverlayTrigger>
            </li>
          </ul>
        </div>

        {/* Scanner Active Alert */}
        <div className="alert alert-info d-flex align-items-center mb-3" role="alert">
          <Camera className="me-2" size={20} />
          <div>
            <strong>Barcode Scanner Active!</strong> Scan any barcode to automatically check for duplicates. 
            The system will alert you if the product already exists.
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* BARCODE SCANNER SECTION */}
          <div className="card mb-3">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <Camera size={24} className="text-primary me-2" />
                <h5 className="mb-0">Barcode Verification</h5>
              </div>
              
              <div className="row align-items-end">
                <div className="col-lg-8">
                  <label className="form-label">
                    Scan or Enter Barcode
                    {barcodeVerified && (
                      <CheckCircle size={16} className="text-success ms-2" />
                    )}
                    {isScanning && (
                      <span className="spinner-border spinner-border-sm ms-2" role="status" />
                    )}
                  </label>
                  <input
                    type="text"
                    className={`form-control ${barcodeVerified ? 'is-valid' : ''} ${barcodeInput && !barcodeVerified ? 'is-warning' : ''}`}
                    name="barcodeInput"
                    value={barcodeInput}
                    onChange={handleBarcodeInputChange}
                    placeholder="Use scanner or type barcode"
                    disabled={isScanning}
                  />
                  {barcodeVerified && (
                    <div className="form-text text-success">
                      <CheckCircle size={14} className="me-1" />
                      Barcode verified - No duplicate found
                    </div>
                  )}
                  {barcodeInput && !barcodeVerified && !isScanning && (
                    <div className="form-text text-warning">
                      <AlertCircle size={14} className="me-1" />
                      Click "Check Barcode" to verify
                    </div>
                  )}
                </div>
                <div className="col-lg-4">
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={() => handleVerifyBarcode(barcodeInput)}
                    disabled={!barcodeInput.trim() || isScanning}
                  >
                    {isScanning ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Checking...
                      </>
                    ) : (
                      <>
                        <Camera size={16} className="me-2" />
                        Check Barcode
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="alert alert-light mt-3 mb-0 border">
                <small className="text-muted">
                  <strong>💡 How it works:</strong>
                  <ul className="mb-0 mt-2">
                    <li>Scan with your barcode scanner - it will automatically populate</li>
                    <li>System checks if product already exists</li>
                    <li>If exists: You'll see product details and can choose to view or add anyway</li>
                    <li>If new: You'll get a green checkmark to proceed</li>
                  </ul>
                </small>
              </div>
            </div>
          </div>

          {/* EXISTING FORM */}
          <div className="card">
            <div className="card-body add-product pb-0">
              <div className="accordion-card-one accordion" id="accordionExample">
                <div className="accordion-item">
                  <div className="accordion-header" id="headingOne">
                    <div
                      className="accordion-button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-controls="collapseOne"
                    >
                      <div className="addproduct-icon">
                        <h5>
                          <Info className="add-info" />
                          <span>Product Information</span>
                        </h5>
                        <Link to="#">
                          <ChevronDown className="chevron-down-add" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="row">
                        <div className="col-lg-4 col-sm-6 col-12">
                          <div className="mb-3 add-product">
                            <label className="form-label">
                              Article Profile <span className="text-danger">*</span>
                            </label>
                            <Select
                              className="select"
                              options={articleProfiles}
                              placeholder="Choose Article Profile"
                              value={formData.article_profile_id}
                              onChange={(option) => handleSelectChange("article_profile_id", option)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 col-12">
                          <div className="mb-3 add-product">
                            <label className="form-label">
                              Warehouse <span className="text-danger">*</span>
                            </label>
                            <Select
                              className="select"
                              options={warehouses}
                              placeholder="Choose Warehouse"
                              value={formData.warehouse_id}
                              onChange={(option) => handleSelectChange("warehouse_id", option)}
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
                              value={formData.location}
                              onChange={handleInputChange}
                              placeholder="Enter location"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-4 col-sm-6 col-12">
                          <div className="mb-3 add-product">
                            <label className="form-label">
                              Product Name <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="title"
                              value={formData.title}
                              onChange={handleInputChange}
                              placeholder="Enter product name"
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 col-12">
                          <div className="mb-3 add-product">
                            <label className="form-label">Quantity</label>
                            <input
                              type="number"
                              className="form-control"
                              name="count"
                              value={formData.count}
                              onChange={handleInputChange}
                              placeholder="Enter quantity"
                              min="0"
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 col-12">
                          <div className="mb-3 add-product">
                            <label className="form-label">Status</label>
                            <Select
                              className="select"
                              options={statusOptions}
                              placeholder="Choose Status"
                              value={formData.status}
                              onChange={(option) => handleSelectChange("status", option)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-blocks summer-description-box transfer mb-3">
                          <label>Description</label>
                          <textarea
                            className="form-control h-100"
                            rows={5}
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
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
          <div className="col-lg-12">
            <div className="btn-addproduct mb-4">
              <Link to={route.productlist} className="btn btn-cancel me-2" type="button">
                Cancel
              </Link>
              <button type="submit" className="btn btn-submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Creating...
                  </>
                ) : (
                  "Save Product"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;






// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Select from "react-select";
// import { all_routes } from "../../Router/all_routes";
// import { DatePicker } from "antd";
// import axios from "axios";
// import { toast } from "react-toastify";
// import {
//   ArrowLeft,
//   Calendar,
//   // ChevronDown,
//   Info,
//   LifeBuoy,
//   List,
//   PlusCircle,
//   X,
// } from "feather-icons-react/build/IconComponents";

// const API_URL = 'http://localhost:5000/api';

// const AddProduct = () => {
//   const route = all_routes;
//   const navigate = useNavigate();

//   // Form state
//   const [formData, setFormData] = useState({
//     title: "",
//     sku: "",
//     barcode: "",
//     warehouse_id: "",
//     description: "",
//     quantity: "",
//     quantity_alert: "",
//     status: "new",
//     count: 1,
//     location: "",
//   });

//   // Dropdown options state
//   // const [stores, setStores] = useState([]);
//   const [warehouses, setWarehouses] = useState([]);
//   // const [categories, setCategories] = useState([]);
//   // const [subcategories, setSubcategories] = useState([]);
//   // const [brands, setBrands] = useState([]);
//   // const [units, setUnits] = useState([]);

//   // Image state
//   // const [images, setImages] = useState([]);
//   // const [imagePreviews, setImagePreviews] = useState([]);

//   // Loading state
//   const [loading, setLoading] = useState(false);
//   const [dataLoading, setDataLoading] = useState(true);

//   // Fetch all required data on component mount
//   useEffect(() => {
//     fetchInitialData();
//   }, []);

//   // Fetch subcategories when category changes
//   // useEffect(() => {
//   //   if (formData.category_id) {
//   //     fetchSubcategories(formData.category_id);
//   //   } else {
//   //     setSubcategories([]);
//   //   }
//   // }, [formData.category_id]);

//   const fetchInitialData = async () => {
//     setDataLoading(true);
//     try {
//       const [
//         warehousesRes,
  
//       ] = await Promise.all([
//         axios.get(`${API_URL}/warehouses`),
//             ])

//       setWarehouses(
//         warehousesRes.data.data.map(item => ({
//           value: item.id,
//           label: item.name,
        

//     } catch (error) {
//       console.error("Error fetching initial data:", error);
//       toast.error("Failed to load form data");
//     } finally {
//       setDataLoading(false);
//     }
//   };

//   // const fetchSubcategories = async (categoryId) => {
//   //   try {
//   //     const response = await axios.get(`${API_URL}/subcategories/${categoryId}`);
//   //     setSubcategories(
//   //       response.data.data.map(item => ({
//   //         value: item.id,
//   //         label: item.name,
//   //       }))
//   //     );
//   //   } catch (error) {
//   //     console.error("Error fetching subcategories:", error);
//   //   }
//   // };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//     }));

//     // Auto-generate slug from product name
//     if (name === "product_name") {
//       const slug = value
//         .toLowerCase()
//         .replace(/[^a-z0-9]+/g, "-")
//         .replace(/(^-|-$)/g, "");
//       setFormData(prev => ({
//         ...prev,
//         slug: slug,
//       }));
//     }
//   };

//   const handleSelectChange = (name, selectedOption) => {
//     setFormData(prev => ({
//       ...prev,
//       [name]: selectedOption ? selectedOption.value : "",
//     }));
//   };

//   const handleDateChange = (name, date) => {
//     setFormData(prev => ({
//       ...prev,
//       [name]: date ? date.format("YYYY-MM-DD") : null,
//     }));
//   };

//   const generateSKU = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/products/generate/sku`);
//       setFormData(prev => ({
//         ...prev,
//         sku: response.data.sku,
//       }));
//       toast.success("SKU generated successfully");
//     } catch (error) {
//       console.error("Error generating SKU:", error);
//       toast.error("Failed to generate SKU");
//     }
//   };

//   const generateBarcode = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/products/generate/barcode`);
//       setFormData(prev => ({
//         ...prev,
//         barcode: response.data.barcode,
//       }));
//       toast.success("Barcode generated successfully");
//     } catch (error) {
//       console.error("Error generating barcode:", error);
//       toast.error("Failed to generate barcode");
//     }
//   };




//   const validateForm = () => {
//     if (!formData.product_name) {
//       toast.error("Product name is required");
//       return false;
//     }
//     if (!formData.sku) {
//       toast.error("SKU is required");
//       return false;
//     }

//     if (!formData.quantity || formData.quantity < 0) {
//       toast.error("Valid quantity is required");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setLoading(true);

//     try {
//       const formDataToSend = new FormData();

//       // Append all form fields
//       Object.keys(formData).forEach(key => {
//         if (formData[key] !== null && formData[key] !== "") {
//           formDataToSend.append(key, formData[key]);
//         }
//       });

//       // Append images
//       images.forEach(image => {
//         formDataToSend.append("images", image);
//       });

//       // Add user ID (get from auth context or local storage)
//       formDataToSend.append("last_updated_by", 1); // Replace with actual user ID

//       const response = await axios.post(
//         `${API_URL}/products`,
//         formDataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       toast.success("Product created successfully");
//       navigate(route.productlist);

//     } catch (error) {
//       console.error("Error creating product:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to create product"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const sellingTypeOptions = [
//     { value: "transactional", label: "Transactional Selling" },
//     { value: "solution", label: "Solution Selling" },
//   ];

//   const barcodeSymbologyOptions = [
//     { value: "code128", label: "Code 128" },
//     { value: "code39", label: "Code 39" },
//     { value: "ean13", label: "EAN-13" },
//   ];

//   const taxTypeOptions = [
//     { value: "exclusive", label: "Exclusive" },
//     { value: "inclusive", label: "Inclusive" },
//   ];

//   const discountTypeOptions = [
//     { value: "percentage", label: "Percentage" },
//     { value: "fixed", label: "Fixed Amount" },
//   ];

//   const statusOptions = [
//     { value: "new", label: "New" },
//     { value: "used", label: "Used" },
//     { value: "repaired", label: "Repaired" },
//   ];

//   if (dataLoading) {
//     return (
//       <div className="page-wrapper">
//         <div className="content">
//           <div className="text-center p-5">
//             <div className="spinner-border" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="page-wrapper">
//       <div className="content">
//         <div className="page-header">
//           <div className="add-item d-flex">
//             <div className="page-title">
//               <h4>New Product</h4>
//               <h6>Create new product</h6>
//             </div>
//           </div>
//           <ul className="table-top-head">
//             <li>
//               <div className="page-btn">
//                 <Link to={route.productlist} className="btn btn-secondary">
//                   <ArrowLeft className="me-2" />
//                   Back to Product
//                 </Link>
//               </div>
//             </li>
//           </ul>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="card">
//             <div className="card-body add-product pb-0">
//               {/* Product Information Section */}
//               <div className="accordion-card-one accordion">
//                 <div className="accordion-item">
//                   <div className="accordion-header">
//                     <div className="accordion-button">
//                       <div className="addproduct-icon">
//                         <h5>
//                           <Info className="add-info" />
//                           <span>Product Information</span>
//                         </h5>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="accordion-collapse collapse show">
//                     <div className="accordion-body">
//                       <div className="row">
//                         <div className="col-lg-4 col-sm-6 col-12">
//                           <div className="mb-3 add-product">
//                             <label className="form-label">Store</label>
//                             <Select
//                               className="select"
//                               options={stores}
//                               placeholder="Choose Store"
//                               onChange={(option) =>
//                                 handleSelectChange("store_id", option)
//                               }
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-4 col-sm-6 col-12">
//                           <div className="mb-3 add-product">
//                             <label className="form-label">Warehouse</label>
//                             <Select
//                               className="select"
//                               options={warehouses}
//                               placeholder="Choose Warehouse"
//                               onChange={(option) =>
//                                 handleSelectChange("warehouse_id", option)
//                               }
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-4 col-sm-6 col-12">
//                           <div className="mb-3 add-product">
//                             <label className="form-label">Status</label>
//                             <Select
//                               className="select"
//                               options={statusOptions}
//                               placeholder="Choose Status"
//                               defaultValue={statusOptions[0]}
//                               onChange={(option) =>
//                                 handleSelectChange("status", option)
//                               }
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="row">
//                         <div className="col-lg-4 col-sm-6 col-12">
//                           <div className="mb-3 add-product">
//                             <label className="form-label">
//                               Product Name <span className="text-danger">*</span>
//                             </label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               name="product_name"
//                               value={formData.product_name}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-4 col-sm-6 col-12">
//                           <div className="mb-3 add-product">
//                             <label className="form-label">Slug</label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               name="slug"
//                               value={formData.slug}
//                               onChange={handleInputChange}
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-4 col-sm-6 col-12">
//                           <div className="input-blocks add-product list">
//                             <label>SKU <span className="text-danger">*</span></label>
//                             <input
//                               type="text"
//                               className="form-control list"
//                               placeholder="Enter SKU"
//                               name="sku"
//                               value={formData.sku}
//                               onChange={handleInputChange}
//                               required
//                             />
//                             <button
//                               type="button"
//                               onClick={generateSKU}
//                               className="btn btn-primaryadd"
//                             >
//                               Generate Code
//                             </button>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="row">
//                         <div className="col-lg-4 col-sm-6 col-12">
//                           <div className="mb-3 add-product">
//                             <label className="form-label">
//                               Category <span className="text-danger">*</span>
//                             </label>
//                             <Select
//                               className="select"
//                               options={categories}
//                               placeholder="Choose Category"
//                               onChange={(option) =>
//                                 handleSelectChange("category_id", option)
//                               }
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-4 col-sm-6 col-12">
//                           <div className="mb-3 add-product">
//                             <label className="form-label">Sub Category</label>
//                             <Select
//                               className="select"
//                               options={subcategories}
//                               placeholder="Choose Sub Category"
//                               onChange={(option) =>
//                                 handleSelectChange("subcategory_id", option)
//                               }
//                               isDisabled={!formData.category_id}
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-4 col-sm-6 col-12">
//                           <div className="mb-3 add-product">
//                             <label className="form-label">Brand</label>
//                             <Select
//                               className="select"
//                               options={brands}
//                               placeholder="Choose Brand"
//                               onChange={(option) =>
//                                 handleSelectChange("brand_id", option)
//                               }
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="row">
//                         <div className="col-lg-4 col-sm-6 col-12">
//                           <div className="mb-3 add-product">
//                             <label className="form-label">Unit</label>
//                             <Select
//                               className="select"
//                               options={units}
//                               placeholder="Choose Unit"
//                               onChange={(option) =>
//                                 handleSelectChange("unit_id", option)
//                               }
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-4 col-sm-6 col-12">
//                           <div className="mb-3 add-product">
//                             <label className="form-label">Selling Type</label>
//                             <Select
//                               className="select"
//                               options={sellingTypeOptions}
//                               placeholder="Choose Selling Type"
//                               onChange={(option) =>
//                                 handleSelectChange("selling_type", option)
//                               }
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-4 col-sm-6 col-12">
//                           <div className="mb-3 add-product">
//                             <label className="form-label">
//                               Barcode Symbology
//                             </label>
//                             <Select
//                               className="select"
//                               options={barcodeSymbologyOptions}
//                               placeholder="Choose Symbology"
//                               onChange={(option) =>
//                                 handleSelectChange("barcode_symbology", option)
//                               }
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="row">
//                         <div className="col-lg-12">
//                           <div className="input-blocks add-product list">
//                             <label>Item Code / Barcode</label>
//                             <input
//                               type="text"
//                               className="form-control list"
//                               placeholder="Enter Barcode"
//                               name="barcode"
//                               value={formData.barcode}
//                               onChange={handleInputChange}
//                             />
//                             <button
//                               type="button"
//                               onClick={generateBarcode}
//                               className="btn btn-primaryadd"
//                             >
//                               Generate Code
//                             </button>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="col-lg-12">
//                         <div className="input-blocks summer-description-box transfer mb-3">
//                           <label>Description</label>
//                           <textarea
//                             className="form-control h-100"
//                             rows={5}
//                             name="description"
//                             value={formData.description}
//                             onChange={handleInputChange}
//                             maxLength={255}
//                           />
//                           <p className="mt-1">Maximum 255 Characters</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Pricing & Stock Section */}
//               <div className="accordion-card-one accordion">
//                 <div className="accordion-item">
//                   <div className="accordion-header">
//                     <div className="accordion-button">
//                       <div className="addproduct-icon">
//                         <h5>
//                           <LifeBuoy className="add-info" />
//                           <span>Pricing & Stocks</span>
//                         </h5>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="accordion-collapse collapse show">
//                     <div className="accordion-body">
//                       <div className="row">
//                         <div className="col-lg-4 col-sm-6 col-12">
//                           <div className="input-blocks add-product">
//                             <label>Quantity <span className="text-danger">*</span></label>
//                             <input
//                               type="number"
//                               className="form-control"
//                               name="quantity"
//                               value={formData.quantity}
//                               onChange={handleInputChange}
//                               min="0"
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-4 col-sm-6 col-12">
//                           <div className="input-blocks add-product">
//                             <label>Price <span className="text-danger">*</span></label>
//                             <input
//                               type="number"
//                               className="form-control"
//                               name="price"
//                               value={formData.price}
//                               onChange={handleInputChange}
//                               min="0"
//                               step="0.01"
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-4 col-sm-6 col-12">
//                           <div className="input-blocks add-product">
//                             <label>Tax Type</label>
//                             <Select
//                               className="select"
//                               options={taxTypeOptions}
//                               placeholder="Select Tax Type"
//                               defaultValue={taxTypeOptions[0]}
//                               onChange={(option) =>
//                                 handleSelectChange("tax_type", option)
//                               }
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="row">
//                         <div className="col-lg-4 col-sm-6 col-12">
//                           <div className="input-blocks add-product">
//                             <label>Discount Type</label>
//                             <Select
//                               className="select"
//                               options={discountTypeOptions}
//                               placeholder="Choose Discount Type"
//                               onChange={(option) =>
//                                 handleSelectChange("discount_type", option)
//                               }
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-4 col-sm-6 col-12">
//                           <div className="input-blocks add-product">
//                             <label>Discount Value</label>
//                             <input
//                               type="number"
//                               className="form-control"
//                               placeholder="Enter discount value"
//                               name="discount_value"
//                               value={formData.discount_value}
//                               onChange={handleInputChange}
//                               min="0"
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-4 col-sm-6 col-12">
//                           <div className="input-blocks add-product">
//                             <label>Quantity Alert</label>
//                             <input
//                               type="number"
//                               className="form-control"
//                               name="quantity_alert"
//                               value={formData.quantity_alert}
//                               onChange={handleInputChange}
//                               min="0"
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       {/* Images Section */}
//                       <div className="row">
//                         <div className="col-lg-12">
//                           <div className="addproduct-icon list">
//                             <h5>
//                               <span>Product Images</span>
//                             </h5>
//                           </div>
//                           <div className="add-choosen">
//                             <div className="input-blocks">
//                               <div className="image-upload">
//                                 <input
//                                   type="file"
//                                   accept="image/*"
//                                   multiple
//                                   onChange={handleImageChange}
//                                 />
//                                 <div className="image-uploads">
//                                   <PlusCircle className="plus-down-add me-0" />
//                                   <h4>Add Images (Max 5)</h4>
//                                 </div>
//                               </div>
//                             </div>

//                             {imagePreviews.map((preview, index) => (
//                               <div key={index} className="phone-img">
//                                 <img src={preview} alt={`preview-${index}`} />
//                                 <button
//                                   type="button"
//                                   onClick={() => removeImage(index)}
//                                 >
//                                   <X className="x-square-add remove-product" />
//                                 </button>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Custom Fields Section */}
//               <div className="accordion-card-one accordion">
//                 <div className="accordion-item">
//                   <div className="accordion-header">
//                     <div className="accordion-button">
//                       <div className="addproduct-icon">
//                         <h5>
//                           <List className="add-info" />
//                           <span>Additional Information</span>
//                         </h5>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="accordion-collapse collapse show">
//                     <div className="accordion-body">
//                       <div className="row">
//                         <div className="col-lg-4 col-sm-6 col-12">
//                           <div className="input-blocks">
//                             <label>Manufactured Date</label>
//                             <div className="input-groupicon calender-input">
//                               <Calendar className="info-img" />
//                               <DatePicker
//                                 onChange={(date) =>
//                                   handleDateChange("manufactured_date", date)
//                                 }
//                                 className="datetimepicker form-control"
//                                 format="DD-MM-YYYY"
//                                 placeholder="Choose Date"
//                               />
//                             </div>
//                           </div>
//                         </div>
//                         <div className="col-lg-4 col-sm-6 col-12">
//                           <div className="input-blocks">
//                             <label>Expiry Date</label>
//                             <div className="input-groupicon calender-input">
//                               <Calendar className="info-img" />
//                               <DatePicker
//                                 onChange={(date) =>
//                                   handleDateChange("expiry_date", date)
//                                 }
//                                 className="datetimepicker form-control"
//                                 format="DD-MM-YYYY"
//                                 placeholder="Choose Date"
//                               />
//                             </div>
//                           </div>
//                         </div>
//                         <div className="col-lg-4 col-sm-6 col-12">
//                           <div className="input-blocks add-product">
//                             <label>Location</label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               name="location"
//                               value={formData.location}
//                               onChange={handleInputChange}
//                               placeholder="Enter location"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-lg-12">
//             <div className="btn-addproduct mb-4">
//               <button
//                 type="button"
//                 className="btn btn-cancel me-2"
//                 onClick={() => navigate(route.productlist)}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="btn btn-submit"
//                 disabled={loading}
//               >
//                 {loading ? "Saving..." : "Save Product"}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;