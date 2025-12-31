// import React from "react";
// import { Link } from "react-router-dom";

// const Email = () => {
//   return (
//     <div className="page-wrapper">
//       <div className="content">
//         <div className="page-header">
//           <div className="row">
//             <div className="col">
//               <h3 className="page-title">Inbox</h3>
//             </div>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-lg-3 col-md-12">
//             <div className="compose-btn">
//               <Link to="#" className="btn btn-primary btn-block w-100">
//                 Compose
//               </Link>
//             </div>
//             <ul className="inbox-menu">
//               <li className="active">
//                 <Link to="#">
//                   <i className="fas fa-download" /> Inbox{" "}
//                   <span className="mail-count">(5)</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="#">
//                   <i className="far fa-star" /> Important
//                 </Link>
//               </li>
//               <li>
//                 <Link to="#">
//                   <i className="far fa-paper-plane" /> Sent Mail
//                 </Link>
//               </li>
//               <li>
//                 <Link to="#">
//                   <i className="far fa-file-alt" /> Drafts{" "}
//                   <span className="mail-count">(13)</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="#">
//                   <i className="far fa-trash-alt" /> Trash
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           <div className="col-lg-9 col-md-12">
//             <div className="card bg-white">
//               <div className="card-body">
//                 <div className="email-header">
//                   <div className="row">
//                     <div className="col-lg-9 top-action-left col-sm-12">
//                       <div className="float-left">
//                         <div className="btn-group dropdown-action me-1">
//                           <button
//                             type="button"
//                             className="btn btn-white dropdown-toggle"
//                             data-bs-toggle="dropdown"
//                           >
//                             Select <i className="fas fa-angle-down" />
//                           </button>
//                           <div className="dropdown-menu">
//                             <Link className="dropdown-item" to="#">
//                               All
//                             </Link>
//                             <Link className="dropdown-item" to="#">
//                               None
//                             </Link>
//                             <div className="dropdown-divider" />
//                             <Link className="dropdown-item" to="#">
//                               Read
//                             </Link>
//                             <Link className="dropdown-item" to="#">
//                               Unread
//                             </Link>
//                           </div>
//                         </div>
//                         <div className="btn-group dropdown-action me-1">
//                           <button
//                             type="button"
//                             className="btn btn-white dropdown-toggle"
//                             data-bs-toggle="dropdown"
//                           >
//                             Actions <i className="fas fa-angle-down" />
//                           </button>
//                           <div className="dropdown-menu">
//                             <Link className="dropdown-item" to="#">
//                               Reply
//                             </Link>
//                             <Link className="dropdown-item" to="#">
//                               Forward
//                             </Link>
//                             <Link className="dropdown-item" to="#">
//                               Archive
//                             </Link>
//                             <div className="dropdown-divider" />
//                             <Link className="dropdown-item" to="#">
//                               Mark As Read
//                             </Link>
//                             <Link className="dropdown-item" to="#">
//                               Mark As Unread
//                             </Link>
//                             <div className="dropdown-divider" />
//                             <Link className="dropdown-item" to="#">
//                               Delete
//                             </Link>
//                           </div>
//                         </div>
//                         <div className="btn-group dropdown-action me-1">
//                           <button
//                             type="button"
//                             className="btn btn-white dropdown-toggle"
//                             data-bs-toggle="dropdown"
//                           >
//                             <i className="fas fa-folder" />{" "}
//                             <i className="fas fa-angle-down" />
//                           </button>
//                           <div role="menu" className="dropdown-menu">
//                             <Link className="dropdown-item" to="#">
//                               Social
//                             </Link>
//                             <Link className="dropdown-item" to="#">
//                               Forums
//                             </Link>
//                             <Link className="dropdown-item" to="#">
//                               Updates
//                             </Link>
//                             <div className="dropdown-divider" />
//                             <Link className="dropdown-item" to="#">
//                               Spam
//                             </Link>
//                             <Link className="dropdown-item" to="#">
//                               Trash
//                             </Link>
//                             <div className="dropdown-divider" />
//                             <Link className="dropdown-item" to="#">
//                               New
//                             </Link>
//                           </div>
//                         </div>
//                         <div className="btn-group dropdown-action me-1">
//                           <button
//                             type="button"
//                             data-bs-toggle="dropdown"
//                             className="btn btn-white dropdown-toggle"
//                           >
//                             <i className="fas fa-tags" />{" "}
//                             <i className="fas fa-angle-down" />
//                           </button>
//                           <div role="menu" className="dropdown-menu">
//                             <Link className="dropdown-item" to="#">
//                               Work
//                             </Link>
//                             <Link className="dropdown-item" to="#">
//                               Family
//                             </Link>
//                             <Link className="dropdown-item" to="#">
//                               Social
//                             </Link>
//                             <div className="dropdown-divider" />
//                             <Link className="dropdown-item" to="#">
//                               Primary
//                             </Link>
//                             <Link className="dropdown-item" to="#">
//                               Promotions
//                             </Link>
//                             <Link className="dropdown-item" to="#">
//                               Forums
//                             </Link>
//                           </div>
//                         </div>
//                         <div className="btn-group dropdown-action mail-search">
//                           <input
//                             type="text"
//                             placeholder="Search Messages"
//                             className="form-control search-message"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-lg-3 top-action-right col-sm-12">
//                       <div className="text-end ">
//                         <button
//                           type="button"
//                           title="Refresh"
//                           data-toggle="tooltip"
//                           className="btn btn-white d-none d-md-inline-block me-1"
//                         >
//                           <i className="fas fa-sync-alt" />
//                         </button>
//                         <div className="btn-group">
//                           <Link className="btn btn-white">
//                             <i className="fas fa-angle-left" />
//                           </Link>
//                           <Link className="btn btn-white">
//                             <i className="fas fa-angle-right" />
//                           </Link>
//                         </div>
//                       </div>
//                       <div className="text-end">
//                         <span className="text-muted d-none d-md-inline-block">
//                           Showing 10 of 112{" "}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="email-content">
//                   <div className="table-responsive">
//                     <table className="table table-inbox table-hover">
//                       <thead>
//                         <tr>
//                           <th colSpan={6}>
//                             <label className="checkboxs">
//                               <input type="checkbox" id="select-all" />
//                               <span className="checkmarks" />
//                             </label>
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         <tr className="unread clickable-row">
//                           <td>
//                             <label className="checkboxs">
//                               <input type="checkbox" />
//                               <span className="checkmarks" />
//                             </label>
//                           </td>
//                           <td>
//                             <span className="mail-important">
//                               <i className="fas fa-star starred" />
//                             </span>
//                           </td>
//                           <td className="name">John Doe</td>
//                           <td className="subject">
//                             Lorem ipsum dolor sit amet, consectetuer adipiscing
//                             elit
//                           </td>
//                           <td>
//                             <i className="fas fa-paperclip" />
//                           </td>
//                           <td className="mail-date">13:14</td>
//                         </tr>
//                         <tr className="unread clickable-row">
//                           <td>
//                             <label className="checkboxs">
//                               <input type="checkbox" />
//                               <span className="checkmarks" />
//                             </label>
//                           </td>
//                           <td>
//                             <span className="mail-important">
//                               <i className="far fa-star" />
//                             </span>
//                           </td>
//                           <td className="name">Envato Account</td>
//                           <td className="subject">
//                             Important account security update from Envato
//                           </td>
//                           <td />
//                           <td className="mail-date">8:42</td>
//                         </tr>
//                         <tr className="clickable-row">
//                           <td>
//                             <label className="checkboxs">
//                               <input type="checkbox" />
//                               <span className="checkmarks" />
//                             </label>
//                           </td>
//                           <td>
//                             <span className="mail-important">
//                               <i className="far fa-star" />
//                             </span>
//                           </td>
//                           <td className="name">Twitter</td>
//                           <td className="subject">
//                             HRMS Bootstrap Admin Template
//                           </td>
//                           <td />
//                           <td className="mail-date">30 Nov</td>
//                         </tr>
//                         <tr className="unread clickable-row">
//                           <td>
//                             <label className="checkboxs">
//                               <input type="checkbox" />
//                               <span className="checkmarks" />
//                             </label>
//                           </td>
//                           <td>
//                             <span className="mail-important">
//                               <i className="far fa-star" />
//                             </span>
//                           </td>
//                           <td className="name">Richard Parker</td>
//                           <td className="subject">
//                             Lorem ipsum dolor sit amet, consectetuer adipiscing
//                             elit
//                           </td>
//                           <td />
//                           <td className="mail-date">18 Sep</td>
//                         </tr>
//                         <tr className="clickable-row">
//                           <td>
//                             <label className="checkboxs">
//                               <input type="checkbox" />
//                               <span className="checkmarks" />
//                             </label>
//                           </td>
//                           <td>
//                             <span className="mail-important">
//                               <i className="far fa-star" />
//                             </span>
//                           </td>
//                           <td className="name">John Smith</td>
//                           <td className="subject">
//                             Lorem ipsum dolor sit amet, consectetuer adipiscing
//                             elit
//                           </td>
//                           <td />
//                           <td className="mail-date">21 Aug</td>
//                         </tr>
//                         <tr className="clickable-row">
//                           <td>
//                             <label className="checkboxs">
//                               <input type="checkbox" />
//                               <span className="checkmarks" />
//                             </label>
//                           </td>
//                           <td>
//                             <span className="mail-important">
//                               <i className="far fa-star" />
//                             </span>
//                           </td>
//                           <td className="name">me, Robert Smith (3)</td>
//                           <td className="subject">
//                             Lorem ipsum dolor sit amet, consectetuer adipiscing
//                             elit
//                           </td>
//                           <td />
//                           <td className="mail-date">1 Aug</td>
//                         </tr>
//                         <tr className="unread clickable-row">
//                           <td>
//                             <label className="checkboxs">
//                               <input type="checkbox" />
//                               <span className="checkmarks" />
//                             </label>
//                           </td>
//                           <td>
//                             <span className="mail-important">
//                               <i className="far fa-star" />
//                             </span>
//                           </td>
//                           <td className="name">Codecanyon</td>
//                           <td className="subject">Welcome To Codecanyon</td>
//                           <td />
//                           <td className="mail-date">Jul 13</td>
//                         </tr>
//                         <tr className="clickable-row">
//                           <td>
//                             <label className="checkboxs">
//                               <input type="checkbox" />
//                               <span className="checkmarks" />
//                             </label>
//                           </td>
//                           <td>
//                             <span className="mail-important">
//                               <i className="far fa-star" />
//                             </span>
//                           </td>
//                           <td className="name">Richard Miles</td>
//                           <td className="subject">
//                             Lorem ipsum dolor sit amet, consectetuer adipiscing
//                             elit
//                           </td>
//                           <td>
//                             <i className="fas fa-paperclip" />
//                           </td>
//                           <td className="mail-date">May 14</td>
//                         </tr>
//                         <tr className="unread clickable-row">
//                           <td>
//                             <label className="checkboxs">
//                               <input type="checkbox" />
//                               <span className="checkmarks" />
//                             </label>
//                           </td>
//                           <td>
//                             <span className="mail-important">
//                               <i className="far fa-star" />
//                             </span>
//                           </td>
//                           <td className="name">John Smith</td>
//                           <td className="subject">
//                             Lorem ipsum dolor sit amet, consectetuer adipiscing
//                             elit
//                           </td>
//                           <td />
//                           <td className="mail-date">11/11/16</td>
//                         </tr>
//                         <tr className="clickable-row">
//                           <td>
//                             <label className="checkboxs">
//                               <input type="checkbox" />
//                               <span className="checkmarks" />
//                             </label>
//                           </td>
//                           <td>
//                             <span className="mail-important">
//                               <i className="far fa-star starred" />
//                             </span>
//                           </td>
//                           <td className="name">Mike Litorus</td>
//                           <td className="subject">
//                             Lorem ipsum dolor sit amet, consectetuer adipiscing
//                             elit
//                           </td>
//                           <td />
//                           <td className="mail-date">10/31/16</td>
//                         </tr>
//                       </tbody>
//                     </table>
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

// export default Email;




// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import AuthService from "../../services/authService";
// // import axios from "axios";

// // const API_URL =  "http://localhost:5000/api";

// const Email = () => {
//   const [emails, setEmails] = useState([]);
//   const [selectedEmails, setSelectedEmails] = useState([]);
//   const [currentView, setCurrentView] = useState("inbox");
//   const [showCompose, setShowCompose] = useState(false);
//   const [selectedEmail, setSelectedEmail] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   // const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [templates, setTemplates] = useState([]);

  
//   const [composeData, setComposeData] = useState({
//     to: "",
//     subject: "",
//     body: "",
//     template: "none",
//     enableFollowUp: true,
//     followUpDays: 2,
//     enableEscalation: true,
//     escalationEmail: ""
//   });

//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     totalEmails: 0
//   });


//   // Fetch emails
//   const fetchEmails = async () => {
//     setLoading(true);
//     try {
//       const response = await AuthService.getEmails();
//       setEmails(response.data.emails);
//       setPagination({
//         currentPage: response.data.currentPage,
//         totalPages: response.data.totalPages,
//         totalEmails: response.data.total
//       });
//     } catch (error) {
//       console.error("Error fetching emails:", error);
//       showNotification("Error loading emails", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch notifications
//   // const fetchNotifications = async () => {
//   //   try {
//   //     const response = await axios.get(`${API_URL}/notifications`, {
//   //       headers: { Authorization: `Bearer ${getAuthToken()}` }
//   //     });
//   //     setNotifications(response.data.notifications);
//   //   } catch (error) {
//   //     console.error("Error fetching notifications:", error);
//   //   }
//   // };

//   useEffect(() => {
//     fetchEmails();
//     // fetchNotifications();
    
//     // Poll for new emails and notifications every 30 seconds
//     const interval = setInterval(() => {
//       fetchEmails(currentView, pagination.currentPage);
//       // fetchNotifications();
//     }, 30000);

//     return () => clearInterval(interval);
//     //eslint-disable-next-line
//   }, [currentView, searchQuery]);

//   // Send email
//   const sendEmail = async () => {
//     if (!composeData.to || !composeData.subject) {
//       showNotification("Please fill in all required fields", "error");
//       return;
//     }

//     try {
//        await AuthService.createEmail();
//       showNotification("Email sent successfully!", "success");
//       setShowCompose(false);
//       resetComposeForm();
//       fetchEmails("sent");
//     } catch (error) {
//       console.error("Error sending email:", error);
//       showNotification(error.response?.data?.message || "Error sending email", "error");
//     }
//   };

//   useEffect(() => {
//   const fetchTemplates = async () => {
//     try {
//       const response = await AuthService.getTemplates(); // Make sure this hits your API
//       setTemplates(response.data.data); // your backend returns { success, data }
//     } catch (error) {
//       console.error("Error fetching templates:", error);
//     }
//   };

//   fetchTemplates();
// }, []);


//   // Mark as read
//   const markAsRead = async (emailId) => {
//     try {
//       await AuthService.markAsRead();

//       setEmails(prev =>
//         prev.map(e => (e.id === emailId ? { ...e, is_read: true } : e))
//       );
//     } catch (error) {
//       console.error("Error marking email as read:", error);
//     }
//   };

//   // Toggle star
//   const toggleStar = async (emailId, currentStarred) => {
//     try {
//       await AuthService.toggleStar()
      
//       setEmails(prev =>
//         prev.map(e => (e.id === emailId ? { ...e, is_starred: !currentStarred } : e))
//       );
//     } catch (error) {
//       console.error("Error toggling star:", error);
//     }
//   };

//   // Delete email
//   const deleteEmail = async () => {
//     try {
//       await AuthService.deleteEmail();

//       showNotification("Email deleted", "success");
//       fetchEmails();
//     } catch (error) {
//       console.error("Error deleting email:", error);
//       showNotification("Error deleting email", "error");
//     }
//   };

//   // Bulk actions
//   const handleBulkAction = async (action) => {
//     if (selectedEmails.length === 0) {
//       showNotification("Please select emails first", "error");
//       return;
//     }

//     try {
//       await AuthService.createBulkAction()
      
//       showNotification(`${action} completed successfully`, "success");
//       setSelectedEmails([]);
//       fetchEmails();
//     } catch (error) {
//       console.error("Error performing bulk action:", error);
//       showNotification("Error performing action", "error");
//     }
//   };

//   // Reply to email
//   const replyToEmail = (email) => {
//     setComposeData({
//       ...composeData,
//       to: email.sender_email,
//       subject: `Re: ${email.subject}`,
//       body: `\n\n--- Original Message ---\nFrom: ${email.sender_email}\nDate: ${new Date(email.created_at).toLocaleString()}\n\n${email.body}`
//     });
//     setShowCompose(true);
//     setSelectedEmail(null);
//   };

//   // Forward email
//   const forwardEmail = (email) => {
//     setComposeData({
//       ...composeData,
//       to: "",
//       subject: `Fwd: ${email.subject}`,
//       body: `\n\n--- Forwarded Message ---\nFrom: ${email.sender_email}\nDate: ${new Date(email.created_at).toLocaleString()}\nSubject: ${email.subject}\n\n${email.body}`
//     });
//     setShowCompose(true);
//     setSelectedEmail(null);
//   };

//   // Mark notification as read
//   // const markNotificationAsRead = async (notificationId) => {
//   //   try {
//   //     await axios.put(
//   //       `${API_URL}/notifications/${notificationId}/read`,
//   //       {},
//   //       { headers: { Authorization: `Bearer ${getAuthToken()}` } }
//   //     );
//   //     fetchNotifications();
//   //   } catch (error) {
//   //     console.error("Error marking notification as read:", error);
//   //   }
//   // };

//   const showNotification = (message) => {
//     // You can integrate with a toast library here
//     alert(message);
//   };

//   const resetComposeForm = () => {
//     setComposeData({
//       to: "",
//       subject: "",
//       body: "",
//       template: "none",
//       enableFollowUp: true,
//       followUpDays: 2,
//       enableEscalation: true,
//       escalationEmail: ""
//     });
//   };

//   const toggleEmailSelection = (emailId) => {
//     setSelectedEmails(prev =>
//       prev.includes(emailId)
//         ? prev.filter(id => id !== emailId)
//         : [...prev, emailId]
//     );
//   };

//   const selectAllEmails = () => {
//     if (selectedEmails.length === emails.length) {
//       setSelectedEmails([]);
//     } else {
//       setSelectedEmails(emails.map(e => e.id));
//     }
//   };

//   const unreadCount = emails.filter(e => !e.is_read && currentView === "inbox").length;
//   const draftCount = emails.filter(e => e.status === "draft").length;

//   return (
//     <div className="page-wrapper">
//       <div className="content">
//         <div className="page-header">
//           <div className="row">
//             <div className="col">
//               <h3 className="page-title">Inbox</h3>
//             </div>
//             {/* {notifications.filter(n => !n.is_read).length > 0 && (
//               <div className="col-auto">
//                 <span className="badge bg-danger">
//                   {notifications.filter(n => !n.is_read).length} new notifications
//                 </span>
//               </div>
//             )} */}
//           </div>
//         </div>

//         <div className="row">
//           <div className="col-lg-3 col-md-12">
//             <div className="compose-btn">
//               <Link
//                 to="#"
//                 className="btn btn-primary btn-block w-100"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setShowCompose(true);
//                 }}
//               >
//                 Compose
//               </Link>
//             </div>
//             <ul className="inbox-menu">
//               <li className={currentView === "inbox" ? "active" : ""}>
//                 <Link
//                   to="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setCurrentView("inbox");
//                   }}
//                 >
//                   <i className="fas fa-download" /> Inbox{" "}
//                   {unreadCount > 0 && (
//                     <span className="mail-count">({unreadCount})</span>
//                   )}
//                 </Link>
//               </li>
//               <li className={currentView === "starred" ? "active" : ""}>
//                 <Link
//                   to="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setCurrentView("starred");
//                   }}
//                 >
//                   <i className="far fa-star" /> Important
//                 </Link>
//               </li>
//               <li className={currentView === "sent" ? "active" : ""}>
//                 <Link
//                   to="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setCurrentView("sent");
//                   }}
//                 >
//                   <i className="far fa-paper-plane" /> Sent Mail
//                 </Link>
//               </li>
//               <li className={currentView === "drafts" ? "active" : ""}>
//                 <Link
//                   to="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setCurrentView("drafts");
//                   }}
//                 >
//                   <i className="far fa-file-alt" /> Drafts{" "}
//                   {draftCount > 0 && (
//                     <span className="mail-count">({draftCount})</span>
//                   )}
//                 </Link>
//               </li>
//               <li className={currentView === "trash" ? "active" : ""}>
//                 <Link
//                   to="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setCurrentView("trash");
//                   }}
//                 >
//                   <i className="far fa-trash-alt" /> Trash
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           <div className="col-lg-9 col-md-12">
//             {showCompose ? (
//               <div className="card bg-white">
//                 <div className="card-body">
//                   <h4 className="mb-4">Compose Email</h4>
                  
//                   <div className="mb-3">
//                     <label className="form-label">Template</label>
//                     <select
//   className="form-select"
//   value={composeData.template}
//   onChange={(e) =>
//     setComposeData({ ...composeData, template: e.target.value })
//   }
// >
//   <option value="none">No Template</option>
//   {templates.map(t => (
//     <option key={t.id} value={t.name}>{t.name}</option>
//   ))}
// </select>

//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label">To</label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       value={composeData.to}
//                       onChange={(e) =>
//                         setComposeData({ ...composeData, to: e.target.value })
//                       }
//                       placeholder="recipient@example.com"
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label">Subject</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={composeData.subject}
//                       onChange={(e) =>
//                         setComposeData({ ...composeData, subject: e.target.value })
//                       }
//                       placeholder="Email subject"
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label">Message</label>
//                     <textarea
//                       className="form-control"
//                       rows="8"
//                       value={composeData.body}
//                       onChange={(e) =>
//                         setComposeData({ ...composeData, body: e.target.value })
//                       }
//                       placeholder="Your message..."
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <h5>Automation Settings</h5>
//                     <div className="form-check">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         checked={composeData.enableFollowUp}
//                         onChange={(e) =>
//                           setComposeData({
//                             ...composeData,
//                             enableFollowUp: e.target.checked
//                           })
//                         }
//                       />
//                       <label className="form-check-label">
//                         Enable follow-up reminder
//                       </label>
//                     </div>
//                     {composeData.enableFollowUp && (
//                       <div className="mt-2">
//                         <label className="form-label">Follow-up after (days)</label>
//                         <input
//                           type="number"
//                           className="form-control"
//                           style={{ width: "100px" }}
//                           value={composeData.followUpDays}
//                           onChange={(e) =>
//                             setComposeData({
//                               ...composeData,
//                               followUpDays: parseInt(e.target.value)
//                             })
//                           }
//                           min="1"
//                           max="30"
//                         />
//                       </div>
//                     )}

//                     <div className="form-check mt-2">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         checked={composeData.enableEscalation}
//                         onChange={(e) =>
//                           setComposeData({
//                             ...composeData,
//                             enableEscalation: e.target.checked
//                           })
//                         }
//                       />
//                       <label className="form-check-label">
//                         Enable auto-escalation
//                       </label>
//                     </div>
//                     {composeData.enableEscalation && (
//                       <div className="mt-2">
//                         <label className="form-label">Escalation email</label>
//                         <input
//                           type="email"
//                           className="form-control"
//                           value={composeData.escalationEmail}
//                           onChange={(e) =>
//                             setComposeData({
//                               ...composeData,
//                               escalationEmail: e.target.value
//                             })
//                           }
//                           placeholder="manager@company.com"
//                         />
//                       </div>
//                     )}
//                   </div>

//                   <div className="d-flex gap-2">
//                     <button className="btn btn-primary" onClick={sendEmail}>
//                       <i className="fas fa-paper-plane me-2" />
//                       Send Email
//                     </button>
//                     <button
//                       className="btn btn-secondary"
//                       onClick={() => {
//                         setShowCompose(false);
//                         resetComposeForm();
//                       }}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="card bg-white">
//                 <div className="card-body">
//                   <div className="email-header">
//                     <div className="row">
//                       <div className="col-lg-9 top-action-left col-sm-12">
//                         <div className="float-left">
//                           <div className="btn-group dropdown-action me-1">
//                             <button
//                               type="button"
//                               className="btn btn-white dropdown-toggle"
//                               data-bs-toggle="dropdown"
//                             >
//                               Select <i className="fas fa-angle-down" />
//                             </button>
//                             <div className="dropdown-menu">
//                               <Link
//                                 className="dropdown-item"
//                                 to="#"
//                                 onClick={(e) => {
//                                   e.preventDefault();
//                                   selectAllEmails();
//                                 }}
//                               >
//                                 All
//                               </Link>
//                               <Link
//                                 className="dropdown-item"
//                                 to="#"
//                                 onClick={(e) => {
//                                   e.preventDefault();
//                                   setSelectedEmails([]);
//                                 }}
//                               >
//                                 None
//                               </Link>
//                               <div className="dropdown-divider" />
//                               <Link
//                                 className="dropdown-item"
//                                 to="#"
//                                 onClick={(e) => {
//                                   e.preventDefault();
//                                   setSelectedEmails(
//                                     emails.filter(e => e.is_read).map(e => e.id)
//                                   );
//                                 }}
//                               >
//                                 Read
//                               </Link>
//                               <Link
//                                 className="dropdown-item"
//                                 to="#"
//                                 onClick={(e) => {
//                                   e.preventDefault();
//                                   setSelectedEmails(
//                                     emails.filter(e => !e.is_read).map(e => e.id)
//                                   );
//                                 }}
//                               >
//                                 Unread
//                               </Link>
//                             </div>
//                           </div>
//                           <div className="btn-group dropdown-action me-1">
//                             <button
//                               type="button"
//                               className="btn btn-white dropdown-toggle"
//                               data-bs-toggle="dropdown"
//                             >
//                               Actions <i className="fas fa-angle-down" />
//                             </button>
//                             <div className="dropdown-menu">
//                               <Link
//                                 className="dropdown-item"
//                                 to="#"
//                                 onClick={(e) => {
//                                   e.preventDefault();
//                                   handleBulkAction("read");
//                                 }}
//                               >
//                                 Mark As Read
//                               </Link>
//                               <Link
//                                 className="dropdown-item"
//                                 to="#"
//                                 onClick={(e) => {
//                                   e.preventDefault();
//                                   handleBulkAction("unread");
//                                 }}
//                               >
//                                 Mark As Unread
//                               </Link>
//                               <div className="dropdown-divider" />
//                               <Link
//                                 className="dropdown-item"
//                                 to="#"
//                                 onClick={(e) => {
//                                   e.preventDefault();
//                                   handleBulkAction("delete");
//                                 }}
//                               >
//                                 Delete
//                               </Link>
//                             </div>
//                           </div>
//                           <div className="btn-group dropdown-action mail-search">
//                             <input
//                               type="text"
//                               placeholder="Search Messages"
//                               className="form-control search-message"
//                               value={searchQuery}
//                               onChange={(e) => setSearchQuery(e.target.value)}
//                             />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="col-lg-3 top-action-right col-sm-12">
//                         <div className="text-end">
//                           <button
//                             type="button"
//                             title="Refresh"
//                             className="btn btn-white d-none d-md-inline-block me-1"
//                             onClick={() => fetchEmails()}
//                           >
//                             <i className="fas fa-sync-alt" />
//                           </button>
//                           <div className="btn-group">
//                             <button
//                               className="btn btn-white"
//                               disabled={pagination.currentPage === 1}
//                               onClick={() =>
//                                 fetchEmails(currentView, pagination.currentPage - 1)
//                               }
//                             >
//                               <i className="fas fa-angle-left" />
//                             </button>
//                             <button
//                               className="btn btn-white"
//                               disabled={
//                                 pagination.currentPage === pagination.totalPages
//                               }
//                               onClick={() =>
//                                 fetchEmails(currentView, pagination.currentPage + 1)
//                               }
//                             >
//                               <i className="fas fa-angle-right" />
//                             </button>
//                           </div>
//                         </div>
//                         <div className="text-end">
//                           <span className="text-muted d-none d-md-inline-block">
//                             Showing {emails.length} of {pagination.totalEmails}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="email-content">
//                     <div className="table-responsive">
//                       {loading ? (
//                         <div className="text-center py-5">
//                           <div className="spinner-border" role="status">
//                             <span className="visually-hidden">Loading...</span>
//                           </div>
//                         </div>
//                       ) : emails.length === 0 ? (
//                         <div className="text-center py-5">
//                           <p className="text-muted">No emails found</p>
//                         </div>
//                       ) : (
//                         <table className="table table-inbox table-hover">
//                           <thead>
//                             <tr>
//                               <th colSpan={6}>
//                                 <label className="checkboxs">
//                                   <input
//                                     type="checkbox"
//                                     checked={
//                                       selectedEmails.length === emails.length &&
//                                       emails.length > 0
//                                     }
//                                     onChange={selectAllEmails}
//                                   />
//                                   <span className="checkmarks" />
//                                 </label>
//                               </th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {emails.map((email) => (
//                               <tr
//                                 key={email.id}
//                                 className={`${
//                                   !email.is_read ? "unread" : ""
//                                 } clickable-row`}
//                                 onClick={() => {
//                                   setSelectedEmail(email);
//                                   if (!email.is_read) {
//                                     markAsRead(email.id);
//                                   }
//                                 }}
//                               >
//                                 <td onClick={(e) => e.stopPropagation()}>
//                                   <label className="checkboxs">
//                                     <input
//                                       type="checkbox"
//                                       checked={selectedEmails.includes(email.id)}
//                                       onChange={() => toggleEmailSelection(email.id)}
//                                     />
//                                     <span className="checkmarks" />
//                                   </label>
//                                 </td>
//                                 <td onClick={(e) => e.stopPropagation()}>
//                                   <span
//                                     className="mail-important"
//                                     onClick={() =>
//                                       toggleStar(email.id, email.is_starred)
//                                     }
//                                   >
//                                     <i
//                                       className={`${
//                                         email.is_starred ? "fas" : "far"
//                                       } fa-star ${
//                                         email.is_starred ? "starred" : ""
//                                       }`}
//                                     />
//                                   </span>
//                                 </td>
//                                 <td className="name">
//                                   {currentView === "sent"
//                                     ? email.recipient_email
//                                     : email.sender_email}
//                                 </td>
//                                 <td className="subject">
//                                   {email.subject}
//                                   {email.follow_up_scheduled && (
//                                     <span className="badge bg-warning ms-2">
//                                       Follow-up
//                                     </span>
//                                   )}
//                                   {email.escalated && (
//                                     <span className="badge bg-danger ms-2">
//                                       Escalated
//                                     </span>
//                                   )}
//                                 </td>
//                                 <td>
//                                   {email.has_attachment && (
//                                     <i className="fas fa-paperclip" />
//                                   )}
//                                 </td>
//                                 <td className="mail-date">
//                                   {new Date(email.created_at).toLocaleString()}
//                                 </td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Email Detail Modal */}
//       {selectedEmail && (
//         <div
//           className="modal fade show"
//           style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
//           onClick={() => setSelectedEmail(null)}
//         >
//           <div
//             className="modal-dialog modal-lg"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">{selectedEmail.subject}</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setSelectedEmail(null)}
//                 />
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <strong>From:</strong> {selectedEmail.sender_email}
//                   <br />
//                   <strong>To:</strong> {selectedEmail.recipient_email}
//                   <br />
//                   <strong>Date:</strong>{" "}
//                   {new Date(selectedEmail.created_at).toLocaleString()}
//                 </div>
//                 <hr />
//                 <div
//                   dangerouslySetInnerHTML={{ __html: selectedEmail.body }}
//                 />
//               </div>
//               <div className="modal-footer">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => replyToEmail(selectedEmail)}
//                 >
//                   <i className="fas fa-reply me-2" />
//                   Reply
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => forwardEmail(selectedEmail)}
//                 >
//                   <i className="fas fa-share me-2" />
//                   Forward
//                 </button>
//                 <button
//                   className="btn btn-danger"
//                   onClick={() => {
//                     deleteEmail(selectedEmail.id);
//                     setSelectedEmail(null);
//                   }}
//                 >
//                   <i className="fas fa-trash me-2" />
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Email;




// components/Email.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/authService";


const Email = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [currentView, setCurrentView] = useState("inbox");
  const [showCompose, setShowCompose] = useState(false);
  const [showStockRequest, setShowStockRequest] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  // const { canAccess, isSuperAdmin } = usePermissionCheck();
  
  const [composeData, setComposeData] = useState({
    to: "",
    subject: "",
    body: "",
    template: "none",
    enableFollowUp: true,
    followUpDays: 2,
    enableEscalation: true,
    escalationEmail: "",
    escalationDays:3
  });

  const [stockRequestData, setStockRequestData] = useState({
    to: "",
    productName: "",
    quantity: 1,
    urgency: "medium",
    notes: ""
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalEmails: 0
  });

  // Fetch emails

  const fetchEmails = async (view = currentView, page = 1) => {
  setLoading(true);
  try {
    const response = await AuthService.getEmails(view, page, 10, searchQuery);
      setEmails(response.data.data);
      setPagination({
        currentPage: response.data.pagination.page,
        totalPages: response.data.pagination.totalPages,
        totalEmails: response.data.pagination.total
      });
    } catch (error) {
      console.error("Error fetching emails:", error);
      showNotification("Error loading emails", "error");
    } finally {
      setLoading(false);
    }
  };

  // Fetch notifications
const fetchNotifications = async () => {
  try {
    const response = await AuthService.getNotifications(20);
    setNotifications(response.data.data || []);
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
};

  useEffect(() => {
    fetchEmails();
    fetchNotifications();
    
    // Poll for new emails every 30 seconds
    const interval = setInterval(() => {
      fetchEmails(currentView, pagination.currentPage);
      fetchNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, [currentView, searchQuery]);

  // Send email
  const sendEmail = async () => {
    if (!composeData.to || !composeData.subject) {
      showNotification("Please fill in all required fields");
      return;
    }

    try {
      await AuthService.sendEmails(composeData);
      showNotification("Email sent successfully!");
      setShowCompose(false);
      resetComposeForm();
      fetchEmails("sent");
    } catch (error) {
      console.error("Error sending email:", error);
      showNotification(error.response?.data?.message || "Error sending email");
    }
  };

  // Send stock request
  const sendStockRequest = async () => {
    if (!stockRequestData.to || !stockRequestData.productName || !stockRequestData.quantity) {
      showNotification("Please fill in all required fields");
      return;
    }

    try {
      await AuthService.sendStockRequest(stockRequestData);
      showNotification("Stock request sent successfully!");
      setShowStockRequest(false);
      resetStockRequestForm();
      fetchEmails("sent");
    } catch (error) {
      console.error("Error sending stock request:", error);
      showNotification(error.response?.data?.message || "Error sending stock request");
    }
  };

  // Respond to stock request
  const respondToStockRequest = async (emailId, action) => {
    const notes = prompt(`${action === 'approve' ? 'Approve' : 'Reject'} this request. Add notes (optional):`);
    
    try {
      await AuthService.respondToStockRequest(emailId, action, notes || '');
      showNotification(`Stock request ${action}d successfully!`);
      setSelectedEmail(null);
      fetchEmails();
    } catch (error) {
      console.error("Error responding to stock request:", error);
      showNotification(error.response?.data?.message || "Error responding to stock request");
    }
  };

  // Mark as read
const markAsRead = async (emailId) => {
  try {
    await AuthService.markEmailAsRead(emailId); // ✅ Updated method name
    setEmails(prev =>
      prev.map(e => (e.id === emailId ? { ...e, is_read: true } : e))
    );
  } catch (error) {
    console.error("Error marking email as read:", error);
  }
};

  // Toggle star
const toggleStar = async (emailId, currentStarred) => {
  try {
    await AuthService.toggleEmailStar(emailId, !currentStarred);
    setEmails(prev =>
      prev.map(e => (e.id === emailId ? { ...e, is_starred: !currentStarred } : e))
    );
  } catch (error) {
    console.error("Error toggling star:", error);
  }
};


  // Delete email
const deleteEmail = async (emailId) => {
  try {
    await AuthService.deleteEmail(emailId);
    showNotification("Email deleted");
    fetchEmails();
  } catch (error) {
    console.error("Error deleting email:", error);
    showNotification("Error deleting email");
  }
};

  // Bulk actions
const handleBulkAction = async (action) => {
  if (selectedEmails.length === 0) {
    showNotification("Please select emails first");
    return;
  }

  try {
    console.log('Performing bulk action:', action);
    console.log('Selected email IDs:', selectedEmails);
    
  
    await AuthService.bulkEmailAction(action, selectedEmails);
    
    showNotification(`Bulk ${action} completed successfully`);
    setSelectedEmails([]);
    fetchEmails();
  } catch (error) {
    console.error("Error performing bulk action:", error);
    showNotification(error.response?.data?.message || "Error performing bulk action");
  }
};

  // Reply to email
  const replyToEmail = (email) => {
    setComposeData({
      ...composeData,
      to: email.sender_email,
      subject: `Re: ${email.subject}`,
      body: `\n\n--- Original Message ---\nFrom: ${email.sender_email}\nDate: ${new Date(email.created_at).toLocaleString()}\n\n${email.body}`
    });
    setShowCompose(true);
    setSelectedEmail(null);
  };

  // Forward email
  const forwardEmail = (email) => {
    setComposeData({
      ...composeData,
      to: "",
      subject: `Fwd: ${email.subject}`,
      body: `\n\n--- Forwarded Message ---\nFrom: ${email.sender_email}\nDate: ${new Date(email.created_at).toLocaleString()}\nSubject: ${email.subject}\n\n${email.body}`
    });
    setShowCompose(true);
    setSelectedEmail(null);
  };



  const showNotification = (message) => {
    alert(message);
  };

  const resetComposeForm = () => {
    setComposeData({
      to: "",
      subject: "",
      body: "",
      template: "none",
      enableFollowUp: true,
      followUpDays: 2,
      enableEscalation: true,
      escalationEmail: "",
      escalationDays:3
    });
  };

  const resetStockRequestForm = () => {
    setStockRequestData({
      to: "",
      productName: "",
      quantity: 1,
      urgency: "medium",
      notes: ""
    });
  };

  const toggleEmailSelection = (emailId) => {
    setSelectedEmails(prev =>
      prev.includes(emailId)
        ? prev.filter(id => id !== emailId)
        : [...prev, emailId]
    );
  };

  const selectAllEmails = () => {
    if (selectedEmails.length === emails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(emails.map(e => e.id));
    }
  };

  const unreadCount = emails.filter(e => !e.is_read && currentView === "inbox").length;
  const draftCount = emails.filter(e => e.status === "draft").length;
  const unreadNotifications = notifications.filter(n => !n.is_read).length;

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="row">
            <div className="col">
              <h3 className="page-title">Inbox</h3>
            </div>
            {unreadNotifications > 0 && (
              <div className="col-auto">
                <span className="badge bg-danger">
                  {unreadNotifications} new notifications
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-12">
            <div className="compose-btn mb-3">
              <Link
                to="#"
                className="btn btn-primary btn-block w-100 mb-2"
                onClick={(e) => {
                  e.preventDefault();
                  setShowCompose(true);
                  setShowStockRequest(false);
                }}
              >
                <i className="fas fa-plus me-2" />
                Compose Email
              </Link>
              
            <Link
  to="#"
  className="btn btn-success btn-block w-100"
  onClick={(e) => {
    e.preventDefault();
    setShowStockRequest(true);
    setShowCompose(false);
  }}
>
  <i className="fas fa-box me-2" />
  Stock Request
</Link>

            </div>
            
            <ul className="inbox-menu">
              <li className={currentView === "inbox" ? "active" : ""}>
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentView("inbox");
                  }}
                >
                  <i className="fas fa-download" /> Inbox{" "}
                  {unreadCount > 0 && (
                    <span className="mail-count">({unreadCount})</span>
                  )}
                </Link>
              </li>
              <li className={currentView === "starred" ? "active" : ""}>
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentView("starred");
                  }}
                >
                  <i className="far fa-star" /> Important
                </Link>
              </li>
              <li className={currentView === "sent" ? "active" : ""}>
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentView("sent");
                  }}
                >
                  <i className="far fa-paper-plane" /> Sent Mail
                </Link>
              </li>
              <li className={currentView === "drafts" ? "active" : ""}>
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentView("drafts");
                  }}
                >
                  <i className="far fa-file-alt" /> Drafts{" "}
                  {draftCount > 0 && (
                    <span className="mail-count">({draftCount})</span>
                  )}
                </Link>
              </li>
              <li className={currentView === "trash" ? "active" : ""}>
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentView("trash");
                  }}
                >
                  <i className="far fa-trash-alt" /> Trash
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-9 col-md-12">
            {showCompose ? (
              <div className="card bg-white">
                <div className="card-body">
                  <h4 className="mb-4">Compose Email</h4>
                  
                  <div className="mb-3">
                    <label className="form-label">To</label>
                    <input
                      type="email"
                      className="form-control"
                      value={composeData.to}
                      onChange={(e) =>
                        setComposeData({ ...composeData, to: e.target.value })
                      }
                      placeholder="recipient@example.com"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      value={composeData.subject}
                      onChange={(e) =>
                        setComposeData({ ...composeData, subject: e.target.value })
                      }
                      placeholder="Email subject"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      rows="8"
                      value={composeData.body}
                      onChange={(e) =>
                        setComposeData({ ...composeData, body: e.target.value })
                      }
                      placeholder="Your message..."
                    />
                  </div>

                  <div className="mb-3">
                    <h5>Automation Settings</h5>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={composeData.enableFollowUp}
                        onChange={(e) =>
                          setComposeData({
                            ...composeData,
                            enableFollowUp: e.target.checked
                          })
                        }
                      />
                      <label className="form-check-label">
                        Enable follow-up reminder
                      </label>
                    </div>
                    {composeData.enableFollowUp && (
                      <div className="mt-2">
                        <label className="form-label">Follow-up after (days)</label>
                        <input
                          type="number"
                          className="form-control"
                          style={{ width: "100px" }}
                          value={composeData.followUpDays}
                          onChange={(e) =>
                            setComposeData({
                              ...composeData,
                              followUpDays: parseInt(e.target.value)
                            })
                          }
                          min="1"
                          max="30"
                        />
                      </div>
                    )}

                    <div className="form-check mt-3">
    <input
      className="form-check-input"
      type="checkbox"
      checked={composeData.enableEscalation}
      onChange={(e) =>
        setComposeData({
          ...composeData,
          enableEscalation: e.target.checked
        })
      }
    />
    <label className="form-check-label">
      Enable auto-escalation
    </label>
  </div>
  {composeData.enableEscalation && (
    <div className="mt-2">
      <div className="mb-2">
        <label className="form-label">Escalation email</label>
        <input
          type="email"
          className="form-control"
          value={composeData.escalationEmail}
          onChange={(e) =>
            setComposeData({
              ...composeData,
              escalationEmail: e.target.value
            })
          }
          placeholder="any@gmail.com"
        />
      </div>
      <div>
        <label className="form-label">Escalate after (days)</label>
        <input
          type="number"
          className="form-control"
          style={{ width: "150px" }}
          value={composeData.escalationDays}
          onChange={(e) =>
            setComposeData({
              ...composeData,
              escalationDays: parseInt(e.target.value)
            })
          }
          min="1"
          max="30"
        />
        <small className="text-muted">
          Escalation will occur if no response is received within this timeframe
        </small>
      </div>
    </div>
  )}
</div>

                  <div className="d-flex gap-2">
                    <button className="btn btn-primary" onClick={sendEmail}>
                      <i className="fas fa-paper-plane me-2" />
                      Send Email
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        setShowCompose(false);
                        resetComposeForm();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : showStockRequest ? (
              <div className="card bg-white">
                <div className="card-body">
                  <h4 className="mb-4">Stock Request</h4>
                  
                  <div className="mb-3">
                    <label className="form-label">Send To</label>
                    <input
                      type="email"
                      className="form-control"
                      value={stockRequestData.to}
                      onChange={(e) =>
                        setStockRequestData({ ...stockRequestData, to: e.target.value })
                      }
                      placeholder="warehouse@example.com"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Product Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={stockRequestData.productName}
                      onChange={(e) =>
                        setStockRequestData({ ...stockRequestData, productName: e.target.value })
                      }
                      placeholder="Product name"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      value={stockRequestData.quantity}
                      onChange={(e) =>
                        setStockRequestData({ ...stockRequestData, quantity: parseInt(e.target.value) })
                      }
                      min="1"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Urgency</label>
                    <select
                      className="form-select"
                      value={stockRequestData.urgency}
                      onChange={(e) =>
                        setStockRequestData({ ...stockRequestData, urgency: e.target.value })
                      }
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Notes (Optional)</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      value={stockRequestData.notes}
                      onChange={(e) =>
                        setStockRequestData({ ...stockRequestData, notes: e.target.value })
                      }
                      placeholder="Additional notes..."
                    />
                  </div>

                  <div className="d-flex gap-2">
                    <button className="btn btn-success" onClick={sendStockRequest}>
                      <i className="fas fa-box me-2" />
                      Send Stock Request
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        setShowStockRequest(false);
                        resetStockRequestForm();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card bg-white">
                <div className="card-body">
                  <div className="email-header">
                    <div className="row">
                      <div className="col-lg-9 top-action-left col-sm-12">
                        <div className="float-left">
                          <div className="btn-group dropdown-action me-1">
                            <button
                              type="button"
                              className="btn btn-white dropdown-toggle"
                              data-bs-toggle="dropdown"
                            >
                              Select <i className="fas fa-angle-down" />
                            </button>
                            <div className="dropdown-menu">
                              <Link
                                className="dropdown-item"
                                to="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  selectAllEmails();
                                }}
                              >
                                All
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setSelectedEmails([]);
                                }}
                              >
                                None
                              </Link>
                            </div>
                          </div>
                          <div className="btn-group dropdown-action me-1">
                            <button
                              type="button"
                              className="btn btn-white dropdown-toggle"
                              data-bs-toggle="dropdown"
                            >
                              Actions <i className="fas fa-angle-down" />
                            </button>
                            <div className="dropdown-menu">
                              <Link
                                className="dropdown-item"
                                to="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleBulkAction("read");
                                }}
                              >
                                Mark As Read
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleBulkAction("unread");
                                }}
                              >
                                Mark As Unread
                              </Link>
                              <div className="dropdown-divider" />
                              <Link
                                className="dropdown-item"
                                to="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleBulkAction("delete");
                                }}
                              >
                                Delete
                              </Link>
                            </div>
                          </div>
                          <div className="btn-group dropdown-action mail-search">
                            <input
                              type="text"
                              placeholder="Search Messages"
                              className="form-control search-message"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 top-action-right col-sm-12">
                        <div className="text-end">
                          <button
                            type="button"
                            title="Refresh"
                            className="btn btn-white d-none d-md-inline-block me-1"
                            onClick={() => fetchEmails()}
                          >
                            <i className="fas fa-sync-alt" />
                          </button>
                          <div className="btn-group">
                            <button
                              className="btn btn-white"
                              disabled={pagination.currentPage === 1}
                              onClick={() =>
                                fetchEmails(currentView, pagination.currentPage - 1)
                              }
                            >
                              <i className="fas fa-angle-left" />
                            </button>
                            <button
                              className="btn btn-white"
                              disabled={
                                pagination.currentPage === pagination.totalPages
                              }
                              onClick={() =>
                                fetchEmails(currentView, pagination.currentPage + 1)
                              }
                            >
                              <i className="fas fa-angle-right" />
                            </button>
                          </div>
                        </div>
                        <div className="text-end">
                          <span className="text-muted d-none d-md-inline-block">
                            Showing {emails.length} of {pagination.totalEmails}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="email-content">
                    <div className="table-responsive">
                      {loading ? (
                        <div className="text-center py-5">
                          <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      ) : emails.length === 0 ? (
                        <div className="text-center py-5">
                          <p className="text-muted">No emails found</p>
                        </div>
                      ) : (
                        <table className="table table-inbox table-hover">
                          <thead>
                            <tr>
                              <th colSpan={6}>
                                <label className="checkboxs">
                                  <input
                                    type="checkbox"
                                    checked={
                                      selectedEmails.length === emails.length &&
                                      emails.length > 0
                                    }
                                    onChange={selectAllEmails}
                                  />
                                  <span className="checkmarks" />
                                </label>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {emails.map((email) => (
                              <tr
                                key={email.id}
                                className={`${
                                  !email.is_read ? "unread" : ""
                                } clickable-row`}
                                onClick={() => {
                                  setSelectedEmail(email);
                                  if (!email.is_read) {
                                    markAsRead(email.id);
                                  }
                                }}
                              >
                                <td onClick={(e) => e.stopPropagation()}>
                                  <label className="checkboxs">
                                    <input
                                      type="checkbox"
                                      checked={selectedEmails.includes(email.id)}
                                      onChange={() => toggleEmailSelection(email.id)}
                                    />
                                    <span className="checkmarks" />
                                  </label>
                                </td>
                                <td onClick={(e) => e.stopPropagation()}>
                                  <span
                                    className="mail-important"
                                    onClick={() =>
                                      toggleStar(email.id, email.is_starred)
                                    }
                                  >
                                    <i
                                      className={`${
                                        email.is_starred ? "fas" : "far"
                                      } fa-star ${
                                        email.is_starred ? "starred" : ""
                                      }`}
                                    />
                                  </span>
                                </td>
                                <td className="name">
                                  {currentView === "sent"
                                    ? email.recipient_email
                                    : email.sender_email}
                                </td>
                                <td className="subject">
                                  {email.subject}
                                  {email.template_type === 'stock_request' && (
                                    <span className="badge bg-info ms-2">
                                      Stock Request
                                    </span>
                                  )}
                                  {email.follow_up_scheduled && (
                                    <span className="badge bg-warning ms-2">
                                      Follow-up
                                    </span>
                                  )}
                                  {email.escalated && (
                                    <span className="badge bg-danger ms-2">
                                      Escalated
                                    </span>
                                  )}
                                </td>
                                <td>
                                  {email.has_attachment && (
                                    <i className="fas fa-paperclip" />
                                  )}
                                </td>
                                <td className="mail-date">
                                  {new Date(email.created_at).toLocaleString()}
                                </td>
                                <td className="subject">
  {email.subject}
  
  {/* Stock Request Badge */}
  {email.template_type === 'stock_request' && (
    <span className="badge bg-info ms-2">
      Stock Request
    </span>
  )}
  
  {/* Stock Flow Badges - ADD THESE */}
  {email.template_type === 'stock_flow_created' && (
    <span className="badge bg-success ms-2">
      <i className="fas fa-box me-1" />
      Stock Flow Created
    </span>
  )}
  
  {email.template_type === 'stock_flow_shipping' && (
    <span className="badge bg-warning text-dark ms-2">
      <i className="fas fa-shipping-fast me-1" />
      In Transit
    </span>
  )}
  
  {email.template_type === 'stock_flow_delivered' && (
    <span className="badge bg-primary ms-2">
      <i className="fas fa-check-circle me-1" />
      Delivered
    </span>
  )}
  
  {/* Other badges */}
  {email.follow_up_scheduled && (
    <span className="badge bg-warning ms-2">
      Follow-up
    </span>
  )}
  
  {email.escalated && (
    <span className="badge bg-danger ms-2">
      Escalated
    </span>
  )}
</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Email Detail Modal */}
      {selectedEmail && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setSelectedEmail(null)}
        >
          <div
            className="modal-dialog modal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedEmail.subject}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedEmail(null)}
                />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <strong>From:</strong> {selectedEmail.sender_email}
                  <br />
                  <strong>To:</strong> {selectedEmail.recipient_email}
                  <br />
                  <strong>Date:</strong>{" "}
                  {new Date(selectedEmail.created_at).toLocaleString()}
                  <br />
                  {selectedEmail.template_type === 'stock_request' && (
                    <span className="badge bg-info mt-2">Stock Request</span>
                  )}
                </div>
                <hr />
                <div dangerouslySetInnerHTML={{ __html: selectedEmail.body }} />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  onClick={() => replyToEmail(selectedEmail)}
                >
                  <i className="fas fa-reply me-2" />
                  Reply
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => forwardEmail(selectedEmail)}
                >
                  <i className="fas fa-share me-2" />
                  Forward
                </button>
                
                {/* Stock Request Response Buttons */}
                {selectedEmail.template_type === 'stock_request' && 
                 currentView === 'inbox' && (
                  <>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        respondToStockRequest(selectedEmail.id, 'approve');
                      }}
                    >
                      <i className="fas fa-check me-2" />
                      Approve
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        respondToStockRequest(selectedEmail.id, 'reject');
                      }}
                    >
                      <i className="fas fa-times me-2" />
                      Reject
                    </button>
                  </>
                )}
                
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteEmail(selectedEmail.id);
                    setSelectedEmail(null);
                  }}
                >
                  <i className="fas fa-trash me-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Email;