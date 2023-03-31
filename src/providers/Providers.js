import React from "react";
import reduxProvider from "./reduxProvider";
const Providers = ({ children }) => {
  return <reduxProvider>{children}</reduxProvider>;
};

export default Providers;
