import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Components
import LoginForm from './Pages/LoginForm/LoginForm';
import RegisterForm from './Pages/RegisterForm/RegisterForm';
import HomePage from './Pages/HomePage/HomePage';
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import ForgotPasswordForm from "./Pages/ForgotPasswordForm/ForgotPasswordForm";
import PrivateRoute from "./Pages/PrivateRoute/PrivateRoute";
import UserProfile from "./Pages/UserProfile/UserProfile";
import ProtegerRuta from "./Components/ProtegerRuta";
import ChangePasswordForm from "./Pages/ChangePasswordForm/ChangePasswordForm";

function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/registerform" element={<RegisterForm />} />
            <Route path="/loginform" element={<LoginForm />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/forgotpasswordform" element={<ForgotPasswordForm />} />

            {/* Rutas privadas */}
            <Route element={<ProtegerRuta isAllowed={!!token} />}>

              <Route path="/private" element={<PrivateRoute />} />
              <Route path="/userprofile" element={<UserProfile />} />
              <Route path="/changepasswordform" element={<ChangePasswordForm />} />
              
            </Route>

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
