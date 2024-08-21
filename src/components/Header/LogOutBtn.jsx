import React from "react";

export const LogOutBtn = ({ logOut }) => {
  return (
    <>
      <button onClick={logOut} className="btn_style">
        Logout
      </button>
    </>
  );
};
