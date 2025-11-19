// // Permission middleware that checks if a user has a specific permission for a module
// export function checkPermission(moduleName, action = "enable") {
//   return (req, res, next) => {
//     const user = req.user;

//     if (!user || !user.permissions) {
//       return res
//         .status(403)
//         .json({ message: "Forbidden: Permissions not found" });
//     }

//     const modulePermissions = user.permissions[moduleName];
//     if (!modulePermissions || !modulePermissions[action]) {
//       return res
//         .status(403)
//         .json({ message: "Forbidden: Insufficient permissions" });
//     }

//     next();
//   };
// }




/**
 * Enhanced permission middleware that checks module permissions
 * @param {string} moduleName - The module name (e.g., 'Product', 'Users')
 * @param {string} action - The action type ('create', 'edit', 'delete', 'view')
 */
export function checkPermission(moduleName, action = "view") {
  return (req, res, next) => {
    const user = req.user;
    
    // Check if user exists
    if (!user) {
      return res.status(401).json({ 
        message: "Authentication required",
        error: "UNAUTHORIZED" 
      });
    }
    
    // Super Admin has all permissions
    if (user.role === "Super Admin" || user.role === "Admin") {
      return next();
    }
    
    // Check if permissions exist
    if (!user.permissions || Object.keys(user.permissions).length === 0) {
      return res.status(403).json({ 
        message: "No permissions assigned to your role",
        error: "NO_PERMISSIONS" 
      });
    }
    
    // Check if module exists in permissions
    const modulePermissions = user.permissions[moduleName];
    if (!modulePermissions) {
      return res.status(403).json({ 
        message: `You don't have access to ${moduleName} module`,
        error: "NO_MODULE_ACCESS",
        module: moduleName
      });
    }
    
    // Check specific action permission
    const permissionKey = `can_${action}`;
    if (!modulePermissions[permissionKey]) {
      return res.status(403).json({ 
        message: `You don't have permission to ${action} in ${moduleName} module`,
        error: "PERMISSION_DENIED",
        module: moduleName,
        action: action,
        required: permissionKey
      });
    }
    
    // Permission granted
    next();
  };
}

/**
 * Check if user has ANY of the specified permissions
 */
export function checkAnyPermission(permissionChecks) {
  return (req, res, next) => {
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({ 
        message: "Authentication required",
        error: "UNAUTHORIZED" 
      });
    }
    
    // Super Admin has all permissions
    if (user.role === "Super Admin" || user.role === "Admin") {
      return next();
    }
    
    if (!user.permissions || Object.keys(user.permissions).length === 0) {
      return res.status(403).json({ 
        message: "No permissions assigned",
        error: "NO_PERMISSIONS" 
      });
    }
    
    // Check if user has ANY of the specified permissions
    const hasAnyPermission = permissionChecks.some(check => {
      const { module, action } = check;
      const modulePerms = user.permissions[module];
      return modulePerms && modulePerms[`can_${action}`];
    });
    
    if (!hasAnyPermission) {
      return res.status(403).json({ 
        message: "You don't have required permissions",
        error: "INSUFFICIENT_PERMISSIONS"
      });
    }
    
    next();
  };
}

/**
 * Check if user has specific role(s)
 */
export function checkRole(allowedRoles) {
  return (req, res, next) => {
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({ 
        message: "Authentication required",
        error: "UNAUTHORIZED" 
      });
    }
    
    const userRole = user.role;
    const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    
    const hasRole = rolesArray.some(
      role => role.toLowerCase() === userRole.toLowerCase()
    );
    
    if (!hasRole) {
      return res.status(403).json({ 
        message: "You don't have required role",
        error: "ROLE_DENIED",
        required: allowedRoles,
        current: userRole
      });
    }
    
    next();
  };
}