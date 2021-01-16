import React from "react";

import MainIcon from "src/components/MainIcon";

import style from './VaccineEffect.scss';

interface IProps {
  variant: number
}

export default (props: IProps) => {
  return (
    <MainIcon className={`${style.icon} ${style['icon' + props.variant]}`} type="small" />
  );
};
