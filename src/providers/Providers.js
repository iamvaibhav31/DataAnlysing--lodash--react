import React from "react";
import ReduxProvider from "./reduxProvider";

const Providers = ({ children }) => {
  return <ReduxProvider>{children}</ReduxProvider>;
};

export default Providers;
