import React from "react";
import Styles from "./PagePlaceholder.scss";

const PagePlaceholder: React.FC<{ image: string; imgSize?: number; title: string; desc: string }> = ({ image, imgSize, title, desc }) => {
    return (
        <div className={Styles.Container}>
            <img src={image} style={{ width: imgSize || 350 }} />
            <div className={Styles.Title}>{title}</div>
            <div className={Styles.Text}>{desc}</div>
        </div>
    );
};

export default PagePlaceholder;
