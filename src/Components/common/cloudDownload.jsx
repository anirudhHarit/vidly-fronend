import React from "react";

const CloudDownload = ({ download, onClick }) => {
  let classes = "fa fa-trash";
  if (!download) classes = "fa fa-cloud-download";
  return (
    <i
      className={classes}
      style={{ cursor: "pointer" }}
      onClick={onClick}
      aria-hidden="true"
    ></i>
  );
};

export default CloudDownload;
