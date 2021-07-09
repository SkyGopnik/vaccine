import React from "react";

import Img5 from "src/img/No-virus.svg";
import Img1 from "src/img/Cylinder.png";
import Img3 from "src/img/Genetics.png";
import Img2 from "src/img/Dish.png";
import Img4 from "src/img/Mask.png";
import Img6 from "src/img/Syringe.png";

import style from "./EmptyBackground.scss";

export default () => {
  return (
    <div className={style.bg}>
      <div className={style.blur} />
      <div className={style.images}>
        <img className={style.left} src={Img5} alt="" />
        <img className={style.left} src={Img1} alt="" />
        <img className={style.right} src={Img3} alt="" />
        <img className={style.left} src={Img2} alt="" />
        <img className={style.right} src={Img4} alt="" />
        <img className={style.right} src={Img6} alt="" />
      </div>
    </div>
  );
};
