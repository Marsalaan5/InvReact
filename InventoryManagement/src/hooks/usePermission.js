
import { useState, useEffect, useCallback } from 'react';
import AuthService from '../services/authService';

/**
 * OPTION 2: Read from existing "user" object in storage
 * This works with your current login implementation
 */
export const usePermissions = () => {
  const [permissions, setPermissions] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserPermissions = useCallback(async () => {
    try {
      setLoading(true);
      console.log('🔍 Starting permission fetch...');

      // Try to get user data from storage first (faster)
      const userJson = sessionStorage.getItem('user') || localStorage.getItem('user');
      
      if (userJson) {
        try {
          const storedUser = JSON.parse(userJson);
          console.log('📦 Found user in storage:', storedUser);
          
          if (storedUser.role && storedUser.permissions) {
            console.log(' Using cached user data');
            console.log(' Role:', storedUser.role);
            console.log(' Permissions:', Object.keys(storedUser.permissions).length, 'modules');
            
            setUserRole(storedUser.role);
            setPermissions(storedUser.permissions);
            setLoading(false);
            return; // Use cached data
          }
        } catch (e) {
          console.error('❌ Error parsing stored user:', e);
        }
      }

      // Fallback: Fetch from API if cache invalid or missing
      console.log(' Fetching fresh data from API...');

      // Get user_id from separate storage OR from user object
      let userId = sessionStorage.getItem('user_id') || localStorage.getItem('user_id');
      
      if (!userId && userJson) {
        try {
          const storedUser = JSON.parse(userJson);
          userId = storedUser.id;
          console.log(' Got user ID from user object:', userId);
        } catch (e) {
          console.error(' Error getting ID from user object:', e);
        }
      }

      if (!userId || userId === 'null' || userId === 'undefined') {
        console.error(' No user_id found - redirect to login');
        setPermissions({});
        setUserRole(null);
        setLoading(false);
        return;
      }

      userId = parseInt(userId);
      
      if (isNaN(userId) || userId <= 0) {
        console.error('❌ Invalid user_id:', userId);
        setPermissions({});
        setUserRole(null);
        setLoading(false);
        return;
      }

      console.log(' Fetching data for user ID:', userId);

      // Get current user from API
      const userResponse = await AuthService.getCurrentUser();
      console.log(' User response:', userResponse);

      const users = userResponse.data?.users || [userResponse.data];
      const user = Array.isArray(users) 
        ? users.find(u => u.id === userId)
        : (users.id === userId ? users : null);

      if (!user) {
        console.error(' User not found');
        setPermissions({});
        setUserRole(null);
        setLoading(false);
        return;
      }

      console.log('User found:', user);

      // Fetch role with permissions
      const roleResponse = await AuthService.getRoleById(user.role_id);
      const role = roleResponse.data;

      let rolePermissions = role.permissions;
      if (typeof rolePermissions === 'string') {
        rolePermissions = JSON.parse(rolePermissions);
      }

      console.log('Role loaded:', role.name);
      console.log('Permissions loaded');

      setUserRole(role.name);
      setPermissions(rolePermissions || {});

      // Update cache
      const updatedUser = {
        ...(userJson ? JSON.parse(userJson) : {}),
        role: role.name,
        permissions: rolePermissions
      };
      
      sessionStorage.setItem('user', JSON.stringify(updatedUser));
      localStorage.setItem('user', JSON.stringify(updatedUser));
      sessionStorage.setItem('userRole', role.name);
      localStorage.setItem('userRole', role.name);
      sessionStorage.setItem('userPermissions', JSON.stringify(rolePermissions || {}));
      localStorage.setItem('userPermissions', JSON.stringify(rolePermissions || {}));

    } catch (error) {
      console.error('Error fetching permissions:', error);

      // Try to use any cached data
      const cachedPerms = sessionStorage.getItem('userPermissions') || localStorage.getItem('userPermissions');
      const cachedRole = sessionStorage.getItem('userRole') || localStorage.getItem('userRole');

      if (cachedPerms && cachedRole) {
        console.log('Using cached fallback data');
        try {
          setPermissions(JSON.parse(cachedPerms));
          setUserRole(cachedRole);
        } catch (e) {
          setPermissions({});
          setUserRole(null);
        }
      } else {
        setPermissions({});
        setUserRole(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserPermissions();
  }, [fetchUserPermissions]);

    const hasRole = useCallback((roles) => {
    if (!userRole) return false;
    
    const roleArray = Array.isArray(roles) ? roles : [roles];
    const normalizedUserRole = userRole.toLowerCase().trim();
    
    return roleArray.some(role => {
      const normalizedRole = role.toLowerCase().trim();
      return normalizedRole === normalizedUserRole;
    });
  }, [userRole]);

  /**
   * Check if user has permission for a specific module and action
   */
  // const hasPermission = useCallback((module, action) => {
  //   if (!permissions) return false;
  //   if (!permissions[module]) return false;
    
  //   const permissionKey = `can_${action}`;
  //   return Boolean(permissions[module][permissionKey]);
  // }, [permissions]);

  const hasPermission = useCallback((module, action) => {
  // Super Admin bypass
  if (hasRole(['Super Admin','super admin'])) {
    return true;
  }

  if (!permissions) return false;
  if (!permissions[module]) return false;

  const permissionKey = `can_${action}`;
  return Boolean(permissions[module][permissionKey]);
}, [permissions, hasRole]);


  /**
   * Check if user has ANY of the specified permissions
   */
  const hasAnyPermission = useCallback((checks) => {
    return checks.some(check => 
      hasPermission(check.module, check.action)
    );
  }, [hasPermission]);

  /**
   * Check if user has ALL of the specified permissions
   */
  const hasAllPermissions = useCallback((checks) => {
    return checks.every(check => 
      hasPermission(check.module, check.action)
    );
  }, [hasPermission]);

  /**
   * Check if user has a specific role
   */


  /**
   * Get all permissions for a specific module
   */
  const getModulePermissions = useCallback((module) => {
    if (!permissions || !permissions[module]) return null;
    return permissions[module];
  }, [permissions]);




  return {
    permissions,
    userRole,
    loading,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    getModulePermissions,

    refetch: fetchUserPermissions
  };
};