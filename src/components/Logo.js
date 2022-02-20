import React from "react";
import "./HeaderStyles.css";

function Logo({ children, ...restProps }) {
  return (
    <div>
      <a href="/" {...restProps}>
        {children}
        <img className="logo" href="/" src="/public/logo.svg" alt="Netflix logo" />
      </a>
    </div>
  );
}

export default Logo;
