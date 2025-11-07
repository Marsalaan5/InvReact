// // // src/feature-module/settings/menu/MenuManagement.jsx
// // import React, { useState, useEffect } from 'react';
// // import { Plus, Edit2, Trash2, Eye, EyeOff, GripVertical, ChevronDown, ChevronRight } from 'lucide-react';
// // import AuthService from '../../services/authService';

// // const MenuManagement = () => {
// //   const [menuItems, setMenuItems] = useState([]);
// //     const [availableRoles, setAvailableRoles] = useState([]);
// //   const [showModal, setShowModal] = useState(false);
// //   const [editingItem, setEditingItem] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [expandedItems, setExpandedItems] = useState({});
  
// //   const [formData, setFormData] = useState({
// //     title: '',
// //     label: '',
// //     path: '',
// //     icon: '',
// //     roles: [],
// //     parent_id: null,
// //     status: 'active',
// //     order_by: 0,
// //     submenu: false,
// //     submenu_hdr: ''
// //   });

// //   // const availableRoles = ['super admin', 'admin', 'user'];
// //   const availableIcons = [
// //     'Grid', 'Box', 'Package', 'ShoppingCart', 'ShoppingBag', 'Users', 'User', 
// //     'FileText', 'File', 'Smartphone', 'Calendar', 'Clock', 'Settings', 
// //     'BarChart2', 'PieChart', 'TrendingDown', 'DollarSign', 'CreditCard',
// //     'Layers', 'Tag', 'Bookmark', 'Home', 'Archive', 'Truck', 'Save',
// //     'RefreshCw', 'Copy', 'HardDrive', 'Shield', 'Lock', 'LogOut',
// //     'Codepen', 'Speaker', 'Maximize', 'AlignJustify', 'Clipboard',
// //     'FileMinus', 'Inbox', 'Database', 'UserCheck', 'BarChart', 'Shuffle',
// //     'Monitor', 'Hexagon', 'Edit', 'Columns', 'Map', 'Send', 'AlertTriangle'
// //   ];

// //   useEffect(() => {
// //     fetchMenuItems();
// //     fetchAvailableRoles();
// //   }, []);

// // //   const fetchMenuItems = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const response = await AuthService.getAllMenuItems();
// // //       setMenuItems(response.data || []);
// // //     } catch (error) {
// // //       console.error('Error fetching menu items:', error);
// // //       alert('Failed to fetch menu items');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // const fetchMenuItems = async () => {
// //   try {
// //     setLoading(true);
// //     const response = await AuthService.getAllMenuItems();
// //     console.log('Menu items fetched:', response.data); // Log the data
// //     setMenuItems(response.data || []);
// //   } catch (error) {
// //     console.error('Error fetching menu items:', error);
// //     alert('Failed to fetch menu items');
// //   } finally {
// //     setLoading(false);
// //   }
// // };

// //  const fetchAvailableRoles = async () => {
// //     try {
// //       const response = await AuthService.getRoles();  // Fetch roles from backend
// //       setAvailableRoles(response.data || []);
// //     } catch (error) {
// //       console.error('Error fetching roles:', error);
// //       alert('Failed to fetch roles');
// //     }
// //   };


// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     try {
// //       const submitData = {
// //         ...formData,
// //         // roles: formData.roles.join(','),
// //         submenu: formData.submenu,
// //         parent_id: formData.parent_id || null,
// //         path: formData.path || null,
// //         icon: formData.icon || null,
// //         submenu_hdr: formData.submenu_hdr || null
// //       };

// //       if (editingItem) {
// //         await AuthService.updateMenuItem(editingItem.id, submitData);
// //       } else {
// //         await AuthService.createMenuItem(submitData);
// //       }
      
// //       setShowModal(false);
// //       resetForm();
// //       fetchMenuItems();
// //       alert(editingItem ? 'Menu item updated!' : 'Menu item created!');
// //     } catch (error) {
// //       console.error('Error saving menu item:', error);
// //       alert('Failed to save menu item: ' + (error.response?.data?.error || error.message));
// //     }
// //   };

// //   // const handleEdit = (item) => {
// //   //   setEditingItem(item);
// //   //   setFormData({
// //   //     title: item.title,
// //   //     label: item.label,
// //   //     path: item.path || '',
// //   //     icon: item.icon || '',
// //   //     roles: item.roles ? item.roles.split(',') : [],
// //   //     parent_id: item.parent_id,
// //   //     status: item.status,
// //   //     order_by: item.order_by,
// //   //     submenu: Boolean(item.submenu),
// //   //     submenu_hdr: item.submenu_hdr || ''
// //   //   });
// //   //   setShowModal(true);
// //   // };


// //   const handleEdit = (item) => {
// //   setEditingItem(item);
// //   setFormData({
// //     title: item.title,
// //     label: item.label,
// //     path: item.path || '',
// //     icon: item.icon || '',
// //     roles: Array.isArray(item.roles) ? item.roles : [], // Just use roles directly
// //     parent_id: item.parent_id,
// //     status: item.status,
// //     order_by: item.order_by,
// //     submenu: Boolean(item.submenu),
// //     submenu_hdr: item.submenu_hdr || ''
// //   });
// //   setShowModal(true);
// // };


// //   const handleDelete = async (id) => {
// //     if (window.confirm('Are you sure? All child items will also be deleted.')) {
// //       try {
// //         await AuthService.deleteMenuItem(id);
// //         fetchMenuItems();
// //         alert('Menu item deleted!');
// //       } catch (error) {
// //         console.error('Error deleting menu item:', error);
// //         alert('Failed to delete menu item');
// //       }
// //     }
// //   };

// //   const toggleStatus = async (id, currentStatus) => {
// //     try {
// //       const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
// //       await AuthService.updateMenuStatus(id, newStatus);
// //       fetchMenuItems();
// //     } catch (error) {
// //       console.error('Error toggling status:', error);
// //       alert('Failed to update status');
// //     }
// //   };

// //   const resetForm = () => {
// //     setFormData({
// //       title: '',
// //       label: '',
// //       path: '',
// //       icon: '',
// //       roles: [],
// //       parent_id: null,
// //       status: 'active',
// //       order_by: 0,
// //       submenu: false,
// //       submenu_hdr: ''
// //     });
// //     setEditingItem(null);
// //   };

// //   const handleRoleToggle = (role) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       roles: prev.roles.includes(role)
// //         ? prev.roles.filter(r => r !== role)
// //         : [...prev.roles, role]
// //     }));
// //   };

// //  const toggleExpand = (id) => {
// //   setExpandedItems(prevState => ({
// //     ...prevState,
// //     [id]: !prevState[id],  
// //   }));
// // };

// //   // Organize menu hierarchically
// //  const organizeMenuHierarchy = (items) => {
// //   const itemMap = new Map();
// //   const roots = [];


// //   items.forEach(item => {
// //     itemMap.set(item.id, { ...item, children: item.submenuItems || [] });
// //   });

 
// //   items.forEach(item => {
// //     if (item.parent_id === null) {
// //       roots.push(itemMap.get(item.id)); 
// //     } else {
// //       const parent = itemMap.get(item.parent_id);
// //       if (parent) {
// //         parent.children.push(itemMap.get(item.id)); 
// //       }
// //     }
// //   });

// //   return roots;
// // };



// // const renderMenuTree = (items, level = 0) => {
// //   return items.map(item => (
// //     <React.Fragment key={item.id}>
// //       <tr style={{ backgroundColor: level === 0 ? '#f8f9fa' : 'white' }}>
// //         <td style={{ paddingLeft: `${level * 30 + 10}px` }}>
// //           <div className="d-flex align-items-center gap-2">
// //             {item.submenuItems?.length > 0 && (
// //               <button
// //                 className="btn btn-sm p-0"
// //                 onClick={() => toggleExpand(item.id)}
// //                 style={{ border: 'none', background: 'none' }}
// //               >
// //                 {expandedItems[item.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
// //               </button>
// //             )}
// //             <GripVertical size={16} className="text-muted" />
// //             <span style={{ fontWeight: level === 0 ? 'bold' : 'normal' }}>
// //               {item.label}
// //             </span>
// //           </div>
// //         </td>
// //         <td>{item.title}</td>
// //         <td><code>{item.path || '-'}</code></td>
// //         <td>
// //           {item.icon && <span className="badge bg-light text-dark">{item.icon}</span>}
// //         </td>
// //         <td>
// //           <div className="d-flex gap-1 flex-wrap">
// //             {/* {item.roles?.split(',').map((role, idx) => (
// //               <span key={idx} className="badge bg-primary">{role}</span>
// //             ))} */}
// //             {(item.roles || []).map((role, idx) => (
// //   <span key={idx} className="badge bg-primary">{role}</span>
// // ))}

// //           </div>
// //         </td>
// //         <td>{item.submenu_hdr || '-'}</td>
// //         <td>
// //           <span className={`badge ${item.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
// //             {item.status}
// //           </span>
// //         </td>
// //         <td>
// //           <div className="d-flex gap-2">
// //             <button
// //               className="btn btn-sm btn-outline-primary"
// //               onClick={() => handleEdit(item)}
// //             >
// //               <Edit2 size={14} />
// //             </button>
// //             <button
// //               className="btn btn-sm btn-outline-warning"
// //               onClick={() => toggleStatus(item.id, item.status)}
// //             >
// //               {item.status === 'active' ? <EyeOff size={14} /> : <Eye size={14} />}
// //             </button>
// //             <button
// //               className="btn btn-sm btn-outline-danger"
// //               onClick={() => handleDelete(item.id)}
// //             >
// //               <Trash2 size={14} />
// //             </button>
// //           </div>
// //         </td>
// //       </tr>
// //       {/* Check if the item has submenuItems and expand state is true */}
// //       {expandedItems[item.id] && item.submenuItems?.length > 0 && renderMenuTree(item.submenuItems, level + 1)}
// //     </React.Fragment>
// //   ));
// // };



// //   const hierarchicalMenu = organizeMenuHierarchy(menuItems);
// //   const parentMenuItems = menuItems.filter(item => item.parent_id === null || !item.path);

// //   return (
// //     <div className="page-wrapper">
// //       <div className="content">
// //         {/* Page Header */}
// //         <div className="page-header">
// //           <div className="add-item d-flex">
// //             <div className="page-title">
// //               <h4>Menu Management</h4>
// //               <h6>Manage sidebar menu items and hierarchy</h6>
// //             </div>
// //           </div>
// //           <div className="page-btn">
// //             <button
// //               className="btn btn-added"
// //               onClick={() => {
// //                 resetForm();
// //                 setShowModal(true);
// //               }}
// //             >
// //               <Plus size={18} className="me-2" />
// //               Add Menu Item
// //             </button>
// //           </div>
// //         </div>

// //         {/* Menu Table */}
// //         <div className="card">
// //           <div className="card-body">
// //             {loading ? (
// //               <div className="text-center py-5">
// //                 <div className="spinner-border" role="status">
// //                   <span className="visually-hidden">Loading...</span>
// //                 </div>
// //               </div>
// //             ) : (
// //               <div className="table-responsive">
// //                 <table className="table table-hover">
// //                   <thead>
// //                     <tr>
// //                       <th>Label</th>
// //                       <th>Title</th>
// //                       <th>Path</th>
// //                       <th>Icon</th>
// //                       <th>Roles</th>
// //                       <th>Section</th>
// //                       <th>Status</th>
// //                       <th>Actions</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {hierarchicalMenu.length > 0 ? (
// //                       renderMenuTree(hierarchicalMenu)
// //                     ) : (
// //                       <tr>
// //                         <td colSpan="8" className="text-center py-4">
// //                           No menu items found. Create your first menu item!
// //                         </td>
// //                       </tr>
// //                     )}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Modal */}
// //         {showModal && (
// //           <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
// //             <div className="modal-dialog modal-lg modal-dialog-scrollable">
// //               <div className="modal-content">
// //                 <div className="modal-header">
// //                   <h5 className="modal-title">
// //                     {editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
// //                   </h5>
// //                   <button
// //                     type="button"
// //                     className="btn-close"
// //                     onClick={() => {
// //                       setShowModal(false);
// //                       resetForm();
// //                     }}
// //                   />
// //                 </div>
// //                 <div className="modal-body">
// //                   <div className="row">
// //                     {/* Title */}
// //                     <div className="col-md-6 mb-3">
// //                       <label className="form-label">
// //                         Title <span className="text-danger">*</span>
// //                       </label>
// //                       <input
// //                         type="text"
// //                         className="form-control"
// //                         value={formData.title}
// //                         onChange={(e) => setFormData({ ...formData, title: e.target.value })}
// //                         required
// //                       />
// //                       <small className="text-muted">Internal identifier</small>
// //                     </div>

// //                     {/* Label */}
// //                     <div className="col-md-6 mb-3">
// //                       <label className="form-label">
// //                         Label <span className="text-danger">*</span>
// //                       </label>
// //                       <input
// //                         type="text"
// //                         className="form-control"
// //                         value={formData.label}
// //                         onChange={(e) => setFormData({ ...formData, label: e.target.value })}
// //                         required
// //                       />
// //                       <small className="text-muted">Display name</small>
// //                     </div>

// //                     {/* Path */}
// //                     <div className="col-md-6 mb-3">
// //                       <label className="form-label">Path</label>
// //                       <input
// //                         type="text"
// //                         className="form-control"
// //                         value={formData.path}
// //                         onChange={(e) => setFormData({ ...formData, path: e.target.value })}
// //                         placeholder="/example-path"
// //                       />
// //                     </div>

// //                     {/* Icon */}
// //                     <div className="col-md-6 mb-3">
// //                       <label className="form-label">Icon</label>
// //                       <select
// //                         className="form-control"
// //                         value={formData.icon}
// //                         onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
// //                       >
// //                         <option value="">No Icon</option>
// //                         {availableIcons.map((icon) => (
// //                           <option key={icon} value={icon}>{icon}</option>
// //                         ))}
// //                       </select>
// //                     </div>

// //                     {/* Parent */}
// //                     <div className="col-md-6 mb-3">
// //                       <label className="form-label">Parent</label>
// //                       <select
// //                         className="form-control"
// //                         value={formData.parent_id || ''}
// //                         onChange={(e) => setFormData({
// //                           ...formData,
// //                           parent_id: e.target.value ? parseInt(e.target.value) : null,
// //                         })}
// //                       >
// //                         <option value="">Top Level</option>
// //                         {parentMenuItems.map((item) => (
// //                           <option key={item.id} value={item.id}>{item.label}</option>
// //                         ))}
// //                       </select>
// //                     </div>

// //                     {/* Section Header */}
// //                     <div className="col-md-6 mb-3">
// //                       <label className="form-label">Section Header</label>
// //                       <input
// //                         type="text"
// //                         className="form-control"
// //                         value={formData.submenu_hdr}
// //                         onChange={(e) => setFormData({ ...formData, submenu_hdr: e.target.value })}
// //                       />
// //                     </div>

// //                     {/* Roles */}
// //                     <div className="col-md-12 mb-3">
// //                       <label className="form-label">
// //                         Roles <span className="text-danger">*</span>
// //                       </label>
// //                       <div className="d-flex gap-3 mt-2">
// //                         {availableRoles.map((role) => (
// //                           <div key={role} className="form-check">
// //                             <input
// //                               type="checkbox"
// //                               className="form-check-input"
// //                               id={`role-${role}`}
// //                               checked={formData.roles.includes(role)}
// //                               onChange={() => handleRoleToggle(role)}
// //                             />
// //                             <label className="form-check-label" htmlFor={`role-${role}`}>
// //                               {role}
// //                             </label>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     </div>

// //                     {/* Status, Order, Submenu */}
// //                     <div className="col-md-4 mb-3">
// //                       <label className="form-label">Status</label>
// //                       <select
// //                         className="form-control"
// //                         value={formData.status}
// //                         onChange={(e) => setFormData({ ...formData, status: e.target.value })}
// //                       >
// //                         <option value="active">Active</option>
// //                         <option value="inactive">Inactive</option>
// //                       </select>
// //                     </div>

// //                     <div className="col-md-4 mb-3">
// //                       <label className="form-label">Order</label>
// //                       <input
// //                         type="number"
// //                         className="form-control"
// //                         value={formData.order_by}
// //                         onChange={(e) => setFormData({ ...formData, order_by: parseInt(e.target.value) || 0 })}
// //                       />
// //                     </div>

// //                     <div className="col-md-4 mb-3">
// //                       <label className="form-label d-block">Has Submenu</label>
// //                       <div className="form-check form-switch mt-2">
// //                         <input
// //                           className="form-check-input"
// //                           type="checkbox"
// //                           checked={formData.submenu}
// //                           onChange={(e) => setFormData({ ...formData, submenu: e.target.checked })}
// //                         />
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <div className="modal-footer">
// //                   <button
// //                     type="button"
// //                     className="btn btn-secondary"
// //                     onClick={() => {
// //                       setShowModal(false);
// //                       resetForm();
// //                     }}
// //                   >
// //                     Cancel
// //                   </button>
// //                   <button
// //                     type="button"
// //                     className="btn btn-primary"
// //                     onClick={handleSubmit}
// //                   >
// //                     {editingItem ? 'Update' : 'Create'}
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default MenuManagement;


// // src/feature-module/settings/menu/MenuManagement.jsx
// import React, { useState, useEffect } from 'react';
// import { Plus, Edit2, Trash2, Eye, EyeOff, GripVertical, ChevronDown, ChevronRight } from 'lucide-react';
// import AuthService from '../../services/authService';

// const MenuManagement = () => {
//   const [menuItems, setMenuItems] = useState([]);
//   const [availableRoles, setAvailableRoles] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [rolesLoading, setRolesLoading] = useState(false);
//   const [expandedItems, setExpandedItems] = useState({});
  
//   const [formData, setFormData] = useState({
//     title: '',
//     label: '',
//     path: '',
//     icon: '',
//     roles: [],
//     parent_id: null,
//     status: 'active',
//     order_by: 0,
//     submenu: false,
//     submenu_hdr: ''
//   });

//   const availableIcons = [
//     'Grid', 'Box', 'Package', 'ShoppingCart', 'ShoppingBag', 'Users', 'User', 
//     'FileText', 'File', 'Smartphone', 'Calendar', 'Clock', 'Settings', 
//     'BarChart2', 'PieChart', 'TrendingDown', 'DollarSign', 'CreditCard',
//     'Layers', 'Tag', 'Bookmark', 'Home', 'Archive', 'Truck', 'Save',
//     'RefreshCw', 'Copy', 'HardDrive', 'Shield', 'Lock', 'LogOut',
//     'Codepen', 'Speaker', 'Maximize', 'AlignJustify', 'Clipboard',
//     'FileMinus', 'Inbox', 'Database', 'UserCheck', 'BarChart', 'Shuffle',
//     'Monitor', 'Hexagon', 'Edit', 'Columns', 'Map', 'Send', 'AlertTriangle'
//   ];

//   useEffect(() => {
//     fetchMenuItems();
//     fetchAvailableRoles();
//   }, []);

//   const fetchMenuItems = async () => {
//     try {
//       setLoading(true);
//       const response = await AuthService.getAllMenuItems();
//       console.log('Menu items fetched:', response.data);
      
//       // Normalize roles data - ensure roles is always an array
//       const normalizedData = (response.data || []).map(item => ({
//         ...item,
//         roles: normalizeRoles(item.roles)
//       }));
      
//       setMenuItems(normalizedData);
//     } catch (error) {
//       console.error('Error fetching menu items:', error);
//       alert('Failed to fetch menu items: ' + (error.response?.data?.message || error.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAvailableRoles = async () => {
//     try {
//       setRolesLoading(true);
//       const response = await AuthService.getRoles();
//       console.log('Roles fetched:', response.data);
      
//       // Handle different response formats
//       let rolesArray = [];
//       if (Array.isArray(response.data)) {
//         // If response.data is array of objects with 'name' property
//         rolesArray = response.data.map(role => 
//           typeof role === 'string' ? role : (role.name || role.role_name || role.title)
//         );
//       } else if (response.data?.roles) {
//         // If response has roles property
//         rolesArray = Array.isArray(response.data.roles) 
//           ? response.data.roles.map(role => 
//               typeof role === 'string' ? role : (role.name || role.role_name || role.title)
//             )
//           : [];
//       }
      
//       // Filter out any undefined/null values
//       rolesArray = rolesArray.filter(Boolean);
      
//       console.log('Processed roles:', rolesArray);
//       setAvailableRoles(rolesArray);
//     } catch (error) {
//       console.error('Error fetching roles:', error);
//       alert('Failed to fetch roles: ' + (error.response?.data?.message || error.message));
//       // Fallback to default roles if API fails
//       setAvailableRoles(['super admin', 'admin', 'user']);
//     } finally {
//       setRolesLoading(false);
//     }
//   };

//   // Normalize roles - convert string to array or ensure it's an array
//   const normalizeRoles = (roles) => {
//     if (!roles) return [];
//     if (Array.isArray(roles)) return roles;
//     if (typeof roles === 'string') {
//       return roles.split(',').map(r => r.trim()).filter(Boolean);
//     }
//     return [];
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validation
//     if (!formData.title.trim()) {
//       alert('Title is required');
//       return;
//     }
//     if (!formData.label.trim()) {
//       alert('Label is required');
//       return;
//     }
//     if (formData.roles.length === 0) {
//       alert('Please select at least one role');
//       return;
//     }
    
//     try {
//       const submitData = {
//         ...formData,
//         roles: formData.roles, // Send as array
//         submenu: formData.submenu,
//         parent_id: formData.parent_id || null,
//         path: formData.path || null,
//         icon: formData.icon || null,
//         submenu_hdr: formData.submenu_hdr || null
//       };

//       console.log('Submitting data:', submitData);

//       if (editingItem) {
//         await AuthService.updateMenuItem(editingItem.id, submitData);
//         alert('Menu item updated successfully!');
//       } else {
//         await AuthService.createMenuItem(submitData);
//         alert('Menu item created successfully!');
//       }
      
//       setShowModal(false);
//       resetForm();
//       await fetchMenuItems(); // Refresh the list
//     } catch (error) {
//       console.error('Error saving menu item:', error);
//       alert('Failed to save menu item: ' + (error.response?.data?.error || error.response?.data?.message || error.message));
//     }
//   };

//   const handleEdit = (item) => {
//     console.log('Editing item:', item);
//     setEditingItem(item);
//     setFormData({
//       title: item.title,
//       label: item.label,
//       path: item.path || '',
//       icon: item.icon || '',
//       roles: normalizeRoles(item.roles),
//       parent_id: item.parent_id,
//       status: item.status,
//       order_by: item.order_by,
//       submenu: Boolean(item.submenu),
//       submenu_hdr: item.submenu_hdr || ''
//     });
//     setShowModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure? All child items will also be deleted.')) {
//       try {
//         await AuthService.deleteMenuItem(id);
//         await fetchMenuItems();
//         alert('Menu item deleted successfully!');
//       } catch (error) {
//         console.error('Error deleting menu item:', error);
//         alert('Failed to delete menu item: ' + (error.response?.data?.message || error.message));
//       }
//     }
//   };

//   const toggleStatus = async (id, currentStatus) => {
//     try {
//       const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
//       await AuthService.updateMenuStatus(id, newStatus);
//       await fetchMenuItems();
//     } catch (error) {
//       console.error('Error toggling status:', error);
//       alert('Failed to update status: ' + (error.response?.data?.message || error.message));
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       title: '',
//       label: '',
//       path: '',
//       icon: '',
//       roles: [],
//       parent_id: null,
//       status: 'active',
//       order_by: 0,
//       submenu: false,
//       submenu_hdr: ''
//     });
//     setEditingItem(null);
//   };

//   const handleRoleToggle = (role) => {
//     setFormData(prev => ({
//       ...prev,
//       roles: prev.roles.includes(role)
//         ? prev.roles.filter(r => r !== role)
//         : [...prev.roles, role]
//     }));
//   };

//   const toggleExpand = (id) => {
//     setExpandedItems(prevState => ({
//       ...prevState,
//       [id]: !prevState[id],  
//     }));
//   };

//   // Organize menu hierarchically
//   const organizeMenuHierarchy = (items) => {
//     const itemMap = new Map();
//     const roots = [];

//     items.forEach(item => {
//       itemMap.set(item.id, { ...item, children: item.submenuItems || [] });
//     });

//     items.forEach(item => {
//       if (item.parent_id === null) {
//         roots.push(itemMap.get(item.id)); 
//       } else {
//         const parent = itemMap.get(item.parent_id);
//         if (parent) {
//           parent.children.push(itemMap.get(item.id)); 
//         }
//       }
//     });

//     return roots;
//   };

//   const renderMenuTree = (items, level = 0) => {
//     return items.map(item => (
//       <React.Fragment key={item.id}>
//         <tr style={{ backgroundColor: level === 0 ? '#f8f9fa' : 'white' }}>
//           <td style={{ paddingLeft: `${level * 30 + 10}px` }}>
//             <div className="d-flex align-items-center gap-2">
//               {item.submenuItems?.length > 0 && (
//                 <button
//                   className="btn btn-sm p-0"
//                   onClick={() => toggleExpand(item.id)}
//                   style={{ border: 'none', background: 'none' }}
//                 >
//                   {expandedItems[item.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
//                 </button>
//               )}
//               <GripVertical size={16} className="text-muted" />
//               <span style={{ fontWeight: level === 0 ? 'bold' : 'normal' }}>
//                 {item.label}
//               </span>
//             </div>
//           </td>
//           <td>{item.title}</td>
//           <td><code>{item.path || '-'}</code></td>
//           <td>
//             {item.icon && <span className="badge bg-light text-dark">{item.icon}</span>}
//           </td>
//           <td>
//             <div className="d-flex gap-1 flex-wrap">
//               {normalizeRoles(item.roles).map((role, idx) => (
//                 <span key={idx} className="badge bg-primary">{role}</span>
//               ))}
//             </div>
//           </td>
//           <td>{item.submenu_hdr || '-'}</td>
//           <td>
//             <span className={`badge ${item.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
//               {item.status}
//             </span>
//           </td>
//           <td>
//             <div className="d-flex gap-2">
//               <button
//                 className="btn btn-sm btn-outline-primary"
//                 onClick={() => handleEdit(item)}
//                 title="Edit"
//               >
//                 <Edit2 size={14} />
//               </button>
//               <button
//                 className="btn btn-sm btn-outline-warning"
//                 onClick={() => toggleStatus(item.id, item.status)}
//                 title={item.status === 'active' ? 'Deactivate' : 'Activate'}
//               >
//                 {item.status === 'active' ? <EyeOff size={14} /> : <Eye size={14} />}
//               </button>
//               <button
//                 className="btn btn-sm btn-outline-danger"
//                 onClick={() => handleDelete(item.id)}
//                 title="Delete"
//               >
//                 <Trash2 size={14} />
//               </button>
//             </div>
//           </td>
//         </tr>
//         {expandedItems[item.id] && item.submenuItems?.length > 0 && renderMenuTree(item.submenuItems, level + 1)}
//       </React.Fragment>
//     ));
//   };

//   const hierarchicalMenu = organizeMenuHierarchy(menuItems);
//   const parentMenuItems = menuItems.filter(item => item.parent_id === null || !item.path);

//   return (
//     <div className="page-wrapper">
//       <div className="content">
//         {/* Page Header */}
//         <div className="page-header">
//           <div className="add-item d-flex">
//             <div className="page-title">
//               <h4>Menu Management</h4>
//               <h6>Manage sidebar menu items and hierarchy</h6>
//             </div>
//           </div>
//           <div className="page-btn">
//             <button
//               className="btn btn-added"
//               onClick={() => {
//                 resetForm();
//                 setShowModal(true);
//               }}
//             >
//               <Plus size={18} className="me-2" />
//               Add Menu Item
//             </button>
//           </div>
//         </div>

//         {/* Menu Table */}
//         <div className="card">
//           <div className="card-body">
//             {loading ? (
//               <div className="text-center py-5">
//                 <div className="spinner-border" role="status">
//                   <span className="visually-hidden">Loading...</span>
//                 </div>
//               </div>
//             ) : (
//               <div className="table-responsive">
//                 <table className="table table-hover">
//                   <thead>
//                     <tr>
//                       <th>Label</th>
//                       <th>Title</th>
//                       <th>Path</th>
//                       <th>Icon</th>
//                       <th>Roles</th>
//                       <th>Section</th>
//                       <th>Status</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {hierarchicalMenu.length > 0 ? (
//                       renderMenuTree(hierarchicalMenu)
//                     ) : (
//                       <tr>
//                         <td colSpan="8" className="text-center py-4">
//                           No menu items found. Create your first menu item!
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Modal */}
//         {showModal && (
//           <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//             <div className="modal-dialog modal-lg modal-dialog-scrollable">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">
//                     {editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
//                   </h5>
//                   <button
//                     type="button"
//                     className="btn-close"
//                     onClick={() => {
//                       setShowModal(false);
//                       resetForm();
//                     }}
//                   />
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                   <div className="modal-body">
//                     <div className="row">
//                       {/* Title */}
//                       <div className="col-md-6 mb-3">
//                         <label className="form-label">
//                           Title <span className="text-danger">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           value={formData.title}
//                           onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                           required
//                         />
//                         <small className="text-muted">Internal identifier</small>
//                       </div>

//                       {/* Label */}
//                       <div className="col-md-6 mb-3">
//                         <label className="form-label">
//                           Label <span className="text-danger">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           value={formData.label}
//                           onChange={(e) => setFormData({ ...formData, label: e.target.value })}
//                           required
//                         />
//                         <small className="text-muted">Display name</small>
//                       </div>

//                       {/* Path */}
//                       <div className="col-md-6 mb-3">
//                         <label className="form-label">Path</label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           value={formData.path}
//                           onChange={(e) => setFormData({ ...formData, path: e.target.value })}
//                           placeholder="/example-path"
//                         />
//                       </div>

//                       {/* Icon */}
//                       <div className="col-md-6 mb-3">
//                         <label className="form-label">Icon</label>
//                         <select
//                           className="form-control"
//                           value={formData.icon}
//                           onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
//                         >
//                           <option value="">No Icon</option>
//                           {availableIcons.map((icon) => (
//                             <option key={icon} value={icon}>{icon}</option>
//                           ))}
//                         </select>
//                       </div>

//                       {/* Parent */}
//                       <div className="col-md-6 mb-3">
//                         <label className="form-label">Parent</label>
//                         <select
//                           className="form-control"
//                           value={formData.parent_id || ''}
//                           onChange={(e) => setFormData({
//                             ...formData,
//                             parent_id: e.target.value ? parseInt(e.target.value) : null,
//                           })}
//                         >
//                           <option value="">Top Level</option>
//                           {parentMenuItems
//                             .filter(item => !editingItem || item.id !== editingItem.id)
//                             .map((item) => (
//                               <option key={item.id} value={item.id}>{item.label}</option>
//                             ))}
//                         </select>
//                       </div>

//                       {/* Section Header */}
//                       <div className="col-md-6 mb-3">
//                         <label className="form-label">Section Header</label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           value={formData.submenu_hdr}
//                           onChange={(e) => setFormData({ ...formData, submenu_hdr: e.target.value })}
//                           placeholder="Optional section header"
//                         />
//                       </div>

//                       {/* Roles */}
//                       <div className="col-md-12 mb-3">
//                         <label className="form-label">
//                           Roles <span className="text-danger">*</span>
//                         </label>
//                         {rolesLoading ? (
//                           <div className="text-muted">Loading roles...</div>
//                         ) : availableRoles.length > 0 ? (
//                           <div className="d-flex gap-3 flex-wrap mt-2">
//                             {availableRoles.map((role) => (
//                               <div key={role} className="form-check">
//                                 <input
//                                   type="checkbox"
//                                   className="form-check-input"
//                                   id={`role-${role}`}
//                                   checked={formData.roles.includes(role)}
//                                   onChange={() => handleRoleToggle(role)}
//                                 />
//                                 <label className="form-check-label" htmlFor={`role-${role}`}>
//                                   {role}
//                                 </label>
//                               </div>
//                             ))}
//                           </div>
//                         ) : (
//                           <div className="alert alert-warning mt-2">
//                             No roles available. Please ensure roles are configured in your system.
//                           </div>
//                         )}
//                         {formData.roles.length === 0 && (
//                           <small className="text-danger d-block mt-1">Please select at least one role</small>
//                         )}
//                       </div>

//                       {/* Status, Order, Submenu */}
//                       <div className="col-md-4 mb-3">
//                         <label className="form-label">Status</label>
//                         <select
//                           className="form-control"
//                           value={formData.status}
//                           onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//                         >
//                           <option value="active">Active</option>
//                           <option value="inactive">Inactive</option>
//                         </select>
//                       </div>

//                       <div className="col-md-4 mb-3">
//                         <label className="form-label">Order</label>
//                         <input
//                           type="number"
//                           className="form-control"
//                           value={formData.order_by}
//                           onChange={(e) => setFormData({ ...formData, order_by: parseInt(e.target.value) || 0 })}
//                         />
//                       </div>

//                       <div className="col-md-4 mb-3">
//                         <label className="form-label d-block">Has Submenu</label>
//                         <div className="form-check form-switch mt-2">
//                           <input
//                             className="form-check-input"
//                             type="checkbox"
//                             checked={formData.submenu}
//                             onChange={(e) => setFormData({ ...formData, submenu: e.target.checked })}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="modal-footer">
//                     <button
//                       type="button"
//                       className="btn btn-secondary"
//                       onClick={() => {
//                         setShowModal(false);
//                         resetForm();
//                       }}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       className="btn btn-primary"
//                       disabled={loading}
//                     >
//                       {loading ? (
//                         <>
//                           <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                           Saving...
//                         </>
//                       ) : (
//                         editingItem ? 'Update' : 'Create'
//                       )}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MenuManagement;




// src/feature-module/settings/menu/MenuManagement.jsx
import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, GripVertical, ChevronDown, ChevronRight } from 'lucide-react';
import AuthService from '../../services/authService';

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [availableRoles, setAvailableRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rolesLoading, setRolesLoading] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  
  const [formData, setFormData] = useState({
    title: '',
    label: '',
    path: '',
    icon: '',
    roles: [],
    parent_id: null,
    status: 'active',
    order_by: 0,
    submenu: false,
    submenu_hdr: ''
  });

  const availableIcons = [
    'Grid', 'Box', 'Package', 'ShoppingCart', 'ShoppingBag', 'Users', 'User', 
    'FileText', 'File', 'Smartphone', 'Calendar', 'Clock', 'Settings', 
    'BarChart2', 'PieChart', 'TrendingDown', 'DollarSign', 'CreditCard',
    'Layers', 'Tag', 'Bookmark', 'Home', 'Archive', 'Truck', 'Save',
    'RefreshCw', 'Copy', 'HardDrive', 'Shield', 'Lock', 'LogOut',
    'Codepen', 'Speaker', 'Maximize', 'AlignJustify', 'Clipboard',
    'FileMinus', 'Inbox', 'Database', 'UserCheck', 'BarChart', 'Shuffle',
    'Monitor', 'Hexagon', 'Edit', 'Columns', 'Map', 'Send', 'AlertTriangle'
  ];

  useEffect(() => {
    fetchMenuItems();
    fetchAvailableRoles();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await AuthService.getAllMenuItems();
      console.log('Menu items fetched:', response.data);
      
      // Normalize roles data - ensure roles is always an array
      const normalizedData = (response.data || []).map(item => ({
        ...item,
        roles: normalizeRoles(item.roles)
      }));
      
      setMenuItems(normalizedData);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      alert('Failed to fetch menu items: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableRoles = async () => {
    try {
      setRolesLoading(true);
      const response = await AuthService.getRoles();
      console.log('Roles API response:', response);
      
      // Handle different response formats
      let rolesArray = [];
      let rawData = response.data || response;
      
      if (Array.isArray(rawData)) {
        // If response is array of objects or strings
        rolesArray = rawData.map(role => {
          if (typeof role === 'string') {
            return role;
          } else if (typeof role === 'object' && role !== null) {
            // Try different possible property names
            return role.name || role.role_name || role.roleName || role.title || role.role || null;
          }
          return null;
        });
      } else if (rawData?.roles && Array.isArray(rawData.roles)) {
        // If response has roles property
        rolesArray = rawData.roles.map(role => {
          if (typeof role === 'string') {
            return role;
          } else if (typeof role === 'object' && role !== null) {
            return role.name || role.role_name || role.roleName || role.title || role.role || null;
          }
          return null;
        });
      }
      
      // Filter out any undefined/null values and ensure uniqueness
      rolesArray = [...new Set(rolesArray.filter(Boolean))];
      
      console.log('Processed roles for menu:', rolesArray);
      
      if (rolesArray.length === 0) {
        console.warn('No roles found, using fallback roles');
        setAvailableRoles(['super admin', 'admin', 'user']);
      } else {
        setAvailableRoles(rolesArray);
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
      alert('Failed to fetch roles: ' + (error.response?.data?.message || error.message));
      // Fallback to default roles if API fails
      setAvailableRoles(['super admin', 'admin', 'user']);
    } finally {
      setRolesLoading(false);
    }
  };

  // Normalize roles - convert string to array or ensure it's an array
  const normalizeRoles = (roles) => {
    if (!roles) return [];
    if (Array.isArray(roles)) return roles;
    if (typeof roles === 'string') {
      return roles.split(',').map(r => r.trim()).filter(Boolean);
    }
    return [];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      alert('Title is required');
      return;
    }
    if (!formData.label.trim()) {
      alert('Label is required');
      return;
    }
    if (formData.roles.length === 0) {
      alert('Please select at least one role');
      return;
    }
    
    try {
      const submitData = {
        ...formData,
        roles: formData.roles, // Send as array
        submenu: formData.submenu,
        parent_id: formData.parent_id || null,
        path: formData.path || null,
        icon: formData.icon || null,
        submenu_hdr: formData.submenu_hdr || null
      };

      console.log('Submitting data:', submitData);

      if (editingItem) {
        await AuthService.updateMenuItem(editingItem.id, submitData);
        alert('Menu item updated successfully!');
      } else {
        await AuthService.createMenuItem(submitData);
        alert('Menu item created successfully!');
      }
      
      setShowModal(false);
      resetForm();
      await fetchMenuItems(); // Refresh the list
    } catch (error) {
      console.error('Error saving menu item:', error);
      alert('Failed to save menu item: ' + (error.response?.data?.error || error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (item) => {
    console.log('Editing item:', item);
    setEditingItem(item);
    setFormData({
      title: item.title,
      label: item.label,
      path: item.path || '',
      icon: item.icon || '',
      roles: normalizeRoles(item.roles),
      parent_id: item.parent_id,
      status: item.status,
      order_by: item.order_by,
      submenu: Boolean(item.submenu),
      submenu_hdr: item.submenu_hdr || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure? All child items will also be deleted.')) {
      try {
        await AuthService.deleteMenuItem(id);
        await fetchMenuItems();
        alert('Menu item deleted successfully!');
      } catch (error) {
        console.error('Error deleting menu item:', error);
        alert('Failed to delete menu item: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      await AuthService.updateMenuStatus(id, newStatus);
      await fetchMenuItems();
    } catch (error) {
      console.error('Error toggling status:', error);
      alert('Failed to update status: ' + (error.response?.data?.message || error.message));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      label: '',
      path: '',
      icon: '',
      roles: [],
      parent_id: null,
      status: 'active',
      order_by: 0,
      submenu: false,
      submenu_hdr: ''
    });
    setEditingItem(null);
  };

  const handleRoleToggle = (role) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role]
    }));
  };

  const toggleExpand = (id) => {
    setExpandedItems(prevState => ({
      ...prevState,
      [id]: !prevState[id],  
    }));
  };

  // Organize menu hierarchically
  const organizeMenuHierarchy = (items) => {
    const itemMap = new Map();
    const roots = [];

    items.forEach(item => {
      itemMap.set(item.id, { ...item, children: item.submenuItems || [] });
    });

    items.forEach(item => {
      if (item.parent_id === null) {
        roots.push(itemMap.get(item.id)); 
      } else {
        const parent = itemMap.get(item.parent_id);
        if (parent) {
          parent.children.push(itemMap.get(item.id)); 
        }
      }
    });

    return roots;
  };

  const renderMenuTree = (items, level = 0) => {
    return items.map(item => (
      <React.Fragment key={item.id}>
        <tr style={{ backgroundColor: level === 0 ? '#f8f9fa' : 'white' }}>
          <td style={{ paddingLeft: `${level * 30 + 10}px` }}>
            <div className="d-flex align-items-center gap-2">
              {item.submenuItems?.length > 0 && (
                <button
                  className="btn btn-sm p-0"
                  onClick={() => toggleExpand(item.id)}
                  style={{ border: 'none', background: 'none' }}
                >
                  {expandedItems[item.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
              )}
              <GripVertical size={16} className="text-muted" />
              <span style={{ fontWeight: level === 0 ? 'bold' : 'normal' }}>
                {item.label}
              </span>
            </div>
          </td>
          <td>{item.title}</td>
          <td><code>{item.path || '-'}</code></td>
          <td>
            {item.icon && <span className="badge bg-light text-dark">{item.icon}</span>}
          </td>
          {/* <td>
            <div className="d-flex gap-1 flex-wrap">
              {normalizeRoles(item.roles).map((role, idx) => (
                <span key={idx} className="badge bg-primary">{role}</span>
              ))}
            </div>
          </td> */}
          <td>{item.submenu_hdr || '-'}</td>
          <td>
            <span className={`badge ${item.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
              {item.status}
            </span>
          </td>
          <td>
            <div className="d-flex gap-2">
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => handleEdit(item)}
                title="Edit"
              >
                <Edit2 size={14} />
              </button>
              <button
                className="btn btn-sm btn-outline-warning"
                onClick={() => toggleStatus(item.id, item.status)}
                title={item.status === 'active' ? 'Deactivate' : 'Activate'}
              >
                {item.status === 'active' ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDelete(item.id)}
                title="Delete"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </td>
        </tr>
        {expandedItems[item.id] && item.submenuItems?.length > 0 && renderMenuTree(item.submenuItems, level + 1)}
      </React.Fragment>
    ));
  };

  const hierarchicalMenu = organizeMenuHierarchy(menuItems);
  const parentMenuItems = menuItems.filter(item => item.parent_id === null || !item.path);

  return (
    <div className="page-wrapper">
      <div className="content">
        {/* Page Header */}
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Menu Management</h4>
              <h6>Manage sidebar menu items and hierarchy</h6>
            </div>
          </div>
          <div className="page-btn">
            <button
              className="btn btn-added"
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
            >
              <Plus size={18} className="me-2" />
              Add Menu Item
            </button>
          </div>
        </div>

        {/* Menu Table */}
        <div className="card">
          <div className="card-body">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Label</th>
                      <th>Title</th>
                      <th>Path</th>
                      <th>Icon</th>
                      {/* <th>Roles</th> */}
                      <th>Section</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hierarchicalMenu.length > 0 ? (
                      renderMenuTree(hierarchicalMenu)
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center py-4">
                          No menu items found. Create your first menu item!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                  />
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="row">
                      {/* Title */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          Title <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          required
                        />
                        <small className="text-muted">Internal identifier</small>
                      </div>

                      {/* Label */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          Label <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.label}
                          onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                          required
                        />
                        <small className="text-muted">Display name</small>
                      </div>

                      {/* Path */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Path</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.path}
                          onChange={(e) => setFormData({ ...formData, path: e.target.value })}
                          placeholder="/example-path"
                        />
                      </div>

                      {/* Icon */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Icon</label>
                        <select
                          className="form-control"
                          value={formData.icon}
                          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        >
                          <option value="">No Icon</option>
                          {availableIcons.map((icon) => (
                            <option key={icon} value={icon}>{icon}</option>
                          ))}
                        </select>
                      </div>

                      {/* Parent */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Parent</label>
                        <select
                          className="form-control"
                          value={formData.parent_id || ''}
                          onChange={(e) => setFormData({
                            ...formData,
                            parent_id: e.target.value ? parseInt(e.target.value) : null,
                          })}
                        >
                          <option value="">Top Level</option>
                          {parentMenuItems
                            .filter(item => !editingItem || item.id !== editingItem.id)
                            .map((item) => (
                              <option key={item.id} value={item.id}>{item.label}</option>
                            ))}
                        </select>
                      </div>

                      {/* Section Header */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Section Header</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.submenu_hdr}
                          onChange={(e) => setFormData({ ...formData, submenu_hdr: e.target.value })}
                          placeholder="Optional section header"
                        />
                      </div>

                      {/* Roles */}
                      <div className="col-md-12 mb-3">
                        <label className="form-label">
                          Roles <span className="text-danger">*</span>
                        </label>
                        {rolesLoading ? (
                          <div className="text-muted">Loading roles...</div>
                        ) : availableRoles.length > 0 ? (
                          <div className="d-flex gap-3 flex-wrap mt-2">
                            {availableRoles.map((role) => (
                              <div key={role} className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={`role-${role}`}
                                  checked={formData.roles.includes(role)}
                                  onChange={() => handleRoleToggle(role)}
                                />
                                <label className="form-check-label" htmlFor={`role-${role}`}>
                                  {role}
                                </label>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="alert alert-warning mt-2">
                            No roles available. Please ensure roles are configured in your system.
                          </div>
                        )}
                        {formData.roles.length === 0 && (
                          <small className="text-danger d-block mt-1">Please select at least one role</small>
                        )}
                      </div>

                      {/* Status, Order, Submenu */}
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Status</label>
                        <select
                          className="form-control"
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>

                      <div className="col-md-4 mb-3">
                        <label className="form-label">Order</label>
                        <input
                          type="number"
                          className="form-control"
                          value={formData.order_by}
                          onChange={(e) => setFormData({ ...formData, order_by: parseInt(e.target.value) || 0 })}
                        />
                      </div>

                      <div className="col-md-4 mb-3">
                        <label className="form-label d-block">Has Submenu</label>
                        <div className="form-check form-switch mt-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={formData.submenu}
                            onChange={(e) => setFormData({ ...formData, submenu: e.target.checked })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Saving...
                        </>
                      ) : (
                        editingItem ? 'Update' : 'Create'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuManagement;