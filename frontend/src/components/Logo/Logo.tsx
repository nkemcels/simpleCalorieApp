import React, { CSSProperties } from "react";
import Styles from "./Logo.scss";

type LogoProps = {
    width?: number;
    height?: number;
    type?: "simple" | "with-text-right" | "with-text-btn";
    imgStyle?: CSSProperties;
};

const Logo: React.FC<LogoProps> = ({ width, height, type, imgStyle }) => {
    return <h2 style={{ color: "white" }}>Calorie App</h2>;
};

export default Logo;
