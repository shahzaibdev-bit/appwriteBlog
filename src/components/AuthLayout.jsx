import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Protected is a wrapper component that you place around other components (like protected pages).
// children: The component(s) you want to protect.

// authentication = true: A prop that tells whether this page requires login (true) or requires user to be logged out (false).
// ✅ Default is true, meaning the page requires a logged-in user.
export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    // Case 1: authentication = true
    // You want this page only for logged-in users.

    // If user is not logged in → redirect to /login.

    // Case 2: authentication = false
    // You want this page only for guests (not logged-in users), like /login or /register.

    // If user is logged in → redirect to / (home page).

    const shouldRedirect =
      (authentication && !authStatus) || (!authentication && authStatus);

    if (shouldRedirect) {
      navigate(authentication ? "/login" : "/");
    }

    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? (
    <div className="flex items-center justify-center h-screen bg-[#0f0f1b] text-white">
      <h1 className="text-xl font-semibold">Loading...</h1>
    </div>
  ) : (
    <>{children}</>
  );
}
