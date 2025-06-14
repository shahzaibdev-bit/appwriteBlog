import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      onClick={logoutHandler}
      className="px-5 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition duration-200 rounded-xl"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
