import React from "react";

const Like = ({ liked, onClick }) => {
  let classes = "fa fa-thumbs-up";
  if (!liked) classes = "fa fa-thumbs-o-down";
  return (
    <i
      className={classes}
      onClick={onClick}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
