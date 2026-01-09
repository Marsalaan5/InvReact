// import React, { useState } from "react";
// import CountUp from "react-countup";
// import {
//   File,
//   User,
//   UserCheck,
// } from "feather-icons-react/build/IconComponents";
// import Chart from "react-apexcharts";
// import { Link } from "react-router-dom";
// import ImageWithBasePath from "../../core/img/imagewithbasebath";
// import { ArrowRight } from "react-feather";
// import { all_routes } from "../../Router/all_routes";
// import withReactContent from "sweetalert2-react-content";
// import Swal from "sweetalert2";

// const Dashboard = () => {
//   const route = all_routes;
//   const [chartOptions] = useState({
//     series: [
//       {
//         name: "Sales",
//         data: [130, 210, 300, 290, 150, 50, 210, 280, 105],
//       },
//       {
//         name: "Purchase",
//         data: [-150, -90, -50, -180, -50, -70, -100, -90, -105],
//       },
//     ],
//     colors: ["#28C76F", "#EA5455"],
//     chart: {
//       type: "bar",
//       height: 320,
//       stacked: true,
//       zoom: {
//         enabled: true,
//       },
//     },
//     responsive: [
//       {
//         breakpoint: 280,
//         options: {
//           legend: {
//             position: "bottom",
//             offsetY: 0,
//           },
//         },
//       },
//     ],
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         borderRadius: 4,
//         borderRadiusApplication: "end", // "around" / "end"
//         borderRadiusWhenStacked: "all", // "all"/"last"
//         columnWidth: "20%",
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     yaxis: {
//       min: -200,
//       max: 300,
//       tickAmount: 5,
//     },
//     xaxis: {
//       categories: [
//         "Jan",
//         "Feb",
//         "Mar",
//         "Apr",
//         "May",
//         "Jun",
//         "Jul",
//         "Aug",
//         "Sep",
//       ],
//     },
//     legend: { show: false },
//     fill: {
//       opacity: 1,
//     },
//   });
  
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
//           <div className="row">
//             <div className="col-xl-3 col-sm-6 col-12 d-flex">
//               <div className="dash-widget w-100">
//                 <div className="dash-widgetimg">
//                   <span>
//                     <ImageWithBasePath
//                       src="assets/img/icons/dash1.svg"
//                       alt="img"
//                     />
//                   </span>
//                 </div>
//                 <div className="dash-widgetcontent">
//                   <h5>
//                     <CountUp start={0} end={307144} duration={3} prefix="$" />
//                   </h5>
//                   <h6>Total Warehouse</h6>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-sm-6 col-12 d-flex">
//               <div className="dash-widget dash1 w-100">
//                 <div className="dash-widgetimg">
//                   <span>
//                     <ImageWithBasePath
//                       src="assets/img/icons/dash2.svg"
//                       alt="img"
//                     />
//                   </span>
//                 </div>
//                 <div className="dash-widgetcontent">
//                   <h5>
//                     $
//                     <CountUp
//                       start={0}
//                       end={4385}
//                       duration={3} // Duration in seconds
//                     />
//                   </h5>
//                   <h6>Total Products</h6>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-sm-6 col-12 d-flex">
//               <div className="dash-widget dash2 w-100">
//                 <div className="dash-widgetimg">
//                   <span>
//                     <ImageWithBasePath
//                       src="assets/img/icons/dash3.svg"
//                       alt="img"
//                     />
//                   </span>
//                 </div>
//                 <div className="dash-widgetcontent">
//                   <h5>
//                     $
//                     <CountUp
//                       start={0}
//                       end={385656.5}
//                       duration={3} // Duration in seconds
//                       decimals={1}
//                     />
//                   </h5>
//                   <h6>Total Stocks</h6>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-sm-6 col-12 d-flex">
//               <div className="dash-widget dash3 w-100">
//                 <div className="dash-widgetimg">
//                   <span>
//                     <ImageWithBasePath
//                       src="assets/img/icons/dash4.svg"
//                       alt="img"
//                     />
//                   </span>
//                 </div>
//                 <div className="dash-widgetcontent">
//                   <h5>
//                     $
//                     <CountUp
//                       start={0}
//                       end={40000}
//                       duration={3}
//                     />
//                   </h5>
//                   <h6>Low Stocks</h6>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-sm-6 col-12 d-flex">
//               <div className="dash-count">
//                 <div className="dash-counts">
//                   <h4>100</h4>
//                   <h5>Warehous 1</h5>
//                 </div>
//                 <div className="dash-imgs">
//                   <User />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-sm-6 col-12 d-flex">
//               <div className="dash-count das1">
//                 <div className="dash-counts">
//                   <h4>110</h4>
//                   <h5>Warehouse 2</h5>
//                 </div>
//                 <div className="dash-imgs">
//                   <UserCheck />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-sm-6 col-12 d-flex">
//               <div className="dash-count das2">
//                 <div className="dash-counts">
//                   <h4>150</h4>
//                   <h5>Warehouse 3</h5>
//                 </div>
//                 <div className="dash-imgs">
//                   <ImageWithBasePath
//                     src="assets/img/icons/file-text-icon-01.svg"
//                     className="img-fluid"
//                     alt="icon"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-3 col-sm-6 col-12 d-flex">
//               <div className="dash-count das3">
//                 <div className="dash-counts">
//                   <h4>170</h4>
//                   <h5>Warehouse 4 </h5>
//                 </div>
//                 <div className="dash-imgs">
//                   <File />
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Button trigger modal */}

//           <div className="row">
//             <div className="col-xl-7 col-sm-12 col-12 d-flex">
//               <div className="card flex-fill">
//                 <div className="card-header d-flex justify-content-between align-items-center">
//                   <h5 className="card-title mb-0">Purchase &amp; Sales</h5>
//                   <div className="graph-sets">
//                     <ul className="mb-0">
//                       <li>
//                         <span>Sales</span>
//                       </li>
//                       <li>
//                         <span>Purchase</span>
//                       </li>
//                     </ul>
//                     <div className="dropdown dropdown-wraper">
//                       <button
//                         className="btn btn-light btn-sm dropdown-toggle"
//                         type="button"
//                         id="dropdownMenuButton"
//                         data-bs-toggle="dropdown"
//                         aria-expanded="false"
//                       >
//                         2023
//                       </button>
//                       <ul
//                         className="dropdown-menu"
//                         aria-labelledby="dropdownMenuButton"
//                       >
//                         <li>
//                           <Link to="#" className="dropdown-item">
//                             2023
//                           </Link>
//                         </li>
//                         <li>
//                           <Link to="#" className="dropdown-item">
//                             2022
//                           </Link>
//                         </li>
//                         <li>
//                           <Link to="#" className="dropdown-item">
//                             2021
//                           </Link>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="card-body">
//                   <div id="sales_charts" />
//                   <Chart
//                     options={chartOptions}
//                     series={chartOptions.series}
//                     type="bar"
//                     height={320}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-5 col-sm-12 col-12 d-flex">
//               <div className="card flex-fill default-cover mb-4">
//                 <div className="card-header d-flex justify-content-between align-items-center">
//                   <h4 className="card-title mb-0">Recent Products</h4>
//                   <div className="view-all-link">
//                     <Link to="#" className="view-all d-flex align-items-center">
//                       View All
//                       <span className="ps-2 d-flex align-items-center">
//                         <ArrowRight className="feather-16" />
//                       </span>
//                     </Link>
//                   </div>
//                 </div>
//                 <div className="card-body">
//                   <div className="table-responsive dataview">
//                     <table className="table dashboard-recent-products">
//                       <thead>
//                         <tr>
//                           <th>#</th>
//                           <th>Products</th>
//                           <th>Price</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         <tr>
//                           <td>1</td>
//                           <td className="productimgname">
//                             <Link
//                               to={route.productlist}
//                               className="product-img"
//                             >
//                               <ImageWithBasePath
//                                 src="assets/img/products/stock-img-01.png"
//                                 alt="product"
//                               />
//                             </Link>
//                             <Link to={route.productlist}>
//                               Lenevo 3rd Generation
//                             </Link>
//                           </td>
//                           <td>$12500</td>
//                         </tr>
//                         <tr>
//                           <td>2</td>
//                           <td className="productimgname">
//                             <Link
//                               to={route.productlist}
//                               className="product-img"
//                             >
//                               <ImageWithBasePath
//                                 src="assets/img/products/stock-img-06.png"
//                                 alt="product"
//                               />
//                             </Link>
//                             <Link to={route.productlist}>Bold V3.2</Link>
//                           </td>
//                           <td>$1600</td>
//                         </tr>
//                         <tr>
//                           <td>3</td>
//                           <td className="productimgname">
//                             <Link
//                               to={route.productlist}
//                               className="product-img"
//                             >
//                               <ImageWithBasePath
//                                 src="assets/img/products/stock-img-02.png"
//                                 alt="product"
//                               />
//                             </Link>
//                             <Link to={route.productlist}>Nike Jordan</Link>
//                           </td>
//                           <td>$2000</td>
//                         </tr>
//                         <tr>
//                           <td>4</td>
//                           <td className="productimgname">
//                             <Link
//                               to={route.productlist}
//                               className="product-img"
//                             >
//                               <ImageWithBasePath
//                                 src="assets/img/products/stock-img-03.png"
//                                 alt="product"
//                               />
//                             </Link>
//                             <Link to={route.productlist}>
//                               Apple Series 5 Watch
//                             </Link>
//                           </td>
//                           <td>$800</td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="card">
//             <div className="card-header">
//               <h4 className="card-title">Expired Products</h4>
//             </div>
//             <div className="card-body">
//               <div className="table-responsive dataview">
//                 <table className="table dashboard-expired-products">
//                   <thead>
//                     <tr>
//                       <th className="no-sort">
//                         <label className="checkboxs">
//                           <input type="checkbox" id="select-all" />
//                           <span className="checkmarks" />
//                         </label>
//                       </th>
//                       <th>Product</th>
//                       <th>SKU</th>
//                       <th>Manufactured Date</th>
//                       <th>Expired Date</th>
//                       <th className="no-sort">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>
//                         <label className="checkboxs">
//                           <input type="checkbox" />
//                           <span className="checkmarks" />
//                         </label>
//                       </td>
//                       <td>
//                         <div className="productimgname">
//                           <Link to="#" className="product-img stock-img">
//                             <ImageWithBasePath
//                               src="assets/img/products/expire-product-01.png"
//                               alt="product"
//                             />
//                           </Link>
//                           <Link to="#">Red Premium Handy </Link>
//                         </div>
//                       </td>
//                       <td>
//                         <Link to="#">PT006</Link>
//                       </td>
//                       <td>17 Jan 2023</td>
//                       <td>29 Mar 2023</td>
//                       <td className="action-table-data">
//                         <div className="edit-delete-action">
//                           <Link className="me-2 p-2" to="#">
//                             <i data-feather="edit" className="feather-edit" />
//                           </Link>
//                           <Link
//                             className=" confirm-text p-2"
//                             to="#"
//                             onClick={showConfirmationAlert}
//                           >
//                             <i
//                               data-feather="trash-2"
//                               className="feather-trash-2"
//                             />
//                           </Link>
//                         </div>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <label className="checkboxs">
//                           <input type="checkbox" />
//                           <span className="checkmarks" />
//                         </label>
//                       </td>
//                       <td>
//                         <div className="productimgname">
//                           <Link to="#" className="product-img stock-img">
//                             <ImageWithBasePath
//                               src="assets/img/products/expire-product-02.png"
//                               alt="product"
//                             />
//                           </Link>
//                           <Link to="#">Iphone 14 Pro</Link>
//                         </div>
//                       </td>
//                       <td>
//                         <Link to="#">PT007</Link>
//                       </td>
//                       <td>22 Feb 2023</td>
//                       <td>04 Apr 2023</td>
//                       <td className="action-table-data">
//                         <div className="edit-delete-action">
//                           <Link className="me-2 p-2" to="#">
//                             <i data-feather="edit" className="feather-edit" />
//                           </Link>
//                           <Link
//                             className="confirm-text p-2"
//                             to="#"
//                             onClick={showConfirmationAlert}
//                           >
//                             <i
//                               data-feather="trash-2"
//                               className="feather-trash-2"
//                             />
//                           </Link>
//                         </div>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <label className="checkboxs">
//                           <input type="checkbox" />
//                           <span className="checkmarks" />
//                         </label>
//                       </td>
//                       <td>
//                         <div className="productimgname">
//                           <Link to="#" className="product-img stock-img">
//                             <ImageWithBasePath
//                               src="assets/img/products/expire-product-03.png"
//                               alt="product"
//                             />
//                           </Link>
//                           <Link to="#">Black Slim 200 </Link>
//                         </div>
//                       </td>
//                       <td>
//                         <Link to="#">PT008</Link>
//                       </td>
//                       <td>18 Mar 2023</td>
//                       <td>13 May 2023</td>
//                       <td className="action-table-data">
//                         <div className="edit-delete-action">
//                           <Link className="me-2 p-2" to="#">
//                             <i data-feather="edit" className="feather-edit" />
//                           </Link>
//                           <Link
//                             className=" confirm-text p-2"
//                             to="#"
//                             onClick={showConfirmationAlert}
//                           >
//                             <i
//                               data-feather="trash-2"
//                               className="feather-trash-2"
//                             />
//                           </Link>
//                         </div>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <label className="checkboxs">
//                           <input type="checkbox" />
//                           <span className="checkmarks" />
//                         </label>
//                       </td>
//                       <td>
//                         <div className="productimgname">
//                           <Link to="#" className="product-img stock-img">
//                             <ImageWithBasePath
//                               src="assets/img/products/expire-product-04.png"
//                               alt="product"
//                             />
//                           </Link>
//                           <Link to="#">Woodcraft Sandal</Link>
//                         </div>
//                       </td>
//                       <td>
//                         <Link to="#">PT009</Link>
//                       </td>
//                       <td>29 Mar 2023</td>
//                       <td>27 May 2023</td>
//                       <td className="action-table-data">
//                         <div className="edit-delete-action">
//                           <Link className="me-2 p-2" to="#">
//                             <i data-feather="edit" className="feather-edit" />
//                           </Link>
//                           <Link
//                             className=" confirm-text p-2"
//                             to="#"
//                             onClick={showConfirmationAlert}
//                           >
//                             <i
//                               data-feather="trash-2"
//                               className="feather-trash-2"
//                             />
//                           </Link>
//                         </div>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <label className="checkboxs">
//                           <input type="checkbox" />
//                           <span className="checkmarks" />
//                         </label>
//                       </td>
//                       <td>
//                         <div className="productimgname">
//                           <Link to="#" className="product-img stock-img">
//                             <ImageWithBasePath
//                               src="assets/img/products/stock-img-03.png"
//                               alt="product"
//                             />
//                           </Link>
//                           <Link to="#">Apple Series 5 Watch </Link>
//                         </div>
//                       </td>
//                       <td>
//                         <Link to="#">PT010</Link>
//                       </td>
//                       <td>24 Mar 2023</td>
//                       <td>26 May 2023</td>
//                       <td className="action-table-data">
//                         <div className="edit-delete-action">
//                           <Link
//                             className="me-2 p-2"
//                             to="#"
//                             data-bs-toggle="modal"
//                             data-bs-target="#edit-units"
//                           >
//                             <i data-feather="edit" className="feather-edit" />
//                           </Link>
//                           <Link
//                             className=" confirm-text p-2"
//                             to="#"
//                             onClick={showConfirmationAlert}
//                           >
//                             <i
//                               data-feather="trash-2"
//                               className="feather-trash-2"
//                             />
//                           </Link>
//                         </div>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




// import React, { useState, useEffect } from "react";
// import CountUp from "react-countup";
// import {
//   // User,
//   // File,
//   Activity,
//   Clock,
//   TrendingUp,
//   Package,
//   UserCheck,
//   RefreshCw,
//   Tag,
//   Layers,
//   TrendingDown,

//   Users,
//   Shield,
//   UserX
// } from "feather-icons-react/build/IconComponents";
// import { Warehouse } from "lucide-react";
// import Chart from "react-apexcharts";
// import { Link } from "react-router-dom";
// // import ImageWithBasePath from "../../core/img/imagewithbasebath";
// import AuthService from "../../services/authService";
// import Swal from "sweetalert2";

// const Dashboard = () => {
//   // State for dashboard data
//   const [dashboardData, setDashboardData] = useState({
//     users: {
//       total: 0,
//       active: 0,
//       inactive: 0
//     },
//     roles: {
//       total: 0
//     },
//     warehouses: {
//       total: 0,
//       details: []
//     },
//     products: {
//       total: 0,
//       byWarehouse: []
//     },
//     stocks: {
//       total: 0,
//       low: 0
//     }
//   });

//   const [loading, setLoading] = useState(true);
//   const [activities] = useState([
//     { 
//       id: 1, 
//       action: 'Inbound', 
//       product: 'Electronics Batch #EB-2301', 
//       warehouse: 'WH-A', 
//       time: '2 min ago', 
//       status: 'completed',
//       quantity: 450,
//       user: 'John Doe'
//     },
//     { 
//       id: 2, 
//       action: 'Outbound', 
//       product: 'Furniture Set #FS-8920', 
//       warehouse: 'WH-B', 
//       time: '8 min ago', 
//       status: 'in-progress',
//       quantity: 120,
//       user: 'Sarah Smith'
//     },
//     { 
//       id: 3, 
//       action: 'Transfer', 
//       product: 'Textile Items #TI-4567', 
//       warehouse: 'WH-C → WH-D', 
//       time: '15 min ago', 
//       status: 'completed',
//       quantity: 230,
//       user: 'Mike Johnson'
//     },
//     { 
//       id: 4, 
//       action: 'Inbound', 
//       product: 'Raw Materials #RM-1123', 
//       warehouse: 'WH-D', 
//       time: '25 min ago', 
//       status: 'pending',
//       quantity: 680,
//       user: 'Emily Davis'
//     },
//     { 
//       id: 5, 
//       action: 'Outbound', 
//       product: 'Consumer Goods #CG-5589', 
//       warehouse: 'WH-A', 
//       time: '35 min ago', 
//       status: 'completed',
//       quantity: 340,
//       user: 'Robert Wilson'
//     },
//   ]);

//   // Fetch dashboard data using AuthService
//  const fetchDashboardData = async () => {
//   setLoading(true);
//   try {
//     // Single API call instead of multiple
//     const response = await AuthService.getDashboard();
//     const data = response.data.data;

//     setDashboardData({
//       users: data.users || { total: 0, active: 0, inactive: 0 },
//       roles: { total: data.roles || 0 },
//       warehouses: data.warehouses || { total: 0, details: [] },
//       products: data.products || { total: 0 },
//       stocks: data.stocks || { total: 0, low: 0 }
//     });
//   } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: error.response?.data?.message || 'Failed to load dashboard data. Please refresh the page.',
//         confirmButtonText: 'OK'
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   // Stock Movement Chart
//   const [stockMovementChart] = useState({
//     series: [
//       {
//         name: "Inbound",
//         data: [130, 210, 300, 290, 150, 250, 210, 280, 305],
//       },
//       {
//         name: "Outbound",
//         data: [150, 190, 250, 180, 250, 170, 200, 190, 205],
//       },
//     ],
//     colors: ["#28C76F", "#3b82f6"],
//     chart: {
//       type: "line",
//       height: 320,
//       zoom: {
//         enabled: true,
//       },
//       toolbar: {
//         show: true,
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     stroke: {
//       curve: 'smooth',
//       width: 3,
//     },
//     grid: {
//       borderColor: '#e2e8f0',
//     },
//     xaxis: {
//       categories: [
//         "Jan",
//         "Feb",
//         "Mar",
//         "Apr",
//         "May",
//         "Jun",
//         "Jul",
//         "Aug",
//         "Sep",
//       ],
//     },
//     legend: {
//       position: 'top',
//       horizontalAlign: 'right',
//     },
//     tooltip: {
//       shared: true,
//       intersect: false,
//     },
//   });

//   // Warehouse Distribution Chart - Dynamic
//   const warehouseChart = {
//     series: [
//       {
//         name: "Stock Units",
//         data: dashboardData.warehouses.details.map(wh => wh.stock),
//       },
//     ],
//     colors: ["#8b5cf6"],
//     chart: {
//       type: "bar",
//       height: 320,
//       toolbar: {
//         show: true,
//       },
//     },
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         columnWidth: "55%",
//         borderRadius: 8,
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     stroke: {
//       show: true,
//       width: 2,
//       colors: ["transparent"],
//     },
//     xaxis: {
//       categories: dashboardData.warehouses.details.map(wh => wh.name),
//     },
//     fill: {
//       opacity: 1,
//     },
//     tooltip: {
//       y: {
//         formatter: function (val) {
//           return val + " units";
//         },
//       },
//     },
//     grid: {
//       borderColor: '#e2e8f0',
//     },
//   };

//   // Product Category Distribution (Donut Chart) - Dynamic
//   const categoryChart = {
//     series: dashboardData.warehouses.details.map(wh => wh.products),
//     chart: {
//       type: 'donut',
//       height: 320,
//     },
//     labels: dashboardData.warehouses.details.map(wh => wh.name),
//     colors: ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444'],
//     legend: {
//       position: 'bottom',
//     },
//     plotOptions: {
//       pie: {
//         donut: {
//           size: '65%',
//           labels: {
//             show: true,
//             total: {
//               show: true,
//               label: 'Total Products',
//               formatter: function (w) {
//                 return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
//               },
//             },
//           },
//         },
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//   };

//   // Low Stock Trend Chart
//   const [lowStockChart] = useState({
//     series: [
//       {
//         name: "Low Stock Items",
//         data: [8, 12, 9, 15, 10, 18, 14, 11, 16],
//       },
//     ],
//     colors: ["#EA5455"],
//     chart: {
//       type: "area",
//       height: 320,
//       toolbar: {
//         show: true,
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     stroke: {
//       curve: 'smooth',
//       width: 2,
//     },
//     fill: {
//       type: 'gradient',
//       gradient: {
//         shadeIntensity: 1,
//         opacityFrom: 0.7,
//         opacityTo: 0.3,
//       },
//     },
//     xaxis: {
//       categories: [
//         "Jan",
//         "Feb",
//         "Mar",
//         "Apr",
//         "May",
//         "Jun",
//         "Jul",
//         "Aug",
//         "Sep",
//       ],
//     },
//     grid: {
//       borderColor: '#e2e8f0',
//     },
//   });

//   if (loading) {
//     return (
//       <div className="page-wrapper">
//         <div className="content">
//           <div className="text-center p-5">
//             <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
//               <span className="visually-hidden">Loading...</span>
//             </div>
//             <p className="mt-3">Loading dashboard...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="page-wrapper">
//         <div className="content">
//           <div className="page-header mb-3">
//             <div className="add-item d-flex">
//               <div className="page-title">
//                 <h4>Dashboard</h4>
//                 <h6>Real-time Management Overview</h6>
//               </div>
//             </div>
//             <div className="page-btn">
//               <button 
//                 className="btn btn-primary"
//                 onClick={fetchDashboardData}
//                 disabled={loading}
//               >
//                 <RefreshCw size={16} className="me-2" />
//                 Refresh
//               </button>
//             </div>
//           </div>

//           <div className="row">
//             {/* User Stats */}
//             <div className="col-xl-3 col-sm-6 col-12 d-flex">
//               <div className="dash-widget w-100">
//                 {/* <div className="dash-widgetimg">
//                   <span>
//                     <ImageWithBasePath
//                       src="assets/img/icons/dash1.svg"
//                       alt="img"
//                     />
//                   </span>
//                 </div> */}
//                 <div className="dash-imgs">
//                   <Users siz={24}  color="#ff9f43" />
//                 </div>
//                 <div className="dash-widgetcontent">
//                   <h5>
//                     <CountUp 
//                       start={0} 
//                       end={dashboardData.users.total} 
//                       duration={2}
//                     />
//                   </h5>
//                   <h6>Total Users</h6>
//                 </div>
//               </div>
//             </div>

//             <div className="col-xl-3 col-sm-6 col-12 d-flex">
//               <div className="dash-widget dash1 w-100">
//                 {/* <div className="dash-widgetimg">
//                   <span>
//                     <ImageWithBasePath
//                       src="assets/img/icons/dash2.svg"
//                       alt="img"
//                     />
//                   </span>
//                 </div> */}
//                 <div className="dash-imgs">
//                     <UserCheck size={24} color="#22c55e" /> 
//                 </div>
//                 <div className="dash-widgetcontent">
//                   <h5>
//                     <CountUp
//                       start={0}
//                       end={dashboardData.users.active}
//                       duration={2}
//                     />
//                   </h5>
//                   <h6>Total Active Users</h6>
//                 </div>
//               </div>
//             </div>

//             <div className="col-xl-3 col-sm-6 col-12 d-flex">
//               <div className="dash-widget dash2 w-100">
//                 {/* <div className="dash-widgetimg">
//                   <span>
//                     <ImageWithBasePath
//                       src="assets/img/icons/dash3.svg"
//                       alt="img"
//                     />
//                   </span>
//                 </div> */}
//                   <div className="dash-imgs">
//                  <UserX size={24} color="#ef4444" /> 
//                 </div>
//                 <div className="dash-widgetcontent">
//                   <h5>
//                     <CountUp
//                       start={0}
//                       end={dashboardData.users.inactive}
//                       duration={2}
//                     />
//                   </h5>
//                   <h6>Total Inactive Users</h6>
//                 </div>
//               </div>
//             </div>

//             <div className="col-xl-3 col-sm-6 col-12 d-flex">
//               <div className="dash-widget dash3 w-100">
//                 {/* <div className="dash-widgetimg">
//                   <span>
//                     <ImageWithBasePath
//                       src="assets/img/icons/dash4.svg"
//                       alt="img"
//                     />
//                   </span>
//                 </div> */}
//                 <div className="dash-imgs">
//                   <Shield size={24} color="#1b2850" />
//                 </div>
//                 <div className="dash-widgetcontent">
//                   <h5>
//                     <CountUp
//                       start={0}
//                       end={dashboardData.roles.total}
//                       duration={2}
//                     />
//                   </h5>
//                   <h6>All Roles</h6>
//                 </div>
//               </div>
//             </div>

//             {/* Warehouse & Product Stats */}
//             <div className="col-xl-3 col-sm-6 col-12 d-flex">
//               <div className="dash-count">
//                 <div className="dash-counts">
//                   <h4>{dashboardData.warehouses.total}</h4>
//                   <h5>Total Warehouse</h5>
//                 </div>
//                 <div className="dash-imgs">
//                   <Warehouse />
//                 </div>
//               </div>
//             </div>

//             <div className="col-xl-3 col-sm-6 col-12 d-flex">
//               <div className="dash-count das1">
//                 <div className="dash-counts">
//                   <h4>{dashboardData.products.total}</h4>
//                   <h5>Total Products</h5>
//                 </div>
//                 <div className="dash-imgs">
//                   <Tag />
//                 </div>
//               </div>
//             </div>

//             <div className="col-xl-3 col-sm-6 col-12 d-flex">
//               <div className="dash-count das2">
//                 <div className="dash-counts">
//                   <h4>{dashboardData.stocks.total}</h4>
//                   <h5>Total Stocks</h5>
//                 </div>
//                 {/* <div className="dash-imgs">
//                   <ImageWithBasePath
//                     src="assets/img/icons/file-text-icon-01.svg"
//                     className="img-fluid"
//                     alt="icon"
//                   />
//                 </div> */}
//                  <div className="dash-imgs">
//                   <Layers />
//                 </div>
//               </div>
//             </div>

//             <div className="col-xl-3 col-sm-6 col-12 d-flex">
//               <div className="dash-count das3">
//                 <div className="dash-counts">
//                   <h4>{dashboardData.stocks.low}</h4>
//                   <h5>Low Stocks</h5>
//                 </div>
//                 <div className="dash-imgs">
//                   <TrendingDown />
//                 </div>
//               </div>
//             </div>

//             {/* Dynamic Warehouse Cards */}
//             {dashboardData.warehouses.details.length > 0 ? (
//               dashboardData.warehouses.details.map((wh) => (
//                 <div key={wh.id} className="col-xl-3 col-sm-6 col-12 d-flex">
//                   <div className="dash-count w-100" style={{
//                     background: 'white',
//                     borderRadius: '12px',
//                     boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//                     border: '1px solid #e2e8f0',
//                     transition: 'all 0.3s'
//                   }}>
//                     <div className="p-3">
//                       <div className="d-flex justify-content-between align-items-center mb-3">
//                         <h4 className="mb-0 " style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1e293b' }}>
//                           {wh.name}
//                         </h4>
//                         {/* <span style={{
//                           width: '12px',
//                           height: '12px',
//                           borderRadius: '50%',
//                           backgroundColor: wh.capacity > 80 ? '#eab308' : '#22c55e',
//                           display: 'inline-block'
//                         }}></span> */}
//                       </div>
//                       <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//                         <div className="d-flex justify-content-between align-items-center">
//                           <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Products</span>
//                           <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1e293b' }}>
//                             {wh.products}
//                           </span>
//                         </div>
//                         <div className="d-flex justify-content-between align-items-center">
//                           <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Stock Units</span>
//                           <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1e293b' }}>
//                             {wh.stock.toLocaleString()}
//                           </span>
//                         </div>
//                         <div className="d-flex justify-content-between align-items-center">
//                           <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Low Stock</span>
//                           <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#dc2626' }}>
//                             {wh.lowStock}
//                           </span>
//                         </div>
//                         {/* <div className="d-flex justify-content-between align-items-center">
//                           <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Capacity</span>
//                           <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#3b82f6' }}>
//                             {wh.capacity}%
//                           </span>
//                         </div> */}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="col-12">
//                 <div className="alert alert-info">
//                   <p className="mb-0">No warehouse data available. Add warehouses and products to see statistics.</p>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Charts Section */}
//           <div className="row">
//             <div className="col-xl-6 col-sm-12 col-12 d-flex">
//               <div className="card flex-fill">
//                 <div className="card-header d-flex justify-content-between align-items-center">
//                   <h5 className="card-title mb-0">Stock Movement Trend</h5>
//                   <div className="dropdown">
//                     <button
//                       className="btn btn-light btn-sm dropdown-toggle"
//                       type="button"
//                       data-bs-toggle="dropdown"
//                     >
//                       2024
//                     </button>
//                     <ul className="dropdown-menu">
//                       <li><Link to="#" className="dropdown-item">2024</Link></li>
//                       <li><Link to="#" className="dropdown-item">2023</Link></li>
//                       <li><Link to="#" className="dropdown-item">2022</Link></li>
//                     </ul>
//                   </div>
//                 </div>
//                 <div className="card-body">
//                   <Chart
//                     options={stockMovementChart}
//                     series={stockMovementChart.series}
//                     type="line"
//                     height={320}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="col-xl-6 col-sm-12 col-12 d-flex">
//               <div className="card flex-fill">
//                 <div className="card-header d-flex justify-content-between align-items-center">
//                   <h5 className="card-title mb-0">Warehouse Stock Distribution</h5>
//                   <TrendingUp size={20} className="text-success" />
//                 </div>
//                 <div className="card-body">
//                   {dashboardData.warehouses.details.length > 0 ? (
//                     <Chart
//                       options={warehouseChart}
//                       series={warehouseChart.series}
//                       type="bar"
//                       height={320}
//                     />
//                   ) : (
//                     <div className="text-center p-5">
//                       <p>No warehouse data available</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="row">
//             <div className="col-xl-6 col-sm-12 col-12 d-flex">
//               <div className="card flex-fill">
//                 <div className="card-header d-flex justify-content-between align-items-center">
//                   <h5 className="card-title mb-0">Product Distribution by Warehouse</h5>
//                   <Package size={20} className="text-primary" />
//                 </div>
//                 <div className="card-body">
//                   {dashboardData.warehouses.details.length > 0 ? (
//                     <Chart
//                       options={categoryChart}
//                       series={categoryChart.series}
//                       type="donut"
//                       height={320}
//                     />
//                   ) : (
//                     <div className="text-center p-5">
//                       <p>No product data available</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="col-xl-6 col-sm-12 col-12 d-flex">
//               <div className="card flex-fill">
//                 <div className="card-header d-flex justify-content-between align-items-center">
//                   <h5 className="card-title mb-0">Low Stock Alert Trend</h5>
//                   <span className="badge bg-danger">
//                     {dashboardData.stocks.low} Critical
//                   </span>
//                 </div>
//                 <div className="card-body">
//                   <Chart
//                     options={lowStockChart}
//                     series={lowStockChart.series}
//                     type="area"
//                     height={320}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Live Activity Section */}
//           <div className="card">
//             <div className="card-header d-flex justify-content-between align-items-center">
//               <h4 className="card-title mb-0">
//                 <Activity size={20} className="me-2" style={{ display: 'inline' }} />
//                 Live Activity
//               </h4>
//               <div className="d-flex align-items-center gap-2">
//                 <span className="badge bg-success">
//                   <span className="pulse-dot" style={{
//                     width: '8px',
//                     height: '8px',
//                     backgroundColor: '#fff',
//                     borderRadius: '50%',
//                     display: 'inline-block',
//                     marginRight: '5px',
//                     animation: 'pulse 2s infinite'
//                   }}></span>
//                   Live
//                 </span>
//                 <Link to="#" className="btn btn-sm btn-light">
//                   View All
//                 </Link>
//               </div>
//             </div>
//             <div className="card-body">
//               <div className="table-responsive dataview">
//                 <table className="table table-hover dashboard-expired-products">
//                   <thead>
//                     <tr>
//                       <th>Action</th>
//                       <th>Product</th>
//                       <th>Warehouse</th>
//                       <th>Quantity</th>
//                       <th>User</th>
//                       <th>Time</th>
//                       <th>Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {activities.map(activity => (
//                       <tr key={activity.id}>
//                         <td>
//                           <span className={`badge ${
//                             activity.action === 'Inbound' ? 'badge-linesuccess' :
//                             activity.action === 'Outbound' ? 'badge-lineprimary' :
//                             activity.action === 'Transfer' ? 'badge-linewarning' :
//                             'badge-lineinfo'
//                           }`}>
//                             {activity.action}
//                           </span>
//                         </td>
//                         <td>
//                           <strong>{activity.product}</strong>
//                         </td>
//                         <td>{activity.warehouse}</td>
//                         <td><span className="badge badge-primary">{activity.quantity} units</span></td>
//                         <td>
//                           <div className="d-flex align-items-center">
//                             <div className="avatar avatar-xs me-2" style={{
//                               width: '32px',
//                               height: '32px',
//                               display: 'inline-flex',
//                               alignItems: 'center',
//                               justifyContent: 'center'
//                             }}>
//                               <span style={{
//                                 width: '100%',
//                                 height: '100%',
//                                 borderRadius: '50%',
//                                 backgroundColor: '#e2e8f0',
//                                 color: '#1e293b',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 fontSize: '0.75rem',
//                                 fontWeight: '600'
//                               }}>
//                                 {activity.user.split(' ').map(n => n[0]).join('')}
//                               </span>
//                             </div>
//                             {activity.user}
//                           </div>
//                         </td>
//                         <td>
//                           <Clock size={14} className="me-1" />
//                           {activity.time}
//                         </td>
//                         <td>
//                           <span className={`badge ${
//                             activity.status === 'completed' ? 'badge-linesuccess' :
//                             activity.status === 'in-progress' ? 'badge-linewarning' :
//                             'badge-secondary'
//                           }`}>
//                             {activity.status === 'completed' ? 'Completed' :
//                              activity.status === 'in-progress' ? 'In Progress' :
//                              'Pending'}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// //Main working Dashboard

// import React, { useState, useEffect } from "react";
// import CountUp from "react-countup";
// import {
//   Activity,
//   Clock,
//   TrendingUp,
//   Package,
//   UserCheck,
//   RefreshCw,
//   Tag,
//   Layers,
//   // TrendingDown,
//   Users,
//   Shield,
//   UserX,
//   AlertTriangle,
//   XCircle,
//   AlertCircle,
// } from "feather-icons-react/build/IconComponents";
// import { Warehouse } from "lucide-react";
// import Chart from "react-apexcharts";
// import { Link } from "react-router-dom";
// import AuthService from "../../services/authService";
// import Swal from "sweetalert2";

// const Dashboard = () => {
//   const [dashboardData, setDashboardData] = useState({
//     users: { total: 0, active: 0, inactive: 0 },
//     roles: { total: 0 },
//     warehouses: { total: 0, details: [] },
//     products: { total: 0 },
//     stocks: { total: 0, low: 0, outOfStock: 0, threshold: 10 },
//     lowStockProducts: [],
//     outOfStockProducts: [],
//     stockByStatus: [],
//     lowStockTrend: [],
//   });

//   const [loading, setLoading] = useState(true);
//   const [activities] = useState([
//     { 
//       id: 1, 
//       action: 'Inbound', 
//       product: 'Electronics Batch #EB-2301', 
//       warehouse: 'WH-A', 
//       time: '2 min ago', 
//       status: 'completed',
//       quantity: 450,
//       user: 'John Doe'
//     },
//     { 
//       id: 2, 
//       action: 'Outbound', 
//       product: 'Furniture Set #FS-8920', 
//       warehouse: 'WH-B', 
//       time: '8 min ago', 
//       status: 'in-progress',
//       quantity: 120,
//       user: 'Sarah Smith'
//     },
//     { 
//       id: 3, 
//       action: 'Transfer', 
//       product: 'Textile Items #TI-4567', 
//       warehouse: 'WH-C → WH-D', 
//       time: '15 min ago', 
//       status: 'completed',
//       quantity: 230,
//       user: 'Mike Johnson'
//     },
//   ]);

//   const fetchDashboardData = async () => {
//     setLoading(true);
//     try {
//       const response = await AuthService.getDashboard();
//       const data = response.data.data;

//       setDashboardData({
//         users: data.users || { total: 0, active: 0, inactive: 0 },
//         roles: { total: data.roles || 0 },
//         warehouses: data.warehouses || { total: 0, details: [] },
//         products: data.products || { total: 0 },
//         stocks: data.stocks || { total: 0, low: 0, outOfStock: 0, threshold: 10 },
//         lowStockProducts: data.lowStockProducts || [],
//         outOfStockProducts: data.outOfStockProducts || [],
//         stockByStatus: data.stockByStatus || [],
//         lowStockTrend: data.lowStockTrend || [],
//       });
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: error.response?.data?.message || 'Failed to load dashboard data.',
//         confirmButtonText: 'OK'
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);


// // Get today
// const today = new Date();

// // Create array for last 30 days including today
// const last30Days = [];
// for (let i = 29; i >= 0; i--) {
//   const d = new Date();
//   d.setDate(today.getDate() - i); // subtract i days
//   last30Days.push(new Date(d));
// }

// // Map dashboardData.lowStockTrend onto last30Days
// const monthData = last30Days.map(date => {
//   const dayData = dashboardData.lowStockTrend.find(item =>
//     new Date(item.date).toDateString() === date.toDateString()
//   );
//   return {
//     date,
//     count: dayData ? dayData.count : 0
//   };
// });


//   // Stock Movement Chart
//   const stockMovementChart = {
//     series: [
//       {
//         name: "Inbound",
//         data: [130, 210, 300, 290, 150, 250, 210, 280, 305],
//       },
//       {
//         name: "Outbound",
//         data: [150, 190, 250, 180, 250, 170, 200, 190, 205],
//       },
//     ],
//     colors: ["#28C76F", "#3b82f6"],
//     chart: {
//       type: "line",
//       height: 320,
//       zoom: { enabled: true },
//       toolbar: { show: true },
//     },
//     dataLabels: { enabled: false },
//     stroke: { curve: 'smooth', width: 3 },
//     grid: { borderColor: '#e2e8f0' },
//     xaxis: {
//       categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
//     },
//     legend: { position: 'top', horizontalAlign: 'right' },
//     tooltip: { shared: true, intersect: false },
//   };

//   // Warehouse Distribution Chart
//   const warehouseChart = {
//     series: [{
//       name: "Stock Units",
//       data: dashboardData.warehouses.details.map(wh => wh.stock),
//     }],
//     colors: ["#8b5cf6"],
//     chart: { type: "bar", height: 320, toolbar: { show: true } },
//     plotOptions: {
//       bar: { horizontal: false, columnWidth: "55%", borderRadius: 8 },
//     },
//     dataLabels: { enabled: false },
//     stroke: { show: true, width: 2, colors: ["transparent"] },
//     xaxis: {
//       categories: dashboardData.warehouses.details.map(wh => wh.name),
//     },
//     fill: { opacity: 1 },
//     tooltip: {
//       y: { formatter: (val) => val + " units" },
//     },
//     grid: { borderColor: '#e2e8f0' },
//   };

//   // Product Category Distribution
//   const categoryChart = {
//     series: dashboardData.warehouses.details.map(wh => wh.products),
//     chart: { type: 'donut', height: 320 },
//     labels: dashboardData.warehouses.details.map(wh => wh.name),
//     colors: ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444'],
//     legend: { position: 'bottom' },
//     plotOptions: {
//       pie: {
//         donut: {
//           size: '65%',
//           labels: {
//             show: true,
//             total: {
//               show: true,
//               label: 'Total Products',
//               formatter: (w) => w.globals.seriesTotals.reduce((a, b) => a + b, 0),
//             },
//           },
//         },
//       },
//     },
//     dataLabels: { enabled: false },
//   };

//   // Low Stock Trend Chart (Dynamic)
//   // const lowStockChart = {
//   //   series: [{
//   //     name: "Low Stock Items",
//   //     data: dashboardData.lowStockTrend.slice(0, 9).reverse().map(item => item.count),
//   //   }],
//   //   colors: ["#EA5455"],
//   //   chart: { type: "area", height: 320, toolbar: { show: true } },
//   //   dataLabels: { enabled: false },
//   //   stroke: { curve: 'smooth', width: 2 },
//   //   fill: {
//   //     type: 'gradient',
//   //     gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3 },
//   //   },
//   //   xaxis: {
//   //     categories: dashboardData.lowStockTrend.slice(0, 9).reverse().map(item => 
//   //       new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
//   //     ),
//   //   },
//   //   grid: { borderColor: '#e2e8f0' },
//   // };


//   const lowStockChart = {
//   series: [{
//     name: "Low Stock Items",
//     data: monthData.map(item => item.count),
//   }],
//   colors: ["#EA5455"],
//   chart: { type: "area", height: 320, toolbar: { show: true } },
//   dataLabels: { enabled: false },
//   stroke: { curve: 'smooth', width: 2 },
//   fill: {
//     type: 'gradient',
//     gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3 },
//   },
//   xaxis: {
//     categories: monthData.map(item =>
//       item.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
//     ),
//   },
//   grid: { borderColor: '#e2e8f0' },
// };



//   // Stock Status Pie Chart
//   const stockStatusChart = {
//     series: dashboardData.stockByStatus.map(item => item.count),
//     chart: { type: 'pie', height: 320 },
//     labels: dashboardData.stockByStatus.map(item => item.status.charAt(0).toUpperCase() + item.status.slice(1)),
//     colors: ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'],
//     legend: { position: 'bottom' },
//     dataLabels: { enabled: true },
//   };

//   if (loading) {
//     return (
//       <div className="page-wrapper">
//         <div className="content">
//           <div className="text-center p-5">
//             <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
//               <span className="visually-hidden">Loading...</span>
//             </div>
//             <p className="mt-3">Loading dashboard...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="page-wrapper">
//       <div className="content">
//         <div className="page-header mb-3">
//           <div className="add-item d-flex">
//             <div className="page-title">
//               <h4>Dashboard</h4>
//               <h6>Real-time Management Overview</h6>
//             </div>
//           </div>
//           <div className="page-btn">
//             <button 
//               className="btn btn-primary"
//               onClick={fetchDashboardData}
//               disabled={loading}
//             >
//               <RefreshCw size={16} className="me-2" />
//               Refresh
//             </button>
//           </div>
//         </div>

//         {/* User & System Stats Row */}
//         <div className="row">
//           <div className="col-xl-3 col-sm-6 col-12 d-flex">
//             <div className="dash-widget w-100">
//               <div className="dash-imgs">
//                 <Users size={24} color="#ff9f43" />
//               </div>
//               <div className="dash-widgetcontent">
//                 <h5><CountUp start={0} end={dashboardData.users.total} duration={2} /></h5>
//                 <h6>Total Users</h6>
//               </div>
//             </div>
//           </div>

//           <div className="col-xl-3 col-sm-6 col-12 d-flex">
//             <div className="dash-widget dash1 w-100">
//               <div className="dash-imgs">
//                 <UserCheck size={24} color="#22c55e" /> 
//               </div>
//               <div className="dash-widgetcontent">
//                 <h5><CountUp start={0} end={dashboardData.users.active} duration={2} /></h5>
//                 <h6>Active Users</h6>
//               </div>
//             </div>
//           </div>

//           <div className="col-xl-3 col-sm-6 col-12 d-flex">
//             <div className="dash-widget dash2 w-100">
//               <div className="dash-imgs">
//                 <UserX size={24} color="#ef4444" /> 
//               </div>
//               <div className="dash-widgetcontent">
//                 <h5><CountUp start={0} end={dashboardData.users.inactive} duration={2} /></h5>
//                 <h6>Inactive Users</h6>
//               </div>
//             </div>
//           </div>

//           <div className="col-xl-3 col-sm-6 col-12 d-flex">
//             <div className="dash-widget dash3 w-100">
//               <div className="dash-imgs">
//                 <Shield size={24} color="#1b2850" />
//               </div>
//               <div className="dash-widgetcontent">
//                 <h5><CountUp start={0} end={dashboardData.roles.total} duration={2} /></h5>
//                 <h6>All Roles</h6>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Warehouse & Stock Stats Row */}
//         <div className="row">
//           <div className="col-xl-3 col-sm-6 col-12 d-flex">
//             <div className="dash-count">
//               <div className="dash-counts">
//                 <h4>{dashboardData.warehouses.total}</h4>
//                 <h5>Total Warehouses</h5>
//               </div>
//               <div className="dash-imgs">
//                 <Warehouse />
//               </div>
//             </div>
//           </div>

//           <div className="col-xl-3 col-sm-6 col-12 d-flex">
//             <div className="dash-count das1">
//               <div className="dash-counts">
//                 <h4>{dashboardData.products.total}</h4>
//                 <h5>Total Products</h5>
//               </div>
//               <div className="dash-imgs">
//                 <Tag />
//               </div>
//             </div>
//           </div>

//           <div className="col-xl-3 col-sm-6 col-12 d-flex">
//             <div className="dash-count das2">
//               <div className="dash-counts">
//                 <h4>{dashboardData.stocks.total}</h4>
//                 <h5>Total Stock Units</h5>
//               </div>
//               <div className="dash-imgs">
//                 <Layers />
//               </div>
//             </div>
//           </div>

//           <div className="col-xl-3 col-sm-6 col-12 d-flex">
//             <div className="dash-count das3">
//               <div className="dash-counts">
//                 <h4>{dashboardData.stocks.low}</h4>
//                 <h5>Low Stock Items</h5>
//               </div>
//               <div className="dash-imgs">
//                 <AlertTriangle color="#f59e0b" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Stock Alert Cards Row */}
//         <div className="row">
//           <div className="col-xl-8 col-12">
//             <div className="card">
//               <div className="card-header bg-warning bg-opacity-10 border-warning">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <h5 className="card-title mb-0 text-warning">
//                     <AlertTriangle size={20} className="me-2" />
//                     Low Stock Alert ({dashboardData.stocks.low})
//                   </h5>
//                   <Link to="/inventory/low-stocks" className="btn btn-sm btn-warning">
//                     View All
//                   </Link>
//                 </div>
//               </div>
//               <div className="card-body">
//                 {dashboardData.lowStockProducts.length === 0 ? (
//                   <div className="text-center py-4">
//                     <AlertCircle size={48} className="text-muted mb-2" />
//                     <p className="text-muted">No low stock items</p>
//                   </div>
//                 ) : (
//                   <div className="table-responsive">
//                     <table className="table table-sm">
//                       <thead>
//                         <tr>
//                           <th>Product</th>
//                           <th>Warehouse</th>
//                           <th>Qty</th>
//                           <th>Status</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {dashboardData.lowStockProducts.map(product => (
//                           <tr key={product.id}>
//                             <td>
//                               <div>
//                                 <strong>{product.title}</strong>
//                                 <br />
//                                 <small className="text-muted">{product.barcode}</small>
//                               </div>
//                             </td>
//                             <td>{product.warehouse_name}</td>
//                             <td>
//                               <span className="badge badge-warning">{product.count}</span>
//                             </td>
//                             <td>
//                               <span className={`badge badge-${
//                                 product.status === 'new' ? 'success' :
//                                 product.status === 'used' ? 'info' :
//                                 product.status === 'broken' ? 'danger' : 'secondary'
//                               }`}>
//                                 {product.status}
//                               </span>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="col-xl-4   col-12">
//             <div className="card">
//               <div className="card-header bg-danger bg-opacity-10 border-danger">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <h5 className="card-title mb-0 text-danger">
//                     <XCircle size={20} className="me-2" />
//                     Out of Stock ({dashboardData.stocks.outOfStock})
//                   </h5>
//                   <Link to="/inventory/low-stocks" className="btn btn-sm btn-danger">
//                     View All
//                   </Link>
//                 </div>
//               </div>
//               <div className="card-body">
//                 {dashboardData.outOfStockProducts.length === 0 ? (
//                   <div className="text-center py-4">
//                     <Package size={48} className="text-muted mb-2" />
//                     <p className="text-muted">No out of stock items</p>
//                   </div>
//                 ) : (
//                   <div className="table-responsive">
//                     <table className="table table-sm">
//                       <thead>
//                         <tr>
//                           <th>Product</th>
//                           <th>Warehouse</th>
//                           <th>Last Updated</th>
//                           <th>Status</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {dashboardData.outOfStockProducts.map(product => (
//                           <tr key={product.id}>
//                             <td>
//                               <div>
//                                 <strong>{product.title}</strong>
//                                 <br />
//                                 <small className="text-muted">{product.barcode}</small>
//                               </div>
//                             </td>
//                             <td>{product.warehouse_name}</td>
//                             <td>
//                               <small>
//                                 {new Date(product.updated_at).toLocaleDateString()}
//                               </small>
//                             </td>
//                             <td>
//                               <span className="badge badge-danger">
//                                 Out of Stock
//                               </span>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Warehouse Details Cards */}
//         {/* <div className="row">
//           {dashboardData.warehouses.details.length > 0 ? (
//             dashboardData.warehouses.details.map((wh) => (
//               <div key={wh.id} className="col-xl-3 col-sm-6 col-12 d-flex">
//                 <div className="dash-count w-100" >
//                   <div className="p-3">
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                       <h4 className="mb-0" style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>
//                         {wh.name}
//                       </h4>
//                       {(wh.lowStock > 0 || wh.outOfStock > 0) && (
//                         <AlertTriangle size={16} color="#f59e0b" />
//                       )}
//                     </div>
//                     <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//                       <div className="d-flex justify-content-between align-items-center">
//                         <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Products</span>
//                         <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>{wh.products}</span>
//                       </div>
//                       <div className="d-flex justify-content-between align-items-center">
//                         <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Stock Units</span>
//                         <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>
//                           {wh.stock.toLocaleString()}
//                         </span>
//                       </div>
//                       <div className="d-flex justify-content-between ">
//                         <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Low Stock</span>
//                         <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#f59e0b' }}>
//                           {wh.lowStock}
//                         </span>
//                       </div>
//                       <div className="d-flex justify-content-between">
//                         <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Out of Stock</span>
//                         <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#dc2626' }}>
//                           {wh.outOfStock}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="col-12">
//               <div className="alert alert-info">
//                 No warehouse data available. Add warehouses and products to see statistics.
//               </div>
//             </div>
//           )} */}
//         {/* </div> */}
        
     
// <div className="row">
//   {dashboardData.warehouses.details.length > 0 ? (
//     dashboardData.warehouses.details.map((wh) => (
//       <div key={wh.id} className="col-xl-3 col-sm-6 col-12 d-flex">
//         <div className="warehouse-card w-100">
//           <div className="warehouse-card-body">
//             <div className="warehouse-header">
//               <h4>{wh.name}</h4>
//               {(wh.lowStock > 0 || wh.outOfStock > 0) && (
//                 <AlertTriangle size={16} className="alert-icon" />
//               )}
//             </div>
//             <div className="warehouse-stats">
//               <div className="stat-row">
//                 <span className="stat-label">Products</span>
//                 <span className="stat-value">{wh.products}</span>
//               </div>
//               <div className="stat-row">
//                 <span className="stat-label">Stock Units</span>
//                 <span className="stat-value">
//                   {wh.stock.toLocaleString()}
//                 </span>
//               </div>
//               <div className="stat-row">
//                 <span className="stat-label">Low Stock</span>
//                 <span className="stat-value low-stock">
//                   {wh.lowStock}
//                 </span>
//               </div>
//               <div className="stat-row">
//                 <span className="stat-label">Out of Stock</span>
//                 <span className="stat-value out-of-stock">
//                   {wh.outOfStock}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     ))
//   ) : (
//     <div className="col-12">
//       <div className="alert-info-custom">
//         <p>No warehouse data available. Add warehouses and products to see statistics.</p>
//       </div>
//     </div>
//   )}
// </div>

//         {/* Charts Section */}
//         <div className="row">
//           <div className="col-xl-6 col-sm-12 col-12 d-flex">
//             <div className="card flex-fill">
//               <div className="card-header d-flex justify-content-between align-items-center">
//                 <h5 className="card-title mb-0">Stock Movement Trend</h5>
//               </div>
//               <div className="card-body">
//                 <Chart
//                   options={stockMovementChart}
//                   series={stockMovementChart.series}
//                   type="line"
//                   height={320}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="col-xl-6 col-sm-12 col-12 d-flex">
//             <div className="card flex-fill">
//               <div className="card-header d-flex justify-content-between align-items-center">
//                 <h5 className="card-title mb-0">Warehouse Stock Distribution</h5>
//                 <TrendingUp size={20} className="text-success" />
//               </div>
//               <div className="card-body">
//                 {dashboardData.warehouses.details.length > 0 ? (
//                   <Chart
//                     options={warehouseChart}
//                     series={warehouseChart.series}
//                     type="bar"
//                     height={320}
//                   />
//                 ) : (
//                   <div className="text-center p-5">
//                     <p>No warehouse data available</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="row">
//           <div className="col-xl-6 col-sm-12 col-12 d-flex">
//             <div className="card flex-fill">
//               <div className="card-header d-flex justify-content-between align-items-center">
//                 <h5 className="card-title mb-0">Product Distribution by Warehouse</h5>
//                 <Package size={20} className="text-primary" />
//               </div>
//               <div className="card-body">
//                 {dashboardData.warehouses.details.length > 0 ? (
//                   <Chart
//                     options={categoryChart}
//                     series={categoryChart.series}
//                     type="donut"
//                     height={320}
//                   />
//                 ) : (
//                   <div className="text-center p-5">
//                     <p>No product data available</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="col-xl-6 col-sm-12 col-12 d-flex">
//             <div className="card flex-fill">
//               <div className="card-header d-flex justify-content-between align-items-center">
//                 <h5 className="card-title mb-0">Low Stock Alert Trend (Last 30 Days)</h5>
//                 <span className="badge bg-danger">
//                   {dashboardData.stocks.low} Critical
//                 </span>
//               </div>
//               <div className="card-body">
//                 {dashboardData.lowStockTrend.length > 0 ? (
//                   <Chart
//                     options={lowStockChart}
//                     series={lowStockChart.series}
//                     type="area"
//                     height={320}
//                   />
//                 ) : (
//                   <div className="text-center p-5">
//                     <p>No trend data available</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Stock Status & Activity */}
//         {/* <div className="row">
//           {dashboardData.stockByStatus.length > 0 && (
//             <div className="col-xl-6 col-sm-12 col-12 d-flex">
//               <div className="card flex-fill">
//                 <div className="card-header">
//                   <h5 className="card-title mb-0">Stock by Status</h5>
//                 </div>
//                 <div className="card-body">
//                   <Chart
//                     options={stockStatusChart}
//                     series={stockStatusChart.series}
//                     type="pie"
//                     height={320}
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className={`col-xl-${dashboardData.stockByStatus.length > 0 ? '6' : '12'} col-sm-12 col-12 d-flex`}>
//             <div className="card flex-fill">
//               <div className="card-header d-flex justify-content-between align-items-center">
//                 <h4 className="card-title mb-0">
//                   <Activity size={20} className="me-2" style={{ display: 'inline' }} />
//                   Live Activity
//                 </h4>
//                 <div className="d-flex align-items-center gap-2">
//                   <span className="badge bg-success">
//                     <span className="pulse-dot"></span>
//                     Live
//                   </span>
//                   <Link to="#" className="btn btn-sm btn-light">View All</Link>
//                 </div>
//               </div>
//               <div className="card-body">
//                 <div className="table-responsive">
//                   <table className="table table-hover">
//                     <thead>
//                       <tr>
//                         <th>Action</th>
//                         <th>Product</th>
//                         <th>Warehouse</th>
//                         <th>Time</th>
//                         <th>Status</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {activities.map(activity => (
//                         <tr key={activity.id}>
//                           <td>
//                             <span className={`badge ${
//                               activity.action === 'Inbound' ? 'badge-linesuccess' :
//                               activity.action === 'Outbound' ? 'badge-lineprimary' :
//                               'badge-linewarning'
//                             }`}>
//                               {activity.action}
//                             </span>
//                           </td>
//                           <td><strong>{activity.product}</strong></td>
//                           <td>{activity.warehouse}</td>
//                           <td>
//                             <Clock size={14} className="me-1" />
//                             {activity.time}
//                           </td>
//                           <td>
//                             <span className={`badge ${
//                               activity.status === 'completed' ? 'badge-linesuccess' :
//                               activity.status === 'in-progress' ? 'badge-linewarning' :
//                               'badge-secondary'
//                             }`}>
//                               {activity.status === 'completed' ? 'Completed' :
//                                activity.status === 'in-progress' ? 'In Progress' : 'Pending'}
//                             </span>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div> */}
//         {/* </div> */}
//         <div className="row">
//   {dashboardData.stockByStatus.length > 0 && (
//     <div className="col-xl-6 col-sm-12 col-12 d-flex">
//       <div className="card flex-fill">
//         <div className="card-header">
//           <h5 className="card-title mb-0">Stock by Status</h5>
//         </div>
//         <div className="card-body">
//           <Chart
//             options={stockStatusChart}
//             series={stockStatusChart.series}
//             type="pie"
//             height={320}
//           />
//         </div>
//       </div>
//     </div>
//   )}

//   <div className={`col-xl-${dashboardData.stockByStatus.length > 0 ? '6' : '12'} col-sm-12 col-12 d-flex`}>
//     <div className="card flex-fill">
//       <div className="card-header d-flex justify-content-between align-items-center">
//         <h4 className="card-title mb-0">
//           <Activity size={20} className="me-2" style={{ display: 'inline' }} />
//           Live Activity
//         </h4>
//         <div className="d-flex align-items-center gap-2">
//           <span className="badge bg-success">
//             <span className="pulse-dot"></span>
//             Live
//           </span>
//           <Link to="#" className="btn btn-sm btn-light">View All</Link>
//         </div>
//       </div>
//       <div className="card-body">
//         <div className="table-responsive">
//           <table className="table table-hover">
//             <thead>
//               <tr>
//                 <th>Action</th>
//                 <th>Product</th>
//                 <th>Warehouse</th>
//                 <th>Time</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {activities.map(activity => (
//                 <tr key={activity.id}>
//                   <td>
//                     <span className={`badge ${
//                       activity.action === 'Inbound' ? 'badge-linesuccess' :
//                       activity.action === 'Outbound' ? 'badge-lineprimary' :
//                       'badge-linewarning'
//                     }`}>
//                       {activity.action}
//                     </span>
//                   </td>
//                   <td><strong>{activity.product}</strong></td>
//                   <td>{activity.warehouse}</td>
//                   <td>
//                     <Clock size={14} className="me-1" />
//                     {activity.time}
//                   </td>
//                   <td>
//                     <span className={`badge ${
//                       activity.status === 'completed' ? 'badge-linesuccess' :
//                       activity.status === 'in-progress' ? 'badge-linewarning' :
//                       'badge-secondary'
//                     }`}>
//                       {activity.status === 'completed' ? 'Completed' :
//                        activity.status === 'in-progress' ? 'In Progress' : 'Pending'}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
// {/*  */}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import {
  Activity,
  Clock,
  TrendingUp,
  Package,
  UserCheck,
  RefreshCw,
  Tag,
  Layers,
  Users,
  Shield,
  UserX,
  AlertTriangle,
  XCircle,
  AlertCircle,
} from "feather-icons-react/build/IconComponents";
import { Warehouse } from "lucide-react";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import AuthService from "../../services/authService";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    users: { total: 0, active: 0, inactive: 0 },
    roles: { total: 0 },
    warehouses: { total: 0, details: [] },
    products: { total: 0 },
    stocks: { total: 0, low: 0, outOfStock: 0, threshold: 10 },
    lowStockProducts: [],
    outOfStockProducts: [],
    stockByStatus: [],
    lowStockTrend: [],
  });
const [chartData, setChartData] = useState({
  stockFlowMovement: [],
  lowStockTrend: [],
  lowStockTrendWarehouses: []
});
  const [activities, setActivities] = useState([]);
  const [stockFlowStats, setStockFlowStats] = useState({
    total: 0,
    approved: 0,
    in_transit: 0,
    delivered: 0,
    total_quantity: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const response = await AuthService.getDashboard();
      const data = response.data.data;

      setDashboardData({
        users: data.users || { total: 0, active: 0, inactive: 0 },
        roles: { total: data.roles || 0 },
        warehouses: data.warehouses || { total: 0, details: [] },
        products: data.products || { total: 0 },
        stocks: data.stocks || { total: 0, low: 0, outOfStock: 0, threshold: 10 },
        lowStockProducts: data.lowStockProducts || [],
        outOfStockProducts: data.outOfStockProducts || [],
        stockByStatus: data.stockByStatus || [],
        lowStockTrend: data.lowStockTrend || [],
      });
      if (data.charts) {
      setChartData({
        stockFlowMovement: data.charts.stockFlowMovement || [],
        lowStockTrend: data.charts.lowStockTrend || [],
        lowStockTrendWarehouses: data.charts.lowStockTrendWarehouses || []
      });
    }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to load dashboard data.',
        confirmButtonText: 'OK'
      });
    }
  };

  // const fetchActivities = async () => {
  //   try {
  //     const response = await AuthService.getActivities({ limit: 5 });
  //     if (response.data.success) {
  //       setActivities(response.data.data || []);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching activities:', error);
  //   }
  // };

  const fetchActivities = async () => {
  try {
    const response = await AuthService.getActivities({ limit: 5 });
    if (response.data.success) {
      console.log('Fetched activities:', response.data.data);
      setActivities(response.data.data || []);
    }
  } catch (error) {
    console.error('Error fetching activities:', error);
  }
};


  const fetchStockFlowStats = async () => {
    try {
      const response = await AuthService.getStockFlowStats();
      if (response.data.success) {
        setStockFlowStats(response.data.data || {
          total: 0,
          approved: 0,
          in_transit: 0,
          delivered: 0,
          total_quantity: 0
        });
      }
    } catch (error) {
      console.error('Error fetching stock flow stats:', error);
    }
  };

  useEffect(() => {
  // Fix scroll issue when navigating to dashboard
  window.scrollTo(0, 0);
  document.body.style.overflow = 'auto';
  
  return () => {
    document.body.style.overflow = 'auto';
  };
}, []);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([
        fetchDashboardData(),
        fetchActivities(),
        fetchStockFlowStats()
      ]);
      setLoading(false);
    };
    fetchAllData();
  }, []);


  const formatActivityTime = (createdAt) => {
    const now = new Date();
    const activityDate = new Date(createdAt);
    const diffMs = now - activityDate;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  const getActivityBadgeClass = (action) => {
    const actionLower = (action || '').toLowerCase();
    const actionMap = {
      'create': 'badge-linesuccess',
      'created': 'badge-linesuccess',
      'update': 'badge-linewarning',
      'updated': 'badge-linewarning',
      'delete': 'badge-linedanger',
      'deleted': 'badge-linedanger',
      'inbound': 'badge-linesuccess',
      'outbound': 'badge-lineprimary',
      'transfer': 'badge-linewarning',
      'approved': 'badge-linesuccess',
      'in-transit': 'badge-linewarning',
      'delivered': 'badge-linesuccess'
    };
    return actionMap[actionLower] || 'badge-secondary';
  };

  const formatLabel = (value) => {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, ' ');
  };

  
  const today = new Date();


  const last30Days = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    last30Days.push(new Date(d));
  }


  // const monthData = last30Days.map(date => {
  //   const dayData = dashboardData.lowStockTrend.find(item =>
  //     new Date(item.date).toDateString() === date.toDateString()
  //   );
  //   return {
  //     date,
  //     count: dayData ? dayData.count : 0
  //   };
  // });


  const stockMovementChart = {
  series: [
    {
      name: "Approved",
      data: chartData.stockFlowMovement.map(d => d.approved || 0),
    },
    {
      name: "In Transit",
      data: chartData.stockFlowMovement.map(d => d['in-transit'] || 0),
    },
    {
      name: "Delivered",
      data: chartData.stockFlowMovement.map(d => d.delivered || 0),
    },
  ],
  colors: ["#3B82F6", "#F59E0B", "#22C55E"],
  chart: {
    type: "line",
    height: 320,
    zoom: { enabled: true },
    toolbar: { show: true },
  },
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 3 },
  grid: { borderColor: '#e2e8f0' },
  xaxis: {
    categories: chartData.stockFlowMovement.map(d =>
      new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    ),
  },
  legend: { position: 'top', horizontalAlign: 'right' },
  tooltip: { 
    shared: true, 
    intersect: false,
    y: {
      formatter: (val) => val + " units"
    }
  },
};

  // Warehouse Distribution Chart
  const warehouseChart = {
    series: [{
      name: "Stock Units",
      data: dashboardData.warehouses.details.map(wh => wh.stock),
    }],
    colors: ["#8b5cf6"],
    chart: { type: "bar", height: 320, toolbar: { show: true } },
    plotOptions: {
      bar: { horizontal: false, columnWidth: "55%", borderRadius: 8 },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    xaxis: {
      categories: dashboardData.warehouses.details.map(wh => wh.name),
    },
    fill: { opacity: 1 },
    tooltip: {
      y: { formatter: (val) => val + " units" },
    },
    grid: { borderColor: '#e2e8f0' },
  };

  // Product Category Distribution
  const categoryChart = {
    series: dashboardData.warehouses.details.map(wh => wh.products),
    chart: { type: 'donut', height: 320 },
    labels: dashboardData.warehouses.details.map(wh => wh.name),
    colors: ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444'],
    legend: { position: 'bottom' },

    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Products',
              formatter: (w) => w.globals.seriesTotals.reduce((a, b) => a + b, 0),
            },
          },
        },
      },
    },
    dataLabels: { enabled: false },
  };

  const lowStockChart = {
  series: chartData.lowStockTrendWarehouses.map(warehouse => ({
    name: warehouse,
    data: chartData.lowStockTrend.map(d => d[warehouse] || 0)
  })),
  colors: ["#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6"], 
  chart: { 
    type: "bar", 
    height: 320, 
    toolbar: { show: true },
    stacked: true 
  },
  plotOptions: {
    bar: { 
      horizontal: false, 
      columnWidth: "55%",
      borderRadius: 5
    },
  },
  dataLabels: { enabled: false },
  stroke: { show: true, width: 2, colors: ["transparent"] },
  xaxis: {
    categories: chartData.lowStockTrend.map(d =>
      new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    ),
  },
  legend: { 
    position: 'top',
    horizontalAlign: 'right'
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: (val) => val + " products"
    }
  },
  grid: { borderColor: '#e2e8f0' },
};

  // Stock Status Pie Chart
  const stockStatusChart = {
    series: dashboardData.stockByStatus.map(item => item.count),
    chart: { type: 'pie', height: 320 },
    labels: dashboardData.stockByStatus.map(item => formatLabel(item.status)),
    colors: ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'],
    legend: { position: 'bottom' },
    dataLabels: { enabled: true },
  };

  if (loading) {
    return (
      <div className="page-wrapper">
        <div className="content">
          <div className="text-center p-5">
            <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading dashboard...</p>
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
              <h4>Dashboard</h4>
              <h6>Real-time Management Overview</h6>
            </div>
          </div>
          <div className="page-btn">
            <button 
              className="btn btn-primary"
              onClick={() => {
                fetchDashboardData();
                fetchActivities();
                fetchStockFlowStats();
              }}
              disabled={loading}
            >
              <RefreshCw size={16} className="me-2" />
              Refresh
            </button>
          </div>
        </div>

        {/* User & System Stats Row */}
        <div className="row">
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="dash-widget w-100">
              <div className="dash-imgs">
                <Users size={24} color="#ff9f43" />
              </div>
              <div className="dash-widgetcontent">
                <h5><CountUp start={0} end={dashboardData.users.total} duration={2} /></h5>
                <h6>Total Users</h6>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="dash-widget dash1 w-100">
              <div className="dash-imgs">
                <UserCheck size={24} color="#22c55e" /> 
              </div>
              <div className="dash-widgetcontent">
                <h5><CountUp start={0} end={dashboardData.users.active} duration={2} /></h5>
                <h6>Active Users</h6>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="dash-widget dash2 w-100">
              <div className="dash-imgs">
                <UserX size={24} color="#ef4444" /> 
              </div>
              <div className="dash-widgetcontent">
                <h5><CountUp start={0} end={dashboardData.users.inactive} duration={2} /></h5>
                <h6>Inactive Users</h6>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="dash-widget dash3 w-100">
              <div className="dash-imgs">
                <Shield size={24} color="#1b2850" />
              </div>
              <div className="dash-widgetcontent">
                <h5><CountUp start={0} end={dashboardData.roles.total} duration={2} /></h5>
                <h6>All Roles</h6>
              </div>
            </div>
          </div>
        </div>

        {/* Warehouse & Stock Stats Row */}
        <div className="row">
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="dash-count">
              <div className="dash-counts">
                <h4>{dashboardData.warehouses.total}</h4>
                <h5>Total Warehouses</h5>
              </div>
              <div className="dash-imgs">
                <Warehouse />
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="dash-count das1">
              <div className="dash-counts">
                <h4>{dashboardData.products.total}</h4>
                <h5>Total Products</h5>
              </div>
              <div className="dash-imgs">
                <Tag />
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="dash-count das2">
              <div className="dash-counts">
                <h4>{dashboardData.stocks.total}</h4>
                <h5>Total Stock Units</h5>
              </div>
              <div className="dash-imgs">
                <Layers />
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="dash-count das3">
              <div className="dash-counts">
                <h4>{dashboardData.stocks.low}</h4>
                <h5>Low Stock Items</h5>
              </div>
              <div className="dash-imgs">
                <AlertTriangle color="#f59e0b" />
              </div>
            </div>
          </div>
        </div>

        {/* Stock Alert Cards Row */}
        <div className="row">
          <div className="col-xl-8 col-12">
            <div className="card">
              <div className="card-header bg-warning bg-opacity-10 border-warning">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0 text-warning">
                    <AlertTriangle size={20} className="me-2" />
                    Low Stock Alert ({dashboardData.stocks.low})
                  </h5>
                  <Link to="/inventory/low-stocks" className="btn btn-sm btn-warning">
                    View All
                  </Link>
                </div>
              </div>
              <div className="card-body">
                {dashboardData.lowStockProducts.length === 0 ? (
                  <div className="text-center py-4">
                    <AlertCircle size={48} className="text-muted mb-2" />
                    <p className="text-muted">No low stock items</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Warehouse</th>
                          <th>Qty</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dashboardData.lowStockProducts.map(product => (
                          <tr key={product.id}>
                            <td>
                              <div>
                                <strong>{product.title}</strong>
                                <br />
                                <small className="text-muted">{product.barcode}</small>
                              </div>
                            </td>
                            <td>{product.warehouse_name}</td>
                            <td>
                              <span className="badge badge-warning">{product.count}</span>
                            </td>
                            <td>
                              <span className={`badge badge-${
                                product.status === 'new' ? 'success' :
                                product.status === 'used' ? 'info' :
                                product.status === 'broken' ? 'danger' : 'secondary'
                              }`}>
                                {product.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-12">
            <div className="card">
              <div className="card-header bg-danger bg-opacity-10 border-danger">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0 text-danger">
                    <XCircle size={20} className="me-2" />
                    Out of Stock ({dashboardData.stocks.outOfStock})
                  </h5>
                  <Link to="/inventory/low-stocks" className="btn btn-sm btn-danger">
                    View All
                  </Link>
                </div>
              </div>
              <div className="card-body">
                {dashboardData.outOfStockProducts.length === 0 ? (
                  <div className="text-center py-4">
                    <Package size={48} className="text-muted mb-2" />
                    <p className="text-muted">No out of stock items</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Warehouse</th>
                          <th>Last Updated</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dashboardData.outOfStockProducts.map(product => (
                          <tr key={product.id}>
                            <td>
                              <div>
                                <strong>{product.title}</strong>
                                <br />
                                <small className="text-muted">{product.barcode}</small>
                              </div>
                            </td>
                            <td>{product.warehouse_name}</td>
                            <td>
                              <small>
                                {new Date(product.updated_at).toLocaleDateString()}
                              </small>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Warehouse Details Cards */}
       
<div className="row">
  {dashboardData.warehouses.details.length > 0 ? (
    dashboardData.warehouses.details.map((wh) => (
      <div key={wh.id} className="col-xl-3 col-sm-6 col-12 d-flex">
        <div className="warehouse-card w-100">
          <div className="warehouse-card-body">
            <div className="warehouse-header">
              <h4>{wh.name}</h4>
              {(wh.lowStock > 0 || wh.outOfStock > 0) && (
                <AlertTriangle size={16} className="alert-icon" />
              )}
            </div>
            <div className="warehouse-stats">
              <div className="stat-row">
                <span className="stat-label">Products</span>
                <span className="stat-value">{wh.products}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Stock Units</span>
                <span className="stat-value">
                  {wh.stock.toLocaleString()}
                </span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Low Stock</span>
                <span className="stat-value low-stock">
                  {wh.lowStock}
                </span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Out of Stock</span>
                <span className="stat-value out-of-stock">
                  {wh.outOfStock}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="col-12">
      <div className="alert-info-custom">
        <p>No warehouse data available. Add warehouses and products to see statistics.</p>
      </div>
    </div>
  )}
</div>

        {/* Charts Section */}
        <div className="row">
          <div className="col-xl-6 col-sm-12 col-12 d-flex">
            <div className="card flex-fill">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Stock Flow Movement</h5>
                <div className="d-flex gap-2">
                  <span className="badge bg-warning">{stockFlowStats.in_transit} In Transit</span>
                  <span className="badge bg-success">{stockFlowStats.delivered} Delivered</span>
                </div>
              </div>
              <div className="card-body">
                <Chart
                  options={stockMovementChart}
                  series={stockMovementChart.series}
                  type="line"
                  height={320}
                />
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-sm-12 col-12 d-flex">
            <div className="card flex-fill">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Warehouse Stock Distribution</h5>
                <TrendingUp size={20} className="text-success" />
              </div>
              <div className="card-body">
                {dashboardData.warehouses.details.length > 0 ? (
                  <Chart
                    options={warehouseChart}
                    series={warehouseChart.series}
                    type="bar"
                    height={320}
                  />
                ) : (
                  <div className="text-center p-5">
                    <p>No warehouse data available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-6 col-sm-12 col-12 d-flex">
            <div className="card flex-fill">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Product Distribution by Warehouse</h5>
                <Package size={20} className="text-primary" />
              </div>
              <div className="card-body">
                {dashboardData.warehouses.details.length > 0 ? (
                  <Chart
                    options={categoryChart}
                    series={categoryChart.series}
                    type="donut"
                    height={320}
                  />
                ) : (
                  <div className="text-center p-5">
                    <p>No product data available</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-sm-12 col-12 d-flex">
            <div className="card flex-fill">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Low Stock Alert Trend (Last 30 Days)</h5>
                <span className="badge bg-danger">
                  {dashboardData.stocks.low} Critical
                </span>
              </div>
              <div className="card-body">
                {dashboardData.lowStockTrend.length > 0 ? (
                  <Chart
                    options={lowStockChart}
                    series={lowStockChart.series}
                    type="area"
                    height={320}
                  />
                ) : (
                  <div className="text-center p-5">
                    <p>No trend data available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stock Status & Activity */}
        <div className="row">
          {dashboardData.stockByStatus.length > 0 && (
            <div className="col-xl-4 col-sm-8 col-8 d-flex">
              <div className="card flex-fill">
                <div className="card-header">
                  <h5 className="card-title mb-0">Stock by Status</h5>
                </div>
                <div className="card-body">
                  <Chart
                    options={stockStatusChart}
                    series={stockStatusChart.series}
                    type="pie"
                    height={320}
                  />
                </div>
              </div>
            </div>
          )}

          <div className={`col-xl-${dashboardData.stockByStatus.length > 0 ? '8' : '12'} col-sm-12 col-12 d-flex`}>
            <div className="card flex-fill">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h4 className="card-title mb-0">
                  <Activity size={20} className="me-2" style={{ display: 'inline' }} />
                  Live Activity
                </h4>
                <div className="d-flex align-items-center gap-2">
                  <span className="badge bg-success">
                    <span className="pulse-dot"></span>
                    Live
                  </span>
                  {/* <Link to="/activities" className="btn btn-sm btn-light">View All</Link> */}
                </div>
              </div>
              <div className="card-body">
                {activities.length === 0 ? (
                  <div className="text-center py-4">
                    <Activity size={48} className="text-muted mb-2" />
                    <p className="text-muted">No recent activities</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Action</th>
                          <th>Description</th>
                          <th>Performed By</th>
                          <th>Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activities.map(activity => (
                          <tr key={activity.id}>
                            <td>
                              <span className={`badge ${getActivityBadgeClass(activity.action)}`}>
                                {formatLabel(activity.action)}
                              </span>
                            </td>
                            <td>
                              <strong>{activity.entity_name || 'N/A'}</strong>
                              <br />
                              <small className="text-muted">{activity.description}</small>
                            </td>
                            <td>
                              <small>{activity.user_name}</small>
                            </td>
                            <td>
                              <Clock size={14} className="me-1" />
                              <small>{formatActivityTime(activity.created_at)}</small>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;