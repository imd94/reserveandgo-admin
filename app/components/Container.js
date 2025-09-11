import React, { useEffect } from "react";

function Container({ wide, children }) {
  return (
    <div className={"page-wrapper " + (wide ? wide : "")}>
      { children }
    </div>
  );
}

export default Container;
