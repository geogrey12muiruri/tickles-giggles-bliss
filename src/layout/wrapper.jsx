import React from "react";
import BackToTopCom from "@/components/common/back-to-top";

const Wrapper = ({ children }) => (
  <div id="wrapper">
    {children}
    <BackToTopCom />
  </div>
);

export default Wrapper;
