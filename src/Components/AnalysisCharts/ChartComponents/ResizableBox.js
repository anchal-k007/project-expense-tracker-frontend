import React from "react";
import { ResizableBox as ReactResizableBox } from "react-resizable";

import "react-resizable/css/styles.css";

export default function ResizableBox({
  children,
  width = 500,
  height = 250,
  resizable = true,
  style = {},
  className = "",
}) {
  return (
    <div
      style={{
        display: "block",
        width: "fit-content",
        background: "white",
        padding: ".5rem",
        borderRadius: "0.5rem",
        boxShadow: "0 10px 10px rgba(0,0,0,.1), -0px -10px 10px rgba(0,0,0,.1)",
        ...style,
      }}
    >
      {resizable ? (
        <ReactResizableBox width={width} height={height}>
          <div
            style={{
              width: "100%",
              height: "100%",
            }}
            className={className}
          >
            {children}
          </div>
        </ReactResizableBox>
      ) : (
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
          className={className}
        >
          {children}
        </div>
      )}
    </div>
  );
}
