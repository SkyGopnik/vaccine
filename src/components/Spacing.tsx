import React from "react";

interface IProps {
  size: number
}

export default (props: IProps) => {
  return (
    <div style={{ height: `${props.size}px` }} />
  );
};
