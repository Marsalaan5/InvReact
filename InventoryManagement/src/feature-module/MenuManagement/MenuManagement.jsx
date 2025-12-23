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
    console.log('=== FETCH MENU ITEMS ===');
    console.log('Raw API response:', response);
    console.log('Response data:', response.data);
    
    let rawData = response.data || response;
    
    // Flatten the menu if it comes back hierarchical
    const flattenMenu = (items, result = []) => {
      items.forEach(item => {
        // Add the item itself (without nested children for now)
        const flatItem = { ...item };
        
        // Store children separately if they exist
        const children = flatItem.submenuItems || flatItem.children || [];
        
        // Remove nested structures from the item
        delete flatItem.submenuItems;
        delete flatItem.children;
        
        result.push(flatItem);
        
        // Recursively flatten children
        if (children.length > 0) {
          flattenMenu(children, result);
        }
      });
      return result;
    };
    
    // Check if data is already flat or hierarchical
    let flatData = [];
    if (Array.isArray(rawData)) {
      // Check if any item has submenuItems (hierarchical)
      const hasNesting = rawData.some(item => 
        (item.submenuItems && item.submenuItems.length > 0) || 
        (item.children && item.children.length > 0)
      );
      
      if (hasNesting) {
        console.log('Menu data is hierarchical, flattening...');
        flatData = flattenMenu(rawData);
      } else {
        console.log('Menu data is already flat');
        flatData = rawData;
      }
    }
    
    console.log('Flat menu items:', flatData.length);
    console.log('Items:', flatData.map(i => ({
      id: i.id,
      label: i.label,
      parent_id: i.parent_id
    })));
    
    // Normalize roles data
    const normalizedData = flatData.map(item => ({
      ...item,
      roles: normalizeRoles(item.roles)
    }));
    
    console.log('Setting', normalizedData.length, 'menu items');
    console.log('==================');
    
    setMenuItems(normalizedData);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    console.error('Error response:', error.response?.data);
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
  console.log('=== ORGANIZING MENU ===');
  console.log('Total items received:', items.length);
  console.log('Items:', items.map(i => ({ id: i.id, label: i.label, parent_id: i.parent_id })));
  
  // Create a map of all items by their ID
  const itemMap = new Map();
  
  // First pass: Add all items to the map
  items.forEach(item => {
    itemMap.set(item.id, {
      ...item,
      children: [] // Initialize empty children array
    });
  });
  
  console.log('Item map created with', itemMap.size, 'items');
  
  // Second pass: Build the hierarchy
  const roots = [];
  
  items.forEach(item => {
    const currentItem = itemMap.get(item.id);
    
    if (item.parent_id === null || item.parent_id === 0) {
      // This is a root item
      roots.push(currentItem);
      console.log('Root item:', item.label);
    } else {
      // This is a child item, add it to parent's children
      const parent = itemMap.get(item.parent_id);
      if (parent) {
        parent.children.push(currentItem);
        parent.submenu = true; // Mark parent as having submenu
        console.log('Child item:', item.label, '-> Parent:', parent.label);
      } else {
        console.warn('Orphan item (no parent found):', item.label, 'parent_id:', item.parent_id);
        // Treat orphans as root items
        roots.push(currentItem);
      }
    }
  });
  
  console.log('Organized into', roots.length, 'root items');
  console.log('==================');
  
  return roots;
};

// Fixed renderMenuTree function
const renderMenuTree = (items, level = 0) => {
  if (!items || items.length === 0) return null;
  
  return items.map(item => {
    const hasChildren = item.children && item.children.length > 0;
    
    return (
      <React.Fragment key={item.id}>
        <tr style={{ 
          backgroundColor: level === 0 ? '#f8f9fa' : 'white',
          borderLeft: level > 0 ? `3px solid #${level * 2}98a0` : 'none'
        }}>
          <td style={{ paddingLeft: `${level * 30 + 10}px` }}>
            <div className="d-flex align-items-center gap-2">
              {hasChildren && (
                <button
                  className="btn btn-sm p-0"
                  onClick={() => toggleExpand(item.id)}
                  style={{ border: 'none', background: 'none' }}
                >
                  {expandedItems[item.id] ? 
                    <ChevronDown size={16} /> : 
                    <ChevronRight size={16} />
                  }
                </button>
              )}
              {!hasChildren && <span style={{ width: '16px', display: 'inline-block' }}></span>}
              <GripVertical size={16} className="text-muted" />
              <span style={{ fontWeight: level === 0 ? 'bold' : 'normal' }}>
                {item.label}
              </span>
              {hasChildren && (
                <span className="badge bg-secondary ms-2" style={{ fontSize: '0.7rem' }}>
                  {item.children.length} item{item.children.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          </td>
          <td>{item.title}</td>
          <td><code>{item.path || '-'}</code></td>
          <td>
            {item.icon && <span className="badge bg-light text-dark">{item.icon}</span>}
          </td>
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
        {/* Render children if expanded */}
        {expandedItems[item.id] && hasChildren && renderMenuTree(item.children, level + 1)}
      </React.Fragment>
    );
  });
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