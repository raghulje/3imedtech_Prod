const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { APP_KEY, API_KEY } = process.env;
const Response = require("../helpers/response");

// Toggle verbose auth logging (enabled only outside production)
const AUTH_DEBUG = process.env.NODE_ENV !== "production";
const authLog = (...args) => {
  if (AUTH_DEBUG) {
    console.log(...args);
  }
};
const authErrorLog = (...args) => {
  if (AUTH_DEBUG) {
    console.error(...args);
  }
};

exports.authCheck = (req, res, next) => {
  const { authorization } = req.headers;
  authLog("🔍 [AUTH CHECK] Authorization header:", authorization ? "Present" : "Missing");
  authLog("🔍 [AUTH CHECK] Request path:", req.path);
  authLog("🔍 [AUTH CHECK] Request method:", req.method);
  
  try {
    if (authorization && authorization.startsWith("Bearer")) {
      const token = authorization.substr(7);
      authLog("🔍 [AUTH CHECK] Token extracted, length:", token.length);
      
      try {
        const data = jwt.verify(token, APP_KEY);
        authLog("✅ [AUTH CHECK] Token verified, userData:", { id: data.id, session_id: data.session_id });
        if (data && data.id) {
          req.userData = data;
          authLog("✅ [AUTH CHECK] Calling next() with valid token");
          return next();
        }
      } catch (verifyError) {
        authErrorLog("❌ [AUTH CHECK] Token verification failed:", verifyError.message);
        // For /verify endpoint, we should return 401 if token is invalid
        if (req.path === '/verify' || req.path.includes('/verify')) {
          return Response.responseStatus(res, 401, "Invalid or expired token");
        }
        req.userData = null;
        return next();
      }
    }
    // If no valid token, set userData to null but don't block (let authAllowTypes decide)
    authLog("⚠️ [AUTH CHECK] No authorization header or invalid format");
    // For /verify endpoint, we should return 401 if no token
    if (req.path === '/verify' || req.path.includes('/verify')) {
      return Response.responseStatus(res, 401, "No authorization token provided");
    }
    req.userData = null;
    return next();
  } catch (error) {
    // Token invalid or expired
    authErrorLog("❌ [AUTH CHECK] Error:", error.message);
    // For /verify endpoint, we should return 401 on error
    if (req.path === '/verify' || req.path.includes('/verify')) {
      return Response.responseStatus(res, 401, "Token validation error");
    }
    req.userData = null;
    return next();
  }
};

exports.authType = (type) => {
  return async (req, res, next) => {
    const data = req.userData;
    const user = await User.findByPk(data.id);
    if (!user) {
      return Response.responseStatus(res, 401, "Invalid Token");
    }
    if (user.user_type === type) {
      return next();
    } else {
       return next();
      // return Response.responseStatus(res, 403, "You don't have permission");
    }
  };
};

exports.authAllowTypes = (types = []) => {
  return async (req, res, next) => {
    const data = req.userData;
    authLog("🔍 [AUTH ALLOW TYPES] Checking authorization, userData:", data ? { id: data.id, session_id: data.session_id } : "null");
    
    if (!data || !data.id) {
      authLog("❌ [AUTH ALLOW TYPES] No user data in request");
      return Response.responseStatus(res, 401, "Authentication required");
    }
    
    try {
      const user = await User.findByPk(data.id);
      if (!user) {
        authLog("❌ [AUTH ALLOW TYPES] User not found:", data.id);
        return Response.responseStatus(res, 403, "You don't have permission");
      }
      
      authLog("👤 [AUTH ALLOW TYPES] User found:", { 
        id: user.id, 
        email: user.email, 
        userType: user.user_type, 
        isActive: user.is_active,
        allowedTypes: types, 
        match: types.includes(user.user_type) 
      });
      
      if (!user.is_active) {
        authLog("❌ [AUTH ALLOW TYPES] User is inactive");
        return Response.responseStatus(res, 403, "Your account is inactive");
      }
      
      if (types.includes(user.user_type)) {
        req.user = user;
        authLog("✅ [AUTH ALLOW TYPES] Authorization passed");
        return next();
      }
      
      authLog("❌ [AUTH ALLOW TYPES] User type mismatch:", { userType: user.user_type, allowedTypes: types });
      return Response.responseStatus(res, 403, "You don't have permission");
    } catch (error) {
      authErrorLog("❌ [AUTH ALLOW TYPES] Error:", error);
      return Response.responseStatus(res, 500, "Internal server error");
    }
  };
};

exports.validateAPI = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    const token = authorization.substr(7);
    try {
      const data = jwt.verify(token, API_KEY);
      if (data) {
        req.userData = data;
        return next();
      }
    } catch (error) {
      return Response.responseStatus(res, 401, "Invalid token", error);
    }
  }
  return next();
};

