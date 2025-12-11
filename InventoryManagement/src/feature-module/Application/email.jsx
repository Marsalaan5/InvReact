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




import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/authService";
// import axios from "axios";

// const API_URL =  "http://localhost:5000/api";

const Email = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [currentView, setCurrentView] = useState("inbox");
  const [showCompose, setShowCompose] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  // const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [composeData, setComposeData] = useState({
    to: "",
    subject: "",
    body: "",
    template: "none",
    enableFollowUp: true,
    followUpDays: 2,
    enableEscalation: true,
    escalationEmail: ""
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalEmails: 0
  });


  // Fetch emails
  const fetchEmails = async () => {
    setLoading(true);
    try {
      const response = await AuthService.getEmails();
      setEmails(response.data.emails);
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        totalEmails: response.data.total
      });
    } catch (error) {
      console.error("Error fetching emails:", error);
      showNotification("Error loading emails", "error");
    } finally {
      setLoading(false);
    }
  };

  // Fetch notifications
  // const fetchNotifications = async () => {
  //   try {
  //     const response = await axios.get(`${API_URL}/notifications`, {
  //       headers: { Authorization: `Bearer ${getAuthToken()}` }
  //     });
  //     setNotifications(response.data.notifications);
  //   } catch (error) {
  //     console.error("Error fetching notifications:", error);
  //   }
  // };

  useEffect(() => {
    fetchEmails();
    // fetchNotifications();
    
    // Poll for new emails and notifications every 30 seconds
    const interval = setInterval(() => {
      fetchEmails(currentView, pagination.currentPage);
      // fetchNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, [currentView, searchQuery]);

  // Send email
  const sendEmail = async () => {
    if (!composeData.to || !composeData.subject) {
      showNotification("Please fill in all required fields", "error");
      return;
    }

    try {
       await AuthService.createEmail();
      showNotification("Email sent successfully!", "success");
      setShowCompose(false);
      resetComposeForm();
      fetchEmails("sent");
    } catch (error) {
      console.error("Error sending email:", error);
      showNotification(error.response?.data?.message || "Error sending email", "error");
    }
  };

  // Mark as read
  const markAsRead = async (emailId) => {
    try {
      await AuthService.readEmail();

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
      await AuthService.updateEmail()
      
      setEmails(prev =>
        prev.map(e => (e.id === emailId ? { ...e, is_starred: !currentStarred } : e))
      );
    } catch (error) {
      console.error("Error toggling star:", error);
    }
  };

  // Delete email
  const deleteEmail = async () => {
    try {
      await AuthService.deleteEmail();

      showNotification("Email deleted", "success");
      fetchEmails();
    } catch (error) {
      console.error("Error deleting email:", error);
      showNotification("Error deleting email", "error");
    }
  };

  // Bulk actions
  const handleBulkAction = async (action) => {
    if (selectedEmails.length === 0) {
      showNotification("Please select emails first", "error");
      return;
    }

    try {
      await AuthService.createBulkEmail()
      
      showNotification(`${action} completed successfully`, "success");
      setSelectedEmails([]);
      fetchEmails();
    } catch (error) {
      console.error("Error performing bulk action:", error);
      showNotification("Error performing action", "error");
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

  // Mark notification as read
  // const markNotificationAsRead = async (notificationId) => {
  //   try {
  //     await axios.put(
  //       `${API_URL}/notifications/${notificationId}/read`,
  //       {},
  //       { headers: { Authorization: `Bearer ${getAuthToken()}` } }
  //     );
  //     fetchNotifications();
  //   } catch (error) {
  //     console.error("Error marking notification as read:", error);
  //   }
  // };

  const showNotification = (message) => {
    // You can integrate with a toast library here
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
      escalationEmail: ""
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

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="row">
            <div className="col">
              <h3 className="page-title">Inbox</h3>
            </div>
            {/* {notifications.filter(n => !n.is_read).length > 0 && (
              <div className="col-auto">
                <span className="badge bg-danger">
                  {notifications.filter(n => !n.is_read).length} new notifications
                </span>
              </div>
            )} */}
          </div>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-12">
            <div className="compose-btn">
              <Link
                to="#"
                className="btn btn-primary btn-block w-100"
                onClick={(e) => {
                  e.preventDefault();
                  setShowCompose(true);
                }}
              >
                Compose
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
                    <label className="form-label">Template</label>
                    <select
                      className="form-select"
                      value={composeData.template}
                      onChange={(e) =>
                        setComposeData({ ...composeData, template: e.target.value })
                      }
                    >
                      <option value="none">No Template</option>
                      <option value="package_shipped">Package Shipped</option>
                      <option value="delivery_confirmation">Delivery Confirmation</option>
                      <option value="order_update">Order Update</option>
                    </select>
                  </div>

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

                    <div className="form-check mt-2">
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
                          placeholder="manager@company.com"
                        />
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
                              <div className="dropdown-divider" />
                              <Link
                                className="dropdown-item"
                                to="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setSelectedEmails(
                                    emails.filter(e => e.is_read).map(e => e.id)
                                  );
                                }}
                              >
                                Read
                              </Link>
                              <Link
                                className="dropdown-item"
                                to="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setSelectedEmails(
                                    emails.filter(e => !e.is_read).map(e => e.id)
                                  );
                                }}
                              >
                                Unread
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
                </div>
                <hr />
                <div
                  dangerouslySetInnerHTML={{ __html: selectedEmail.body }}
                />
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