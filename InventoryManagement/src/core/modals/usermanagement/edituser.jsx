// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import Select from 'react-select'
// import ImageWithBasePath from '../../img/imagewithbasebath';

// const EditUser = () => {
//     const status = [
//         { value: 'Choose', label: 'Choose' },
//         { value: 'Manager', label: 'Manager' },
//         { value: 'Admin', label: 'Admin' },
//     ];
//     const [showPassword, setShowPassword] = useState(false);

//     const handleTogglePassword = () => {
//       setShowPassword((prevShowPassword) => !prevShowPassword);
//     };
//     const [showConfirmPassword, setConfirmPassword] = useState(false);

//     const handleToggleConfirmPassword = () => {
//         setConfirmPassword((prevShowPassword) => !prevShowPassword);
//     };
//     return (
//         <div>
//             {/* Edit User */}
//             <div className="modal fade" id="edit-units">
//                 <div className="modal-dialog modal-dialog-centered custom-modal-two">
//                     <div className="modal-content">
//                         <div className="page-wrapper-new p-0">
//                             <div className="content">
//                                 <div className="modal-header border-0 custom-modal-header">
//                                     <div className="page-title">
//                                         <h4>Edit User</h4>
//                                     </div>
//                                     <button
//                                         type="button"
//                                         className="close"
//                                         data-bs-dismiss="modal"
//                                         aria-label="Close"
//                                     >
//                                         <span aria-hidden="true">×</span>
//                                     </button>
//                                 </div>
//                                 <div className="modal-body custom-modal-body">
//                                     <form>
//                                         <div className="row">
//                                             <div className="col-lg-12">
//                                                 <div className="new-employee-field">
//                                                     <span>Avatar</span>
//                                                     <div className="profile-pic-upload edit-pic">
//                                                         <div className="profile-pic">
//                                                             <span>
//                                                                 <ImageWithBasePath
//                                                                     src="assets/img/users/edit-user.jpg"
//                                                                     className="user-editer"
//                                                                     alt="User"
//                                                                 />
//                                                             </span>
//                                                             <div className="close-img">
//                                                                 <i data-feather="x" className="info-img" />
//                                                             </div>
//                                                         </div>
//                                                         <div className="input-blocks mb-0">
//                                                             <div className="image-upload mb-0">
//                                                                 <input type="file" />
//                                                                 <div className="image-uploads">
//                                                                     <h4>Change Image</h4>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="col-lg-6">
//                                                 <div className="input-blocks">
//                                                     <label>User Name</label>
//                                                     <input type="text" placeholder="Thomas" />
//                                                 </div>
//                                             </div>
//                                             <div className="col-lg-6">
//                                                 <div className="input-blocks">
//                                                     <label>Phone</label>
//                                                     <input type="text" placeholder={+12163547758} />
//                                                 </div>
//                                             </div>
//                                             <div className="col-lg-6">
//                                                 <div className="input-blocks">
//                                                     <label>Email</label>
//                                                     <input type="email" placeholder="thomas@example.com" />
//                                                 </div>
//                                             </div>
//                                             <div className="col-lg-6">
//                                                 <div className="input-blocks">
//                                                     <label>Role</label>
//                                                     <Select
//                                                     className="select"
//                                                     options={status}
//                                                     placeholder="Choose Status"
//                                                 />
//                                                 </div>
//                                             </div>
//                                             <div className="col-lg-6">
//                                                 <div className="input-blocks">
//                                                     <label>Password</label>
//                                                     <div className="pass-group">
//                                                         <input
//                                                             type={showPassword ? 'text' : 'password'}
//                                                             className="pass-input"
//                                                             placeholder="**********"
//                                                         />
//                                                         <span
//                                                             className={`fas toggle-password ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
//                                                             onClick={handleTogglePassword}
//                                                         />
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="col-lg-6">
//                                                 <div className="input-blocks">
//                                                     <label>Confirm Passworrd</label>
//                                                     <div className="pass-group">
//                                                     <input
//                                                         type={showConfirmPassword ? 'text' : 'password'}
//                                                         className="pass-input"
//                                                         placeholder="*********"
//                                                     />
//                                                     <span
//                                                         className={`fas toggle-password ${showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'}`}
//                                                         onClick={handleToggleConfirmPassword}
//                                                     />
//                                                 </div>
//                                                 </div>
//                                             </div>
//                                             <div className="col-lg-12">
//                                                 <div className="mb-0 input-blocks">
//                                                     <label className="form-label">Descriptions</label>
//                                                     <textarea
//                                                         className="form-control mb-1"
//                                                         defaultValue={""}
//                                                     />
//                                                     <p>Maximum 600 Characters</p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="modal-footer-btn">
//                                             <button
//                                                 type="button"
//                                                 className="btn btn-cancel me-2"
//                                                 data-bs-dismiss="modal"
//                                             >
//                                                 Cancel
//                                             </button>
//                                             <Link to="#" className="btn btn-submit">
//                                                 Submit
//                                             </Link>
//                                         </div>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {/* /Edit User */}
//         </div>
//     )
// }

// export default EditUser






// import PropTypes from 'prop-types';
// import { PlusCircle } from 'feather-icons-react/build/IconComponents'
// import React, { useState, useEffect } from 'react'
// import Select from 'react-select'
// import axiosInstance from '../../../services/axiosInstance'
// import Swal from 'sweetalert2'

// const EditUser = ({ user, onSuccess, roles }) => {
//     // Form state
//     const [formData, setFormData] = useState({
//         name: '',
//         username: '',
//         email: '',
//         phone: '',
//         role_id: '',
//         status: 'Active',
//         description: ''
//     });

//     // UI state
//     const [avatarFile, setAvatarFile] = useState(null);
//     const [avatarPreview, setAvatarPreview] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [errors, setErrors] = useState({});

//     // Role options for dropdown
//     const roleOptions = [
//         { value: '', label: 'Choose Role' },
//         ...roles.map(role => ({
//             value: role.id,
//             label: role.name
//         }))
//     ];

//     // Status options
//     const statusOptions = [
//         { value: 'Active', label: 'Active' },
//         { value: 'Inactive', label: 'Inactive' }
//     ];

//     // Populate form when user prop changes
//     useEffect(() => {
//         if (user) {
//             setFormData({
//                 name: user.name || '',
//                 username: user.username || '',
//                 email: user.email || '',
//                 phone: user.phone || '',
//                 role_id: user.role_id || '',
//                 status: user.status || 'Active',
//                 description: user.description || ''
//             });

//             // Set avatar preview if exists
//             if (user.avatar) {
//                 const baseUrl = 'http://localhost:5000';
//                 setAvatarPreview(`${baseUrl}/${user.avatar}`);
//             } else {
//                 setAvatarPreview(null);
//             }
//         }
//     }, [user]);

//     // Handle input changes
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//         // Clear error for this field
//         if (errors[name]) {
//             setErrors(prev => ({
//                 ...prev,
//                 [name]: ''
//             }));
//         }
//     };

//     // Handle role selection
//     const handleRoleChange = (selectedOption) => {
//         setFormData(prev => ({
//             ...prev,
//             role_id: selectedOption.value
//         }));
//         if (errors.role_id) {
//             setErrors(prev => ({
//                 ...prev,
//                 role_id: ''
//             }));
//         }
//     };

//     // Handle status selection
//     const handleStatusChange = (selectedOption) => {
//         setFormData(prev => ({
//             ...prev,
//             status: selectedOption.value
//         }));
//     };

//     // Handle avatar file selection
//     const handleAvatarChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             // Validate file type
//             const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
//             if (!allowedTypes.includes(file.type)) {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Invalid File',
//                     text: 'Please select a valid image file (JPEG, PNG, GIF, WEBP)'
//                 });
//                 return;
//             }

//             // Validate file size (5MB)
//             if (file.size > 5 * 1024 * 1024) {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'File Too Large',
//                     text: 'Image size must be less than 5MB'
//                 });
//                 return;
//             }

//             setAvatarFile(file);
            
//             // Create preview
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setAvatarPreview(reader.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     // Validate form
//     const validateForm = () => {
//         const newErrors = {};

//         if (!formData.name.trim()) {
//             newErrors.name = 'Name is required';
//         }

//         if (!formData.email.trim()) {
//             newErrors.email = 'Email is required';
//         } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//             newErrors.email = 'Invalid email format';
//         }

//         if (formData.phone && !/^[0-9]{10,15}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
//             newErrors.phone = 'Invalid phone number';
//         }

//         if (!formData.role_id) {
//             newErrors.role_id = 'Role is required';
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!user || !user.id) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error',
//                 text: 'No user selected for editing'
//             });
//             return;
//         }

//         if (!validateForm()) {
//             return;
//         }

//         setLoading(true);

//         try {
//             // Create FormData for file upload
//             const submitData = new FormData();
//             submitData.append('name', formData.name);
//             submitData.append('email', formData.email);
//             submitData.append('phone', formData.phone || '');
//             submitData.append('username', formData.username || formData.email);
//             submitData.append('role_id', formData.role_id);
//             submitData.append('status', formData.status);
            
//             if (avatarFile) {
//                 submitData.append('avatar', avatarFile);
//             }

//             const response = await axiosInstance.put(`/users/${user.id}`, submitData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             // Success
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Success!',
//                 text: response.data.message || 'User updated successfully',
//                 confirmButtonColor: '#00ff00'
//             });

//             // Reset form
//             resetForm();

//             // Close modal
//             const modal = document.getElementById('edit-units');
//             const modalBackdrop = document.querySelector('.modal-backdrop');
//             if (modal) {
//                 modal.classList.remove('show');
//                 modal.style.display = 'none';
//                 document.body.classList.remove('modal-open');
//                 if (modalBackdrop) {
//                     modalBackdrop.remove();
//                 }
//             }

//             // Refresh user list
//             if (onSuccess) {
//                 onSuccess();
//             }
//         } catch (error) {
//             console.error('Error updating user:', error);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error',
//                 text: error.response?.data?.message || 'Failed to update user'
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Reset form
//     const resetForm = () => {
//         setFormData({
//             name: '',
//             username: '',
//             email: '',
//             phone: '',
//             role_id: '',
//             status: 'Active',
//             description: ''
//         });
//         setAvatarFile(null);
//         setAvatarPreview(null);
//         setErrors({});
//     };

//     // Handle modal close
//     const handleCancel = () => {
//         setErrors({});
//         setAvatarFile(null);
//         // Reset to original user data
//         if (user) {
//             setFormData({
//                 name: user.name || '',
//                 username: user.username || '',
//                 email: user.email || '',
//                 phone: user.phone || '',
//                 role_id: user.role_id || '',
//                 status: user.status || 'Active',
//                 description: user.description || ''
//             });
//         }
//     };

//     if (!user) {
//         return null;
//     }

//     return (
//         <div>
//             {/* Edit User */}
//             <div className="modal fade" id="edit-units">
//                 <div className="modal-dialog modal-dialog-centered custom-modal-two">
//                     <div className="modal-content">
//                         <div className="page-wrapper-new p-0">
//                             <div className="content">
//                                 <div className="modal-header border-0 custom-modal-header">
//                                     <div className="page-title">
//                                         <h4>Edit User</h4>
//                                     </div>
//                                     <button
//                                         type="button"
//                                         className="close"
//                                         data-bs-dismiss="modal"
//                                         aria-label="Close"
//                                         onClick={handleCancel}
//                                     >
//                                         <span aria-hidden="true">×</span>
//                                     </button>
//                                 </div>
//                                 <div className="modal-body custom-modal-body">
//                                     <form onSubmit={handleSubmit}>
//                                         <div className="row">
//                                             <div className="col-lg-12">
//                                                 <div className="new-employee-field">
//                                                     <span>Avatar</span>
//                                                     <div className="profile-pic-upload mb-2">
//                                                         <div className="profile-pic">
//                                                             {avatarPreview ? (
//                                                                 <img 
//                                                                     src={avatarPreview} 
//                                                                     alt="Avatar Preview"
//                                                                     style={{
//                                                                         width: '100%',
//                                                                         height: '100%',
//                                                                         objectFit: 'cover',
//                                                                         borderRadius: '50%'
//                                                                     }}
//                                                                 />
//                                                             ) : (
//                                                                 <span>
//                                                                     <PlusCircle className="plus-down-add" />
//                                                                     Profile Photo
//                                                                 </span>
//                                                             )}
//                                                         </div>
//                                                         <div className="input-blocks mb-0">
//                                                             <div className="image-upload mb-0">
//                                                                 <input 
//                                                                     type="file" 
//                                                                     accept="image/*"
//                                                                     onChange={handleAvatarChange}
//                                                                 />
//                                                                 <div className="image-uploads">
//                                                                     <h4>Change Image</h4>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
                                            
//                                             <div className="col-lg-6">
//                                                 <div className="input-blocks">
//                                                     <label>Name <span className="text-danger">*</span></label>
//                                                     <input 
//                                                         type="text" 
//                                                         className={`form-control ${errors.name ? 'is-invalid' : ''}`}
//                                                         name="name"
//                                                         value={formData.name}
//                                                         onChange={handleInputChange}
//                                                         placeholder="Enter name"
//                                                     />
//                                                     {errors.name && (
//                                                         <div className="invalid-feedback d-block">
//                                                             {errors.name}
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             </div>

//                                             <div className="col-lg-6">
//                                                 <div className="input-blocks">
//                                                     <label>Username</label>
//                                                     <input 
//                                                         type="text" 
//                                                         className="form-control"
//                                                         name="username"
//                                                         value={formData.username}
//                                                         onChange={handleInputChange}
//                                                         placeholder="Enter username"
//                                                     />
//                                                 </div>
//                                             </div>

//                                             <div className="col-lg-6">
//                                                 <div className="input-blocks">
//                                                     <label>Email <span className="text-danger">*</span></label>
//                                                     <input 
//                                                         type="email" 
//                                                         className={`form-control ${errors.email ? 'is-invalid' : ''}`}
//                                                         name="email"
//                                                         value={formData.email}
//                                                         onChange={handleInputChange}
//                                                         placeholder="Enter email"
//                                                     />
//                                                     {errors.email && (
//                                                         <div className="invalid-feedback d-block">
//                                                             {errors.email}
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             </div>

//                                             <div className="col-lg-6">
//                                                 <div className="input-blocks">
//                                                     <label>Phone</label>
//                                                     <input 
//                                                         type="text" 
//                                                         className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
//                                                         name="phone"
//                                                         value={formData.phone}
//                                                         onChange={handleInputChange}
//                                                         placeholder="Enter phone number"
//                                                     />
//                                                     {errors.phone && (
//                                                         <div className="invalid-feedback d-block">
//                                                             {errors.phone}
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             </div>

//                                             <div className="col-lg-6">
//                                                 <div className="input-blocks">
//                                                     <label>Role <span className="text-danger">*</span></label>
//                                                     <Select
//                                                         className={`select ${errors.role_id ? 'is-invalid' : ''}`}
//                                                         options={roleOptions}
//                                                         placeholder="Choose Role"
//                                                         value={roleOptions.find(opt => opt.value === formData.role_id)}
//                                                         onChange={handleRoleChange}
//                                                     />
//                                                     {errors.role_id && (
//                                                         <div className="invalid-feedback d-block">
//                                                             {errors.role_id}
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             </div>

//                                             <div className="col-lg-6">
//                                                 <div className="input-blocks">
//                                                     <label>Status</label>
//                                                     <Select
//                                                         className="select"
//                                                         options={statusOptions}
//                                                         placeholder="Choose Status"
//                                                         value={statusOptions.find(opt => opt.value === formData.status)}
//                                                         onChange={handleStatusChange}
//                                                     />
//                                                 </div>
//                                             </div>

//                                             <div className="col-lg-12">
//                                                 <div className="mb-0 input-blocks">
//                                                     <label className="form-label">Description</label>
//                                                     <textarea
//                                                         className="form-control mb-1"
//                                                         name="description"
//                                                         value={formData.description}
//                                                         onChange={handleInputChange}
//                                                         placeholder="Enter description"
//                                                         rows="3"
//                                                         maxLength="600"
//                                                     />
//                                                     <p>Maximum 600 Characters ({formData.description.length}/600)</p>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className="modal-footer-btn">
//                                             <button
//                                                 type="button"
//                                                 className="btn btn-cancel me-2"
//                                                 data-bs-dismiss="modal"
//                                                 onClick={handleCancel}
//                                                 disabled={loading}
//                                             >
//                                                 Cancel
//                                             </button>
//                                             <button 
//                                                 type="submit" 
//                                                 className="btn btn-submit"
//                                                 disabled={loading}
//                                             >
//                                                 {loading ? (
//                                                     <>
//                                                         <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                                                         Updating...
//                                                     </>
//                                                 ) : (
//                                                     'Update User'
//                                                 )}
//                                             </button>
//                                         </div>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {/* /Edit User */}
//         </div>
//     )
// }


// EditUser.propTypes = {
//     user: PropTypes.shape({
//         id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//         name: PropTypes.string,
//         username: PropTypes.string,
//         email: PropTypes.string,
//         phone: PropTypes.string,
//         role_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//         status: PropTypes.string,
//         description: PropTypes.string,
//         avatar: PropTypes.string
//     }),
//     onSuccess: PropTypes.func,
//     roles: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//             name: PropTypes.string.isRequired
//         })
//     ).isRequired
// };

// EditUser.defaultProps = {
//     user: null,
//     onSuccess: () => {}
// };

// export default EditUser



import PropTypes from 'prop-types';
import { PlusCircle } from 'feather-icons-react/build/IconComponents'
import React, { useState, useEffect, useRef } from 'react'
import Select from 'react-select'
import Swal from 'sweetalert2'
import AuthService from "../../../services/authService"

const EditUser = ({ user, onSuccess, roles }) => {
    const modalRef = useRef(null);
    
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
        role_id: '',
        status: 'Active',
        description: ''
    });

    // UI state
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Role options for dropdown
    const roleOptions = [
        { value: '', label: 'Choose Role' },
        ...(roles || []).map(role => ({
            value: role.id,
            label: role.name
        }))
    ];

    // Status options
    const statusOptions = [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' }
    ];

    // Populate form when user prop changes
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                username: user.username || '',
                email: user.email || '',
                phone: user.phone || '',
                role_id: user.role_id || '',
                status: user.status || 'Active',
                description: user.description || ''
            });

            // Set avatar preview if exists
            if (user.avatar) {
                const baseUrl ='http://localhost:5000';
                setAvatarPreview(`${baseUrl}/${user.avatar}`);
            } else if (user.img) {
                setAvatarPreview(user.img);
            } else {
                setAvatarPreview(null);
            }
            
            // Reset file input
            setAvatarFile(null);
            setErrors({});
        }
    }, [user]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Handle role selection
    const handleRoleChange = (selectedOption) => {
        setFormData(prev => ({
            ...prev,
            role_id: selectedOption ? selectedOption.value : ''
        }));
        if (errors.role_id) {
            setErrors(prev => ({
                ...prev,
                role_id: ''
            }));
        }
    };

    // Handle status selection
    const handleStatusChange = (selectedOption) => {
        setFormData(prev => ({
            ...prev,
            status: selectedOption ? selectedOption.value : 'Active'
        }));
    };

    // Handle avatar file selection
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid File',
                    text: 'Please select a valid image file (JPEG, PNG, GIF, WEBP)'
                });
                e.target.value = '';
                return;
            }

            // Validate file size (5MB)
            if (file.size > 5 * 1024 * 1024) {
                Swal.fire({
                    icon: 'error',
                    title: 'File Too Large',
                    text: 'Image size must be less than 5MB'
                });
                e.target.value = '';
                return;
            }

            setAvatarFile(file);
            
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (formData.phone && !/^[0-9]{10,15}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
            newErrors.phone = 'Invalid phone number';
        }

        if (!formData.role_id) {
            newErrors.role_id = 'Role is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Close modal programmatically
    const closeModal = () => {
        const modal = modalRef.current;
        if (modal) {
    
            const bsModal = window.bootstrap?.Modal?.getInstance(modal);
            if (bsModal) {
                bsModal.hide();
            } else {
        
                modal.classList.remove('show');
                modal.style.display = 'none';
                document.body.classList.remove('modal-open');
                
    
                const backdrop = document.querySelector('.modal-backdrop');
                if (backdrop) {
                    backdrop.remove();
                }
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !user.id) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No user selected for editing'
            });
            return;
        }

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Create FormData for file upload
            const submitData = new FormData();
            submitData.append('name', formData.name);
            submitData.append('email', formData.email);
            submitData.append('phone', formData.phone || '');
            submitData.append('username', formData.username || formData.email);
            submitData.append('role_id', formData.role_id);
            submitData.append('status', formData.status);
            
            if (avatarFile) {
                submitData.append('avatar', avatarFile);
            }

            const response = await AuthService.editUserById(user.id, submitData);

            // Success
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: response.data?.message || 'User updated successfully',
                confirmButtonColor: '#00ff00'
            });

            // Close modal
            closeModal();

            // Refresh user list
            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            console.error('Error updating user:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Failed to update user'
            });
        } finally {
            setLoading(false);
        }
    };

    // Handle modal close/cancel
    const handleCancel = () => {
        setErrors({});
        setAvatarFile(null);
        
        // Reset to original user data if available
        if (user) {
            setFormData({
                name: user.name || '',
                username: user.username || '',
                email: user.email || '',
                phone: user.phone || '',
                role_id: user.role_id || '',
                status: user.status || 'Active',
                description: user.description || ''
            });
            
            // Reset avatar preview
            if (user.avatar) {
                const baseUrl = 'http://localhost:5000';
                setAvatarPreview(`${baseUrl}/${user.avatar}`);
            } else if (user.img) {
                setAvatarPreview(user.img);
            } else {
                setAvatarPreview(null);
            }
        }
    };

    // Don't render if no user is selected
    if (!user) {
        return (
            <div className="modal fade" id="edit-units" ref={modalRef}>
                <div className="modal-dialog modal-dialog-centered custom-modal-two">
                    <div className="modal-content">
                        <div className="modal-body text-center p-4">
                            <p>No user selected</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Edit User */}
            <div className="modal fade" id="edit-units" ref={modalRef} tabIndex="-1" aria-labelledby="editUserLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered custom-modal-two">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content">
                                <div className="modal-header border-0 custom-modal-header">
                                    <div className="page-title">
                                        <h4 id="editUserLabel">Edit User</h4>
                                    </div>
                                    <button
                                        type="button"
                                        className="close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        onClick={handleCancel}
                                    >
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body custom-modal-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="new-employee-field">
                                                    <span>Avatar</span>
                                                    <div className="profile-pic-upload mb-2">
                                                        <div className="profile-pic">
                                                            {avatarPreview ? (
                                                                <img 
                                                                    src={avatarPreview} 
                                                                    alt="Avatar Preview"
                                                                    style={{
                                                                        width: '100%',
                                                                        height: '100%',
                                                                        objectFit: 'cover',
                                                                        borderRadius: '50%'
                                                                    }}
                                                                />
                                                            ) : (
                                                                <span>
                                                                    <PlusCircle className="plus-down-add" />
                                                                    Profile Photo
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="input-blocks mb-0">
                                                            <div className="image-upload mb-0">
                                                                <input 
                                                                    type="file" 
                                                                    accept="image/*"
                                                                    onChange={handleAvatarChange}
                                                                />
                                                                <div className="image-uploads">
                                                                    <h4>Change Image</h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="col-lg-6">
                                                <div className="input-blocks">
                                                    <label>Name <span className="text-danger">*</span></label>
                                                    <input 
                                                        type="text" 
                                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter name"
                                                    />
                                                    {errors.name && (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.name}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-lg-6">
                                                <div className="input-blocks">
                                                    <label>Username</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        name="username"
                                                        value={formData.username}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter username"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6">
                                                <div className="input-blocks">
                                                    <label>Email <span className="text-danger">*</span></label>
                                                    <input 
                                                        type="email" 
                                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter email"
                                                    />
                                                    {errors.email && (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.email}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-lg-6">
                                                <div className="input-blocks">
                                                    <label>Phone</label>
                                                    <input 
                                                        type="text" 
                                                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter phone number"
                                                    />
                                                    {errors.phone && (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.phone}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-lg-6">
                                                <div className="input-blocks">
                                                    <label>Role <span className="text-danger">*</span></label>
                                                    <Select
                                                        className={`select ${errors.role_id ? 'is-invalid' : ''}`}
                                                        options={roleOptions}
                                                        placeholder="Choose Role"
                                                        value={roleOptions.find(opt => opt.value === formData.role_id)}
                                                        onChange={handleRoleChange}
                                                    />
                                                    {errors.role_id && (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.role_id}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-lg-6">
                                                <div className="input-blocks">
                                                    <label>Status</label>
                                                    <Select
                                                        className="select"
                                                        options={statusOptions}
                                                        placeholder="Choose Status"
                                                        value={statusOptions.find(opt => opt.value === formData.status)}
                                                        onChange={handleStatusChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="mb-0 input-blocks">
                                                    <label className="form-label">Description</label>
                                                    <textarea
                                                        className="form-control mb-1"
                                                        name="description"
                                                        value={formData.description}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter description"
                                                        rows="3"
                                                        maxLength="600"
                                                    />
                                                    <p>Maximum 600 Characters ({formData.description.length}/600)</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="modal-footer-btn">
                                            <button
                                                type="button"
                                                className="btn btn-cancel me-2"
                                                data-bs-dismiss="modal"
                                                onClick={handleCancel}
                                                disabled={loading}
                                            >
                                                Cancel
                                            </button>
                                            <button 
                                                type="submit" 
                                                className="btn btn-submit"
                                                disabled={loading}
                                            >
                                                {loading ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                        Updating...
                                                    </>
                                                ) : (
                                                    'Update User'
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Edit User */}
        </div>
    )
}

EditUser.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string,
        phone: PropTypes.string,
        role_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        status: PropTypes.string,
        description: PropTypes.string,
        avatar: PropTypes.string,
        img:PropTypes.string,
    }),
    onSuccess: PropTypes.func,
    roles: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired
        })
    ).isRequired
};

EditUser.defaultProps = {
    user: null,
    onSuccess: () => {}
};

export default EditUser