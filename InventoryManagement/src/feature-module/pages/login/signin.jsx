// import React from "react";
// import ImageWithBasePath from "../../../core/img/imagewithbasebath";
// import { Link } from "react-router-dom";
// import { all_routes } from "../../../Router/all_routes";

// const Signin = () => {
//   const route = all_routes;
//   return (
//     <div className="main-wrapper">
//       <div className="account-content">
//         <div className="login-wrapper bg-img">
//           <div className="login-content">
//             <form action="index">
//               <div className="login-userset">
//                 <div className="login-logo logo-normal">
//                   <ImageWithBasePath src="assets/img/logo.png" alt="img" />
//                 </div>
//                 <Link to={route.dashboard} className="login-logo logo-white">
//                   <ImageWithBasePath src="assets/img/logo-white.png" alt />
//                 </Link>
//                 <div className="login-userheading">
//                   <h3>Sign In</h3>
//                   <h4>
//                     Access the Dreamspos panel using your email and passcode.
//                   </h4>
//                 </div>
//                 <div className="form-login mb-3">
//                   <label className="form-label">Email Address</label>
//                   <div className="form-addons">
//                     <input type="text" className="form- control" />
//                     <ImageWithBasePath
//                       src="assets/img/icons/mail.svg"
//                       alt="img"
//                     />
//                   </div>
//                 </div>
//                 <div className="form-login mb-3">
//                   <label className="form-label">Password</label>
//                   <div className="pass-group">
//                     <input
//                       type="password"
//                       className="pass-input form-control"
//                     />
//                     <span className="fas toggle-password fa-eye-slash" />
//                   </div>
//                 </div>
//                 <div className="form-login authentication-check">
//                   <div className="row">
//                     <div className="col-12 d-flex align-items-center justify-content-between">
//                       <div className="custom-control custom-checkbox">
//                         <label className="checkboxs ps-4 mb-0 pb-0 line-height-1">
//                           <input type="checkbox" className="form-control" />
//                           <span className="checkmarks" />
//                           Remember me
//                         </label>
//                       </div>
//                       <div className="text-end">
//                         <Link className="forgot-link" to={route.forgotPassword}>
//                           Forgot Password?
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="form-login">
//                   <Link to={route.dashboard} className="btn btn-login">
//                     Sign In
//                   </Link>
//                 </div>
//                 <div className="signinform">
//                   <h4>
//                     New on our platform?
//                     <Link to={route.register} className="hover-a">
//                       {" "}
//                       Create an account
//                     </Link>
//                   </h4>
//                 </div>
//                 <div className="form-setlogin or-text">
//                   <h4>OR</h4>
//                 </div>
//                 <div className="form-sociallink">
//                   <ul className="d-flex">
//                     <li>
//                       <Link to="#" className="facebook-logo">
//                         <ImageWithBasePath
//                           src="assets/img/icons/facebook-logo.svg"
//                           alt="Facebook"
//                         />
//                       </Link>
//                     </li>
//                     <li>
//                       <Link to="#">
//                         <ImageWithBasePath
//                           src="assets/img/icons/google.png"
//                           alt="Google"
//                         />
//                       </Link>
//                     </li>
//                     <li>
//                       <Link to="#" className="apple-logo">
//                         <ImageWithBasePath
//                           src="assets/img/icons/apple-logo.svg"
//                           alt="Apple"
//                         />
//                       </Link>
//                     </li>
//                   </ul>
//                   <div className="my-4 d-flex justify-content-center align-items-center copyright-text">
//                     <p>Copyright © 2023 DreamsPOS. All rights reserved</p>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signin;



// import React, { useState } from "react";
// import ImageWithBasePath from "../../../core/img/imagewithbasebath";
// import { Link, useNavigate } from "react-router-dom";
// import { all_routes } from "../../../Router/all_routes";
// import AuthService from "../../../services/authService";

// const Signin = () => {
//   const route = all_routes;
//   const navigate = useNavigate();

//   // ✅ Local state
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ✅ Form submit handler
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!email || !password) {
//       return setError("Please enter both email and password");
//     }

//     try {
//       setLoading(true);
//       const { data } = await AuthService.login({ email, password });

//       // Save token (and remember me if checked)
//       if (rememberMe) {
//         localStorage.setItem("token", data.token);
//       } else {
//         sessionStorage.setItem("token", data.token);
//       }

//       // Redirect to dashboard
//       navigate(route.dashboard);
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid email or password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="main-wrapper">
//       <div className="account-content">
//         <div className="login-wrapper bg-img">
//           <div className="login-content">
//             <form onSubmit={handleLogin}>
//               <div className="login-userset">
//                 <div className="login-logo logo-normal">
//                   <ImageWithBasePath src="assets/img/logo.png" alt="DreamsPOS" />
//                 </div>

//                 <Link to={route.dashboard} className="login-logo logo-white">
//                   <ImageWithBasePath src="assets/img/logo-white.png" alt="DreamsPOS" />
//                 </Link>

//                 <div className="login-userheading">
//                   <h3>Sign In</h3>
//                   <h4>Access the DreamsPOS panel using your email and passcode.</h4>
//                 </div>

//                 {/* EMAIL */}
//                 <div className="form-login mb-3">
//                   <label className="form-label">Email Address</label>
//                   <div className="form-addons">
//                     <input
//                       type="email"
//                       className="form-control"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                     />
//                     <ImageWithBasePath src="assets/img/icons/mail.svg" alt="icon" />
//                   </div>
//                 </div>

//                 {/* PASSWORD */}
//                 <div className="form-login mb-3">
//                   <label className="form-label">Password</label>
//                   <div className="pass-group">
//                     <input
//                       type="password"
//                       className="pass-input form-control"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                     />
//                     <span className="fas toggle-password fa-eye-slash" />
//                   </div>
//                 </div>

//                 {/* REMEMBER ME + FORGOT PASSWORD */}
//                 <div className="form-login authentication-check">
//                   <div className="row">
//                     <div className="col-12 d-flex align-items-center justify-content-between">
//                       <div className="custom-control custom-checkbox">
//                         <label className="checkboxs ps-4 mb-0 pb-0 line-height-1">
//                           <input
//                             type="checkbox"
//                             checked={rememberMe}
//                             onChange={(e) => setRememberMe(e.target.checked)}
//                           />
//                           <span className="checkmarks" />
//                           Remember me
//                         </label>
//                       </div>
//                       <div className="text-end">
//                         <Link className="forgot-link" to={route.forgotPassword}>
//                           Forgot Password?
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* ERROR MESSAGE */}
//                 {error && <div className="alert alert-danger mt-2">{error}</div>}

//                 {/* SUBMIT BUTTON */}
//                 <div className="form-login">
//                   <button
//                     type="submit"
//                     className="btn btn-login"
//                     disabled={loading}
//                   >
//                     {loading ? "Signing In..." : "Sign In"}
//                   </button>
//                 </div>

//                 {/* SIGN UP LINK */}
//                 <div className="signinform">
//                   <h4>
//                     New on our platform?
//                     <Link to={route.register} className="hover-a">
//                       {" "}
//                       Create an account
//                     </Link>
//                   </h4>
//                 </div>

//                 {/* OR + SOCIALS */}
//                 <div className="form-setlogin or-text">
//                   <h4>OR</h4>
//                 </div>

//                 <div className="form-sociallink">
//                   <ul className="d-flex">
//                     <li>
//                       <Link to="#" className="facebook-logo">
//                         <ImageWithBasePath
//                           src="assets/img/icons/facebook-logo.svg"
//                           alt="Facebook"
//                         />
//                       </Link>
//                     </li>
//                     <li>
//                       <Link to="#">
//                         <ImageWithBasePath
//                           src="assets/img/icons/google.png"
//                           alt="Google"
//                         />
//                       </Link>
//                     </li>
//                     <li>
//                       <Link to="#" className="apple-logo">
//                         <ImageWithBasePath
//                           src="assets/img/icons/apple-logo.svg"
//                           alt="Apple"
//                         />
//                       </Link>
//                     </li>
//                   </ul>
//                 </div>

//                 <div className="my-4 d-flex justify-content-center align-items-center copyright-text">
//                   <p>Copyright © 2023 DreamsPOS. All rights reserved</p>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signin;




// import React, { useState } from "react";
// import ImageWithBasePath from "../../../core/img/imagewithbasebath";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux"; // ✅ Add useDispatch
// import { all_routes } from "../../../Router/all_routes";
// import AuthService from "../../../services/authService";

// const Signin = () => {
//   const route = all_routes;
//   const navigate = useNavigate();
//   const dispatch = useDispatch(); // ✅ Add dispatch

//   // Local state
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { isAuthenticated } = useSelector((state) => state.auth);

//   // Form submit handler
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!email || !password) {
//       return setError("Please enter both email and password");
//     }

//     try {
//       setLoading(true);
//       const { data } = await AuthService.login({ email, password });

//       console.log('API response:', data);

//       const userData = {
//         name: data.user.name,
//         role: data.user.role,
//         avatar: data.user.avatar,
//         id: data.user.id,
//         permissions: data.user.permissions || {}
//       };

//       console.log('User data to store:', userData);

//       // Save to storage
//       if (rememberMe) {
//         localStorage.setItem("token", data.token); 
//         localStorage.setItem("user", JSON.stringify(userData));
//       } else {
//         sessionStorage.setItem("token", data.token);
//         sessionStorage.setItem("user", JSON.stringify(userData));
//       }

//       // ✅ CRITICAL: Dispatch login action to Redux
//       dispatch({
//         type: 'auth/loginSuccess', // Adjust based on your Redux setup
//         payload: {
//           user: userData,
//           token: data.token,
//           isAuthenticated: true
//         }
//       });

//       // ✅ Navigate after Redux state is updated
//       navigate(route.dashboard);
      
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid email or password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="main-wrapper">
//       <div className="account-content">
//         <div className="login-wrapper bg-img">
//           <div className="login-content">
//             <form onSubmit={handleLogin}>
//               <div className="login-userset">
//                 <div className="login-logo logo-normal">
//                   <ImageWithBasePath src="assets/img/logo.png" alt="DreamsPOS" />
//                 </div>

//                 <Link to={route.dashboard} className="login-logo logo-white">
//                   <ImageWithBasePath src="assets/img/logo-white.png" alt="DreamsPOS" />
//                 </Link>

//                 <div className="login-userheading">
//                   <h3>Sign In</h3>
//                   <h4>Access the DreamsPOS panel using your email and passcode.</h4>
//                 </div>

//                 <div className="form-login mb-3">
//                   <label className="form-label">Email Address</label>
//                   <div className="form-addons">
//                     <input
//                       type="email"
//                       className="form-control"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                     />
//                     <ImageWithBasePath src="assets/img/icons/mail.svg" alt="icon" />
//                   </div>
//                 </div>

//                 <div className="form-login mb-3">
//                   <label className="form-label">Password</label>
//                   <div className="pass-group">
//                     <input
//                       type="password"
//                       className="pass-input form-control"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                     />
//                     <span className="fas toggle-password fa-eye-slash" />
//                   </div>
//                 </div>

//                 <div className="form-login authentication-check">
//                   <div className="row">
//                     <div className="col-12 d-flex align-items-center justify-content-between">
//                       <div className="custom-control custom-checkbox">
//                         <label className="checkboxs ps-4 mb-0 pb-0 line-height-1">
//                           <input
//                             type="checkbox"
//                             checked={rememberMe}
//                             onChange={(e) => setRememberMe(e.target.checked)}
//                           />
//                           <span className="checkmarks" />
//                           Remember me
//                         </label>
//                       </div>
//                       <div className="text-end">
//                         <Link className="forgot-link" to={route.forgotPassword}>
//                           Forgot Password?
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {error && <div className="alert alert-danger mt-2">{error}</div>}

//                 <div className="form-login">
//                   <button
//                     type="submit"
//                     className="btn btn-login"
//                     disabled={loading}
//                   >
//                     {loading ? "Signing In..." : "Sign In"}
//                   </button>
//                 </div>

//                 <div className="signinform">
//                   <h4>
//                     New on our platform?
//                     <Link to={route.register} className="hover-a">
//                       {" "}
//                       Create an account
//                     </Link>
//                   </h4>
//                 </div>

//                 <div className="form-setlogin or-text">
//                   <h4>OR</h4>
//                 </div>

//                 <div className="form-sociallink">
//                   <ul className="d-flex">
//                     <li>
//                       <Link to="#" className="facebook-logo">
//                         <ImageWithBasePath
//                           src="assets/img/icons/facebook-logo.svg"
//                           alt="Facebook"
//                         />
//                       </Link>
//                     </li>
//                     <li>
//                       <Link to="#">
//                         <ImageWithBasePath
//                           src="assets/img/icons/google.png"
//                           alt="Google"
//                         />
//                       </Link>
//                     </li>
//                     <li>
//                       <Link to="#" className="apple-logo">
//                         <ImageWithBasePath
//                           src="assets/img/icons/apple-logo.svg"
//                           alt="Apple"
//                         />
//                       </Link>
//                     </li>
//                   </ul>
//                 </div>

//                 <div className="my-4 d-flex justify-content-center align-items-center copyright-text">
//                   <p>Copyright © 2023 DreamsPOS. All rights reserved</p>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signin;


import React, { useState, useEffect } from "react";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { all_routes } from "../../../Router/all_routes";
import AuthService from "../../../services/authService";
import { loginSuccess } from "../../../core/redux/slices/authSlice"; 

const Signin = () => {
  const route = all_routes;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(route.dashboard);
    }
  }, [isAuthenticated, navigate, route.dashboard]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      return setError("Please enter both email and password");
    }

    try {
      setLoading(true);
      const { data } = await AuthService.login({ email, password });

      console.log('API response:', data);

      const userData = {
        name: data.user.name,
        role: data.user.role,
        avatar: data.user.avatar,
        id: data.user.id,
        permissions: data.user.permissions || {}
      };

      console.log('User data to store:', userData);

      if (rememberMe) {
        localStorage.setItem("token", data.token); 
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(userData));
      }

    
      dispatch(loginSuccess({
        user: userData,
        token: data.token
      }));

      navigate(route.dashboard);
      
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div className="login-wrapper bg-img">
          <div className="login-content">
            <form onSubmit={handleLogin}>
              <div className="login-userset">
                <div className="login-logo logo-normal">
                  <ImageWithBasePath src="assets/img/logo.png" alt="DreamsPOS" />
                </div>

                <Link to={route.dashboard} className="login-logo logo-white">
                  <ImageWithBasePath src="assets/img/logo-white.png" alt="DreamsPOS" />
                </Link>

                <div className="login-userheading">
                  <h3>Sign In</h3>
                  <h4>Access the DreamsPOS panel using your email and passcode.</h4>
                </div>

                <div className="form-login mb-3">
                  <label className="form-label">Email Address</label>
                  <div className="form-addons">
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <ImageWithBasePath src="assets/img/icons/mail.svg" alt="icon" />
                  </div>
                </div>

                <div className="form-login mb-3">
                  <label className="form-label">Password</label>
                  <div className="pass-group">
                    <input
                      type="password"
                      className="pass-input form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span className="fas toggle-password fa-eye-slash" />
                  </div>
                </div>

                <div className="form-login authentication-check">
                  <div className="row">
                    <div className="col-12 d-flex align-items-center justify-content-between">
                      <div className="custom-control custom-checkbox">
                        <label className="checkboxs ps-4 mb-0 pb-0 line-height-1">
                          <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                          />
                          <span className="checkmarks" />
                          Remember me
                        </label>
                      </div>
                      <div className="text-end">
                        <Link className="forgot-link" to={route.forgotPassword}>
                          Forgot Password?
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {error && <div className="alert alert-danger mt-2">{error}</div>}

                <div className="form-login">
                  <button
                    type="submit"
                    className="btn btn-login"
                    disabled={loading}
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </button>
                </div>

                <div className="signinform">
                  <h4>
                    New on our platform?
                    <Link to={route.register} className="hover-a">
                      {" "}
                      Create an account
                    </Link>
                  </h4>
                </div>

                <div className="form-setlogin or-text">
                  <h4>OR</h4>
                </div>

                <div className="form-sociallink">
                  <ul className="d-flex">
                    <li>
                      <Link to="#" className="facebook-logo">
                        <ImageWithBasePath
                          src="assets/img/icons/facebook-logo.svg"
                          alt="Facebook"
                        />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <ImageWithBasePath
                          src="assets/img/icons/google.png"
                          alt="Google"
                        />
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="apple-logo">
                        <ImageWithBasePath
                          src="assets/img/icons/apple-logo.svg"
                          alt="Apple"
                        />
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="my-4 d-flex justify-content-center align-items-center copyright-text">
                  <p>Copyright © 2023 DreamsPOS. All rights reserved</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;



// import React, { useState } from "react";
// import ImageWithBasePath from "../../../core/img/imagewithbasebath";
// import { Link, useNavigate } from "react-router-dom";
// import { all_routes } from "../../../Router/all_routes";
// import AuthService from "../../../services/authService";

// const Signin = () => {
//   const route = all_routes;
//   const navigate = useNavigate();

//   // Local state
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Form submit handler
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!email || !password) {
//       return setError("Please enter both email and password");
//     }

//     try {
//       setLoading(true);
//       const { data } = await AuthService.login({ email, password });

//       // Log the entire response to verify the structure
//       console.log('API response:', data);

//       // Ensure the response contains user data (name, role, avatar)
//       const userData = {
//         name: data.user.name,
//         role: data.user.role,
//         avatar: data.user.avatar,
//       };

   
//       console.log('User data to store:', userData);

     
//       if (rememberMe) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(userData)); 
//       } else {
//         sessionStorage.setItem("token", data.token);
//         sessionStorage.setItem("user", JSON.stringify(userData)); 
//       }

  
//       navigate(route.dashboard);
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid email or password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="main-wrapper">
//       <div className="account-content">
//         <div className="login-wrapper bg-img">
//           <div className="login-content">
//             <form onSubmit={handleLogin}>
//               <div className="login-userset">
//                 <div className="login-logo logo-normal">
//                   <ImageWithBasePath src="assets/img/logo.png" alt="DreamsPOS" />
//                 </div>

//                 <Link to={route.dashboard} className="login-logo logo-white">
//                   <ImageWithBasePath src="assets/img/logo-white.png" alt="DreamsPOS" />
//                 </Link>

//                 <div className="login-userheading">
//                   <h3>Sign In</h3>
//                   <h4>Access the DreamsPOS panel using your email and passcode.</h4>
//                 </div>

           
//                 <div className="form-login mb-3">
//                   <label className="form-label">Email Address</label>
//                   <div className="form-addons">
//                     <input
//                       type="email"
//                       className="form-control"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                     />
//                     <ImageWithBasePath src="assets/img/icons/mail.svg" alt="icon" />
//                   </div>
//                 </div>

               
//                 <div className="form-login mb-3">
//                   <label className="form-label">Password</label>
//                   <div className="pass-group">
//                     <input
//                       type="password"
//                       className="pass-input form-control"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                     />
//                     <span className="fas toggle-password fa-eye-slash" />
//                   </div>
//                 </div>

       
//                 <div className="form-login authentication-check">
//                   <div className="row">
//                     <div className="col-12 d-flex align-items-center justify-content-between">
//                       <div className="custom-control custom-checkbox">
//                         <label className="checkboxs ps-4 mb-0 pb-0 line-height-1">
//                           <input
//                             type="checkbox"
//                             checked={rememberMe}
//                             onChange={(e) => setRememberMe(e.target.checked)}
//                           />
//                           <span className="checkmarks" />
//                           Remember me
//                         </label>
//                       </div>
//                       <div className="text-end">
//                         <Link className="forgot-link" to={route.forgotPassword}>
//                           Forgot Password?
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

             
//                 {error && <div className="alert alert-danger mt-2">{error}</div>}

 
//                 <div className="form-login">
//                   <button
//                     type="submit"
//                     className="btn btn-login"
//                     disabled={loading}
//                   >
//                     {loading ? "Signing In..." : "Sign In"}
//                   </button>
//                 </div>


//                 <div className="signinform">
//                   <h4>
//                     New on our platform?
//                     <Link to={route.register} className="hover-a">
//                       {" "}
//                       Create an account
//                     </Link>
//                   </h4>
//                 </div>

           
//                 <div className="form-setlogin or-text">
//                   <h4>OR</h4>
//                 </div>

//                 <div className="form-sociallink">
//                   <ul className="d-flex">
//                     <li>
//                       <Link to="#" className="facebook-logo">
//                         <ImageWithBasePath
//                           src="assets/img/icons/facebook-logo.svg"
//                           alt="Facebook"
//                         />
//                       </Link>
//                     </li>
//                     <li>
//                       <Link to="#">
//                         <ImageWithBasePath
//                           src="assets/img/icons/google.png"
//                           alt="Google"
//                         />
//                       </Link>
//                     </li>
//                     <li>
//                       <Link to="#" className="apple-logo">
//                         <ImageWithBasePath
//                           src="assets/img/icons/apple-logo.svg"
//                           alt="Apple"
//                         />
//                       </Link>
//                     </li>
//                   </ul>
//                 </div>

//                 <div className="my-4 d-flex justify-content-center align-items-center copyright-text">
//                   <p>Copyright © 2023 DreamsPOS. All rights reserved</p>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signin;
