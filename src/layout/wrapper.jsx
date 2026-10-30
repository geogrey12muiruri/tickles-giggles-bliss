import React from "react";
import { ToastContainer } from "react-toastify";
import BackToTopCom from "@/components/common/back-to-top";

/** Landing shell — no product-modal / cart bootstrap side effects. */
const Wrapper = ({ children }) => {
  return (
    <div id="wrapper">
      {children}
      <BackToTopCom />
      <ToastContainer />
    </div>
  );
};

export default Wrapper;
