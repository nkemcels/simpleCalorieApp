import React, { CSSProperties } from "react";
import Styles from "./Logo.scss";
import logoImg from "../../assets/img/logo.png";

type LogoProps = {
    width?: number;
    height?: number;
    type?: "simple" | "with-text-right" | "with-text-btn";
    imgStyle?: CSSProperties;
};

const Logo: React.FC<LogoProps> = ({ width, height, type, imgStyle }) => {
    const logoTxtBtmImg = logoImg;
    const logoTxtRtImg = logoImg;
    const logo = type == "with-text-btn" ? logoTxtBtmImg : type === "with-text-right" ? logoTxtRtImg : logoImg;
    return <img className={Styles.Logo} src={logo} style={imgStyle} width={width} height={height} />;
};

export default Logo;
