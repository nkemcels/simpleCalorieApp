import React from "react";
import Styles from "./SectionPane.scss";

const SectionPane: React.FC<{ title: React.ReactNode; icon?: React.ReactNode; extraActions?: React.ReactNode; content?: React.ReactNode }> = ({
    children,
    content,
    icon,
    title,
    extraActions,
}) => {
    return (
        <section className={Styles.Section}>
            <div className={Styles.Header}>
                <span className={Styles.NameWrapper}>
                    {icon && <span className={Styles.Icon}>{icon}</span>}
                    {title}
                </span>
                {extraActions && <span>{extraActions}</span>}
            </div>
            <div className={Styles.DetailsWrapper}>{content || children}</div>
        </section>
    );
};

export default SectionPane;
