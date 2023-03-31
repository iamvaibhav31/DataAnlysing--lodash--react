import React from "react";
import ReduxProvider from "./ReduxProvider";
const Providers = ({ children }) => {
  return <ReduxProvider>{children}</ReduxProvider>;
};

export default Providers;
