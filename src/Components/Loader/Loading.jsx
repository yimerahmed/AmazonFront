import React from "react";
import { MoonLoader } from "react-spinners";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <MoonLoader color="#febd69" size={50} />
    </div>
  );
};

export default Loading;
