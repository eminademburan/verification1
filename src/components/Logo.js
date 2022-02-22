import React from "react";
import "./HeaderStyles.css";
import netflix_logo from "../favicon.png";

function Logo({ children, ...restProps }) {
  return (
    <div>
      <a href="/" {...restProps}>
        {children}
        <img className="logo" href="/" src={netflix_logo}/>
      </a>
    </div>
  );
}

export default Logo;
